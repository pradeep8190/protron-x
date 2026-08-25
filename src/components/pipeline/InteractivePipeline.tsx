import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import vectorDbImg from '../../assets/vector-db-tile.jpg'
import aiGatewayImg from '../../assets/ai-gateway-tile.jpg'
import renderImg from '../../assets/render-tile.jpg'
import resendImg from '../../assets/resend-tile.jpg'
import './InteractivePipeline.css'

gsap.registerPlugin(ScrollTrigger)

interface SideNode {
  id: string
  name: string
  subtitle: string
  imageSrc: string
}

const LEFT_NODES: SideNode[] = [
  { id: 'vector-db', name: 'Vector & SQL DB', subtitle: 'pgvector · 2.8ms', imageSrc: vectorDbImg },
  { id: 'ai-gateway', name: 'AI Model Gateway', subtitle: '100+ LLMs & Cache', imageSrc: aiGatewayImg },
]

const RIGHT_NODES: SideNode[] = [
  { id: 'compute', name: 'Edge Compute', subtitle: 'Serverless Workers', imageSrc: renderImg },
  { id: 'emails', name: 'Transactional Mails', subtitle: '99.9% Delivery', imageSrc: resendImg },
]

export const InteractivePipeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const centerHubRef = useRef<HTMLDivElement>(null)
  const centerGlowRef = useRef<HTMLDivElement>(null)
  const gridStageRef = useRef<HTMLDivElement>(null)
  const wiresRef = useRef<SVGSVGElement>(null)
  const leftTilesRef = useRef<HTMLDivElement>(null)
  const rightTilesRef = useRef<HTMLDivElement>(null)

  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          toggleActions: 'play none none reverse',
        },
      })

      // 1. Grid Stage & Center Spotlight
      tl.fromTo(
        gridStageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' },
        0
      )

      // 2. Central Core Logo Hub & Glow expansion
      tl.fromTo(
        centerHubRef.current,
        {
          opacity: 0,
          scale: 0.75,
          filter: 'blur(12px)',
        },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.75,
          ease: 'power3.out',
        },
        0.05
      )

      tl.fromTo(
        centerGlowRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 0.7, scale: 1, duration: 0.8, ease: 'power2.out' },
        0.08
      )

      // 3. Laser Circuit Wires Trace Inward
      const wires = containerRef.current?.querySelectorAll('.constellation-wire, .wire-ambient-bloom')
      if (wires && wires.length > 0) {
        wires.forEach((wire) => {
          const path = wire as SVGPathElement
          const length = path.getTotalLength ? path.getTotalLength() : 400
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          })
          tl.to(
            path,
            {
              strokeDashoffset: 0,
              duration: 0.65,
              ease: 'power2.inOut',
            },
            0.15
          )
        })
      }

      // 4. Satellite Nodes Fly-In with Crisp Lens Focus
      const leftTiles = leftTilesRef.current?.querySelectorAll('.floating-tile-wrapper')
      const rightTiles = rightTilesRef.current?.querySelectorAll('.floating-tile-wrapper')

      if (leftTiles) {
        tl.fromTo(
          leftTiles,
          {
            opacity: 0,
            x: -22,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
          },
          0.2
        )
      }

      if (rightTiles) {
        tl.fromTo(
          rightTiles,
          {
            opacity: 0,
            x: 22,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
          },
          0.2
        )
      }

      // 5. Pulse particles ignite
      const pulses = containerRef.current?.querySelectorAll('.wire-pulse-particle')
      if (pulses) {
        tl.fromTo(
          pulses,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out' },
          0.45
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="constellation-wrapper">
      {/* High-Dynamic Spatial Hairline Grid */}
      <div ref={gridStageRef} className="constellation-grid-stage" />

      {/* Atmospheric Volumetric Lighting */}
      <div className="constellation-spotlight" />
      <div className="constellation-bg-glow" />

      {/* Laser Hairline Dual-Layer SVG Connection Grid */}
      <svg
        key="pipeline-svg-v3"
        ref={wiresRef}
        className="constellation-svg"
        viewBox="0 0 1000 500"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wire-grad-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.05)" />
            <stop offset="60%" stopColor="rgba(255, 255, 255, 0.35)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.85)" />
          </linearGradient>
          <linearGradient id="wire-grad-right" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.05)" />
            <stop offset="60%" stopColor="rgba(255, 255, 255, 0.35)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.85)" />
          </linearGradient>
        </defs>

        {/* Ambient Bloom Lines (Layer 1) */}
        <path d="M 190,110 C 330,110 380,250 500,250" className="wire-ambient-bloom" />
        <path d="M 190,390 C 330,390 380,250 500,250" className="wire-ambient-bloom" />
        <path d="M 810,110 C 670,110 620,250 500,250" className="wire-ambient-bloom" />
        <path d="M 810,390 C 670,390 620,250 500,250" className="wire-ambient-bloom" />

        {/* Crisp Hairline Lines (Layer 2) */}
        <path
          d="M 190,110 C 330,110 380,250 500,250"
          className={`constellation-wire ${hoveredNode === 'vector-db' ? 'active' : ''}`}
          stroke="url(#wire-grad-left)"
        />
        <path
          d="M 190,390 C 330,390 380,250 500,250"
          className={`constellation-wire ${hoveredNode === 'ai-gateway' ? 'active' : ''}`}
          stroke="url(#wire-grad-left)"
        />
        <path
          d="M 810,110 C 670,110 620,250 500,250"
          className={`constellation-wire ${hoveredNode === 'compute' ? 'active' : ''}`}
          stroke="url(#wire-grad-right)"
        />
        <path
          d="M 810,390 C 670,390 620,250 500,250"
          className={`constellation-wire ${hoveredNode === 'emails' ? 'active' : ''}`}
          stroke="url(#wire-grad-right)"
        />

        {/* Circuit Intersection Dots */}
        <circle cx="190" cy="110" r="3" className="wire-junction-node" />
        <circle cx="190" cy="390" r="3" className="wire-junction-node" />
        <circle cx="810" cy="110" r="3" className="wire-junction-node" />
        <circle cx="810" cy="390" r="3" className="wire-junction-node" />
        <circle cx="500" cy="250" r="4.5" className="wire-junction-node center-junction" />

        {/* Inward Converging Energy Pulses with Glowing Halos (Snappy Fluid Flow: 1.8s) */}
        <circle key="pulse-tl-v3" r="4.5" className="wire-pulse-particle pulse-tl">
          <animateMotion
            path="M 190,110 C 330,110 380,250 500,250"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </circle>

        <circle key="pulse-bl-v3" r="4.5" className="wire-pulse-particle pulse-bl">
          <animateMotion
            path="M 190,390 C 330,390 380,250 500,250"
            dur="1.8s"
            begin="0.9s"
            repeatCount="indefinite"
          />
        </circle>

        <circle key="pulse-tr-v3" r="4.5" className="wire-pulse-particle pulse-tr">
          <animateMotion
            path="M 810,110 C 670,110 620,250 500,250"
            dur="1.8s"
            begin="0.45s"
            repeatCount="indefinite"
          />
        </circle>

        <circle key="pulse-br-v3" r="4.5" className="wire-pulse-particle pulse-br">
          <animateMotion
            path="M 810,390 C 670,390 620,250 500,250"
            dur="1.8s"
            begin="1.35s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* 5-NODE ARCHITECTURE GRID */}
      <div className="constellation-grid">
        
        {/* LEFT COLUMN: 2 TILES */}
        <div ref={leftTilesRef} className="constellation-col left-col">
          {LEFT_NODES.map((node) => (
            <div
              key={node.id}
              className="floating-tile-wrapper left-tile"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Permanent Ambient Glow */}
              <div className="tile-ambient-glow" />

              {/* Hover Text on LEFT side with NO background */}
              <div className="side-hover-label left-pos">
                <span className="label-title">{node.name}</span>
                <span className="label-sub">{node.subtitle}</span>
              </div>

              {/* 3D Tactile Tile */}
              <div className="floating-3d-tile">
                <img src={node.imageSrc} alt={node.name} className="tile-img" />
              </div>
            </div>
          ))}
        </div>

        {/* CENTER PROTRON X CORE HUB */}
        <div ref={centerHubRef} className="constellation-center-hub">
          <div ref={centerGlowRef} className="center-glow-halo" />
          <div className="center-logo-tile">
            <img src="/logo.png" alt="Protron X" className="center-logo-img" />
          </div>
        </div>

        {/* RIGHT COLUMN: 2 TILES */}
        <div ref={rightTilesRef} className="constellation-col right-col">
          {RIGHT_NODES.map((node) => (
            <div
              key={node.id}
              className="floating-tile-wrapper right-tile"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Permanent Ambient Glow */}
              <div className="tile-ambient-glow" />

              {/* Hover Text on RIGHT side with NO background */}
              <div className="side-hover-label right-pos">
                <span className="label-title">{node.name}</span>
                <span className="label-sub">{node.subtitle}</span>
              </div>

              {/* 3D Tactile Tile */}
              <div className="floating-3d-tile">
                <img src={node.imageSrc} alt={node.name} className="tile-img" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default InteractivePipeline
