// Helper to centralize reading Vite env tokens and building fetch headers
const _env = (import.meta as any).env || {};

export function getGithubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};
  const token = _env.VITE_GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export function getGitlabHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};
  // Support either PRIVATE-TOKEN or Bearer tokens
  const privateToken = _env.VITE_GITLAB_PRIVATE_TOKEN;
  const bearer = _env.VITE_GITLAB_TOKEN;
  if (privateToken) headers['PRIVATE-TOKEN'] = privateToken;
  else if (bearer) headers.Authorization = `Bearer ${bearer}`;
  return headers;
}

export function getGiteaHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};
  const token = _env.VITE_GITEA_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}
