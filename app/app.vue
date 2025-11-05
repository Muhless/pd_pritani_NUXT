<script setup lang="ts">
import "~/assets/css/tailwind.css";

const auth = useAuthStore();

onMounted(() => {
  if (process.client) {
    auth.loadFromCookie();
  }
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
