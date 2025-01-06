/**
 * Updates a given `URLSearchParams` object with new parameters.
 * If a parameter's value is `undefined` or an empty string, it will be removed.
 *
 * @param searchParams - The original `URLSearchParams` object to update.
 * @param newParams - An object representing new parameters to set or remove.
 * @returns - A new `URLSearchParams` object with the updated parameters.
 *
 * @example
 * const searchParams = new URLSearchParams('category=books&sort=asc');
 * const newParams = { sort: 'desc', page: '2', category: '' };
 *
 * const updatedParams = updateSearchParams(searchParams, newParams);
 * // updatedParams.toString(); // 'sort=desc&page=2'
 */
export const updateSearchParams = (
  searchParams: URLSearchParams,
  newParams: Record<string, string | undefined>,
): URLSearchParams => {
  const params = new URLSearchParams(searchParams);

  Object.entries(newParams).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  });

  return params;
};
