import { Link } from 'react-router-dom'

const SPORTS = [
  { name: 'Football', abbr: 'FB', iconBg: '#1FA84A', to: '/football' },
  { name: 'Basketball', abbr: 'BK', iconBg: '#f08a1f', to: '/basketball' },
  { name: 'Tennis', abbr: 'TN', iconBg: '#b5e61d', to: '/tennis' },
  { name: 'Ice Hockey', abbr: 'IH', iconBg: '#3a8ad9', to: '/hockey' },
  { name: 'Baseball', abbr: 'BB', iconBg: '#c0392b', to: '/baseball' },
  { name: 'Handball', abbr: 'HB', iconBg: '#2980b9', to: '/handball' },
  { name: 'Volleyball', abbr: 'VB', iconBg: '#e67e22', to: '/volleyball' },
  { name: 'Rugby', abbr: 'RG', iconBg: '#16a085', to: '/rugby' },
  { name: 'NFL', abbr: 'AF', iconBg: '#8e44ad', to: '/nfl' },
  { name: 'MMA', abbr: 'MMA', iconBg: '#c0392b', to: '/mma' },
  { name: 'Formula 1', abbr: 'F1', iconBg: '#e2231a', to: '/formula1' },
]

export default function SportsList({ title = 'All Sports', exclude = [] }) {
  const list = SPORTS.filter(s => !exclude.includes(s.to))
  return (
    <div className="panel">
      <div className="panel-head">{title}</div>
      {list.map(sp => (
        <Link key={sp.to} to={sp.to} className="row-hover"
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderBottom: '1px solid var(--line)', cursor: 'pointer', textDecoration: 'none' }}>
          <span style={{ width: 22, height: 22, borderRadius: 5, background: sp.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#fff', fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800, fontSize: 12 }}>{sp.abbr}</span>
          <span style={{ flex: 1, fontSize: 13, color: '#cfd8e4' }}>{sp.name}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--mut)" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
        </Link>
      ))}
    </div>
  )
}
