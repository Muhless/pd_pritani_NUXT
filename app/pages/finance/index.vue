<script setup>
import BaseCard from "~/components/card/BaseCard.vue";

useHead({
  title: "Keuangan | PG. Pritani",
});

definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <div class="p-9 space-y-3">
    <BaseCard>
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-primary">Finance</h1>
        <AddButton label="Produk" />
      </div>
    </BaseCard>
    <BaseCard>
    </BaseCard>
  </div>
</template>
