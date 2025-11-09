<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
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
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">Karyawan</h1>

        <!-- Tombol Tambah -->
        <n-button type="info" class="w-48 rounded-md" @click="showModal = true">
          <div class="flex items-center justify-center space-x-2">
            <span>Tambah Karyawan</span>
            <Icon icon="ci:plus" class="size-6" />
          </div>
        </n-button>
      </div>

      <!-- Modal -->
      <EmployeeModal v-model:showModal="showModal" />

      <!-- Tabel -->
      <EmployeeTable />
    </BaseCard>
  </div>
</template>
