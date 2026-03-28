// ─────────────────────────────────────────────────────────────────────────────
// API Route: /api/register
// Empfängt Formulardaten und schreibt sie in Google Sheets via Apps Script
// ─────────────────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const SHEETS_URL = process.env.GOOGLE_SHEETS_URL;

  // Demo-Modus: kein Google Sheets URL eingetragen
  if (!SHEETS_URL || SHEETS_URL === 'YOUR_APPS_SCRIPT_URL') {
    console.log('✅ DEMO MODE – Daten würden gespeichert:', req.body);
    return res.status(200).json({ success: true, demo: true });
  }

  try {
    const response = await fetch(SHEETS_URL, {
      method:   'POST',
      headers:  { 'Content-Type': 'application/json' },
      body:     JSON.stringify(req.body),
      redirect: 'follow',
    });

    // Apps Script gibt manchmal eine Weiterleitung zurück – das ist ok
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { success: true };
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error('Google Sheets Fehler:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
