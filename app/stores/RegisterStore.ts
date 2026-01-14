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
      this.step1 = data;
    },
    setstep2(data: any) {
      this.step2 = data;
    },
    clear() {
      this.$reset();
    },
  },
});
