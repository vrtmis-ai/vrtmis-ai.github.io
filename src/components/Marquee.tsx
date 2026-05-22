import styles from './Marquee.module.css'

/**
 * Dual marquees moving in opposite directions at different speeds.
 * Creates editorial tension and rhythm — basement.studio energy.
 */
export function Marquee() {
  const disciplines = 'VFX · VIDEO MAPPING · AI VISUAL PRODUCTION · MOTION GRAPHICS · LIVE PRODUCTION · '
  const tagline = 'I MAKE THINGS THAT DIDN\'T EXIST BEFORE · '

  return (
    <div className={styles.marqueeWrap}>
      <div className={styles.marquee}>
        <div className={`${styles.track} ${styles.trackForward}`}>
          <span className={`t-display ${styles.text}`}>{disciplines.repeat(6)}</span>
          <span className={`t-display ${styles.text}`}>{disciplines.repeat(6)}</span>
        </div>
      </div>
      <div className={`${styles.marquee} ${styles.marqueeAccent}`}>
        <div className={`${styles.track} ${styles.trackReverse}`}>
          <span className={`t-display ${styles.text} ${styles.textOutline}`}>{tagline.repeat(8)}</span>
          <span className={`t-display ${styles.text} ${styles.textOutline}`}>{tagline.repeat(8)}</span>
        </div>
      </div>
    </div>
  )
}
