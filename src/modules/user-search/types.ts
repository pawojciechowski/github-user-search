export interface GithubUserResponse {
  login: string,
  name: string,
  bio: string | null,
  avatar_url: string
}

export interface GithubReposResponseRepo {
  id: number,
  name: string,
  html_url: string,
  stargazers_count: number
}

export interface GithubReposResponse extends Array<GithubReposResponseRepo> {}
