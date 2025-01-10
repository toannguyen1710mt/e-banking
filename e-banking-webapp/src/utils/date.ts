export const formatDate = (date: string): string => {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString('en-GB');
};

export const formatYearMonthToShortDate = (date: string): string => {
  const newDate = new Date(date);
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const year = String(newDate.getFullYear()).slice(-2);

  return `${month}/${year}`;
};

export const formatMonthYear = ({
  year,
  month,
}: {
  year: number;
  month: number;
}) => {
  const formattedMonth = String(month).padStart(2, '0');
  const formattedYear = String(year).slice(-2);
  return `${formattedMonth}/${formattedYear}`;
};
