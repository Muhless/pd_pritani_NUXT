export const useApi = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase || "http://localhost:8080";

  async function get<T>(endpoint: string): Promise<T> {
    const { data, error } = await useFetch<T>(`${baseURL}${endpoint}`);
    if (error.value) throw error.value;
    return data.value as T;
  }

  return { get };
};
