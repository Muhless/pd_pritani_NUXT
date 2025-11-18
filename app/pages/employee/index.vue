<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { NEmpty, NInput, useDialog, useMessage } from "naive-ui";
import { computed, onMounted, ref } from "vue";
import AddButton from "~/components/button/AddButton.vue";
import EmployeeCard from "~/components/card/EmployeeCard.vue";
import EmployeeModal from "~/components/modal/EmployeeModal.vue";
import { useApi } from "~/composables/useApi";

definePageMeta({
  layout: "dashboard",
});

useHead({
  title: "Karyawan | PG. Pritani",
});

interface Employee {
  id: number;
  name: string;
  phone: string;
  address: string;
  photo?: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

const message = useMessage();
const dialog = useDialog();
const search = ref("");
const employees = ref<Employee[]>([]);
const loading = ref(false);
const showModal = ref(false);
const editingEmployee = ref<Employee | null>(null);

const { get, del } = useApi();

const fetchEmployees = async () => {
  try {
    loading.value = true;
    const res = await get<Employee[]>("/employees");
    employees.value = res || [];
  } catch (err: any) {
    console.error("Error fetching employees:", err);
    message.error(err?.message || "Gagal mengambil data karyawan");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchEmployees();
});

const filteredEmployees = computed(() =>
  employees.value.filter((e) =>
    e.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const handleSuccess = () => {
  showModal.value = false;
  editingEmployee.value = null;
  fetchEmployees();
};

const handleDetail = (id?: number) => {
  if (!id) {
    message.warning("ID karyawan tidak valid");
    return;
  }

  navigateTo(`/dashboard/employees/${id}`);
};

const handleEdit = (id?: number) => {
  if (!id) {
    message.warning("ID karyawan tidak valid");
    return;
  }

  const employee = employees.value.find((e) => e.id === id);
  if (employee) {
    editingEmployee.value = employee;
    showModal.value = true;
  } else {
    message.error("Karyawan tidak ditemukan");
  }
};

const handleDelete = async (id?: number) => {
  if (!id) {
    message.warning("ID karyawan tidak valid");
    return;
  }

  dialog.warning({
    title: "Konfirmasi Hapus",
    content:
      "Apakah Anda yakin ingin menghapus data karyawan ini? Tindakan ini tidak dapat dibatalkan.",
    positiveText: "Hapus",
    negativeText: "Batal",
    onPositiveClick: async () => {
      try {
        await del(`/employees/${id}`);
        message.success("Data karyawan berhasil dihapus");
        await fetchEmployees();
      } catch (err: any) {
        console.error("Error deleting employee:", err);
        message.error(err?.message || "Gagal menghapus data karyawan");
      }
    },
  });
};

const handleAddNew = () => {
  editingEmployee.value = null;
  showModal.value = true;
};

const activeEmployees = computed(
  () => employees.value.filter((e) => e.status === "active").length
);
const inactiveEmployees = computed(
  () => employees.value.filter((e) => e.status === "inactive").length
);
const onLeaveEmployees = computed(
  () => employees.value.filter((e) => e.status === "leave").length
);
</script>

<template>
  <div class="p-9 space-y-3">
    <BaseCard>
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-primary">Daftar Karyawan</h1>
          <div class="flex gap-4 text-sm mt-1">
            <p class="text-gray-500">Total: {{ employees.length }} karyawan</p>
            <p class="text-green-600">Aktif: {{ activeEmployees }}</p>
            <p class="text-orange-600">Cuti: {{ onLeaveEmployees }}</p>
            <p class="text-red-600">Tidak Aktif: {{ inactiveEmployees }}</p>
          </div>
        </div>
        <AddButton @click="handleAddNew"> Tambah Karyawan </AddButton>
      </div>
    </BaseCard>

    <!-- Search Bar -->
    <div class="mb-6">
      <NInput
        v-model:value="search"
        placeholder="Cari karyawan berdasarkan nama, posisi, atau departemen..."
        size="large"
        clearable
      >
        <template #prefix>
          <Icon icon="material-symbols:search" :width="20" />
        </template>
      </NInput>
    </div>

    <!-- Loading Skeleton -->
    <div
      v-if="loading"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <div v-for="i in 8" :key="i" class="p-5 border rounded-xl animate-pulse">
        <div class="flex justify-center mb-4">
          <div class="w-32 h-32 bg-gray-200 rounded-full"></div>
        </div>
        <div class="h-4 bg-gray-200 rounded mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-2/3 mb-2 mx-auto"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="filteredEmployees.length === 0"
      class="flex flex-col items-center justify-center py-20"
    >
      <NEmpty
        :description="
          search
            ? `Tidak ada karyawan dengan kata kunci '${search}'`
            : 'Belum ada data karyawan'
        "
      >
        <template #extra>
          <AddButton @click="handleAddNew"> Tambah Karyawan </AddButton>
        </template>
      </NEmpty>
    </div>

    <!-- Employee Grid -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <EmployeeCard
        v-for="employee in filteredEmployees"
        :key="employee.id"
        :id="employee.id"
        :name="employee.name"
        :phone="employee.phone"
        :address="employee.address"
        :photo="employee.photo"
        :status="employee.status"
        @detail="handleDetail"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>

    <EmployeeModal
      v-model:showModal="showModal"
      :employee="editingEmployee"
      @success="handleSuccess"
    />
  </div>
</template>
