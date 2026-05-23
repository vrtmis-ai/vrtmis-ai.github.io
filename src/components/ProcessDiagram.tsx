import { motion, useTransform, type MotionValue } from 'framer-motion'

interface ProcessDiagramProps {
  /** Scroll progress through Process section (0-1) */
  scrollProgress: MotionValue<number>
  /** Mouse normalized position (-1 to 1) — adds subtle parallax */
  mouse: { x: number; y: number }
  /** Total number of stages — diagram draws one node per stage */
  total: number
}

/**
 * ProcessDiagram — scroll-reactive SVG wiring diagram.
 *
 * As the user scrolls through the Process section, lines are drawn between
 * stage nodes and each node ignites in turn. This fills the empty space in
 * the Process section's left column with a visual that EARNS its place —
 * not decoration, but a literal map of "where you are in the process."
 *
 * Stylistically: monochrome ink-on-blueprint. Reactor orange for the active
 * node and the drawn line. Concrete gray for pending nodes.
 */
export function ProcessDiagram({ scrollProgress, mouse, total }: ProcessDiagramProps) {
  // Subtle mouse parallax — feels like the diagram is on a slightly tilting surface
  const tiltX = useTransform(() => mouse.y * 4)
  const tiltY = useTransform(() => mouse.x * 4)

  /** Animate the connecting path's stroke-dashoffset as user scrolls */
  // Total path length is set to 600 via dasharray; offset goes 600 → 0
  const pathOffset = useTransform(scrollProgress, [0, 1], [600, 0])

  /**
   * Node positions on a 320×320 SVG canvas.
   * They form an irregular zigzag — feels designed, not auto-generated.
   */
  const nodes = [
    { x: 60,  y: 60,  label: '01' },
    { x: 240, y: 110, label: '02' },
    { x: 80,  y: 200, label: '03' },
    { x: 260, y: 260, label: '04' },
  ].slice(0, total)

  /** Build path string passing through nodes */
  const pathD = nodes
    .map((n, i) => `${i === 0 ? 'M' : 'L'} ${n.x} ${n.y}`)
    .join(' ')

  return (
    <motion.svg
      viewBox="0 0 320 320"
      width="100%"
      height="100%"
      style={{
        maxWidth: 320,
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 1000,
      }}
      aria-hidden
    >
      {/* Grid backdrop */}
      <defs>
        <pattern id="processGrid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" opacity="0.07" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="320" height="320" fill="url(#processGrid)" />

      {/* Border frame */}
      <rect
        x="1"
        y="1"
        width="318"
        height="318"
        fill="none"
        stroke="currentColor" opacity="0.12"
        strokeWidth="1"
      />
      {/* Corner ticks */}
      {[
        [4, 4, 12, 4], [4, 4, 4, 12],
        [316, 4, 308, 4], [316, 4, 316, 12],
        [4, 316, 12, 316], [4, 316, 4, 308],
        [316, 316, 308, 316], [316, 316, 316, 308],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--reactor)" strokeWidth="1.5" />
      ))}

      {/* Pending (background) path — full faint line through all nodes */}
      <path
        d={pathD}
        fill="none"
        stroke="currentColor" opacity="0.10"
        strokeWidth="1.5"
        strokeDasharray="3 5"
      />

      {/* Active (reactor) path — drawn by scroll progress */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="var(--reactor)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="600"
        style={{ strokeDashoffset: pathOffset }}
      />

      {/* Nodes — each one lights up at its own scroll threshold */}
      {nodes.map((node, i) => (
        <Node
          key={node.label}
          x={node.x}
          y={node.y}
          label={node.label}
          activeAt={i / (total - 1)}
          scrollProgress={scrollProgress}
        />
      ))}
    </motion.svg>
  )
}

/** Single node — circle + label that fade from pending → active state */
function Node({
  x, y, label, activeAt, scrollProgress,
}: {
  x: number
  y: number
  label: string
  activeAt: number
  scrollProgress: MotionValue<number>
}) {
  // 0 = pending, 1 = active. Trigger window is ±0.08 around activeAt.
  const TR = 0.08
  const activeOpacity = useTransform(
    scrollProgress,
    [Math.max(0, activeAt - TR), activeAt],
    [0, 1]
  )
  const ringScale = useTransform(
    scrollProgress,
    [Math.max(0, activeAt - TR), activeAt, Math.min(1, activeAt + TR)],
    [0.6, 1.2, 1]
  )

  return (
    <g transform={`translate(${x} ${y})`}>
      {/* Pending state: hollow gray ring */}
      <circle r="8" fill="none" stroke="currentColor" opacity="0.25" strokeWidth="1" />

      {/* Active state: filled orange dot + outer pulse */}
      <motion.circle r="10" fill="none" stroke="var(--reactor)" strokeWidth="1.5"
        style={{ opacity: activeOpacity, scale: ringScale, transformOrigin: 'center' }} />
      <motion.circle r="4" fill="var(--reactor)" style={{ opacity: activeOpacity }} />

      {/* Label */}
      <text
        x="14"
        y="4"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
        fill="var(--bone)"
        letterSpacing="0.15em"
      >
        {label}
      </text>
    </g>
  )
}
