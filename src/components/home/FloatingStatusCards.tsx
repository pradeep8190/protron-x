import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './FloatingStatusCards.css'

export const FloatingStatusCards: React.FC = () => {
  const leftCardRef = useRef<HTMLDivElement>(null)
  const rightCardRef = useRef<HTMLDivElement>(null)
  const wiresRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    // Elegant slide-in from sides and fade-in for wires
    gsap.fromTo(
      leftCardRef.current,
      { opacity: 0, x: -24, scale: 0.96 },
      { opacity: 1, x: 0, scale: 1, duration: 1.3, ease: 'power4.out', delay: 0.25 }
    )
    
    gsap.fromTo(
      rightCardRef.current,
      { opacity: 0, x: 24, scale: 0.96 },
      { opacity: 1, x: 0, scale: 1, duration: 1.3, ease: 'power4.out', delay: 0.25 }
    )

    gsap.fromTo(
      wiresRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.8, ease: 'power2.out', delay: 0.75 }
    )
  }, [])

  return (
    <div className="floating-cards-wrapper" aria-hidden="false">
      {/* Symmetrical Soft Connection Wires linking cards to heading center */}
      <svg
        ref={wiresRef}
        className="connection-lines-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ opacity: 0 }}
      >
        <defs>
          <linearGradient id="left-wire-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="35%" stopColor="rgba(255, 255, 255, 0.08)" />
            <stop offset="70%" stopColor="rgba(255, 255, 255, 0.05)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
          <linearGradient id="right-wire-gradient" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="35%" stopColor="rgba(255, 255, 255, 0.08)" />
            <stop offset="70%" stopColor="rgba(255, 255, 255, 0.05)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
        </defs>

        {/* Left Card to Center Heading Curve */}
        <path
          className="wire-path left-wire"
          d="M 6.8,18.5 C 22,18.5 30,27 50,27"
          fill="none"
          stroke="url(#left-wire-gradient)"
          strokeWidth="0.15"
        />

        {/* Right Card to Center Heading Curve */}
        <path
          className="wire-path right-wire"
          d="M 93.2,18.5 C 78,18.5 70,27 50,27"
          fill="none"
          stroke="url(#right-wire-gradient)"
          strokeWidth="0.15"
        />
      </svg>

      {/* Left Card: "AI Gateway" (Universal Multi-Model Engine) */}
      <div ref={leftCardRef} className="status-card-unit left" tabIndex={0} role="button" aria-label="Backend Pillar: AI Gateway" style={{ opacity: 0 }}>
        <div className="status-vector-tile">
          {/* Crisp AI Spark / Neural Node SVG Icon */}
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
        <div className="status-label-pill">
          <span>AI Gateway</span>
        </div>
      </div>

      {/* Right Card: "Vector DB" (Hybrid Vector + SQL Engine) */}
      <div ref={rightCardRef} className="status-card-unit right" tabIndex={0} role="button" aria-label="Backend Pillar: Vector DB" style={{ opacity: 0 }}>
        <div className="status-vector-tile">
          {/* Crisp Vector Matrix Database SVG Icon */}
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
        </div>
        <div className="status-label-pill">
          <span>Vector DB</span>
        </div>
      </div>
    </div>
  )
}

export default FloatingStatusCards
