<script setup>
import BaseCard from "~/components/card/BaseCard.vue";

useHead({
  title: "Transaksi | PG. Pritani",
});

definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <div class="p-9">
    <BaseCard>
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-primary">Transaksi</h1>
        <AddButton label="Transaksi" />
      </div>
    </BaseCard>
  </div>
</template>
