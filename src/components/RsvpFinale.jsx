import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { HeartTiny } from './icons.jsx';

const HEART_PATH =
  'M12 20.2s-7.6-4.7-10-9.2C.4 7.8 2 4.4 5.4 3.7c2-.4 3.9.5 5 2.1 1.1-1.6 3-2.5 5-2.1 3.4.7 5 4.1 3.4 7.3-2.4 4.5-10 9.2-10 9.2Z';

const EASE_IN_OUT = [0.65, 0, 0.35, 1];
const EASE_OUT = [0.22, 1, 0.36, 1];

// Sequência: contorno se desenha -> dourado preenche de baixo para cima -> pulso único e batida -> botão.
export default function RsvpFinale({ onAccept }) {
  const ref = useRef(null);
  const clipId = useId();
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState('idle'); // idle | draw | fill | ready

  useEffect(() => {
    if (inView && phase === 'idle') setPhase(reduceMotion ? 'ready' : 'draw');
  }, [inView, phase, reduceMotion]);

  const isReady = phase === 'ready';
  const isFilling = phase === 'fill' || isReady;
  const showStatic = reduceMotion;

  return (
    <div ref={ref} className="mt-14 flex flex-col items-center">
      <div className="relative flex h-28 w-28 items-center justify-center">
        {/* Anel de pulso: acontece uma única vez, ao concluir o preenchimento */}
        {isReady && !reduceMotion && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-4 rounded-full border border-gold/50"
            initial={{ opacity: 0.6, scale: 0.8 }}
            animate={{ opacity: 0, scale: 1.55 }}
            transition={{ duration: 1.3, ease: EASE_OUT }}
          />
        )}

        <motion.svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`relative h-20 w-20 overflow-visible transition-[filter] duration-700 ${
            isReady ? 'drop-shadow-[0_6px_12px_rgba(201,168,76,0.35)]' : 'drop-shadow-none'
          }`}
          animate={
            isReady && !reduceMotion
              ? {
                  scale: [1, 1.07, 1, 1.04, 1],
                  transition: {
                    duration: 1.1,
                    times: [0, 0.2, 0.4, 0.6, 1],
                    ease: 'easeInOut',
                    repeat: 2,
                    repeatDelay: 1.4,
                  },
                }
              : { scale: 1 }
          }
        >
          <defs>
            <clipPath id={clipId}>
              <path d={HEART_PATH} />
            </clipPath>
          </defs>

          {/* Preenchimento dourado subindo de baixo para cima, recortado pelo coração */}
          <g clipPath={`url(#${clipId})`}>
            <motion.rect
              x="0"
              width="24"
              height="20"
              fill="#c9a84c"
              initial={{ y: showStatic ? 3 : 22 }}
              animate={{ y: isFilling ? 3 : 22 }}
              transition={{ duration: 1.1, ease: EASE_IN_OUT }}
              onAnimationComplete={() => {
                if (phase === 'fill') setPhase('ready');
              }}
            />
          </g>

          {/* Contorno desenhado em um único traço */}
          <motion.path
            d={HEART_PATH}
            fill="none"
            stroke="#a4842f"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: showStatic ? 1 : 0, opacity: showStatic ? 1 : 0 }}
            animate={{ pathLength: phase === 'idle' ? (showStatic ? 1 : 0) : 1, opacity: phase === 'idle' && !showStatic ? 0 : 1 }}
            transition={{
              pathLength: { duration: 1.4, ease: EASE_IN_OUT },
              opacity: { duration: 0.2 },
            }}
            onAnimationComplete={() => {
              if (phase === 'draw') setPhase('fill');
            }}
          />
        </motion.svg>
      </div>

      <div className="mt-3 flex min-h-[3.75rem] items-center justify-center" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={isReady ? 'ready' : 'waiting'}
            className="font-serif text-lg italic text-neutral-700 lg:text-xl"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            {isReady ? 'Podemos contar com você?' : 'Falta só um detalhe...'}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-3 flex h-14 w-full items-center justify-center">
        {isReady && (
          <motion.button
            type="button"
            onClick={onAccept}
            aria-haspopup="dialog"
            className="relative inline-flex min-h-[48px] w-full max-w-[260px] items-center justify-center gap-2 overflow-hidden rounded-sm border border-gold/60 bg-olive-dark px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cream shadow-seal transition-[background-color,transform] duration-200 hover:bg-olive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 active:scale-[0.98]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: reduceMotion ? 0 : 0.35 }}
          >
            {!reduceMotion && (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ left: '-40%' }}
                animate={{ left: '140%' }}
                transition={{ duration: 1.1, delay: 0.9, ease: 'easeInOut' }}
              />
            )}
            
            <span className="relative">Aceitar Convite</span>
          </motion.button>
        )}
      </div>
    </div>
  );
}