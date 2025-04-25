export default function Repeat({
  width = '16',
  height = '16',
  color,
  className,
}: {
  width?: string;
  height?: string;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 10L8 12L10 14" fill={color} />
      <path d="M10 10L8 12L10 14V10Z" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M8 12H12.8462C14.0357 12 15 11.0449 15 9.86667V6.13333C15 4.95512 14.0357 4 12.8462 4H11.2308"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6 6L8 4L6 2" fill={color} />
      <path d="M6 6L8 4L6 2V6Z" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M8 4H3.15385C1.96431 4 1 4.95513 1 6.13333V9.86667C1 11.0449 1.96431 12 3.15385 12H4.76923"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
