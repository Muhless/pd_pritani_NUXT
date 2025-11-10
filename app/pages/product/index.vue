<script setup lang="ts">
import BaseCard from "~/components/card/BaseCard.vue";

definePageMeta({
  layout: "dashboard",
});
useHead({
  title: "Produk | PG. Pritani",
});
</script>

<template>
  <div class="p-9">
    <BaseCard>
      <h1 class="text-2xl font-bold text-primary">Produk</h1>
    </BaseCard>
  </div>
</template>
