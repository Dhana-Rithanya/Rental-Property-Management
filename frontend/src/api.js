const BASE_URL = 'http://localhost:8080/api';

function getCsrfToken() {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

async function handleResponse(res) {
  try {
    return await res.json();
  } catch {
    return { error: `Server error (${res.status})` };
  }
}

export const api = {
  get: (path) =>
    fetch(`${BASE_URL}${path}`, { credentials: 'include' })
      .then(handleResponse)
      .catch(() => ({ error: 'Network error' })),

  post: (path, body) =>
    fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': getCsrfToken() || '',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    })
      .then(handleResponse)
      .catch(() => ({ error: 'Network error' })),

  delete: (path) =>
    fetch(`${BASE_URL}${path}`, {
      method: 'DELETE',
      headers: { 'X-XSRF-TOKEN': getCsrfToken() || '' },
      credentials: 'include',
    })
      .then(handleResponse)
      .catch(() => ({ error: 'Network error' })),
};
