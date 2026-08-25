import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SpeedRays } from './SpeedRays'
import './EdgeMeshSection.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export const EdgeMeshSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const glowLeftRef = useRef<HTMLDivElement>(null)
  const glowRightRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // 1. Ambient Center & Side Glows Entrance
      const glows = [glowRef.current, glowLeftRef.current, glowRightRef.current].filter(Boolean)
      if (glows.length > 0) {
        gsap.from(glows, {
          opacity: 0,
          scale: 0.88,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // 2. Cinematic Headline: Blur reveal + translation
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 45,
          filter: 'blur(12px)',
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // 3. Subtitle smooth lift
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          opacity: 0,
          y: 30,
          duration: 1.0,
          delay: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // 4. Staggered Metric Items Entrance
      if (metricsRef.current) {
        gsap.from(metricsRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 0.85,
          stagger: 0.08,
          delay: 0.32,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            toggleActions: 'play none none reverse',
          },
        })
      }
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="edge-mesh-section" id="edge-latency">
      {/* Left & Right Atmospheric Side Glow Flares */}
      <div ref={glowLeftRef} className="edge-mesh-glow-left" />
      <div ref={glowRightRef} className="edge-mesh-glow-right" />

      {/* Center Core Ambient Soft Glow */}
      <div ref={glowRef} className="edge-mesh-ambient-glow" />

      {/* GPU Hardware-Accelerated Short Velocity Speed Rays & Comets */}
      <SpeedRays />

      {/* Foreground Minimalist Content */}
      <div className="edge-mesh-content">
        <h2 ref={titleRef} className="edge-mesh-title">
          We load before you blink.
        </h2>

        <p ref={subtitleRef} className="edge-mesh-subtitle">
          Distributed across 35+ global edge points of presence with localized semantic memory. Every database query, vector search, and AI stream arrives with zero perceptible latency.
        </p>

        <div ref={metricsRef} className="edge-mesh-metric-strip">
          <div className="edge-mesh-metric-item">
            <span className="edge-mesh-metric-val">&lt; 1.2ms</span>
            <span className="edge-mesh-metric-lbl">Cache Response</span>
          </div>

          <div className="edge-mesh-metric-divider" />

          <div className="edge-mesh-metric-item">
            <span className="edge-mesh-metric-val">35+</span>
            <span className="edge-mesh-metric-lbl">Anycast Regions</span>
          </div>

          <div className="edge-mesh-metric-divider" />

          <div className="edge-mesh-metric-item">
            <span className="edge-mesh-metric-val">0ms</span>
            <span className="edge-mesh-metric-lbl">Cold Starts</span>
          </div>
        </div>
      </div>
    </section>
  )
}
