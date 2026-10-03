import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { HeartTiny } from './icons.jsx';

const HEART_PATH =
  'M12 20.2s-7.6-4.7-10-9.2C.4 7.8 2 4.4 5.4 3.7c2-.4 3.9.5 5 2.1 1.1-1.6 3-2.5 5-2.1 3.4.7 5 4.1 3.4 7.3-2.4 4.5-10 9.2-10 9.2Z';

const SPARKLES = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  const distance = i % 2 === 0 ? 62 : 44;
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    size: i % 3 === 0 ? 8 : 5,
    heart: i % 3 === 0,
    delay: (i % 4) * 0.04,
  };
});

// Sequencia: coracao se desenha -> preenche com brilhos -> revela o botao "Aceitar Convite".
export default function RsvpFinale({ onAccept }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState('idle'); // idle | draw | burst | ready

  useEffect(() => {
    if (inView && phase === 'idle') setPhase(reduceMotion ? 'ready' : 'draw');
  }, [inView, phase, reduceMotion]);

  useEffect(() => {
    if (phase !== 'burst') return undefined;
    const timer = setTimeout(() => setPhase('ready'), 1000);
    return () => clearTimeout(timer);
  }, [phase]);

  const filled = phase === 'burst' || phase === 'ready';

  return (
    <div ref={ref} className="mt-14 flex flex-col items-center">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <motion.span
          aria-hidden="true"
          className="absolute inset-2 rounded-full bg-gold/30 blur-2xl"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={filled ? { opacity: 1, scale: 1.1 } : { opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.8 }}
        />

        {filled &&
          !reduceMotion &&
          SPARKLES.map((sparkle, index) => (
            <motion.span
              key={index}
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 text-gold"
              style={{ width: sparkle.size, height: sparkle.size, marginLeft: -sparkle.size / 2, marginTop: -sparkle.size / 2 }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
              animate={{ x: sparkle.x, y: sparkle.y, opacity: [1, 1, 0], scale: [0, 1.2, 0.6] }}
              transition={{ duration: 1.1, delay: sparkle.delay, ease: 'easeOut' }}
            >
              {sparkle.heart ? <HeartTiny className="h-full w-full" /> : <span className="block h-full w-full rounded-full bg-current" />}
            </motion.span>
          ))}

        <motion.svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="relative h-20 w-20 overflow-visible"
          animate={phase === 'ready' && !reduceMotion ? { scale: [1, 1.08, 1] } : { scale: 1 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.path
            d={HEART_PATH}
            stroke="#a4842f"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#c9a84c"
            initial={{ pathLength: reduceMotion ? 1 : 0, fillOpacity: reduceMotion ? 1 : 0 }}
            animate={{ pathLength: phase === 'idle' ? (reduceMotion ? 1 : 0) : 1, fillOpacity: filled ? 1 : 0 }}
            transition={{
              pathLength: { duration: 1.8, ease: 'easeInOut' },
              fillOpacity: { duration: 0.6, ease: 'easeOut' },
            }}
            onAnimationComplete={() => {
              if (phase === 'draw') setPhase('burst');
            }}
          />
        </motion.svg>
      </div>

      <div className="mt-3 flex min-h-[3.75rem] items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={phase === 'ready' ? 'ready' : 'waiting'}
            className="font-serif text-lg italic text-neutral-700 lg:text-xl"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            {phase === 'ready' ? 'Podemos contar com voc\u00ea?' : 'Falta s\u00f3 um detalhe...'}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-3 flex h-14 w-full items-center justify-center">
        {phase === 'ready' && (
          <motion.button
            type="button"
            onClick={onAccept}
            aria-haspopup="dialog"
            className="relative inline-flex min-h-[48px] w-full max-w-[260px] items-center justify-center gap-2 overflow-hidden rounded-sm border border-gold/60 bg-olive-dark px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cream shadow-seal transition-colors hover:bg-olive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 active:scale-95"
            initial={{ opacity: 0, y: 14, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          >
            {!reduceMotion && (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ left: '-40%' }}
                animate={{ left: '140%' }}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut' }}
              />
            )}
            <HeartTiny className="relative h-3.5 w-3.5 text-gold-light" />
            <span className="relative">Aceitar Convite</span>
          </motion.button>
        )}
      </div>
    </div>
  );
}
