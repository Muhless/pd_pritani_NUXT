<template>
  <n-modal
    v-model:show="props.showModal"
    preset="dialog"
    title="Tambah Karyawan"
    :mask-closable="false"
    transform-origin="center"
    :transition-props="{ name: 'fade-scale' }"
  >
    <!-- Isi Form -->
    <template #default>
      <div class="space-y-4">
        <!-- Nama -->
        <div class="flex flex-col space-y-1">
          <label for="nama" class="text-sm font-semibold text-gray-700">
            Nama
          </label>
          <n-input
            id="nama"
            v-model:value="form.nama"
            placeholder="Masukkan nama karyawan"
          />
        </div>

        <!-- Nomor Telepon -->
        <div class="flex flex-col space-y-1">
          <label for="telepon" class="text-sm font-semibold text-gray-700">
            Nomor Telepon
          </label>
          <n-input
            id="telepon"
            v-model:value="form.telepon"
            placeholder="Masukkan nomor telepon"
          />
        </div>

        <!-- Alamat -->
        <div class="flex flex-col space-y-1">
          <label for="alamat" class="text-sm font-semibold text-gray-700">
            Alamat
          </label>
          <n-input
            id="alamat"
            v-model:value="form.alamat"
            placeholder="Masukkan alamat"
          />
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
          />
          <div v-if="form.fotoPreview" class="mt-2">
            <img
              :src="form.fotoPreview"
              alt="Preview Foto"
              class="object-cover w-24 h-24 border rounded-full"
            />
          </div>
        </div>
      </div>
    </template>

    <!-- Tombol Aksi -->
    <template #action>
      <div class="flex justify-end space-x-2">
        <n-button @click="closeModal" secondary> Batal </n-button>
        <n-button type="info" @click="handleSubmit"> Simpan </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { useMessage } from "naive-ui";
import { ref } from "vue";

// ✅ Props dan emit untuk sinkronisasi dengan parent
const props = defineProps<{ showModal: boolean }>();
const emit = defineEmits(["update:showModal"]);

const message = useMessage();

const form = ref({
  nama: "",
  telepon: "",
  alamat: "",
  foto: null as File | null,
  fotoPreview: "",
});

// Handle upload foto
const handleUploadChange = (fileList: any[]) => {
  if (fileList.length > 0) {
    const file = fileList[0].file;
    form.value.foto = file;
    form.value.fotoPreview = URL.createObjectURL(file);
  } else {
    form.value.foto = null;
    form.value.fotoPreview = "";
  }
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
};

// Tutup modal
const closeModal = () => {
  emit("update:showModal", false); // ✅ Sinkron dengan parent
  resetForm();
};

// Simpan data
const handleSubmit = () => {
  const { nama, telepon, alamat } = form.value;
  if (!nama || !telepon || !alamat) {
    message.error("Harap lengkapi semua data!");
    return;
  }

  console.log("Data disimpan:", form.value);
  message.success("Data karyawan berhasil disimpan!");
  closeModal();
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
