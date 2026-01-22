<script setup lang="ts">
import { navigateTo, useHead } from "#app";
import { ref } from "vue";
import BaseInput from "~/components/input/BaseInput.vue";
import BaseSelect from "~/components/input/BaseSelect.vue";

useHead({
  title: "Register | Dashboard PG. Pritani",
});

const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "Karyawan", value: "employee" },
];

const loading = ref(false);
const error = ref("");
const registerStore = useRegisterStore();

const handleRegister = async () => {
  error.value = "";

  // Ambil nilai dari store
  const { username, password, role } = registerStore.step1;

  if (!username || !password || !role) {
    error.value = "Semua field harus diisi";
    return;
  }

  if (username.length < 3) {
    error.value = "Username minimal 3 karakter";
    return;
  }

  if (password.length < 6) {
    error.value = "Password minimal 6 karakter";
    return;
  }

  // ✅ SIMPAN dengan nilai eksplisit
  registerStore.setStep1({
    username: username,
    password: password,
    role: role,
  });

  console.log("✅ Step 1 tersimpan:", JSON.stringify(registerStore.step1));

  navigateTo("/auth/register/profile");
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div
      class="flex flex-col items-center justify-center text-center bg-white w-96 p-8 rounded-lg"
    >
      <div class="mb-4 flex flex-col items-center">
        <img
          src="/images/logo-pritani.png"
          alt="logo-pritani"
          class="w-12 h-auto"
        />
        <h1 class="mb-2 text-4xl font-bold text-green-600">Registrasi Akun</h1>
        <p class="text-gray-600">Silahkan isi username dan password anda</p>
      </div>

      <form
        @submit.prevent="handleRegister"
        class="flex flex-col space-y-5 w-full"
      >
        <BaseInput
          v-model="registerStore.step1.username"
          id="username"
          label="Username"
          placeholder="Masukkan username anda"
        />
        <BaseInput
          v-model="registerStore.step1.password"
          id="password"
          label="Password"
          type="password"
          placeholder="*********"
        />

        <BaseSelect
          v-model="registerStore.step1.role"
          id="role"
          name="role"
          label="Posisi"
          :options="roleOptions"
          placeholder="Pilih posisi"
        />

        <p v-if="error" class="mt-2 text-sm text-red-500">{{ error }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          {{ loading ? "Memproses..." : "Daftar" }}
        </button>

        <p class="text-gray-500">
          Sudah punya akun?
          <NuxtLink
            to="/auth/login"
            class="underline hover:text-green-600 transition"
          >
            Login Disini
          </NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>
