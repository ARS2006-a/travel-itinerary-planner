const express = require('express');
const router = express.Router();

// ── Rich mock data keyed by destination (lowercase) ──────────────────────────

const EVENTS_DB = {
  default: [
    { name: 'City Cultural Festival',   date: 'Every Saturday',    category: 'Cultural',    description: 'Weekly celebration of local arts, music, and traditions.', location: 'City Square',       price: 'Free'     },
    { name: 'Local Food Fair',          date: 'Every Sunday',      category: 'Food',        description: 'Taste authentic local cuisine from top chefs and street vendors.', location: 'Central Park', price: '$5 entry' },
    { name: 'Heritage Walk',            date: 'Daily 9 AM',        category: 'History',     description: 'Guided walk through historic landmarks and monuments.', location: 'Old Town',           price: '$10'      },
    { name: 'Sunset Music Concert',     date: 'Fri & Sat evenings',category: 'Music',       description: 'Live performances by local and international artists.', location: 'Amphitheatre',       price: '$15'      },
  ],
  paris: [
    { name: 'Bastille Day Celebrations',date: 'July 14',           category: 'National',    description: 'Grand fireworks at Eiffel Tower, military parade on Champs-Élysées.', location: 'Champs-Élysées', price: 'Free' },
    { name: 'Paris Fashion Week',       date: 'Late September',    category: 'Fashion',     description: 'World-renowned fashion shows by top designers.', location: 'Grand Palais',           price: 'Invite only' },
    { name: 'Nuit Blanche',             date: 'First Saturday Oct',category: 'Art',         description: 'All-night contemporary art festival across the city.', location: 'Citywide',           price: 'Free'     },
    { name: 'Fête de la Musique',       date: 'June 21',           category: 'Music',       description: 'Free outdoor music concerts all over Paris.', location: 'Streets & Parks',          price: 'Free'     },
  ],
  tokyo: [
    { name: 'Cherry Blossom Festival',  date: 'Late March – April',category: 'Nature',      description: 'Hanami picnics under blooming sakura trees in parks.', location: 'Ueno Park',          price: 'Free'     },
    { name: 'Sanja Matsuri',            date: 'Third weekend May', category: 'Cultural',    description: 'One of Tokyo\'s largest Shinto festivals with portable shrines.', location: 'Asakusa',    price: 'Free'     },
    { name: 'Tokyo Game Show',          date: 'September',         category: 'Technology',  description: 'Massive gaming expo showcasing latest titles and tech.', location: 'Makuhari Messe',     price: '¥2,500'   },
    { name: 'Sumida River Fireworks',   date: 'Last Sat July',     category: 'Festival',    description: 'Spectacular fireworks display over the Sumida River.', location: 'Sumida River',       price: 'Free'     },
  ],
  bali: [
    { name: 'Nyepi – Day of Silence',   date: 'March (Hindu New Year)', category: 'Religious', description: 'Unique Balinese Hindu New Year with island-wide silence and reflection.', location: 'Island-wide', price: 'Free' },
    { name: 'Bali Arts Festival',       date: 'June – July',       category: 'Arts',        description: 'Month-long showcase of Balinese dance, music, and crafts.', location: 'Denpasar',         price: 'Free'     },
    { name: 'Kecak Fire Dance',         date: 'Daily at sunset',   category: 'Cultural',    description: 'Traditional Balinese dance drama performed at Uluwatu Temple.', location: 'Uluwatu Temple', price: '$10'    },
    { name: 'Ubud Writers Festival',    date: 'October',           category: 'Literature',  description: 'International literary festival in the cultural heart of Bali.', location: 'Ubud',          price: '$20'      },
  ],
  'new york': [
    { name: 'New Year\'s Eve Ball Drop', date: 'December 31',      category: 'Festival',    description: 'Iconic Times Square countdown with live performances.', location: 'Times Square',       price: 'Free'     },
    { name: 'NYC Marathon',             date: 'First Sunday Nov',  category: 'Sports',      description: 'World\'s largest marathon through all five boroughs.', location: 'Citywide',           price: 'Free to watch' },
    { name: 'Broadway Week',            date: 'January & September', category: 'Theatre',   description: '2-for-1 tickets to top Broadway shows.', location: 'Theater District',             price: 'Varies'   },
    { name: 'Tribeca Film Festival',    date: 'June',              category: 'Film',        description: 'Prestigious film festival showcasing independent cinema.', location: 'Tribeca',           price: '$20–50'   },
  ],
  london: [
    { name: 'Notting Hill Carnival',    date: 'August Bank Holiday', category: 'Cultural',  description: 'Europe\'s largest street festival celebrating Caribbean culture.', location: 'Notting Hill', price: 'Free'   },
    { name: 'Bonfire Night',            date: 'November 5',        category: 'Festival',    description: 'Fireworks and bonfires across the city.', location: 'Victoria Park',              price: 'Free'     },
    { name: 'Chelsea Flower Show',      date: 'May',               category: 'Nature',      description: 'World-famous horticultural show at Royal Hospital Chelsea.', location: 'Chelsea',        price: '£35'      },
    { name: 'London Film Festival',     date: 'October',           category: 'Film',        description: 'BFI\'s prestigious international film festival.', location: 'BFI Southbank',          price: '£15–25'   },
  ],
  dubai: [
    { name: 'Dubai Shopping Festival', date: 'January – February', category: 'Shopping',   description: 'Massive retail event with discounts, raffles, and entertainment.', location: 'Citywide',   price: 'Free'     },
    { name: 'Dubai Food Festival',      date: 'February – March',  category: 'Food',        description: 'Culinary extravaganza featuring world-class chefs.', location: 'Various venues',       price: 'Varies'   },
    { name: 'Dubai Expo',               date: 'Year-round',        category: 'Technology',  description: 'World-class exhibitions and cultural pavilions.', location: 'Expo City',              price: '$20'      },
    { name: 'Global Village',           date: 'Oct – April',       category: 'Cultural',    description: 'International cultural and entertainment park.', location: 'Global Village',         price: '$5'       },
  ],
  // South India destinations with Yakshagana
  mangalore: [
    { name: 'Yakshagana Performance',   date: 'Nov – May (season)', category: 'Cultural',   description: 'Traditional coastal Karnataka theatre combining dance, music, and elaborate costumes. A UNESCO-recognised art form.', location: 'Dharmasthala & local theatres', price: 'Free – ₹200' },
    { name: 'Mangalore Dasara',         date: 'October',           category: 'Festival',    description: 'Grand Navaratri celebrations with processions and cultural programs.', location: 'Mangaladevi Temple', price: 'Free' },
    { name: 'Tulu Nadu Rajyotsava',     date: 'November 1',        category: 'Cultural',    description: 'Celebration of Tulu culture with folk performances and exhibitions.', location: 'City Center', price: 'Free' },
    { name: 'Seafood Festival',         date: 'December',          category: 'Food',        description: 'Coastal Karnataka\'s finest seafood dishes from local restaurants.', location: 'Panambur Beach', price: '₹100–500' },
  ],
  udupi: [
    { name: 'Yakshagana Night Show',    date: 'Dec – April',       category: 'Cultural',    description: 'All-night Yakshagana performance with mythological stories from Mahabharata and Ramayana.', location: 'Udupi Krishna Temple', price: 'Free' },
    { name: 'Paryaya Festival',         date: 'January (biennial)', category: 'Religious',  description: 'Grand handover ceremony of Udupi Krishna Temple administration.', location: 'Sri Krishna Temple', price: 'Free' },
    { name: 'Udupi Food Festival',      date: 'Year-round',        category: 'Food',        description: 'Authentic Udupi cuisine – dosas, idlis, and traditional thalis.', location: 'Hotel Woodlands & local restaurants', price: '₹50–300' },
    { name: 'Coconut Grove Festival',   date: 'February',          category: 'Nature',      description: 'Celebration of coastal Karnataka\'s natural beauty and traditions.', location: 'Malpe Beach', price: 'Free' },
  ],
  mysore: [
    { name: 'Mysore Dasara',            date: 'October',           category: 'Festival',    description: 'One of India\'s grandest festivals – royal procession, illuminated palace, and cultural events.', location: 'Mysore Palace', price: 'Free' },
    { name: 'Yakshagana at Rangayana',  date: 'December',          category: 'Cultural',    description: 'Yakshagana performances at Mysore\'s premier theatre festival.', location: 'Rangayana Theatre', price: '₹100–300' },
    { name: 'Mysore Flower Show',       date: 'November',          category: 'Nature',      description: 'Spectacular floral display at the Glass House in Brindavan Gardens.', location: 'Brindavan Gardens', price: '₹30' },
    { name: 'Mysore Literature Festival', date: 'January',         category: 'Literature',  description: 'Annual gathering of writers, poets, and thinkers.', location: 'Mysore University', price: 'Free' },
  ],
  goa: [
    { name: 'Goa Carnival',             date: 'February – March',  category: 'Festival',    description: 'Vibrant 4-day street carnival with floats, music, and dancing.', location: 'Panaji',             price: 'Free'     },
    { name: 'Sunburn Festival',         date: 'December',          category: 'Music',       description: 'Asia\'s biggest electronic dance music festival.', location: 'Vagator Beach',              price: '₹2,000+'  },
    { name: 'Shigmo Festival',          date: 'March',             category: 'Cultural',    description: 'Goan Hindu spring festival with folk dances and processions.', location: 'Citywide',           price: 'Free'     },
    { name: 'Goa Food & Cultural Festival', date: 'November',      category: 'Food',        description: 'Showcase of Goan cuisine, music, and handicrafts.', location: 'Miramar Beach',          price: 'Free'     },
  ],
  kerala: [
    { name: 'Onam Festival',            date: 'August – September',category: 'Cultural',    description: 'Kerala\'s harvest festival with Pookalam (flower carpet), Vallamkali (boat race), and Onasadya feast.', location: 'State-wide', price: 'Free' },
    { name: 'Thrissur Pooram',          date: 'April – May',       category: 'Religious',   description: 'Spectacular temple festival with decorated elephants and percussion.', location: 'Thrissur', price: 'Free' },
    { name: 'Kerala Kathakali Show',    date: 'Daily',             category: 'Cultural',    description: 'Classical dance-drama with elaborate makeup and costumes.', location: 'Kerala Kalamandalam', price: '₹200–500' },
    { name: 'Beypore Urs',              date: 'January',           category: 'Religious',   description: 'Annual Sufi festival at the historic Beypore port.', location: 'Beypore, Kozhikode', price: 'Free' },
  ],
  bangalore: [
    { name: 'Bengaluru Habba',          date: 'December',          category: 'Cultural',    description: 'City-wide cultural festival celebrating Karnataka\'s arts and heritage.', location: 'Citywide', price: 'Free' },
    { name: 'Lalbagh Flower Show',      date: 'January & August',  category: 'Nature',      description: 'Stunning floral displays at the historic Lalbagh Botanical Garden.', location: 'Lalbagh Garden', price: '₹20' },
    { name: 'Bangalore Tech Summit',    date: 'November',          category: 'Technology',  description: 'India\'s premier technology and innovation summit.', location: 'BIEC',                   price: 'Varies'   },
    { name: 'Yakshagana at Ravindra Kalakshetra', date: 'December–January', category: 'Cultural', description: 'Yakshagana performances by top troupes from coastal Karnataka.', location: 'Ravindra Kalakshetra', price: '₹100–300' },
  ],
};

