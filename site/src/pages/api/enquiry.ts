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
 * Both shapes of request arrive as the form's own data, and the Accept
 * header is what tells them apart:
 *  - fetch() from the form's own script asks for JSON and is answered in kind;
 *  - the browser's native POST, when that script never loaded, does not, and
 *    is answered with a redirect to /inquiry-sent.
 * The second is what keeps the form working with no JavaScript at all, and it
 * is the reason the markup still carries a real action and method. JSON is
 * still read if something posts it, but nothing here sends it any more: the
 * careers form carries a file, and JSON cannot.
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

/* A filename arrives from a stranger and ends up in a mail header and on
   somebody's disk. Only the last segment, nothing that could start a new
   header line, and nothing that could climb out of a folder. */
const safeName = (raw: string): string => {
  const base = raw.split(/[\\/]/).pop() ?? '';
  const flat = base
    .replace(/[\r\n"]+/g, ' ')
    .replace(/[^\w .()\[\]-]+/g, '_')
    .replace(/^\.+/, '')
    .trim()
    .slice(0, 120);
  return flat || 'resume';
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * The same-origin check Astro's own would make, done where it can work.
 *
 * Against the Host the request actually arrived on, not a URL rebuilt inside
 * the function, which behind a proxy is not the one the browser asked for.
 *
 * A request carrying no Origin at all is let through to the checks below. A
 * browser always sends one on a cross-site POST, which is the thing being
 * guarded against; what it leaves out are the cases that were never the
 * threat. There is no session and no cookie here either, so the most this
 * protects is the farm's inbox from a form posted off another page.
 */
function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;

  const host = request.headers.get('host');
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

type Answers = Record<string, string>;

/** A file someone chose, once it has been measured and read. */
type Attachment = { filename: string; bytes: Uint8Array; label: string };

const clean = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

/** A subject is a header. Anything that could break it out gets flattened. */
const oneLine = (value: string): string => value.replace(/[\r\n]+/g, ' ').trim();

/**
 * The one upload any of these forms takes, off the posted body.
 *
 * Both limits are the field's own, so the form and the endpoint cannot drift
 * apart. The size is checked before the bytes are read. The extension is
 * checked rather than the type the browser reported, which is only ever a
 * guess from the same filename and is not evidence of anything.
 *
 * Returns undefined when nothing was chosen, which is the ordinary case: no
 * form on this site requires a file.
 */
async function readUpload(
  body: FormData,
  spec: FormSpec,
): Promise<{ file?: Attachment; error?: string }> {
  for (const field of spec.fields) {
    if (field.type !== 'file') continue;

    const picked = body.get(field.id);
    if (!(picked instanceof File) || picked.size === 0) continue;

    if (field.maxBytes && picked.size > field.maxBytes) {
      const mb = Math.round((field.maxBytes / (1024 * 1024)) * 10) / 10;
      return { error: `${field.label} must be under ${mb} MB.` };
    }

    const filename = safeName(picked.name);
    const allowed = (field.accept ?? '')
      .split(',')
      .map((a) => a.trim().toLowerCase())
      .filter((a) => a.startsWith('.'));
    const dot = filename.lastIndexOf('.');
    const ext = dot > 0 ? filename.slice(dot).toLowerCase() : '';

    if (allowed.length && !allowed.includes(ext)) {
      return { error: `${field.label} should be ${allowed.join(', ')}.` };
    }

    return {
      file: {
        filename,
        bytes: new Uint8Array(await picked.arrayBuffer()),
        /* Carried so the message names what was sent -- a resume on one form,
           a band photo on another -- rather than whichever came first. */
        label: field.label,
      },
    };
  }

  return {};
}

function compose(answers: Answers, spec: FormSpec, file?: Attachment) {
  const lines: string[] = [];

  for (const field of spec.fields) {
    /* A file is not a value to print. It is named below, with the body,
       where it reads as what it is. */
    if (field.type === 'file') continue;
    const value = answers[field.id];
    if (value) lines.push(`${field.label}: ${value}`);
  }

  if (file) lines.push(`${file.label}: ${file.filename}, attached`);

  if (answers.notes) lines.push('', `${spec.notes.label}:`, answers.notes);

  /* Which form it was. With one inbox this is the only thing that separates
     a job application from a wedding, so it stays. */
  lines.push('', `Sent from the form on flyingacefarm.com${spec.path}`);

  return lines.join('\n');
}

/** One message, before either way of sending it has been chosen. */
type Message = {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  attachment?: Attachment;
};

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
    attachments: message.attachment
      ? [{ filename: message.attachment.filename, content: Buffer.from(message.attachment.bytes) }]
      : undefined,
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
      /* Resend takes the bytes base64'd over its HTTP API. */
      attachments: message.attachment
        ? [
            {
              filename: message.attachment.filename,
              content: Buffer.from(message.attachment.bytes).toString('base64'),
            },
          ]
        : undefined,
    }),
  });

  if (!response.ok) {
    console.error(`[enquiry] Resend returned ${response.status}: ${await response.text()}`);
    return false;
  }

  return true;
}

