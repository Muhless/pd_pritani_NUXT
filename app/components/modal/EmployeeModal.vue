<template>
  <n-button @click="showModal = true">
    Start me up
  </n-button>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      title="Modal"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        Oops!
      </template>
      Content
      <template #footer>
        Footer
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref(false)
</script>