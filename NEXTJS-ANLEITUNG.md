# ThaiHelper – Next.js Setup-Anleitung

Komplette Schritt-für-Schritt-Anleitung: Von Null bis zur laufenden Website.

---

## Was du brauchst (einmalig installieren)

### Schritt 1 – Node.js installieren

Node.js ist das Programm, das Next.js zum Laufen braucht.

1. Gehe auf **https://nodejs.org**
2. Lade die **LTS-Version** herunter (der grüne Button)
3. Installiere es wie ein normales Programm (einfach „Weiter" klicken)
4. **Prüfen ob es funktioniert:** Öffne das Terminal (Mac: Spotlight → „Terminal", Windows: Suche nach „cmd") und tippe:
   ```
   node --version
   ```
   Du solltest etwas wie `v20.x.x` sehen ✅

---

## Das Projekt aufsetzen

### Schritt 2 – Projektordner öffnen

Kopiere den Ordner `thaihelper-nextjs` irgendwo auf deinen Computer, z.B. auf den Desktop.

Öffne das Terminal und navigiere in den Ordner:
```bash
cd ~/Desktop/thaihelper-nextjs
```
*(Wenn du Windows benutzt: `cd C:\Users\DeinName\Desktop\thaihelper-nextjs`)*

### Schritt 3 – Abhängigkeiten installieren

Im Terminal einmal ausführen:
```bash
npm install
```

Das lädt alle benötigten Pakete (React, Next.js, Supabase). Dauert 1–2 Minuten. ☕

### Schritt 4 – Seite lokal testen

```bash
npm run dev
```

Öffne dann im Browser: **http://localhost:3000**

Du siehst jetzt deine Landing Page! Die Registrierungsseite ist unter **http://localhost:3000/register**.

> Zum Stoppen: Terminal → `Strg+C` (oder `Cmd+C` auf Mac)

---

## Supabase verbinden (wenn du bereit bist)

### Schritt 5 – .env.local erstellen

Kopiere die Datei `.env.local.example` und benenne sie um in `.env.local`.

Dann trage deine Supabase-Daten ein:
```
NEXT_PUBLIC_SUPABASE_URL=https://DEIN-PROJEKT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=dein-anon-key-hier
```

> Wo findest du diese Werte? In Supabase: **Project Settings → API**

Danach `npm run dev` neu starten.

---

## Auf Netlify deployen

### Schritt 6 – Netlify-Konto erstellen

Gehe auf **https://netlify.com** und melde dich kostenlos an.

### Schritt 7 – Code auf GitHub hochladen (empfohlen)

Die einfachste Methode für automatische Deploys:

1. Erstelle ein Konto auf **https://github.com**
2. Erstelle ein neues Repository (Repo)
3. Lade deinen `thaihelper-nextjs` Ordner dort hoch

Oder nutze GitHub Desktop: **https://desktop.github.com** – das hat eine grafische Oberfläche.

### Schritt 8 – Netlify mit GitHub verbinden

1. In Netlify: **"Add new site" → "Import an existing project"**
2. Wähle **GitHub** und dann dein Repository
3. Build-Einstellungen werden automatisch erkannt:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
4. Klicke auf **"Deploy site"**

### Schritt 9 – Umgebungsvariablen in Netlify eintragen

Damit Supabase auch auf der Live-Seite funktioniert:

1. In Netlify: **Site settings → Environment variables**
2. Füge hinzu:
   - `NEXT_PUBLIC_SUPABASE_URL` = deine Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = dein Anon Key
3. Klicke auf **"Deploy site"** (neu deployen)

### Schritt 10 – Eigene Domain (optional)

In Netlify: **Domain settings → Add custom domain**

Trage deine Domain ein (z.B. `thaihelper.com`). Netlify erklärt dann, wie du die DNS-Einstellungen bei deinem Domain-Anbieter vornimmst.

---

## Projektstruktur – was ist was?

```
thaihelper-nextjs/
│
├── pages/                  ← Seiten der Website
│   ├── _app.js             ← Globale Einstellungen (CSS laden)
│   ├── index.js            ← Landing Page (thaihelper.com/)
│   └── register.js         ← Registrierungsseite (/register)
│
├── styles/
│   └── globals.css         ← Alle CSS-Styles für beide Seiten
│
├── lib/
│   └── supabase.js         ← Supabase-Verbindung
│
├── package.json            ← Projektinfos & Abhängigkeiten
├── next.config.js          ← Next.js-Konfiguration
├── .env.local              ← Geheime Keys (NICHT hochladen!)
└── .env.local.example      ← Vorlage für .env.local
```

---

## Häufige Fragen

**Fehler: "command not found: npm"**
→ Node.js ist nicht richtig installiert. Schritt 1 wiederholen.

**Die Seite zeigt "Demo Mode"**
→ `.env.local` ist noch nicht erstellt oder Supabase nicht verbunden. Das ist normal zum Testen!

**Netlify-Build schlägt fehl**
→ Stelle sicher, dass `.env.local` NICHT auf GitHub hochgeladen wurde (steht schon in `.gitignore`). Supabase-Keys müssen in Netlify unter Environment Variables eingetragen werden.

**Ich möchte den Text ändern**
→ Öffne `pages/index.js` oder `pages/register.js`. Alle Texte sind im `T`-Objekt ganz oben in der Datei gebündelt. Ändere einfach die Werte unter `en:` oder `th:`.

**Ich möchte Farben ändern**
→ Öffne `styles/globals.css`. Alle Farben sind unter `:root { ... }` als Variablen definiert (z.B. `--teal`, `--navy`, `--gold`). Einmal ändern, überall wirksam.

---

## Nächste Schritte (Woche 2+)

- [ ] `pages/profiles.js` – Seite wo Familien alle Provider durchsuchen können
- [ ] `pages/profile/[id].js` – Einzelne Provider-Profilseite
- [ ] `pages/families/` – Searcher-Seite (Suche + Abo)
- [ ] Stripe-Integration für Abo-Zahlungen
- [ ] Admin-Dashboard (einfache Tabelle zum Verwalten der Registrierungen)

---

*Erstellt mit ThaiHelper v0.1 · März 2026*
