import { motion, useInView, type Variants } from 'framer-motion'
import { useRef } from 'react'

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
  duration?: number
  by?: 'char' | 'word'
  /** Trigger once on viewport entry, or animate immediately on mount */
  trigger?: 'mount' | 'inview'
}

/**
 * Per-character / per-word animated text reveal.
 * Each unit slides up from below with a stagger.
 * Foundation animation primitive — used everywhere typography reveals.
 */
export function SplitText({
  children,
  className,
  delay = 0,
  stagger = 0.035,
  duration = 0.9,
  by = 'char',
  trigger = 'mount',
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  const units = by === 'word'
    ? children.split(/(\s+)/)
    : Array.from(children)

  const shouldAnimate = trigger === 'mount' || isInView

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  }

  const child: Variants = {
    hidden: {
      y: '110%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      aria-label={children}
      style={{ display: 'inline-block', overflow: 'hidden' }}
    >
      {units.map((unit, i) => (
        <span
          key={`${unit}-${i}`}
          aria-hidden
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            whiteSpace: unit === ' ' ? 'pre' : 'normal',
          }}
        >
          <motion.span
            variants={child}
            style={{ display: 'inline-block' }}
          >
            {unit === ' ' ? ' ' : unit}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
