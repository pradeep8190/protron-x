import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import './PreFooterSection.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export const PreFooterSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const glowLayerRef = useRef<HTMLSpanElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)
  const isSweepingRef = useRef(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isSweepingRef.current) return
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }

  useGSAP(
    () => {
      if (!sectionRef.current || !containerRef.current || !glowLayerRef.current) return

      const proxy = { x: -15 }

      // Fade-in entrance for CTA content
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
            },
          }
        )
      }

      // One-time sweep animation for brand text
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        once: true,
        onEnter: () => {
          isSweepingRef.current = true

          const tl = gsap.timeline({
            onComplete: () => {
              isSweepingRef.current = false
              if (glowLayerRef.current) {
                gsap.to(glowLayerRef.current, {
                  opacity: '',
                  duration: 0.3,
                  clearProps: 'opacity',
                })
              }
            },
          })

          tl.to(proxy, {
            x: 115,
            duration: 1.8,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (containerRef.current) {
                containerRef.current.style.setProperty('--mouse-x', `${proxy.x}%`)
                containerRef.current.style.setProperty('--mouse-y', '50%')
              }
            },
          })
          .fromTo(
            glowLayerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.35, ease: 'power2.in' },
            0
          )
          .to(
            glowLayerRef.current,
            { opacity: 0, duration: 0.35, ease: 'power2.out' },
            1.45
          )
        },
      })
    },
    { scope: sectionRef, dependencies: [] }
  )

  return (
    <section ref={sectionRef} className="pre-footer-section" id="pre-footer">
      {/* Pre-Footer Action Block (CTA) */}
      <div ref={ctaRef} className="pre-footer-cta-container">
        <h2 className="pre-footer-cta-heading">
          Ready to scale your mission-critical pipelines?
        </h2>
        <p className="pre-footer-cta-subheading">
          Deploy high-throughput cloud engines with microsecond orchestration.
        </p>

        <div className="pre-footer-cta-actions">
          <a href="#get-started" className="pre-footer-primary-btn">
            <span>Get Started Free</span>
            <ArrowRight size={15} />
          </a>

          <a href="#docs" className="pre-footer-secondary-btn">
            <span>Read Documentation</span>
          </a>
        </div>
      </div>

      {/* Giant Brand Watermark Stage */}
      <div
        ref={containerRef}
        className={`resend-brand-stage ${isHovered ? 'is-hovered' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={
          {
            '--mouse-x': `${mousePos.x}%`,
            '--mouse-y': `${mousePos.y}%`,
          } as React.CSSProperties
        }
      >
        <div className="resend-brand-inner">
          {/* Base Layer: #808080 to transparent gradient */}
          <span className="resend-text-base">Protron X</span>

          {/* Hover / Sweep Layer: Pure Outer Border Glow */}
          <span ref={glowLayerRef} className="resend-text-glow" aria-hidden="true">
            Protron X
          </span>
        </div>

        {/* Bottom of brand stage */}
      </div>
    </section>
  )
}

export default PreFooterSection
