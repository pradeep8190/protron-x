import React, { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import './Preloader.css'

interface PreloaderProps {
  onCurtainOpen?: () => void
  onComplete?: () => void
}

export const Preloader: React.FC<PreloaderProps> = ({ onCurtainOpen, onComplete }) => {
  const curtainRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const statusTextRef = useRef<HTMLSpanElement>(null)

  // Stable callback refs to prevent re-render loops from restarting the timeline
  const onCurtainOpenRef = useRef(onCurtainOpen)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCurtainOpenRef.current = onCurtainOpen
    onCompleteRef.current = onComplete
  }, [onCurtainOpen, onComplete])

  // Generate 68 Organic Golden Ratio (Phyllotaxis Fermat Spiral) Dots
  const dots = useMemo(() => {
    const TOTAL_DOTS = 68
    const MAX_RADIUS = 88
    const CENTER = 100
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)) // ~137.507764 degrees
    const WAVE_TRANSIT = 0.78 // Wave transit speed in seconds

    const items = []
    for (let i = 0; i < TOTAL_DOTS; i++) {
      const radius = i === 0 ? 0 : MAX_RADIUS * Math.sqrt(i / (TOTAL_DOTS - 1))
      const angle = i * GOLDEN_ANGLE
      const x = CENTER + radius * Math.cos(angle)
      const y = CENTER + radius * Math.sin(angle)
      const delay = (radius / MAX_RADIUS) * WAVE_TRANSIT

      items.push({
        id: i,
        x: x.toFixed(2),
        y: y.toFixed(2),
        delay: `${delay.toFixed(3)}s`,
      })
    }
    return items
  }, [])

  // Parallax 3D Tilt Physics
  useEffect(() => {
    let targetRotX = 0
    let targetRotY = 0
    let currentRotX = 0
    let currentRotY = 0
    let rafId: number

    const handlePointerMove = (e: MouseEvent) => {
      const xNorm = e.clientX / window.innerWidth - 0.5
      const yNorm = e.clientY / window.innerHeight - 0.5
      targetRotY = xNorm * 22
      targetRotX = -yNorm * 22
    }

    const handleMouseLeave = () => {
      targetRotX = 0
      targetRotY = 0
    }

    const renderParallax = () => {
      currentRotX += (targetRotX - currentRotX) * 0.1
      currentRotY += (targetRotY - currentRotY) * 0.1

      if (innerRef.current) {
        innerRef.current.style.transform = `rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`
      }
      rafId = requestAnimationFrame(renderParallax)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    rafId = requestAnimationFrame(renderParallax)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Single-execution master timeline
  useEffect(() => {
    const progressObj = { value: 0 }
    let lastStatus = 'INITIALIZING ENVIRONMENT'

    const tl = gsap.timeline()

    // 1. Smooth 0% -> 100% counting synced to exactly 2.5 seconds
    tl.to(progressObj, {
      value: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        const val = Math.floor(progressObj.value)
        if (counterRef.current) {
          counterRef.current.textContent = String(val)
        }

        let newStatus = 'INITIALIZING ENVIRONMENT'
        if (val < 35) {
          newStatus = 'INITIALIZING ENVIRONMENT'
        } else if (val < 70) {
          newStatus = 'LOADING CORE ASSETS'
        } else if (val < 99) {
          newStatus = 'FINALIZING EXPERIENCE'
        } else {
          newStatus = 'EXPERIENCE READY'
        }

        if (newStatus !== lastStatus && statusTextRef.current) {
          lastStatus = newStatus
          statusTextRef.current.textContent = newStatus
        }
      },
    })

    // 2. Exactly when 100% is hit, trigger landing animations
    tl.add(() => {
      if (counterRef.current) {
        counterRef.current.textContent = '100'
      }
      if (statusTextRef.current) {
        statusTextRef.current.textContent = 'EXPERIENCE READY'
      }
      onCurtainOpenRef.current?.()
    })

    // 3. Dissolve inner ripple and sweep black curtain left simultaneously
    tl.to(
      innerRef.current,
      {
        opacity: 0,
        x: -40,
        filter: 'blur(6px)',
        duration: 0.3,
        ease: 'power2.in',
      },
      'curtainSweep'
    )

    tl.to(
      curtainRef.current,
      {
        xPercent: -100,
        duration: 0.85,
        ease: 'power4.inOut',
        onComplete: () => {
          onCompleteRef.current?.()
        },
      },
      'curtainSweep'
    )

    return () => {
      tl.kill()
    }
  }, []) // Runs strictly once on mount

  return (
    <div ref={curtainRef} className="preloader-curtain" aria-hidden="false">
      {/* Subtle Noise & Radial Ambient Lighting */}
      <div className="preloader-noise-overlay" />
      <div className="preloader-ambient-glow" />

      <div ref={innerRef} className="preloader-inner-container">
        {/* Full Organic Circular Ripple Glow */}
        <div className="organic-ripple" id="rippleContainer">
          {dots.map((dot) => (
            <div
              key={dot.id}
              className="preloader-dot"
              style={{
                left: `${dot.x}px`,
                top: `${dot.y}px`,
                ['--delay' as any]: dot.delay,
              }}
            />
          ))}
        </div>

        {/* Symmetrical Arc with Centered Counter */}
        <div className="counter-badge">
          <svg className="curve-border" viewBox="0 0 120 24" fill="none">
            <path
              d="M 10,4 C 32,22 88,22 110,4"
              stroke="url(#curveGlowPreloader)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="curveGlowPreloader" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.05)" />
                <stop offset="25%" stopColor="rgba(255, 255, 255, 0.4)" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 0.9)" />
                <stop offset="75%" stopColor="rgba(255, 255, 255, 0.4)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="counter-display">
            <span ref={counterRef} className="counter-number">
              0
            </span>
            <span className="counter-unit">%</span>
          </div>
        </div>

        {/* Professional Minimal Status Line */}
        <div className="status-line">
          <span ref={statusTextRef} className="status-text">
            INITIALIZING ENVIRONMENT
          </span>
        </div>
      </div>
    </div>
  )
}

export default Preloader
