import { site } from './site';

/**
 * Visit & FAQ page content.
 *
 * The questions, answers and the farm rules are transcribed from
 * flyingacefarm.com/faq/ — the farm's own words, not rewritten.
 *
 * Two deliberate departures, both noted where they occur:
 *  - The old page's emoticons are dropped. They are the only ones anywhere on
 *    the site and the voice everywhere else carries without them.
 *  - Where an answer points at a "Menu tab" or a "Gift Card tab", it is
 *    repointed at the page that actually exists here. Sending a reader to a
 *    tab this navigation does not have is worse than rewording the sentence.
 *
 * Hours are not restated: the footer, the distillery page and this page all
 * read restaurantHours and distilleryHours from site.ts, so they cannot drift.
 */

export const visitHero = {
  eyebrow: 'Plan your visit',
  title: 'Visit & FAQ',
  lede: 'A working farm in Lovettsville, Virginia, with a restaurant, a brewery, a distillery and an on-site ABC store. Here is when we are open, how to find us, and what people ask most.',
};

export const visitAddress = {
  street: site.street,
  cityState: site.cityState,
  directions: site.directions,
  phone: site.phone,
  phoneHref: site.phoneHref,
};

export type Faq = {
  q: string;
  /** Paragraphs. A `link` turns the named phrase into an anchor. */
  a: string;
  link?: { text: string; href: string; external?: boolean };
};

export const faqs: Faq[] = [
  {
    q: 'Can you order American Ace spirits online?',
    a: 'Yes — we ship directly to you where permitted.',
    link: { text: 'Order spirits online', href: site.spiritsShop, external: true },
  },
  {
    q: 'What food options does Flying Ace Farm have?',
    a: 'Monk’s on the Farm is our on-site restaurant, serving BBQ, smashburgers, veggie burgers, fried chicken and seasonal salads. There are weekly specials too: Kids Eat Free and a food special every Wednesday, a Burger of the Week on Thursday, and Friday specials.',
    /* The farm's answer says "under our Menu tab". There is no Menu tab in
       this navigation, so it points at the menu itself. */
    link: { text: 'See the full menu', href: '/restaurant#menu' },
  },
  {
    q: 'Do you allow outside food?',
    a: 'No outside food or beverages, with the exception of birthday cakes.',
  },
  {
    q: 'Do you take reservations?',
    a: 'No reservations are required — there is plenty of indoor and outdoor space. For small and large group gatherings, email us to arrange tables.',
    link: { text: 'events@flyingacefarm.com', href: 'mailto:events@flyingacefarm.com' },
  },
  {
    q: 'Do you allow dogs at Flying Ace Farm?',
    a: 'Yes, we are pet friendly as long as your pet is friendly. Outside only, and leashed at all times.',
  },
  {
    q: 'Do you have music? Where can I sign my band up to play?',
    a: 'Yes — live music every Friday, Saturday and Sunday. To play here, fill in the inquiry form.',
    link: {
      text: 'Live music inquiries',
      href: 'https://flyingacefarm.com/live-music-inquiries/',
      external: true,
    },
  },
  {
    q: 'Do you host private events?',
    a: 'Yes. Tell us about your event and we will come back to you.',
    link: { text: 'Send an inquiry', href: '/host-your-event#enquire' },
  },
  {
    q: 'Do you host weddings?',
    a: 'Yes. The pavilion, the farmhouse bridal suite and the open lawns are all available.',
    link: { text: 'Weddings at Flying Ace Farm', href: '/weddings' },
  },
  {
    q: 'Do you offer gift cards?',
    a: 'Yes, gift cards are available to buy online.',
    link: { text: 'Buy a gift card', href: 'https://flyingacefarm.com/gift-cards/', external: true },
  },
  {
    q: 'Is the disc golf course open to the public?',
    a: 'No — the course is private and requires approval before playing. For more information, contact Pete Thomas.',
    link: { text: 'pete@flyingacefarm.com', href: 'mailto:pete@flyingacefarm.com' },
  },
];

/**
 * The farm's rules, in its own order. Split into the two that read as welcome
 * rather than restriction and the rest, so the list does not open on a wall of
 * "no" — the wording of every one is unchanged.
 */
export const farmRules = [
  'No outside food or drink',
  'No loitering',
  'No soliciting',
  'No coolers, backpacks, or any bags other than a purse and/or a diaper bag',
  'No tents',
  'No drones or any RC devices',
  'Parking is for patrons only',
  'Overnight parking is not permitted',
  'Children are welcome but must be accompanied by an adult and supervised at all times (not permitted in the 21+ area)',
  'Sports equipment is not permitted — balls, bats, frisbees and the like',
  'Pet friendly — must be leashed at all times, and in our outdoor areas only',
  'We are a working farm and ask patrons to stay in designated areas. Please keep out of the pond, creeks, cornfields, drain fields, septic fields and production areas, unless otherwise permitted, as on a tour',
];

export const rulesNote = 'Have fun.';
