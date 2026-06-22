import { useEffect, useState } from 'react'

const QUERY = '(max-width: 768px)'

/**
 * True on phone-sized viewports. Lets App swap the desktop StudioRoom (a
 * pointer/landscape, scroll-locked experience) for a dedicated touch home.
 *
 * Read synchronously at init so the very first client render already picks the
 * right tree (the app client-renders over the prerendered HTML — no hydration
 * mismatch — so there's no desktop→mobile flash for real users). The listener
 * keeps it correct across rotation / resize; setState lives in the change
 * callback, not the effect body.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const onChange = () => setIsMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return isMobile
}
