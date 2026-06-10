import axios from 'axios'

const KEY = import.meta.env.VITE_API_KEY || ''

const footballClient = axios.create({
  baseURL: 'https://v3.football.api-sports.io',
  headers: { 'x-apisports-key': KEY },
})

const basketballClient = axios.create({
  baseURL: 'https://v1.basketball.api-sports.io',
  headers: { 'x-apisports-key': KEY },
})

const hockeyClient = axios.create({
  baseURL: 'https://v1.hockey.api-sports.io',
  headers: { 'x-apisports-key': KEY },
})

const tennisClient = axios.create({
  baseURL: 'https://v1.tennis.api-sports.io',
  headers: { 'x-apisports-key': KEY },
})

// ─── FOOTBALL ───────────────────────────────────────────
export async function getLiveMatches() {
  const res = await footballClient.get('/fixtures', { params: { live: 'all' } })
  return res.data.response || []
}

export async function getFixturesByDate(date) {
  const res = await footballClient.get('/fixtures', { params: { date } })
  return res.data.response || []
}

export async function getTopLeagues() {
  return [
    { id: 39, name: 'Premier League', country: 'England', logo: 'https://media.api-sports.io/football/leagues/39.png' },
    { id: 140, name: 'La Liga', country: 'Spain', logo: 'https://media.api-sports.io/football/leagues/140.png' },
    { id: 135, name: 'Serie A', country: 'Italy', logo: 'https://media.api-sports.io/football/leagues/135.png' },
    { id: 78, name: 'Bundesliga', country: 'Germany', logo: 'https://media.api-sports.io/football/leagues/78.png' },
    { id: 61, name: 'Ligue 1', country: 'France', logo: 'https://media.api-sports.io/football/leagues/61.png' },
    { id: 2, name: 'Champions League', country: 'Europe', logo: 'https://media.api-sports.io/football/leagues/2.png' },
  ]
}

// ─── BASKETBALL ─────────────────────────────────────────
export async function getBasketballByDate(date) {
  const res = await basketballClient.get('/games', { params: { date } })
  return res.data.response || []
}

export async function getLiveBasketball() {
  const res = await basketballClient.get('/games', { params: { live: 'all' } })
  return res.data.response || []
}

// ─── HOCKEY ─────────────────────────────────────────────
export async function getHockeyByDate(date) {
  const res = await hockeyClient.get('/games', { params: { date } })
  return res.data.response || []
}

export async function getLiveHockey() {
  const res = await hockeyClient.get('/games', { params: { live: 'all' } })
  return res.data.response || []
}

// ─── TENNIS ─────────────────────────────────────────────
export async function getTennisByDate(date) {
  const res = await tennisClient.get('/games', { params: { date } })
  return res.data.response || []
}

export async function getLiveTennis() {
  const res = await tennisClient.get('/games', { params: { live: 'all' } })
  return res.data.response || []
}
