// Ícones outline minimalistas (estilo Fluent) desenhados à mão para não depender de libs externas.
export function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3.5" y="5.5" width="17" height="15" rx="1.8" />
      <path d="M3.5 9.5h17" />
      <path d="M8 3.2v3.6M16 3.2v3.6" />
      <path d="M8 13.2h2M11 13.2h2M14 13.2h2M8 16.4h2M11 16.4h2" />
    </svg>
  );
}

export function ClockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="8.3" />
      <path d="M12 7.2v5.1l3.4 2" />
    </svg>
  );
}

export function PinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 21s7-6.4 7-11.6A7 7 0 0 0 5 9.4C5 14.6 12 21 12 21Z" />
      <circle cx="12" cy="9.4" r="2.4" />
    </svg>
  );
}

export function GiftIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3.5" y="9.5" width="17" height="11" rx="1.2" />
      <path d="M3.5 9.5h17v3.6h-17z" />
      <path d="M12 9.5V21" />
      <path d="M12 9.5c-1-2.6-3-4-4.6-3.4-1.4.5-1.6 2.6.4 3.4 1.6.6 3.2 0 4.2 0Z" />
      <path d="M12 9.5c1-2.6 3-4 4.6-3.4 1.4.5 1.6 2.6-.4 3.4-1.6.6-3.2 0-4.2 0Z" />
    </svg>
  );
}

export function PixIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 4.5 4.5 8v8L8 19.5h8L19.5 16V8L16 4.5Z" />
      <path d="M9.2 9.2 12 12l2.8-2.8M9.2 14.8 12 12l2.8 2.8" />
    </svg>
  );
}

export function HeartTiny(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 20.2s-7.6-4.7-10-9.2C.4 7.8 2 4.4 5.4 3.7c2-.4 3.9.5 5 2.1 1.1-1.6 3-2.5 5-2.1 3.4.7 5 4.1 3.4 7.3-2.4 4.5-10 9.2-10 9.2Z" />
    </svg>
  );
}
