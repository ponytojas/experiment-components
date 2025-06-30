import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HarmonicCircles from './components/HarmonicCircles'
import GeometricSymbol from './components/GeometricSymbol'
import Globe from './components/Globe'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='min-h-screen bg-neutral-900 flex flex-col items-center justify-center'>
      <HarmonicCircles />
      <GeometricSymbol />
      <Globe />
    </div>
  </StrictMode>,
)
