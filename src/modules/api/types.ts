export type APIUrl = string;

export interface IAPIService {
  get<T>(url: APIUrl, params?: { [key: string]: string }): Promise<T>;
}

export interface APIServiceOptions {
  headers?: { [key: string]: string };
  mockResponse?: { [key: string]: any };
  logRequests?: boolean;
}
