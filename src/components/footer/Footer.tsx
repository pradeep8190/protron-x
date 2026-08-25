import React from 'react'
import { SiGithub, SiX, SiDiscord } from 'react-icons/si'
import './Footer.css'

export const Footer: React.FC = () => {
  return (
    <footer className="footer-wrapper" role="contentinfo">
      {/* Top Ambient Spotlight Shaft */}
      <div className="footer-ambient-shaft" aria-hidden="true" />

      <div className="footer-container">
        {/* 4-Column Navigation Links */}
        <div className="footer-nav-grid">
          {/* Column 1: Product */}
          <div className="footer-nav-col">
            <span className="footer-col-title">Product</span>
            <a href="#features" className="footer-nav-link">Features</a>
            <a href="#pipeline" className="footer-nav-link">Live Pipeline</a>
            <a href="#docs" className="footer-nav-link">SDKs & Runtimes</a>
            <a href="#changelog" className="footer-nav-link">Changelog</a>
          </div>

          {/* Column 2: Engines */}
          <div className="footer-nav-col">
            <span className="footer-col-title">Engines</span>
            <a href="#supabase" className="footer-nav-link">Supabase Data Layer</a>
            <a href="#render" className="footer-nav-link">Render Compute Core</a>
            <a href="#resend" className="footer-nav-link">Resend Delivery Mesh</a>
            <a href="#edge" className="footer-nav-link">Global Edge Routing</a>
            <a href="#vault" className="footer-nav-link">Secret Vault Sync</a>
          </div>

          {/* Column 3: Resources */}
          <div className="footer-nav-col">
            <span className="footer-col-title">Resources</span>
            <a href="#docs" className="footer-nav-link">Documentation</a>
            <a href="#api" className="footer-nav-link">API Reference</a>
            <a href="#guides" className="footer-nav-link">Architecture Guides</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-nav-link">GitHub SDK</a>
            <a href="#status" className="footer-nav-link">System Status</a>
          </div>

          {/* Column 4: Company */}
          <div className="footer-nav-col">
            <span className="footer-col-title">Company</span>
            <a href="#about" className="footer-nav-link">About Protron</a>
            <a href="#blog" className="footer-nav-link">Engineering Blog</a>
            <a href="#security" className="footer-nav-link">Security & Compliance</a>
            <a href="#privacy" className="footer-nav-link">Privacy Policy</a>
            <a href="#terms" className="footer-nav-link">Terms of Service</a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-brand-meta">
            <img src="/logo.png" alt="Protron X" className="footer-brand-logo" />
            <span className="footer-brand-name">Protron X</span>
          </div>

          <span className="footer-copyright">
            © 2026 Protron X Technologies Inc. All rights reserved.
          </span>

          <div className="footer-social-links">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="GitHub">
              <SiGithub size={16} />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="X">
              <SiX size={14} />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="Discord">
              <SiDiscord size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
