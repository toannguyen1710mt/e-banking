/**
 * Calculate the percentage of a value based on a total.
 *
 * @param value - The part value to calculate the percentage for.
 * @param total - The total value to base the percentage on.
 * @returns - The percentage of the value relative to the total, or 0 if the total is 0.
 *
 * @example
 * calculatePercentage(50, 200); // Returns 25
 * calculatePercentage(30, 0);   // Returns 0 (to avoid division by zero)
 */
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) {
    return 0;
  }

  return (value / total) * 100;
};
