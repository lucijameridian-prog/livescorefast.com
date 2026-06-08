function StatusBadge({ status }) {
  const s = status?.short
  if (s === 'LIVE' || s === '1H' || s === '2H' || s === 'HT' || s === 'ET')
    return <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full font-semibold animate-pulse">LIVE</span>
  if (s === 'FT' || s === 'AET' || s === 'PEN')
    return <span className="text-xs bg-slate-600 text-slate-300 px-2 py-0.5 rounded-full">FT</span>
  if (s === 'NS')
    return <span className="text-xs text-slate-400">{status?.elapsed ? `${status.elapsed}'` : 'Scheduled'}</span>
  return <span className="text-xs text-slate-500">{s}</span>
}

export default function MatchCard({ match }) {
  const { teams, goals, fixture, league, score } = match

  const minute = fixture?.status?.elapsed
  const isLive = ['1H','2H','HT','ET','LIVE'].includes(fixture?.status?.short)

  return (
    <div className={`bg-dark-800 rounded-lg p-4 border transition-colors hover:border-slate-600
      ${isLive ? 'border-red-800/50' : 'border-dark-600'}`}>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {league?.logo && <img src={league.logo} alt={league.name} className="w-4 h-4 object-contain" />}
          <span className="text-xs text-slate-500 truncate max-w-[140px]">{league?.name}</span>
        </div>
        <div className="flex items-center gap-2">
          {isLive && minute && (
            <span className="text-xs text-red-400 font-mono">{minute}'</span>
          )}
          <StatusBadge status={fixture?.status} />
        </div>
      </div>

      <div className="space-y-2">
        <TeamRow team={teams?.home} goals={goals?.home} isWinner={goals?.home > goals?.away} />
        <TeamRow team={teams?.away} goals={goals?.away} isWinner={goals?.away > goals?.home} />
      </div>

      {score?.halftime?.home !== null && (
        <div className="mt-2 pt-2 border-t border-dark-600">
          <span className="text-xs text-slate-600">
            HT: {score.halftime.home} - {score.halftime.away}
          </span>
        </div>
      )}
    </div>
  )
}

function TeamRow({ team, goals, isWinner }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 min-w-0">
        {team?.logo && <img src={team.logo} alt={team.name} className="w-6 h-6 object-contain" />}
        <span className={`text-sm truncate ${isWinner ? 'text-white font-semibold' : 'text-slate-300'}`}>
          {team?.name}
        </span>
      </div>
      <span className={`text-lg font-bold ml-4 ${isWinner ? 'text-white' : 'text-slate-400'}`}>
        {goals ?? '-'}
      </span>
    </div>
  )
}
