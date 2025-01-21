import { QueryParams } from '@/interfaces';
import { formatQueryParams } from '../query-params';

describe('formatQueryParams', () => {
  it('should return empty string if no queryParams are provided', () => {
    expect(formatQueryParams()).toBe('');
  });

  it('should format simple key-value pairs', () => {
    expect(formatQueryParams({ search: 'test' })).toBe('search=test');
  });

  it('should handle sorting with order', () => {
    expect(formatQueryParams({ sort: 'createdAt', order: 'desc' })).toBe(
      `sort=${encodeURIComponent('createdAt:desc')}`,
    );
  });

  it('should handle filters with nested objects', () => {
    expect(
      formatQueryParams({
        filters: {
          category: { $eq: 'books' },
          price: { $gte: 10 },
        },
      }),
    ).toBe(
      'filters%5Bcategory%5D%5B%24eq%5D=books&filters%5Bprice%5D%5B%24gte%5D=10',
    );
  });

  it('should handle population with arrays and strings', () => {
    expect(formatQueryParams({ populate: ['author', 'publisher'] })).toBe(
      'populate=author%2Cpublisher',
    );
    expect(formatQueryParams({ populate: 'comments' })).toBe(
      'populate=comments',
    );
  });

  it('should handle fields with arrays', () => {
    expect(formatQueryParams({ fields: ['title', 'description'] })).toBe(
      'fields=title%2Cdescription',
    );
  });

  it('should handle pagination object', () => {
    expect(formatQueryParams({ pagination: { page: 1, pageSize: 10 } })).toBe(
      'pagination%5Bpage%5D=1&pagination%5BpageSize%5D=10',
    );
  });

  it('should ignore undefined or null values', () => {
    expect(
      formatQueryParams({ search: undefined, pagination: { page: undefined } }),
    ).toBe('pagination%5Bpage%5D=undefined');
  });

  it('should append standalone query parameters correctly', () => {
    const queryParams: Partial<QueryParams> = { search: 'test' };
    expect(formatQueryParams(queryParams)).toBe('search=test');
  });

  it('should append string values correctly', () => {
    const queryParams: Partial<QueryParams> = { search: 'test' };
    expect(formatQueryParams(queryParams)).toBe('search=test');
  });

  it('should append number values correctly', () => {
    const queryParams: Record<string, number> = { age: 30 };
    expect(formatQueryParams(queryParams)).toBe('age=30');
  });

  it('should append boolean values correctly', () => {
    const queryParams: Record<string, boolean> = { isActive: true };
    expect(formatQueryParams(queryParams)).toBe('isActive=true');
  });

  it('should append multiple key-value pairs', () => {
    const queryParams: Record<string, number | boolean | string> = {
      search: 'test',
      age: 30,
      isActive: true,
    };
    expect(formatQueryParams(queryParams)).toBe(
      'search=test&age=30&isActive=true',
    );
  });
});
