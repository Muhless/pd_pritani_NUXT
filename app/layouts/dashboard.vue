<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Konten halaman -->
    <main class="flex-1 ml-64 bg-gray-50 p-6">
      <slot />
      <!-- Konten dari page akan muncul di sini -->
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "~/components/layout/Sidebar.vue";
</script>
