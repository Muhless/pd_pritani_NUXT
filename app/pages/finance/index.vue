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
        <h1 class="text-2xl font-bold text-primary">Keuangan</h1>
      </div>
    </BaseCard>
    <BaseCard>
      <div>
        <h1>Gaji Karyawan</h1>
      </div>
    </BaseCard>
    <BaseCard>
      <h1>Pendapatan</h1>
    </BaseCard>
    <BaseCard>
      <h1>Hutang</h1>
    </BaseCard>
  </div>
</template>
