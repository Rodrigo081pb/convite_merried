// Ramo decorativo de folhas, usado nos quatro cantos do convite.
export default function CornerLeaf({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 160 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g fill="none" stroke="#6b8f5e" strokeWidth="1.2" opacity="0.85">
        <path d="M140,10 Q120,40 100,80 Q80,120 70,160" stroke="#8aac7a" strokeWidth="1.5" fill="none" />
        <path d="M120,30 Q140,20 155,35 Q145,55 120,50 Q115,40 120,30Z" fill="#7a9e6a" stroke="none" opacity="0.8" />
        <path d="M120,30 Q137,42 155,35" stroke="#5a7a4a" strokeWidth="0.8" fill="none" />
        <path d="M105,55 Q125,42 138,55 Q128,72 105,68 Q100,61 105,55Z" fill="#6b8f5e" stroke="none" opacity="0.75" />
        <path d="M105,55 Q121,63 138,55" stroke="#4a6a3e" strokeWidth="0.8" fill="none" />
        <path d="M92,82 Q108,68 122,80 Q115,98 92,95 Q87,88 92,82Z" fill="#7a9e6a" stroke="none" opacity="0.7" />
        <path d="M130,18 Q148,8 158,18 Q150,30 130,28Z" fill="#8aac7a" stroke="none" opacity="0.65" />
        <circle cx="125" cy="25" r="3" fill="#c9a84c" opacity="0.8" />
        <circle cx="142" cy="15" r="2" fill="#c9a84c" opacity="0.6" />
        <circle cx="155" cy="22" r="2.5" fill="#c9a84c" opacity="0.7" />
      </g>
    </svg>
  );
}
