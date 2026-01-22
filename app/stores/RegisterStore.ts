export const useRegisterStore = defineStore("register", {
  state: () => ({
    step1: {
      username: "",
      password: "",
      role: "",
    },
    step2: {
      name: "",
      email: "",
      phone: "",
      address: "",
      photo: "",
    },
  }),

  actions: {
    setStep1(data: { username: string; password: string; role: string }) {
      this.step1.username = data.username;
      this.step1.password = data.password;
      this.step1.role = data.role;

      // Simpan ke sessionStorage
      if (process.client) {
        sessionStorage.setItem("register_step1", JSON.stringify(this.step1));
      }

      console.log("💾 Step1 tersimpan:", this.step1);
    },

    setStep2(data: {
      name: string;
      email: string;
      phone: string;
      address: string;
      photo: string;
    }) {
      this.step2.name = data.name;
      this.step2.email = data.email;
      this.step2.phone = data.phone;
      this.step2.address = data.address;
      this.step2.photo = data.photo;

      // Simpan ke sessionStorage
      if (process.client) {
        sessionStorage.setItem("register_step2", JSON.stringify(this.step2));
      }

      console.log("💾 Step2 tersimpan:", this.step2);
    },

    loadFromStorage() {
      if (process.client) {
        const step1Data = sessionStorage.getItem("register_step1");
        const step2Data = sessionStorage.getItem("register_step2");

        if (step1Data) {
          const parsed = JSON.parse(step1Data);
          this.step1 = parsed;
        }

        if (step2Data) {
          const parsed = JSON.parse(step2Data);
          this.step2 = parsed;
        }
      }
    },

    async submitRegister() {
      // Load data dari storage dulu
      this.loadFromStorage();

      const payload = {
        username: this.step1.username,
        password: this.step1.password,
        role: this.step1.role,
        name: this.step2.name,
        email: this.step2.email,
        phone: this.step2.phone,
        address: this.step2.address,
        photo: this.step2.photo,
      };

      console.log("📤 Payload yang dikirim:", payload);

      try {
        const config = useRuntimeConfig();
        const res = await $fetch(`${config.public.apiBase}/api/auth/register`, {
          method: "POST",
          body: payload,
        });

        console.log("✅ Response dari BE:", res);
        this.clear();

        // Clear storage
        if (process.client) {
          sessionStorage.removeItem("register_step1");
          sessionStorage.removeItem("register_step2");
        }

        return res;
      } catch (error: any) {
        console.error("❌ Error detail:", error?.data || error);
        throw error;
      }
    },

    clear() {
      this.$reset();
    },
  },
});
