import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Live', icon: '🔴' },
  { to: '/football', label: 'Football', icon: '⚽' },
  { to: '/basketball', label: 'Basketball', icon: '🏀' },
  { to: '/tennis', label: 'Tennis', icon: '🎾' },
  { to: '/hockey', label: 'Hockey', icon: '🏒' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="bg-dark-800 border-b border-dark-600 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-6 h-14">
        <Link to="/" className="text-white font-bold text-xl tracking-tight flex items-center gap-2">
          <span className="text-accent">⚡</span> LiveScore
        </Link>

        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {NAV_LINKS.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors
                ${pathname === to
                  ? 'bg-accent text-white'
                  : 'text-slate-400 hover:text-white hover:bg-dark-600'
                }`}
            >
              <span>{icon}</span> {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
