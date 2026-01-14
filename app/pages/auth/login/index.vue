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
        <h1 class="mb-2 text-4xl font-bold text-green-600">Selamat Datang</h1>
        <p class="text-gray-600">Silahkan login terlebih dahulu.</p>
      </div>

      <form
        @submit.prevent="handleLogin"
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

        <p
          class="text-gray-400 text-sm hover:cursor-pointer hover:text-green-400 transition"
        >
          Lupa password?
        </p>
        <p v-if="error" class="mt-2 text-sm text-red-500">{{ error }}</p>

        <button
          class="flex items-center justify-center py-3 mt-4 space-x-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition"
          type="submit"
          :disabled="auth.loading"
        >
          <span v-if="auth.loading" class="flex items-center space-x-2">
            <svg
              class="w-5 h-5 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <span>Memproses...</span>
          </span>
          <p v-else>Masuk</p>
          <Icon v-if="!auth.loading" icon="mdi:arrow-right" class="w-5 h-5" />
        </button>

        <p class="text-gray-500">
          Belum punya akun?
          <NuxtLink
            to="/auth/register"
            class="underline hover:text-green-600 transition"
          >
            Buat Disini
          </NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo, useHead } from "#app";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import BaseInput from "~/components/input/BaseInput.vue";
import { useAuthStore } from "~/stores/AuthStores";

useHead({
  title: "Login | Dashboard PG. Pritani ",
  meta: [{ name: "login", content: "Login Page" }],
});

const username = ref("");
const password = ref("");
const error = ref("");
const auth = useAuthStore();

const handleLogin = async () => {
  try {
    await auth.login(username.value, password.value);
    navigateTo("/dashboard");
  } catch (err: any) {
    error.value = err?.message || "Terjadi kesalahan saat login.";
  }
};
</script>
