/**
 * The three pages behind the last of the footer's Explore links: careers,
 * contact and live music inquiries.
 *
 * Each one replaces a page on the farm's WordPress site and carries that
 * page's own facts -- the five roles it hires for, the addresses it answers
 * on, the kind of act it books and where its booking year currently stands.
 * Nothing here is invented: where the source page described a job only by its
 * title, the title is all that appears.
 *
 * The forms themselves live in `forms.ts`, because they share an endpoint
 * with the event inquiry rather than belonging to any one page.
 */

/* ---------------------------------------------------------------- careers */

export const careersHero = {
  eyebrow: 'Careers',
  title: 'Join our team',
  lede: 'Bartenders, kitchen staff and front of house. Tell us which room you want to be in and we will come back to you.',
};

/**
 * The five roles on the farm's own application form, in its order.
 *
 * Only the title and the room: that page lists no duties, no hours and no
 * pay, and a description written here would be this site inventing terms of
 * employment on the farm's behalf.
 */
export const roles = [
  { title: 'Distillery bartender', where: 'The tasting room' },
  { title: 'Brewery bartender', where: 'The taproom' },
  { title: 'Kitchen staff', where: 'The kitchen' },
  { title: 'Kitchen shift leader', where: 'The kitchen' },
  { title: 'Floor staff', where: 'Front of house' },
] as const;

export const rolesNote =
  'Not on the list? Choose “Something else” on the form and say what you are after.';

/* ---------------------------------------------------------------- contact */

export const contactHero = {
  eyebrow: 'Contact',
  title: 'Get in touch',
  lede: 'The farm sits on Flying Ace Lane, ten minutes from Lovettsville. Call, write, or send the form below.',
};

/**
 * `href` is built by the component from site.ts rather than written out here,
 * so the number and the inbox have one home on this site.
 */
export const contactWays = [
  {
    icon: 'pin' as const,
    kicker: 'Come by',
    note: 'Open Wednesday through Sunday. Hours and the farm rules are on the Visit page.',
    link: { text: 'Visit & FAQ', href: '/visit' },
  },
  {
    icon: 'calendar' as const,
    kicker: 'Hosting something',
    note: 'Weddings, corporate days and private parties are quoted from one form.',
    link: { text: 'Host your event', href: '/host-your-event' },
  },
  {
    icon: 'music' as const,
    kicker: 'Playing somewhere',
    note: 'Acoustic acts for Friday, Saturday and Sunday afternoons.',
    link: { text: 'Live music inquiries', href: '/live-music' },
  },
] as const;

/* ------------------------------------------------------------- live music */

export const musicHero = {
  eyebrow: 'Live Music Inquiries',
  title: 'Play the farm',
  lede: 'Live music every Friday, Saturday and Sunday, out on the lawn with Furnace Mountain behind you.',
};

export const musicWants = [
  { term: 'What we book', def: 'Acoustic solo, duo and trio acts. No drums.' },
  { term: 'When', def: 'Friday, Saturday and Sunday afternoons, three hours a set.' },
  { term: 'What it pays', def: 'Discussed when we get in touch. Shows are free for guests to attend.' },
] as const;

/**
 * The booking year, stated plainly and up front.
 *
 * The farm's own page leads with this, and it is the single most useful thing
 * an artist can read here: without it they fill in a form expecting an answer
 * that is months away. Worth checking against the farm's page each season --
 * when 2027 opens, this is the paragraph that changes.
 */
export const musicStatus = {
  kicker: 'Before you write',
  title: '2026 is fully booked',
  body: 'We are still reading every inquiry and keeping the ones that fit. Artists for 2027 will start hearing from us in late Fall 2026.',
  note: 'Inquiries are arriving in volume at the moment and each one is read properly before anybody is contacted, so give us time.',
};
