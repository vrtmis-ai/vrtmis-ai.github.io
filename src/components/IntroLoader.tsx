import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import styles from './IntroLoader.module.css'

/**
 * IntroLoader — first-paint cinematic veil.
 *
 * On first load (sessionStorage gated, so it doesn't replay on every nav),
 * a full-screen pitch panel covers everything for ~1400ms:
 *   1.  MT logo fades in
 *   2.  A reactor-orange progress line draws across underneath
 *   3.  The veil slides up and out
 *
 * Skipped automatically on refresh-within-session so the user isn't held up.
 */
export function IntroLoader() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    // If we've already shown the intro this session, skip.
    if (sessionStorage.getItem('intro-played') === '1') {
      setShow(false)
      return
    }
    const total = 1500 // ms until exit
    const t = setTimeout(() => {
      setShow(false)
      sessionStorage.setItem('intro-played', '1')
    }, total)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.veil}
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className={styles.center}>
            <motion.img
              src="/mt-logo.png"
              alt="MT"
              className={styles.logo}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="t-label"
              style={{ color: 'var(--reactor)', letterSpacing: '0.3em' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              ARTEMIS · STUDIO
            </motion.span>
          </div>

          {/* Progress line — draws from 0 to 100% during the hold */}
          <motion.div
            className={styles.progress}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.0, ease: 'easeInOut', delay: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
