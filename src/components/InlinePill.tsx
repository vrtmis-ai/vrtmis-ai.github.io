import type { ReactNode } from 'react'
import styles from './InlinePill.module.css'

interface InlinePillProps {
  children: ReactNode
  /** Visual variant:
   *   'stamp'     — small reactor outline pill, mono caps (geographic/version stamp)
   *   'highlight' — solid reactor block behind a word (typographic emphasis)
   */
  variant?: 'stamp' | 'highlight'
}

/**
 * InlinePill — a small typographic mark that sits inline with prose.
 *
 * Two flavours:
 *   stamp     — "What I do [on a good day]"    a tiny reactor-outline stamp
 *               at the end of a heading. Mono-caps, witty caption energy.
 *   highlight — "fall in love with [what they make possible]"  a solid
 *               reactor block hugging a few words, like a yellow highlighter
 *               but in editorial orange. Same font/size as the surrounding
 *               text — emphasis, not decoration.
 *
 * No images, no assets needed. Pure CSS + type.
 */
export function InlinePill({ children, variant = 'stamp' }: InlinePillProps) {
  return (
    <span className={`${styles.pill} ${styles[variant]}`}>{children}</span>
  )
}
