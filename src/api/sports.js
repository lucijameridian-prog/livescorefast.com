import axios from 'axios'

const KEY = import.meta.env.VITE_API_KEY || ''

const makeClient = (baseURL) => axios.create({
  baseURL,
  headers: { 'x-apisports-key': KEY },
})

const clients = {
  football:   makeClient('https://v3.football.api-sports.io'),
  basketball: makeClient('https://v1.basketball.api-sports.io'),
  hockey:     makeClient('https://v1.hockey.api-sports.io'),
  afl:        makeClient('https://v1.afl.api-sports.io'),
  baseball:   makeClient('https://v1.baseball.api-sports.io'),
  formula1:   makeClient('https://v1.formula-1.api-sports.io'),
  handball:   makeClient('https://v1.handball.api-sports.io'),
  mma:        makeClient('https://v1.mma.api-sports.io'),
  nba:        makeClient('https://v2.nba.api-sports.io'),
  nfl:        makeClient('https://v1.american-football.api-sports.io'),
  rugby:      makeClient('https://v1.rugby.api-sports.io'),
  volleyball: makeClient('https://v1.volleyball.api-sports.io'),
}

// ─── FOOTBALL ───────────────────────────────────────────
export async function getLiveMatches() {
  const res = await clients.football.get('/fixtures', { params: { live: 'all' } })
  return res.data.response || []
}

export async function getFixturesByDate(date) {
  const res = await clients.football.get('/fixtures', { params: { date } })
  return res.data.response || []
}

export async function getTopLeagues() {
  return [
    { id: 39,  name: 'Premier League',   country: 'England', logo: 'https://media.api-sports.io/football/leagues/39.png' },
    { id: 140, name: 'La Liga',          country: 'Spain',   logo: 'https://media.api-sports.io/football/leagues/140.png' },
    { id: 135, name: 'Serie A',          country: 'Italy',   logo: 'https://media.api-sports.io/football/leagues/135.png' },
    { id: 78,  name: 'Bundesliga',       country: 'Germany', logo: 'https://media.api-sports.io/football/leagues/78.png' },
    { id: 61,  name: 'Ligue 1',          country: 'France',  logo: 'https://media.api-sports.io/football/leagues/61.png' },
    { id: 2,   name: 'Champions League', country: 'Europe',  logo: 'https://media.api-sports.io/football/leagues/2.png' },
  ]
}

// ─── GENERIC (Basketball, Hockey, AFL, Baseball, Handball, MMA, NBA, NFL, Rugby, Volleyball) ──
export async function getGamesByDate(sport, date) {
  const c = clients[sport]
  if (!c) throw new Error(`Unknown sport: ${sport}`)

  if (sport === 'formula1') {
    const res = await c.get('/races', { params: { date } })
    return res.data.response || []
  }
  if (sport === 'mma') {
    const res = await c.get('/fights', { params: { date } })
    return res.data.response || []
  }

  const res = await c.get('/games', { params: { date } })
  return res.data.response || []
}

export async function getLiveGames(sport) {
  const c = clients[sport]
  if (!c) throw new Error(`Unknown sport: ${sport}`)
  const res = await c.get('/games', { params: { live: 'all' } })
  return res.data.response || []
}
