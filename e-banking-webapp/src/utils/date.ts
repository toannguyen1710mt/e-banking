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

export const getGreeting = () => {
  const hour = new Date().getHours();

  return hour < 12
    ? 'Good Morning'
    : hour < 18
      ? 'Good Afternoon'
      : 'Good Evening';
};

/**
 * Formats the last modified date.
 * @param updatedAt
 * @param createdAt
 * @returns 'YYYY-MM-DD' format.
 */
export const formatLastModified = (
  updatedAt?: string,
  createdAt?: string,
): string => {
  const date = updatedAt || createdAt || '2024-12-18T02:37:12.625Z';
  return date.split('T')[0];
};
