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
 *
 * For `by='char'` we wrap characters in a per-word `inline-block` group so
 * the browser can't break a word in the middle (the old behaviour: every
 * char was its own inline-block, which let "Ghorbani" wrap as "Ghorban|i").
 * Words can still wrap to a new line — only the chars inside a word are
 * forced to stay together.
 *
 * For `by='word'` each word is its own animated unit (no per-char reveal).
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
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: { duration, ease: [0.16, 1, 0.3, 1] },
    },
  }

  // Tokenise: split on whitespace, keep the spaces. Each token is either a
  // word (any run of non-whitespace) or a whitespace run.
  const tokens = children.split(/(\s+)/)

  // Global per-char index so the stagger flows continuously across the whole
  // string (not restarting at each word boundary)
  let charIndex = 0

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      aria-label={children}
      style={{ display: 'inline' }}
    >
      {tokens.map((token, tokenIdx) => {
        // Whitespace token — render as a literal space so words can wrap here
        if (/^\s+$/.test(token)) {
          return (
            <span key={`ws-${tokenIdx}`} aria-hidden>{token}</span>
          )
        }

        // by='word' — animate the whole word as one unit
        if (by === 'word') {
          return (
            <span
              key={`w-${tokenIdx}`}
              aria-hidden
              style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
            >
              <motion.span variants={child} style={{ display: 'inline-block' }}>
                {token}
              </motion.span>
            </span>
          )
        }

        // by='char' — each char animates individually, but they live inside a
        // word-level inline-block with whiteSpace:nowrap so the WORD never breaks.
        return (
          <span
            key={`w-${tokenIdx}`}
            aria-hidden
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              verticalAlign: 'bottom',
            }}
          >
            {Array.from(token).map((ch, chIdxInWord) => {
              const idx = charIndex++
              return (
                <span
                  key={`c-${idx}-${chIdxInWord}`}
                  style={{ display: 'inline-block', overflow: 'hidden' }}
                >
                  <motion.span variants={child} style={{ display: 'inline-block' }}>
                    {ch}
                  </motion.span>
                </span>
              )
            })}
          </span>
        )
      })}
    </motion.span>
  )
}
