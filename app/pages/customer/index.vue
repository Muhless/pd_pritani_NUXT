<script setup lang="ts">
import AddButton from "~/components/button/AddButton.vue";
import BaseCard from "~/components/card/BaseCard.vue";
import CustomerTable from "~/components/table/CustomerTable.vue";

definePageMeta({
  layout: "dashboard",
});
useHead({
  title: "Pelanggan | PG. Pritani",
});
</script>

<template>
  <div class="p-9 space-y-3">
    <BaseCard>
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-primary">Pelanggan</h1>
        <AddButton label="Produk" />
      </div>
    </BaseCard>
    <BaseCard>
      <CustomerTable />
    </BaseCard>
  </div>
</template>
