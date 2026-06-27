import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', marginTop: 10, padding: '22px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--mut)', fontSize: 12.5, maxWidth: 1760, marginLeft: 'auto', marginRight: 'auto', flexWrap: 'wrap', gap: 12 }}>
      <span>© 2026 livescorefast · Live scores for 14+ sports</span>
      <span style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
        <Link to="/about" style={{ color: 'var(--mut)', textDecoration: 'none' }}>About</Link>
        <Link to="/privacy" style={{ color: 'var(--mut)', textDecoration: 'none' }}>Privacy</Link>
        <Link to="/terms" style={{ color: 'var(--mut)', textDecoration: 'none' }}>Terms</Link>
        <Link to="/contact" style={{ color: 'var(--mut)', textDecoration: 'none' }}>Contact</Link>
      </span>
    </footer>
  )
}
