// Constants
import { ERROR_MESSAGES } from '@/constants';

// Interfaces
import { Pagination } from '@/interfaces';

export const API_END_POINT = process.env.NEXT_PUBLIC_API_URL || '';

class ApiService {
  private _apiName: string;

  constructor(api: string) {
    this._apiName = api;
  }

  private async request<T>(
    method: string,
    url: string,
    body?: unknown,
    options?: RequestInit,
  ) {
    const response = await fetch(`${this._apiName}${url}`, {
      method: method,
      headers: {
        'content-type': 'application/json',
        ...(options?.headers || {}),
      },
      body: body ? JSON.stringify(body) : null,
    });

    // Delete successful
    if (response.status === 204) {
      return {};
    }

    const data = await response.json();

    if (!response.ok) {
      if (data.error) {
        return data.error;
      } else {
        throw new Error(
          `${ERROR_MESSAGES.NETWORK_ERROR}: ${response.status} ${response.statusText}`,
        );
      }
    }

    return {
      data: data as T,
      pagination: (data?.meta?.pagination as Pagination) ?? null,
      error: undefined,
    };
  }

  async get<T>(url: string, options?: RequestInit) {
    return await this.request<T>('GET', url, null, options);
  }

  async post<T>(url: string, body: unknown, options?: RequestInit) {
    return await this.request<T>('POST', url, body, options);
  }

  async put<T>(url: string, body: unknown, options?: RequestInit) {
    return await this.request<T>('PUT', url, body, options);
  }

  async delete<T>(url: string) {
    return await this.request<T>('DELETE', url);
  }
}

export const httpClient = new ApiService(API_END_POINT);
