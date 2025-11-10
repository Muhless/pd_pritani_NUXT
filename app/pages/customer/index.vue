<script setup lang="ts">
import { Icon } from "@iconify/vue";
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
  <div class="p-9">
    <BaseCard>
      <div class="flex justify-between">
        <h1 class="text-2xl font-bold text-primary">Pelanggan</h1>
        <n-button
          type="primary"
          size="medium"
          @click=""
          class="rounded-md w-48"
        >
          <h1>Tambah Pelanggan</h1>
          <Icon icon="ic:baseline-groups-2" class="size-6" />
        </n-button>
      </div>
      <CustomerTable />
    </BaseCard>
  </div>
</template>
