import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import TeamBadge from './TeamBadge'
import { teamColor } from '../utils/team'

const LEAGUES = [
  { id: '4328', name: 'Premier League', season: '2024-2025', scorers: [{ name: 'Mohamed Salah', team: 'Liverpool', goals: 29, id: '34145506' }, { name: 'Alexander Isak', team: 'Newcastle', goals: 25, id: '34145558' }, { name: 'Erling Haaland', team: 'Man City', goals: 22, id: '34145527' }, { name: 'Cole Palmer', team: 'Chelsea', goals: 20, id: '34157883' }, { name: 'Bukayo Saka', team: 'Arsenal', goals: 16, id: '34156065' }] },
  { id: '4335', name: 'La Liga', season: '2024-2025', scorers: [{ name: 'Kylian Mbappé', team: 'Real Madrid', goals: 31, id: '34147178' }, { name: 'Robert Lewandowski', team: 'Barcelona', goals: 27, id: '34145831' }, { name: 'Raphinha', team: 'Barcelona', goals: 14, id: '34156075' }, { name: 'Vinicius Jr', team: 'Real Madrid', goals: 13, id: '34157014' }] },
  { id: '4332', name: 'Serie A', season: '2024-2025', scorers: [{ name: 'Mateo Retegui', team: 'Atalanta', goals: 25, id: '34157892' }, { name: 'Romelu Lukaku', team: 'Napoli', goals: 13, id: '34147055' }] },
  { id: '4331', name: 'Bundesliga', season: '2024-2025', scorers: [{ name: 'Harry Kane', team: 'Bayern', goals: 25, id: '34145549' }, { name: 'Omar Marmoush', team: 'Frankfurt', goals: 15, id: '34157895' }] },
  { id: '4334', name: 'Ligue 1', season: '2024-2025', scorers: [{ name: 'Jonathan David', team: 'Lille', goals: 20, id: '34157896' }, { name: 'Bradley Barcola', team: 'PSG', goals: 17, id: '34157897' }] },
  { id: '4480', name: 'Champions League', season: '2024-2025', scorers: [{ name: 'Robert Lewandowski', team: 'Barcelona', goals: 9, id: '34145831' }, { name: 'Harry Kane', team: 'Bayern', goals: 8, id: '34145549' }] },
]

function zoneColor(rank, total) {
  if (rank <= 4) return '#1FA84A'
  if (rank <= 6) return '#3a8ad9'
  if (total && rank > total - 3) return '#ff3232'
  return 'transparent'
}

