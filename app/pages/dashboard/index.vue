<script setup lang="ts">
import { useAuthStore } from "~/stores/AuthStores";

const auth = useAuthStore();


definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-green-600 mb-4">Dashboard</h1>
    <p v-if="auth.user">
      Selamat datang,
      <span class="font-semibold">{{ auth.user.username }}</span>
    </p>
    <p v-else>Memuat data pengguna...</p>
  </div>
</template>
