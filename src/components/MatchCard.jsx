import { useNavigate } from 'react-router-dom'
import TeamBadge from './TeamBadge'
import { matchStatus, statusBadgeStyle, isLiveType } from '../utils/status'

function Row({ name, logo, score, live, sched }) {
  const scoreStyle = sched
    ? { fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 13, color: 'var(--mut)', minWidth: 22, textAlign: 'center' }
    : { fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800, fontSize: 20, lineHeight: 1, color: live ? '#fff' : '#aeb9c9', minWidth: 22, textAlign: 'center' }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <TeamBadge name={name} logo={logo} size={24} />
      <span style={{ flex: 1, fontSize: 14.5, fontWeight: 600, color: 'var(--txt)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>
      <span style={scoreStyle}>{sched ? '-' : (score ?? '-')}</span>
    </div>
  )
}

export default function MatchCard({ match }) {
  const navigate = useNavigate()
  const st = matchStatus(match)
  const live = isLiveType(st.type)
  const sched = st.type === 'sched'

  return (
    <div
      onClick={() => match.idEvent && navigate(`/match/${match.idEvent}`)}
      className="card-hover"
      style={{ background: 'linear-gradient(150deg,#1c2536 0%,#0e1320 100%)', border: '1px solid var(--line)', borderRadius: 9, overflow: 'hidden', cursor: match.idEvent ? 'pointer' : 'default', position: 'relative' }}>
      {live && <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 100% 0%,rgba(31,168,74,.10),transparent 55%)', pointerEvents: 'none' }} />}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,.05)', position: 'relative' }}>
        <span style={{ fontSize: 11, color: 'var(--mut)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '62%' }}>{match.strLeague || ''}</span>
        <span style={statusBadgeStyle(st.type)}>
          {st.type === 'live' && <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff3232', animation: 'lsf-blink 1s infinite' }} />}
          {st.text}
        </span>
      </div>
      <div style={{ padding: '11px 13px 13px', display: 'flex', flexDirection: 'column', gap: 9, position: 'relative' }}>
        <Row name={match.strHomeTeam || 'Home'} logo={match.strHomeTeamBadge} score={match.intHomeScore} live={live} sched={sched} />
        <Row name={match.strAwayTeam || 'Away'} logo={match.strAwayTeamBadge} score={match.intAwayScore} live={live} sched={sched} />
      </div>
    </div>
  )
}
