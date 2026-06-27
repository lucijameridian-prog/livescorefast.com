import LegalLayout from '../components/LegalLayout'

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="27 June 2026">
      <h2>Overview</h2>
      <p>LiveScoreFast ("we", "us") operates the website livescorefast.com (the "Site"), which provides live sports scores, fixtures, standings and related information. This policy explains what data we collect and how we use it.</p>

      <h2>Information we collect</h2>
      <p>We do not require you to create an account and we do not ask for personal information to use the Site. We collect limited, non-identifying usage data automatically:</p>
      <ul>
        <li><strong>Analytics data</strong> via Google Analytics (pages viewed, approximate location, device/browser type, time on site).</li>
        <li><strong>Cookies</strong> used by Google Analytics to measure usage. You can decline these via the cookie banner.</li>
      </ul>

      <h2>How we use data</h2>
      <p>Usage data is used only to understand how the Site is used and to improve content and performance. We do not sell your data.</p>

      <h2>Third-party services</h2>
      <p>Sports data is provided by TheSportsDB, and news summaries are aggregated from public sports sources. Analytics is provided by Google. These services may process data under their own privacy policies.</p>

      <h2>Cookies</h2>
      <p>On your first visit you can accept or decline non-essential (analytics) cookies. If you decline, analytics tracking is disabled. You can clear cookies at any time in your browser settings.</p>

      <h2>Your choices</h2>
      <p>You may decline analytics cookies, or use your browser's "Do Not Track" / private mode. For any privacy request, contact us using the details below.</p>

      <h2>Contact</h2>
      <p>Questions about this policy? Email <a href="mailto:contact@livescorefast.com">contact@livescorefast.com</a>.</p>

      <p style={{ fontSize: 12, color: '#55617a', marginTop: 16 }}>This document is a general template and should be reviewed by a qualified professional before relying on it.</p>
    </LegalLayout>
  )
}
