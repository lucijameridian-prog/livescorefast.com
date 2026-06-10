function StatusBadge({ status }) {
  const s = status?.short || status?.long || ''
  const liveStates = ['LIVE','IN_PLAY','1H','2H','HT','ET','Q1','Q2','Q3','Q4','OT','P1','P2','P3','BT','IN_PROGRESS']
  const finishedStates = ['FT','FINISHED','AOT','AP','AET','PEN','COMPLETED','FINAL']

  if (liveStates.includes(s))
    return <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full font-semibold animate-pulse">LIVE</span>
  if (finishedStates.includes(s))
    return <span className="text-xs bg-slate-600 text-slate-300 px-2 py-0.5 rounded-full">FT</span>
  return <span className="text-xs text-slate-400">{s || 'Scheduled'}</span>
}

function extractTeams(game) {
  // Football style
  if (game.teams?.home && game.fixture) return {
    homeName: game.teams.home.name,
    homeLogo: game.teams.home.logo,
    awayName: game.teams.away.name,
    awayLogo: game.teams.away.logo,
    homeScore: game.goals?.home,
    awayScore: game.goals?.away,
    league: game.league,
    status: game.fixture?.status,
  }
  // Generic teams style (basketball, hockey, handball, etc.)
  if (game.teams?.home) return {
    homeName: game.teams.home.name,
    homeLogo: game.teams.home.logo,
    awayName: game.teams.away.name,
    awayLogo: game.teams.away.logo,
    homeScore: game.scores?.home?.total ?? game.scores?.home,
    awayScore: game.scores?.away?.total ?? game.scores?.away,
    league: game.league || game.country,
    status: game.status,
  }
  // MMA / fights style
  if (game.fighters) return {
    homeName: game.fighters?.first?.name || 'Fighter 1',
    homeLogo: game.fighters?.first?.photo,
    awayName: game.fighters?.second?.name || 'Fighter 2',
    awayLogo: game.fighters?.second?.photo,
    homeScore: null,
    awayScore: null,
    league: { name: game.event?.name || 'MMA' },
    status: game.status,
  }
  // Formula1
  if (game.circuit) return {
    homeName: game.circuit?.name || 'Circuit',
    homeLogo: null,
    awayName: game.competition?.name || '',
    awayLogo: null,
    homeScore: null,
    awayScore: null,
    league: { name: game.competition?.name || 'Formula 1' },
    status: game.status,
  }
  return {
    homeName: 'Team 1', homeLogo: null,
    awayName: 'Team 2', awayLogo: null,
    homeScore: null, awayScore: null,
    league: null, status: game.status,
  }
}

export default function GenericCard({ game }) {
  const { homeName, homeLogo, awayName, awayLogo, homeScore, awayScore, league, status } = extractTeams(game)

  const liveStates = ['LIVE','IN_PLAY','1H','2H','HT','ET','Q1','Q2','Q3','Q4','OT','P1','P2','P3','BT','IN_PROGRESS']
  const isLive = liveStates.includes(status?.short || status?.long || '')

  const homeWin = homeScore !== null && awayScore !== null && homeScore > awayScore
  const awayWin = homeScore !== null && awayScore !== null && awayScore > homeScore

  return (
    <div className={`bg-dark-800 rounded-lg p-4 border transition-colors hover:border-slate-600
      ${isLive ? 'border-red-800/50' : 'border-dark-600'}`}>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {league?.logo && <img src={league.logo} alt={league.name} className="w-4 h-4 object-contain" />}
          <span className="text-xs text-slate-500 truncate max-w-[160px]">{league?.name || ''}</span>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            {homeLogo && <img src={homeLogo} alt={homeName} className="w-6 h-6 object-contain rounded-full" />}
            <span className={`text-sm truncate ${homeWin ? 'text-white font-semibold' : 'text-slate-300'}`}>{homeName}</span>
          </div>
          <span className={`text-lg font-bold ml-4 ${homeWin ? 'text-white' : 'text-slate-400'}`}>
            {homeScore ?? '-'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            {awayLogo && <img src={awayLogo} alt={awayName} className="w-6 h-6 object-contain rounded-full" />}
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
