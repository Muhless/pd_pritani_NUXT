<script setup lang="ts">
import { ArrowUpIcon, ArrowUpRightIcon } from "@heroicons/vue/24/solid";
import type { Component } from "vue";

interface Props {
  label?: string;
  content?: string;
  icon: Component;
}

const { label, content, icon } = withDefaults(defineProps<Props>(), {
  label: "Tanpa label",
  content: "XXX",
});
</script>

<template>
  <div
    class="bg-white p-3 border border-black border-b-4 rounded-lg shadow-sm text-gray-800"
  >
    <div class="w-full flex space-x-3 items-center">
      <div class="bg-gray-200 rounded-full p-2">
        <component :is="icon" class="w-5 h-auto" />
      </div>
      <h1>{{ label }}</h1>
    </div>
    <div class="flex items-center space-x-5 justify-center">
      <p class="text-3xl py-1 font-bold">{{ content }}</p>
      <div class="flex text-green-600 space-x-1">
        <ArrowUpIcon class="w-3 h-auto" />
        <p class="text-sm">15+</p>
      </div>
    </div>
    <div class="flex justify-between items-center border-t border-black pt-2">
      <h1 class="text-sm text-green-600 font-bold">
        +10 <span class="font-normal">Dari bulan kemarin</span>
      </h1>
      <div class="bg-gray-200 rounded-full p-2 cursor-pointer">
        <ArrowUpRightIcon class="w-3 h-auto" />
      </div>
    </div>
  </div>
</template>
