import React from 'react'
import { BackgroundGlow } from './BackgroundGlow'
import { HeroHeader } from './HeroHeader'
import { FloatingStatusCards } from './FloatingStatusCards'
import { CodeTerminal } from './CodeTerminal'

export const Home: React.FC<{ isReady?: boolean }> = ({ isReady = true }) => {
  return (
    <main
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#000000',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0',
        margin: '0',
        boxSizing: 'border-box',
      }}
    >
      {/* Background Ambient Glow, Spotlight & Grid Layer */}
      <BackgroundGlow />

      {/* Floating Status Badges ("AI Gateway" & "Vector DB") */}
      <FloatingStatusCards isReady={isReady} />

      {/* Hero Header Area (Badge & Title) */}
      <div
        style={{
          position: 'relative',
          zIndex: 15,
          width: '100%',
          maxWidth: '1100px',
          padding: '6rem 1.5rem 2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: '1',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div style={{ pointerEvents: 'auto' }}>
          <HeroHeader isReady={isReady} />
        </div>
      </div>

      {/* Bottom Anchored Terminal Window touching the bottom edge */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          width: '100%',
          maxWidth: '720px',
          padding: '0 1.5rem',
          display: 'flex',
          justifyContent: 'center',
          marginTop: 'auto',
          pointerEvents: 'auto',
        }}
      >
        <CodeTerminal isReady={isReady} />
      </div>
    </main>
  )
}

export default Home
