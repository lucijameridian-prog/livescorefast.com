// Deterministic team color from name (matches design's hash function)
export function teamColor(s = '') {
  let h = 0
  for (let i = 0; i < s.length; i++) h = s.charCodeAt(i) + ((h << 5) - h)
  const hue = Math.abs(h) % 360
  return `hsl(${hue},55%,38%)`
}

// 2-3 letter abbreviation from a team/player name
export function abbr(n = '') {
  const p = n.replace(/[^A-Za-z ]/g, '').trim().split(' ')
  return (p.length > 1 ? (p[0][0] + p[1][0]) : n.slice(0, 3)).toUpperCase().slice(0, 3)
}

// Country / league code helper for the little flag-style square (best-effort)
export function leagueCode(name = '') {
  const map = {
    'Premier League': 'EN', 'English Premier League': 'EN',
    'La Liga': 'ES', 'Spanish La Liga': 'ES',
    'Serie A': 'IT', 'Italian Serie A': 'IT',
    'Bundesliga': 'DE', 'German Bundesliga': 'DE',
    'Ligue 1': 'FR', 'French Ligue 1': 'FR',
    'Champions League': 'CL', 'UEFA Champions League': 'CL',
    'Eredivisie': 'NL', 'Dutch Eredivisie': 'NL',
    'FIFA World Cup': 'WC', 'World Cup': 'WC',
  }
  if (map[name]) return map[name]
  return abbr(name).slice(0, 2)
}
