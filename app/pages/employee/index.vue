<script setup lang="ts">
import { ref } from "vue";
import AddButton from "~/components/button/AddButton.vue";
import BaseCard from "~/components/card/BaseCard.vue";
import EmployeeModal from "~/components/modal/EmployeeModal.vue";
import EmployeeTable from "~/components/table/EmployeeTable.vue";

definePageMeta({
  layout: "dashboard",
});

useHead({
  title: "Karyawan | PG. Pritani",
});

const showModal = ref(false);
</script>

<template>
  <div class="p-9">
    <BaseCard>
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-primary">Karyawan</h1>
        <AddButton label="Produk" />
      </div>

      <EmployeeModal v-model:showModal="showModal" />

      <EmployeeTable />
    </BaseCard>
  </div>
</template>
