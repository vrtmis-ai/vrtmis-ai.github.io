import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

/**
 * Initializes Lenis smooth scroll and returns scroll progress (0-1).
 * Also exposes the Lenis instance for external control.
 */
export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = lenis

    lenis.on('scroll', (e: { progress: number; scroll: number }) => {
      setScrollProgress(e.progress)
      setScrollY(e.scroll)
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return { scrollProgress, scrollY, lenis: lenisRef }
}
