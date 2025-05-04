import clsx from 'clsx';

interface Props {
  percent: number;
  size: 'md' | 'lg';
  className?: string;
}

export default function CircularProgress({ percent, size, className }: Props) {
  const stroke = size === 'lg' ? 29.5793 : 24;
  const normalizedRadius = size === 'lg' ? 70 : 56.3107;
  const cx = size === 'lg' ? 85 : 68;
  const cy = size === 'lg' ? 85 : 68;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  const gradientId = size === 'lg' ? 'gradient-lg' : 'gradient-md';

  return (
    <div className="relative">
      <svg
        className={clsx(
          size === 'lg' && 'h-[170px] w-[170px]',
          size === 'md' && 'h-[137px] w-[137px]',
          className
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="transparent"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#a3e635" />
          </linearGradient>
        </defs>
        <circle stroke="#334155" strokeWidth={stroke} r={normalizedRadius} cx={cx} cy={cy} />
        <circle
          stroke={`url(#${gradientId})`}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference + ' ' + circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={cx}
          cy={cy}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      {size === 'md' && (
        <div className="absolute top-[calc(50%-20px)] right-[calc(50%-20px)] flex h-10 w-10 flex-col items-center justify-center md:hidden">
          <span className="text-gray100 text-xs">오늘</span>
          <span className="text-xl-bold text-gradient">{percent}%</span>
        </div>
      )}
    </div>
  );
}
