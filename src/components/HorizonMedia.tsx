import { useEffect, useRef, useState } from 'react'
import styles from './Work.module.css'

interface HorizonMediaProps {
  /** Path relative to /public. Extension determines render mode:
   *    .mp4 / .webm / .mov  →  <video>
   *    .gif / .jpg / .webp  →  <img>
   */
  src: string
  /** Video only: keep looping. Default false → plays once, holds last frame. */
  loop?: boolean
}

const VIDEO_EXTS = ['mp4', 'webm', 'mov', 'm4v']

/**
 * HorizonMedia — single foreground element for the Work-end horizon slot.
 *
 * Auto-detects video vs image/GIF from the file extension. For videos, uses
 * an IntersectionObserver so the clip only starts playing when the slot is
 * actually visible — important because the horizon lives at the end of a
 * long horizontal scroll. Without this, autoplay would begin off-screen and
 * the user might miss it.
 *
 * If the file 404s, the component renders nothing and the placeholder
 * overlay beneath shows through.
 */
export function HorizonMedia({ src, loop = false }: HorizonMediaProps) {
  const ext = src.split('.').pop()?.toLowerCase() ?? ''
  const isVideo = VIDEO_EXTS.includes(ext)
  const videoRef = useRef<HTMLVideoElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [missing, setMissing] = useState(false)

  /** Play the video only when the slot enters the viewport */
  useEffect(() => {
    if (!isVideo || !videoRef.current) return
    const video = videoRef.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => { /* autoplay may be blocked; we tried */ })
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [isVideo])

  // If the asset 404s, render nothing so the placeholder under it shows through
  if (missing) return null

  if (isVideo) {
    return (
      <video
        ref={videoRef}
        className={styles.horizonImg}
        src={src}
        muted
        loop={loop}
        playsInline
        preload="metadata"
        onError={() => setMissing(true)}
      />
    )
  }

  return (
    <img
      ref={imgRef}
      className={styles.horizonImg}
      src={src}
      alt=""
      loading="lazy"
      onError={() => setMissing(true)}
    />
  )
}
