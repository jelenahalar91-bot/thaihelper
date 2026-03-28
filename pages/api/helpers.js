// ─────────────────────────────────────────────────────────────────────────────
// API Route: /api/helpers
// Reads helper profiles from Google Sheets (published to web) and returns JSON
// Falls back to demo data if sheet is not configured
// ─────────────────────────────────────────────────────────────────────────────

// Demo data used when Google Sheets is not yet configured for reading
const DEMO_HELPERS = [
  {
    name: 'Maria S.', city: 'Phuket', area: 'Rawai',
    category: 'Nanny & Babysitter', experience: '5',
    languages: 'Filipino, English',
    phone: '+66812345678', hasWhatsApp: true, email: 'maria.s@example.com',
    about: 'Experienced nanny with 5 years caring for expat families. Infant care, school runs, and overnight stays.',
  },
  {
    name: 'Sunisa K.', city: 'Bangkok', area: 'Sukhumvit',
    category: 'Housekeeper & Cleaner', experience: '8',
    languages: 'Thai, English',
    phone: '+66898765432', hasWhatsApp: true, email: '',
    about: 'Professional housekeeper. Cleaning, laundry, cooking, and household management.',
  },
  {
    name: 'Ana R.', city: 'Phuket', area: 'Kata',
    category: 'Private Chef & Cook', experience: '3',
    languages: 'Filipino, English, Thai',
    phone: '+66891234567', hasWhatsApp: true, email: 'ana.chef@example.com',
    about: 'Private chef specializing in Thai, Western, and Filipino cuisine. Baking and meal prep.',
  },
  {
    name: 'Narin P.', city: 'Phuket', area: 'Chalong',
    category: 'Tutor & Teacher', experience: '4',
    languages: 'Thai, English',
    phone: '+66841112233', hasWhatsApp: false, email: 'narin.tutor@example.com',
    about: 'Maths and physics tutor. Exam preparation and homework help for international school students.',
  },
  {
    name: 'Dao W.', city: 'Koh Samui', area: 'Bophut',
    category: 'Gardener & Pool Care', experience: '6',
    languages: 'Thai',
    phone: '+66877654321', hasWhatsApp: false, email: '',
    about: 'Garden maintenance, pool cleaning, and lawn care for villas and condos.',
  },
  {
    name: 'Malee T.', city: 'Chiang Mai', area: 'Nimman',
    category: 'Elder Care & Caregiver', experience: '7',
    languages: 'Thai, English',
    phone: '+66823456789', hasWhatsApp: true, email: 'malee.care@example.com',
    about: 'Compassionate caregiver. Personal care, medication reminders, companionship, and mobility assistance.',
  },
  {
    name: 'Joy L.', city: 'Bangkok', area: 'Silom',
    category: 'Nanny & Babysitter', experience: '4',
    languages: 'Filipino, English',
    phone: '+66869876543', hasWhatsApp: true, email: '',
    about: 'Loving nanny experienced with toddlers and preschool children. First aid certified.',
  },
  {
    name: 'Somchai R.', city: 'Phuket', area: 'Kamala',
    category: 'Driver & Chauffeur', experience: '10',
    languages: 'Thai, English',
    phone: '+66811223344', hasWhatsApp: false, email: 'somchai.driver@example.com',
    about: 'Professional driver. Airport transfers, school runs, and daily errands. Clean driving record.',
  },
  {
    name: 'Ploy N.', city: 'Pattaya', area: 'Jomtien',
    category: 'Housekeeper & Cleaner', experience: '5',
    languages: 'Thai, English',
    phone: '+66845566778', hasWhatsApp: true, email: 'ploy.clean@example.com',
    about: 'Dedicated housekeeper for condos and villas. Deep cleaning, organizing, and laundry.',
  },
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const SHEETS_ID = process.env.GOOGLE_SHEETS_ID;

  // If no sheet ID configured, return demo data
  if (!SHEETS_ID) {
    return res.status(200).json({ helpers: DEMO_HELPERS, demo: true });
  }

  try {
    // Fetch published Google Sheet as JSON (using the gviz endpoint)
    const url = `https://docs.google.com/spreadsheets/d/${SHEETS_ID}/gviz/tq?tqx=out:json`;
    const response = await fetch(url);
    const text = await response.text();

    // Google wraps the response in a callback — extract the JSON
    const jsonStr = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?/);
    if (!jsonStr || !jsonStr[1]) {
      console.error('Could not parse Google Sheets response');
      return res.status(200).json({ helpers: DEMO_HELPERS, demo: true });
    }

    const data = JSON.parse(jsonStr[1]);
    const cols = data.table.cols.map(c => c.label?.toLowerCase().trim() || '');
    const rows = data.table.rows;

    const helpers = rows
      .map(row => {
        const vals = row.c.map(cell => (cell && cell.v != null) ? String(cell.v) : '');
        const obj = {};
        cols.forEach((col, i) => {
          if (col.includes('name') || col.includes('\u0E0A\u0E37\u0E48\u0E2D')) obj.name = vals[i];
          else if (col.includes('city') || col.includes('\u0E00\u0E21\u0E37\u0E2D\u0E07') || col.includes('\u0E08\u0E31\u0E07\u0E2B\u0E27\u0E31\u0D14')) obj.city = vals[i];
          else if (col.includes('area') || col.includes('\u0E22\u0E48\u0E32\u0E19') || col.includes('\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48')) obj.area = vals[i];
          else if (col.includes('categor') || col.includes('service') || col.includes('\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23') || col.includes('\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17')) obj.category = vals[i];
          else if (col.includes('experience') || col.includes('\u0E1B\u0E23\u0E30\u0E2A\u0E1A\u0E01\u0E32\u0E23\u0E13\u0E4C')) obj.experience = vals[i];
          else if (col.includes('language') || col.includes('\u0E20\u0E32\u0E29\u0E32')) obj.languages = vals[i];
          else if (col.includes('phone') || col.includes('whatsapp') || col.includes('\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C')) obj.phone = vals[i];
          else if (col.includes('haswhatsapp')) obj.hasWhatsApp = vals[i] === 'true' || vals[i] === 'TRUE' || vals[i] === '1';
          else if (col.includes('email') || col.includes('\u0E2D\u0E35\u0E40\u0E21\u0E25')) obj.email = vals[i];
          else if (col.includes('about') || col.includes('\u0E40\u0E01\u0E35\u0E48\u0E22\u0E27\u0E01\u0E31\u0E1A') || col.includes('description')) obj.about = vals[i];
          else if (col.includes('age') || col.includes('\u0E2D\u0E32\u0E22\u0E38')) obj.age = vals[i];
        });
        return obj;
      })
      .filter(h => h.name);

    return res.status(200).json({ helpers, demo: false });
  } catch (err) {
    console.error('Google Sheets read error:', err);
    return res.status(200).json({ helpers: DEMO_HELPERS, demo: true });
  }
}
