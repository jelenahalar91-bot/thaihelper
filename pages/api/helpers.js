// API Route: /api/helpers
// Reads helper profiles from Google Sheets and returns JSON. Falls back to demo data.

const DEMO_HELPERS = [
  { name: 'Maria S.', city: 'Phuket', area: 'Rawai', category: 'Nanny & Babysitter', experience: '5', languages: 'Filipino, English', phone: '+66812345678', hasWhatsApp: true, email: 'maria.s@example.com', about: 'Experienced nanny with 5 years caring for expat families. Infant care, school runs, and overnight stays.' },
  { name: 'Sunisa K.', city: 'Bangkok', area: 'Sukhumvit', category: 'Housekeeper & Cleaner', experience: '8', languages: 'Thai, English', phone: '+66898765432', hasWhatsApp: true, email: '', about: 'Professional housekeeper. Cleaning, laundry, cooking, and household management.' },
  { name: 'Ana R.', city: 'Phuket', area: 'Kata', category: 'Private Chef & Cook', experience: '3', languages: 'Filipino, English, Thai', phone: '+66891234567', hasWhatsApp: true, email: 'ana.chef@example.com', about: 'Private chef specializing in Thai, Western, and Filipino cuisine. Baking and meal prep.' },
  { name: 'Narin P.', city: 'Phuket', area: 'Chalong', category: 'Tutor & Teacher', experience: '4', languages: 'Thai, English', phone: '+66841112233', hasWhatsApp: false, email: 'narin.tutor@example.com', about: 'Maths and physics tutor. Exam preparation and homework help for international school students.' },
  { name: 'Dao W.', city: 'Koh Samui', area: 'Bophut', category: 'Gardener & Pool Care', experience: '6', languages: 'Thai', phone: '+66877654321', hasWhatsApp: false, email: '', about: 'Garden maintenance, pool cleaning, and lawn care for villas and condos.' },
  { name: 'Malee T.', city: 'Chiang Mai', area: 'Nimman', category: 'Elder Care & Caregiver', experience: '7', languages: 'Thai, English', phone: '+66823456789', hasWhatsApp: true, email: 'malee.care@example.com', about: 'Compassionate caregiver. Personal care, medication reminders, companionship, and mobility assistance.' },
  { name: 'Joy L.', city: 'Bangkok', area: 'Silom', category: 'Nanny & Babysitter', experience: '4', languages: 'Filipino, English', phone: '+66869876543', hasWhatsApp: true, email: '', about: 'Loving nanny experienced with toddlers and preschool children. First aid certified.' },
  { name: 'Somchai R.', city: 'Phuket', area: 'Kamala', category: 'Driver & Chauffeur', experience: '10', languages: 'Thai, English', phone: '+66811223344', hasWhatsApp: false, email: 'somchai.driver@example.com', about: 'Professional driver. Airport transfers, school runs, and daily errands. Clean driving record.' },
  { name: 'Ploy N.', city: 'Pattaya', area: 'Jomtien', category: 'Housekeeper & Cleaner', experience: '5', languages: 'Thai, English', phone: '+66845566778', hasWhatsApp: true, email: 'ploy.clean@example.com', about: 'Dedicated housekeeper for condos and villas. Deep cleaning, organizing, and laundry.' },
];

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const SHEETS_ID = process.env.GOOGLE_SHEETS_ID;
  if (!SHEETS_ID) return res.status(200).json({ helpers: DEMO_HELPERS, demo: true });
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEETS_ID}/gviz/tq?tqx=out:json`;
    const response = await fetch(url);
    const text = await response.text();
    const jsonStr = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?/);
    if (!jsonStr || !jsonStr[1]) return res.status(200).json({ helpers: DEMO_HELPERS, demo: true });
    const data = JSON.parse(jsonStr[1]);
    const cols = data.table.cols.map(c => c.label?.toLowerCase().trim() || '');
    const rows = data.table.rows;
    const helpers = rows.map(row => {
      const vals = row.c.map(cell => (cell && cell.v != null) ? String(cell.v) : '');
      const obj = {};
      cols.forEach((col, i) => {
        if (col.includes('name')) obj.name = vals[i];
        else if (col.includes('city')) obj.city = vals[i];
        else if (col.includes('area')) obj.area = vals[i];
        else if (col.includes('categor') || col.includes('service')) obj.category = vals[i];
        else if (col.includes('experience')) obj.experience = vals[i];
        else if (col.includes('language')) obj.languages = vals[i];
        else if (col.includes('phone') || col.includes('whatsapp')) obj.phone = vals[i];
        else if (col.includes('haswhatsapp')) obj.hasWhatsApp = vals[i] === 'true' || vals[i] === 'TRUE' || vals[i] === '1';
        else if (col.includes('email')) obj.email = vals[i];
        else if (col.includes('about') || col.includes('description')) obj.about = vals[i];
        else if (col.includes('age')) obj.age = vals[i];
      });
      return obj;
    }).filter(h => h.name);
    return res.status(200).json({ helpers, demo: false });
  } catch (err) {
    console.error('Google Sheets read error:', err);
    return res.status(200).json({ helpers: DEMO_HELPERS, demo: true });
  }
}
