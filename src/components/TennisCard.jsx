function StatusBadge({ status }) {
  const s = status?.short
  if (s === 'LIVE' || s === 'IN_PLAY')
    return <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full font-semibold animate-pulse">LIVE</span>
  if (s === 'FT' || s === 'FINISHED')
    return <span className="text-xs bg-slate-600 text-slate-300 px-2 py-0.5 rounded-full">FT</span>
  return <span className="text-xs text-slate-400">{s || 'Scheduled'}</span>
}

export default function TennisCard({ game }) {
  const { players, scores, status, tournament } = game
  const isLive = ['LIVE', 'IN_PLAY'].includes(status?.short)

  const homeScore = scores?.home ?? '-'
  const awayScore = scores?.away ?? '-'
  const homeWin = status?.short === 'FT' && scores?.home > scores?.away
  const awayWin = status?.short === 'FT' && scores?.away > scores?.home

  return (
    <div className={`bg-dark-800 rounded-lg p-4 border transition-colors hover:border-slate-600
      ${isLive ? 'border-red-800/50' : 'border-dark-600'}`}>

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-slate-500 truncate max-w-[180px]">
          🎾 {tournament?.name || 'Tennis'}
        </span>
        <StatusBadge status={status} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className={`text-sm truncate ${homeWin ? 'text-white font-semibold' : 'text-slate-300'}`}>
            {players?.home?.name || 'Player 1'}
          </span>
          <span className={`text-lg font-bold ml-4 ${homeWin ? 'text-white' : 'text-slate-400'}`}>{homeScore}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-sm truncate ${awayWin ? 'text-white font-semibold' : 'text-slate-300'}`}>
            {players?.away?.name || 'Player 2'}
          </span>
          <span className={`text-lg font-bold ml-4 ${awayWin ? 'text-white' : 'text-slate-400'}`}>{awayScore}</span>
        </div>
      </div>
    </div>
  )
}
