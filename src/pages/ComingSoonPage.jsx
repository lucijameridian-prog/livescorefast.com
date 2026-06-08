export default function ComingSoonPage({ sport, icon }) {
  return (
    <div className="text-center py-24 text-slate-500">
      <div className="text-6xl mb-4">{icon}</div>
      <h2 className="text-xl font-semibold text-slate-400 mb-2">{sport} — Coming Soon</h2>
      <p className="text-sm">We're working on adding {sport.toLowerCase()} scores.</p>
    </div>
  )
}
