<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";

interface Props {
  modelValue: string;
  label?: string;
  type?: string;
  placeholder?: string;
  name?: string;
  id?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const showPassword = ref(false);
const isPassword = computed(() => props.type === "password");

const inputType = computed(() =>
  isPassword.value
    ? showPassword.value
      ? "text"
      : "password"
    : props.type || "text"
);
</script>

<template>
  <div class="flex flex-col space-y-1 w-full relative">
    <!-- <label v-if="label" :for="id" class="text-sm font-medium text-gray-700">
      {{ label }}
    </label> -->

    <div class="relative w-96">
      <input
        :id="id"
        :name="name"
        :type="inputType"
        :placeholder="placeholder"
        class="bg-gray-100 py-3 px-4 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
        :value="modelValue"
        @input="
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />

      <!-- Icon show/hide password -->
      <button
        v-if="isPassword"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        @click="showPassword = !showPassword"
      >
        <Icon icon="mdi:eye" v-if="!showPassword" class="w-5 h-5" />
        <Icon icon="mdi:eye-closed" v-else class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>
