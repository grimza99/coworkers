import '@/app/globals.css';

export default function FormPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center">
      {/* h-dvh 클래스 유무에 따라 상단 마진이 크게 바뀌는 것 같습니다. 필요한 클래스일까요? - @KSJ27 */}
      <div className="mx-4 mt-6 flex h-dvh w-full max-w-115 min-w-[343px] md:mx-6 md:mt-25 lg:mt-35">
        {children}
      </div>
    </div>
  );
}
