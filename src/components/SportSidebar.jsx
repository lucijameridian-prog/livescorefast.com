const LEAGUES = {
  football: [
    { id: '4328', name: 'Premier League',    country: 'England',  logo: 'https://www.thesportsdb.com/images/media/league/badge/i6o0kh1549879062.png' },
    { id: '4335', name: 'La Liga',           country: 'Spain',    logo: 'https://www.thesportsdb.com/images/media/league/badge/7onmyv1534768460.png' },
    { id: '4332', name: 'Serie A',           country: 'Italy',    logo: 'https://www.thesportsdb.com/images/media/league/badge/d7lhlw1549878326.png' },
    { id: '4331', name: 'Bundesliga',        country: 'Germany',  logo: 'https://www.thesportsdb.com/images/media/league/badge/0j55yv1534764799.png' },
    { id: '4334', name: 'Ligue 1',           country: 'France',   logo: 'https://www.thesportsdb.com/images/media/league/badge/ocy5le1566496999.png' },
    { id: '4480', name: 'Champions League',  country: 'Europe',   logo: 'https://www.thesportsdb.com/images/media/league/badge/qlyaeq1549879062.png' },
    { id: '4346', name: 'MLS',               country: 'USA',      logo: 'https://www.thesportsdb.com/images/media/league/badge/gmfafs1548987512.png' },
    { id: '4337', name: 'Eredivisie',        country: 'Netherlands', logo: 'https://www.thesportsdb.com/images/media/league/badge/ixqjry1534764799.png' },
  ],
  basketball: [
    { id: '4387', name: 'NBA',               country: 'USA',      logo: 'https://www.thesportsdb.com/images/media/league/badge/ajc2ok1549880326.png' },
    { id: '4391', name: 'Euroleague',        country: 'Europe',   logo: 'https://www.thesportsdb.com/images/media/league/badge/2a6cv81549880729.png' },
    { id: '4389', name: 'NCAA Basketball',   country: 'USA',      logo: 'https://www.thesportsdb.com/images/media/league/badge/yd5jui1549880326.png' },
  ],
  hockey: [
    { id: '4380', name: 'NHL',               country: 'USA/Canada', logo: 'https://www.thesportsdb.com/images/media/league/badge/uvpkif1547214677.png' },
    { id: '4382', name: 'KHL',               country: 'Russia',   logo: 'https://www.thesportsdb.com/images/media/league/badge/lc6qxn1549880326.png' },
  ],
  baseball: [
    { id: '4424', name: 'MLB',               country: 'USA',      logo: 'https://www.thesportsdb.com/images/media/league/badge/cxfkfk1549880733.png' },
  ],
  rugby: [
    { id: '4355', name: 'Rugby World Cup',   country: 'World',    logo: 'https://www.thesportsdb.com/images/media/league/badge/rsnyyq1548987938.png' },
    { id: '4356', name: 'Six Nations',       country: 'Europe',   logo: 'https://www.thesportsdb.com/images/media/league/badge/fxwimq1548987938.png' },
    { id: '4357', name: 'Super Rugby',       country: 'Oceania',  logo: 'https://www.thesportsdb.com/images/media/league/badge/tvqpwq1548987938.png' },
  ],
  nfl: [
    { id: '4391', name: 'NFL',               country: 'USA',      logo: 'https://www.thesportsdb.com/images/media/league/badge/ntpkrq1547214677.png' },
  ],
  nba: [
    { id: '4387', name: 'NBA',               country: 'USA',      logo: 'https://www.thesportsdb.com/images/media/league/badge/ajc2ok1549880326.png' },
  ],
  volleyball: [
    { id: '4414', name: 'Volleyball World',  country: 'World',    logo: 'https://www.thesportsdb.com/images/media/league/badge/volleyball.png' },
  ],
  handball: [
    { id: '4411', name: 'EHF Champions League', country: 'Europe', logo: 'https://www.thesportsdb.com/images/media/league/badge/handball.png' },
  ],
  mma: [
    { id: '4443', name: 'UFC',               country: 'World',    logo: 'https://www.thesportsdb.com/images/media/league/badge/ufc.png' },
  ],
  afl: [
    { id: '4418', name: 'AFL',               country: 'Australia', logo: 'https://www.thesportsdb.com/images/media/league/badge/afl.png' },
  ],
  formula1: [
    { id: '4370', name: 'Formula 1',         country: 'World',    logo: 'https://www.thesportsdb.com/images/media/league/badge/f1.png' },
  ],
}

export default function SportSidebar({ sport, selected, onSelect }) {
  const leagues = LEAGUES[sport] || []
  if (!leagues.length) return null

  return (
    <aside className="bg-dark-800 rounded-lg border border-dark-600 p-4">
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Leagues</h3>
      <ul className="space-y-1">
        {leagues.map(l => (
          <li key={l.id}>
            <button
              onClick={() => onSelect(selected === l.id ? null : l.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors text-left
                ${selected === l.id ? 'bg-accent/20 text-accent' : 'text-slate-400 hover:text-white hover:bg-dark-600'}`}
            >
              <img src={l.logo} alt={l.name} className="w-5 h-5 object-contain flex-shrink-0" onError={e => e.target.style.display='none'} />
              <div className="min-w-0">
                <div className="font-medium text-xs truncate">{l.name}</div>
                <div className="text-xs text-slate-600">{l.country}</div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
