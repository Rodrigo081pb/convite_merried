import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, PinIcon, GiftIcon, PixIcon, HeartTiny } from './icons.jsx';

const PIX_KEY = '81984423591';
const GIFT_COLLECTION_URL = 'https://collshp.com/dboraalves936884?share_channel_code=1&view=storefront';

const containerStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};

function Divider() {
  return (
    <div className="mx-auto my-4 flex max-w-[210px] items-center justify-center gap-2">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/60" />
      <span className="flex items-center gap-1.5 text-gold">
        <span className="h-1 w-1 rounded-full bg-gold/70" />
        <HeartTiny className="h-3 w-3" />
        <span className="h-1 w-1 rounded-full bg-gold/70" />
      </span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}

function InfoItem({ icon: Icon, label, sub, href, ariaLabel }) {
  const iconBadge = (
    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 bg-gold/10 text-gold-dark shadow-sm transition-transform duration-200 lg:h-11 lg:w-11">
      <Icon className="h-4 w-4 lg:h-5 lg:w-5" />
    </span>
  );

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-2 px-2 lg:gap-3 lg:px-4">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className="group relative flex h-9 w-9 items-center justify-center rounded-full outline-none transition-transform duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-gold/70 active:scale-95 lg:h-11 lg:w-11"
        >
          <span className="pointer-events-none absolute inset-0 rounded-full border border-gold-dark/40 animate-pulseRing" />
          {iconBadge}
        </a>
      ) : (
        iconBadge
      )}
      <span className="font-sans text-sm font-medium leading-tight tracking-wide text-neutral-700 sm:text-base lg:text-lg">
        {label}
      </span>
      {sub && <span className="font-sans text-xs leading-tight text-neutral-500 lg:text-sm">{sub}</span>}
    </div>
  );
}

