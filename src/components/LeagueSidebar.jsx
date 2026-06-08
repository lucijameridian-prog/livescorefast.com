import { getTopLeagues } from '../api/sports'
import { useEffect, useState } from 'react'

export default function LeagueSidebar({ onSelect, selected }) {
  const [leagues, setLeagues] = useState([])

  useEffect(() => {
    getTopLeagues().then(setLeagues)
  }, [])

  return (
    <aside className="bg-dark-800 rounded-lg border border-dark-600 p-4">
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Top Leagues</h3>
      <ul className="space-y-1">
        {leagues.map(l => (
          <li key={l.id}>
            <button
              onClick={() => onSelect(l.id === selected ? null : l.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors text-left
                ${selected === l.id ? 'bg-accent/20 text-accent' : 'text-slate-400 hover:text-white hover:bg-dark-600'}`}
            >
              <img src={l.logo} alt={l.name} className="w-5 h-5 object-contain" />
              <div>
                <div className="font-medium text-xs">{l.name}</div>
                <div className="text-xs text-slate-600">{l.country}</div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
