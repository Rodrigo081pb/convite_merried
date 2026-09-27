import { HeartTiny } from './icons.jsx';
import {
  ArrowIcon,
  BedroomIcon,
  BathIcon,
  KitchenIcon,
  BeddingIcon,
  CurtainIcon,
  FootboardIcon,
  HangerIcon,
  PillowIcon,
  TowelIcon,
  HygieneIcon,
  TrashBinIcon,
  HamperIcon,
  BathMatIcon,
  CutleryIcon,
  FridgeIcon,
  PlateIcon,
  GlassIcon,
  DishRackIcon,
  PlatterIcon,
} from './giftIcons.jsx';

const categories = [
  {
    id: 'quarto',
    title: 'Quarto',
    icon: BedroomIcon,
    items: [
      { name: 'Cobre-leito Queen', icon: BeddingIcon, href: 'https://lista.mercadolivre.com.br/cobre-leito-queen-branco' },
      { name: 'Cortina blackout', icon: CurtainIcon, href: 'https://lista.mercadolivre.com.br/cortina-blecaute-branca' },
      { name: 'Edredom Queen branco', icon: BeddingIcon, href: 'https://lista.mercadolivre.com.br/edredom-queen-branco' },
      { name: 'Peseira de cama', icon: FootboardIcon, href: 'https://lista.mercadolivre.com.br/peseira-cama-preta-branca' },
      { name: 'Cabides', icon: HangerIcon, href: 'https://lista.mercadolivre.com.br/cabide-inox-preto' },
      { name: 'Fronhas brancas', icon: PillowIcon, href: 'https://lista.mercadolivre.com.br/fronha-branca' },
    ],
  },
  {
    id: 'banheiro',
    title: 'Banheiro',
    icon: BathIcon,
    items: [
      { name: 'Jogo de toalhas brancas', icon: TowelIcon, href: 'https://lista.mercadolivre.com.br/jogo-toalhas-banho-rosto-branca' },
      { name: 'Kit higiene banheiro', icon: HygieneIcon, href: 'https://lista.mercadolivre.com.br/kit-higiene-banheiro' },
      { name: 'Lixeira inox', icon: TrashBinIcon, href: 'https://lista.mercadolivre.com.br/lixeira-inox-banheiro' },
      { name: 'Cesto de roupa bambu', icon: HamperIcon, href: 'https://lista.mercadolivre.com.br/cesto-roupa-suja-bambu' },
      { name: 'Tapetes', icon: BathMatIcon, href: 'https://lista.mercadolivre.com.br/tapete-banheiro-preto-branco' },
    ],
  },
  {
    id: 'cozinha',
    title: 'Cozinha',
    icon: KitchenIcon,
    items: [
      { name: 'Jogo de taças de sobremesa', icon: PlateIcon, href: 'https://lista.mercadolivre.com.br/jogo-de-ta%C3%A7as-sobremesa' },
      { name: 'Conjunto de talheres', icon: CutleryIcon, href: 'https://lista.mercadolivre.com.br/conjunto-talheres' },
      { name: 'Escorredor', icon: DishRackIcon, href: 'https://lista.mercadolivre.com.br/escorredor-louca-inox-preto' },
      { name: 'Organizadores de geladeira', icon: FridgeIcon, href: 'https://lista.mercadolivre.com.br/loja/rebirth/rerbith-de-acrilico-para-geladeira_NoIndex_True?sb=storefront_url#D[A:rerbith%20de%20acrilico%20para%20geladeira,L:undefined]&origin=UNKNOWN&as.comp_t=SUG&as.comp_v=%0A&as.comp_id=HIS' },
      { name: 'Conjunto de taças', icon: GlassIcon, href: 'https://lista.mercadolivre.com.br/conjunto-de-tacas' },
      { name: 'Travessas', icon: PlatterIcon, href: 'https://lista.mercadolivre.com.br/travessa-ceramica-branca-preta' },
    ],
  },
];

// Numera os itens sequencialmente (1, 2, 3...) ao longo de todas as categorias.
let itemCounter = 0;
categories.forEach((category) => {
  category.items.forEach((item) => {
    itemCounter += 1;
    item.number = itemCounter;
  });
});

const WHATSAPP_NUMBER = '5581985972846';

function handleReserveClick(item) {
  const guestName = window.prompt('Digite seu nome para confirmarmos a reserva:');
  if (!guestName || !guestName.trim()) return;

  const message = `Olá, eu sou ${guestName.trim()}. Selecionei o item ${item.number} - ${item.name}, poderia verificar se já está reservado por gentileza?`;
  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(link, '_blank', 'noopener,noreferrer');
}

