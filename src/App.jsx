import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
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

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-dark-900">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<LivePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/football" element={<FootballPage />} />
            <Route path="/basketball" element={<BasketballPage />} />
            <Route path="/hockey" element={<HockeyPage />} />
            <Route path="/baseball" element={<GenericSportPage sport="baseball" label="Baseball" icon="⚾" />} />
            <Route path="/handball" element={<GenericSportPage sport="handball" label="Handball" icon="🤾" />} />
            <Route path="/rugby" element={<GenericSportPage sport="rugby" label="Rugby" icon="🏉" />} />
            <Route path="/volleyball" element={<GenericSportPage sport="volleyball" label="Volleyball" icon="🏐" />} />
            <Route path="/nfl" element={<GenericSportPage sport="nfl" label="NFL" icon="🏈" />} />
            <Route path="/nba" element={<GenericSportPage sport="nba" label="NBA" icon="🏀" />} />
            <Route path="/mma" element={<GenericSportPage sport="mma" label="MMA" icon="🥊" />} />
            <Route path="/afl" element={<GenericSportPage sport="afl" label="AFL" icon="🏉" />} />
            <Route path="/formula1" element={<GenericSportPage sport="formula1" label="Formula 1" icon="🏎️" />} />
            <Route path="/tennis" element={<ComingSoonPage sport="Tennis" icon="🎾" />} />
            <Route path="/match/:id" element={<MatchDetailPage />} />
            <Route path="/team/:id" element={<TeamPage />} />
            <Route path="/player/:id" element={<PlayerPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
