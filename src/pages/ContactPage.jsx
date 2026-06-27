import LegalLayout from '../components/LegalLayout'

export default function ContactPage() {
  return (
    <LegalLayout title="Contact">
      <h2>Get in touch</h2>
      <p>We'd love to hear from you — feedback, a data issue, a partnership or a press enquiry.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 6 }}>
        <a href="mailto:contact@livescorefast.com" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'rgba(255,255,255,.04)', border: '1px solid var(--line)', borderRadius: 10, textDecoration: 'none' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
          <span>
            <span style={{ display: 'block', fontSize: 11, color: 'var(--mut)', textTransform: 'uppercase', letterSpacing: '.5px' }}>Email</span>
            <span style={{ fontSize: 15, color: '#dbe3ee', fontWeight: 600 }}>contact@livescorefast.com</span>
          </span>
        </a>
      </div>

      <h2 style={{ marginTop: 22 }}>Response time</h2>
      <p>We typically reply within 2–3 business days. For data corrections, please include the match, team or page link so we can look into it quickly.</p>
    </LegalLayout>
  )
}
