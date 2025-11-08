<template>
  <div class="flex justify-between items-center">
    <div class="flex flex-row space-x-8">
      <Icon icon="ic:baseline-search" class="size-5 hover:cursor-pointer" />
      <Icon icon="ic:round-settings" class="size-5 hover:cursor-pointer" />
      <Icon
        icon="ic:baseline-notifications-active"
        class="size-5 hover:cursor-pointer"
      />
    </div>
    <div class="w-10 h-10 rounded-full overflow-hidden">
      <img
        src="/images/1.jpg"
        alt="User Picture"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>
