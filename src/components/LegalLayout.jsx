export default function LegalLayout({ title, updated, children }) {
  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '24px 18px 44px' }}>
      <h1 className="font-cond" style={{ fontWeight: 800, fontSize: 'clamp(24px,6vw,32px)', color: '#fff', textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 4px' }}>{title}</h1>
      {updated && <p style={{ fontSize: 12, color: 'var(--mut)', margin: '0 0 16px' }}>Last updated: {updated}</p>}
      <div className="panel legal" style={{ padding: '24px 26px' }}>
        {children}
      </div>
    </div>
  )
}
