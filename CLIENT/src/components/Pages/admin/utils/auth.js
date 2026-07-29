// TODO: remove hardcoded fallback when backend is connected
const DEMO_ADMIN = {
  username: 'admin@nidhivan.com',
  password: 'admin123',
};

const AUTH_KEY = 'nidhivan_admin_auth';

// Future-ready wrapper: tries real API first, falls back to hardcoded check
export async function loginAdmin(username, password) {
  try {
    // TODO: replace this block with real API call when backend is ready
    // const res = await fetch('/api/admin/login', { method: 'POST', body: JSON.stringify({ username, password }) });
    // if (!res.ok) throw new Error('API login failed');
    // const data = await res.json();
    // localStorage.setItem(AUTH_KEY, JSON.stringify(data));
    // return { success: true };

    throw new Error('No backend connected yet'); // forces fallback below
  } catch (err) {
    // Fallback: hardcoded credential check (TEMPORARY — remove with backend integration)
    if (username === DEMO_ADMIN.username && password === DEMO_ADMIN.password) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ username, loggedInAt: Date.now() }));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  }
}

export function logoutAdmin() {
  localStorage.removeItem(AUTH_KEY);
}

export function isAdminAuthenticated() {
  return !!localStorage.getItem(AUTH_KEY);
}

export const DEMO_CREDENTIALS_DISPLAY = DEMO_ADMIN; // used to show on login page
