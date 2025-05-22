export default function BouncingDots({ size = 8 }: { size?: number }) {
  return (
    <div className="flex gap-2">
      <div
        className="bg-gray300 animate-bounce rounded-full delay-75"
        style={{ width: size, height: size }}
      />
      <div
        className="bg-gray300 animate-[bounce_1s_infinite_200ms] rounded-full delay-100"
        style={{ width: size, height: size }}
      />
      <div
        className="bg-gray300 animate-[bounce_1s_infinite_400ms] rounded-full delay-150"
        style={{ width: size, height: size }}
      />
    </div>
  );
}
