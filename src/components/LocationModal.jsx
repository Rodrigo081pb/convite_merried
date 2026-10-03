import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Modal from './Modal.jsx';
import { PinIcon } from './icons.jsx';
import { ArrowRightIcon, ChevronDownIcon } from './actionIcons.jsx';

const LAT = -7.973657;
const LNG = -34.987149;
const PLACE_NAME = 'Aldeia KM 7';
// Nome do local no Google Maps (link curto abaixo); \u00e1 = a agudo
const MAPS_PLACE_LABEL = 'Aldeia dos Camar\u00e1s, Camaragibe - PE';
const ADDRESS_TEXT = MAPS_PLACE_LABEL;

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/o8x6hszEUDu9SsyW8';
const UBER_URL =
  `https://m.uber.com/ul/?action=setPickup&pickup=my_location` +
  `&dropoff[latitude]=${LAT}&dropoff[longitude]=${LNG}` +
  `&dropoff[nickname]=${encodeURIComponent(PLACE_NAME)}` +
  `&dropoff[formatted_address]=${encodeURIComponent(MAPS_PLACE_LABEL)}`;
// A 99 nao tem deep link publico de destino: abre o app e o endereco vai copiado.
const NINETY_NINE_URL = 'https://99app.com/';

// \u00e7 = c cedilha, \u00e9 = e agudo (evita acento direto no arquivo)
const RIDE_OPTIONS = [
  {
    id: 'google',
    name: 'Google Maps',
    hint: 'Tra\u00e7ar a rota at\u00e9 o local',
    href: GOOGLE_MAPS_URL,
    badge: <PinIcon className="h-5 w-5" />,
    badgeClass: 'bg-white text-olive-dark border border-gold/40',
  },
  {
    id: 'uber',
    name: 'Uber',
    hint: 'Pedir uma corrida at\u00e9 l\u00e1',
    href: UBER_URL,
    badge: <span className="text-[11px] font-bold tracking-tight">Uber</span>,
    badgeClass: 'bg-black text-white',
  },
  {
    id: '99',
    name: '99',
    hint: 'Abrir o app (endere\u00e7o copiado)',
    href: NINETY_NINE_URL,
    badge: <span className="text-sm font-extrabold">99</span>,
    badgeClass: 'bg-[#ffd400] text-black',
    copyAddress: true,
  },
];

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}

export default function LocationModal({ open, onClose }) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setOptionsOpen(false);
      setCopied(false);
    }
  }, [open]);

  const handleOption = (option) => {
    if (option.copyAddress) {
      copyText(ADDRESS_TEXT);
      setCopied(true);
    }
  };

  return (
    <Modal open={open} onClose={onClose} titleId="location-modal-title" closeLabel="Fechar localiza&ccedil;&atilde;o">
      <div className="-mx-5 -mt-6 mb-4 overflow-hidden sm:-mx-7">
        <div className="relative h-44 w-full bg-cream-dark">
          <img
            src="/imgs/local/image.png"
            alt="Entrada da Aldeia KM 7, em Camaragibe"
            className="h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream" />
        </div>
      </div>

      <PinIcon className="mx-auto h-5 w-5 text-gold-dark" />
      <h2 id="location-modal-title" className="mt-2 font-display text-xl font-semibold tracking-wide text-olive-dark">
        Aldeia KM 7
      </h2>
      <p className="mt-1.5 font-sans text-sm text-neutral-700">Granja Salvina Petrilli</p>
      <p className="font-sans text-xs text-neutral-500">Camaragibe - PE</p>

      <button
        type="button"
        onClick={() => setOptionsOpen((value) => !value)}
        aria-expanded={optionsOpen}
        aria-controls="location-options"
        className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-sm border border-gold/50 bg-olive-dark px-4 py-3 font-sans text-[11px] font-semibold uppercase tracking-wide text-cream transition-colors hover:bg-olive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 active:scale-95"
      >
        Ir agora
        {optionsOpen ? <ChevronDownIcon className="h-4 w-4 rotate-180" /> : <ArrowRightIcon className="h-4 w-4" />}
      </button>

      <AnimatePresence initial={false}>
        {optionsOpen && (
          <motion.ul
            id="location-options"
            key="options"
            className="overflow-hidden text-left"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <li className="pt-3 text-center font-sans text-[10.5px] uppercase tracking-[0.18em] text-olive-dark/80">
              Como voc&ecirc; prefere chegar?
            </li>
            {RIDE_OPTIONS.map((option) => (
              <li key={option.id} className="pt-2">
                <a
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleOption(option)}
                  className="flex min-h-[52px] items-center gap-3 rounded-sm border border-gold/40 bg-white/60 px-3 py-2 transition-colors hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 active:scale-[0.98]"
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${option.badgeClass}`}>
                    {option.badge}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-sans text-sm font-semibold text-neutral-800">{option.name}</span>
                    <span className="block font-sans text-[11px] text-neutral-500">{option.hint}</span>
                  </span>
                  <ArrowRightIcon className="h-4 w-4 shrink-0 text-gold-dark" />
                </a>
              </li>
            ))}
            <li aria-live="polite" className="min-h-[1.25rem] pt-2 text-center font-sans text-[11px] text-olive-dark">
              {copied && 'Endere\u00e7o copiado! Cole no destino da 99.'}
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </Modal>
  );
}
