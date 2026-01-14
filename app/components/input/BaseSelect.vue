<script setup lang="ts">
interface Option {
  label: string;
  value: string | number;
}

interface Props {
  modelValue: string | number;
  label?: string;
  name?: string;
  id?: string;
  options: Option[];
  placeholder?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <select
    :id="id"
    :name="name"
    class="bg-gray-100 cursor-pointer py-3 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
    :value="modelValue"
    @change="
      emit('update:modelValue', ($event.target as HTMLSelectElement).value)
    "
  >
    <option v-if="placeholder" disabled value="" class="cursor-pointer">
      {{ placeholder }}
    </option>
    <option v-for="opt in options" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </option>
  </select>
</template>
