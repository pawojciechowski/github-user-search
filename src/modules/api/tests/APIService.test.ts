import APIService from '../APIService';
import { request } from '../request';

const baseUrl = 'http://localhost';
const getUrl = '/get_url';
const testData = { testData: 'testData' };
const testParams = { testParam1: 'testParam1', testParam2: 'testParam2' };
const testHeaders = { testHeader: 'testHeader' };
const testMockResponse = { testMockResponse: 'testMockResponse' };

jest.mock('../request');

describe('APIService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should allow to use get method for making requests via request function', async () => {
    const requestMock = request as jest.MockedFunction<typeof request>;
    requestMock.mockReturnValue(Promise.resolve(testData));

    const apiService = new APIService(baseUrl);
    const response = await apiService.get(getUrl);
    const calls = requestMock.mock.calls;

    expect(calls.length).toBe(1);
    expect(calls[0][0]).toBe(`${baseUrl}${getUrl}`);
    expect(calls[0][1]).toEqual({
      method: 'GET',
      mockResponse: undefined,
      logRequests: false,
    });
    expect(response).toEqual(testData);
  });

  describe('APIService.get', () => {
    it('should pass APIService constructor params to the request function', async () => {
      const requestMock = request as jest.MockedFunction<typeof request>;
      requestMock.mockReturnValue(Promise.resolve(testMockResponse));

      const apiService = new APIService(baseUrl, {
        headers: testHeaders,
        mockResponse: testMockResponse,
        logRequests: true,
      });
      const response = await apiService.get(getUrl);
      const calls = requestMock.mock.calls;

      expect(calls.length).toBe(1);
      expect(calls[0][0]).toBe(`${baseUrl}${getUrl}`);
      expect(calls[0][1]).toEqual({
        method: 'GET',
        mockResponse: testMockResponse,
        logRequests: true,
        headers: testHeaders,
      });
      expect(response).toEqual(testMockResponse);
    });

    it('should allow to pass params as a second argument', async () => {
      const requestMock = request as jest.MockedFunction<typeof request>;

      const apiService = new APIService(baseUrl);
      await apiService.get(getUrl, testParams);
      const calls = requestMock.mock.calls;

      expect(calls.length).toBe(1);
      expect(calls[0][0]).toBe(`${baseUrl}${getUrl}?testParam1=testParam1&testParam2=testParam2`);
    });

    it('should encode queryset params using encodeURI before appending to the URL', async () => {
      const requestMock = request as jest.MockedFunction<typeof request>;
      const originalEncodeURI = window.encodeURI;
      window.encodeURI = jest.fn().mockImplementation(() => 'encodedURI');

      const apiService = new APIService(baseUrl);
      await apiService.get(getUrl, testParams);
      const calls = requestMock.mock.calls;

      expect(calls.length).toBe(1);
      expect(calls[0][0]).toBe(`${baseUrl}${getUrl}?encodedURI`);

      window.encodeURI = originalEncodeURI;
    });
  });
});