const TRANSPORT_DB = {
  default: [
    { type: 'Bus',    name: 'City Express Bus',    route: 'Airport ↔ City Center',    timing: 'Every 30 min, 5 AM – 11 PM', price: '$2–5',    details: 'Comfortable AC buses with luggage space.',          bookingUrl: '#' },
    { type: 'Train',  name: 'Metro Rail',          route: 'Central ↔ Suburbs',        timing: 'Every 10 min, 6 AM – 10 PM', price: '$1–3',    details: 'Fast and reliable urban metro network.',            bookingUrl: '#' },
    { type: 'Taxi',   name: 'City Cab',            route: 'On-demand, anywhere',       timing: '24/7 availability',          price: '$10–30',  details: 'Metered taxis and app-based cabs available.',       bookingUrl: '#' },
    { type: 'Rental', name: 'Car Rental',          route: 'Self-drive, flexible',      timing: 'Daily / Weekly hire',        price: '$40–80/day', details: 'Wide range of vehicles from economy to SUV.',    bookingUrl: '#' },
  ],
  paris: [
    { type: 'Train',  name: 'Paris Métro',         route: '16 lines covering all Paris', timing: '5:30 AM – 1:15 AM daily', price: '€1.90/trip', details: 'Fastest way to get around Paris. Day pass available.', bookingUrl: 'https://www.ratp.fr' },
    { type: 'Bus',    name: 'RATP Bus',             route: 'Citywide network',          timing: '6 AM – 12:30 AM',           price: '€1.90',   details: 'Extensive bus network covering all arrondissements.', bookingUrl: 'https://www.ratp.fr' },
    { type: 'Taxi',   name: 'G7 Taxi / Uber',      route: 'On-demand',                 timing: '24/7',                      price: '€15–50',  details: 'Official G7 taxis or Uber widely available.',       bookingUrl: 'https://www.uber.com' },
    { type: 'Rental', name: 'Vélib\' Bike Share',  route: 'Citywide stations',         timing: '24/7',                      price: '€3/day',  details: 'Electric and manual bikes at 1,400+ stations.',     bookingUrl: 'https://www.velib-metropole.fr' },
  ],
  tokyo: [
    { type: 'Train',  name: 'JR Yamanote Line',    route: 'Loop around central Tokyo', timing: '4:30 AM – 1 AM',            price: '¥140–200', details: 'Essential loop line connecting major stations.',    bookingUrl: 'https://www.jreast.co.jp' },
    { type: 'Train',  name: 'Tokyo Metro',         route: '9 lines, 180 stations',     timing: '5 AM – 12:30 AM',           price: '¥170–320', details: 'Comprehensive subway covering all major areas.',    bookingUrl: 'https://www.tokyometro.jp' },
    { type: 'Bus',    name: 'Toei Bus',             route: 'Areas not covered by metro',timing: '6 AM – 11 PM',             price: '¥210 flat', details: 'Flat-fare buses for areas between metro lines.',   bookingUrl: '#' },
    { type: 'Taxi',   name: 'Tokyo Taxi',           route: 'On-demand',                 timing: '24/7',                     price: '¥730 base + meter', details: 'Clean, reliable taxis. Uber also available.',  bookingUrl: 'https://www.uber.com' },
  ],
  bali: [
    { type: 'Rental', name: 'Scooter Rental',      route: 'Island-wide, self-drive',   timing: 'Daily hire',                price: '$5–8/day', details: 'Most popular way to explore Bali. International license required.', bookingUrl: '#' },
    { type: 'Taxi',   name: 'Grab / Gojek',        route: 'On-demand app-based',       timing: '24/7',                      price: '$2–15',   details: 'Affordable ride-hailing apps widely used in Bali.', bookingUrl: 'https://www.grab.com' },
    { type: 'Rental', name: 'Car + Driver',        route: 'Custom tours, island-wide', timing: 'Full day / Half day',       price: '$35–60/day', details: 'Hire a local driver for personalised tours.',    bookingUrl: '#' },
    { type: 'Bus',    name: 'Kura-Kura Bus',        route: 'Kuta ↔ Seminyak ↔ Ubud',  timing: 'Hourly, 9 AM – 9 PM',      price: '$5–10',   details: 'Tourist shuttle bus connecting major areas.',       bookingUrl: 'https://www.kura2bus.com' },
  ],
  'new york': [
    { type: 'Train',  name: 'NYC Subway',          route: '27 lines, 472 stations',    timing: '24/7',                      price: '$2.90/ride', details: 'The city\'s lifeline. MetroCard or OMNY tap-to-pay.', bookingUrl: 'https://www.mta.info' },
    { type: 'Bus',    name: 'MTA Bus',              route: 'Citywide',                  timing: '24/7 (select routes)',      price: '$2.90',   details: 'Extensive bus network complementing the subway.',   bookingUrl: 'https://www.mta.info' },
    { type: 'Taxi',   name: 'Yellow Cab / Uber',   route: 'On-demand',                 timing: '24/7',                      price: '$15–50',  details: 'Iconic yellow cabs or Uber/Lyft throughout the city.', bookingUrl: 'https://www.uber.com' },
    { type: 'Rental', name: 'Citi Bike',           route: 'Manhattan, Brooklyn, Queens',timing: '24/7',                    price: '$4.49/30 min', details: 'Bike-share with 1,000+ stations across NYC.',   bookingUrl: 'https://www.citibikenyc.com' },
  ],
  london: [
    { type: 'Train',  name: 'London Underground',  route: '11 lines, 272 stations',    timing: '5 AM – 12:30 AM (24hr Fri/Sat)', price: '£2.80–5.25', details: 'The Tube – fastest way around London. Use Oyster card.', bookingUrl: 'https://tfl.gov.uk' },
    { type: 'Bus',    name: 'TfL Red Bus',          route: 'Citywide, 700+ routes',     timing: '24/7 (Night Bus)',          price: '£1.75',   details: 'Iconic double-decker buses. Contactless payment.',  bookingUrl: 'https://tfl.gov.uk' },
    { type: 'Train',  name: 'Elizabeth Line',       route: 'Reading ↔ Shenfield via central London', timing: '6 AM – 11 PM', price: '£2.80+', details: 'New high-frequency cross-London rail line.',       bookingUrl: 'https://tfl.gov.uk' },
    { type: 'Taxi',   name: 'Black Cab / Uber',     route: 'On-demand',                 timing: '24/7',                     price: '£10–40',  details: 'Licensed black cabs or Uber throughout London.',    bookingUrl: 'https://www.uber.com' },
  ],
  goa: [
    { type: 'Rental', name: 'Scooter / Bike Rental', route: 'State-wide, self-drive',  timing: 'Daily hire',                price: '₹300–500/day', details: 'Best way to explore Goa\'s beaches and villages.', bookingUrl: '#' },
    { type: 'Taxi',   name: 'Goa Taxi / Rapido',    route: 'On-demand',                 timing: '6 AM – 11 PM',             price: '₹150–600', details: 'Local taxis and Rapido bikes available.',           bookingUrl: '#' },
    { type: 'Bus',    name: 'KTC Bus',               route: 'Panaji ↔ Margao ↔ Mapusa', timing: 'Every 30 min, 6 AM – 9 PM', price: '₹15–50', details: 'Kadamba Transport Corporation state buses.',        bookingUrl: '#' },
    { type: 'Rental', name: 'Car Rental',            route: 'Self-drive, flexible',     timing: 'Daily / Weekly',           price: '₹1,500–3,000/day', details: 'AC cars available from local and national operators.', bookingUrl: '#' },
  ],
  kerala: [
    { type: 'Bus',    name: 'KSRTC Bus',             route: 'State-wide network',        timing: '5 AM – 11 PM',             price: '₹20–200', details: 'Kerala State Road Transport – reliable and affordable.', bookingUrl: '#' },
    { type: 'Train',  name: 'Kerala Rail',           route: 'Thiruvananthapuram ↔ Kasaragod', timing: 'Multiple daily trains', price: '₹50–500', details: 'Scenic coastal railway connecting major cities.', bookingUrl: 'https://www.irctc.co.in' },
    { type: 'Taxi',   name: 'Ola / Local Taxi',      route: 'On-demand',                 timing: '24/7',                     price: '₹100–500', details: 'Ola cabs and local taxis widely available.',       bookingUrl: 'https://www.olacabs.com' },
    { type: 'Rental', name: 'Houseboat Rental',      route: 'Alleppey Backwaters',       timing: 'Day / Overnight',          price: '₹5,000–15,000', details: 'Iconic Kerala houseboat experience through backwaters.', bookingUrl: '#' },
  ],
  bangalore: [
    { type: 'Train',  name: 'Namma Metro',           route: 'Purple & Green lines',      timing: '5 AM – 11 PM',             price: '₹10–60', details: 'Bangalore\'s metro covering key IT corridors and city center.', bookingUrl: '#' },
    { type: 'Bus',    name: 'BMTC Bus',               route: 'Citywide, 2,500+ routes',  timing: '5 AM – 11 PM',             price: '₹5–30',  details: 'Bangalore Metropolitan Transport Corporation buses.', bookingUrl: '#' },
    { type: 'Taxi',   name: 'Ola / Uber',             route: 'On-demand',                 timing: '24/7',                    price: '₹80–400', details: 'Ola and Uber are the most popular options in Bangalore.', bookingUrl: 'https://www.olacabs.com' },
    { type: 'Rental', name: 'Zoomcar / Drivezy',      route: 'Self-drive, flexible',     timing: 'Hourly / Daily',           price: '₹500–2,000/day', details: 'Self-drive car rentals for day trips to Mysore, Coorg etc.', bookingUrl: 'https://www.zoomcar.com' },
  ],
  mangalore: [
    { type: 'Bus',    name: 'KSRTC / Private Bus',   route: 'Mangalore ↔ Bangalore / Goa / Udupi', timing: 'Multiple daily', price: '₹100–500', details: 'Well-connected bus services to major Karnataka cities.', bookingUrl: '#' },
    { type: 'Train',  name: 'Konkan Railway',        route: 'Mumbai ↔ Mangalore ↔ Thiruvananthapuram', timing: 'Multiple trains', price: '₹200–1,500', details: 'Scenic coastal railway through Western Ghats tunnels.', bookingUrl: 'https://www.irctc.co.in' },
    { type: 'Taxi',   name: 'Ola / Local Taxi',      route: 'City & outstation',         timing: '24/7',                     price: '₹100–600', details: 'Ola and local taxis for city travel and temple visits.', bookingUrl: 'https://www.olacabs.com' },
    { type: 'Rental', name: 'Auto Rickshaw',         route: 'Short city distances',      timing: '6 AM – 10 PM',             price: '₹30–150', details: 'Metered autos for short hops around the city.',      bookingUrl: '#' },
  ],
};

// ── GET /api/events?destination=xxx ──────────────────────────────────────────
router.get('/events', (req, res) => {
  try {
    const dest = (req.query.destination || '').toLowerCase().trim();
    const events = EVENTS_DB[dest] || EVENTS_DB.default;
    res.json({ destination: req.query.destination || 'Your Destination', events });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events.' });
  }
});

// ── GET /api/transport?destination=xxx ───────────────────────────────────────
router.get('/transport', (req, res) => {
  try {
    const dest = (req.query.destination || '').toLowerCase().trim();
    const transport = TRANSPORT_DB[dest] || TRANSPORT_DB.default;
    res.json({ destination: req.query.destination || 'Your Destination', transport });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transport options.' });
  }
});

module.exports = router;
