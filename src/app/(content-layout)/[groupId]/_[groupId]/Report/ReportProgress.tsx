export default function ReportProgress() {
  const percent = 25;
  return (
    <div className="flex gap-10 lg:gap-15">
      <div>원형바</div>
      <div className="hidden md:block">
        <p className="text-md-md">
          오늘의
          <br /> 진행 상황
        </p>
        <p className="text-gradient text-4xl">{percent}%</p>
      </div>
    </div>
  );
}
