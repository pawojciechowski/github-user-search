type URL = string;

export interface IAPIService {
  get<T>(url: URL, params?: {[key: string]: string}): Promise<T>;
}

interface APIServiceOptions {
  headers?: Headers;
  mockResponse?: {[key: string]: any};
  logRequests?: boolean
}

class APIServiceError extends Error {
  url: string;
  options: RequestInit;
  response?: Response;
  error?: Error;

  constructor(
    url: string,
    options: RequestInit,
    response?: Response,
    error?: Error,
  ) {
    super(`
      API call for ${url} failed with
      "${response ? response.status : error?.message}"
      with following options: ${JSON.stringify(options)}
    `);
    this.url = url;
    this.options = options;
    this.response = response;
    this.error = error;
  }
}

class APIService implements IAPIService {
  private headers?: Headers;
  private baseUrl: string;
  private mockResponse?: {[key: string]: any};
  private logRequests: boolean;

  constructor(baseUrl: string, options?: APIServiceOptions) {
    this.baseUrl = baseUrl;
    this.headers = options?.headers;
    this.mockResponse = options?.mockResponse;
    this.logRequests = !!options?.logRequests;
  }

  async get<T>(url: URL, params?: {[key: string]: string}): Promise<T> {
    let qs = params
      ? Object.keys(params).reduce(
          (acc, next) => `${acc}${next}=${params[next]}&`,
          '',
        )
      : '';
    if (qs[qs.length - 1] === '&') qs = qs.slice(0, -1);
    qs = encodeURI(qs);

    return await this.request<T>(`${url}${qs ? '?' : ''}${qs}`, {
      method: 'GET',
    });
  }

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    if (this.headers) {
      if (options.headers) {
        options.headers = {...this.headers, ...options.headers};
      } else {
        options.headers = this.headers;
      }
    }

    if (!this.mockResponse) {
      try {
        const uri = `${this.baseUrl.replace(/\/$/, '')}${url}`;
        if (this.logRequests) console.log(`${options.method}: ${uri}`);
        const response: Response = await fetch(uri, options);

        if (response.ok) {
          return await response.json();
        } else {
          throw new APIServiceError(url, options, response);
        }
      } catch (err) {
        throw new APIServiceError(url, options, undefined, err);
      }
    } else {
      return this.mockResponse as T;
    }
  }
}

export default APIService;
