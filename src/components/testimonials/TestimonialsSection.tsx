import React, { useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { COMPANY_TESTIMONIALS } from './companyData'
import { BrandIcon } from './BrandIcons'
import { WaveRibbon } from './WaveRibbon'
import './TestimonialsSection.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export const TestimonialsSection: React.FC = () => {
  const [activeCompanyId, setActiveCompanyId] = useState('vercel')
  const [isPaused, setIsPaused] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const chamberRef = useRef<HTMLDivElement>(null)
  const quoteDisplayRef = useRef<HTMLDivElement>(null)
  const quoteTextRef = useRef<HTMLParagraphElement>(null)
  const authorAvatarRef = useRef<HTMLDivElement>(null)
  const authorInfoRef = useRef<HTMLDivElement>(null)

  const activeProof =
    COMPANY_TESTIMONIALS.find((c) => c.id === activeCompanyId) || COMPANY_TESTIMONIALS[0]

  const handleSelectCompany = (id: string) => {
    if (id === activeCompanyId) return

    const qText = quoteTextRef.current
    const aAvatar = authorAvatarRef.current
    const aInfo = authorInfoRef.current

    if (qText && aAvatar && aInfo) {
      gsap.killTweensOf([qText, aAvatar, aInfo])

      const tl = gsap.timeline({
        onComplete: () => {
          setActiveCompanyId(id)

          gsap.fromTo(
            qText,
            {
              opacity: 0,
              y: 16,
              filter: 'blur(8px)',
            },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.5,
              ease: 'power3.out',
            }
          )

          gsap.fromTo(
            aAvatar,
            {
              opacity: 0,
              scale: 0.86,
              filter: 'blur(4px)',
            },
            {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.45,
              delay: 0.06,
              ease: 'back.out(1.3)',
            }
          )

          gsap.fromTo(
            aInfo,
            {
              opacity: 0,
              y: 8,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              delay: 0.1,
              ease: 'power3.out',
            }
          )
        },
      })

      tl.to(qText, {
        opacity: 0,
        y: -10,
        filter: 'blur(6px)',
        duration: 0.25,
        ease: 'power2.in',
      })

      tl.to(
        [aAvatar, aInfo],
        {
          opacity: 0,
          y: -6,
          duration: 0.2,
          ease: 'power2.in',
        },
        0.05
      )
    } else {
      setActiveCompanyId(id)
    }
  }

  return (
    <section ref={sectionRef} className="testimonials-track" id="social-proof">
      {/* Pinned 100vh White Chamber */}
      <div ref={chamberRef} className="testimonials-sticky-chamber">
        <div className="white-stage-ambient-light" />

        {/* Main Content: 100% visible and un-clipped */}
        <div className="testimonials-container">
          {/* Header */}
          <div className="testimonials-header">
            <h2 className="testimonials-title title-light">
              Trusted by the fastest shipping teams.
            </h2>

            <p className="testimonials-subtitle subtitle-light">
              Leading engineering organizations build on the complete stack for AI.
            </p>
          </div>

          {/* Master Proof Layout */}
          <div className="proof-chamber-wrapper">
            {/* Dynamic Sine-Wave Logo Ribbon */}
            <WaveRibbon
              activeId={activeCompanyId}
              onSelectCompany={handleSelectCompany}
              isPaused={isPaused}
              setIsPaused={setIsPaused}
              theme="light"
            />

            {/* Clean Floating Minimalist Quote & Author */}
            <div ref={quoteDisplayRef} className="active-proof-display proof-light">
              <p ref={quoteTextRef} className="proof-quote-text quote-light">
                "{activeProof.quote}"
              </p>

              <div className="proof-author-row">
                <div ref={authorAvatarRef} className="proof-avatar-orb avatar-light">
                  <BrandIcon id={activeProof.id} size={18} />
                </div>

                <div ref={authorInfoRef} className="proof-author-meta">
                  <span className="proof-author-name name-light">{activeProof.author}</span>
                  <span className="proof-author-role role-light">{activeProof.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