async function send(
  answers: Answers,
  spec: FormSpec,
  file?: Attachment,
): Promise<{ ok: boolean; to: string }> {
  const to = spec.inbox;

  const message: Message = {
    from: env('ENQUIRY_FROM') ?? 'Flying Ace Farm <inquiries@flyingacefarm.com>',
    to,
    /* So the farm can answer by pressing reply, rather than copying an address
       out of the body. */
    replyTo: answers.email,
    subject: oneLine(`${spec.subject} - ${oneLine(`${answers.first} ${answers.last}`.trim())}`),
    /* Plain text on purpose: nothing a stranger typed is ever handed to an
       HTML renderer, so there is nothing to escape and nothing to get wrong. */
    text: compose(answers, spec, file),
    attachment: file,
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
  if (!sameOrigin(request)) {
    return new Response('Cross-site posts are not accepted here.', { status: 403 });
  }

  const type = request.headers.get('content-type') ?? '';
  /* What the caller will accept, not what it sent: the form's own script now
     posts the same multipart body the browser would, and the header is the
     only thing left that separates them. A browser posting this form on its
     own asks for HTML and gets the redirect. */
  const asJson = (request.headers.get('accept') ?? '').includes('application/json');

  let raw: Record<string, unknown>;
  /* Kept whole as well as flattened, because a File does not survive
     Object.fromEntries into a string map and the upload is read off this. */
  let body: FormData | null = null;
  try {
    if (type.includes('application/json')) {
      raw = await request.json();
    } else {
      body = await request.formData();
      raw = Object.fromEntries(body);
    }
  } catch {
    /* Before the body is parsed there is no form to name, so this one
       goes without a kind and the sent page falls back. */
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
    return reply(asJson, redirect, { ok: true, status: 200, to: spec.inbox, kind });
  }

  /* Checked again here, not only in the browser: the form's own validation is
     for the visitor's benefit and anything can post to this address. */
  for (const field of spec.fields) {
    if (field.required && !answers[field.id]) {
      return reply(asJson, redirect, { ok: false, status: 400, kind, error: `${field.label} is needed.` });
    }
  }

  /* The free-text box is required on some of these -- a bio, a message -- and
     it is not in the field list, so it is checked on its own. */
  if (spec.notes.required && !answers.notes) {
    return reply(asJson, redirect, { ok: false, status: 400, kind, error: `${spec.notes.label} is needed.` });
  }

  if (!EMAIL.test(answers.email)) {
    return reply(asJson, redirect, { ok: false, status: 400, kind, error: 'Please enter a valid email address.' });
  }

  /* Read last of the checks, so a four-megabyte resume is not held in memory
     while the answer is found to be missing a name. */
  const upload = body ? await readUpload(body, spec) : {};
  if (upload.error) {
    return reply(asJson, redirect, { ok: false, status: 400, kind, error: upload.error });
  }

  let sent: { ok: boolean; to: string };
  try {
    sent = await send(answers, spec, upload.file);
  } catch (error) {
    console.error('[enquiry] send threw:', error);
    sent = { ok: false, to: spec.inbox };
  }

  return sent.ok
    ? reply(asJson, redirect, { ok: true, status: 200, to: sent.to, kind })
    : reply(asJson, redirect, {
        ok: false,
        status: 502,
        to: sent.to,
        kind,
        error: 'The inquiry could not be sent just now.',
      });
};

type Outcome = { ok: boolean; status: number; to?: string; error?: string; kind?: FormKind };
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
  if (outcome.kind) query.set('for', outcome.kind);
  /* 303, so the browser follows it with a GET and a refresh never re-sends. */
  return redirect(`/inquiry-sent?${query}`, 303);
}

/** Anything but a POST has nothing to do here. */
export const ALL: APIRoute = () => new Response('Method not allowed', { status: 405, headers: { allow: 'POST' } });
