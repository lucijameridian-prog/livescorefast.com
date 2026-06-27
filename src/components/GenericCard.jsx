import MatchCard from './MatchCard'

// Other sports share the exact same card design as football.
export default function GenericCard({ game }) {
  return <MatchCard match={game} />
}
