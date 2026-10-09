/**
 * Artist profiles - the detail behind each calendar card.
 *
 * Transcribed from each event's own page on flyingacefarm.com/calendar/.
 * Keyed by artist rather than by date, because Jake Phillips and Alex Kerns
 * each play twice this season and the biography does not change between them.
 *
 * Link hrefs are corrected where the source page's markup is broken: the JP
 * Jones Instagram link there is a bare "@jpjonesguitar", which resolves to a
 * 404 under the calendar path instead of to Instagram.
 */

export type ArtistLink = { label: string; href: string };

export type ArtistProfile = {
  /** One line under the name - who this act is, at a glance. */
  billing: string;
  /** The farm's own invitation line for the set. */
  intro: string;
  /** Biography, already split into paragraphs. */
  bio: string[];
  links: ArtistLink[];
};

export const artistProfiles: Record<string, ArtistProfile> = {
  'John “JP” Jones': {
    billing: 'Loudoun County guitarist and singer',
    intro:
      'A self-taught guitarist who has been playing Loudoun County rooms for most of his life.',
    bio: [
      'I grew up in Lucketts, Va. I still call Loudoun County home. Began teaching myself guitar around age 10 using chord books and listening to records.',
      'Since then, music has been a major part of my life - playing at family gatherings, at church, weddings and local wineries and breweries.',
      'My wife Lori and I have been married 41 years. We have three grown children and three grandchildren. I am a dedicated husband, father, grandfather, veteran and a lifelong artist.',
    ],
    links: [
      { label: 'Official website', href: 'https://jpjonesguitar.com' },
      { label: 'Instagram', href: 'https://www.instagram.com/jpjonesguitar/' },
    ],
  },

  'Drew Stevyns': {
    billing: 'America’s Got Talent top-10 finalist',
    intro:
      'A voice that pulls the room close - three albums, a national television run and a decade of stages behind it.',
    bio: [
      'Performing since the age of two, Drew Stevyns started his career singing in church choirs while growing up in England. After returning to the U.S. he kept developing, taking piano lessons, writing songs and teaching himself guitar.',
      'There is a palpable sadness to his voice that makes his songs impossible to shake, and the music surges - hard-edged yet beautiful and melodic. He has released three albums: “Waiting” (2009), “Please Excuse the Machine” (2011) and “Somewhere in Between” (2015).',
      'In 2009 he reached the top 10 of NBC’s America’s Got Talent, working with producers Nigel Wright and Shane Keister. Shortly after, Paul Reed Smith asked him to endorse a new line of guitars, which led to a showcase with his band at the Whisky a Go Go.',
      'He has shared stages with Thelma Houston, The Charlie Daniels Band and Josh Doyle, headlined for the United Soldiers and Sailors of America since 2013, and had his music featured on Rizzoli & Isles. His song “Waiting” placed third in the International Songwriting Competition.',
    ],
    links: [
      { label: 'Official website', href: 'https://drewstevyns.com/home' },
      { label: 'YouTube', href: 'https://www.youtube.com/@drewstevynsmusicofficialch1712/videos' },
    ],
  },

  'Alex Kerns': {
    billing: 'Low Water Bridge Band co-founder',
    intro: 'Genre-bending covers and originals, from the Beatles to Tyler Childers.',
    bio: [
      'Known to genre bend, Alex Kerns covers a wide range of artists and songs - from the classic sounds of the Beatles to Tyler Childers to the Americana vibe of his own originals.',
      'Hailing from Berryville, Virginia, he is the co-founder and bass player of the Low Water Bridge Band. Born and raised in Clarke County, he has been playing up and down the Shenandoah Valley for the past 15 years.',
      'He still pursues a busy acoustic solo career, playing everywhere from small amphitheatres to back-yard private parties, and always leaves a smile on the faces of the people who turn up.',
    ],
    links: [
      {
        label: 'Facebook',
        href: 'https://www.facebook.com/groups/339742443315810/search/?q=alex%20kerns',
      },
    ],
  },

  'Jake Phillips': {
    billing: 'Singer-songwriter, US and European tours',
    intro: 'Original music and an eclectic set of classic folk and alternative covers.',
    bio: [
      'Jake Phillips is a singer-songwriter who has travelled the world - from US and European tours to Singapore and Canada and points beyond.',
      'With a powerful voice and dynamic guitar skills, his repertoire includes original music alongside an eclectic set of classic folk and alternative covers.',
      'His song “Brother of Mine” debuted on Suits LA (season 1, episode 10) in May 2025.',
    ],
    links: [{ label: 'Listen on Spotify', href: 'https://open.spotify.com/track/37qPwur42sTCXQdd7Xst8Q' }],
  },

  'Laura Cashman': {
    billing: 'Powerhouse vocalist',
    intro:
      'Hits from the 70s through today, with a few originals thrown in - and the energy of a career built on big rooms.',
    bio: [
      'Laura Cashman is a knock-out powerhouse vocalist who will captivate you through an entire song and leave you wanting more. Her energy and crowd engagement gained her a following from the start of her career.',
      'She began with Millennium, among the most sought-after cover bands on the East Coast and top of the live entertainment charts for the five years she was in it, playing Washington DC, Baltimore, Philadelphia, Pittsburgh and New York.',
      'More recently she switched gears to focus on her own music, singing and playing acoustic guitar for vineyards, breweries and private events - covering the 70s through today with originals in the set list.',
    ],
    links: [{ label: 'Official website', href: 'https://lauracashman7.wixsite.com/lauracashman' }],
  },

  'Chris Bowen': {
    billing: 'One-man band from Taylorstown',
    intro: 'Drums with his feet, guitar in his hands, and every genre in the set.',
    bio: [
      'My name is Chris Bowen. I am a local guy who has lived in Taylorstown most of my life.',
      'I am a one-man band - I play drums with my feet, play guitar and sing. I play all genres, so the crowds stay focused.',
    ],
    links: [{ label: 'Facebook', href: 'https://www.facebook.com/TheChrisBone/' }],
  },

  'Melanie Pearl': {
    billing: 'Shenandoah Valley vocalist',
    intro: 'Keyboard, ukulele and vocals, with the set list shaped by whoever turns up.',
    bio: [
      'For more than a decade Melanie Pearl has been entertaining audiences throughout the Shenandoah Valley with her solo performances.',
      'Accompanied by keyboard, ukulele and vocals, she tailors each performance to the crowd and welcomes song requests, which makes every set a slightly different one.',
      'Her range runs across the decades - music made famous by Janis Joplin, Dolly Parton, Amy Winehouse and Adele among many others. She is a regular at Barrel Oak Winery & Brewery, The Half Note Lounge, Woodstock Brewhouse and Bright Box.',
    ],
    links: [],
  },

  'Dylan Woelfel': {
    billing: 'Outlaw country and folk songwriter',
    intro: 'Fifteen years of original songs out of Clarke County and the Shenandoah Valley.',
    bio: [
      'Born and raised in Clarke County, Virginia, Dylan Woelfel is an independent singer-songwriter who has spent more than 15 years writing original music and performing throughout the Shenandoah Valley, Winchester and West Virginia.',
      'Drawing on his own experiences, he blends the storytelling traditions of outlaw country with heartfelt folk ballads to make songs that are authentic, honest and deeply personal.',
      'Whether playing his originals or simply talking to the room, he delivers a live set that celebrates independent music and genuine songwriting.',
    ],
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/dylanwoelfelmusic/' },
      { label: 'Facebook', href: 'https://www.facebook.com/DylanWoelfelOutlawMusic/' },
      { label: 'YouTube', href: 'https://www.youtube.com/@DylanWoelfelMusic' },
    ],
  },

  'Joey Hafner': {
    billing: 'Lovettsville local, frontman of Ghost Pepper',
    intro:
      'High-energy acoustic sets built on 90s alternative, classic rock and the odd throwback.',
    bio: [
      'Joey Hafner is a vocalist and guitar player based in Lovettsville, Virginia, playing high-energy acoustic sets as a solo artist and fronting the party rock cover band Ghost Pepper.',
      'His musical journey began at nine and was shaped by the alternative explosion of the 90s - early inspiration from Jane’s Addiction, Smashing Pumpkins and Pearl Jam.',
      'He blends alternative rock, 90s hip hop, classic rock and country into sets built for wineries, breweries and live venues across Northern Virginia and Central Maryland, with creative mashups, sing-alongs and the occasional surprise throwback.',
    ],
    links: [
      { label: 'Facebook', href: 'https://www.facebook.com/strumforbeer' },
      { label: 'Instagram', href: 'https://www.instagram.com/hafner_landscapes_music/' },
    ],
  },

  'Morgan Gonce': {
    billing: 'Berklee Presidential Scholar, award-winning guitarist',
    intro: 'R&B, folk, pop, rock and indie, with a soulful touch on whatever the gig calls for.',
    bio: [
      'Morgan Gonce is a 19-year-old award-winning guitarist, producer and singer-songwriter from Baltimore, Maryland.',
      'Her playing ranges across R&B, folk, pop, rock and indie influences, bringing an emotional and soulful touch to whatever gig she is called for.',
      'A Presidential Scholarship awardee at Berklee College of Music, she is double majoring in Independent Recording & Production and Guitar Performance, with her sights on touring and studio work and her own music as an artist.',
    ],
    links: [{ label: 'Instagram', href: 'https://www.instagram.com/morgangonce_/' }],
  },

  'Britton James': {
    billing: 'Northern Virginia multi-instrumentalist',
    intro: 'A one-man show built live on stage from vocals, percussion, bass, guitar and loops.',
    bio: [
      'A Northern Virginia native, Britton James is a singer-songwriter, producer and multi-instrumentalist who writes, records and performs original alternative music.',
      'His energetic one-man show is anything but ordinary, combining live vocals with percussion, bass, guitar and looping to build the sound of a full band - all performed live on stage.',
      'He blends his originals with crowd-favourite covers spanning decades, from timeless classics to today’s hits.',
    ],
    links: [{ label: 'Official website', href: 'https://www.brittonjamesmusic.com/' }],
  },
};

/** True of every set at the farm, so it is stated once rather than thirteen times. */
export const eventStandards = [
  'Free to attend - no ticket needed',
  'Seating indoors and out, first come first served',
  'Kitchen and tasting room open throughout',
];

export const eventCategory = 'Live Music';
