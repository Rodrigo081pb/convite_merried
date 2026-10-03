import { HeartTiny } from './icons.jsx';

// Divisor dourado com coracao, compartilhado entre a pagina e os modais.
export default function Divider() {
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
