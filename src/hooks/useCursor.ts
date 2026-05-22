import { useEffect, useRef, useState } from 'react'

/**
 * Custom-cursor lifecycle hook.
 *
 * Returns a ref to attach to the cursor element and a `state`:
 *   'idle'   — default 6px reactor dot
 *   'hover'  — liquid-glass disc whenever the mouse is over an interactive
 *              element (a, button, or anything with [data-hover])
 *
 * NO text labels. The cursor never carries copy — just shape and material.
 */
export type CursorState = 'idle' | 'hover'

export function useCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<CursorState>('idle')
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      target.current = { x: e.clientX, y: e.clientY }
    }

    function handleOver(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest('a, button, [data-hover]')
      if (el) setState('hover')
    }

    function handleOut(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest('a, button, [data-hover]')
      if (el) setState('idle')
    }

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseout', handleOut)

    let raf: number
    function animate() {
      // Heavy lerp gives the cursor weight — feels physical
      pos.current.x += (target.current.x - pos.current.x) * 0.2
      pos.current.y += (target.current.y - pos.current.y) * 0.2
      if (cursorRef.current) {
        // No centering — the arrow's tip is at (0,0), so this puts the tip
        // at the actual mouse position. The hover-disc handles its own
        // centering via transform translate(-50%, -50%) in CSS.
        cursorRef.current.style.transform =
          `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  return { cursorRef, state }
}
