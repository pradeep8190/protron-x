import React, { useEffect, useRef, useCallback } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AppleAcousticEngine } from './audioEngine'
import './PrecisionDial.css'

interface PrecisionDialProps {
  value: number
  min?: number
  max?: number
  step?: number
  unitLabel?: string
  onChange: (val: number) => void
}

export const PrecisionDial: React.FC<PrecisionDialProps> = ({
  value,
  min = 1,
  max = 100,
  onChange,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const needleRef = useRef<HTMLDivElement>(null)

  // Audio Engine Instance
  const audioEngineRef = useRef<AppleAcousticEngine | null>(null)
  if (!audioEngineRef.current) {
    audioEngineRef.current = new AppleAcousticEngine(0.24)
  }

  // Exact Transposed Vertical Physics Engine
  const tickGap = 26 // Vertical distance between sequential month ticks
  const currentOffsetRef = useRef(-value * tickGap)
  const velocityRef = useRef(0)
  const isDraggingRef = useRef(false)
  const startYRef = useRef(0)
  const dragStartOffsetRef = useRef(0)
  const lastDragYRef = useRef(0)
  const lastDragTimeRef = useRef(0)
  const dragVelocitiesRef = useRef<number[]>([])
  const lastTickValRef = useRef(value)

  // Virtual Windowing Pool (51 ticks)
  const poolSize = 51
  const poolHalf = Math.floor(poolSize / 2)
  const tickPoolRef = useRef<Array<{ el: HTMLDivElement; numberEl: HTMLDivElement; lineEl: HTMLDivElement }>>([])

  const triggerVisualKick = useCallback(() => {
    // No bounce - keep needle and display locked in position
  }, [])

  // Create Virtual DOM Elements inside the track
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    track.innerHTML = ''
    tickPoolRef.current = []

    for (let i = 0; i < poolSize; i++) {
      const el = document.createElement('div')
      el.className = 'v-tick-unit'
      el.innerHTML = `
        <div class="v-tick-number"></div>
        <div class="v-tick-line"></div>
      `
      track.appendChild(el)
      tickPoolRef.current.push({
        el,
        numberEl: el.querySelector('.v-tick-number') as HTMLDivElement,
        lineEl: el.querySelector('.v-tick-line') as HTMLDivElement,
      })
    }
  }, [])

  // Bind Mouse, Touch, Wheel, and Arrow Listeners for Vertical Drag
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const startDrag = (clientY: number) => {
      audioEngineRef.current?.unlockAudio()
      isDraggingRef.current = true
      startYRef.current = clientY
      dragStartOffsetRef.current = currentOffsetRef.current
      lastDragYRef.current = clientY
      lastDragTimeRef.current = performance.now()
      velocityRef.current = 0
      dragVelocitiesRef.current = []
    }

    const moveDrag = (clientY: number) => {
      if (!isDraggingRef.current) return
      const now = performance.now()
      const dt = Math.max(1, now - lastDragTimeRef.current)
      const dy = clientY - lastDragYRef.current

      const instVel = dy / dt
      dragVelocitiesRef.current.push(instVel)
      if (dragVelocitiesRef.current.length > 5) dragVelocitiesRef.current.shift()

      lastDragYRef.current = clientY
      lastDragTimeRef.current = now

      const totalDy = clientY - startYRef.current
      const newOffset = dragStartOffsetRef.current + totalDy

      // Soft clamp bounds
      const minOffset = -max * tickGap - 80
      const maxOffset = -min * tickGap + 80
      currentOffsetRef.current = Math.max(minOffset, Math.min(maxOffset, newOffset))
    }

    const endDrag = () => {
      if (!isDraggingRef.current) return
      isDraggingRef.current = false

      let avgVel = 0
      if (dragVelocitiesRef.current.length > 0) {
        avgVel = dragVelocitiesRef.current.reduce((a, b) => a + b, 0) / dragVelocitiesRef.current.length
      }
      velocityRef.current = avgVel * 18
    }

    // Touch (strictly isolated from page scrolling)
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.stopPropagation()
        startDrag(e.touches[0].clientY)
      }
    }
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0 && isDraggingRef.current) {
        e.preventDefault()
        e.stopPropagation()
        moveDrag(e.touches[0].clientY)
      }
    }
    const onTouchEnd = () => endDrag()

    wrapper.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('touchcancel', onTouchEnd, { passive: true })

    // Mouse
    const onMouseDown = (e: MouseEvent) => startDrag(e.clientY)
    const onMouseMove = (e: MouseEvent) => moveDrag(e.clientY)
    const onMouseUp = () => endDrag()

    wrapper.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    // Wheel Scroll (Natural Vertical Wheel - strictly isolated from page scroll)
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
      audioEngineRef.current?.unlockAudio()
      velocityRef.current -= e.deltaY * 0.45
    }
    wrapper.addEventListener('wheel', onWheel, { passive: false })

    // Arrow Keys (Up/Down)
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        audioEngineRef.current?.unlockAudio()
        currentOffsetRef.current = Math.max(-max * tickGap, currentOffsetRef.current - tickGap)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        audioEngineRef.current?.unlockAudio()
        currentOffsetRef.current = Math.min(-min * tickGap, currentOffsetRef.current + tickGap)
      }
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      wrapper.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)

      wrapper.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)

      wrapper.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [min, max, tickGap])

  // Continuous Vertical 3D Optical Barrel Loop with Viewport Culling
  useEffect(() => {
    let animId: number
    let isVisible = true

    // Spatial buffer: Pre-warms 450px before entering screen & sleeps when out of bounds
    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextVisible = entry.isIntersecting
        if (nextVisible && !isVisible) {
          isVisible = true
          animId = requestAnimationFrame(render)
        } else if (!nextVisible && isVisible) {
          isVisible = false
          cancelAnimationFrame(animId)
        }
      },
      { rootMargin: '1200px 0px 1200px 0px' }
    )

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current)
    }

    const render = () => {
      if (!isVisible) return

      // 1. Inertia & Clamping
      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > 0.08) {
          currentOffsetRef.current += velocityRef.current
          velocityRef.current *= 0.91

          const minOffset = -max * tickGap
          const maxOffset = -min * tickGap
          if (currentOffsetRef.current < minOffset) {
            currentOffsetRef.current += (minOffset - currentOffsetRef.current) * 0.25
            velocityRef.current *= 0.6
          } else if (currentOffsetRef.current > maxOffset) {
            currentOffsetRef.current += (maxOffset - currentOffsetRef.current) * 0.25
            velocityRef.current *= 0.6
          }
        } else {
          // Magnetic Apple Spring Snapping
          const rawTick = -Math.round(currentOffsetRef.current / tickGap)
          const clampedTick = Math.max(min, Math.min(max, rawTick))
          const snapTargetOffset = -clampedTick * tickGap
          const springDiff = snapTargetOffset - currentOffsetRef.current
          currentOffsetRef.current += springDiff * 0.22
          velocityRef.current = 0
        }
      }

      // 2. Exact Center Tick Value & Acoustic Sound
      const rawCenterIndex = -Math.round(currentOffsetRef.current / tickGap)
      const currentTickValue = Math.max(min, Math.min(max, rawCenterIndex))

      if (currentTickValue !== lastTickValRef.current) {
        lastTickValRef.current = currentTickValue
        const isMajor = currentTickValue % 5 === 0
        const speed = Math.abs(velocityRef.current)
        audioEngineRef.current?.playTick(isMajor, Math.max(0.6, speed * 0.15))
        triggerVisualKick()
        onChange(currentTickValue)
      }

      // 3. Vertical 3D Optical Barrel Projection (inside 380px vertical stage)
      const viewportHalf = 175

      if (tickPoolRef.current.length === poolSize) {
        for (let p = 0; p < poolSize; p++) {
          const offsetFromCenter = p - poolHalf
          const tickValue = currentTickValue + offsetFromCenter

          const tickPixelY = tickValue * tickGap + currentOffsetRef.current
          const distFromCenter = Math.abs(tickPixelY)

          const poolItem = tickPoolRef.current[p]
          const el = poolItem.el

          // Outside bounds
          if (distFromCenter > viewportHalf || tickValue < min || tickValue > max) {
            el.style.opacity = '0'
            el.style.transform = `translate3d(0, ${tickPixelY}px, -100px) scale(0)`
            continue
          }

          const isMajor = tickValue % 5 === 0
          el.className = `v-tick-unit${isMajor ? ' major' : ''}`
          poolItem.numberEl.textContent = ''
          poolItem.numberEl.style.display = 'none'

          // Exact 3D Optical Barrel Math
          const normDist = distFromCenter / viewportHalf
          const angleRad = Math.min(1.4, normDist * (Math.PI / 2.3))

          const scale = Math.max(0.65, Math.cos(angleRad) * 1.15)
          const zDepth = Math.cos(angleRad) * 35 - 35
          const rotateX = (tickPixelY > 0 ? -1 : 1) * Math.sin(angleRad) * 30

          // Smooth edge fade towards glass capsule boundary
          const edgeFade = Math.pow(Math.max(0.0, 1.0 - normDist), 0.7)
          const opacity = Math.min(1.0, edgeFade * Math.cos(angleRad) * 1.2)

          el.style.transform = `translate3d(0, ${tickPixelY}px, ${zDepth}px) rotateX(${rotateX}deg) scale(${scale})`
          el.style.opacity = `${Math.max(0.0, opacity)}`

          // Reset manual inline styles
          poolItem.lineEl.style.width = ''
          poolItem.lineEl.style.height = ''
          poolItem.lineEl.style.opacity = ''

          el.className = `v-tick-unit ${isMajor ? 'major' : 'minor'}`

          if (tickValue === currentTickValue) {
            el.classList.add('selected', 'active')
          } else if (tickValue < currentTickValue) {
            el.classList.add('active')
            el.classList.remove('selected')
          } else {
            el.classList.remove('active', 'selected')
          }
        }
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    // Force ScrollTrigger to refresh once the ruler scale renders
    const dialRefresh = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    return () => {
      cancelAnimationFrame(animId)
      clearTimeout(dialRefresh)
      observer.disconnect()
    }
  }, [min, max, tickGap, poolHalf, poolSize, onChange, triggerVisualKick])

  return (
    <div className="v-dial-container" data-lenis-prevent="true" aria-label="Vertical Infinite Precision Dial">
      {/* 3D Optical Vertical Barrel Ruler Stage */}
      <div className="v-ruler-stage" data-lenis-prevent="true">
        {/* Center Needle (▶) on the left side pointing right */}
        <div className="v-center-needle-anchor">
          <div className="v-needle-glow-spot" />
          <div ref={needleRef} className="v-needle-triangle" />
        </div>

        {/* Ruler Track */}
        <div ref={wrapperRef} className="v-ruler-wrapper" data-lenis-prevent="true">
          <div ref={trackRef} className="v-ruler-track" />
        </div>
      </div>
    </div>
  )
}

export default PrecisionDial
