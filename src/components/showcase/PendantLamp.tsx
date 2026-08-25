import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './PendantLamp.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface PendantLampProps {
  value?: string
  sublabel?: string
}

export const PendantLamp: React.FC<PendantLampProps> = ({
  sublabel = 'Unified API',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const cordRef = useRef<HTMLDivElement>(null)
  const fixtureRef = useRef<HTMLDivElement>(null)
  const beamRef = useRef<HTMLDivElement>(null)
  const bloomRef = useRef<HTMLDivElement>(null)
  const reflectionRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Exact initial state: unlit, retracted lamp
      gsap.set(cordRef.current, {
        scaleY: 0.2,
        transformOrigin: '50% 0%',
      })
      gsap.set(fixtureRef.current, {
        y: -35,
      })
      gsap.set(beamRef.current, {
        opacity: 0,
        scaleY: 0.05,
        transformOrigin: '50% 0%',
      })
      gsap.set(bloomRef.current, {
        opacity: 0,
        scale: 0.25,
        transformOrigin: '50% 0%',
      })
      gsap.set(reflectionRef.current, {
        opacity: 0,
        scale: 0.2,
      })
      gsap.set(shadowRef.current, {
        opacity: 0,
        scaleX: 0.2,
      })
      gsap.set(textRef.current, {
        opacity: 0,
        y: 35,
        filter: 'blur(10px)',
      })

      // Precision Scroll-Driven Timeline (Extended scroll span with high smoothing)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'top 10%',
          scrub: 1.6,
        },
      })

      // [0.00 -> 0.50] Phase 1: Physical Cord Extension & Gentle Fixture Lowering
      tl.to(cordRef.current, {
        scaleY: 1,
        duration: 0.5,
        ease: 'power1.out',
      }, 0)
      tl.to(fixtureRef.current, {
        y: 0,
        duration: 0.5,
        ease: 'power1.out',
      }, 0)

      // [0.20 -> 0.85] Phase 2: Volumetric Cone Flare & Floor Reflection Bloom
      tl.to(beamRef.current, {
        opacity: 0.95,
        scaleY: 1,
        duration: 0.65,
        ease: 'sine.inOut',
      }, 0.2)
      tl.to(bloomRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.65,
        ease: 'sine.inOut',
      }, 0.22)
      tl.to(reflectionRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.65,
        ease: 'sine.inOut',
      }, 0.25)

      // [0.35 -> 1.00] Phase 3: Illuminated "ONE" Typography & Cast Shadow reveal
      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.65,
        ease: 'power2.out',
      }, 0.35)
      tl.to(shadowRef.current, {
        opacity: 1,
        scaleX: 1,
        duration: 0.65,
        ease: 'power2.out',
      }, 0.35)
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className="pendant-lamp-wrapper" aria-hidden="true">
      {/* Hanging Wire Cord from Ceiling */}
      <div ref={cordRef} className="lamp-cord" />

      {/* Dome Lamp Fixture */}
      <div ref={fixtureRef} className="lamp-fixture">
        <div className="lamp-top-nut" />
        <div className="lamp-dome-shade" />
        <div className="lamp-rim-lip" />
      </div>

      {/* Volumetric Soft Downward Light Beam & Ambient Bloom */}
      <div ref={beamRef} className="lamp-light-beam" />
      <div ref={bloomRef} className="lamp-beam-bloom" />

      {/* Ground Floor Light Reflection Pool */}
      <div ref={reflectionRef} className="lamp-floor-reflection" />

      {/* Physical Cast Shadow underneath */}
      <div ref={shadowRef} className="lamp-cast-shadow" />

      {/* Illuminated Giant "ONE" Typography */}
      <div ref={textRef} className="lamp-illuminated-content">
        <span className="lamp-one-text">ONE</span>
        <span className="lamp-sublabel">{sublabel}</span>
      </div>
    </div>
  )
}

export default PendantLamp
