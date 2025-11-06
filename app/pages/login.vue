<template>
  <div class="flex space-x-3">
    <div class="w-2/3">
      <img src="/images/bg-1.jpg" alt="Login" class="h-full" />
    </div>

    <div
      class="w-1/3 min-h-screen flex flex-col items-center justify-center text-center"
    >
      <div class="mb-4">
        <h1 class="text-4xl font-bold text-green-600 mb-4">Selamat Datang</h1>
        <p class="text-gray-700">Silahkan login terlebih dahulu.</p>
      </div>

      <form @submit.prevent="handleLogin" class="flex flex-col space-y-5">
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
          class="flex text-gray-500 hover:cursor-pointer hover:text-green-600 transition"
        >
          Lupa password?
        </p>

        <button
          class="flex items-center justify-center space-x-2 mt-6 w-96 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
          type="submit"
          :disabled="auth.loading"
        >
          <span v-if="auth.loading" class="flex items-center space-x-2">
            <svg
              class="animate-spin h-5 w-5 text-white"
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
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <span>Memproses...</span>
          </span>

          <ArrowRightCircleIcon v-if="!auth.loading" class="w-5 h-5" />
        </button>

        <p>
          Belum punya akun?
          <NuxtLink
            to="/register"
            class="hover:text-green-600 underline hover:cursor-pointer transition"
          >
            Buat Disini
          </NuxtLink>
        </p>

        <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo, useHead } from "#app";
import { ArrowRightCircleIcon } from "@heroicons/vue/16/solid";
import { ref } from "vue";
import BaseInput from "~/components/input/BaseInput.vue";
import { useAuthStore } from "~/stores/AuthStores";

useHead({
  title: "Login",
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
