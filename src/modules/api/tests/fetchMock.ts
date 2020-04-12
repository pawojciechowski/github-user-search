export interface FetchMockOptions {
  response?: Partial<Response>;
  responseData?: {};
  mockedFetch?: () => any;
}

export interface MockedFetch extends jest.Mock<() => Promise<Partial<Response>>> {}

function defaultMockedFetchFunction(response?: Partial<Response>, responseData?: {}) {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(responseData || { test: 'Test' }),
    ...response,
  });
}

export class FetchMock {
  static originalFetch = window.fetch;
  private response?: Partial<Response>;
  private responseData?: {};
  private mockedFetch?: () => any;

  constructor(options?: FetchMockOptions) {
    this.response = options?.response;
    this.responseData = options?.responseData;
    this.mockedFetch = options?.mockedFetch;
  }

  private getFetchFunction() {
    return this.mockedFetch || (() => defaultMockedFetchFunction(this.response, this.responseData));
  }

  unmockFetch() {
    window.fetch = FetchMock.originalFetch;
  }

  mockFetch() {
    const fetchFcn = this.getFetchFunction();
    window.fetch = jest.fn().mockImplementation(() => fetchFcn());
  }
}

export function withFetchMock(options?: FetchMockOptions): (fn: () => Promise<any>) => Promise<any> {
  return async function (fn: () => Promise<any>): Promise<any> {
    const fetchMock = new FetchMock(options);
    fetchMock.mockFetch();
    const result = await fn();
    fetchMock.unmockFetch();
    return result;
  };
}
