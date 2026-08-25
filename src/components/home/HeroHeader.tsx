import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './HeroHeader.css'

export const HeroHeader: React.FC<{ isReady?: boolean }> = ({ isReady = true }) => {
  const badgeRef = useRef<HTMLDivElement>(null)
  const titleWordsRef = useRef<HTMLSpanElement[]>([])
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  const words = ['The', 'complete', 'stack', 'for', 'your', 'AI']

  useEffect(() => {
    if (!isReady) return

    // Apple / Linear grade staggered masked slide-up & blur reveal
    // CSS already sets the initial hidden state (opacity:0, transforms, blur)
    // so we only animate TO the visible state — no flash on first paint.
    const tl = gsap.timeline({ delay: 0.15 })

    // 1. Badge reveals
    tl.to(
      badgeRef.current,
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power4.out' }
    )

    // 2. Title words staggered masked slide-up + de-blur
    tl.to(
      titleWordsRef.current,
      {
        y: '0%',
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.1,
        stagger: 0.07,
        ease: 'power4.out'
      },
      '-=0.65'
    )

    // 3. Subtitle soft fade-in
    tl.to(
      subtitleRef.current,
      { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' },
      '-=0.7'
    )
  }, [isReady])

  return (
    <div className="hero-header-container">
      {/* "Sovereign AI Infrastructure" Pill Badge */}
      <div ref={badgeRef} className="hero-badge-pill">
        <span className="hero-badge-text">Sovereign AI Infrastructure · v2.0</span>
        <span className="hero-badge-arrow-container" aria-hidden="true">
          <span className="hero-badge-arrow-primary">→</span>
          <span className="hero-badge-arrow-clone">→</span>
        </span>
      </div>

      {/* Main Heading with Masked Word Reveal */}
      <div className="hero-title-wrapper">
        <h1 className="hero-title-h1">
          {words.map((word, idx) => (
            <span key={idx} className="hero-word-mask">
              <span
                ref={(el) => {
                  if (el) titleWordsRef.current[idx] = el
                }}
                className="hero-word-inner"
              >
                {word}
                {idx < words.length - 1 ? '\u00A0' : ''}
              </span>
            </span>
          ))}
        </h1>
      </div>

      {/* Subheading Description */}
      <p ref={subtitleRef} className="hero-subtitle">
        Database, Vector Store, Multi-Model Gateway, and Drop-in UI Components — unified into a single high-performance SDK.
      </p>
    </div>
  )
}

export default HeroHeader
