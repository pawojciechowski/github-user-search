import { APIError } from '../errors';
import { APIUrl } from '../types';

const getErrorMessage = (url: APIUrl, options: RequestInit, response?: Response, error?: Error) =>
  `
  API call for ${url} failed with
  "${response ? response.status : error?.message}"
  with following options: ${JSON.stringify(options)}
`
    .replace(/\s+/g, ' ')
    .trim();

const testResponse = { status: 500 } as Response;
const testUrl = 'http://localhost';
const testOptions = {};
const testError = new Error('Test Error');

describe('APIError', () => {
  it('should set message using response param', () => {
    const error = new APIError(testUrl, testOptions, testResponse);
    const error2 = new APIError(testUrl, testOptions, testResponse, testError);

    expect(error.message).toBe(getErrorMessage(testUrl, testOptions, testResponse, undefined));
    expect(error2.message).toBe(getErrorMessage(testUrl, testOptions, testResponse, undefined));
  });

  it('should set message using error param when there is no response param', () => {
    const error = new APIError(testUrl, testOptions, undefined, testError);

    expect(error.message).toBe(getErrorMessage(testUrl, testOptions, undefined, testError));
  });

  it('should include options in the message', () => {
    const error = new APIError(testUrl, testOptions, undefined, testError);

    expect(error.message).toContain(JSON.stringify(testOptions));
  });
});
