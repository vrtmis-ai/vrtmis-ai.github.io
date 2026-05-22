import { useEffect, useRef } from 'react'
import styles from './Reactor.module.css'

/**
 * Reactor — a tiny SVG crosshair that floats in a corner and tracks the cursor
 * subtly. Appears only when the user scrolls past the hero. Never demands
 * attention. A small "the machine is watching" beacon, not a centerpiece.
 */
export function Reactor() {
  const ref = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      // Normalize position relative to the reactor's anchor (bottom-right corner)
      const w = window.innerWidth
      const h = window.innerHeight
      target.current = {
        x: ((e.clientX / w) - 0.5) * 8,  // ±4px pull
        y: ((e.clientY / h) - 0.5) * 8,
      }
    }

    let raf: number
    function animate() {
      pos.current.x += (target.current.x - pos.current.x) * 0.12
      pos.current.y += (target.current.y - pos.current.y) * 0.12
      if (ref.current) {
        ref.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      }
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMove)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className={styles.reactor} aria-hidden>
      <svg viewBox="0 0 64 64" width="40" height="40">
        {/* Outer circle */}
        <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        {/* Inner dot */}
        <circle cx="32" cy="32" r="2.5" fill="currentColor" />
        {/* Crosshair lines */}
        <line x1="32" y1="6"  x2="32" y2="18" stroke="currentColor" strokeWidth="1" />
        <line x1="32" y1="46" x2="32" y2="58" stroke="currentColor" strokeWidth="1" />
        <line x1="6"  y1="32" x2="18" y2="32" stroke="currentColor" strokeWidth="1" />
        <line x1="46" y1="32" x2="58" y2="32" stroke="currentColor" strokeWidth="1" />
        {/* Corner ticks */}
        <path d="M 12 12 L 18 12 L 18 18" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M 52 12 L 46 12 L 46 18" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M 12 52 L 18 52 L 18 46" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M 52 52 L 46 52 L 46 46" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span className={styles.label}>REACTOR · ARTEMIS</span>
    </div>
  )
}
