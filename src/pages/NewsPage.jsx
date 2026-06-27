import { useEffect, useState } from 'react'
import axios from 'axios'

const FILTERS = [
  { label: 'Balkan', region: 'balkan' },
  { label: 'All Sports', region: 'world', cat: 'All Sports' },
  { label: 'Football', region: 'world', cat: 'Football' },
  { label: 'Basketball', region: 'world', cat: 'Basketball' },
  { label: 'Tennis', region: 'world', cat: 'Tennis' },
  { label: 'Formula 1', region: 'world', cat: 'Formula 1' },
]

const GRADS = ['linear-gradient(135deg,#7a0a06,#E2231A 70%,#ff5a3c)', 'linear-gradient(135deg,#13002e,#6c1fb8)', 'linear-gradient(135deg,#04140a,#1FA84A)', 'linear-gradient(135deg,#180a02,#f08a1f)', 'linear-gradient(135deg,#0a0a14,#3a4a8a)', 'linear-gradient(135deg,#2a0c0a,#a30d08)', 'linear-gradient(135deg,#0a1f1a,#16a085)']

function timeAgo(dateStr) {
  if (!dateStr) return ''
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function NewsPage() {
  const [filter, setFilter] = useState(FILTERS[0])
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [active, setActive] = useState(null) // article open in modal

  useEffect(() => {
    setLoading(true)
    setError(false)
    const params = filter.region === 'world' ? `region=world&cat=${encodeURIComponent(filter.cat)}` : 'region=balkan'
    axios.get(`/api/news?${params}`)
      .then(res => setArticles(res.data.items || []))
      .catch(() => { setArticles([]); setError(true) })
      .finally(() => setLoading(false))
  }, [filter])

  const feat = articles[0]
  const rest = articles.slice(1)

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <h1 className="font-cond" style={{ fontWeight: 800, fontSize: 30, color: '#fff', textTransform: 'uppercase', margin: 0 }}>Sports News</h1>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {FILTERS.map(f => {
            const on = filter.label === f.label
            return (
              <button key={f.label} onClick={() => setFilter(f)} className="font-cond"
                style={{ background: on ? 'var(--accent)' : 'rgba(255,255,255,.05)', border: `1px solid ${on ? 'var(--accent)' : 'var(--line)'}`, color: on ? '#fff' : '#b9c4d4', fontWeight: 700, fontSize: 13, letterSpacing: '.5px', padding: '7px 15px', borderRadius: 6, cursor: 'pointer', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{f.label}</button>
            )
          })}
        </div>
      </div>

      <p style={{ fontSize: 12.5, color: 'var(--mut)', margin: '0 0 16px' }}>
        Summaries from top Balkan &amp; world sports portals — read here, no leaving the site.
      </p>

      {loading && <div className="panel" style={{ padding: 60, textAlign: 'center', color: 'var(--mut)' }}>Loading news…</div>}
      {!loading && error && <div className="panel" style={{ padding: 40, textAlign: 'center', color: 'var(--mut)' }}>News service unavailable right now. Try again shortly.</div>}
      {!loading && !error && articles.length === 0 && <div className="panel" style={{ padding: 60, textAlign: 'center', color: 'var(--mut)' }}>No news available right now.</div>}

      {/* FEATURED */}
      {!loading && feat && (
        <button onClick={() => setActive(feat)} className="card-hover"
          style={{ width: '100%', textAlign: 'left', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 0, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line)', marginBottom: 18, cursor: 'pointer', background: 'transparent', padding: 0 }}>
          <div style={{ minHeight: 300, background: feat.image ? `url(${feat.image}) center/cover` : GRADS[0], position: 'relative', display: 'flex', alignItems: 'flex-end', padding: 22 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 40%,rgba(0,0,0,.55))' }} />
            <span className="font-cond" style={{ position: 'relative', background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: 12, letterSpacing: '1px', padding: '4px 12px', borderRadius: 5, textTransform: 'uppercase' }}>{feat.source}</span>
          </div>
          <div style={{ background: 'var(--panel)', padding: '28px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11.5, color: 'var(--mut)', marginBottom: 12 }}><span style={{ color: 'var(--gold)', fontWeight: 700 }}>{feat.source}</span><span>·</span><span>{timeAgo(feat.date)}</span></div>
            <h2 className="font-cond" style={{ fontWeight: 800, fontSize: 28, lineHeight: 1.04, color: '#fff', margin: '0 0 12px' }}>{feat.title}</h2>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: '#aeb9c9', margin: 0 }}>{feat.summary}</p>
            <span className="font-cond" style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--gold)', fontWeight: 700, fontSize: 14, letterSpacing: '.5px' }}>READ SUMMARY →</span>
          </div>
        </button>
      )}

      {/* GRID */}
      {!loading && rest.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
          {rest.map((a, i) => (
            <button key={i} onClick={() => setActive(a)} className="card-hover"
              style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--panel)', cursor: 'pointer', padding: 0 }}>
              <div style={{ height: 150, background: a.image ? `url(${a.image}) center/cover` : GRADS[(i + 1) % GRADS.length], position: 'relative', display: 'flex', alignItems: 'flex-start', padding: 12 }}>
                <span className="font-cond" style={{ background: 'rgba(0,0,0,.45)', color: '#fff', fontWeight: 700, fontSize: 11, letterSpacing: '.5px', padding: '3px 9px', borderRadius: 4, textTransform: 'uppercase' }}>{a.source}</span>
              </div>
              <div style={{ padding: '15px 16px 17px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 className="font-cond" style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.12, color: '#fff', margin: '0 0 9px' }}>{a.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.5, color: '#9aa6b8', margin: '0 0 14px', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{a.summary}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--mut)' }}><span style={{ color: 'var(--gold)', fontWeight: 700 }}>{a.source}</span><span>·</span><span>{timeAgo(a.date)}</span></div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* IN-APP SUMMARY MODAL (no outgoing link) */}
      {active && (
        <div onClick={() => setActive(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)', zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 18px', overflowY: 'auto' }}>
          <div onClick={e => e.stopPropagation()} className="panel" style={{ maxWidth: 680, width: '100%', borderRadius: 12 }}>
            {active.image && <div style={{ height: 260, background: `url(${active.image}) center/cover` }} />}
            <div style={{ padding: '22px 26px 26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--mut)', marginBottom: 12 }}>
                <span className="font-cond" style={{ background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: 11, letterSpacing: '.5px', padding: '3px 10px', borderRadius: 4, textTransform: 'uppercase' }}>{active.source}</span>
                <span>{timeAgo(active.date)}</span>
                <div style={{ flex: 1 }} />
                <button onClick={() => setActive(null)} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid var(--line)', color: '#cfd8e4', width: 30, height: 30, borderRadius: 6, cursor: 'pointer', fontSize: 16, lineHeight: 1 }}>✕</button>
              </div>
              <h2 className="font-cond" style={{ fontWeight: 800, fontSize: 28, lineHeight: 1.05, color: '#fff', margin: '0 0 14px' }}>{active.title}</h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#c4cdda', margin: 0 }}>{active.summary}</p>
              <p style={{ fontSize: 11.5, color: '#55617a', marginTop: 18 }}>Summary based on {active.source} reporting.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
