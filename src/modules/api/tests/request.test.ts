import { withFetchMock, MockedFetch } from './fetchMock';
import { request } from '../request';
import { APIError } from '../errors';

const url = 'http://localhost/url';
const testData = { testData: 'testData' };
const testMockedResponse = { testMockedResponse: 'testMockedResponse' };
const errorResponse = { ok: false, status: 500 };
const fetchError = new Error('Fetch error');

describe('request function', () => {
  it('should allow to make requests using fetch', () => {
    return withFetchMock({ responseData: testData })(async () => {
      const response = await request(url);
      const calls = ((window.fetch as unknown) as MockedFetch).mock.calls;
      expect(calls.length).toBe(1);
      expect(calls[0][0]).toBe(url);
      expect(response).toEqual(testData);
    });
  });

  it('should return promise with mock response, without calling fetch, when `mockResponse` is in options', async () => {
    const response = await request(url, {
      mockResponse: testMockedResponse,
    });
    expect(response).toEqual(testMockedResponse);
  });

  it('should console.log request when `logRequest` option is passed', () => {
    return withFetchMock()(async () => {
      const originalConsoleLog = console.log;
      const mockedConsoleLog = (console.log = jest.fn().mockImplementation((text) => text));

      await request(url, {
        logRequests: true,
      });

      expect(mockedConsoleLog.mock.calls.length).toBe(1);
      expect(mockedConsoleLog.mock.calls[0][0]).toBe(`GET: ${url}`);

      console.log = originalConsoleLog;
    });
  });

  it('should throw APIError error when response.ok is false', () => {
    return withFetchMock({ response: errorResponse })(async () => {
      expect.assertions(2);

      try {
        await request(url);
      } catch (e) {
        expect(e).toMatchObject(new APIError(url, {}, errorResponse as Response));
        expect(e.response).toMatchObject(errorResponse);
      }
    });
  });

  it('should throw APIError when fetch throws an error', () => {
    return withFetchMock({
      mockedFetch: () => {
        throw fetchError;
      },
    })(async () => {
      expect.assertions(1);

      try {
        await request(url);
      } catch (e) {
        expect(e).toMatchObject(new APIError(url, {}, undefined, fetchError));
      }
    });
  });
});
