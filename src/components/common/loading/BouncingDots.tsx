export default function BouncingDots() {
  return (
    <div className="flex gap-2">
      <div className="bg-gray300 h-2 w-2 animate-bounce rounded-full delay-75" />
      <div className="bg-gray300 h-2 w-2 animate-[bounce_1s_infinite_200ms] rounded-full delay-100" />
      <div className="bg-gray300 h-2 w-2 animate-[bounce_1s_infinite_400ms] rounded-full delay-150" />
    </div>
  );
}
