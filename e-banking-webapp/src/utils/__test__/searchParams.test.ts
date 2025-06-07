import { updateSearchParams } from '../search-params';

describe('updateSearchParams', () => {
  it('should update searchParams with new values', () => {
    const searchParams = new URLSearchParams('category=books&sort=asc');
    const newParams = { sort: 'desc', page: '2', category: '' };

    const updatedParams = updateSearchParams(searchParams, newParams);
    expect(updatedParams.toString()).toBe('sort=desc&page=2');
  });

  it('should remove parameters with empty string or undefined value', () => {
    const searchParams = new URLSearchParams('category=books&sort=asc');
    const newParams = { category: '', sort: undefined };

    const updatedParams = updateSearchParams(searchParams, newParams);
    expect(updatedParams.toString()).toBe('');
  });

  it('should keep existing parameters if not specified for removal', () => {
    const searchParams = new URLSearchParams('category=books&sort=asc');
    const newParams = { page: '2' };

    const updatedParams = updateSearchParams(searchParams, newParams);
    expect(updatedParams.toString()).toBe('category=books&sort=asc&page=2');
  });

  it('should handle the case where newParams is empty', () => {
    const searchParams = new URLSearchParams('category=books&sort=asc');
    const newParams = {};

    const updatedParams = updateSearchParams(searchParams, newParams);
    expect(updatedParams.toString()).toBe('category=books&sort=asc');
  });

  it('should return an empty URLSearchParams object if no initial parameters are provided', () => {
    const searchParams = new URLSearchParams();
    const newParams = { sort: 'desc' };

    const updatedParams = updateSearchParams(searchParams, newParams);
    expect(updatedParams.toString()).toBe('sort=desc');
  });

  it('should update multiple parameters correctly', () => {
    const searchParams = new URLSearchParams('category=books&sort=asc');
    const newParams = { category: 'electronics', sort: 'desc' };

    const updatedParams = updateSearchParams(searchParams, newParams);
    expect(updatedParams.toString()).toBe('category=electronics&sort=desc');
  });

  it('should handle URLSearchParams with only one parameter', () => {
    const searchParams = new URLSearchParams('category=books');
    const newParams = { category: '' };

    const updatedParams = updateSearchParams(searchParams, newParams);
    expect(updatedParams.toString()).toBe('');
  });
});
