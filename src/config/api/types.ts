// TODO: Verify types

export interface GithubUserResponse {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
}

export interface GithubReposResponseRepository {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
}

export interface GithubReposResponse extends Array<GithubReposResponseRepository> {}
