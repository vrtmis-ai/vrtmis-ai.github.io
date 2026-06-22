import { useNavigate } from 'react-router-dom'
import { CTAButton } from './CTAButton'
import { TransitionLink } from './TransitionLink'
import { VISIBLE_PROJECTS } from '../data/projects'
import styles from './MobileStudio.module.css'

/**
 * MobileStudio — the phone-only home centrepiece.
 *
 * The desktop StudioRoom is a pointer/landscape experience (a scroll-locked
 * camera-turn into a hover-lit TV wall), which doesn't translate to a portrait
 * touch screen. On phones App renders this instead (see useIsMobile): a clean
 * lit-room hero, then a tappable grid of the work. Desktop is untouched.
 */
export function MobileStudio() {
  const navigate = useNavigate()

  return (
    <section id="studio" className={styles.section} aria-label="Studio · selected work">
      {/* ── Hero: the lit studio room with the title over it ── */}
      <div className={styles.hero}>
        <video
          className={styles.heroVideo}
          poster="/room/scene-1.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden
        >
          <source src="/room/scene-1-loop.mp4" type="video/mp4" />
        </video>
        <div className={styles.heroScrim} aria-hidden />
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>
            <span className={styles.heroTagLine} aria-hidden />
            Visual Artist &amp; AI Creative
          </span>
          <h1 className={`t-display ${styles.heroName}`}>
            <span className={styles.heroNameLine}>Mahbod</span>
            <span className={`${styles.heroNameLine} ${styles.heroNameAccent}`}>Tavassoli</span>
          </h1>
          <div className={styles.heroCta}>
            <CTAButton variant="glass" onClick={() => navigate('/contact')}>
              Let&apos;s talk
            </CTAButton>
          </div>
        </div>
      </div>

      {/* ── Selected work: a tappable 2-up grid (replaces the TV wall) ── */}
      <div className={styles.work}>
        <div className={styles.workHead}>
          <span className="t-label">Selected Work</span>
          <span className={`t-mono ${styles.workCount}`}>{VISIBLE_PROJECTS.length} projects</span>
        </div>

        <div className={styles.grid}>
          {VISIBLE_PROJECTS.map(p => (
            <TransitionLink key={p.slug} to={`/work/${p.slug}`} className={styles.tile}>
              <div className={styles.tileVisual}>
                <img
                  className={styles.tileImg}
                  src={`/work/${p.slug}/poster.jpg`}
                  alt={p.caseStudyTitle}
                  loading="lazy"
                />
                <span className={styles.tileYear}>{p.year}</span>
              </div>
              <span className={styles.tileCategory}>{p.category}</span>
              <h3 className={styles.tileTitle}>{p.title.replace('\n', ' ')}</h3>
            </TransitionLink>
          ))}
        </div>

        <TransitionLink to="/work" className={`t-mono ${styles.archiveLink}`}>
          Browse the full archive →
        </TransitionLink>
      </div>
    </section>
  )
}
