import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import styles from './NowPlaying.module.css'

/**
 * Now Playing — "what I'm working on this week".
 * The user updates this manually. Adds a sense of life and currency to the site.
 *
 * Layout: small "REC" indicator + label + current piece's title + supporting info.
 * Edit the constants below to update.
 */

const NOW = {
  // Manually update — keep this fresh.
  title: 'Stage mapping for Eslami Theatre',
  client: 'Mr. Parsaei · Theatre Project',
  status: 'Pre-production',
  week: '21 / 2026',
  detail: 'Designing the projection plan for a 3-act stage. Real-time TouchDesigner cues triggered by audio markers. AI passes for set extension.',
}

export function NowPlaying() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' })

  return (
    <section ref={sectionRef} className={styles.section}>
      <motion.div
        className={styles.frame}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top bar with REC dot + label + week */}
        <div className={styles.topBar}>
          <div className={styles.rec}>
            <span className={styles.recDot} aria-hidden />
            <span className="t-label">REC · Now Playing</span>
          </div>
          <span className={`t-mono ${styles.week}`}>Week {NOW.week}</span>
        </div>

        {/* Main row: title + status pill */}
        <div className={styles.body}>
          <div className={styles.titleBlock}>
            <h3 className={`t-display ${styles.title}`}>{NOW.title}</h3>
            <span className={`t-mono ${styles.client}`}>{NOW.client}</span>
          </div>
          <span className={styles.status}>{NOW.status}</span>
        </div>

        {/* Detail line */}
        <p className={styles.detail}>{NOW.detail}</p>
      </motion.div>
    </section>
  )
}
