const LEAGUES = {
  football: [
    { id: '4607', name: 'FIFA World Cup',    country: 'World',    logo: 'https://www.thesportsdb.com/images/media/league/badge/qtygyp1575024595.png' },
    { id: '4328', name: 'Premier League',    country: 'England',  logo: 'https://www.thesportsdb.com/images/media/league/badge/i6o0kh1549879062.png' },
    { id: '4335', name: 'La Liga',           country: 'Spain',    logo: 'https://www.thesportsdb.com/images/media/league/badge/7onmyv1534768460.png' },
    { id: '4332', name: 'Serie A',           country: 'Italy',    logo: 'https://www.thesportsdb.com/images/media/league/badge/d7lhlw1549878326.png' },
    { id: '4331', name: 'Bundesliga',        country: 'Germany',  logo: 'https://www.thesportsdb.com/images/media/league/badge/0j55yv1534764799.png' },
    { id: '4334', name: 'Ligue 1',           country: 'France',   logo: 'https://www.thesportsdb.com/images/media/league/badge/ocy5le1566496999.png' },
    { id: '4480', name: 'Champions League',  country: 'Europe',   logo: 'https://www.thesportsdb.com/images/media/league/badge/qlyaeq1549879062.png' },
    { id: '4346', name: 'MLS',               country: 'USA',      logo: 'https://www.thesportsdb.com/images/media/league/badge/gmfafs1548987512.png' },
    { id: '4337', name: 'Eredivisie',        country: 'Netherlands', logo: 'https://www.thesportsdb.com/images/media/league/badge/ixqjry1534764799.png' },
    { id: '4344', name: 'Liga Portugal',     country: 'Portugal', logo: 'https://www.thesportsdb.com/images/media/league/badge/up7y1h1534768460.png' },
    { id: '4339', name: 'Super Lig',         country: 'Turkey',   logo: 'https://www.thesportsdb.com/images/media/league/badge/lr7p3j1534768460.png' },
  ],
  basketball: [
    { id: '4387', name: 'NBA',               country: 'USA',        logo: 'https://www.thesportsdb.com/images/media/league/badge/ajc2ok1549880326.png' },
    { id: '4391', name: 'Euroleague',        country: 'Europe',     logo: 'https://www.thesportsdb.com/images/media/league/badge/2a6cv81549880729.png' },
    { id: '4389', name: 'NCAA Basketball',   country: 'USA',        logo: 'https://www.thesportsdb.com/images/media/league/badge/yd5jui1549880326.png' },
    { id: '4430', name: 'FIBA World Cup',    country: 'World',      logo: 'https://www.thesportsdb.com/images/media/league/badge/fiba.png' },
    { id: '4422', name: 'NBL Australia',     country: 'Australia',  logo: 'https://www.thesportsdb.com/images/media/league/badge/nbl.png' },
  ],
  hockey: [
    { id: '4380', name: 'NHL',               country: 'USA/Canada', logo: 'https://www.thesportsdb.com/images/media/league/badge/uvpkif1547214677.png' },
    { id: '4382', name: 'KHL',               country: 'Russia',     logo: 'https://www.thesportsdb.com/images/media/league/badge/lc6qxn1549880326.png' },
    { id: '4383', name: 'SHL',               country: 'Sweden',     logo: 'https://www.thesportsdb.com/images/media/league/badge/shl.png' },
    { id: '4384', name: 'Liiga',             country: 'Finland',    logo: 'https://www.thesportsdb.com/images/media/league/badge/liiga.png' },
    { id: '4385', name: 'DEL',               country: 'Germany',    logo: 'https://www.thesportsdb.com/images/media/league/badge/del.png' },
  ],
  baseball: [
    { id: '4424', name: 'MLB',               country: 'USA',        logo: 'https://www.thesportsdb.com/images/media/league/badge/cxfkfk1549880733.png' },
    { id: '4425', name: 'NPB',               country: 'Japan',      logo: 'https://www.thesportsdb.com/images/media/league/badge/npb.png' },
    { id: '4426', name: 'KBO',               country: 'South Korea',logo: 'https://www.thesportsdb.com/images/media/league/badge/kbo.png' },
  ],
  rugby: [
    { id: '4355', name: 'Rugby World Cup',   country: 'World',      logo: 'https://www.thesportsdb.com/images/media/league/badge/rsnyyq1548987938.png' },
    { id: '4356', name: 'Six Nations',       country: 'Europe',     logo: 'https://www.thesportsdb.com/images/media/league/badge/fxwimq1548987938.png' },
    { id: '4357', name: 'Super Rugby',       country: 'Oceania',    logo: 'https://www.thesportsdb.com/images/media/league/badge/tvqpwq1548987938.png' },
    { id: '4358', name: 'Premiership',       country: 'England',    logo: 'https://www.thesportsdb.com/images/media/league/badge/premiership.png' },
    { id: '4359', name: 'Top 14',            country: 'France',     logo: 'https://www.thesportsdb.com/images/media/league/badge/top14.png' },
  ],
  nfl: [
    { id: '4391', name: 'NFL',               country: 'USA',        logo: 'https://www.thesportsdb.com/images/media/league/badge/ntpkrq1547214677.png' },
    { id: '4392', name: 'NCAA Football',     country: 'USA',        logo: 'https://www.thesportsdb.com/images/media/league/badge/ncaafb.png' },
  ],
  nba: [
    { id: '4387', name: 'NBA',               country: 'USA',        logo: 'https://www.thesportsdb.com/images/media/league/badge/ajc2ok1549880326.png' },
    { id: '4388', name: 'NBA G League',      country: 'USA',        logo: 'https://www.thesportsdb.com/images/media/league/badge/nbagl.png' },
  ],
  volleyball: [
    { id: '4414', name: 'Volleyball Nations League', country: 'World',  logo: 'https://www.thesportsdb.com/images/media/league/badge/vnl.png' },
    { id: '4415', name: 'CEV Champions League',      country: 'Europe', logo: 'https://www.thesportsdb.com/images/media/league/badge/cev.png' },
    { id: '4416', name: 'Serie A1',                  country: 'Italy',  logo: 'https://www.thesportsdb.com/images/media/league/badge/seriea1.png' },
  ],
  handball: [
    { id: '4411', name: 'EHF Champions League', country: 'Europe',  logo: 'https://www.thesportsdb.com/images/media/league/badge/ehf.png' },
    { id: '4412', name: 'Handball World Cup',   country: 'World',   logo: 'https://www.thesportsdb.com/images/media/league/badge/hwc.png' },
    { id: '4413', name: 'Bundesliga',           country: 'Germany', logo: 'https://www.thesportsdb.com/images/media/league/badge/hbl.png' },
  ],
  mma: [
    { id: '4443', name: 'UFC',               country: 'World',      logo: 'https://www.thesportsdb.com/images/media/league/badge/ufc.png' },
    { id: '4444', name: 'Bellator',          country: 'World',      logo: 'https://www.thesportsdb.com/images/media/league/badge/bellator.png' },
    { id: '4445', name: 'ONE Championship',  country: 'Asia',       logo: 'https://www.thesportsdb.com/images/media/league/badge/one.png' },
  ],
  afl: [
    { id: '4418', name: 'AFL',               country: 'Australia',  logo: 'https://www.thesportsdb.com/images/media/league/badge/afl.png' },
    { id: '4419', name: 'AFLW',              country: 'Australia',  logo: 'https://www.thesportsdb.com/images/media/league/badge/aflw.png' },
  ],
  formula1: [
    { id: '4370', name: 'Formula 1',         country: 'World',      logo: 'https://www.thesportsdb.com/images/media/league/badge/f1.png' },
    { id: '4371', name: 'Formula 2',         country: 'World',      logo: 'https://www.thesportsdb.com/images/media/league/badge/f2.png' },
    { id: '4372', name: 'Formula E',         country: 'World',      logo: 'https://www.thesportsdb.com/images/media/league/badge/fe.png' },
  ],
}

