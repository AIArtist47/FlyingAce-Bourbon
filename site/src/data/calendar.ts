/**
 * Calendar page content.
 *
 * Transcribed from flyingacefarm.com/calendar/ (The Events Calendar list view).
 * Each entry keeps the live site's permalink so a visitor can still reach the
 * full listing, and the artist photo is mirrored into public/images/events/.
 *
 * `date` is ISO so grouping and sorting never depend on the display strings.
 * When the farm publishes a new season, add entries here - the month headings,
 * the "next up" callout and the counts all derive from this array.
 */

const E = '/images/events';

export type EventItem = {
  /** ISO date, used for grouping, sorting and <time datetime>. */
  date: string;
  /** Doors-to-close, as the farm writes it. */
  start: string;
  end: string;
  /** The performer, not the full WordPress post title. */
  artist: string;
  /** One line of the artist's own bio, trimmed to a sentence that stands alone. */
  note: string;
  /** Set where the farm calls it out - drives the accent badge. */
  badge?: string;
  image: string;
  alt: string;
  href: string;
};

export const events: EventItem[] = [
  {
    date: '2026-10-17',
    start: '3:00pm',
    end: '6:00pm',
    artist: 'John “JP” Jones',
    note: 'Grew up in Lucketts and still calls Loudoun County home. Taught himself guitar at ten from chord books and records.',
    image: `${E}/jp-jones.jpg`,
    alt: 'John “JP” Jones playing guitar',
    href: 'https://flyingacefarm.com/calendar/live-music-w-john-jp-jones-at-flying-ace-farm-10/',
  },
  {
    date: '2026-10-18',
    start: '2:00pm',
    end: '5:00pm',
    artist: 'Drew Stevyns',
    note: 'Performing since the age of two, he started out singing in church choirs in England before returning to the States.',
    badge: 'America’s Got Talent',
    image: `${E}/drew-stevyns.jpg`,
    alt: 'Drew Stevyns performing',
    href: 'https://flyingacefarm.com/calendar/live-music-stevyns/',
  },
  {
    date: '2026-11-01',
    start: '2:00pm',
    end: '5:00pm',
    artist: 'Alex Kerns',
    note: 'Known to genre-bend - the Beatles to Tyler Childers to the Americana vibe of his own originals.',
    image: `${E}/alex-kerns.jpg`,
    alt: 'Alex Kerns band photo',
    href: 'https://flyingacefarm.com/calendar/live-music-featuring-alex-kerns-2/',
  },
  {
    date: '2026-11-07',
    start: '3:00pm',
    end: '6:00pm',
    artist: 'Jake Phillips',
    note: 'A singer-songwriter who has toured the US and Europe, Singapore, Canada and points beyond.',
    image: `${E}/jake-phillips.jpg`,
    alt: 'Jake Phillips with a guitar',
    href: 'https://flyingacefarm.com/calendar/live-music-jake-phillips-3/',
  },
  {
    date: '2026-11-14',
    start: '3:00pm',
    end: '6:00pm',
    artist: 'Laura Cashman',
    note: 'A powerhouse vocalist covering the 70s through today, with a few originals thrown in the mix.',
    image: `${E}/laura-cashman.jpg`,
    alt: 'Laura Cashman singing',
    href: 'https://flyingacefarm.com/calendar/live-music-laura-cashman/',
  },
  {
    date: '2026-11-21',
    start: '3:00pm',
    end: '6:00pm',
    artist: 'Chris Bowen',
    note: 'Northern Virginia singer and guitarist - an easy afternoon set to go with a glass of something handcrafted.',
    image: `${E}/chris-bowen.jpg`,
    alt: 'Chris Bowen performing',
    href: 'https://flyingacefarm.com/calendar/live-music-chris-bowen/',
  },
  {
    date: '2026-11-29',
    start: '2:00pm',
    end: '5:00pm',
    artist: 'Melanie Pearl',
    note: 'Northern Virginia vocalist closing out the month on the Sunday after Thanksgiving.',
    image: `${E}/melanie-pearl.jpg`,
    alt: 'Melanie Pearl singing',
    href: 'https://flyingacefarm.com/calendar/live-music-melanie-pearl/',
  },
  {
    date: '2026-12-06',
    start: '2:00pm',
    end: '5:00pm',
    artist: 'Dylan Woelfel',
    note: 'Virginia singer-songwriter, playing an afternoon alongside the American Ace lineup.',
    image: `${E}/dylan-woelfel.jpg`,
    alt: 'Dylan Woelfel performing',
    href: 'https://flyingacefarm.com/calendar/live-musicdylan-woelfel/',
  },
  {
    date: '2026-12-13',
    start: '2:00pm',
    end: '5:00pm',
    artist: 'Joey Hafner',
    note: 'A Lovettsville local - high-energy acoustic sets as a solo artist and as frontman of a party rock cover band.',
    badge: 'Lovettsville local',
    image: `${E}/joey-hafner.jpg`,
    alt: 'Joey Hafner playing guitar',
    href: 'https://flyingacefarm.com/calendar/live-music-joey-hafner-2/',
  },
  {
    date: '2026-12-19',
    start: '3:00pm',
    end: '6:00pm',
    artist: 'Jake Phillips',
    note: 'Back for a second set before the holidays, with the same powerful voice and dynamic guitar.',
    image: `${E}/jake-phillips.jpg`,
    alt: 'Jake Phillips with a guitar',
    href: 'https://flyingacefarm.com/calendar/live-music-jake-phillips-4/',
  },
  {
    date: '2026-12-20',
    start: '2:00pm',
    end: '5:00pm',
    artist: 'Alex Kerns',
    note: 'A second Sunday afternoon of genre-bending covers and originals to close the year.',
    image: `${E}/alex-kerns.jpg`,
    alt: 'Alex Kerns band photo',
    href: 'https://flyingacefarm.com/calendar/live-music-featuring-alex-kerns-3/',
  },
  {
    date: '2026-12-26',
    start: '3:00pm',
    end: '6:00pm',
    artist: 'Morgan Gonce',
    note: 'A 19-year-old award-winning guitarist, producer and songwriter from Baltimore, moving between R&B, folk, pop and indie.',
    badge: 'Award-winning',
    image: `${E}/morgan-gonce.jpg`,
    alt: 'Morgan Gonce with a guitar',
    href: 'https://flyingacefarm.com/calendar/live-music-morgan-gonce/',
  },
  {
    date: '2026-12-27',
    start: '2:00pm',
    end: '5:00pm',
    artist: 'Britton James',
    note: 'Northern Virginia musician playing the last Sunday of the year on the farm.',
    image: `${E}/britton-james.jpg`,
    alt: 'Britton James performing',
    href: 'https://flyingacefarm.com/calendar/live-music-britton-james/',
  },
];

