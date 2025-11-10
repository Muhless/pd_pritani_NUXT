<template>
  <div
    v-bind="$attrs"
    class="bg-white rounded-2xl p-4 space-y-3 shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <slot />
  </div>
</template>
