export default function CommentSubmit({
  width = '24',
  height = '24',
  color,
  className,
  onClick,
}: {
  width?: string;
  height?: string;
  color?: string;
  className?: string;
  onClick: () => void;
}) {
  return (
    <svg
      onClick={onClick}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill={color} />
      <path
        d="M8 11L12 7M12 7L16 11M12 7V16"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
