import type { APIRoute } from 'astro';
import { enquiry } from '../../data/events';
import { forms, isFormKind, type FormKind, type FormSpec } from '../../data/forms';

/**
 * Takes whatever the forms on this site collect and sends it to the farm,
 * rather than handing the visitor's own mail app a draft.
 *
 * One endpoint for all of them. The posted `page` names which form it was,
 * and that entry in the form registry supplies the questions to read back,
 * the subject line and the page to credit. An unknown `page` falls back to
 * the event inquiry rather than failing, so a stale cached form still sends.
 *
 * This is the only part of the site that is not built ahead of time. It runs
 * as a single Vercel function; everything else is still static HTML.
 *
 * Two shapes of request arrive here and both are answered in kind:
 *  - fetch() from the form's own script, as JSON, answered as JSON;
 *  - the browser's native POST when that script never loaded, as form data,
 *    answered with a redirect to /inquiry-sent.
 * The second is what keeps the form working with no JavaScript at all, and it
 * is the reason the markup still carries a real action and method.
 */

export const prerender = false;

/** The key is the account's; it is read at run time and never reaches the browser. */
const env = (key: string): string | undefined => {
  const runtime = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
  return runtime?.env?.[key] ?? (import.meta.env as Record<string, string | undefined>)[key];
};

/* Caps, so a single request cannot be used to post a book. Generous enough
   that no honest answer is ever cut: the longest field on the form asks how
   many hours someone wants. */
const MAX_FIELD = 500;
const MAX_NOTES = 5000;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Answers = Record<string, string>;

const clean = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

/** A subject is a header. Anything that could break it out gets flattened. */
const oneLine = (value: string): string => value.replace(/[\r\n]+/g, ' ').trim();

function compose(answers: Answers, spec: FormSpec) {
  const lines: string[] = [];

  for (const field of spec.fields) {
    const value = answers[field.id];
    if (value) lines.push(`${field.label}: ${value}`);
  }

  if (answers.notes) lines.push('', `${spec.notes.label}:`, answers.notes);

  /* Which form it was. With one inbox this is the only thing that separates
     a job application from a wedding, so it stays. */
  lines.push('', `Sent from the form on flyingacefarm.com${spec.path}`);

  return lines.join('\n');
}

/** One message, before either way of sending it has been chosen. */
type Message = { from: string; to: string; replyTo: string; subject: string; text: string };

/**
 * The farm's own mailbox, over SMTP. This is the route that needs no third
 * party and no new account: flyingacefarm.com already has these mailboxes, so
 * their credentials are enough.
 */
async function sendOverSmtp(host: string, message: Message): Promise<boolean> {
  /* Imported here rather than at the top of the file, so a deployment using
     the API route instead never loads it. */
  const { createTransport } = await import('nodemailer');

  const port = Number(env('SMTP_PORT') ?? 587);
  const transport = createTransport({
    host,
    port,
    /* 465 is implicit TLS; 587 starts in the clear and upgrades. Getting this
       pair wrong is the usual reason a working mailbox refuses to send. */
    secure: port === 465,
    auth: { user: env('SMTP_USER')!, pass: env('SMTP_PASS')! },
  });

  await transport.sendMail({
    from: message.from,
    to: message.to,
    replyTo: message.replyTo,
    subject: message.subject,
    text: message.text,
  });

  return true;
}

/** Resend's HTTP API. No SMTP port to get through, but a domain to verify. */
async function sendOverResend(key: string, message: Message): Promise<boolean> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: message.from,
      to: [message.to],
      reply_to: message.replyTo,
      subject: message.subject,
      text: message.text,
    }),
  });

  if (!response.ok) {
    console.error(`[enquiry] Resend returned ${response.status}: ${await response.text()}`);
    return false;
  }

  return true;
}

