// Vercel serverless function — aggregates sports news from Balkan + world portals,
// strips HTML and returns clean in-app SUMMARIES (no outgoing links).

const BALKAN_FEEDS = [
  { source: 'Index Sport', url: 'https://www.index.hr/rss/sport' },
  { source: 'Nova Sport', url: 'https://nova.rs/sport/feed/' },
  { source: 'Telegraf Sport', url: 'https://www.telegraf.rs/rss/sport' },
  { source: 'Telegraf', url: 'https://www.telegraf.rs/rss' },
  { source: '24sata Sport', url: 'https://www.24sata.hr/feeds/sport.xml' },
  { source: 'Mondo Sport', url: 'https://mondo.rs/rss' },
  { source: 'Sportske novosti', url: 'https://sportske.jutarnji.hr/feed' },
]

const WORLD_FEEDS = {
  'All Sports': 'https://www.theguardian.com/sport/rss',
  'Football': 'https://www.theguardian.com/football/rss',
  'Basketball': 'https://www.theguardian.com/sport/basketball/rss',
  'Tennis': 'https://www.theguardian.com/sport/tennis/rss',
  'Formula 1': 'https://www.theguardian.com/sport/formulaone/rss',
}

const decode = (s = '') => s
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;|&#x27;/g, "'")
  .replace(/&nbsp;/g, ' ')
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
  .replace(/&amp;/g, '&')

const stripTags = (s = '') => decode(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

function summarize(text, max = 320) {
  const t = stripTags(text)
  if (t.length <= max) return t
  const cut = t.slice(0, max)
  const lastStop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '))
  return (lastStop > 120 ? cut.slice(0, lastStop + 1) : cut.slice(0, cut.lastIndexOf(' '))) + ' …'
}

function tag(block, name) {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, 'i'))
  return m ? m[1] : ''
}

function findImage(block) {
  let m = block.match(/<enclosure[^>]+url=["']([^"']+)["']/i)
    || block.match(/<media:content[^>]+url=["']([^"']+)["']/i)
    || block.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i)
  if (m) return m[1]
  const html = tag(block, 'content:encoded') || tag(block, 'description')
  const im = decode(html).match(/<img[^>]+src=["']([^"']+)["']/i)
  return im ? im[1] : null
}

function parseFeed(xml, source) {
  const items = []
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || []
  for (const b of blocks) {
    const title = stripTags(tag(b, 'title'))
    const body = tag(b, 'content:encoded') || tag(b, 'description')
    const summary = summarize(body)
    if (!title || summary.length < 30) continue
    const pub = stripTags(tag(b, 'pubDate') || tag(b, 'dc:date'))
    items.push({ source, title, summary, image: findImage(b), date: pub ? new Date(pub).toISOString() : null })
  }
  return items
}

async function fetchFeed(feed) {
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 8000)
    const res = await fetch(feed.url, { signal: ctrl.signal, headers: { 'User-Agent': 'Mozilla/5.0 LiveScoreFast/1.0', Accept: 'application/rss+xml, application/xml, text/xml, */*' } })
    clearTimeout(t)
    if (!res.ok) return []
    const xml = await res.text()
    if (!/<item[\s>]/i.test(xml)) return []
    return parseFeed(xml, feed.source).slice(0, 8)
  } catch {
    return []
  }
}

export default async function handler(req, res) {
  const region = (req.query.region || 'balkan').toString()
  const cat = (req.query.cat || 'All Sports').toString()

  let feeds
  if (region === 'world') {
    feeds = [{ source: 'The Guardian', url: WORLD_FEEDS[cat] || WORLD_FEEDS['All Sports'] }]
  } else {
    feeds = BALKAN_FEEDS
  }

  const results = await Promise.all(feeds.map(fetchFeed))
  let items = results.flat()

  // dedupe by title, drop empties
  const seen = new Set()
  items = items.filter(i => { const k = i.title.toLowerCase().slice(0, 60); if (seen.has(k)) return false; seen.add(k); return true })

  // sort newest first
  items.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
  items = items.slice(0, region === 'world' ? 30 : 40)

  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1800')
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.status(200).json({ region, cat, count: items.length, items })
}
