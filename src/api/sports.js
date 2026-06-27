import axios from 'axios'

const client = axios.create({
  baseURL: 'https://www.thesportsdb.com/api/v1/json/3',
})

// ─── FOOTBALL ───────────────────────────────────────────
export async function getLiveMatches() {
  const res = await client.get('/livescore.php')
  return res.data.events || []
}

export async function getFixturesByDate(date) {
  const res = await client.get(`/eventsday.php?d=${date}&s=Soccer`)
  return res.data.events || []
}

export async function getTopLeagues() {
  return [
    { id: '4328', name: 'Premier League',   country: 'England', logo: 'https://www.thesportsdb.com/images/media/league/badge/i6o0kh1549879062.png' },
    { id: '4335', name: 'La Liga',          country: 'Spain',   logo: 'https://www.thesportsdb.com/images/media/league/badge/7onmyv1534768460.png' },
    { id: '4332', name: 'Serie A',          country: 'Italy',   logo: 'https://www.thesportsdb.com/images/media/league/badge/d7lhlw1549878326.png' },
    { id: '4331', name: 'Bundesliga',       country: 'Germany', logo: 'https://www.thesportsdb.com/images/media/league/badge/0j55yv1534764799.png' },
    { id: '4334', name: 'Ligue 1',          country: 'France',  logo: 'https://www.thesportsdb.com/images/media/league/badge/ocy5le1566496999.png' },
    { id: '4480', name: 'Champions League', country: 'Europe',  logo: 'https://www.thesportsdb.com/images/media/league/badge/qlyaeq1549879062.png' },
  ]
}

// ─── EVENT DETAILS ───────────────────────────────────────
export async function getEventDetails(eventId) {
  const res = await client.get(`/lookupevent.php?id=${eventId}`)
  return res.data.events?.[0] || null
}

export async function getEventTimeline(eventId) {
  const res = await client.get(`/lookuptimeline.php?id=${eventId}`)
  return res.data.timeline || []
}

export async function getEventStats(eventId) {
  const res = await client.get(`/lookupeventstats.php?id=${eventId}`)
  return res.data.eventstats || []
}

export async function getEventLineup(eventId) {
  const res = await client.get(`/lookuplineup.php?id=${eventId}`)
  return res.data.lineup || []
}

// ─── GENERIC SPORTS ──────────────────────────────────────
const SPORT_MAP = {
  basketball: 'Basketball',
  hockey:     'Ice Hockey',
  baseball:   'Baseball',
  handball:   'Handball',
  rugby:      'Rugby',
  volleyball: 'Volleyball',
  nfl:        'American Football',
  nba:        'Basketball',
  mma:        'Fighting',
  afl:        'Australian Football',
  formula1:   'Motorsport',
}

export async function getGamesByDate(sport, date) {
  const sportName = SPORT_MAP[sport]
  if (!sportName) throw new Error(`Unknown sport: ${sport}`)
  const res = await client.get(`/eventsday.php?d=${date}&s=${encodeURIComponent(sportName)}`)
  return res.data.events || []
}

export async function getLiveGames(sport) {
  const res = await client.get('/livescore.php')
  return res.data.events || []
}
