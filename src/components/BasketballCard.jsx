function StatusBadge({ status }) {
  const s = status?.short
  if (s === 'LIVE' || s === 'Q1' || s === 'Q2' || s === 'Q3' || s === 'Q4' || s === 'OT' || s === 'HT')
    return <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full font-semibold animate-pulse">LIVE</span>
  if (s === 'FT' || s === 'AOT')
    return <span className="text-xs bg-slate-600 text-slate-300 px-2 py-0.5 rounded-full">FT</span>
  return <span className="text-xs text-slate-400">{s || 'Scheduled'}</span>
}

export default function BasketballCard({ game }) {
  const { teams, scores, status, league, date } = game
  const isLive = ['Q1','Q2','Q3','Q4','OT','HT','LIVE'].includes(status?.short)

  const homeScore = scores?.home?.total ?? '-'
  const awayScore = scores?.away?.total ?? '-'
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
        <div className="flex items-center gap-2">
          {isLive && status?.timer && (
            <span className="text-xs text-red-400 font-mono">{status.timer}'</span>
          )}
          <StatusBadge status={status} />
        </div>
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

      {status?.short !== 'NS' && scores?.home?.quarter_1 !== null && (
        <div className="mt-2 pt-2 border-t border-dark-600 flex gap-3 text-xs text-slate-600">
          {['quarter_1','quarter_2','quarter_3','quarter_4'].map((q, i) => (
            scores?.home?.[q] !== null && scores?.home?.[q] !== undefined ? (
              <span key={q}>Q{i+1}: {scores.home[q]}-{scores.away[q]}</span>
            ) : null
          ))}
        </div>
      )}
    </div>
  )
}
