<template>
  <div class="flex space-x-3">
    <div class="w-2/3">
      <img src="/images/bg-1.jpg" alt="Login" class="h-full " />
    </div>
    <div
      class="w-1/3 min-h-screen flex flex-col items-center justify-center text-center"
    >
      <div class="mb-4">
        <h1 class="text-4xl font-bold text-green-600 mb-4">Selamat Datang</h1>
        <p class="text-gray-700">Silahkan login terlebih dahulu.</p>
      </div>
      <!-- form -->
      <form action="" class="flex flex-col space-y-5">
        <BaseInput
          v-model="username"
          id="username"
          label="username"
          placeholder="Masukkan username anda"
        />
        <BaseInput
          v-model="password"
          id="password"
          label="password"
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
        >
          <span>Masuk</span>
          <ArrowRightCircleIcon class="w-5 h-5" />
        </button>
        <p>
          Belum punya akun ?
          <NuxtLink
            to="/auth/register"
            class="hover:text-green-600 underline hover:cursor-pointer transition"
          >
            Buat Disini
          </NuxtLink>
        </p>
      </form>
      <!-- end form -->
    </div>
  </div>
</template>

<script setup>
import { ArrowRightCircleIcon } from "@heroicons/vue/16/solid";
import BaseInput from "~/components/input/BaseInput.vue";

useHead({
  title: "Login",
  meta: [{ name: "login", content: "Login Pages" }],
});
</script>
