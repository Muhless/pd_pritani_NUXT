<script>
import BaseCard from "~/components/card/BaseCard.vue";

useHead({
  title: "Keuangan | PG. Pritani",
});

definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <div class="p-9">
    <BaseCard>
      <div>
        <h1 class="text-2xl font-bold text-primary">Finance</h1>
        <AddButton label="Produk" />
      </div>
    </BaseCard>
  </div>
</template>
