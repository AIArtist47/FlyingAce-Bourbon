/**
 * Every cocktail the distillery tasting room pours, taken from the farm's own
 * spirits-and-cocktails page.
 *
 * That page keeps two lists and this file keeps the same two, because the
 * distinction is the farm's own and it is the useful one: what is being
 * poured now, and the longer record of what has been. Seventy five drinks in
 * all, with the builds in the farm's own wording, ingredient for ingredient.
 *
 * Seven names were tidied on the way in. Five were casing only -- that page
 * mixes ALL CAPS, Title Case and lower case within one list -- and two were
 * misspellings that would have been set in capitals here: "Maragarita" and
 * "Frozed". Nothing else about any drink was changed.
 *
 * Photographs exist for the current list only. The previous list runs to 62
 * drinks and is a record rather than a menu; it reads better, and loads very
 * much better, as names and builds.
 */

export interface Cocktail {
  title: string;
  /** The farm's own ingredient line, its own slashes and all. */
  build: string;
}

export interface PouredNow extends Cocktail {
  slug: string;
}

/** The archive carries a photograph too, from its own smaller set. */
export interface PouredBefore extends Cocktail {
  slug: string;
}

export const cocktailsHero = {
  eyebrow: 'The Tasting Room',
  title: 'Every cocktail we pour',
  lede:
    'Thirteen on the board right now, built on American Ace spirits distilled here on the farm. Sixty two more we have poured before.',
};

/** What is on the board today. Each of these has a photograph. */
export const runway: readonly PouredNow[] = [
  {
    slug: 'old-fashioned',
    title: 'Old Fashioned',
    build: 'American Ace 90 Proof Blended Bourbon / bourbon syrup / orange bitters / mole bitters / garnished with orange peel and Fabbri wild cherries',
  },
  {
    slug: 'maple-bacon-old-fashioned',
    title: 'Maple Bacon Old Fashioned',
    build: 'Bacon fat-washed American Ace 90 Proof Blended Bourbon / maple syrup / Angostura bitters / bacon garnish',
  },
  {
    slug: 'banana-bread-old-fashioned',
    title: 'Banana Bread Old Fashioned',
    build: 'Banana infused American Ace Honey Barrel Bourbon / Banane du Bresil liqueur / black walnut bitters / chocolate mole bitters / caramelized banana',
  },
  {
    slug: 'bourbon-smash',
    title: 'Bourbon Smash',
    build: 'American Ace 90 Proof Blended Bourbon / fresh lemon juice / mint infused simple syrup / local honey / fresh mint leaves',
  },
  {
    slug: 'blackberry-bourbon-smash',
    title: 'Blackberry Bourbon Smash',
    build: 'American Ace 90 Proof Blended Bourbon / fresh lemon juice / mint infused simple syrup / local honey / mint leaves / muddled blackberries',
  },
  {
    slug: 'banana-daiquiri',
    title: 'Banana Daiquiri',
    build: 'Banana & Cinnamon infused American Ace Rum / banana liquor / fresh lime juice / pineapple juice / Coco-Lopez cream / garnished with sliced banana and nutmeg.',
  },
  {
    slug: 'the-halekulani',
    title: 'The Halekulani',
    build: 'American Ace 90 Proof Blended Bourbon / fresh lemon juice / orange juice / pineapple juice /demerara syrup / grenadine / Angostura bitters',
  },
  {
    slug: 'mai-tai',
    title: 'Mai Tai',
    build: 'Pineapple infused American Ace Rum / dark rum / almond orgeat / dry Curacao / lime juice / pineapple juice',
  },
  {
    slug: 'lovettsville-raspberry-lemonade',
    title: 'Lovettsville Raspberry Lemonade',
    build: 'American Ace Whitedog Whiskey / raspberry preserves / mint infused simple syrup / mint leaves / Sprite',
  },
  {
    slug: 'bourbon-painkiller',
    title: 'Bourbon Painkiller',
    build: 'American Ace 90 Proof Blended Bourbon / fresh orange juice / pineapple juice / Coco Lopez',
  },
  {
    slug: 'mint-mojito',
    title: 'Mint Mojito',
    build: 'Mint infused American Ace Rum / mint infused simple syrup / fresh lime juice / fresh muddled mint / splash of soda / garnished with mint and lime*Non-alcoholic option available*',
  },
  {
    slug: 'pineapple-mojito',
    title: 'Pineapple Mojito',
    build: 'Pineapple infused American Ace Farm Rum / fresh pineapple / mint infused simple syrup / mint leaves / splash of soda / garnished with pineapple, mint leaves and lime*Non-alcoholic option available*',
  },
  {
    slug: 'coconut-limeade',
    title: 'Coconut Limeade',
    build: 'Coconut infused American Ace Aged Rum / homemade limeade w/ limes, sugar & sweetened condensed milk',
  },
];

