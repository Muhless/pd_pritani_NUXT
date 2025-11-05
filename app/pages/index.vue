<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Selamat Datang di PG. Pritani</h1>
    <NuxtLink to="/auth/login" class="text-blue-500 underline">Login</NuxtLink>
  </div>
</template>

<script setup>
useHead({
  title: "Dashboard PG Pritani",
  meta: [{ name: "dashboard", content: "Dashboard Penggilingan Padi Pritani" }],
});
</script>
