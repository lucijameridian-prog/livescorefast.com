function StatusBadge({ status }) {
  const s = status?.short
  if (s === 'LIVE' || s === 'P1' || s === 'P2' || s === 'P3' || s === 'OT' || s === 'BT')
    return <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full font-semibold animate-pulse">LIVE</span>
  if (s === 'FT' || s === 'AOT' || s === 'AP')
    return <span className="text-xs bg-slate-600 text-slate-300 px-2 py-0.5 rounded-full">FT</span>
  return <span className="text-xs text-slate-400">{s || 'Scheduled'}</span>
}

export default function HockeyCard({ game }) {
  const { teams, scores, status, league } = game
  const isLive = ['P1','P2','P3','OT','BT','LIVE'].includes(status?.short)

  const homeScore = scores?.home ?? '-'
  const awayScore = scores?.away ?? '-'
  const homeWin = homeScore > awayScore
  const awayWin = awayScore > homeScore

  return (
    <div className={`bg-dark-800 rounded-lg p-4 border transition-colors hover:border-slate-600
      ${isLive ? 'border-red-800/50' : 'border-dark-600'}`}>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {league?.logo && <img src={league.logo} alt={league.name} className="w-4 h-4 object-contain" />}
          <span className="text-xs text-slate-500 truncate max-w-[140px]">{league?.name}</span>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            {teams?.home?.logo && <img src={teams.home.logo} alt={teams.home.name} className="w-6 h-6 object-contain" />}
            <span className={`text-sm truncate ${homeWin ? 'text-white font-semibold' : 'text-slate-300'}`}>{teams?.home?.name}</span>
          </div>
          <span className={`text-lg font-bold ml-4 ${homeWin ? 'text-white' : 'text-slate-400'}`}>{homeScore}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            {teams?.away?.logo && <img src={teams.away.logo} alt={teams.away.name} className="w-6 h-6 object-contain" />}
            <span className={`text-sm truncate ${awayWin ? 'text-white font-semibold' : 'text-slate-300'}`}>{teams?.away?.name}</span>
          </div>
          <span className={`text-lg font-bold ml-4 ${awayWin ? 'text-white' : 'text-slate-400'}`}>{awayScore}</span>
        </div>
      </div>
    </div>
  )
}
