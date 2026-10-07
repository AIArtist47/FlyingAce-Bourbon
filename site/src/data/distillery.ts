import { site } from './site';

/**
 * Distillery page content.
 *
 * Transcribed from the Distillery — Desktop artboard (project/Spirits.dc.html).
 * Prices, availability, tasting notes and cocktail builds were cross-checked
 * against flyingacefarm.com/distillery/; the bottle and cocktail shots come
 * from that page and live in public/images/distillery/.
 */

const D = '/images/distillery';

/** Filter groups for the lineup. `all` is implicit. */
export type SpiritGroup = 'blended' | 'limited' | 'whiskey-rum';

export const lineupFilters: { id: 'all' | SpiritGroup; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'blended', label: 'Blended' },
  { id: 'limited', label: 'Limited Release' },
  { id: 'whiskey-rum', label: 'Whiskey & Rum' },
];

export type BadgeTone = 'navy' | 'accent' | 'muted';

export const lineup = [
  {
    id: 'cask-strength',
    group: 'blended',
    badge: 'Double Gold',
    badgeTone: 'navy',
    name: 'Cask Strength Blended Bourbon',
    note: 'Full-bodied four-grain blend of three whiskeys. Allspice and honey, with white pepper and gingerbread.',
    price: '$64.99',
    availability: 'ABC store · Ships online',
    image: `${D}/cask-strength.jpg`,
    alt: 'American Ace Cask Strength Blended Bourbon bottle',
  },
  {
    id: '90-proof',
    group: 'blended',
    badge: 'Silver medal',
    badgeTone: 'navy',
    name: '90 Proof Blended Bourbon',
    note: 'Medium-bodied four-grain blend. Rose petal and cinnamon, mellowing to honeysuckle and candied apple.',
    price: '$44.99',
    availability: 'ABC store · Ships online',
    image: `${D}/90-proof.jpg`,
    alt: 'American Ace 90 Proof Blended Bourbon bottle',
  },
  {
    id: 'honey-barrel',
    group: 'limited',
    badge: 'Limited release',
    badgeTone: 'accent',
    name: 'Honey Barrel Straight Bourbon',
    note: 'Finished in charred Virginia oak that once held honey. Rose petal, crème brûlée and cinnamon toast.',
    price: '$79.99',
    availability: 'ABC store · Ships online',
    image: `${D}/honey-barrel.jpg`,
    alt: 'Honey Barrel single barrel bottle',
  },
  {
    id: 'rum-barrel',
    group: 'limited',
    badge: 'Limited · Out of stock',
    badgeTone: 'muted',
    name: 'Rum Barrel Straight Bourbon',
    note: 'Finished in a once-used rum cask. Vanilla, allspice, molasses, crème brûlée and gingerbread.',
    price: '$79.99',
    availability: 'Out of stock',
    image: `${D}/rum-barrel.jpg`,
    alt: 'Rum Barrel single barrel bottle',
  },
  {
    id: 'toasted-barrel',
    group: 'limited',
    badge: 'Limited release',
    badgeTone: 'accent',
    name: 'Toasted Barrel Straight Bourbon',
    note: 'Rested in toasted, lightly charred new oak. Spiced vanilla and dark fruit; caramel apple finish.',
    price: '$79.99',
    availability: 'ABC store',
    image: `${D}/toasted-barrel.jpg`,
    alt: 'Toasted Barrel single barrel bottle',
  },
  {
    id: 'christmas-blend',
    group: 'limited',
    badge: 'Limited · Low inventory',
    badgeTone: 'accent',
    name: 'Christmas Blend',
    note: 'Four-grain blend finished in maple syrup barrels. Maple, caramelized sugar, vanilla and toasted oak.',
    price: '$84.99',
    availability: 'ABC store',
    image: `${D}/christmas.jpg`,
    alt: 'Christmas Blend bottle',
  },
  {
    id: 'white-dog',
    group: 'whiskey-rum',
    badge: 'Silver · World Whiskies',
    badgeTone: 'navy',
    name: 'White Dog',
    note: 'Three-grain whiskey starring our Bloody Butcher corn. Grain-forward, with banana bread and kettle corn.',
    price: '$29.99',
    availability: 'ABC store',
    image: `${D}/white-dog.jpg`,
    alt: 'White Dog bottle',
  },
  {
    id: 'american-ace-rum',
    group: 'whiskey-rum',
    badge: 'Bronze medal',
    badgeTone: 'navy',
    name: 'American Ace Rum',
    note: 'Silver rum distilled from molasses. Light-bodied and silky, with toasted sugar notes.',
    price: '$29.99',
    availability: 'ABC store',
    image: `${D}/rum.jpg`,
    alt: 'American Ace Rum bottle',
  },
] satisfies {
  id: string;
  group: SpiritGroup;
  badge: string;
  badgeTone: BadgeTone;
  name: string;
  note: string;
  price: string;
  availability: string;
  image: string;
  alt: string;
}[];