function GiftCard({ number, name, category, icon: Icon, href }) {
  return (
    <div className="group flex flex-col rounded-lg border border-inox/50 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-inox hover:shadow-[0_18px_32px_rgba(0,0,0,0.12)]">
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bambu/15 text-bambu-dark transition-colors duration-300 group-hover:bg-bambu-dark group-hover:text-paper">
          <Icon className="h-5 w-5" />
        </span>
        <span className="rounded-full border border-inox/50 px-2.5 py-1 font-inter text-[11px] font-semibold text-ink/60">
          Item n&ordm; {String(number).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-5 font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-bambu-dark">
        {category}
      </span>
      <h3 className="mt-1.5 font-playfair text-[18px] font-medium leading-snug text-ink">{name}</h3>
      <div className="mt-6 flex flex-col gap-2.5">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver item: ${name} (abre em nova aba)`}
          className="inline-flex items-center justify-center gap-2 rounded-sm border border-bambu-dark bg-bambu-dark px-4 py-2.5 font-inter text-[11px] font-semibold uppercase tracking-[0.14em] text-paper transition-all duration-200 hover:border-ink hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bambu-dark focus-visible:ring-offset-2 active:scale-95"
        >
          Ver item
          <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
        <button
          type="button"
          onClick={() => handleReserveClick({ number, name })}
          aria-label={`Reservar item ${number}: ${name} via WhatsApp`}
          className="inline-flex items-center justify-center gap-2 rounded-sm border border-bambu-dark px-4 py-2.5 font-inter text-[11px] font-semibold uppercase tracking-[0.14em] text-bambu-dark transition-all duration-200 hover:border-ink hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bambu-dark focus-visible:ring-offset-2 active:scale-95"
        >
          Reservar item
        </button>
      </div>
    </div>
  );
}

function CategorySection({ title, icon: Icon, items }) {
  return (
    <section aria-labelledby={`section-${title}`} className="mx-auto mt-16 max-w-6xl px-6 sm:px-8 lg:px-10">
      <div className="mb-8 flex items-center justify-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-bambu/60 bg-bambu/10 text-bambu-dark">
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <h2 id={`section-${title}`} className="font-playfair text-2xl font-semibold tracking-wide text-ink sm:text-3xl">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <GiftCard
            key={item.name}
            number={item.number}
            name={item.name}
            category={title}
            icon={item.icon}
            href={item.href}
          />
        ))}
      </div>
    </section>
  );
}

function SectionDivider() {
  return (
    <div className="mx-auto flex max-w-[200px] items-center justify-center gap-2">
      <span className="h-px flex-1 bg-ink/15" />
      <HeartTiny className="h-3 w-3 text-bambu-dark" />
      <span className="h-px flex-1 bg-ink/15" />
    </div>
  );
}

export default function GiftList() {
  return (
    <div className="min-h-screen bg-paper font-inter">
      <header className="relative border-b border-inox/40 pb-10 pt-8 text-center sm:pb-14 sm:pt-12">
        <a
          href="/"
          className="absolute left-5 top-6 inline-flex items-center gap-1.5 font-inter text-[11px] font-medium uppercase tracking-wide text-ink/60 transition-colors duration-200 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bambu-dark sm:left-8 sm:top-8"
        >
          <ArrowIcon className="h-3.5 w-3.5 rotate-180" />
          Voltar
        </a>

        <p className="font-inter text-[11px] font-medium uppercase tracking-[0.32em] text-bambu-dark">
          Kau&atilde; &amp; D&eacute;bora
        </p>
        <h1 className="mt-3 font-playfair text-4xl font-semibold text-ink sm:text-5xl">Lista de Presentes</h1>

        <div className="mt-5">
          <SectionDivider />
        </div>

        <p className="mx-auto mt-5 max-w-md px-6 font-inter text-sm leading-relaxed text-ink/60">
          Preparamos esta lista com muito carinho pensando no nosso novo lar. Escolha um item abaixo e clique para
          visualizar e presentear.
        </p>

        <div className="mx-auto mt-10 max-w-2xl px-6">
          <img
            src="/imgs/paleta_cores/paleta.jpeg"
            alt="Paleta de cores de inspira&ccedil;&atilde;o do enxoval: bambu, preto, inox e branco"
            className="mx-auto w-full rounded-md border border-inox/40 shadow-sm"
          />
          <p className="mt-3 font-inter text-[11px] italic text-ink/50">
            Obs.: a paleta de cores acima &eacute; referente aos itens de cozinha.
          </p>
        </div>
      </header>

      <main>
        {categories.map((category) => (
          <CategorySection key={category.id} title={category.title} icon={category.icon} items={category.items} />
        ))}
      </main>

      <footer className="mt-20 border-t border-inox/40 py-10 text-center">
        <SectionDivider />
        <p className="mt-4 font-inter text-[12px] tracking-wide text-ink/50">
          Com carinho, Kau&atilde; &amp; D&eacute;bora
        </p>
      </footer>
    </div>
  );
}
