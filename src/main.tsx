import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HarmonicCircles from './components/HarmonicCircles'
import GeometricSymbol from './components/GeometricSymbol'
import Globe from './components/Globe'
import RadialGraph from './components/RadialGraph'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="relative min-h-screen w-screen bg-[url('/assets/ditherBus.png')] bg-center bg-no-repeat bg-fixed bg-cover">
      <div className="absolute inset-0 bg-neutral-900 opacity-85 pointer-events-none z-0" />
      <div className="relative z-10 flex flex-col items-center justify-start w-full overflow-y-auto py-8">
        <HarmonicCircles />
        <GeometricSymbol />
        <RadialGraph />
        <Globe />
      </div>
    </div>
  </StrictMode>,
)