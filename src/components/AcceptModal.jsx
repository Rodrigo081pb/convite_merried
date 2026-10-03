import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Modal from './Modal.jsx';
import Divider from './Divider.jsx';
import { GiftIcon } from './icons.jsx';
import { WhatsAppIcon } from './actionIcons.jsx';

const primaryButton =
  'inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-sm border border-gold/50 bg-olive-dark px-4 py-3 font-sans text-[11px] font-semibold uppercase tracking-wide text-cream transition-colors hover:bg-olive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 active:scale-95';
const secondaryButton =
  'inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-sm border border-gold/60 bg-transparent px-4 py-3 font-sans text-[11px] font-semibold uppercase tracking-wide text-olive-dark transition-colors hover:bg-gold/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 active:scale-95';

const stepMotion = {
  initial: { opacity: 0, x: 18 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -18 },
  transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
};

// Fluxo: 'ask' (ja escolheu o presente?) -> 'later' (foi escolher; volta e confirma) -> WhatsApp.
export default function AcceptModal({ open, onClose, giftListUrl, whatsappUrl }) {
  const [step, setStep] = useState('ask');

  useEffect(() => {
    if (open) setStep('ask');
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} titleId="accept-modal-title" closeLabel="Fechar">
      <GiftIcon className="mx-auto h-6 w-6 text-gold-dark" />

      <AnimatePresence mode="wait" initial={false}>
        {step === 'ask' ? (
          <motion.div key="ask" {...stepMotion}>
            <h2 id="accept-modal-title" className="mt-2 font-script text-3xl leading-tight text-olive">
              J&aacute; escolheu nosso presente? kkk
            </h2>
            <Divider />
            <p className="font-serif text-sm leading-relaxed text-neutral-700">
              Sem press&atilde;o! Mas ele deixa o nosso novo lar ainda mais completo.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href={giftListUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setStep('later')}
                className={primaryButton}
              >
                <GiftIcon className="h-4 w-4" />
                Escolher presente
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className={secondaryButton}
              >
                Sim, j&aacute; escolhi
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.div key="later" {...stepMotion}>
            <h2 id="accept-modal-title" className="mt-2 font-script text-3xl leading-tight text-olive">
              Combinado!
            </h2>
            <Divider />
            <p className="font-serif text-sm leading-relaxed text-neutral-700">
              Abrimos a lista em outra aba. Quando escolher, volte aqui e confirme sua presen&ccedil;a pelo WhatsApp.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className={primaryButton}
              >
                <WhatsAppIcon className="h-4 w-4" />
                J&aacute; escolhi, confirmar
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="mx-auto font-sans text-[11px] text-neutral-500 underline-offset-4 transition-colors hover:text-olive-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
              >
                Confirmar sem presente por enquanto
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
