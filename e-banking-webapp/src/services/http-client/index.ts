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
    options?: RequestInit,
    body?: object,
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
    };
  }

  async get<T>(url: string, options?: RequestInit) {
    return await this.request<T>('GET', url, options);
  }

  async post<T>(url: string, body: {}, options?: RequestInit) {
    return await this.request<T>('POST', url, options, body);
  }

  async put<T>(url: string, body: {}, options?: RequestInit) {
    return await this.request<T>('PUT', url, options, body);
  }

  async delete<T>(url: string) {
    return await this.request<T>('DELETE', url);
  }
}

export const httpClient = new ApiService(API_END_POINT);