/**
 * Subscribe targets, all four pointed at the same feed: The Events Calendar's
 * own export, which is what the farm already publishes.
 *
 * Two spellings of one URL, because the handlers differ. A `webcal://` link is
 * what hands a feed to whatever calendar the machine has registered, which is
 * the whole job of the iCalendar entry. The two Outlooks and Google take the
 * feed as a query parameter instead, and want it over https -- `addfromweb`
 * rejects a webcal URL.
 */
const FEED_PATH = 'flyingacefarm.com/?post_type=tribe_events&ical=1&eventDisplay=list';
/* Where the farm's own calendar lives, for the two exports below. */
const CAL_BASE = 'https://flyingacefarm.com/calendar';
const FEED_WEBCAL = `webcal://${FEED_PATH}`;
const FEED_HTTPS = `https://${FEED_PATH}`;
const CAL_NAME = 'Flying Ace Farm';

export const subscribe = [
  {
    label: 'Google Calendar',
    href: `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(FEED_HTTPS)}`,
  },
  { label: 'iCalendar', href: FEED_WEBCAL },
  {
    label: 'Outlook 365',
    href: `https://outlook.office.com/calendar/0/addfromweb?url=${encodeURIComponent(FEED_HTTPS)}&name=${encodeURIComponent(CAL_NAME)}`,
  },
  {
    label: 'Outlook Live',
    href: `https://outlook.live.com/calendar/0/addfromweb?url=${encodeURIComponent(FEED_HTTPS)}&name=${encodeURIComponent(CAL_NAME)}`,
  },
  /* The last two are a file, not a feed: they hand over a .ics of what is
     booked now and never update again. The farm's own calendar offers both
     and in this order, so they sit at the end rather than among the four
     that subscribe. `file` is what keeps them out of a new tab -- a download
     opened with target=_blank leaves an empty one behind. */
  { label: 'Export .ics file', href: `${CAL_BASE}/list/?ical=1`, file: true },
  { label: 'Export Outlook .ics file', href: `${CAL_BASE}/list/?outlook-ical=1`, file: true },
];

/* ---------------------------------------------------------------------- */
/* Derived - nothing below is hand-maintained                             */
/* ---------------------------------------------------------------------- */

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Parsed as UTC so the rendered weekday never shifts with the build machine's zone. */
function parts(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return {
    year: y,
    monthIndex: m - 1,
    month: MONTHS[m - 1],
    day: d,
    weekday: DAYS[dt.getUTCDay()],
  };
}

/**
 * The address each show gets on this site. The date is part of it because two
 * of these artists play twice this season and a name alone would collide --
 * and because a reader who sees the URL can tell which night it is.
 *
 * Deliberately not the WordPress permalink, which reads
 * "live-music-w-john-jp-jones-at-flying-ace-farm-10": the trailing number is
 * that install's own disambiguation and means nothing here.
 */
const slugify = (artist: string, date: string) =>
  `${artist
    .toLowerCase()
    .replace(/[‘’“”']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}-${date}`;

export type DecoratedEvent = EventItem & ReturnType<typeof parts> & { slug: string; path: string };

const decorated: DecoratedEvent[] = events
  .map((e) => {
    const slug = slugify(e.artist, e.date);
    return { ...e, ...parts(e.date), slug, path: `/calendar/${slug}` };
  })
  .sort((a, b) => a.date.localeCompare(b.date));

/** Every show, in order, for the per-show pages and their prev/next. */
export const allShows = decorated;

export type MonthGroup = { key: string; month: string; year: number; items: DecoratedEvent[] };

/** Events bucketed into the month headings the page scrolls through. */
export const months: MonthGroup[] = decorated.reduce<MonthGroup[]>((acc, e) => {
  const key = `${e.year}-${e.monthIndex}`;
  const last = acc[acc.length - 1];
  if (last && last.key === key) last.items.push(e);
  else acc.push({ key, month: e.month, year: e.year, items: [e] });
  return acc;
}, []);

export const nextUp = decorated[0];
export const eventCount = decorated.length;

/** "October – December" for the hero, however many months the season spans. */
export const season =
  months.length > 1 ? `${months[0].month} – ${months[months.length - 1].month}` : months[0].month;
