<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Konten halaman -->
    <main class="flex-1 ml-16 bg-gray-50 p-9">
      <slot />
      <!-- Konten dari page akan muncul di sini -->
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "~/components/layout/Sidebar.vue";
</script>
