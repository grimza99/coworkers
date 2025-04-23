export function formatToKoreanDate(date: string) {
  const parsedDate = new Date(date);

  const formattedDate = `${parsedDate.getFullYear()}년 ${parsedDate.getMonth() + 1}월 ${String(parsedDate.getDate()).padStart(2, '0')}일`;
  return formattedDate;
}
