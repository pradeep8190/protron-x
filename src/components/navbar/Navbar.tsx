import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Navbar.css'

export const Navbar: React.FC<{ isReady?: boolean }> = ({ isReady = true }) => {
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!isReady) return

    // Premium Apple-grade slide-down fade-in on mount / curtain open
    // CSS already sets opacity:0 + translateY(-16px)
    gsap.to(
      headerRef.current,
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.1 }
    )
  }, [isReady])

  return (
    <header ref={headerRef} className="navbar-header">
      <div className="navbar-container">
        {/* Left Side: Brand + 2 Links */}
        <div className="navbar-left-group">
          <a href="/" className="navbar-brand" aria-label="Protron X Home">
            <span className="navbar-brand-name">Protron X</span>
          </a>

          <nav className="navbar-left-links" aria-label="Main Navigation">
            <a href="#features" className="nav-link">
              Features
            </a>
            <a href="#docs" className="nav-link">
              Docs
            </a>
          </nav>
        </div>

        {/* Right Side */}
        <div className="navbar-right-group">
          <a href="#changelog" className="nav-link">
            Changelog
          </a>
          <a href="#signin" className="nav-signin-btn">
            Sign In
          </a>
        </div>
      </div>
    </header>
  )
}

export default Navbar
