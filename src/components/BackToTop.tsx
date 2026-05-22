import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import styles from './BackToTop.module.css'

/**
 * BackToTop — fixed bottom-right widget.
 *
 * Four orange hairline corner brackets (top-left, top-right, bottom-left,
 * bottom-right) that DRAW THEMSELVES IN as the user scrolls past the hero.
 * Each bracket appears at its own threshold:
 *   25% scroll  →  top-left bracket
 *   50% scroll  →  top-right bracket
 *   75% scroll  →  bottom-right bracket
 *   100% scroll →  bottom-left bracket (frame complete)
 *
 * Up-arrow glyph fades in when the frame is past 50%. Click → smooth scroll.
 *
 * Cubic-bezier(0.32, 0.72, 0, 1) for the spring settle on each bracket draw.
 */
export function BackToTop() {
  // Track total page scroll progress (0 at top, 1 at bottom)
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // The whole widget fades in once user scrolls past hero (15%)
  const widgetOpacity = useTransform(smooth, [0, 0.12, 0.18], [0, 0, 1])

  // Each bracket's stroke-dashoffset = 0 at its activation threshold
  const brTL = useTransform(smooth, [0.05, 0.25], [40, 0]) // top-left
  const brTR = useTransform(smooth, [0.25, 0.50], [40, 0]) // top-right
  const brBR = useTransform(smooth, [0.50, 0.75], [40, 0]) // bottom-right
  const brBL = useTransform(smooth, [0.75, 1.00], [40, 0]) // bottom-left

  // Arrow + label fade in once the frame is half-built
  const arrowOpacity = useTransform(smooth, [0.4, 0.55], [0, 1])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.button
      type="button"
      onClick={scrollToTop}
      className={styles.widget}
      style={{ opacity: widgetOpacity }}
      aria-label="Back to top"
    >
      <svg
        className={styles.svg}
        viewBox="0 0 56 56"
        width="56"
        height="56"
        aria-hidden
      >
        {/* TOP-LEFT bracket — horizontal then vertical line meeting at (2,2) */}
        <motion.path
          d="M 2 18 L 2 2 L 18 2"
          stroke="var(--reactor)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="square"
          strokeDasharray="40"
          style={{ strokeDashoffset: brTL }}
        />

        {/* TOP-RIGHT bracket */}
        <motion.path
          d="M 38 2 L 54 2 L 54 18"
          stroke="var(--reactor)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="square"
          strokeDasharray="40"
          style={{ strokeDashoffset: brTR }}
        />

        {/* BOTTOM-RIGHT bracket */}
        <motion.path
          d="M 54 38 L 54 54 L 38 54"
          stroke="var(--reactor)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="square"
          strokeDasharray="40"
          style={{ strokeDashoffset: brBR }}
        />

        {/* BOTTOM-LEFT bracket */}
        <motion.path
          d="M 18 54 L 2 54 L 2 38"
          stroke="var(--reactor)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="square"
          strokeDasharray="40"
          style={{ strokeDashoffset: brBL }}
        />

        {/* Up-arrow inside the frame (visible once half-drawn) */}
        <motion.g style={{ opacity: arrowOpacity }}>
          <line x1="28" y1="36" x2="28" y2="20" stroke="var(--reactor)" strokeWidth="1.5" strokeLinecap="square" />
          <line x1="22" y1="26" x2="28" y2="20" stroke="var(--reactor)" strokeWidth="1.5" strokeLinecap="square" />
          <line x1="34" y1="26" x2="28" y2="20" stroke="var(--reactor)" strokeWidth="1.5" strokeLinecap="square" />
        </motion.g>
      </svg>

      {/* Tiny label below — only visible after half-draw */}
      <motion.span className={`t-label ${styles.label}`} style={{ opacity: arrowOpacity }}>
        Top
      </motion.span>
    </motion.button>
  )
}
