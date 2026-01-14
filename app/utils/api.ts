export const api = async (endpoint: string, options: RequestInit = {}) => {
  const baseUrl = import.meta.env.NUXT_PUBLIC_API_BASE_URL;
  const auth = useAuthStore();

  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  if (auth.token) {
    headers.set("Authorization", `Bearer ${auth.token}`);
  }

  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let err: any = {};
    try {
      err = await res.json();
    } catch {}

    throw new Error(err.message || "Request failed");
  }

  return res.json();
};
