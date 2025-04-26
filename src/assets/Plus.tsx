export default function Plus({
  width = '48',
  height = '48',
  className,
}: {
  width?: string;
  height?: string;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 48 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 24.5H38" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M24 38.5V10.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
