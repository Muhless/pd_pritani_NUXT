// Response wrapper dari backend
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export const useApi = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase || "http://localhost:8080";

  /**
   * GET request
   */
  async function get<T>(endpoint: string): Promise<T> {
    try {
      console.log("🔵 Fetching:", `${baseURL}${endpoint}`);

      const response = await $fetch<ApiResponse<T>>(`${baseURL}${endpoint}`, {
        method: "GET",
      });

      console.log("✅ Response:", response);

      // Return data dari wrapper
      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Response tidak valid");
    } catch (err: any) {
      console.error("❌ Error:", err);
      throw new Error(
        err?.data?.message || err?.message || "Gagal mengambil data"
      );
    }
  }

  /**
   * POST request
   */
  async function post<T>(endpoint: string, body?: any): Promise<T> {
    try {
      console.log("🔵 Posting:", `${baseURL}${endpoint}`, body);

      const response = await $fetch<ApiResponse<T>>(`${baseURL}${endpoint}`, {
        method: "POST",
        body: body,
      });

      console.log("✅ Response:", response);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Response tidak valid");
    } catch (err: any) {
      console.error("❌ Error:", err);
      const msg = err?.data?.message || err?.message || "terjadi kesalahan";
      throw new Error(msg);
    }
  }

  /**
   * PUT request
   */
  async function put<T>(endpoint: string, body?: any): Promise<T> {
    try {
      console.log("🔵 Putting:", `${baseURL}${endpoint}`, body);

      const response = await $fetch<ApiResponse<T>>(`${baseURL}${endpoint}`, {
        method: "PUT",
        body: body,
      });

      console.log("✅ Response:", response);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Response tidak valid");
    } catch (err: any) {
      console.error("❌ Error:", err);
      throw new Error(
        err?.data?.message || err?.message || "Gagal mengupdate data"
      );
    }
  }

  /**
   * PATCH request
   */
  async function patch<T>(endpoint: string, body?: any): Promise<T> {
    try {
      console.log("🔵 Patching:", `${baseURL}${endpoint}`, body);

      const response = await $fetch<ApiResponse<T>>(`${baseURL}${endpoint}`, {
        method: "PATCH",
        body: body,
      });

      console.log("✅ Response:", response);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Response tidak valid");
    } catch (err: any) {
      console.error("❌ Error:", err);
      throw new Error(
        err?.data?.message || err?.message || "Gagal mengupdate data"
      );
    }
  }

  /**
   * DELETE request
   */
  async function del<T>(endpoint: string): Promise<T> {
    try {
      console.log("🔵 Deleting:", `${baseURL}${endpoint}`);

      const response = await $fetch<ApiResponse<T>>(`${baseURL}${endpoint}`, {
        method: "DELETE",
      });

      console.log("✅ Response:", response);

      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || "Response tidak valid");
    } catch (err: any) {
      console.error("❌ Error:", err);
      throw new Error(
        err?.data?.message || err?.message || "Gagal menghapus data"
      );
    }
  }

  return {
    get,
    post,
    put,
    patch,
    del,
  };
};
