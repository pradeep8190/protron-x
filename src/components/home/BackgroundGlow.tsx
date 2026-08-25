import React, { useMemo } from 'react'
import './BackgroundGlow.css'

interface SparkProps {
  top: string
  left: string
  delay?: string
  scale?: number
}

const SparkNode: React.FC<SparkProps> = ({ top, left, delay = '0s', scale = 1 }) => (
  <div
    className="spark-point"
    style={{
      top,
      left,
      transform: `translate(-50%, -50%) scale(${scale})`,
    }}
  >
    <div className="spark-flare">
      <div className="spark-cross-h" />
      <div className="spark-cross-v" />
      <div className="spark-core" style={{ animationDelay: delay }} />
    </div>
  </div>
)

export const BackgroundGlow: React.FC = () => {
  const COLS = 16
  const ROWS = 11

  // Soft, low-opacity natural tile placements matching reference
  const gridCells = useMemo(() => {
    const map: Record<string, string> = {
      // Top spotlight region
      '1,7': 'tile-subtle',
      '1,8': 'tile-soft',
      '1,9': 'tile-subtle',
      '2,6': 'tile-subtle',
      '2,7': 'tile-soft',
      '2,8': 'tile-glow',
      '2,9': 'tile-soft',
      '2,10': 'tile-subtle',

      // Behind "New" badge & Heading
      '3,6': 'tile-subtle',
      '3,7': 'tile-soft',
      '3,8': 'tile-glow',
      '3,9': 'tile-soft',
      '3,10': 'tile-subtle',
      '4,5': 'tile-subtle',
      '4,7': 'tile-soft',
      '4,8': 'tile-soft',
      '4,9': 'tile-subtle',
      '4,11': 'tile-subtle',

      // Lower ambient patches
      '5,7': 'tile-subtle',
      '5,8': 'tile-soft',
      '5,9': 'tile-subtle',
      '6,8': 'tile-subtle',
    }

    const cells = []
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const key = `${r},${c}`
        cells.push({
          id: key,
          className: map[key] || '',
        })
      }
    }
    return cells
  }, [])

  return (
    <div className="bg-glow-container" aria-hidden="true">
      {/* Film Grain Ambient Noise Overlay */}
      <div className="bg-noise-overlay" />

      {/* Deep Layer: Wide Ambient Glow */}
      <div className="bg-spotlight-wide" />

      {/* Mid Layer: Conic Light Beam Angle */}
      <div className="bg-light-shaft" />

      {/* Core Layer: Intense Top Center Spotlight */}
      <div className="bg-spotlight-core" />

      {/* Soft Ambient Grid Mesh (Zero Hover, Fixed, Ultra-Faint Lines) */}
      <div className="bg-ambient-grid">
        {gridCells.map((cell) => (
          <div
            key={cell.id}
            className={`grid-tile-cell ${cell.className}`}
          />
        ))}
      </div>

      {/* Background Laser Circuit Lines & Ambient Sparks */}
      <div className="bg-spark-layer">
        {/* Top-Center Spark above Badge */}
        <div
          className="laser-line-v"
          style={{ top: '4%', left: '50%', height: '40px', transform: 'translateX(-50%)' }}
        />
        <SparkNode top="8%" left="50%" delay="0s" scale={1.1} />

        {/* Top-Center subtle horizontal accent */}
        <div
          className="laser-line-h"
          style={{ top: '16%', left: '54%', width: '45px' }}
        />
        <SparkNode top="16%" left="58%" delay="1.8s" scale={0.75} />

        {/* Lower Left Connection to Terminal */}
        <div
          className="laser-line-v"
          style={{ top: '56%', left: '16%', height: '60px' }}
        />
        <SparkNode top="58%" left="16%" delay="0.5s" scale={0.85} />

        {/* Lower Right Connection to Terminal */}
        <div
          className="laser-line-v"
          style={{ top: '52%', left: '84%', height: '50px' }}
        />
        <SparkNode top="54%" left="84%" delay="2.1s" scale={0.85} />
      </div>

      {/* Bottom Corner Grid Mesh Accents */}
      <div className="corner-grid-accent bottom-left" />
      <div className="corner-grid-accent bottom-right" />
    </div>
  )
}

export default BackgroundGlow
