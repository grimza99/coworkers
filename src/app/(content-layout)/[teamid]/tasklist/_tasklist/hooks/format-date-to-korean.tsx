export function formatDateToKorean(date: string | Date) {
  const dayArray = ['월', '화', '수', '목', '금', '토', '일'];
  const parseDate = new Date(date);

  const formattedDate = `${String(parseDate.getMonth() + 1)}월 ${String(parseDate.getDate())}일 (${dayArray[parseDate.getDay()]})`;
  return formattedDate;
}
