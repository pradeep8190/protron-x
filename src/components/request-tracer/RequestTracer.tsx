import React, { useState, useEffect, useRef } from 'react'
import { Check, Clock, Globe, Terminal } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './RequestTracer.css'

gsap.registerPlugin(ScrollTrigger)

interface RequestEvent {
  id: string
  userId: number
  model: string
  region: string
  latency: number
  timestamp: string
  status: 'Completed' | 'Routed'
}

const MODELS = [
  'Gemini 3.7 Flash',
  'Claude Opus 4.6',
  'GPT 5.6',
  'Grok 3.0',
  'Gemini 2.5 Flash',
]

const REGIONS = ['US-East', 'EU-Central', 'AP-South', 'US-West', 'SA-East']

export const RequestTracer: React.FC = () => {
  const [events, setEvents] = useState<RequestEvent[]>([])
  const [isShifting, setIsShifting] = useState(false)
  const [totalRequests, setTotalRequests] = useState(48291402)
  const [sparklineData, setSparklineData] = useState([20, 24, 18, 22, 15, 26, 18, 22, 16, 20])

  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Fade in spotlight glow
    gsap.fromTo('.tracer-ambient-glow',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
        }
      }
    )

    // Slide and rotate cards stage
    gsap.fromTo('.tracer-stage',
      { 
        opacity: 0, 
        y: 60,
        rotationX: -6,
        rotationY: 4,
        transformPerspective: 1000
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 1.4,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
        }
      }
    )

    // Staggered fade in for copy elements
    gsap.fromTo(
      [
        '.tracer-tag',
        '.tracer-heading',
        '.tracer-desc',
        '.features-subhead',
        '.feature-card'
      ],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
        }
      }
    )
  }, { scope: containerRef })

  // Helper to generate a random request event
  const generateRandomEvent = (offsetSeconds = 0): RequestEvent => {
    const now = new Date(Date.now() - offsetSeconds * 1000)
    const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    const pad = (num: number) => String(num).padStart(2, '0')
    const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`

    return {
      id: Math.random().toString(36).substr(2, 9),
      userId: Math.floor(Math.random() * 1000) + 1000,
      model: MODELS[Math.floor(Math.random() * MODELS.length)],
      region: REGIONS[Math.floor(Math.random() * REGIONS.length)],
      latency: Math.floor(Math.random() * 160) + 80,
      timestamp: `${months[now.getMonth()]} ${now.getDate()} ${timeStr}`,
      status: Math.random() > 0.4 ? 'Completed' : 'Routed',
    }
  }

  useEffect(() => {
    // Start with exactly 3 visible events
    const initialEvents: RequestEvent[] = []
    for (let i = 2; i >= 0; i--) {
      initialEvents.push(generateRandomEvent(i))
    }
    setEvents(initialEvents)

    let timeoutId: any
    let isVisible = true

    const triggerNextEvent = () => {
      if (!isVisible) return

      const freshEvent = generateRandomEvent(0)

      // Step 1: Prepend the new event at the top (making 4 events in total)
      setEvents((prev) => [freshEvent, ...prev])
      setIsShifting(true)

      // Step 2: Animate the wrapper to 0px, sliding all items down.
      setTimeout(() => {
        setEvents((prev) => prev.slice(0, 3))
        setIsShifting(false)
      }, 350)

      // Step 3: Increment the total request counter by a random volume of global concurrent requests
      setTotalRequests((prev) => prev + Math.floor(Math.random() * 18) + 12)

      // Step 4: Add a new telemetry value to the sparkline stream
      setSparklineData((prev) => {
        const nextVal = Math.floor(Math.random() * 22) + 9
        return [...prev.slice(1), nextVal]
      })

      // Schedule the next event with a random delay between 2s (2000ms) and 4s (4000ms)
      const nextDelay = Math.floor(Math.random() * 1200) + 2000
      timeoutId = setTimeout(triggerNextEvent, nextDelay)
    }

    // Spatial buffer: Pre-warms 450px before entering screen & sleeps when out of bounds
    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextVisible = entry.isIntersecting
        if (nextVisible && !isVisible) {
          isVisible = true
          const nextDelay = Math.floor(Math.random() * 1200) + 2000
          timeoutId = setTimeout(triggerNextEvent, nextDelay)
        } else if (!nextVisible && isVisible) {
          isVisible = false
          clearTimeout(timeoutId)
        }
      },
      { rootMargin: '1200px 0px 1200px 0px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    // Start the recursive delay loop
    const firstDelay = Math.floor(Math.random() * 1200) + 2000
    timeoutId = setTimeout(triggerNextEvent, firstDelay)

    // Force ScrollTrigger refresh once events populate and parent height is finalized
    const initRefresh = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(initRefresh)
      observer.disconnect()
    }
  }, [])

  const pathD = sparklineData
    .map((val, idx) => `${idx === 0 ? 'M' : 'L'} ${idx * 33.3} ${val}`)
    .join(' ')

  return (
    <section className="tracer-section" id="cards-stage" ref={containerRef}>
      {/* Atmospheric Ambient Soft Spotlight */}
      <div className="tracer-ambient-glow" />

      {/* 2-Column Responsive stage wrapper */}
      <div className="tracer-container">
        
        {/* Left Column: 2-Card Overlapping Stage */}
        <div className="tracer-stage">
          
          {/* FRONT CARD (Left Foreground - Event Stream) */}
          <div className="tracer-card-front">
            <div className={`tracer-timeline ${isShifting ? 'is-shifting-down' : 'idle-offset'}`}>
              {events.map((event, idx) => (
                <div key={event.id} className={`timeline-item item-${idx}`}>
                  {/* Left Side Timeline Connectors */}
                  <div className="timeline-left">
                    <div className={`timeline-icon-box ${event.status.toLowerCase()}`}>
                      {event.status === 'Completed' ? (
                        <Check size={12} className="icon-green" />
                      ) : (
                        <Terminal size={12} className="icon-blue" />
                      )}
                    </div>
                    {idx < events.length - 1 && <div className="timeline-connector-line" />}
                  </div>

                  {/* Right Side Event Information */}
                  <div className="timeline-right">
                    <div className="event-header-row">
                      <span className={`status-badge ${event.status.toLowerCase()}`}>
                        {event.status}
                      </span>
                      <div className="time-display-wrapper">
                        <Clock size={11} className="clock-icon" />
                        <span className="event-timestamp">{event.timestamp}</span>
                      </div>
                    </div>

                    <div className="event-sentence-row">
                      to user <span className="entity-pill">#{event.userId}</span> calling model{' '}
                      <span className="entity-pill">{event.model}</span>
                    </div>

                    <div className="event-sentence-row">
                      on region <span className="entity-pill"><Globe size={10} className="globe-inline" /> {event.region}</span> completed in{' '}
                      <span className="entity-pill latency">{event.latency}ms</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BACK CARD (Right Background - Live Telemetry Ticker) */}
          <div className="tracer-card-back">
            <div className="tracer-back-info">
              <span className="tracer-back-label">Engine Telemetry</span>
              <h3 className="tracer-back-title">{totalRequests.toLocaleString()}</h3>
              <span className="tracer-back-meta">Total Requests Processed Today</span>
            </div>

            {/* Center Sparkline Heartbeat */}
            <div className="tracer-sparkline-container">
              <svg viewBox="0 0 300 40" className="tracer-sparkline-svg">
                <path
                  d={pathD}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.12)"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="tracer-back-footer">
              <div className="tracer-back-stat">
                <span className="stat-num">All Nominal</span>
                <span className="stat-lbl">System SLA Status</span>
              </div>
              <div className="tracer-back-stat">
                <span className="stat-num">14.2ms</span>
                <span className="stat-lbl">Global Latency</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Ubuntu + Source Serif Copy Column */}
        <div className="tracer-text-column">
          <span className="tracer-tag">Mission Control</span>
          
          <h2 className="tracer-heading">
            Protron X powers millions of agent conversations daily.
          </h2>
          
          <p className="tracer-desc">
            An enterprise-grade orchestration layer for autonomous workflows. Specular edge gateway routing, millisecond-latency model failovers, and isolated sandboxed environments engineered for secure execution.
          </p>

          <div className="tracer-features-section">
            <span className="features-subhead">Core Features</span>
            
            <div className="tracer-features-grid">
              <div className="feature-card">
                <div className="feature-indicator" />
                <span className="feature-title">Durable Orchestration</span>
              </div>

              <div className="feature-card">
                <div className="feature-indicator" />
                <span className="feature-title">Sandboxed Environments</span>
              </div>

              <div className="feature-card">
                <div className="feature-indicator" />
                <span className="feature-title">AI Model Gateway</span>
              </div>

              <div className="feature-card">
                <div className="feature-indicator" />
                <span className="feature-title">Fluid Compute</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default RequestTracer
