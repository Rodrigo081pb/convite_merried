import Modal from './Modal.jsx';
import Divider from './Divider.jsx';
import { CalendarIcon } from './icons.jsx';
import { ArrowRightIcon } from './actionIcons.jsx';

// \u00e3 = a til, \u00e9 = e agudo, \u00e7 = c cedilha (evita acento direto no arquivo)
const EVENT = {
  title: 'Noivado de Kauã e Débora',
  details: 'Contamos com a sua presença!',
  location: 'Aldeia KM 7 - Granja Salvina Petrilli, Camaragibe - PE',
  // 16/01/2027, 15h-18h em Recife (UTC-3, sem hor\u00e1rio de ver\u00e3o)
  startLocal: '20270116T150000',
  endLocal: '20270116T180000',
  startUtc: '20270116T180000Z',
  endUtc: '20270116T210000Z',
};

const GOOGLE_CALENDAR_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  `&text=${encodeURIComponent(EVENT.title)}` +
  `&dates=${EVENT.startLocal}/${EVENT.endLocal}` +
  '&ctz=America/Recife' +
  `&details=${encodeURIComponent(EVENT.details)}` +
  `&location=${encodeURIComponent(EVENT.location)}`;

const escapeIcs = (value) => value.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;');

function buildIcs() {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Convite Noivado//PT-BR',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:noivado-20270116@convite',
    `DTSTAMP:${EVENT.startUtc}`,
    `DTSTART:${EVENT.startUtc}`,
    `DTEND:${EVENT.endUtc}`,
    `SUMMARY:${escapeIcs(EVENT.title)}`,
    `DESCRIPTION:${escapeIcs(EVENT.details)}`,
    `LOCATION:${escapeIcs(EVENT.location)}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Amanh\u00e3 \u00e9 o noivado!',
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-PT3H',
    'ACTION:DISPLAY',
    'DESCRIPTION:O noivado come\u00e7a em 3 horas',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

function downloadIcs() {
  const blob = new Blob([buildIcs()], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'noivado.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const optionClass =
  'flex min-h-[56px] w-full items-center gap-3 rounded-sm border border-gold/40 bg-white/60 px-3 py-2 text-left transition-colors hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 active:scale-[0.98]';

export default function CalendarModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} titleId="calendar-modal-title" closeLabel="Fechar lembrete">
      <CalendarIcon className="mx-auto h-6 w-6 text-gold-dark" />
      <h2 id="calendar-modal-title" className="mt-2 font-script text-3xl text-olive">
        N&atilde;o esque&ccedil;a a data
      </h2>
      <Divider />
      <p className="font-serif text-sm leading-relaxed text-neutral-700">
        <span className="font-display tracking-wider">16/01/2027</span>, das <span className="font-display tracking-wider">15h</span>{' '}
        &agrave;s <span className="font-display tracking-wider">18h</span>
      </p>
      <p className="mt-1 font-sans text-xs text-neutral-500">Salve um lembrete na sua agenda</p>

      <ul className="mt-5 flex flex-col gap-2 text-left">
        <li>
          <a
            href={GOOGLE_CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className={optionClass}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gold/40 bg-white text-olive-dark">
              <CalendarIcon className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-sans text-sm font-semibold text-neutral-800">Google Agenda</span>
              <span className="block font-sans text-[11px] text-neutral-500">Android e navegador</span>
            </span>
            <ArrowRightIcon className="h-4 w-4 shrink-0 text-gold-dark" />
          </a>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              downloadIcs();
              onClose();
            }}
            className={optionClass}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-neutral-800 text-cream">
              <CalendarIcon className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-sans text-sm font-semibold text-neutral-800">Apple / Outlook</span>
              <span className="block font-sans text-[11px] text-neutral-500">iPhone, iPad, Mac e Outlook (.ics)</span>
            </span>
            <ArrowRightIcon className="h-4 w-4 shrink-0 text-gold-dark" />
          </button>
        </li>
      </ul>
    </Modal>
  );
}
