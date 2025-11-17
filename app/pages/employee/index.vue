<script setup lang="ts">
import { Icon } from "@iconify/vue";
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

interface Employee {
  id?: number;
  nama: string;
  telepon: string;
  alamat: string;
  foto?: string;
}

const showModal = ref(false);
const editingEmployee = ref<Employee | null>(null);
const employees = ref<Employee[]>([]); // Data karyawan

// Fungsi untuk buka modal tambah
const handleAddNew = () => {
  editingEmployee.value = null; // Reset untuk mode tambah
  showModal.value = true;
};

// Fungsi untuk buka modal edit (dipanggil dari table)
const handleEdit = (employee: Employee) => {
  editingEmployee.value = employee; // Set data untuk mode edit
  showModal.value = true;
};

// Fungsi setelah berhasil simpan/update
const handleSuccess = () => {
  // Refresh data karyawan
  // fetchEmployees(); // Panggil API untuk reload data
  console.log("Data berhasil disimpan, refresh table");
};
</script>

<template>
  <div class="p-9 space-y-3">
    <BaseCard>
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-primary">Karyawan</h1>
        <AddButton @click="handleAddNew">
          <Icon icon="mdi:plus" class="mr-1" />
          Tambah Karyawan
        </AddButton>
      </div>
    </BaseCard>

    <EmployeeTable :employees="employees" @edit="handleEdit" />

    <EmployeeModal
      v-model:show-modal="showModal"
      :employee="editingEmployee"
      @success="handleSuccess"
    />
  </div>
</template>
