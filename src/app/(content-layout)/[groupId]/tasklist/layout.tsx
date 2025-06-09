export default function TaskListPageLayout({
  children,
  detailTask,
}: {
  children: React.ReactNode;
  detailTask: React.ReactNode;
}) {
  return (
    <>
      {children}
      {detailTask}
    </>
  );
}
