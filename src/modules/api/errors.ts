export class APIError extends Error {
  url: string;
  options: RequestInit;
  response?: Response;
  error?: Error;

  constructor(url: string, options: RequestInit, response?: Response, error?: Error) {
    super(
      `
      API call for ${url} failed with
      "${response ? response.status : error?.message}"
      with following options: ${JSON.stringify(options)}
    `
        .replace(/\s+/g, ' ')
        .trim()
    );
    this.url = url;
    this.options = options;
    this.response = response;
    this.error = error;
  }
}
