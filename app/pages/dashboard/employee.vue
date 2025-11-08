<script setup lang="ts">
import { Icon } from "@iconify/vue";
import BaseCard from "~/components/card/BaseCard.vue";

definePageMeta({
  layout: "dashboard",
});

useHead({
  title: "Karyawan | PG. Pritani",
});
</script>

<template>
  <div class="p-9">
    <BaseCard>
      <h1 class="mb-3 text-2xl font-bold">Karyawan</h1>
      <button
        class="flex items-center gap-3 p-2 px-5 text-white rounded-md bg-sky-500"
        type="submit"
      >
        Tambah Data
        <Icon icon="ic:baseline-group-add" class="size-6" />
      </button>
    </BaseCard>
  </div>
</template>
