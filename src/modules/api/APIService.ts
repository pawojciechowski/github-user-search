import { IAPIService, APIUrl, APIServiceOptions } from './types';
import { request as requestFunction } from './request';

class APIService implements IAPIService {
  private headers?: { [key: string]: string };
  private baseUrl: string;
  private mockResponse?: { [key: string]: any };
  private logRequests: boolean;

  constructor(baseUrl: string, options?: APIServiceOptions) {
    this.baseUrl = baseUrl;
    this.headers = options?.headers;
    this.mockResponse = options?.mockResponse;
    this.logRequests = !!options?.logRequests;
  }

  async get<T>(url: APIUrl, params?: { [key: string]: string }): Promise<T> {
    let qs = params ? Object.keys(params).reduce((acc, next) => `${acc}${next}=${params[next]}&`, '') : '';
    if (qs[qs.length - 1] === '&') qs = qs.slice(0, -1);
    qs = encodeURI(qs);

    return await this.request<T>(`${url}${qs ? '?' : ''}${qs}`, {
      method: 'GET',
    });
  }

  private request<T>(url: string, options: RequestInit): Promise<T> {
    const uri = `${this.baseUrl.replace(/\/$/, '')}${url}`;
    if (this.headers) {
      if (options.headers) {
        options.headers = { ...this.headers, ...options.headers };
      } else {
        options.headers = this.headers;
      }
    }
    return requestFunction<T>(uri, {
      ...options,
      mockResponse: this.mockResponse,
      logRequests: this.logRequests,
    });
  }
}

export default APIService;
