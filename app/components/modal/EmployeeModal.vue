<template>
  <n-modal
    v-model:show="modalVisible"
    preset="dialog"
    :title="isEdit ? 'Edit Karyawan' : 'Tambah Karyawan'"
    :mask-closable="false"
    transform-origin="center"
    :transition-props="{ name: 'fade-scale' }"
    style="width: 600px"
  >
    <!-- Isi Form -->
    <template #default>
      <div class="space-y-4 py-4">
        <!-- Nama -->
        <div class="flex flex-col space-y-1">
          <label for="nama" class="text-sm font-semibold text-gray-700">
            Nama <span class="text-red-500">*</span>
          </label>
          <n-input
            id="nama"
            v-model:value="form.nama"
            placeholder="Masukkan nama karyawan"
            :status="errors.nama ? 'error' : undefined"
          />
          <span v-if="errors.nama" class="text-xs text-red-500">
            {{ errors.nama }}
          </span>
        </div>

        <!-- Nomor Telepon -->
        <div class="flex flex-col space-y-1">
          <label for="telepon" class="text-sm font-semibold text-gray-700">
            Nomor Telepon <span class="text-red-500">*</span>
          </label>
          <n-input
            id="telepon"
            v-model:value="form.telepon"
            placeholder="Contoh: 08123456789"
            :status="errors.telepon ? 'error' : undefined"
          />
          <span v-if="errors.telepon" class="text-xs text-red-500">
            {{ errors.telepon }}
          </span>
        </div>

        <!-- Alamat -->
        <div class="flex flex-col space-y-1">
          <label for="alamat" class="text-sm font-semibold text-gray-700">
            Alamat <span class="text-red-500">*</span>
          </label>
          <n-input
            id="alamat"
            v-model:value="form.alamat"
            type="textarea"
            placeholder="Masukkan alamat lengkap"
            :autosize="{ minRows: 3, maxRows: 5 }"
            :status="errors.alamat ? 'error' : undefined"
          />
          <span v-if="errors.alamat" class="text-xs text-red-500">
            {{ errors.alamat }}
          </span>
        </div>

        <!-- Upload Foto -->
        <div class="flex flex-col space-y-2">
          <label for="foto" class="text-sm font-semibold text-gray-700">
            Foto Karyawan
          </label>
          <n-upload
            id="foto"
            accept="image/*"
            :max="1"
            list-type="image-card"
            @change="handleUploadChange"
            :default-file-list="defaultFileList"
          >
            <n-button>Upload Foto</n-button>
          </n-upload>
          <span class="text-xs text-gray-500">
            Format: JPG, PNG. Maksimal 2MB
          </span>

          <!-- Preview Foto -->
          <div v-if="form.fotoPreview" class="mt-2 flex justify-center">
            <img
              :src="form.fotoPreview"
              alt="Preview Foto"
              class="object-cover w-32 h-32 border-2 rounded-lg shadow-sm"
            />
          </div>
        </div>
      </div>
    </template>

    <!-- Tombol Aksi -->
    <template #action>
      <div class="flex justify-end space-x-2">
        <n-button @click="closeModal" secondary :disabled="loading">
          Batal
        </n-button>
        <n-button 
          type="primary" 
          @click="handleSubmit"
          :loading="loading"
        >
          {{ isEdit ? 'Update' : 'Simpan' }}
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { useMessage } from "naive-ui";
import { computed, ref, watch } from "vue";
import { useApi } from "~/composables/useApi";

interface Employee {
  id?: number;
  nama: string;
  telepon: string;
  alamat: string;
  foto?: string;
}

interface Props {
  showModal: boolean;
  employee?: Employee | null;
}

interface Emits {
  (e: "update:showModal", value: boolean): void;
  (e: "success"): void;
}

const props = withDefaults(defineProps<Props>(), {
  employee: null,
});

const emit = defineEmits<Emits>();

const message = useMessage();
const { post, patch } = useApi();

const loading = ref(false);
const modalVisible = computed({
  get: () => props.showModal,
  set: (value) => emit("update:showModal", value),
});

