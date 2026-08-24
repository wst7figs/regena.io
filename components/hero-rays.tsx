const mineralRays = Array.from({ length: 18 }, (_, index) => {
  const start = 920 - index * 18;
  const first = 860 - index * 18;
  const middle = 570 - index * 9;
  const upper = 485 - index * 6;
  const end = 40 + index * 8;

  return `M -220 ${start} C 170 ${first}, 410 ${650 - index * 12}, 690 ${middle} C 990 ${upper}, 1180 ${210 - index * 4}, 1710 ${end}`;
});

const violetRays = Array.from({ length: 11 }, (_, index) => {
  const start = 1060 + index * 16;
  const middle = 780 - index * 4;
  const end = 430 + index * 10;

  return `M -160 ${start} C 270 ${980 + index * 5}, 610 ${815 - index * 4}, 900 ${middle} C 1190 ${745 - index * 4}, 1420 ${550 + index * 6}, 1760 ${end}`;
});

export function HeroRays() {
  return (
    <svg
      className="hero-rays"
      data-testid="hero-rays"
      viewBox="0 0 1600 980"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-ray-mineral" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#74c9af" stopOpacity="0" />
          <stop offset="20%" stopColor="#9be7cb" stopOpacity="0.88" />
          <stop offset="68%" stopColor="#4ca69a" stopOpacity="0.66" />
          <stop offset="92%" stopColor="#145f57" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#145f57" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="hero-ray-violet" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#74c9af" stopOpacity="0" />
          <stop offset="34%" stopColor="#74c9af" stopOpacity="0.32" />
          <stop offset="70%" stopColor="#9a7de2" stopOpacity="0.62" />
          <stop offset="94%" stopColor="#9a7de2" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#9a7de2" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="hero-ray-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id="hero-ray-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <mask id="hero-ray-fade">
          <rect width="1600" height="980" fill="url(#hero-ray-mask-gradient)" />
        </mask>
        <linearGradient id="hero-ray-mask-gradient" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="black" />
          <stop offset="12%" stopColor="white" />
          <stop offset="88%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </linearGradient>
      </defs>

      <g className="hero-ray-bundle hero-ray-bundle-mineral" data-ray-bundle="mineral" mask="url(#hero-ray-fade)">
        <path
          className="hero-ray-aura"
          d="M -220 800 C 210 710, 440 545, 720 465 C 1030 375, 1220 120, 1710 90"
          stroke="#74c9af"
          filter="url(#hero-ray-glow)"
        />
        {mineralRays.map((path, index) => (
          <path
            className="hero-ray-line"
            d={path}
            key={path}
            stroke="url(#hero-ray-mineral)"
            strokeWidth={index % 5 === 0 ? 1.9 : 1.05}
            opacity={0.38 + (index % 6) * 0.085}
          />
        ))}
        <path className="hero-ray-sheen" d={mineralRays[4]} stroke="url(#hero-ray-sheen)" />
        <path className="hero-ray-sheen hero-ray-sheen-delayed" d={mineralRays[12]} stroke="url(#hero-ray-sheen)" />
      </g>

      <g className="hero-ray-bundle hero-ray-bundle-violet" data-ray-bundle="violet" mask="url(#hero-ray-fade)">
        <path
          className="hero-ray-aura hero-ray-aura-violet"
          d="M -120 1040 C 300 970, 610 820, 920 775 C 1240 730, 1460 540, 1740 490"
          stroke="#9a7de2"
          filter="url(#hero-ray-glow)"
        />
        {violetRays.map((path, index) => (
          <path
            className="hero-ray-line"
            d={path}
            key={path}
            stroke="url(#hero-ray-violet)"
            strokeWidth={index % 4 === 0 ? 1.7 : 1}
            opacity={0.29 + (index % 5) * 0.08}
          />
        ))}
        <path className="hero-ray-sheen hero-ray-sheen-violet" d={violetRays[5]} stroke="url(#hero-ray-sheen)" />
      </g>
    </svg>
  );
}
