import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PendantLamp } from './PendantLamp'
import './ShowcaseSection.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export const ShowcaseSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Create a master timeline triggered by the section scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          toggleActions: 'play none none reverse',
        },
      })

      // 1. Text elements slide up quickly
      const textElements = sectionRef.current.querySelectorAll(
        '.showcase-badge, .showcase-title, .showcase-desc'
      )
      tl.from(textElements, {
        opacity: 0,
        y: 20,
        duration: 0.35,
        stagger: 0.06,
        ease: 'power3.out',
      })

      // 2. The 3 glass cards stagger up right after
      const cards = sectionRef.current.querySelectorAll('.pillar-card')
      tl.from(
        cards,
        {
          opacity: 0,
          y: 25,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '-=0.2'
      )
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="showcase-section" id="features">
      <div className="showcase-container">
        {/* Left Column: 3D Pendant Lamp with Illuminated "ONE" and Physical Light Refraction */}
        <div className="showcase-left-col">
          <PendantLamp sublabel="Unified SDK" />
        </div>

        {/* Right Column: Unified Architecture Details & 3 Core AI Pillars */}
        <div ref={rightColRef} className="showcase-right-col">
          <div className="showcase-badge">
            <span>Unified Stack</span>
          </div>

          <h2 className="showcase-title">
            One SDK. Your Entire AI Stack & UI.
          </h2>

          <p className="showcase-desc">
            Stop stitching together fragmented vendors and fragile APIs. Protron X unifies multi-model AI routing, vector databases, zero-trust auth, and drop-in UI components with a single secret key.
          </p>

          {/* 3 Core Pillars Bento Row */}
          <div className="showcase-pillars-grid">
            {/* Pillar 1: AI Model Gateway */}
            <div className="pillar-card">
              <h3 className="pillar-card-title">AI Model Gateway</h3>
              <p className="pillar-card-desc">
                Universal routing across 100+ LLMs with semantic caching and sub-10ms edge execution.
              </p>
            </div>

            {/* Pillar 2: Hybrid Vector & SQL */}
            <div className="pillar-card">
              <h3 className="pillar-card-title">Hybrid Vector & SQL</h3>
              <p className="pillar-card-desc">
                Built-in pgvector store with auto-embedding generation and instant similarity queries.
              </p>
            </div>

            {/* Pillar 3: Drop-in UI & Auth */}
            <div className="pillar-card">
              <h3 className="pillar-card-title">Drop-in UI & Auth</h3>
              <p className="pillar-card-desc">
                Copy-paste AI chat widgets, input bars, and zero-trust token rate limiting out of the box.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShowcaseSection
