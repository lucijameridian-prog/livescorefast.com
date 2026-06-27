import { useEffect, useState } from 'react'
import axios from 'axios'

const FEEDS = [
  { label: 'All Sports',  url: 'https://www.theguardian.com/sport/rss' },
  { label: 'Football',    url: 'https://www.theguardian.com/football/rss' },
  { label: 'Basketball',  url: 'https://www.theguardian.com/sport/basketball/rss' },
  { label: 'Tennis',      url: 'https://www.theguardian.com/sport/tennis/rss' },
  { label: 'Formula 1',   url: 'https://www.theguardian.com/sport/formulaone/rss' },
]

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function NewsPage() {
  const [feed, setFeed] = useState(FEEDS[0])
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}&count=30`)
      .then(res => setArticles(res.data.items || []))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false))
  }, [feed])

  return (
    <div>
      <h1 className="text-xl font-bold text-white mb-4">📰 News</h1>

      <div className="flex gap-1 mb-6 bg-dark-800 rounded-lg p-1 border border-dark-600 w-fit">
        {FEEDS.map(f => (
          <button key={f.label} onClick={() => setFeed(f)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
              ${feed.label === f.label ? 'bg-accent text-white' : 'text-slate-400 hover:text-white'}`}>
            {f.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-dark-800 border border-dark-600 rounded-xl animate-pulse">
              <div className="h-44 bg-dark-600 rounded-t-xl" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-dark-600 rounded w-3/4" />
                <div className="h-3 bg-dark-600 rounded w-full" />
                <div className="h-3 bg-dark-600 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && articles.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <div className="text-4xl mb-3">📭</div>
          <p>No news available right now.</p>
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.filter(a => a.title).map((article, i) => (
            <a key={i} href={article.link} target="_blank" rel="noopener noreferrer"
              className="bg-dark-800 border border-dark-600 rounded-xl overflow-hidden hover:border-slate-500 transition-colors group flex flex-col">
              {article.enclosure?.link && (
                <div className="h-44 overflow-hidden bg-dark-700">
                  <img src={article.enclosure.link} alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={e => e.target.parentElement.style.display = 'none'} />
                </div>
              )}
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-sm font-semibold text-white leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-3">
                  {article.title}
                </h2>
                {article.description && (
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3 flex-1"
                    dangerouslySetInnerHTML={{__html: article.description.replace(/<[^>]*>/g,'')}} />
                )}
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-slate-600">{timeAgo(article.pubDate)}</span>
                  <span className="text-xs text-accent group-hover:underline">Read more →</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      <p className="text-xs text-slate-700 mt-6 text-center">News sourced from The Guardian</p>
    </div>
  )
}
