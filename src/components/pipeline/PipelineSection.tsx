import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { InteractivePipeline } from './InteractivePipeline'
import './PipelineSection.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export const PipelineSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const footnoteRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            toggleActions: 'play none none reverse',
          },
        })
      }

      if (footnoteRef.current) {
        gsap.from(footnoteRef.current, {
          opacity: 0,
          y: 15,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footnoteRef.current,
            start: 'top bottom',
            toggleActions: 'play none none none',
          },
        })
      }
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="pipeline-section" id="pipeline">
      {/* Ambient Top Spotlight Light Shaft */}
      <div className="pipeline-ambient-spotlight" />

      {/* Vignetted Architectural Hairline Grid Stage */}
      <div className="pipeline-grid-stage" />

      <div className="pipeline-container">
        {/* Section 3 Header */}
        <div ref={headerRef} className="pipeline-header">
          <div className="pipeline-badge">
            <span>Sovereign Network</span>
          </div>

          <h2 className="pipeline-title">
            Connected to all. Powered by one.
          </h2>

          <p className="pipeline-subtitle">
            Every database query, AI model completion, auth check, and email notification flows through a single sovereign orchestrator.
          </p>
        </div>

        {/* Interactive 5-Node Connected Constellation */}
        <InteractivePipeline />

        {/* Subtle Bridge Footnote Line */}
        <div ref={footnoteRef} className="pipeline-bottom-footnote">
          <span>Unified sub-millisecond gRPC runtime across all sovereign engines.</span>
        </div>
      </div>
    </section>
  )
}

export default PipelineSection
