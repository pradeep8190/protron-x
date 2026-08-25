import React, { useRef, useEffect, useState } from 'react'
import { BrandIcon } from './BrandIcons'
import { COMPANY_TESTIMONIALS } from './companyData'
import type { CompanyTestimonial } from './companyData'
import './WaveRibbon.css'

interface WaveRibbonProps {
  activeId: string
  onSelectCompany: (id: string) => void
  isPaused: boolean
  setIsPaused: (paused: boolean) => void
  theme?: 'dark' | 'light'
}

export const WaveRibbon: React.FC<WaveRibbonProps> = ({
  activeId,
  onSelectCompany,
  isPaused,
  setIsPaused,
  theme = 'light',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const [activeItem, setActiveItem] = useState(activeId)
  const [isVisible, setIsVisible] = useState(false)

  // 3-times repeated array for seamless infinite wave loop
  const extendedList: Array<{ item: CompanyTestimonial; uniqueKey: string; index: number }> = []
  for (let rep = 0; rep < 3; rep++) {
    COMPANY_TESTIMONIALS.forEach((item, idx) => {
      extendedList.push({
        item,
        uniqueKey: `${item.id}-${rep}-${idx}`,
        index: rep * COMPANY_TESTIMONIALS.length + idx,
      })
    })
  }

  useEffect(() => {
    setActiveItem(activeId)
  }, [activeId])

  // Viewport Observer: Pause completely when offscreen
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      entries => {
        setIsVisible(entries[0].isIntersecting)
      },
      { rootMargin: '1200px 0px', threshold: 0 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  // GPU Hardware Track Drift (Only 1 single transform on track, 0 per-node JS overhead)
  useEffect(() => {
    if (!isVisible) return

    let animId: number
    const singleSetWidth = COMPANY_TESTIMONIALS.length * 92
    const speed = 0.55

    const animateDrift = () => {
      if (!isPaused && trackRef.current) {
        offsetRef.current += speed
        if (offsetRef.current >= singleSetWidth) {
          offsetRef.current -= singleSetWidth
        }
        trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`
      }
      animId = requestAnimationFrame(animateDrift)
    }

    animId = requestAnimationFrame(animateDrift)
    return () => cancelAnimationFrame(animId)
  }, [isPaused, isVisible])

  // Automatically advance active company every 4.5 seconds if not paused
  useEffect(() => {
    if (isPaused || !isVisible) return

    const interval = setInterval(() => {
      const currentIndex = COMPANY_TESTIMONIALS.findIndex((c) => c.id === activeItem)
      const nextIndex = (currentIndex + 1) % COMPANY_TESTIMONIALS.length
      onSelectCompany(COMPANY_TESTIMONIALS[nextIndex].id)
    }, 4500)

    return () => clearInterval(interval)
  }, [activeItem, isPaused, isVisible, onSelectCompany])

  return (
    <div
      ref={containerRef}
      className={`wave-ribbon-viewport theme-${theme}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Interactive Traveling Sine-Wave Ribbon"
    >
      {/* Center Ambient Spotlight Beam */}
      <div className="wave-center-target-glow" aria-hidden="true" />

      {/* Undulating Gliding Ribbon Track */}
      <div ref={trackRef} className="wave-ribbon-track">
        {extendedList.map(({ item, uniqueKey, index }) => {
          const isActive = item.id === activeItem

          return (
            <button
              key={uniqueKey}
              type="button"
              className={`wave-logo-node ${isActive ? 'active' : ''}`}
              style={{ '--node-idx': index } as React.CSSProperties}
              onClick={() => onSelectCompany(item.id)}
              aria-label={`View feedback from ${item.name}`}
              title={item.name}
            >
              <BrandIcon id={item.id} size={20} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default WaveRibbon
