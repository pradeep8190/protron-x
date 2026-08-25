import React, { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Initialize high-precision momentum Lenis instance
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    })

    // Synchronize Lenis scroll updates with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Run Lenis RAF loop on GSAP internal ticker for 0-jitter 120fps sync
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    // Recalculate ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)

    // Sync ScrollTrigger calculations after sections populate their state layouts
    const syncTimeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 450)

    // =========================================================
    // UNIVERSAL VIEWPORT CULLING OBSERVER (YOUTUBE / APPLE SPEC)
    // Automatically observes all <section> elements on the page.
    // Pre-warms 450px before entering viewport & freezes offscreen
    // CSS animations and rendering loops automatically.
    // =========================================================
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement
          if (entry.isIntersecting) {
            target.classList.remove('is-offscreen')
            target.classList.add('is-in-view')
          } else {
            target.classList.add('is-offscreen')
            target.classList.remove('is-in-view')
          }
        })
      },
      {
        rootMargin: '1200px 0px 1200px 0px',
        threshold: 0,
      }
    )

    // Observe all intermediate scrollable sections (excluding testimonials, pre-footer & footer)
    const sections = document.querySelectorAll(
      '.showcase-section, .pipeline-section, .sdk-section, .tracer-section, .edge-mesh-section, .cost-calc-section'
    )
    sections.forEach((sec) => sectionObserver.observe(sec))

    return () => {
      clearTimeout(syncTimeout)
      window.removeEventListener('resize', handleResize)
      sectionObserver.disconnect()
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}

export default SmoothScroll