export const howToBuy = [
  {
    icon: 'store',
    title: 'Visit the farm',
    body: 'Shop the full American Ace lineup at our on-site Virginia ABC store.',
    cta: 'Hours & directions',
    href: '#tasting-hours',
    external: false,
  },
  {
    icon: 'flag',
    title: 'Virginia ABC stores',
    body: '90 Proof and Cask Strength Blended Bourbon are at select Virginia ABC stores. Don’t see it? Request it.',
    cta: 'Find a store',
    href: 'https://www.abc.virginia.gov/',
    external: true,
  },
  {
    icon: 'bottle',
    title: 'Order spirits online',
    body: 'Select American Ace Spirits shipped directly to your door where permitted.',
    cta: 'Order Spirits',
    href: site.spiritsShop,
    external: true,
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Featured trio — "Take off with our homegrown spirits"                      */
/* -------------------------------------------------------------------------- */

/** Fisher–Yates. A `sort(() => Math.random() - 0.5)` shuffle is measurably
 *  biased, which would quietly favour the same bottles every build. */
function shuffle<T>(items: readonly T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export const FEATURE_COUNT = 3;

/**
 * The "curated" half of curated-random: only bottles someone can actually
 * walk out with are eligible, so the showcase never leads with something
 * that is out of stock.
 *
 * Drawn once per build — every deploy features a different trio. Flip this to
 * a per-visit shuffle if you would rather it change on every page load.
 */
export const featured = shuffle(lineup.filter((s) => s.availability !== 'Out of stock')).slice(
  0,
  FEATURE_COUNT,
);

export const cocktails = [
  {
    name: 'Old Fashioned',
    build: '90 Proof Blended Bourbon · bourbon syrup · orange & mole bitters · Fabbri cherry',
    image: `${D}/ck-old-fashioned.jpg`,
  },
  {
    name: 'Maple Bacon Old Fashioned',
    build: 'Bacon fat-washed 90 Proof · maple syrup · Angostura · bacon garnish',
    image: `${D}/ck-maple-bacon.jpg`,
  },
  {
    name: 'Banana Bread Old Fashioned',
    build: 'Banana-infused Honey Barrel · Banane du Brésil · black walnut & mole bitters',
    image: `${D}/ck-banana-bread.jpg`,
  },
  {
    name: 'Bourbon Smash',
    build: '90 Proof · fresh lemon · mint syrup · local honey · fresh mint',
    image: `${D}/ck-bourbon-smash.jpg`,
  },
  {
    name: 'The Halekulani',
    build: '90 Proof · lemon, orange & pineapple · demerara · grenadine · Angostura',
    image: `${D}/ck-halekulani.jpg`,
  },
  {
    name: 'Mai Tai',
    build: 'Pineapple-infused American Ace Rum · dark rum · orgeat · dry Curaçao · lime',
    image: `${D}/ck-mai-tai.jpg`,
  },
  {
    name: 'Banana Daiquiri',
    build: 'Banana & cinnamon American Ace Rum · banana liqueur · lime · Coco López',
    image: `${D}/ck-banana-daiquiri.jpg`,
  },
  {
    name: 'Bourbon Painkiller',
    build: '90 Proof · fresh orange · pineapple · Coco López',
    image: `${D}/ck-painkiller.jpg`,
  },
];

export const tastingRoomHours = [
  { day: 'Wed & Thu', time: 'Tasting room closed · bottle sales open' },
  { day: 'Friday', time: '11:30am – 8:00pm' },
  { day: 'Saturday', time: '11:30am – 8:00pm' },
  { day: 'Sunday', time: '11:30am – 7:00pm' },
];

export const goodToKnow = [
  {
    title: 'Mocktails',
    body: 'Non-alcoholic versions of the mojitos are available on request.',
  },
  {
    title: 'Featured wine',
    body: 'Walsh Family Winery: Red Blend, Sauvignon Blanc and Rosé.',
  },
];

/** Hero art reuses the farm's distillery photograph already in public/images. */
export const distilleryHero = '/images/distillery.jpg';
