import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getEventDetails, getEventTimeline, getEventStats, getEventLineup } from '../api/sports'

export default function MatchDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [timeline, setTimeline] = useState([])
  const [stats, setStats] = useState([])
  const [lineup, setLineup] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('summary')

  useEffect(() => {
    setLoading(true)
    Promise.all([
      getEventDetails(id),
      getEventTimeline(id),
      getEventStats(id),
      getEventLineup(id),
    ]).then(([ev, tl, st, lu]) => {
      setEvent(ev)
      setTimeline(tl)
      setStats(st)
      setLineup(lu)
    }).finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
    </div>
  )

  if (!event) return (
    <div className="text-center py-20 text-slate-500">
      <p>Match not found.</p>
      <button onClick={() => navigate(-1)} className="mt-4 text-accent text-sm hover:underline">← Go back</button>
    </div>
  )

  const homeScore = event.intHomeScore
  const awayScore = event.intAwayScore
  const htHome = event.intHomeScoreHalf
  const htAway = event.intAwayScoreHalf
  const isFinished = event.strStatus === 'Match Finished' || event.strStatus === 'FT'
  const isLive = event.strStatus && !isFinished && event.strStatus !== 'Not Started'

  const homeTimeline = timeline.filter(t => t.strTeam === event.strHomeTeam)
  const awayTimeline = timeline.filter(t => t.strTeam === event.strAwayTeam)

  const homeLineup = lineup.filter(l => l.strTeam === event.strHomeTeam)
  const awayLineup = lineup.filter(l => l.strTeam === event.strAwayTeam)

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white text-sm mb-4 flex items-center gap-1">
        ← Back
      </button>

      {/* Header */}
      <div className="bg-dark-800 rounded-xl border border-dark-600 p-6 mb-4">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            {event.strLeagueBadge && <img src={event.strLeagueBadge} className="w-5 h-5 object-contain" onError={e => e.target.style.display='none'} />}
            <span className="text-xs text-slate-400">{event.strLeague}</span>
          </div>
          <div className="text-xs text-slate-500">{event.dateEvent} {event.strTime}</div>
          {event.strVenue && <div className="text-xs text-slate-600 mt-1">📍 {event.strVenue}</div>}
        </div>

        {/* Scoreboard */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 text-center">
            {event.strHomeTeamBadge && <img src={event.strHomeTeamBadge} className="w-16 h-16 object-contain mx-auto mb-2" onError={e => e.target.style.display='none'} />}
            <div className="font-bold text-white text-sm">{event.strHomeTeam}</div>
          </div>

          <div className="text-center flex-shrink-0">
            <div className="text-4xl font-bold text-white">
              {homeScore ?? '-'} <span className="text-slate-500">:</span> {awayScore ?? '-'}
            </div>
            {htHome !== null && htHome !== undefined && htHome !== '' && (
              <div className="text-xs text-slate-500 mt-1">HT: {htHome} - {htAway}</div>
            )}
            <div className="mt-2">
              {isLive
                ? <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
                : isFinished
                  ? <span className="text-xs bg-slate-600 text-slate-300 px-2 py-0.5 rounded-full">Full Time</span>
                  : <span className="text-xs text-slate-400">{event.strStatus || 'Scheduled'}</span>
              }
            </div>
          </div>

          <div className="flex-1 text-center">
            {event.strAwayTeamBadge && <img src={event.strAwayTeamBadge} className="w-16 h-16 object-contain mx-auto mb-2" onError={e => e.target.style.display='none'} />}
            <div className="font-bold text-white text-sm">{event.strAwayTeam}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-dark-800 rounded-lg p-1 border border-dark-600">
        {['summary', 'stats', 'lineup'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-md text-sm font-medium capitalize transition-colors
              ${tab === t ? 'bg-accent text-white' : 'text-slate-400 hover:text-white'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Summary Tab */}
      {tab === 'summary' && (
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          {timeline.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm">No timeline data available.</div>
          ) : (
            <div className="space-y-1">
              {timeline.sort((a, b) => parseInt(a.intClockTime) - parseInt(b.intClockTime)).map((t, i) => {
                const isHome = t.strTeam === event.strHomeTeam
                const icon = t.strTimelineType === 'Goal' ? '⚽'
                  : t.strTimelineType === 'Yellow Card' ? '🟨'
                  : t.strTimelineType === 'Red Card' ? '🟥'
                  : t.strTimelineType === 'Substitution' ? '🔄'
                  : '•'

                return (
                  <div key={i} className={`flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-dark-700 ${isHome ? '' : 'flex-row-reverse'}`}>
                    <span className="text-xs text-slate-500 w-8 flex-shrink-0 text-center">{t.intClockTime}'</span>
                    <span className="text-base">{icon}</span>
                    <div className={`flex-1 ${isHome ? '' : 'text-right'}`}>
                      <div className="text-sm text-white">{t.strPlayer}</div>
                      {t.strAssist && <div className="text-xs text-slate-500">Assist: {t.strAssist}</div>}
                      <div className="text-xs text-slate-600">{t.strTimelineType}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Match info */}
          {(event.strReferee || event.intAttendance) && (
            <div className="mt-4 pt-4 border-t border-dark-600 grid grid-cols-2 gap-2 text-xs text-slate-500">
              {event.strReferee && <div><span className="text-slate-600">Referee:</span> {event.strReferee}</div>}
              {event.intAttendance && <div><span className="text-slate-600">Attendance:</span> {Number(event.intAttendance).toLocaleString()}</div>}
            </div>
          )}
        </div>
      )}

      {/* Stats Tab */}
      {tab === 'stats' && (
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          {stats.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm">No stats available for this match.</div>
          ) : (
            <div className="space-y-3">
              {stats.map((s, i) => {
                const home = parseFloat(s.intHome) || 0
                const away = parseFloat(s.intAway) || 0
                const total = home + away || 1
                return (
                  <div key={i}>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span className="font-semibold text-white">{home}</span>
                      <span className="text-slate-500">{s.strStat}</span>
                      <span className="font-semibold text-white">{away}</span>
                    </div>
                    <div className="flex gap-1 h-1.5 rounded-full overflow-hidden bg-dark-600">
                      <div className="bg-accent rounded-full" style={{width: `${(home/total)*100}%`}} />
                      <div className="bg-slate-500 rounded-full" style={{width: `${(away/total)*100}%`}} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Lineup Tab */}
      {tab === 'lineup' && (
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          {lineup.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm">No lineup data available.</div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 pb-2 border-b border-dark-600">{event.strHomeTeam}</h3>
                <div className="space-y-1">
                  {homeLineup.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm py-1">
                      <span className="text-xs text-slate-600 w-5 text-center">{p.intSquadNo}</span>
                      <span className={p.strPosition === 'Goalkeeper' ? 'text-yellow-400' : 'text-slate-300'}>{p.strPlayer}</span>
                      {p.strSubstitute === 'True' && <span className="text-xs text-green-400 ml-auto">SUB</span>}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 pb-2 border-b border-dark-600">{event.strAwayTeam}</h3>
                <div className="space-y-1">
                  {awayLineup.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm py-1">
                      <span className="text-xs text-slate-600 w-5 text-center">{p.intSquadNo}</span>
                      <span className={p.strPosition === 'Goalkeeper' ? 'text-yellow-400' : 'text-slate-300'}>{p.strPlayer}</span>
                      {p.strSubstitute === 'True' && <span className="text-xs text-green-400 ml-auto">SUB</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
