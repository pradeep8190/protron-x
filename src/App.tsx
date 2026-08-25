import { useState, useEffect, useCallback } from 'react'
import { Preloader } from './components/preloader'
import { Navbar } from './components/navbar'
import { Home } from './components/home'
import { ShowcaseSection } from './components/showcase'
import { PipelineSection } from './components/pipeline'
import { SdkSection } from './components/sdk'
import { RequestTracer } from './components/request-tracer'
import { EdgeMeshSection } from './components/edge-mesh'
import { CostCalculatorSection } from './components/cost-calculator'
import { TestimonialsSection } from './components/testimonials'
import { PreFooterSection } from './components/pre-footer'
import { Footer } from './components/footer'
import { SmoothScroll } from './components/common/SmoothScroll'

function App() {
  const [isHeroReady, setIsHeroReady] = useState(false)
  const [preloaderDone, setPreloaderDone] = useState(false)

  useEffect(() => {
    // Lock scroll during preloader experience
    if (!preloaderDone) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [preloaderDone])

  const handleCurtainOpen = useCallback(() => {
    setIsHeroReady(true)
  }, [])

  const handleComplete = useCallback(() => {
    setPreloaderDone(true)
  }, [])

  return (
    <>
      {!preloaderDone && (
        <Preloader
          onCurtainOpen={handleCurtainOpen}
          onComplete={handleComplete}
        />
      )}
      <SmoothScroll>
        <Navbar isReady={isHeroReady} />
        <Home isReady={isHeroReady} />
        <ShowcaseSection />
        <PipelineSection />
        <SdkSection />
        <RequestTracer />
        <EdgeMeshSection />
        <CostCalculatorSection />
        <TestimonialsSection />
        <PreFooterSection />
        <Footer />
      </SmoothScroll>
    </>
  )
}

export default App
