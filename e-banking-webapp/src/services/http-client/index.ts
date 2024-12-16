// Constants
import { ERROR_MESSAGES } from '@/constants';

// Interfaces
import { Pagination } from '@/interfaces';

const API_END_POINT = process.env.NEXT_PUBLIC_API_URL || '';

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
      throw new Error(
        `${ERROR_MESSAGES.NETWORK_ERROR}: ${response.status} ${response.statusText}`,
      );
    }

    return {
      data: data as T,
      pagination: (data?.meta?.pagination as Pagination) ?? null,
      error: undefined,
    };
  }

  async get<T>(url: string, options?: RequestInit) {
    try {
      return await this.request<T>('GET', url, null, options);
    } catch (_error) {
      throw new Error(ERROR_MESSAGES.GET_ERROR);
    }
  }

  async post<T>(url: string, body: unknown, options?: RequestInit) {
    try {
      return await this.request<T>('POST', url, body, options);
    } catch (_error) {
      throw new Error(ERROR_MESSAGES.POST_ERROR);
    }
  }

  async put<T>(url: string, body: unknown, options?: RequestInit) {
    try {
      return await this.request<T>('PUT', url, body, options);
    } catch (_error) {
      throw new Error(ERROR_MESSAGES.UPDATE_ERROR);
    }
  }

  async delete<T>(url: string) {
    try {
      return await this.request<T>('DELETE', url);
    } catch (_error) {
      throw new Error(ERROR_MESSAGES.DELETE_ERROR);
    }
  }
}

export const httpClient = new ApiService(API_END_POINT);
