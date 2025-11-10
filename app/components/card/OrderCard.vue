<template>
  <BaseCard>
    <div class="flex gap-3 items-center">
      <Icon icon="ci:shopping-cart-01" class="size-6" />
      <h1 class="text-xl font-bold">Pesanan</h1>
    </div>
    <div
      class="flex justify-between border-b-2 items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"
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
  </BaseCard>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import BaseCard from "./BaseCard.vue";
</script>

<style scoped></style>
