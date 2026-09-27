import { useState } from 'react';
import { motion } from 'framer-motion';

// Pontinhos dourados que cintilam sobre a carta, dão vida sem parecer um template genérico.
const SPARKLES = [
  { top: '13%', left: '11%', size: '9px', delay: '0s' },
  { top: '20%', left: '85%', size: '7px', delay: '0.9s' },
  { top: '80%', left: '15%', size: '7px', delay: '1.7s' },
  { top: '74%', left: '88%', size: '6px', delay: '2.4s' },
];

export default function Envelope({ onOpen }) {
  const [breaking, setBreaking] = useState(false);

  const handleOpen = () => {
    if (breaking) return;
    setBreaking(true);
  };

  return (
    <motion.div
      className="relative h-[100dvh] w-full overflow-hidden bg-cream"
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.09, filter: 'blur(24px)' }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      <img
        src="/imgs/Carta1.jpg"
        alt="Envelope do convite de noivado"
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
      />

      {/* Vinheta sutil para dar profundidade à foto */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-transparent to-black/10" />

      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="pointer-events-none absolute font-serif text-gold-dark animate-twinkle"
          style={{ top: s.top, left: s.left, fontSize: s.size, animationDelay: s.delay }}
        >
          ✦
        </span>
      ))}

      <button
        type="button"
        aria-label="Clique para abrir o convite"
        onClick={handleOpen}
        disabled={breaking}
        className="absolute left-1/2 top-[57%] flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-gold/70 disabled:cursor-default sm:h-36 sm:w-36"
      >
        {!breaking && (
          <span className="absolute inset-2 rounded-full border border-gold-dark/50 animate-pulseRing" />
        )}

        {/* Flash dourado que "quebra" o selo de cera ao clicar */}
        <motion.span
          className="absolute h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9)_0%,rgba(201,168,76,0.45)_45%,transparent_75%)] sm:h-24 sm:w-24"
          initial={{ opacity: 0, scale: 1 }}
          animate={
            breaking
              ? { opacity: [0, 1, 0], scale: [0.8, 1.35, 1.6], rotate: [0, -6, 10] }
              : { opacity: 0, scale: 1 }
          }
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          onAnimationComplete={() => {
            if (breaking) onOpen();
          }}
        />
      </button>
    </motion.div>
  );
}