/** Nothing in these, for anyone driving or not drinking. */
export const mocktails: readonly string[] = [
  'Mojito (mint / pineapple)',
  'Shirley Temple',
  'Raspberry Lemonade',
  'Hot Coffee',
  'Hot Tea',
];

/**
 * Everything the room has poured before. Kept because the farm keeps it:
 * it shows the range that comes off the still across a year.
 */
export const standby: readonly PouredBefore[] = [
  { slug: 'the-90-split', title: 'The 90 Split', build: 'American Ace 90 Proof Blended Bourbon / banana liqueur / fresh squeezed lemon juice / ginger infused local honey / Tiki bitters' },
  { slug: 'fig-smoke', title: 'Fig & Smoke', build: 'Brown Butter and Fig Washed American Ace 90 Proof Blended Bourbon / Amaro Liqueur / Benedictine Liqueur / Black Walnut Bitters / Smoked Fig Syrup' },
  { slug: 'cucumber-spritz', title: 'Cucumber Spritz', build: 'American Ace Rum / basil (from our garden) / infused simple syrup / cucumbers / lime juice / lemon juice / club soda' },
  { slug: 'strawberry-lemonade-cooler', title: 'Strawberry Lemonade Cooler', build: 'Lemon infused American Ace Rum / fresh homemade lemonade / basil and lemon balm infused simple syrup / fresh basil leaves' },
  { slug: 'flying-ace-farm-spritzer', title: 'Flying Ace Farm Spritzer', build: 'American Ace 90 Proof Blended Bourbon / fresh lemon juice / local honey syrup / cane sugar / rosemary / topped with Topo Chico' },
  { slug: 'rum-punch', title: 'Rum Punch', build: 'Pineapple infused American Ace Rum / fresh orange juice / fresh lime juice / passion fruit and house made grenadine' },
  { slug: 'fig-brown-butter-washed-manhattan', title: 'Fig & Brown Butter Washed Manhattan', build: 'Fig and brown butter washed American Ace 90 Proof Blended Bourbon / Dolin sweet vermouth / Angostura bitters / topped with a Luxardo cherry.' },
  { slug: 'fall-whiskey-sour', title: 'Fall Whiskey Sour', build: 'American Ace 90 Proof Blended Bourbon / pear brandy / fresh lemon juice / cinnamon syrup / house made black walnut bitters and egg whites / garnished with a thinly sliced pear' },
  { slug: 'currant-fashioned', title: 'Currant Fashioned', build: 'American Ace Aged Rum / Creme de Cassis / rehydrated currant infused simple syrup / grapefruit bitters / orange bitters' },
  { slug: 'peaches-cream', title: 'Peaches & Cream', build: 'Peach and basil infused American Ace Farm White Dog / fresh orange juice / fresh lemon juice / vanilla bean infused Demerara syrup / garnished with a fresh peach slice' },
  { slug: 'smoked-jalape-o-strawberry-maragarita', title: 'Smoked Jalapeño Strawberry Margarita', build: 'American Ace Rum infused with smoked jalapeños / dry Curaçao / fresh lime juice / agave / strawberry purée' },
  { slug: 'bloody-mary', title: 'Bloody Mary', build: 'Black pepper infused American Ace White Dog / house made Bloody Mary mix / topped with pickled veggies' },
  { slug: 'spiced-pear-mule', title: 'Spiced Pear Mule', build: 'Pear and Ginger infused American Ace Rum / fresh lime juice / pear nectar, cinnamon syrup / pear shrub / ginger beer / garnished with a pear slice*Non-alcoholic option available*' },
  { slug: 'tiki-twist', title: 'Tiki Twist', build: 'Equal parts American Ace 90 Proof Blended Bourbon and American Ace Rum / fresh lime juice / fresh orange juice / passion fruit juice / pineapple juice / cinnamon infused simple syrup / fresh mint' },
  { slug: 'peach-basil-lemonade', title: 'Peach Basil Lemonade', build: 'American Ace Aged Rum / Creme de Peche liquor / peach puree / lemon juice / basil infused simple syrup / Sprite' },
  { slug: 'sunset-sour', title: 'Sunset Sour', build: 'American Ace 90 Proof Blended Bourbon / lemon juice / orange juice / simple syrup / egg white / red wine float' },
  { slug: 'nutty-servicemen-hot', title: 'Nutty Servicemen (Hot)', build: 'Hazelnut and coco nib infused American Ace Rum / coffee liqueur / chocolate liquor / vanilla bean Demerara syrup / garnished with homemade whip cream and coco powder' },
  { slug: 'nutty-servicemen-cold', title: 'Nutty Servicemen (Cold)', build: 'Hazelnut and coco nib infused American Ace Rum / coffee liqueur / chocolate liquor / vanilla bean Demerara syrup / garnished with homemade whip cream and coco powder' },
  { slug: 'night-cap', title: 'Night Cap', build: 'American Ace Aged Rum / coffee syrup / chocolate mole bitters / heavy cream / garnished with an orange twist' },
  { slug: 'campfire-mule', title: 'Campfire Mule', build: 'American Ace 90 Proof Blended Bourbon / apple cider / maple syrup / cinnamon & ginger infused simple syrup / Ginger beer / *smoked' },
  { slug: 'strawberries-cream', title: 'Strawberries & Cream', build: 'American Ace Aged Rum / homemade strawberry syrup / vanilla bean whipped cream' },
  { slug: 'blood-orange-spritzer', title: 'Blood Orange Spritzer', build: 'American Ace 90 Proof Blended Bourbon / Blood Orange Juice / Simple Syrup / Grapefruit Bitters / Club Soda' },
  { slug: 'pecan-fig-old-fashioned', title: 'Pecan & Fig Old Fashioned', build: 'Pecan infused American Ace Bourbon / Cappelletti / fig bourbon syrup / bitters' },
  { slug: 'hibiscus-ginger', title: 'Hibiscus Ginger', build: 'Hibiscus infused American Ace Rum /pomegranate juice / lime juice / housemade ginger beer' },
  { slug: 'farm-fresh-eggnog', title: 'Farm Fresh Eggnog', build: 'Homemade eggnog featuring American Ace 90 Proof Blended Bourbon, banana & nutmeg infused American Ace Rum including locally sourced farm fresh eggs / topped with eggnog foam' },
  { slug: 'pineapple-dram', title: 'Pineapple Dram', build: 'American Ace 90 Proof Blended Bourbon / Velvet Falernum / pineapple brandy / allspice dram / pineapple juice / tiki bitters' },
  { slug: 'vanilla-chai-old-fashioned', title: 'Vanilla Chai Old Fashioned', build: 'American Ace Limited Release Toasted Barrel Bourbon / apple brandy / vanilla bean & chai infused simple syrup / chocolate mole bitters / orange bitters' },
  { slug: 'spiced-chai', title: 'Spiced Chai', build: 'American Ace Aged Rum / Yellow Chartreuse / house-made spiced chai / honey syrup / chocolate mole bitters' },
  { slug: 'melon-ball', title: 'Melon Ball', build: 'Honeydew infused American Ace Rum / Midori / honeydew juice / elderflower liqueur / lime juice / simple syrup / Sprite' },
  { slug: 'gingerbread-old-fashioned', title: 'Gingerbread Old Fashioned', build: 'American Ace 90 Proof Blended Bourbon / gingerbread infused simple syrup / Angostura bitters / orange bitters' },
  { slug: 'hot-apple-cider', title: 'Hot Apple Cider', build: 'American Ace 90 Proof Blended Bourbon / cinnamon & ginger infused simple syrup / hot apple cider / dried lemon / rosemary sprig' },
  { slug: 'spiced-cranberry-rosemary-old-fashioned', title: 'Spiced Cranberry & Rosemary Old Fashioned', build: 'American Ace 90 Proof Blended Bourbon / rosemary infused simple syrup /  / spiced cranberry bitters / Amarena Fabbri cherry / rosemary sprig' },
  { slug: 'pomegranate-sour', title: 'Pomegranate Sour', build: 'American Ace 90 Proof Blended Bourbon / pomegranate juice / lemon juice / lavender infused honey syrup / egg whites' },
  { slug: 'apple-orchard', title: 'Apple Orchard', build: 'Red Delicious apple infused American Ace 90 Proof Blended Bourbon / Golden Delicious apple & cinnamon infused simple syrup / lemon juice / honey syrup / Granny Smith apple garnish' },
  { slug: 'pumpkin-spice-old-fashioned', title: 'Pumpkin Spice Old Fashioned', build: 'American Ace 90 Proof Blended Bourbon / pumpkin spice syrup / orange bitters / Angostura bitters / star anise' },
  { slug: 'apple-butter-sour', title: 'Apple Butter Sour', build: 'American Ace 90 Proof Bourbon / apple brandy / lemon juice / cinnamon ginger syrup / apple cider / egg whites' },
  { slug: 'pumpkin-butter-sour', title: 'Pumpkin Butter Sour', build: 'American Ace 90 Proof Blended Bourbon / homemade pumpkin butter / lemon juice / cinnamon & ginger infused simple syrup / egg white' },
  { slug: 'apple-pie-old-fashioned', title: 'Apple Pie Old Fashioned', build: 'Apple & spice infused American Ace 90 Proof Blended Bourbon / smoked maple syrup /  / vanilla bean infused bourbon syrup / apple cider / Angostura bitters / chocolate molé bitters /dried cinnamon apple' },
  { slug: 'bourbon-berry-pie', title: 'Bourbon Berry Pie', build: 'American Ace Rum Barrel Bourbon / blueberry syrup / whipped cream / Allspice Dram' },
  { slug: 'blueberry-cooler', title: 'Blueberry Cooler', build: 'American Ace Rum / blueberry puree syrup / fresh lemon juice / lemon thyme (from our garden) / infused simple syrup / club soda / garnished w/ fresh lemon thyme' },
  { slug: 'double-date', title: 'Double Date', build: 'American Ace Limited Release Toasted Barrel Bourbon / Disaronno / date infused simple syrup / pistachio orgeat / Peychaud’s / crumbled pistachios' },
  { slug: 'classic-manhattan', title: 'Classic Manhattan', build: 'American Ace 90 Proof Blended Bourbon / Sweet Vermouth / Peychaud’s bitters' },
  { slug: 'smooth-operator', title: 'Smooth Operator', build: 'American Ace Cask Strength Bourbon / American Ace Aged Rum / cherry brandy / creme de noyaux / sesame orgeat / Angostura bitters' },
  { slug: 'espresso-old-fashioned', title: 'Espresso Old Fashioned', build: 'Butterscotch & caramel flavored espresso bean infused American Ace Toasted Barrel Bourbon / vanilla bean infused bourbon syrup / chocolate mole bitters' },
  { slug: 'toasted-s-mores', title: 'Toasted S\'mores', build: 'American Ace Limited Release Toasted Barrel Bourbon / Creme de Cacao liqueur / graham cracker infused simple syrup / chocolate / whipped cream / marshmallow' },
  { slug: 'honey-hibiscus-old-fashioned', title: 'Honey Hibiscus Old Fashioned', build: 'American Ace Limited Release Honey Barrel Bourbon / hibiscus infused simple syrup / honey syrup / Angostura bitters / orange bitters' },
  { slug: 'tipsy-cocoa', title: 'Tipsy Cocoa', build: 'American Ace Aged Rum / peppermint liquor OR Bailey’s liquor OR Bailey’s Caramel liquor / hot chocolate / whipped cream' },
  { slug: 'apple-pie-daiquiri', title: 'Apple Pie Daiquiri', build: 'Apple pie infused American Ace Aged Rum / apple cider / Coco-Lopez / lime juice / dried apple w/ grated nutmeg' },
  { slug: 'frozed-shaved-watermelon', title: 'Frozen Shaved Watermelon', build: 'American Ace Rum / lime / mint syrup / freshly frozen watermelon' },
  { slug: 'melon-cooler', title: 'Melon Cooler', build: 'Cantaloupe infused American Ace Rum / cantaloupe puree / elderflower liqueur / basil infused simple syrup / fresh basil leaves' },
  { slug: 'basil-rumcello', title: 'Basil Rumcello', build: 'Limoncello inspired American Ace Rum w/ lemon & sugar / fresh squeezed lemon juice / basil infused simple syrup / basil leaves' },
  { slug: 'sweet-peach', title: 'Sweet Peach', build: 'Peach infused American Ace 90 Proof Blended Bourbon / Allspice Dram / honey syrup / cinnamon / peach garnish' },
  { slug: 'rum-roots', title: 'Rum & Roots', build: 'American Ace Aged Rum / sweet potato puree with cinnamon / smoked maple syrup / egg white / black walnut bitters' },
  { slug: 'peach-sun-tea', title: 'Peach Sun Tea', build: 'Peach infused American Ace 90 Proof Blended Bourbon / sun-brewed sweet tea / creme de peaches liqueurOptional: Lemonade' },
  { slug: 'pumpkins-cream', title: 'Pumpkins & Cream', build: 'Pumpkin & Spice infused American Ace Rum / pumpkin puree / pumpkin spice infused syrup / demerara syrup / whipped cream / toasted cinnamon sugar pumpkin seeds / garnished with a pumpkin spice and graham cracker rim.' },
  { slug: 'raspberry-rumcello', title: 'Raspberry Rumcello', build: 'Limoncello inspired American Ace Rum w/ lemon & sugar / raspberry puree / Prosecco' },
  { slug: 'smoked-cherry-vanilla-bean-old-fashioned', title: 'Smoked Cherry & Vanilla Bean Old Fashioned', build: 'American Ace 90 Proof Bourbon / vanilla bean infused bourbon syrup / cherry bitters / chocolate mole bitters / Amarena Fabbri cherries' },
  { slug: 'tiki-fashioned', title: 'Tiki Fashioned', build: 'Toasted coconut infused American Ace 90 Proof Blended Bourbon / apple brandy / spiced almond Demerara syrup / Angostura bitters / Tiki bitters' },
  { slug: 'hot-toddy', title: 'Hot Toddy', build: 'American Ace 90 Proof Blended Bourbon / fresh lemon juice / local honey / hot lavender water / garnished with a lemon wheel with cloves and honey stick' },
  { slug: 'watermelon-mojito', title: 'Watermelon Mojito', build: 'American Ace Rum / fresh watermelon / mint infused simple syrup / fresh mint leaves / splash of soda / garnished with fresh mint*Non-alcoholic option available' },
  { slug: 'cider-thyme-hot', title: 'Cider Thyme (Hot)', build: 'American Ace 90 Proof Blended Bourbon / apple cider / cinnamon & ginger infused simple syrup / fresh thyme' },
  { slug: 'cider-thyme-cold', title: 'Cider Thyme (Cold)', build: 'American Ace 90 Proof Blended Bourbon / apple cider / lemon juice / cinnamon & ginger infused simple syrup / garnished with fresh thyme' },
];

/** Where a current cocktail’s photograph lives. */
export const shot = (slug: string) => `/images/cocktails/${slug}.webp`;

/** The archive set is encoded smaller: its tiles are smaller. */
export const archiveShot = (slug: string) =>
  `/images/cocktails/archive/${slug}.webp`;

/**
 * The two columns the hero carousel drifts past each other.
 *
 * Split even and odd rather than first-half / second-half, so neither column
 * is all old fashioneds and the pair reads as one set of thirteen.
 */
const frame = (c: PouredNow) => ({
  src: shot(c.slug),
  alt: `${c.title}, poured in the Flying Ace Farm tasting room`,
});

export const carouselLeft = runway.filter((_, i) => i % 2 === 0).map(frame);
export const carouselRight = runway.filter((_, i) => i % 2 === 1).map(frame);
