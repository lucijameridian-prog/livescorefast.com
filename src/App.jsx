import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LivePage from './pages/LivePage'
import FootballPage from './pages/FootballPage'
import BasketballPage from './pages/BasketballPage'
import HockeyPage from './pages/HockeyPage'
import ComingSoonPage from './pages/ComingSoonPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-dark-900">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<LivePage />} />
            <Route path="/football" element={<FootballPage />} />
            <Route path="/basketball" element={<BasketballPage />} />
            <Route path="/hockey" element={<HockeyPage />} />
            <Route path="/tennis" element={<ComingSoonPage sport="Tennis" icon="🎾" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
