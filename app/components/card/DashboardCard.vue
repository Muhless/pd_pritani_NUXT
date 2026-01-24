<script setup lang="ts">
import { Icon } from "@iconify/vue";
import BaseCard from "./BaseCard.vue";

interface Props {
  label?: string;
  content?: string;
  icon: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: "Tanpa label",
  content: "XXX",
  icon: "mdi:chart-line",
});
</script>

<template>
  <BaseCard>
    <div class="flex items-center w-full space-x-3">
      <div class="p-2 bg-gray-200 rounded-full">
        <Icon :icon="icon" class="w-5 h-auto" />
      </div>
      <h1>{{ label }}</h1>
    </div>
    <div class="flex items-center justify-center space-x-5">
      <p class="py-1 text-3xl font-bold">{{ content }}</p>
      <div class="flex space-x-1 text-green-600">
        <ArrowUpIcon class="w-3 h-auto" />
        <p class="text-sm">15+</p>
      </div>
    </div>
    <div class="flex items-center justify-between pt-2 border-t border-black">
      <h1 class="text-sm font-bold text-green-600">
        +10 <span class="font-normal">Dari bulan kemarin</span>
      </h1>
      <div class="p-2 bg-gray-200 rounded-full cursor-pointer">
        <Icon icon="mdi:arrow-up-right-bold" class="w-3 h-auto" />
      </div>
    </div>
  </BaseCard>
</template>
