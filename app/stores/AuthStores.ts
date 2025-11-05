import { defineStore } from "pinia";

interface User {
  id: number;
  username: string;
  role: string;
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
        console.log("LOGIN RESPONSE:", data);

        if (!res.ok) {
          throw new Error(data.message || "Login gagal");
        }

        // ✅ Simpan ke state
        this.token = data.token;
        this.user = data.user;

        // ✅ Simpan ke cookie
        this.saveToCookie();

        console.log("User tersimpan di store:", this.user);
      } catch (err: any) {
        throw new Error(err.message);
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      
      // ✅ Hapus cookie
      const tokenCookie = useCookie("token", { path: "/" });
      const userCookie = useCookie("user", { path: "/" });
      
      tokenCookie.value = null;
      userCookie.value = null;
    },

    loadFromCookie() {
      try {
        const tokenCookie = useCookie<string | null>("token", { path: "/" });
        const userCookie = useCookie<string | null>("user", { path: "/" });
        
        console.log("Raw cookie values:", {
          token: tokenCookie.value,
          user: userCookie.value
        });

        // ✅ Load token
        this.token = tokenCookie.value ?? null;

        // ✅ Load dan parse user
        if (userCookie.value) {
          const userValue = userCookie.value;
          
          // Cek apakah cookie rusak
          if (userValue === '[object Object]' || userValue === 'null' || userValue === 'undefined') {
            console.warn("Cookie rusak terdeteksi, dibersihkan");
            throw new Error('Invalid cookie format');
          }

          // Parse JSON
          this.user = JSON.parse(userValue);
          console.log("User berhasil di-load:", this.user);
        } else {
          this.user = null;
        }
      } catch (err) {
        console.error("Gagal parse user dari cookie:", err);
        
        // ✅ Clear semua cookie yang rusak
        this.token = null;
        this.user = null;
        
        const tokenCookie = useCookie("token", { path: "/" });
        const userCookie = useCookie("user", { path: "/" });
        
        tokenCookie.value = null;
        userCookie.value = null;
        
        console.log("Cookie rusak telah dibersihkan");
      }
    },

    saveToCookie() {
      const tokenCookie = useCookie<string | null>("token", { 
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 hari
        sameSite: 'lax'
      });
      
      const userCookie = useCookie<string | null>("user", { 
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 hari
        sameSite: 'lax'
      });

      // ✅ Simpan token
      tokenCookie.value = this.token;
      
      // ✅ Stringify user dengan benar
      if (this.user) {
        const userJson = JSON.stringify(this.user);
        userCookie.value = userJson;
        console.log("Cookie disimpan:", { 
          token: this.token, 
          userJson: userJson 
        });
      } else {
        userCookie.value = null;
      }
    },
  },
});