export default function Standings() {
  const [selected, setSelected] = useState(LEAGUES[0])
  const [table, setTable] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('table')
  const [pickerOpen, setPickerOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    axios.get(`https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${selected.id}&s=${selected.season}`)
      .then(res => setTable(res.data.table || []))
      .catch(() => setTable([]))
      .finally(() => setLoading(false))
  }, [selected])

  const total = table.length
  const tabBase = { flex: 1, background: 'transparent', border: 'none', fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '.5px', padding: '11px 0', cursor: 'pointer', textTransform: 'uppercase' }
  const tabStyle = (on) => ({ ...tabBase, color: on ? '#fff' : 'var(--mut)', boxShadow: on ? 'inset 0 -2px 0 var(--accent)' : 'none' })

  return (
    <div className="panel">
      <div style={{ background: '#0a0f1a', padding: '11px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', position: 'relative' }}>
        <span className="font-cond" style={{ fontWeight: 700, fontSize: 14, letterSpacing: '1px', color: '#fff', textTransform: 'uppercase' }}>Standings</span>
        <button onClick={() => setPickerOpen(o => !o)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.06)', border: '1px solid var(--line)', borderRadius: 5, padding: '4px 10px', fontSize: 12, color: '#cfd8e4', fontWeight: 600, cursor: 'pointer' }}>
          {selected.name}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--mut)" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
        </button>
        {pickerOpen && (
          <div className="panel" style={{ position: 'absolute', right: 14, top: '100%', marginTop: 4, zIndex: 30, minWidth: 170, boxShadow: '0 12px 32px rgba(0,0,0,.5)' }}>
            {LEAGUES.map(l => (
              <button key={l.id} onClick={() => { setSelected(l); setPickerOpen(false) }} className="row-hover"
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'transparent', border: 'none', color: l.id === selected.id ? '#fff' : '#cfd8e4', fontSize: 12.5, cursor: 'pointer' }}>
                {l.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid var(--line)' }}>
        <button onClick={() => setTab('table')} style={tabStyle(tab === 'table')}>Table</button>
        <button onClick={() => setTab('scorers')} style={tabStyle(tab === 'scorers')}>Top Scorers</button>
      </div>

      {tab === 'table' && (
        <div style={{ padding: '4px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr 22px 26px 24px', gap: 6, padding: '7px 14px', fontSize: 10.5, color: 'var(--mut)', fontWeight: 700, letterSpacing: '.5px', textTransform: 'uppercase' }}>
            <span>#</span><span>Team</span><span style={{ textAlign: 'center' }}>P</span><span style={{ textAlign: 'center' }}>GD</span><span style={{ textAlign: 'center' }}>Pts</span>
          </div>
          {loading && Array.from({ length: 6 }).map((_, i) => <div key={i} style={{ height: 30, margin: '2px 14px', background: 'rgba(255,255,255,.04)', borderRadius: 4 }} />)}
          {!loading && table.length === 0 && <p style={{ fontSize: 12, color: 'var(--mut)', textAlign: 'center', padding: '16px 0' }}>No standings available.</p>}
          {!loading && table.map((r, i) => {
            const rank = Number(r.intRank) || i + 1
            return (
              <div key={i} onClick={() => r.idTeam && navigate(`/team/${r.idTeam}`)} className="row-hover"
                style={{ display: 'grid', gridTemplateColumns: '24px 1fr 22px 26px 24px', gap: 6, padding: '7px 14px', alignItems: 'center', fontSize: 13, borderTop: '1px solid rgba(255,255,255,.04)', cursor: 'pointer' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 3, height: 14, borderRadius: 2, background: zoneColor(rank, total) }} />
                  <span style={{ color: 'var(--mut)', fontWeight: 600 }}>{rank}</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                  <TeamBadge name={r.strTeam} logo={r.strBadge ? r.strBadge + '/tiny' : r.strTeamBadge} size={18} />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#dbe3ee' }}>{r.strTeam}</span>
                </span>
                <span style={{ textAlign: 'center', color: 'var(--mut)' }}>{r.intPlayed}</span>
                <span style={{ textAlign: 'center', color: 'var(--mut)' }}>{r.intGoalDifference > 0 ? `+${r.intGoalDifference}` : r.intGoalDifference}</span>
                <span style={{ textAlign: 'center', fontWeight: 800, color: '#fff' }}>{r.intPoints}</span>
              </div>
            )
          })}
        </div>
      )}

      {tab === 'scorers' && (
        <div style={{ padding: '4px 0' }}>
          {selected.scorers.length === 0 && <p style={{ fontSize: 12, color: 'var(--mut)', textAlign: 'center', padding: '16px 0' }}>No scorer data.</p>}
          {selected.scorers.map((s, i) => (
            <button key={i} onClick={() => navigate(`/player/${s.id}`)} className="row-hover"
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', borderTop: '1px solid rgba(255,255,255,.04)', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ width: 18, textAlign: 'center', color: 'var(--mut)', fontWeight: 700, fontSize: 12 }}>{i + 1}</span>
              <span style={{ width: 28, height: 28, borderRadius: '50%', background: teamColor(s.team), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: '#fff', fontFamily: "'Saira Condensed',sans-serif", flexShrink: 0 }}>{s.name.split(' ').map(w => w[0]).slice(0, 2).join('')}</span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: '#dbe3ee', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</span>
                <span style={{ display: 'block', fontSize: 11, color: 'var(--mut)' }}>{s.team}</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--gold)"><circle cx="12" cy="12" r="10" /></svg>
                <span className="font-cond" style={{ fontWeight: 800, fontSize: 17, color: '#fff' }}>{s.goals}</span>
              </span>
            </button>
          ))}
          <p style={{ fontSize: 11, color: '#55617a', textAlign: 'center', marginTop: 6 }}>Season 2024/25 final</p>
        </div>
      )}
    </div>
  )
}
