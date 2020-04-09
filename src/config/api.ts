import APIService from 'modules/api/APIService';

export const githubApiService = new APIService('https://api.github.com', { logRequests: process.env.NODE_ENV === 'development'});
