import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LivePage from './pages/LivePage'
import FootballPage from './pages/FootballPage'
import BasketballPage from './pages/BasketballPage'
import HockeyPage from './pages/HockeyPage'
import GenericSportPage from './pages/GenericSportPage'
import ComingSoonPage from './pages/ComingSoonPage'
import MatchDetailPage from './pages/MatchDetailPage'
import NewsPage from './pages/NewsPage'
import TeamPage from './pages/TeamPage'
import PlayerPage from './pages/PlayerPage'
import PredictionsPage from './pages/PredictionsPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import CookieConsent from './components/CookieConsent'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--txt)', overflowX: 'hidden' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<LivePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/predictions" element={<PredictionsPage />} />
          <Route path="/football" element={<FootballPage />} />
          <Route path="/basketball" element={<BasketballPage />} />
          <Route path="/hockey" element={<HockeyPage />} />
          <Route path="/baseball" element={<GenericSportPage sport="baseball" label="Baseball" abbr="BB" iconBg="#c0392b" />} />
          <Route path="/handball" element={<GenericSportPage sport="handball" label="Handball" abbr="HB" iconBg="#2980b9" />} />
          <Route path="/rugby" element={<GenericSportPage sport="rugby" label="Rugby" abbr="RG" iconBg="#16a085" />} />
          <Route path="/volleyball" element={<GenericSportPage sport="volleyball" label="Volleyball" abbr="VB" iconBg="#e67e22" />} />
          <Route path="/nfl" element={<GenericSportPage sport="nfl" label="NFL" abbr="AF" iconBg="#8e44ad" />} />
          <Route path="/nba" element={<GenericSportPage sport="nba" label="NBA" abbr="BK" iconBg="#f08a1f" />} />
          <Route path="/mma" element={<GenericSportPage sport="mma" label="MMA" abbr="MMA" iconBg="#c0392b" />} />
          <Route path="/afl" element={<GenericSportPage sport="afl" label="AFL" abbr="AFL" iconBg="#16a085" />} />
          <Route path="/formula1" element={<GenericSportPage sport="formula1" label="Formula 1" abbr="F1" iconBg="#e2231a" />} />
          <Route path="/tennis" element={<ComingSoonPage />} />
          <Route path="/match/:id" element={<MatchDetailPage />} />
          <Route path="/team/:id" element={<TeamPage />} />
          <Route path="/player/:id" element={<PlayerPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
        <CookieConsent />
      </div>
    </BrowserRouter>
  )
}
