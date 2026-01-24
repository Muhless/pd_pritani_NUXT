<script setup lang="ts">
import { Icon } from "@iconify/vue";
import BaseCard from "../BaseCard.vue";

interface Props {
  title: string;
  icon: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Title",
  icon: "mdi:chart-line",
});

const { data } = await useFetch<{ total: number }>("salary");
const total = computed(() => data.value?.total ?? 0);
</script>

<template>
  <BaseCard class="">
    <div class="flex items-center w-full space-x-3">
      <div class="p-2 bg-gray-200 rounded-full">
        <Icon :icon="props.icon" class="w-5 h-auto" />
      </div>
      <h1>{{ props.title }}</h1>
    </div>
    <div class="flex items-center justify-center">
      <p class="py-1 text-3xl font-bold">{{ total }}</p>
    </div>
  </BaseCard>
</template>
