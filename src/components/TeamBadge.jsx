import { useState } from 'react'
import { teamColor, abbr } from '../utils/team'

// Shows a real team logo when available; falls back to a colored circle with initials.
export default function TeamBadge({ name = '', logo = null, size = 24, fontSize }) {
  const [broken, setBroken] = useState(false)
  const px = `${size}px`

  if (logo && !broken) {
    return (
      <img
        src={logo}
        alt={name}
        onError={() => setBroken(true)}
        style={{ width: px, height: px, objectFit: 'contain', flexShrink: 0 }}
      />
    )
  }

  return (
    <span
      style={{
        width: px, height: px, borderRadius: '50%',
        background: teamColor(name),
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800,
        fontSize: fontSize || `${Math.round(size * 0.42)}px`,
        color: '#fff', flexShrink: 0, lineHeight: 1,
      }}
    >
      {abbr(name)}
    </span>
  )
}