const isEdit = computed(() => !!props.employee?.id);

const form = ref({
  nama: "",
  telepon: "",
  alamat: "",
  foto: null as File | null,
  fotoPreview: "",
});

// Validation errors
const errors = ref({
  nama: "",
  telepon: "",
  alamat: "",
});

// Default file list untuk edit mode
const defaultFileList = computed(() => {
  if (props.employee?.foto) {
    return [
      {
        id: "existing",
        name: "employee-photo",
        status: "finished",
        url: props.employee.foto,
      },
    ];
  }
  return [];
});

// Watch employee prop untuk edit mode
watch(
  () => props.employee,
  (newEmployee) => {
    if (newEmployee) {
      form.value.nama = newEmployee.nama;
      form.value.telepon = newEmployee.telepon;
      form.value.alamat = newEmployee.alamat;
      form.value.fotoPreview = newEmployee.foto || "";
      form.value.foto = null;
    }
  },
  { immediate: true }
);

// Handle upload foto
const handleUploadChange = (options: any) => {
  const { fileList } = options;

  if (fileList.length > 0) {
    const latestFile = fileList[fileList.length - 1];
    const file = latestFile.file;

    // Validasi ukuran file (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      message.error("Ukuran file maksimal 2MB");
      return;
    }

    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      message.error("File harus berupa gambar");
      return;
    }

    form.value.foto = file;
    form.value.fotoPreview = URL.createObjectURL(file);
  } else {
    form.value.foto = null;
    form.value.fotoPreview = props.employee?.foto || "";
  }
};

// Validate form
const validateForm = (): boolean => {
  errors.value = {
    nama: "",
    telepon: "",
    alamat: "",
  };

  let isValid = true;

  // Validasi nama
  if (!form.value.nama.trim()) {
    errors.value.nama = "Nama wajib diisi";
    isValid = false;
  } else if (form.value.nama.trim().length < 3) {
    errors.value.nama = "Nama minimal 3 karakter";
    isValid = false;
  }

  // Validasi telepon
  if (!form.value.telepon.trim()) {
    errors.value.telepon = "Nomor telepon wajib diisi";
    isValid = false;
  } else if (!/^[0-9]{10,13}$/.test(form.value.telepon.replace(/[-\s]/g, ""))) {
    errors.value.telepon = "Nomor telepon tidak valid (10-13 digit)";
    isValid = false;
  }

  // Validasi alamat
  if (!form.value.alamat.trim()) {
    errors.value.alamat = "Alamat wajib diisi";
    isValid = false;
  } else if (form.value.alamat.trim().length < 10) {
    errors.value.alamat = "Alamat minimal 10 karakter";
    isValid = false;
  }

  return isValid;
};

// Reset form
const resetForm = () => {
  form.value = {
    nama: "",
    telepon: "",
    alamat: "",
    foto: null,
    fotoPreview: "",
  };
  errors.value = {
    nama: "",
    telepon: "",
    alamat: "",
  };
};

// Tutup modal
const closeModal = () => {
  emit("update:showModal", false);
  setTimeout(() => {
    resetForm();
  }, 300);
};

// Simpan data
const handleSubmit = async () => {
  if (!validateForm()) {
    message.error("Harap lengkapi semua data dengan benar!");
    return;
  }

  try {
    loading.value = true;

    // Prepare form data untuk upload
    const formData = new FormData();
    formData.append("nama", form.value.nama);
    formData.append("telepon", form.value.telepon);
    formData.append("alamat", form.value.alamat);

    if (form.value.foto) {
      formData.append("foto", form.value.foto);
    }

    if (isEdit.value && props.employee?.id) {
      // Update employee
      await patch(`/employees/${props.employee.id}`, formData);
      message.success("Data karyawan berhasil diupdate");
    } else {
      // Create new employee
      await post("/employees", formData);
      message.success("Data karyawan berhasil ditambahkan");
    }

    emit("success");
    closeModal();
  } catch (err: any) {
    console.error("Error submitting employee:", err);
    message.error(err?.message || "Gagal menyimpan data karyawan");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.25s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>