import { useEffect, useState } from 'react'

/**
 * Tracks normalized mouse position (-1 to 1 range).
 * Used for parallax effects on the 3D object.
 */
export function useMousePosition() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return mouse
}
