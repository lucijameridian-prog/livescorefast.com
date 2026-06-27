import { useEffect, useState } from 'react'
import axios from 'axios'

const FEEDS = [
  { label: 'All Sports', url: 'https://www.theguardian.com/sport/rss' },
  { label: 'Football', url: 'https://www.theguardian.com/football/rss' },
  { label: 'Basketball', url: 'https://www.theguardian.com/sport/basketball/rss' },
  { label: 'Tennis', url: 'https://www.theguardian.com/sport/tennis/rss' },
  { label: 'Formula 1', url: 'https://www.theguardian.com/sport/formulaone/rss' },
]

const GRADS = ['linear-gradient(135deg,#7a0a06,#E2231A 70%,#ff5a3c)', 'linear-gradient(135deg,#13002e,#6c1fb8)', 'linear-gradient(135deg,#04140a,#1FA84A)', 'linear-gradient(135deg,#180a02,#f08a1f)', 'linear-gradient(135deg,#0a0a14,#3a4a8a)', 'linear-gradient(135deg,#2a0c0a,#a30d08)', 'linear-gradient(135deg,#0a1f1a,#16a085)']

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}
const clean = (s = '') => s.replace(/<[^>]*>/g, '')

export default function NewsPage() {
  const [feed, setFeed] = useState(FEEDS[0])
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}&count=30`)
      .then(res => setArticles((res.data.items || []).filter(a => a.title)))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false))
  }, [feed])

  const feat = articles[0]
  const rest = articles.slice(1)

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <h1 className="font-cond" style={{ fontWeight: 800, fontSize: 30, color: '#fff', textTransform: 'uppercase', margin: 0 }}>Sports News</h1>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {FEEDS.map(f => {
            const active = feed.label === f.label
            return (
              <button key={f.label} onClick={() => setFeed(f)} className="font-cond"
                style={{ background: active ? 'var(--accent)' : 'rgba(255,255,255,.05)', border: `1px solid ${active ? 'var(--accent)' : 'var(--line)'}`, color: active ? '#fff' : '#b9c4d4', fontWeight: 700, fontSize: 13, letterSpacing: '.5px', padding: '7px 15px', borderRadius: 6, cursor: 'pointer', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{f.label}</button>
            )
          })}
        </div>
      </div>

      {loading && <div className="panel" style={{ padding: 60, textAlign: 'center', color: 'var(--mut)' }}>Loading news…</div>}
      {!loading && articles.length === 0 && <div className="panel" style={{ padding: 60, textAlign: 'center', color: 'var(--mut)' }}>No news available right now.</div>}

      {/* FEATURED */}
      {feat && (
        <a href={feat.link} target="_blank" rel="noopener noreferrer" className="card-hover"
          style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 0, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line)', marginBottom: 18, textDecoration: 'none' }}>
          <div style={{ minHeight: 320, background: feat.enclosure?.link ? `url(${feat.enclosure.link}) center/cover` : GRADS[0], position: 'relative', display: 'flex', alignItems: 'flex-end', padding: 22 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 40%,rgba(0,0,0,.55))' }} />
            <span className="font-cond" style={{ position: 'relative', background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: 12, letterSpacing: '1px', padding: '4px 12px', borderRadius: 5, textTransform: 'uppercase' }}>{feed.label}</span>
          </div>
          <div style={{ background: 'var(--panel)', padding: '28px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11.5, color: 'var(--mut)', marginBottom: 12 }}><span style={{ color: 'var(--gold)', fontWeight: 700 }}>The Guardian</span><span>·</span><span>{timeAgo(feat.pubDate)}</span></div>
            <h2 className="font-cond" style={{ fontWeight: 800, fontSize: 30, lineHeight: 1.02, color: '#fff', margin: '0 0 12px' }}>{feat.title}</h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.55, color: '#aeb9c9', margin: 0 }}>{clean(feat.description).slice(0, 180)}</p>
            <span className="font-cond" style={{ marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--gold)', fontWeight: 700, fontSize: 14, letterSpacing: '.5px' }}>READ FULL STORY →</span>
          </div>
        </a>
      )}

      {/* GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
        {rest.map((a, i) => (
          <a key={i} href={a.link} target="_blank" rel="noopener noreferrer" className="card-hover"
            style={{ display: 'flex', flexDirection: 'column', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--panel)', textDecoration: 'none' }}>
            <div style={{ height: 158, background: a.enclosure?.link ? `url(${a.enclosure.link}) center/cover` : GRADS[(i + 1) % GRADS.length], position: 'relative', display: 'flex', alignItems: 'flex-start', padding: 12 }}>
              <span className="font-cond" style={{ background: 'rgba(0,0,0,.4)', color: '#fff', fontWeight: 700, fontSize: 11, letterSpacing: '.5px', padding: '3px 9px', borderRadius: 4, textTransform: 'uppercase' }}>{feed.label}</span>
            </div>
            <div style={{ padding: '15px 16px 17px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 className="font-cond" style={{ fontWeight: 700, fontSize: 19, lineHeight: 1.08, color: '#fff', margin: '0 0 9px' }}>{a.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.5, color: '#9aa6b8', margin: '0 0 14px', flex: 1 }}>{clean(a.description).slice(0, 110)}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--mut)' }}><span style={{ color: 'var(--gold)', fontWeight: 700 }}>The Guardian</span><span>·</span><span>{timeAgo(a.pubDate)}</span></div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
