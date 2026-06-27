# LiveScoreFast — Project Documentation

> Live sports scores website covering 14+ sports, in English, dark mode.
> **Live na:** [livescorefast.com](https://livescorefast.com)

---

## 1. Pregled projekta (Project Overview)

LiveScoreFast je web aplikacija za praćenje sportskih rezultata uživo. Pokriva fudbal, košarku, hokej i još 11 sportova. Sajt je u potpunosti na engleskom jeziku, koristi tamnu temu (dark mode) i responzivan je dizajn.

**Zadatak (5 koraka):**
1. ✅ Napraviti live score sajt
2. ✅ Kupiti domen (`livescorefast.com`)
3. ✅ Go live (deploy na Vercel)
4. 🔶 Google Analytics preko Google Search Console *(GA povezan, Search Console u toku)*
5. ⬜ Submit zahtev za Google Ads *(nije započeto)*

---

## 2. Tehnologije (Tech Stack)

| Sloj | Tehnologija |
|------|-------------|
| Frontend framework | **React 19** |
| Build tool | **Vite 8** |
| Styling | **Tailwind CSS 3** (dark mode, `darkMode: 'class'`) |
| Routing | **React Router DOM 7** |
| HTTP klijent | **Axios** |
| Sports podaci | **TheSportsDB API** (besplatan, bez API ključa) |
| Vijesti | **The Guardian RSS** (preko rss2json) |
| Hosting | **Vercel** (Hobby/free plan) |
| Domen / DNS | **Namecheap** |
| Analitika | **Google Analytics 4** (`G-0X7WD70ZB1`) |
| Verzionisanje | **Git + GitHub** |

**GitHub repo:** `https://github.com/lucijameridian-prog/livescorefast.com.git`

---

## 3. Funkcionalnosti (Features)

### 3.1 Live rezultati
- Početna strana (`/`) prikazuje sve mečeve uživo iz svih sportova
- Status badge: **LIVE** (crveni, pulsira), **FT** (završeno), zakazano
- Auto-prikaz rezultata, logoa timova, lige

### 3.2 Sportovi (14)
Football, Basketball, Hockey, Baseball, Handball, Rugby, Volleyball, NFL, NBA, MMA, AFL, Formula 1, Tennis *(coming soon — TheSportsDB nema tenis)*.

- **Football** ima posebnu stranicu sa filterima po ligama + standings panel
- **Basketball** i **Hockey** imaju vlastite stranice sa sidebar-om
- Ostali sportovi koriste generičku stranicu (`GenericSportPage`)

### 3.3 Detalji meča (`/match/:id`)
Klik na bilo koji meč otvara stranicu sa 3 taba:
- **Summary** — timeline događaja (golovi ⚽, kartoni 🟨🟥, izmjene 🔄), strijelci, minute, asistencije, poluvrijeme (HT), sudija, gledaoci
- **Stats** — statistika meča sa bar grafikonima (posjed, šutevi, itd.)
- **Lineup** — postave oba tima

### 3.4 Standings / Tabele (desni panel na Football strani)
- Dropdown za izbor lige: Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Champions League, World Cup 2026
- Tab **Table** — pozicija, tim (sa logom), P/W/D/L, gol-razlika, bodovi
- Tab **Top Scorers** — top strijelci sezone (klik vodi na profil igrača)
- World Cup grupisan po grupama (Group A, B, ...)
- Klik na tim → Team stranica

### 3.5 Pretraga (Search Bar — u navbaru)
- Pretraga timova i igrača (min 2 slova, debounce 350ms)
- Dropdown sa logoima/fotografijama, ligom, pozicijom
- Klik na tim → `/team/:id`, klik na igrača → `/player/:id`

### 3.6 Team stranica (`/team/:id`)
- Logo, liga, država, godina osnivanja, stadion, opis
- Tab **Squad** — svi aktivni igrači sortirani po poziciji
- Tab **Last Results** — posljednji rezultati (klik vodi na detalje meča)

### 3.7 Player stranica (`/player/:id`)
- Fotografija, pozicija, tim, nacionalnost, godine, visina, težina, broj dresa
- Biografija igrača

### 3.8 Vijesti (`/news`)
- Sportske vijesti sa **The Guardian** u realnom vremenu
- Filter tabovi: All Sports, Football, Basketball, Tennis, Formula 1
- Kartice sa slikom, naslovom, opisom i "time ago" oznakom
- Klik otvara originalni članak

### 3.9 Date Picker (Football, Basketball, Hockey)
- Quick tabovi: Yesterday / Today / Tomorrow / This Week
- Scrollable red datuma (3 dana unazad, 6 unaprijed)

### 3.10 PWA / Mobile
- `manifest.json` — instalabilan kao aplikacija (Android)
- Service worker — offline podrška, cache statičkih fajlova
- App ikone (192px, 512px), theme-color ljubičasta
- *Napomena: iOS nema automatski "Add to Home Screen" prompt*

---

## 4. Struktura projekta (Project Structure)

```
livescore-app/
├── index.html                  # HTML + GA tag + PWA meta + SW registracija
├── package.json
├── vercel.json                 # Rewrites za React Router (fix 404)
├── public/
│   ├── favicon.svg
│   ├── manifest.json           # PWA manifest
│   ├── sw.js                   # Service worker
│   ├── icon-192.png
│   └── icon-512.png
└── src/
    ├── main.jsx                # Entry point
    ├── App.jsx                 # Router + sve rute
    ├── index.css               # Tailwind + global stilovi
    ├── api/
    │   └── sports.js           # Svi TheSportsDB API pozivi
    ├── components/
    │   ├── Navbar.jsx          # Navigacija + SearchBar
    │   ├── SearchBar.jsx       # Pretraga timova/igrača
    │   ├── DatePicker.jsx      # Izbor datuma
    │   ├── MatchCard.jsx       # Kartica fudbalskog meča
    │   ├── GenericCard.jsx     # Kartica za ostale sportove
    │   ├── SportSidebar.jsx    # Sidebar sa ligama po sportu
    │   └── Standings.jsx       # Tabela + Top Scorers
    └── pages/
        ├── LivePage.jsx        # Početna (live rezultati)
        ├── FootballPage.jsx    # Fudbal + standings
        ├── BasketballPage.jsx
        ├── HockeyPage.jsx
        ├── GenericSportPage.jsx # Generička za ostale sportove
        ├── ComingSoonPage.jsx  # Tennis placeholder
        ├── MatchDetailPage.jsx # Detalji meča (3 taba)
        ├── TeamPage.jsx        # Profil tima
        ├── PlayerPage.jsx      # Profil igrača
        └── NewsPage.jsx        # Vijesti
```

---

## 5. Rute (Routes)

| Ruta | Stranica |
|------|----------|
| `/` | Live rezultati |
| `/news` | Vijesti |
| `/football` | Fudbal + standings |
| `/basketball` | Košarka |
| `/hockey` | Hokej |
| `/baseball`, `/handball`, `/rugby`, `/volleyball`, `/nfl`, `/nba`, `/mma`, `/afl`, `/formula1` | Generičke sport stranice |
| `/tennis` | Coming Soon |
| `/match/:id` | Detalji meča |
| `/team/:id` | Profil tima |
| `/player/:id` | Profil igrača |

---

## 6. API endpointi (TheSportsDB)

Base URL: `https://www.thesportsdb.com/api/v1/json/3`

| Funkcija | Endpoint |
|----------|----------|
| Live rezultati | `/livescore.php` |
| Mečevi po datumu | `/eventsday.php?d={date}&s={sport}` |
| Detalji meča | `/lookupevent.php?id={id}` |
| Timeline | `/lookuptimeline.php?id={id}` |
| Statistika | `/lookupeventstats.php?id={id}` |
| Postave | `/lookuplineup.php?id={id}` |
| Tabela lige | `/lookuptable.php?l={leagueId}&s={season}` |
| Pretraga timova | `/searchteams.php?t={query}` |
| Pretraga igrača | `/searchplayers.php?p={query}` |
| Profil tima | `/lookupteam.php?id={id}` |
| Igrači tima | `/lookup_all_players.php?id={id}` |
| Profil igrača | `/lookupplayer.php?id={id}` |
| Posljednji mečevi tima | `/eventslast.php?id={id}` |

---

## 7. Lokalni razvoj (Local Development)

```bash
cd livescore-app
npm install          # instaliranje zavisnosti
npm run dev          # dev server (http://localhost:5173)
npm run build        # production build (dist/)
npm run preview      # pregled production build-a
```

**Deploy:** Push na `main` granu → Vercel automatski deploy-uje na livescorefast.com.

```bash
git add -A
git commit -m "opis izmjene"
git push
```

---

## 8. Istorija ključnih problema i rješenja

| Problem | Rješenje |
|---------|----------|
| API-Football nalog suspendovan | Prelazak na **TheSportsDB** (besplatan, bez limita) |
| React Router 404 na Vercel-u | `vercel.json` sa rewrites pravilom |
| Tennis nedostupan | TheSportsDB nema tenis → "Coming Soon" stranica |
| News stranica prazna (Sky Sports CORS) | Prelazak na **The Guardian** RSS feedove |
| World Cup 2026 tabela prazna | Default postavljen na Premier League (WC podaci još ne postoje u API-ju) |
| Logo timova se ne prikazuje u tabeli | API koristi `strBadge` umjesto `strTeamBadge` |

---

## 9. Preostali koraci (Pending)

- 🔶 **Google Search Console** — povezivanje (započeto)
- ⬜ **Google Ads** — submit zahteva za oglase

---

*Dokumentacija generisana: jun 2026.*
