<script setup lang="ts"></script>

<template>
  <div
    v-bind="$attrs"
    class="bg-white rounded-xl p-3 border border-b-4 border-black"
  >
    <slot />
  </div>
</template>
