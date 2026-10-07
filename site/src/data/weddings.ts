/**
 * Weddings page content.
 *
 * Transcribed from flyingacefarm.com/weddings/ — the headline, the long
 * introduction, both venue descriptions, the two Matterport tours and the
 * brochure are the farm's own words and links, not rewritten. Nothing here is
 * invented: every figure (86 acres, 50' x 80', the 1830s farmhouse) appears on
 * that page or on /host-your-event/.
 *
 * The photographs are the farm's own wedding galleries, three weddings' worth,
 * re-encoded at the sizes this page actually renders.
 */

const W = '/images/weddings';

export const weddingHero = {
  eyebrow: 'Weddings at Flying Ace Farm',
  title: 'Love takes flight',
  lede: 'Say “I do” amidst 86 acres of working farm at the base of Furnace Mountain, near the Potomac River in Loudoun County, Virginia.',
  image: `${W}/hero.webp`,
  alt: 'A couple in the cornfield at golden hour, the bride’s veil carried out behind her',
};

/** The farm's own introduction, kept whole. */
export const weddingIntro = {
  lead: 'Nestled at the base of Furnace Mountain near the Potomac River in Loudoun County, Virginia, Flying Ace Farm beckons you to say “I do” amidst 86 acres of natural beauty.',
  body: [
    'Our working farm is enveloped by picturesque Bloody Butcher cornfields, providing a charming rural backdrop for your special day. Immerse yourself in history as you celebrate in the shadow of a meticulously preserved farmhouse dating back to the 1830’s.',
    'With multiple enchanting event spaces, an on-site distillery, brewery, restaurant, and customizable catering options, Flying Ace Farm ensures your wedding is a seamless blend of timeless elegance and rustic charm.',
  ],
};

/**
 * The three things that are true of this venue and of almost no other, pulled
 * from the sentence above rather than invented as marketing.
 */
export const weddingFacts = [
  { value: '86', suffix: '', label: 'Acres of working farm' },
  { value: '1830', suffix: 's', label: 'Preserved brick farmhouse' },
  { value: '50', suffix: '′ × 80′', label: 'Enclosed pavilion' },
];

export const weddingSpaces = [
  {
    id: 'pavilion',
    name: 'The Pavilion',
    meta: '50′ × 80′ enclosed · indoor bar · stage',
    body: '24 glass sliding doors, an indoor bar, a stage, string lights, ceiling fans and optional heating, with a 360° view of the cornfields, pond, farmhouse and brewery. Ideal for ceremonies, rehearsal dinners and receptions.',
    note: 'Picnic tables optional',
    image: '/images/events-page/pavilion.jpg',
    alt: 'Inside the pavilion, picnic tables under string lights and ceiling fans',
    tour: 'https://my.matterport.com/show/?m=P37HxmMzqr1',
  },
  {
    id: 'farmhouse',
    name: 'The Farmhouse',
    meta: '19th-century brick · bridal suite · retro kitchen',
    body: 'A 19th-century brick farmhouse with a bridal suite, a retro kitchen and multiple spaces for entertaining. Ideal for bridal showers, dinner parties and small weddings.',
    note: 'Bridal suite on site',
    image: '/images/events-page/farmhouse.jpg',
    alt: 'The brick farmhouse behind its white picket fence',
    tour: 'https://my.matterport.com/show/?m=yhDcyYHo8i8',
  },
];

export const weddingBrochure = {
  eyebrow: 'Everything in one place',
  title: 'The wedding brochure',
  body: 'Spaces, capacities, what is included and how the day runs — the farm’s own trifold, as a PDF.',
  cta: 'Download the brochure',
  href: 'https://flyingacefarm.com/wp-content/uploads/2024/03/Wedding-Trifold-Brochure.pdf',
  image: `${W}/brochure.webp`,
  alt: 'The cover of the Flying Ace Farm wedding brochure',
};
