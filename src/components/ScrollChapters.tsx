import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion'
import { SceneStage, type SceneStageProps } from './SceneStage'
import styles from './ScrollChapters.module.css'

interface ChapterDef extends Omit<SceneStageProps, 'scrollProgress' | 'mouse'> {
  id: string
}

interface ScrollChaptersProps {
  chapters: ChapterDef[]
  mouse: { x: number; y: number }
}

/**
 * ScrollChapters — stacked sticky scenes with TIGHT crossfade.
 *
 * Each chapter owns `1/total` of the total scroll progress. Within its window
 * it is fully visible. A narrow `FADE` band at each boundary crossfades to the
 * next chapter. Only two chapters are ever non-zero at once — the outgoing
 * one (fading out) and the incoming one (fading in). No more "three chapters
 * on screen at the same time."
 *
 * For N=4 chapters across scrollYProgress 0→1:
 *   Chapter 0:  hold [0    ..  0.20], crossfade out [0.20 .. 0.25]
 *   Chapter 1:  fade in [0.20 .. 0.25], hold [0.25 .. 0.45], fade out [0.45 .. 0.50]
 *   Chapter 2:  fade in [0.45 .. 0.50], hold [0.50 .. 0.70], fade out [0.70 .. 0.75]
 *   Chapter 3:  fade in [0.70 .. 0.75], hold [0.75 .. 1.00]
 */
const FADE = 0.05 // crossfade window as fraction of total scroll progress

export function ScrollChapters({ chapters, mouse }: ScrollChaptersProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  // Light spring — keep transitions snappy enough that crossfades stay clean
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 28 })

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{ height: `${chapters.length * 100}vh` }}
    >
      <div className={styles.sticky}>
        {chapters.map((ch, i) => (
          <ChapterLayer
            key={ch.id}
            chapter={ch}
            index={i}
            total={chapters.length}
            smoothProgress={smooth}
            mouse={mouse}
          />
        ))}
      </div>
    </div>
  )
}

interface ChapterLayerProps {
  chapter: ChapterDef
  index: number
  total: number
  smoothProgress: MotionValue<number>
  mouse: { x: number; y: number }
}

function ChapterLayer({ chapter, index, total, smoothProgress, mouse }: ChapterLayerProps) {
  const start = index / total
  const end = (index + 1) / total

  const isFirst = index === 0
  const isLast = index === total - 1

  /**
   * Opacity keyframes — strict non-overlap.
   *   First chapter: 1 → 0 (only fades out)
   *   Last chapter:  0 → 1 (only fades in)
   *   Middle:        0 → 1 → 1 → 0
   */
  let opacityInput: number[]
  let opacityOutput: number[]

  if (isFirst) {
    opacityInput = [0, end - FADE, end]
    opacityOutput = [1, 1, 0]
  } else if (isLast) {
    opacityInput = [start, start + FADE, 1]
    opacityOutput = [0, 1, 1]
  } else {
    opacityInput = [start, start + FADE, end - FADE, end]
    opacityOutput = [0, 1, 1, 0]
  }

  const opacity = useTransform(smoothProgress, opacityInput, opacityOutput)

  /** Subtle "settling" — slight scale down through the chapter's window for depth */
  const scale = useTransform(
    smoothProgress,
    [start, (start + end) / 2, end],
    [1.04, 1.0, 0.98]
  )

  /** Slight vertical drift downward — feels heavy, gravity-pulled */
  const y = useTransform(smoothProgress, [start, end], ['-2%', '2%'])

  return (
    <motion.div
      className={styles.chapterLayer}
      style={{ opacity, scale, y, zIndex: index + 1 }}
    >
      <SceneStage {...chapter} mouse={mouse} />
    </motion.div>
  )
}
