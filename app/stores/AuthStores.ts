import { defineStore } from "pinia";

interface User {
  id: number;
  username: string;
  role: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: null,
    user: null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
  },

  actions: {
    // 🔹 LOGIN
    async login(username: string, password: string) {
      try {
        this.loading = true;
        const config = useRuntimeConfig();
        const res = await fetch(`${config.public.apiBase}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        console.log("✅ LOGIN RESPONSE:", data);

        if (!res.ok) {
          throw new Error(data.message || "Login gagal");
        }

        // ✅ Simpan ke state
        this.token = data.token;
        this.user = data.user;

        // ✅ Simpan ke localStorage (PENTING!)
        this.saveToStorage();

        console.log("✅ Login berhasil, state:", {
          token: this.token,
          user: this.user,
          isAuthenticated: this.isAuthenticated,
        });
      } catch (err: any) {
        console.error("❌ Login error:", err);
        throw new Error(err.message);
      } finally {
        this.loading = false;
      }
    },

    // 🔹 LOGOUT
    logout() {
      this.token = null;
      this.user = null;
      this.clearStorage();
      console.log("✅ Logout berhasil");
    },

    // 🔹 SAVE TO LOCALSTORAGE
    saveToStorage() {
      if (process.client) {
        try {
          console.log("💾 Saving to localStorage...");

          if (this.token) {
            localStorage.setItem("token", this.token);
          }

          if (this.user) {
            localStorage.setItem("user", JSON.stringify(this.user));
          }

          console.log("✅ Saved to localStorage:", {
            token: localStorage.getItem("token")?.substring(0, 20) + "...",
            user: localStorage.getItem("user"),
          });
        } catch (err) {
          console.error("❌ Error saving to localStorage:", err);
        }
      }
    },

    // 🔹 LOAD FROM LOCALSTORAGE
    loadFromStorage() {
      if (process.client) {
        try {
          console.log("🔄 Loading from localStorage...");

          const token = localStorage.getItem("token");
          const userStr = localStorage.getItem("user");

          console.log("📦 localStorage values:", {
            token: token ? "EXISTS" : "NULL",
            user: userStr ? "EXISTS" : "NULL",
          });

          if (!token || !userStr) {
            console.log("❌ No data in localStorage");
            return;
          }

          this.token = token;
          this.user = JSON.parse(userStr);

          console.log("✅ Loaded from localStorage:", {
            token: this.token?.substring(0, 20) + "...",
            user: this.user,
            isAuthenticated: this.isAuthenticated,
          });
        } catch (err) {
          console.error("❌ Error loading from localStorage:", err);
          this.clearStorage();
        }
      }
    },

    // 🔹 CLEAR STORAGE
    clearStorage() {
      if (process.client) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log("✅ localStorage cleared");
      }
    },
  },
});
