import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CodePlayground } from './CodePlayground'
import './SdkSection.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export const SdkSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!headerRef.current) return
      gsap.from(headerRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="sdk-section" id="docs">
      {/* Ambient Spotlight & Grid Stage */}
      <div className="sdk-ambient-spotlight" />
      <div className="sdk-grid-stage" />

      <div className="sdk-container">
        {/* Header */}
        <div ref={headerRef} className="sdk-header">
          <h2 className="sdk-title">
            From zero to production in 3 lines of code.
          </h2>

          <p className="sdk-subtitle">
            Deploy database triggers, compute workers, and transactional delivery across any language or runtime with full type inference.
          </p>
        </div>

        {/* Multi-Language Code Playground */}
        <CodePlayground />
      </div>
    </section>
  )
}

export default SdkSection
