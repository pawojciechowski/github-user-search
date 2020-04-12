import { APIUrl } from './types';
import { APIError } from './errors';

export interface RequestOptions extends RequestInit {
  mockResponse?: { [key: string]: any };
  logRequests?: boolean;
}

export async function request<T>(url: APIUrl, options: RequestOptions = {}): Promise<T> {
  if (!options?.mockResponse) {
    try {
      if (options?.logRequests) console.log(`${options.method || 'GET'}: ${url}`);
      const response: Response = await fetch(url, options);
      if (response.ok) {
        return await response.json();
      } else {
        throw new APIError(url, options, response);
      }
    } catch (err) {
      if (err instanceof APIError) {
        throw err;
      } else {
        throw new APIError(url, options, undefined, err);
      }
    }
  } else {
    return options.mockResponse as T;
  }
}
