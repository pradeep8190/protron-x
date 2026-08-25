import React, { useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PrecisionDial } from './PrecisionDial'
import { RollingCounter } from './RollingCounter'
import './CostCalculatorSection.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export const CostCalculatorSection: React.FC = () => {
  const [dialValue, setDialValue] = useState(6)

  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const dialWrapperRef = useRef<HTMLDivElement>(null)
  const cardsWrapperRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          toggleActions: 'play none none reverse',
        },
      })

      // 1. Centered Header Reveal
      if (headerRef.current) {
        tl.from(headerRef.current.children, {
          opacity: 0,
          y: 25,
          filter: 'blur(6px)',
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out',
        })
      }

      // 2. Left Dial Stage Reveal
      if (dialWrapperRef.current) {
        tl.from(
          dialWrapperRef.current,
          {
            opacity: 0,
            x: -20,
            filter: 'blur(4px)',
            duration: 0.75,
            ease: 'power3.out',
          },
          '0.15'
        )
      }

      // 3. Right Comparison Cards Staggered Reveal
      if (cardsWrapperRef.current) {
        const cards = cardsWrapperRef.current.querySelectorAll('.cost-calc-card')
        tl.from(
          cards,
          {
            opacity: 0,
            y: 35,
            filter: 'blur(8px)',
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '0.2'
        )
      }
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="cost-calc-section" id="pricing-calculator">
      {/* Center Ambient Spotlights */}
      <div className="cost-calc-ambient-spotlight" />

      <div className="cost-calc-container">
        {/* Clean Section Header */}
        <div ref={headerRef} className="cost-calc-header">
          <h2 className="cost-calc-title">
            One unified bill. Zero cloud tax.
          </h2>

          <p className="cost-calc-subtitle">
            Model your monthly scale. Eliminate fragmented vendor markups across compute, vectors, and AI tokens.
          </p>
        </div>

        {/* Main Interactive Stage: Left Dial + Right Luxury Cards */}
        <div className="cost-calc-body-grid">
          {/* Left: Dial + Rolling Counter */}
          <div ref={dialWrapperRef} className="cost-calc-dial-wrapper">
            <PrecisionDial
              value={dialValue}
              min={1}
              max={100}
              unitLabel="Months"
              onChange={setDialValue}
            />
            <div className="cost-calc-counter-area">
              <RollingCounter value={dialValue} label="Month" />
            </div>
          </div>

          {/* Right: Luxury Comparison Cards */}
          <div ref={cardsWrapperRef} className="cost-calc-cards-wrapper">
            {/* Card 1: Traditional Cloud (Red Accent) */}
            <div className="cost-calc-card cost-calc-card-mono">
              <div className="cost-calc-card-glow-orange" />
              <div className="cost-calc-card-inner">
                <div className="cost-calc-card-top-row">
                  <h3 className="cost-calc-card-title">Traditional Cloud</h3>
                  <span className="cost-calc-card-tag cost-calc-tag-muted">Legacy Stack</span>
                </div>

                <div className="cost-calc-card-price-box">
                  <span className="cost-calc-card-price-num">
                    <sup className="cost-calc-currency-sup">$</sup>{(dialValue * 148).toLocaleString()}
                  </span>
                  <span className="cost-calc-card-cadence">
                    / {dialValue} {dialValue === 1 ? 'month' : 'months'}
                  </span>
                </div>

                <p className="cost-calc-card-desc">
                  Estimated multi-vendor spend across compute, egress, and managed vector infrastructure.
                </p>

                <div className="cost-calc-card-divider" />

                <ul className="cost-calc-card-features">
                  <li className="cost-calc-feature-item negative">
                    <span className="cost-calc-feature-bullet">✕</span>
                    <span>Disjointed egress markups & hidden fees</span>
                  </li>
                  <li className="cost-calc-feature-item negative">
                    <span className="cost-calc-feature-bullet">✕</span>
                    <span>Separate vector database invoices</span>
                  </li>
                  <li className="cost-calc-feature-item negative">
                    <span className="cost-calc-feature-bullet">✕</span>
                    <span>Unpredictable idle capacity waste</span>
                  </li>
                </ul>

                <div className="cost-calc-card-footer">
                  <span className="cost-calc-footer-note negative">
                    3.8× average vendor overhead
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Protron X (Purple Accent) */}
            <div className="cost-calc-card cost-calc-card-featured">
              <div className="cost-calc-card-glow-purple" />
              <div className="cost-calc-card-inner">
                <div className="cost-calc-card-top-row">
                  <h3 className="cost-calc-card-title brand">Protron X</h3>
                  <span className="cost-calc-card-tag cost-calc-tag-purple">Unified System</span>
                </div>

                <div className="cost-calc-card-price-box">
                  <span className="cost-calc-card-price-num">
                    <sup className="cost-calc-currency-sup">$</sup>{(dialValue * 34).toLocaleString()}
                  </span>
                  <span className="cost-calc-card-cadence">
                    / {dialValue} {dialValue === 1 ? 'month' : 'months'}
                  </span>
                </div>

                <p className="cost-calc-card-desc">
                  Autonomous consolidated billing with native compute, vector cache, and zero cloud markup.
                </p>

                <div className="cost-calc-card-divider" />

                <ul className="cost-calc-card-features">
                  <li className="cost-calc-feature-item positive">
                    <span className="cost-calc-feature-bullet">✓</span>
                    <span>Zero egress tax & single line-item bill</span>
                  </li>
                  <li className="cost-calc-feature-item positive">
                    <span className="cost-calc-feature-bullet">✓</span>
                    <span>Built-in sub-millisecond vector memory</span>
                  </li>
                  <li className="cost-calc-feature-item positive">
                    <span className="cost-calc-feature-bullet">✓</span>
                    <span>Sub-second autonomous edge scaling</span>
                  </li>
                </ul>

                <div className="cost-calc-card-footer">
                  <span className="cost-calc-footer-note positive">
                    Save up to 77% with zero cloud tax
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CostCalculatorSection
