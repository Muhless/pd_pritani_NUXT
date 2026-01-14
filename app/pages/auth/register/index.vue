<script setup lang="ts">
import { navigateTo, useHead } from "#app";
import { ref } from "vue";
import BaseSelect from "~/components/input/BaseSelect.vue";

useHead({
  title: "Register | Dashboard PG. Pritani",
});

const username = ref("");
const password = ref("");
const role = ref("");
const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "Karyawan", value: "employee" },
];

const loading = ref(false);
const error = ref("");
const registerStore = useRegisterStore();

const handleRegister = async () => {
  error.value = "";
  if (!username.value || !password.value || !role.value) {
    error.value = "Semua data wajib";
    return;
  }

  registerStore.setStep1({
    username: username.value,
    password: password.value,
    role: role.value,
  });

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
          v-model="username"
          id="username"
          label="Username"
          placeholder="Masukkan username anda"
        />
        <BaseInput
          v-model="password"
          id="password"
          label="Password"
          type="password"
          placeholder="*********"
        />

        <BaseSelect
          v-model="role"
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
