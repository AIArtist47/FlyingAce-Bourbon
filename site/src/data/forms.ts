/**
 * Every form on the site, in one place.
 *
 * There used to be one: the event inquiry. Careers, contact and live music
 * each want a different set of questions but the same machinery behind them
 * -- the same endpoint, the same honeypot, the same no-JavaScript fallback --
 * so the shape of a form is data here and the component renders whichever one
 * it is handed.
 *
 * Every one goes to the same inbox. That is the farm's own instruction: one
 * address for the whole site, so nothing lands in a mailbox nobody reads.
 * `kind` rides along with the message and names the form it came from, which
 * is what tells a job application apart from a wedding.
 */

export type FormFieldType = 'text' | 'tel' | 'email' | 'date' | 'number' | 'url' | 'select';

export interface FormField {
  id: string;
  label: string;
  type: FormFieldType;
  autocomplete?: string;
  required: boolean;
  /** Takes the full width of the grid rather than half. */
  wide?: boolean;
  /** `select` only. The first entry is the empty prompt. */
  options?: readonly string[];
}

export type FormKind = 'events' | 'weddings' | 'careers' | 'contact' | 'music';

export interface FormSpec {
  /** The subject stem. The sender's name is appended to it. */
  subject: string;
  /** Where this form lives, named in the message so the farm knows its origin. */
  path: string;
  /** What the thing being sent is called, for the line shown once it has gone. */
  sentNoun: string;
  kicker: string;
  title: string;
  body: string;
  fields: readonly FormField[];
  /** The free-text box at the end of every form. */
  notes: { label: string; required: boolean; rows: number };
  submit: string;
  /** The sentence under the send button, where one is needed. */
  foot?: string;
}

/* Shared head of every form. Asked in the same order and worded the same way
   wherever they appear, so a visitor filling in a second one is not reading
   a different site. */
const person: readonly FormField[] = [
  { id: 'first', label: 'First name', type: 'text', autocomplete: 'given-name', required: true },
  { id: 'last', label: 'Last name', type: 'text', autocomplete: 'family-name', required: true },
  { id: 'phone', label: 'Phone', type: 'tel', autocomplete: 'tel', required: false },
  { id: 'email', label: 'Email', type: 'email', autocomplete: 'email', required: true },
];

export const forms: Record<FormKind, FormSpec> = {
  /* The two that already existed. Unchanged, down to the wording. */
  events: {
    subject: 'Event inquiry',
    sentNoun: 'inquiry',
    path: '/host-your-event',
    kicker: 'We’d love to host your next event',
    title: 'Tell us about your event',
    body: 'Share a few details and we’ll come back to you.',
    fields: [
      ...person,
      { id: 'date', label: 'What is your desired date?', type: 'date', required: false },
      { id: 'guests', label: 'How many people are you hosting?', type: 'number', required: false },
      { id: 'kind', label: 'What type of event are you hosting?', type: 'text', required: false, wide: true },
      { id: 'hours', label: 'How many hours are you looking to host?', type: 'text', required: false },
    ],
    notes: { label: 'Anything else you’d like to include?', required: false, rows: 4 },
    submit: 'Send Inquiry',
  },

  weddings: {
    subject: 'Wedding inquiry',
    sentNoun: 'inquiry',
    path: '/weddings',
    kicker: 'We’d love to host your next event',
    title: 'Tell us about your event',
    body: 'Share a few details and we’ll come back to you.',
    fields: [
      ...person,
      { id: 'date', label: 'What is your desired date?', type: 'date', required: false },
      { id: 'guests', label: 'How many people are you hosting?', type: 'number', required: false },
      { id: 'kind', label: 'What type of event are you hosting?', type: 'text', required: false, wide: true },
      { id: 'hours', label: 'How many hours are you looking to host?', type: 'text', required: false },
    ],
    notes: { label: 'Anything else you’d like to include?', required: false, rows: 4 },
    submit: 'Send Inquiry',
  },

  /**
   * The roles are the five on the farm's own application form, in its order.
   *
   * That form takes a resume as an upload. This one asks for it by email
   * instead: the message is sent by a function with no file store behind it,
   * and a 32MB attachment is not something to post through it. The note under
   * the button says so, rather than leaving an applicant to wonder.
   */
  careers: {
    subject: 'Job application',
    sentNoun: 'application',
    path: '/careers',
    kicker: 'Work at the farm',
    title: 'We’d love for you to join our team',
    body: 'Tell us who you are and what you’d like to do. We read every application.',
    fields: [
      ...person,
      {
        id: 'position',
        /* Not 'Which position?': required labels are read back in the error 
           line, and 'Which position? is needed.' is not a sentence. */
        label: 'Position',
        type: 'select',
        required: true,
        wide: true,
        options: [
          'Distillery bartender',
          'Brewery bartender',
          'Kitchen staff',
          'Kitchen shift leader',
          'Floor staff',
          'Something else',
        ],
      },
    ],
    notes: { label: 'Tell us about yourself and any experience you have', required: false, rows: 5 },
    submit: 'Send Application',
    foot: 'Have a resume? Reply to our answer with it attached, or send it to the same address.',
  },

  contact: {
    subject: 'Message from the website',
    sentNoun: 'message',
    path: '/contact',
    kicker: 'Get in touch',
    title: 'Send us a message',
    body: 'Anything that is not an event or a booking. We answer by email.',
    fields: [...person],
    notes: { label: 'Your message', required: true, rows: 6 },
    submit: 'Send Message',
  },

  /**
   * The questions the farm's own musician form asks, less the photo upload,
   * which the links below it cover better than an attachment would.
   */
  music: {
    subject: 'Live music inquiry',
    sentNoun: 'inquiry',
    path: '/live-music',
    kicker: 'Play the farm',
    title: 'Tell us about your act',
    body: 'Acoustic solo, duo and trio acts, Friday through Sunday. Tell us who you are, what you play, and where we can hear it.',
    fields: [
      ...person,
      { id: 'band', label: 'Band or act name', type: 'text', required: true },
      { id: 'genre', label: 'Genre', type: 'text', required: false },
      { id: 'website', label: 'Website', type: 'url', required: false },
      { id: 'social', label: 'Facebook or Instagram', type: 'url', required: false },
    ],
    /* Just 'Bio', the word the farm's own form uses: the label is read back
       in the error line, and a label with a dash in it does not survive that. */
    notes: { label: 'Bio', required: true, rows: 6 },
    submit: 'Send Inquiry',
  },
};

export const isFormKind = (v: unknown): v is FormKind =>
  typeof v === 'string' && Object.prototype.hasOwnProperty.call(forms, v);
