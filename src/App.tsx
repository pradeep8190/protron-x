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
  return (
    <SmoothScroll>
      <Navbar />
      <Home />
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
  )
}

export default App
