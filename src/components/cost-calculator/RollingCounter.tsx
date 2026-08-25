import React, { useEffect, useRef } from 'react'
import './RollingCounter.css'

interface RollingCounterProps {
  value: number
  label?: string
}

const DIGIT_HEIGHT = 72

export const RollingCounter: React.FC<RollingCounterProps> = ({ value, label }) => {
  const digits = String(value).padStart(1, '0').split('')

  return (
    <div className="rolling-counter-root">
      <div className="rolling-counter-digits">
        {digits.map((digit, i) => (
          <DigitColumn
            key={`col-${digits.length - 1 - i}`}
            digit={parseInt(digit, 10)}
            place={digits.length - 1 - i}
          />
        ))}
      </div>
      {label && <span className="rolling-counter-label">{label}</span>}
    </div>
  )
}

interface DigitColumnProps {
  digit: number
  place: number
}

const DigitColumn: React.FC<DigitColumnProps> = ({ digit, place }) => {
  const stripRef = useRef<HTMLDivElement>(null)

  // Higher place = slower, more locked feel
  const duration = place === 0 ? 0.4 : place === 1 ? 0.55 : 0.7

  useEffect(() => {
    if (stripRef.current) {
      stripRef.current.style.transform = `translateY(${-digit * DIGIT_HEIGHT}px)`
    }
  }, [digit])

  return (
    <div className="digit-column">
      <div className="digit-mask">
        <div
          ref={stripRef}
          className="digit-strip"
          style={{
            transition: `transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <div
              key={n}
              className={`digit-cell ${n === digit ? 'active' : ''}`}
            >
              {n}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RollingCounter