function InfoBox({ icon: Icon, title, children }) {
  return (
    <div className="relative rounded-sm border border-gold/40 p-4 lg:p-5">
      <div className="mb-2 flex items-center gap-2 lg:gap-2.5">
        <Icon className="h-4 w-4 text-gold-dark lg:h-5 lg:w-5" />
        <h3 className="font-sans text-[11px] font-semibold uppercase tracking-wide text-olive-dark lg:text-xs">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function Invitation({ pastorMode = false }) {
  const [pixCopied, setPixCopied] = useState(false);
  const [giftModalOpen, setGiftModalOpen] = useState(false);

  useEffect(() => {
    if (!giftModalOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape') setGiftModalOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [giftModalOpen]);

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = PIX_KEY;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2000);
  };

  return (
    <section className="paper-texture relative flex min-h-[100dvh] w-full items-start justify-center bg-cream sm:items-center sm:px-6 sm:py-10 lg:py-12">
      <motion.div
        className="relative w-full max-w-md overflow-hidden bg-cream shadow-envelope sm:rounded-sm lg:max-w-2xl"
        initial={{ opacity: 0, scale: 0.96, filter: 'blur(14px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Moldura dourada interna */}
        <div className="pointer-events-none absolute inset-2 z-20 border border-gold/50 sm:inset-3 lg:inset-4" />

      
        {/* Foto do casal */}
        <div className="relative mt-2 h-[42vh] max-h-[400px] w-full overflow-hidden sm:h-[360px] lg:h-[420px] lg:max-h-[480px]">
          <img
            src="/imgs/foto-background/Casal.jpg"
            alt="Kauã e Débora"
            className="h-full w-full object-cover object-[center_22%]"
            draggable={false}
          />
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream" />
        </div>

        <motion.div
          variants={containerStagger}
          initial="hidden"
          animate="show"
          className="relative z-10 -mt-1 px-7 pb-10 pt-1 text-center sm:px-10 lg:px-16 lg:pb-14 lg:pt-2"
        >
          <motion.p
            variants={fadeUp}
            className="font-sans text-[10.5px] font-medium uppercase leading-relaxed tracking-[0.22em] text-olive-dark/85 sm:text-xs lg:text-sm"
          >
            {pastorMode ? (
              <>
                Para Jer&ocirc;nimo e Clau,
                <br />
                ser&aacute; uma alegria ter voc&ecirc;s conosco
              </>
            ) : (
              <>
                Com muita alegria,
                <br />
                convidamos voc&ecirc; para celebrar o nosso
              </>
            )}
          </motion.p>

          {!pastorMode && (
            <motion.div variants={fadeUp} className="relative mt-[4%] flex items-center justify-center">
              <h1 className="font-script text-6xl leading-[0.9] text-olive sm:text-7xl lg:text-8xl">Noivado</h1>
            </motion.div>
          )}

          {pastorMode ? (
            <>
              <motion.p
                variants={fadeUp}
                className="mx-auto max-w-[620px] font-serif text-[15px] leading-relaxed text-neutral-700 sm:text-base lg:text-lg"
              >
                &Eacute; com muita alegria e gratid&atilde;o a Deus, n&oacute;s, Kau&atilde; e D&eacute;bora, viemos convidar voc&ecirc;s, Jer&ocirc;nimo e Clau para fazerem parte de um momento muito especial em nossas vidas.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="mx-auto mt-4 max-w-[620px] font-serif text-[15px] leading-relaxed text-neutral-700 sm:text-base lg:text-lg"
              >
                Celebraremos o nosso noivado e seria uma honra imensa ter voc&ecirc;s conosco, n&atilde;o apenas celebrando, mas tamb&eacute;m ministrando sobre n&oacute;s a Palavra do Senhor neste dia t&atilde;o marcante e inesquec&iacute;vel.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="mx-auto mt-4 max-w-[620px] font-serif text-[15px] leading-relaxed text-neutral-700 sm:text-base lg:text-lg"
              >
                Desde j&aacute; agradecemos o carinho e contamos com a sua presença.
              </motion.p>
            </>
          ) : (
            <motion.p
              variants={fadeUp}
              className="mx-auto max-w-[280px] font-serif text-[15px] leading-relaxed text-neutral-700 sm:max-w-none sm:text-base lg:max-w-[520px] lg:text-lg"
            >
              Deus uniu nossos caminhos e escreveu uma hist&oacute;ria linda, feita de amor, cumplicidade e prop&oacute;sito. Agora, queremos celebrar esse novo cap&iacute;tulo ao lado das pessoas que amamos!
            </motion.p>
          )}

          <motion.div variants={fadeUp} className="my-7 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <motion.blockquote variants={fadeUp} className="relative mx-auto max-w-[260px] lg:max-w-[420px]">
            <p className="font-serif text-[14px] italic leading-relaxed text-neutral-700 lg:text-lg">
              &ldquo;Assim, eles j&aacute; n&atilde;o s&atilde;o dois, mas sim uma s&oacute; carne. Portanto, o que Deus uniu, ningu&eacute;m separe.&rdquo;
            </p>
            <footer className="mt-2 font-sans text-[11px] font-semibold tracking-wide text-neutral-800 lg:text-xs">
              Mateus <span className="font-display tracking-wider">19:6</span>
            </footer>
          </motion.blockquote>

          <motion.div variants={fadeUp} className="my-7 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <motion.div variants={fadeUp} className="flex items-stretch justify-center gap-0 lg:gap-4">
            <InfoItem
              icon={CalendarIcon}
              label={<span className="font-display tracking-wider">{pastorMode ? '16/01/27' : '12/01/27'}</span>}
            />
            <span className="w-px shrink-0 bg-gold/30 lg:hidden" />
            <InfoItem
              icon={ClockIcon}
              label={
                <>
                  <span className="font-display tracking-wider">15h</span> &agrave;s{' '}
                  <span className="font-display tracking-wider">18h</span>
                </>
              }
            />
            {/* <span className="w-px shrink-0 bg-gold/30 lg:hidden" />
            <InfoItem
              icon={PinIcon}
              label={<span>Rua C&oacute;rrego das Rosas</span>}
              href="https://www.google.com/maps/search/?api=1&query=Rua+C%C3%B3rrego+das+Rosas%2C+Jardim+Jord%C3%A3o%2C+Recife+-+PE"
              ariaLabel="Ver localiza&ccedil;&atilde;o no mapa"
            /> */}
          </motion.div>

          {!pastorMode && (
            <motion.div variants={fadeUp} className="mt-8 grid grid-cols-2 gap-3 text-left sm:gap-4 lg:gap-6">
              <InfoBox icon={GiftIcon} title="Lista de Presentes">
                <p className="font-serif text-[12.5px] leading-snug text-neutral-600 lg:text-sm">
                  Sua presen&ccedil;a j&aacute; &eacute; o nosso maior presente! Se quiser presentear, acesse a lista.
                </p>
                <button
                  type="button"
                  onClick={() => setGiftModalOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={giftModalOpen}
                  aria-label="Abrir lista de presentes"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-sm border border-gold/50 bg-olive-dark px-3 py-2 font-sans text-[10.5px] font-semibold uppercase tracking-wide text-cream transition-colors duration-200 hover:bg-olive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 active:scale-95 lg:text-xs"
                >
                  Ver lista completa
                </button>
              </InfoBox>

              <InfoBox icon={PixIcon} title="Pix">
                <p className="font-serif text-[12.5px] leading-snug text-neutral-600 lg:text-sm">
                  Contribua com amor para o nosso novo lar, se preferir.
                </p>
                <div className="mx-auto mt-2 flex h-20 w-20 items-center justify-center overflow-hidden rounded-sm border border-gold/50 bg-white p-1 sm:h-24 sm:w-24 lg:h-28 lg:w-28">
                  <img
                    src="/imgs/qrcode/qr-pix.png"
                    alt="QR Code Pix"
                    className="h-full w-full object-contain"
                    draggable={false}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleCopyPix}
                  aria-label="Copiar chave Pix"
                  className={`mt-3 w-full rounded-sm border px-3 py-2 font-sans text-[10.5px] font-semibold uppercase tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 active:scale-95 lg:text-xs ${
                    pixCopied ? 'border-gold bg-gold-dark text-cream' : 'border-gold/50 bg-olive-dark text-cream hover:bg-olive'
                  }`}
                >
                  {pixCopied ? 'Chave copiada!' : 'Copiar chave'}
                </button>
              </InfoBox>
            </motion.div>
          )}

          <motion.p variants={fadeUp} className="mt-9 font-script text-3xl text-olive lg:text-4xl">
            {pastorMode ? (
              <>
                Com carinho,
                <br />
                Kau&atilde; e D&eacute;bora
              </>
            ) : (
              'Contamos com sua Presença!'
            )}
          </motion.p>
        </motion.div>
      </motion.div>

      {giftModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-olive-dark/70 px-4 py-4 backdrop-blur-[2px]"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setGiftModalOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="gift-modal-title"
            className="relative max-h-[calc(100dvh-2rem)] w-full max-w-xs overflow-y-auto rounded-sm border border-gold/60 bg-cream px-5 py-5 text-center shadow-envelope sm:px-6"
          >
            <button
              type="button"
              onClick={() => setGiftModalOpen(false)}
              aria-label="Fechar lista de presentes"
              className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full text-lg leading-none text-olive-dark transition-colors hover:bg-gold/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
            >
              &times;
            </button>
            <GiftIcon className="mx-auto h-5 w-5 text-gold-dark" />
            <h2 id="gift-modal-title" className="mt-2 font-script text-3xl text-olive">
              Lista de presentes
            </h2>
            <div className="mt-1">
              <Divider />
            </div>
            <div className="mt-3 h-28 overflow-hidden rounded-sm border border-gold/40 bg-white shadow-sm">
              <img
                src="/imgs/paleta_cores/paleta.jpeg"
                alt="Paleta de cores do novo lar: bambu, preto, inox e branco"
                className="h-full w-full object-contain"
                draggable={false}
              />
            </div>
            <p className="mt-3 font-serif text-xs leading-relaxed text-neutral-700">
              Preparamos tudo com carinho. Acesse nossa cole&ccedil;&atilde;o para escolher um presente para o novo lar.
            </p>
            <a
              href={GIFT_COLLECTION_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setGiftModalOpen(false)}
              className="mt-4 inline-flex w-full items-center justify-center rounded-sm border border-gold/50 bg-olive-dark px-3 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-wide text-cream transition-colors hover:bg-olive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 active:scale-95"
            >
              Acessar a lista
            </a>

          </div>
        </div>
      )}
    </section>
  );
}
