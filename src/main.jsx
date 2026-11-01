import { domAnimation, LazyMotion } from 'motion/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/cormorant-garamond/300.css'
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/300-italic.css'
import '@fontsource/cormorant-garamond/400-italic.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource/jost/300.css'
import '@fontsource/jost/400.css'
import '@fontsource/jost/500.css'
// Arabic: subset files only, with unicode-range, so FR/EN visitors never download them.
import '@fontsource/noto-naskh-arabic/arabic-400.css'
import '@fontsource/noto-naskh-arabic/arabic-500.css'
import '@fontsource/noto-sans-arabic/arabic-300.css'
import '@fontsource/noto-sans-arabic/arabic-400.css'
import '@fontsource/noto-sans-arabic/arabic-500.css'
import './index.css'
import App from './App.jsx'
import { initTheme } from './components/ui/ThemeToggle'
import { LangProvider } from './i18n'
import { prefersReducedMotion } from './lib/motion'

initTheme()
if (!prefersReducedMotion()) import('./lib/smoothScroll').then((m) => m.startSmoothScroll())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LazyMotion features={domAnimation} strict>
      <LangProvider>
        <App />
      </LangProvider>
    </LazyMotion>
  </StrictMode>,
)
