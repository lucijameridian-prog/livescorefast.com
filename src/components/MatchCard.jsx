import { useNavigate } from 'react-router-dom'

function StatusBadge({ status }) {
  if (!status) return <span className="text-xs text-slate-400">Scheduled</span>
  const s = status.toUpperCase()
  if (s === 'LIVE' || s === '1H' || s === '2H' || s === 'HT' || s === 'IN PROGRESS')
    return <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full font-semibold animate-pulse">LIVE</span>
  if (s === 'FT' || s === 'FINISHED' || s === 'FINAL' || s === 'AOT' || s === 'AET')
    return <span className="text-xs bg-slate-600 text-slate-300 px-2 py-0.5 rounded-full">FT</span>
  return <span className="text-xs text-slate-400">{status}</span>
}

export default function MatchCard({ match }) {
  const navigate = useNavigate()
  const homeName = match.strHomeTeam || 'Home'
  const awayName = match.strAwayTeam || 'Away'
  const homeLogo = match.strHomeTeamBadge || null
  const awayLogo = match.strAwayTeamBadge || null
  const homeScore = match.intHomeScore
  const awayScore = match.intAwayScore
  const league = match.strLeague || ''
  const status = match.strStatus || match.strProgress || null
  const time = match.strTime || ''

  const isLive = status && ['LIVE','1H','2H','HT','IN PROGRESS'].includes(status.toUpperCase())
  const homeWin = homeScore !== null && homeScore !== '' && awayScore !== null && awayScore !== '' && Number(homeScore) > Number(awayScore)
  const awayWin = homeScore !== null && homeScore !== '' && awayScore !== null && awayScore !== '' && Number(awayScore) > Number(homeScore)

  return (
    <div
      onClick={() => match.idEvent && navigate(`/match/${match.idEvent}`)}
      className={`bg-dark-800 rounded-lg p-4 border transition-colors hover:border-slate-600 ${match.idEvent ? 'cursor-pointer' : ''}
      ${isLive ? 'border-red-800/50' : 'border-dark-600'}`}>

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-slate-500 truncate max-w-[160px]">{league}</span>
        <div className="flex items-center gap-2">
          {time && !status && <span className="text-xs text-slate-500">{time}</span>}
          <StatusBadge status={status} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            {homeLogo && <img src={homeLogo} alt={homeName} className="w-6 h-6 object-contain" onError={e => e.target.style.display='none'} />}
            <span className={`text-sm truncate ${homeWin ? 'text-white font-semibold' : 'text-slate-300'}`}>{homeName}</span>
          </div>
          <span className={`text-lg font-bold ml-4 ${homeWin ? 'text-white' : 'text-slate-400'}`}>
            {homeScore ?? '-'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            {awayLogo && <img src={awayLogo} alt={awayName} className="w-6 h-6 object-contain" onError={e => e.target.style.display='none'} />}
            <span className={`text-sm truncate ${awayWin ? 'text-white font-semibold' : 'text-slate-300'}`}>{awayName}</span>
          </div>
          <span className={`text-lg font-bold ml-4 ${awayWin ? 'text-white' : 'text-slate-400'}`}>
            {awayScore ?? '-'}
          </span>
        </div>
      </div>
    </div>
  )
}
