export function formatDateToKorean(date: string | Date) {
  const parseDate = new Date(date);
  const formattedDate = `${parseDate.getFullYear()}.${String(parseDate.getMonth() + 1).padStart(
    2,
    '0'
  )}.${String(parseDate.getDate()).padStart(2, '0')}`;
  return formattedDate;
}