import { leagueCode, teamColor } from '../utils/team'

const TITLES = {
  football: 'Football Leagues', basketball: 'Basketball Leagues', hockey: 'Hockey Leagues',
  baseball: 'Baseball Leagues', rugby: 'Rugby Leagues', nfl: 'NFL', nba: 'NBA',
  volleyball: 'Volleyball Leagues', handball: 'Handball Leagues', mma: 'MMA', afl: 'AFL', formula1: 'Motorsport',
}

export default function SportSidebar({ sport, selected, onSelect }) {
  const leagues = LEAGUES[sport] || []
  if (!leagues.length) return null

  return (
    <div className="panel">
      <div className="panel-head">{TITLES[sport] || 'Leagues'}</div>
      {leagues.map(l => {
        const active = selected === l.id
        return (
          <div key={l.id} onClick={() => onSelect(active ? null : l.id)} className="row-hover"
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: '1px solid var(--line)', cursor: 'pointer', fontSize: 13, background: active ? 'rgba(226,35,26,.10)' : 'transparent', boxShadow: active ? 'inset 3px 0 0 var(--accent)' : 'none' }}>
            <span style={{ width: 20, height: 14, borderRadius: 2, background: teamColor(l.name), flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,.9)' }}>{leagueCode(l.name)}</span>
            <span style={{ flex: 1, color: '#cfd8e4', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.name}</span>
            <span style={{ color: 'var(--mut)', fontSize: 11.5 }}>{l.country}</span>
          </div>
        )
      })}
    </div>
  )
}
