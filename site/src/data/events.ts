/**
 * Host Your Event page content.
 *
 * Transcribed from the "Host Your Event (incl. Weddings) — Desktop" artboard
 * (project/Events.dc.html) and cross-checked against
 * flyingacefarm.com/host-your-event/, which is where the 3D tour links and the
 * inquiry fields come from.
 */

const E = '/images/events-page';

export const eventsHero = {
  eyebrow: 'Host your event · weddings, corporate & private',
  title: 'Gather on the farm',
  lede: 'At the base of Furnace Mountain near the Potomac River: corporate events, private parties and weddings, with multiple spaces, custom brewery and distillery packages, and catering by Monk’s on the Farm.',
  image: `${E}/pavilion-dusk.jpg`,
  alt: 'The enclosed pavilion at dusk, its glass doors lit from inside',
};

/** The three things that answer "why here" before a visitor scrolls. */
export const eventFacts = [
  {
    icon: 'barn' as const,
    title: 'Multiple event spaces',
    body: 'A historic barn, an enclosed pavilion, a 19th-century farmhouse and outdoor spaces.',
  },
  {
    icon: 'bottle' as const,
    title: 'Custom packages',
    body: 'Brewery and distillery packages built around your guests.',
  },
  {
    icon: 'store' as const,
    title: 'Catering by Monk’s',
    body: 'Award-winning BBQ from our own kitchen, on site.',
  },
];

export type Venue = {
  id: string;
  name: string;
  meta: string;
  body: string;
  image: string;
  alt: string;
  /** Matterport walk-through, where the farm has published one. */
  tour?: string;
};

export const venues: Venue[] = [
  {
    id: 'barn',
    name: 'The Barn',
    meta: 'Historic two-story barn · restaurant & brewery',
    body: 'Multiple entertainment spaces and a 21+ area with dart boards, foosball, board games and live music in the winter months.',
    image: `${E}/barn.jpg`,
    alt: 'The barn’s upper floor, with its arched timber roof and long tables',
    tour: 'https://my.matterport.com/show/?m=4YMRysoYdsU',
  },
  {
    id: 'pavilion',
    name: 'The Pavilion',
    meta: '50′ × 80′ enclosed · indoor bar · stage',
    body: '24 glass sliding doors, string lights, ceiling fans and optional heat, with 360° views of the cornfields, pond, farmhouse and brewery. Ideal for corporate events, ceremonies, private parties, rehearsal dinners and weddings.',
    image: `${E}/pavilion.jpg`,
    alt: 'Inside the pavilion, picnic tables under string lights and ceiling fans',
    tour: 'https://my.matterport.com/show/?m=P37HxmMzqr1',
  },
  {
    id: 'farmhouse',
    name: 'The Farmhouse',
    meta: '19th-century brick farmhouse · bridal suite',
    body: 'A retro kitchen and multiple rooms for bridal showers, birthdays, dinner parties, retirement parties and small weddings.',
    image: `${E}/farmhouse.jpg`,
    alt: 'The brick farmhouse behind its white picket fence',
    tour: 'https://my.matterport.com/show/?m=yhDcyYHo8i8',
  },
  {
    id: 'outdoors',
    name: 'Outdoor Spaces & Playground',
    meta: 'Outdoor spaces · playground',
    body: 'Multiple outdoor spaces to enjoy, with a playground for younger guests.',
    image: `${E}/outdoor.jpg`,
    alt: 'Covered outdoor seating with the farmhouse beyond',
  },
];

export const weddings = {
  eyebrow: 'Weddings',
  title: 'Love takes flight',
  body: 'A seamless blend of timeless elegance and rustic charm. Say “I do” in the pavilion, get ready in the farmhouse bridal suite, and celebrate with Monk’s BBQ, craft beer and spirits made steps away.',
  email: 'weddings@flyingacefarm.com',
  cta: 'Plan Your Wedding',
  href: 'https://flyingacefarm.com/weddings/',
  image: '/images/wedding.jpg',
  alt: 'A couple on the lawn at Flying Ace Farm',
  inset: `${E}/bridal-suite.jpg`,
  insetAlt: 'The farmhouse bridal suite, with its vanity and exposed brick',
};

export const enquiry = {
  kicker: 'We’d love to host your next event',
  title: 'Tell us about your event',
  body: 'Share a few details and we’ll come back to you.',
  events: 'events@flyingacefarm.com',
  weddings: 'weddings@flyingacefarm.com',
};

/** Matches the fields on the farm's own inquiry form, in its order. */
export const enquiryFields = [
  { id: 'first', label: 'First name', type: 'text', autocomplete: 'given-name', required: true },
  { id: 'last', label: 'Last name', type: 'text', autocomplete: 'family-name', required: true },
  { id: 'phone', label: 'Phone', type: 'tel', autocomplete: 'tel', required: false },
  { id: 'email', label: 'Email', type: 'email', autocomplete: 'email', required: true },
  { id: 'date', label: 'What is your desired date?', type: 'date', autocomplete: '', required: false },
  { id: 'guests', label: 'How many people are you hosting?', type: 'number', autocomplete: '', required: false },
  { id: 'kind', label: 'What type of event are you hosting?', type: 'text', autocomplete: '', required: false },
  { id: 'hours', label: 'How many hours are you looking to host?', type: 'text', autocomplete: '', required: false },
] as const;
