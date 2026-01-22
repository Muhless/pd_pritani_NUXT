<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { NButton, NEmpty, NSkeleton, useDialog, useMessage } from "naive-ui";
import { onMounted, ref } from "vue";
import { useApi } from "~/composables/useApi";

definePageMeta({
  layout: "dashboard",
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

const route = useRoute();
const router = useRouter();
const message = useMessage();
const dialog = useDialog();
const api = useApi();

const employee = ref<Employee | null>(null);
const loading = ref(true);
const error = ref("");

const fetchEmployee = async () => {
  try {
    loading.value = true;
    const id = route.params.id;
    employee.value = await api.get<Employee>(`employees/${id}`);
    error.value = "";
  } catch (err: any) {
    error.value = err.message;
    message.error("Gagal memuat data karyawan");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchEmployee();
});

useHead({
  title: computed(() =>
    employee.value
      ? `${employee.value.name} | PG. Pritani`
      : "Detail Karyawan | PG. Pritani",
  ),
});

const handleBack = () => {
  router.push("/employee");
};

const handleEdit = () => {
  router.push(`/dashboard/employees/${employee.value?.id}/edit`);
};

// const handleDelete = () => {
//   if (!employee.value) return;

//   dialog.warning({
//     title: "Hapus Karyawan",
//     content: `Apakah Anda yakin ingin menghapus karyawan "${employee.value.name}"? Tindakan ini tidak dapat dibatalkan.`,
//     positiveText: "Hapus",
//     negativeText: "Batal",
//     onPositiveClick: async () => {
//       try {
//         await api.delete(`/employees/${employee.value?.id}`);
//         message.success("Karyawan berhasil dihapus");
//         router.push("/dashboard/employees");
//       } catch (err: any) {
//         message.error(err.message || "Gagal menghapus karyawan");
//       }
//     },
//   });
// };

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200";
    case "inactive":
      return "bg-red-100 text-red-800 border-red-200";
    case "leave":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "active":
      return "Aktif";
    case "inactive":
      return "Tidak Aktif";
    case "leave":
      return "Cuti";
    default:
      return status;
  }
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
};
</script>

<template>
  <div class="p-9 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button
          @click="handleBack"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Icon icon="material-symbols:arrow-back" :width="24" />
        </button>
        <div>
          <h1 class="text-2xl font-bold text-primary">Detail Karyawan</h1>
          <p class="text-sm text-gray-500 mt-1">Informasi lengkap karyawan</p>
        </div>
      </div>

      <div v-if="employee && !loading" class="flex gap-3">
        <NButton type="primary" @click="handleEdit">
          <template #icon>
            <Icon icon="material-symbols:edit" />
          </template>
          Edit
        </NButton>
        <!-- <NButton type="error" @click="handleDelete">
          <template #icon>
            <Icon icon="material-symbols:delete" />
          </template>
          Hapus
        </NButton> -->
      </div>
    </div>

    <!-- Loading State -->
    <BaseCard v-if="loading">
      <div class="flex flex-col lg:flex-row gap-8">
        <div class="flex flex-col items-center lg:w-1/3">
          <NSkeleton circle height="200px" width="200px" />
          <NSkeleton class="mt-4" height="30px" width="150px" />
          <NSkeleton class="mt-2" height="20px" width="100px" />
        </div>
        <div class="flex-1 space-y-4">
          <NSkeleton height="40px" />
          <NSkeleton height="60px" />
          <NSkeleton height="60px" />
          <NSkeleton height="60px" />
        </div>
      </div>
    </BaseCard>

    <!-- Error State -->
    <BaseCard v-else-if="error">
      <div class="flex flex-col items-center justify-center py-20">
        <NEmpty description="Gagal memuat data karyawan">
          <template #extra>
            <NButton type="primary" @click="fetchEmployee"> Coba Lagi </NButton>
          </template>
        </NEmpty>
      </div>
    </BaseCard>

    <!-- Content -->
    <BaseCard v-else-if="employee">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Photo Section -->
        <div class="flex flex-col items-center lg:w-1/3">
          <div class="relative w-48 h-48">
            <img
              v-if="employee.photo"
              :src="employee.photo"
              :alt="employee.name"
              class="w-full h-full rounded-full object-cover border-4 border-gray-100 shadow-lg"
            />
            <div
              v-else
              class="w-full h-full rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-6xl font-bold shadow-lg"
            >
              {{ employee.name.charAt(0).toUpperCase() }}
            </div>

            <!-- Status Badge -->
            <div
              :class="[
                'absolute bottom-2 right-2 px-4 py-2 rounded-full text-sm font-semibold border-2',
                getStatusColor(employee.status),
              ]"
            >
              {{ getStatusLabel(employee.status) }}
            </div>
          </div>

          <h2 class="text-2xl font-bold text-gray-800 mt-6 text-center">
            {{ employee.name }}
          </h2>
          <p class="text-sm text-gray-500 mt-1">ID: #{{ employee.id }}</p>
        </div>

        <!-- Info Section -->
        <div class="flex-1 space-y-6">
          <!-- Contact Info -->
          <div>
            <h3
              class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"
            >
              <Icon
                icon="material-symbols:contact-phone"
                :width="24"
                class="text-primary"
              />
              Informasi Kontak
            </h3>
            <div class="space-y-4">
              <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <Icon
                  icon="material-symbols:phone"
                  :width="24"
                  class="text-primary mt-1"
                />
                <div>
                  <p class="text-sm text-gray-500">Nomor Telepon</p>
                  <p class="text-base font-medium text-gray-800">
                    {{ employee.phone }}
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <Icon
                  icon="material-symbols:location-on"
                  :width="24"
                  class="text-primary mt-1"
                />
                <div>
                  <p class="text-sm text-gray-500">Alamat</p>
                  <p class="text-base font-medium text-gray-800">
                    {{ employee.address }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Employment Info -->
          <div>
            <h3
              class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"
            >
              <Icon
                icon="material-symbols:work"
                :width="24"
                class="text-primary"
              />
              Informasi Kepegawaian
            </h3>
            <div class="space-y-4">
              <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <Icon
                  icon="material-symbols:badge"
                  :width="24"
                  class="text-primary mt-1"
                />
                <div>
                  <p class="text-sm text-gray-500">Status</p>
                  <p class="text-base font-medium text-gray-800">
                    {{ getStatusLabel(employee.status) }}
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <Icon
                  icon="material-symbols:calendar-add-on"
                  :width="24"
                  class="text-primary mt-1"
                />
                <div>
                  <p class="text-sm text-gray-500">Tanggal Bergabung</p>
                  <p class="text-base font-medium text-gray-800">
                    {{ formatDate(employee.created_at) }}
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <Icon
                  icon="material-symbols:update"
                  :width="24"
                  class="text-primary mt-1"
                />
                <div>
                  <p class="text-sm text-gray-500">Terakhir Diperbarui</p>
                  <p class="text-base font-medium text-gray-800">
                    {{ formatDate(employee.updated_at) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Activity History / Additional Info (Optional) -->
    <BaseCard v-if="employee && !loading">
      <h3
        class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"
      >
        <Icon
          icon="material-symbols:history"
          :width="24"
          class="text-primary"
        />
        Riwayat Aktivitas
      </h3>
      <div class="text-center py-8 text-gray-500">
        <Icon
          icon="material-symbols:folder-open"
          :width="48"
          class="mx-auto mb-2 opacity-50"
        />
        <p>Belum ada riwayat aktivitas</p>
      </div>
    </BaseCard>
  </div>
</template>