async function send(answers: Answers, spec: FormSpec): Promise<{ ok: boolean; to: string }> {
  const to = enquiry.events;

  const message: Message = {
    from: env('ENQUIRY_FROM') ?? 'Flying Ace Farm <inquiries@flyingacefarm.com>',
    to,
    /* So the farm can answer by pressing reply, rather than copying an address
       out of the body. */
    replyTo: answers.email,
    subject: oneLine(`${spec.subject} — ${oneLine(`${answers.first} ${answers.last}`.trim())}`),
    /* Plain text on purpose: nothing a stranger typed is ever handed to an
       HTML renderer, so there is nothing to escape and nothing to get wrong. */
    text: compose(answers, spec),
  };

  /* Whichever set of credentials the deployment has. The mailbox comes first
     because it is the farm's own and needs nothing set up anywhere else. */
  const smtpHost = env('SMTP_HOST');
  const resendKey = env('RESEND_API_KEY');

  try {
    if (smtpHost && env('SMTP_USER') && env('SMTP_PASS')) {
      return { ok: await sendOverSmtp(smtpHost, message), to };
    }

    if (resendKey) {
      return { ok: await sendOverResend(resendKey, message), to };
    }
  } catch (error) {
    console.error('[enquiry] the send failed:', error);
    return { ok: false, to };
  }

  console.error(
    '[enquiry] No mail credentials are set, so the inquiry was not sent. ' +
      'Set SMTP_HOST, SMTP_USER and SMTP_PASS, or RESEND_API_KEY. See .env.example.',
  );
  return { ok: false, to };
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const type = request.headers.get('content-type') ?? '';
  const asJson = type.includes('application/json');

  let raw: Record<string, unknown>;
  try {
    raw = asJson
      ? await request.json()
      : Object.fromEntries(await request.formData());
  } catch {
    return reply(asJson, redirect, { ok: false, status: 400, error: 'That inquiry could not be read.' });
  }

  /* An unrecognised `page` is treated as the event inquiry rather than
     rejected: a form cached from an older deploy should still reach someone. */
  const posted = clean(raw.page, 20);
  const kind: FormKind = isFormKind(posted) ? posted : 'events';
  const spec = forms[kind];

  const answers: Answers = { page: kind };
  for (const field of spec.fields) answers[field.id] = clean(raw[field.id], MAX_FIELD);
  answers.notes = clean(raw.notes, MAX_NOTES);

  /* The honeypot. It is off-screen and out of the tab order, so a person never
     meets it and anything that fills it is not one. Answered as a success:
     telling a bot what gave it away only teaches it. */
  if (clean(raw.company, MAX_FIELD)) {
    return reply(asJson, redirect, { ok: true, status: 200, to: enquiry.events });
  }

  /* Checked again here, not only in the browser: the form's own validation is
     for the visitor's benefit and anything can post to this address. */
  for (const field of spec.fields) {
    if (field.required && !answers[field.id]) {
      return reply(asJson, redirect, { ok: false, status: 400, error: `${field.label} is needed.` });
    }
  }

  /* The free-text box is required on some of these -- a bio, a message -- and
     it is not in the field list, so it is checked on its own. */
  if (spec.notes.required && !answers.notes) {
    return reply(asJson, redirect, { ok: false, status: 400, error: `${spec.notes.label} is needed.` });
  }

  if (!EMAIL.test(answers.email)) {
    return reply(asJson, redirect, { ok: false, status: 400, error: 'Please enter a valid email address.' });
  }

  let sent: { ok: boolean; to: string };
  try {
    sent = await send(answers, spec);
  } catch (error) {
    console.error('[enquiry] send threw:', error);
    sent = { ok: false, to: enquiry.events };
  }

  return sent.ok
    ? reply(asJson, redirect, { ok: true, status: 200, to: sent.to })
    : reply(asJson, redirect, {
        ok: false,
        status: 502,
        to: sent.to,
        error: 'The inquiry could not be sent just now.',
      });
};

type Outcome = { ok: boolean; status: number; to?: string; error?: string };
type Redirect = (path: string, status?: 301 | 302 | 303 | 307 | 308) => Response;

/** JSON for the script, a redirect for the browser doing it on its own. */
function reply(asJson: boolean, redirect: Redirect, outcome: Outcome): Response {
  if (asJson) {
    return new Response(JSON.stringify({ ok: outcome.ok, to: outcome.to, error: outcome.error }), {
      status: outcome.status,
      headers: { 'content-type': 'application/json' },
    });
  }

  const query = new URLSearchParams();
  if (outcome.to) query.set('to', outcome.to);
  if (!outcome.ok) query.set('failed', '1');
  /* A code, never the message itself: anything echoed out of a query string
     lets a stranger put their own words on the farm's own domain. The page
     holds the sentences and picks one. */
  if (outcome.status === 400) query.set('reason', 'incomplete');
  /* 303, so the browser follows it with a GET and a refresh never re-sends. */
  return redirect(`/inquiry-sent?${query}`, 303);
}

/** Anything but a POST has nothing to do here. */
export const ALL: APIRoute = () => new Response('Method not allowed', { status: 405, headers: { allow: 'POST' } });
