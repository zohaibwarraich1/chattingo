// Derive API base URL
// 1) Prefer explicit env (REACT_APP_API_URL)
// 2) If running on a non-localhost host, use current hostname with backend port 8080
// 3) Fallback to localhost:8080 for local dev
const deriveDefaultApiBaseUrl = () => {
  try {
    const { protocol, hostname } = window.location;
    const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";
    if (!isLocalhost && hostname) {
      return `${protocol}//${hostname}`;
    }
  } catch (_) {
    // window not available (e.g., tests) – ignore and use fallback
  }
  return "http://localhost:8080";
};

export const BASE_API_URL =
  process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL.trim() !== ""
    ? process.env.REACT_APP_API_URL
    : deriveDefaultApiBaseUrl();

