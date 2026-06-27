import LegalLayout from '../components/LegalLayout'

export default function AboutPage() {
  return (
    <LegalLayout title="About LiveScoreFast">
      <h2>What we do</h2>
      <p>LiveScoreFast is a free live-scores platform covering 14+ sports — football, basketball, ice hockey, tennis and more. We bring real-time scores, fixtures, league standings, team and player profiles, match predictions and sports news together in one fast, clean interface.</p>

      <h2>Features</h2>
      <ul>
        <li>Live scores and results across multiple sports</li>
        <li>League tables and top scorers</li>
        <li>Match detail pages with timelines, stats and lineups</li>
        <li>Statistical match predictions based on recent form</li>
        <li>Sports news summaries from Balkan and world sources</li>
      </ul>

      <h2>Our data</h2>
      <p>Live data is sourced from TheSportsDB. News is aggregated and summarized from public sports media. We continually work to improve coverage and accuracy.</p>

      <h2>Contact</h2>
      <p>Want to get in touch? Email <a href="mailto:contact@livescorefast.com">contact@livescorefast.com</a>.</p>
    </LegalLayout>
  )
}
