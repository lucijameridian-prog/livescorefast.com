import LegalLayout from '../components/LegalLayout'

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" updated="27 June 2026">
      <h2>Acceptance of terms</h2>
      <p>By accessing livescorefast.com (the "Site") you agree to these Terms & Conditions. If you do not agree, please do not use the Site.</p>

      <h2>Use of the Site</h2>
      <p>LiveScoreFast provides sports scores, fixtures, standings, predictions and news summaries for informational purposes only. You agree to use the Site lawfully and not to disrupt or misuse it.</p>

      <h2>Accuracy of information</h2>
      <p>Scores, statistics and predictions are provided by third-party data sources and automated models. We make no guarantee that information is accurate, complete or up to date. <strong>Predictions are statistical estimates and are not betting advice.</strong></p>

      <h2>No warranty</h2>
      <p>The Site is provided "as is" without warranties of any kind. We are not liable for any loss arising from use of, or reliance on, information presented on the Site.</p>

      <h2>Third-party content & links</h2>
      <p>The Site may display content, logos or promotional material from third parties. Such content belongs to its respective owners and does not imply endorsement.</p>

      <h2>Changes</h2>
      <p>We may update these terms at any time. Continued use of the Site after changes constitutes acceptance of the updated terms.</p>

      <h2>Contact</h2>
      <p>Questions? Email <a href="mailto:contact@livescorefast.com">contact@livescorefast.com</a>.</p>

      <p style={{ fontSize: 12, color: '#55617a', marginTop: 16 }}>This document is a general template and should be reviewed by a qualified professional before relying on it.</p>
    </LegalLayout>
  )
}
