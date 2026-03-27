# Google Sheets Anbindung – Schritt-für-Schritt

Jede Registrierung landet automatisch als neue Zeile in deinem Google Sheet.
Einmaliger Aufwand: ca. 10 Minuten.

---

## Schritt 1 – Google Sheet erstellen

1. Gehe auf **https://sheets.google.com**
2. Klicke auf **"Leer"** (neues Sheet erstellen)
3. Nenne es z.B. **"ThaiHelper Registrierungen"**
4. Lass das Sheet offen – du brauchst es gleich

---

## Schritt 2 – Apps Script öffnen

Im Google Sheet oben in der Menüleiste:
**Erweiterungen → Apps Script**

Ein neues Tab öffnet sich mit einem Code-Editor.

---

## Schritt 3 – Code einfügen

Lösche alles was im Editor steht und füge folgenden Code ein:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data  = JSON.parse(e.postData.contents);

    // Kopfzeile beim ersten Eintrag automatisch erstellen
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Datum', 'Ref-Nr.', 'Vorname', 'Nachname',
        'Kategorie', 'Stadt', 'Erfahrung', 'Sprachen',
        'Über mich', 'WhatsApp', 'Email', 'Status'
      ]);

      // Kopfzeile formatieren
      sheet.getRange(1, 1, 1, 12)
        .setBackground('#1B3A4B')
        .setFontColor('#FFFFFF')
        .setFontWeight('bold');
    }

    // Neue Zeile einfügen
    sheet.appendRow([
      new Date(),
      data.ref         || '',
      data.first_name  || '',
      data.last_name   || '',
      data.category    || '',
      data.city        || '',
      data.experience  || '',
      Array.isArray(data.languages)
        ? data.languages.join(', ')
        : (data.languages || ''),
      data.bio         || '',
      data.whatsapp    || '',
      data.email       || '',
      'neu'
    ]);

    return ContentService
      .createTextResponse(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextResponse(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

Klicke auf **💾 Speichern** (oder Cmd+S).

---

## Schritt 4 – Als Web App veröffentlichen

1. Klicke oben rechts auf **"Bereitstellen" → "Neue Bereitstellung"**
2. Klicke auf das Zahnrad ⚙️ neben "Typ auswählen" → **"Web-App"**
3. Einstellungen:
   - **Beschreibung:** ThaiHelper Registrierungen
   - **Ausführen als:** Ich (deine Google-Adresse)
   - **Zugriff:** Jeder
4. Klicke auf **"Bereitstellen"**
5. Google fragt nach Berechtigungen → **"Zugriff erlauben"** → dein Google-Konto auswählen → **"Erweitert" → "Weiter"** → **"Zulassen"**
6. Du bekommst eine URL — sie sieht so aus:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```
   **Diese URL kopieren!** ← wichtig

---

## Schritt 5 – URL in das Projekt eintragen

Im `thaihelper-nextjs` Ordner:

1. Erstelle eine neue Datei namens **`.env.local`** (kein Dateiname davor, nur `.env.local`)
2. Füge diese Zeile ein:
   ```
   GOOGLE_SHEETS_URL=https://script.google.com/macros/s/DEINE-URL/exec
   ```
   (ersetze den Link mit deiner kopierten URL)
3. Datei speichern

---

## Schritt 6 – Server neu starten

Im Terminal:
1. `Strg+C` drücken (Server stoppen)
2. Wieder starten:
   ```bash
   npm run dev
   ```

---

## Testen

1. Gehe auf **http://localhost:3000/register**
2. Fülle das Formular aus und klicke auf "Absenden"
3. Öffne dein Google Sheet → du solltest eine neue Zeile sehen! ✅

---

## Häufige Probleme

**"Zugriff erlauben" Button erscheint nicht**
→ Manchmal muss man bei "Erweitert" klicken und dann "Unsicher – trotzdem weiter"

**Keine neue Zeile im Sheet**
→ Prüfe ob `.env.local` korrekt gespeichert wurde (kein Leerzeichen vor/nach dem `=`)
→ Server neu starten nach Änderung der `.env.local`

**"Neue Bereitstellung" vs. "Bereitstellung verwalten"**
→ Wenn du den Code änderst, musst du IMMER eine **neue Bereitstellung** erstellen
→ Die URL ändert sich dann – dann auch `.env.local` updaten

---

## So sieht dein Sheet aus

| Datum | Ref-Nr. | Vorname | Nachname | Kategorie | Stadt | ... | Status |
|-------|---------|---------|----------|-----------|-------|-----|--------|
| 24.03.2026 | TH-ABC123 | Maria | Santos | nanny | phuket | ... | neu |

Du kannst in der **Status**-Spalte selbst Notizen machen:
- `neu` → gerade reingekommen
- `kontaktiert` → du hast sie angeschrieben
- `aktiv` → wird auf die Plattform aufgenommen
- `abgelehnt` → passt nicht

---

*ThaiHelper v0.1 · März 2026*
