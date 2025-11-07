<template>
  <div class="flex min-h-screen">
    <Sidebar />

    <main class="flex-1 ml-16 bg-gray-50">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "~/components/layout/Sidebar.vue";
</script>
