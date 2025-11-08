<template>
  <div
    class="flex justify-between border-b-2 items-center p-2 rounded-xl hover:bg-white cursor-pointer"
  >
    <div class="flex items-center space-x-3">
      <Icon icon="ic:round-rice-bowl" class="size-6" />
      <div>
        <h1 class="font-bold">Beras</h1>
        <p class="text-sm">50 Kg</p>
      </div>
    </div>
    <h1 class="text-sm">Diproses</h1>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<style scoped></style>
