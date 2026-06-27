import axios from 'axios'

const BASE = 'https://www.thesportsdb.com/api/v1/json/3'
const cache = new Map() // teamId -> form (avoids duplicate fetches)

// Recent form for a team: avg goals scored/conceded + last 5 W/D/L
export async function teamForm(teamId, teamName) {
  if (!teamId) return null
  if (cache.has(teamId)) return cache.get(teamId)
  try {
    const res = await axios.get(`${BASE}/eventslast.php?id=${teamId}`)
    const events = res.data.results || []
    let scored = 0, conceded = 0, n = 0
    const form = []
    for (const e of events) {
      const hs = parseInt(e.intHomeScore), as = parseInt(e.intAwayScore)
      if (Number.isNaN(hs) || Number.isNaN(as)) continue
      const isHome = String(e.idHomeTeam) === String(teamId) || e.strHomeTeam === teamName
      const gf = isHome ? hs : as, ga = isHome ? as : hs
      scored += gf; conceded += ga; n++
      form.push(gf > ga ? 'W' : (gf < ga ? 'L' : 'D'))
    }
    const out = { avgScored: n ? scored / n : 1.3, avgConceded: n ? conceded / n : 1.2, form: form.slice(0, 5), n }
    cache.set(teamId, out)
    return out
  } catch {
    return null
  }
}

const fact = (n) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r }
const poisson = (k, l) => Math.exp(-l) * Math.pow(l, k) / fact(k)

// Poisson goals model → win/draw/win probabilities + most likely scoreline.
export async function predictMatch(home, away) {
  const [h, a] = await Promise.all([teamForm(home.id, home.name), teamForm(away.id, away.name)])
  if (!h || !a || (h.n === 0 && a.n === 0)) return null

  const HOME_ADV = 1.12
  let lh = ((h.avgScored + a.avgConceded) / 2) * HOME_ADV
  let la = ((a.avgScored + h.avgConceded) / 2) * 0.92
  lh = Math.max(0.25, Math.min(4, lh))
  la = Math.max(0.25, Math.min(4, la))

  const MAX = 6
  let pH = 0, pD = 0, pA = 0, best = { p: 0, i: 1, j: 1 }
  for (let i = 0; i <= MAX; i++) {
    for (let j = 0; j <= MAX; j++) {
      const p = poisson(i, lh) * poisson(j, la)
      if (i > j) pH += p; else if (i === j) pD += p; else pA += p
      if (p > best.p) best = { p, i, j }
    }
  }
  const tot = pH + pD + pA || 1
  return {
    pHome: Math.round((pH / tot) * 100),
    pDraw: Math.round((pD / tot) * 100),
    pAway: Math.round((pA / tot) * 100),
    score: `${best.i} - ${best.j}`,
    formHome: h.form,
    formAway: a.form,
    samples: Math.min(h.n, a.n),
  }
}
