<template>
  <div class="flex space-x-3">
    <div class="w-2/3">
      <img src="/images/bg-1.jpg" alt="Login" class="h-full" />
    </div>
    <div
      class="w-1/3 min-h-screen flex flex-col items-center justify-center text-center"
    >
      <div class="mb-4">
        <h1 class="text-4xl font-bold text-green-600 mb-4">Buat Akun</h1>
        <p class="text-gray-700">Silahkan buat akun terlebih dahulu.</p>
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
          v-model="email"
          id="email"
          label="email"
          placeholder="Masukkan email anda"
        />
        <BaseSelect
          v-model="selectedRole"
          label="Pilih Role"
          placeholder="Pilih role anda"
          :options="[
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' },
            { label: 'Driver', value: 'driver' },
          ]"
        />
        <BaseInput
          v-model="password"
          id="password"
          label="password"
          type="password"
          placeholder="*********"
        />

        <button
          class="flex items-center justify-center space-x-2 mt-6 w-96 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
          type="submit"
        >
          <span>Buat</span>
          <ArrowRightCircleIcon class="w-5 h-5" />
        </button>
        <p>
          Sudah punya akun ?
          <NuxtLink
            to="/auth/login"
            class="hover:text-green-600 underline hover:cursor-pointer transition"
          >
            Login Disini
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
import BaseSelect from "~/components/input/BaseSelect.vue";

useHead({
  title: "Login",
  meta: [{ name: "login", content: "Login Pages" }],
});
</script>
