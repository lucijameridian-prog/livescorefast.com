import axios from 'axios'

const BASE = 'https://v3.football.api-sports.io'
const KEY = import.meta.env.VITE_API_KEY || ''

const client = axios.create({
  baseURL: BASE,
  headers: {
    'x-apisports-key': KEY,
  },
})

export const SPORTS = [
  { id: 'football', label: 'Football', icon: '⚽' },
  { id: 'basketball', label: 'Basketball', icon: '🏀' },
  { id: 'tennis', label: 'Tennis', icon: '🎾' },
  { id: 'hockey', label: 'Hockey', icon: '🏒' },
]

// Football (API-Football v3)
export async function getLiveMatches() {
  const res = await client.get('/fixtures', { params: { live: 'all' } })
  return res.data.response || []
}

export async function getFixturesByDate(date) {
  const res = await client.get('/fixtures', { params: { date } })
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
