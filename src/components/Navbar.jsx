import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const NAV_LINKS = [
  { to: '/', label: 'Live', icon: '🔴' },
  { to: '/football', label: 'Football', icon: '⚽' },
  { to: '/basketball', label: 'Basketball', icon: '🏀' },
  { to: '/hockey', label: 'Hockey', icon: '🏒' },
  { to: '/baseball', label: 'Baseball', icon: '⚾' },
  { to: '/handball', label: 'Handball', icon: '🤾' },
  { to: '/rugby', label: 'Rugby', icon: '🏉' },
  { to: '/volleyball', label: 'Volleyball', icon: '🏐' },
  { to: '/nfl', label: 'NFL', icon: '🏈' },
  { to: '/nba', label: 'NBA', icon: '🏀' },
  { to: '/mma', label: 'MMA', icon: '🥊' },
  { to: '/afl', label: 'AFL', icon: '🏉' },
  { to: '/formula1', label: 'Formula 1', icon: '🏎️' },
  { to: '/tennis', label: 'Tennis', icon: '🎾' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="bg-dark-800 border-b border-dark-600 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-4 h-14">
        <Link to="/" className="text-white font-bold text-xl tracking-tight flex items-center gap-2 flex-shrink-0">
          <span className="text-accent">⚡</span> LiveScore
        </Link>

        <div className="flex items-center gap-1 overflow-x-auto pb-0" style={{scrollbarWidth: 'none'}}>
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
