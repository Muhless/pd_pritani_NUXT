<script setup lang="ts">
import { Icon } from "@iconify/vue";
import BaseCard from "~/components/card/BaseCard.vue";
import EmployeeTable from "~/components/table/EmployeeTable.vue";

definePageMeta({
  layout: "dashboard",
});

useHead({
  title: "Karyawan | PG. Pritani",
});

const showModal = ref(false);

const form = ref({
  nama: "",
  telepon: "",
  alamat: "",
  foto: null as File | null,
  fotoPreview: "",
});

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

// simpan data
const handleSubmit = () => {
  console.log("Data disimpan:", form.value);
  showModal.value = false;
};
</script>

<template>
  <div class="p-9">
    <BaseCard class="space-y-3">
      <h1 class="text-2xl font-bold">Karyawan</h1>
      <n-button
        type="info"
        class="w-48 space-x-3 rounded-md"
        @click="showModal = true"
      >
        <div class="flex items-center space-x-2">
          <h1>Tambah Karyawan</h1>
          <Icon icon="ci:plus" class="size-6" />
        </div>
      </n-button>
      <n-modal
        v-model:show="showModal"
        preset="dialog"
        title="Tambah Karyawan"
        :mask-closable="false"
      >
        <template #default>
          <div class="space-y-4">
            <!-- Nama -->
            <div class="flex flex-col space-y-1">
              <label for="nama" class="text-sm font-semibold text-gray-700"
                >Nama</label
              >
              <n-input
                id="nama"
                v-model:value="form.nama"
                placeholder="Masukkan nama karyawan"
              />
            </div>

            <!-- Nomor Telepon -->
            <div class="flex flex-col space-y-1">
              <label for="telepon" class="text-sm font-semibold text-gray-700"
                >Nomor Telepon</label
              >
              <n-input
                id="telepon"
                v-model:value="form.telepon"
                placeholder="Masukkan nomor telepon"
              />
            </div>

            <!-- Alamat -->
            <div class="flex flex-col space-y-1">
              <label for="alamat" class="text-sm font-semibold text-gray-700"
                >Alamat</label
              >
              <n-input
                id="alamat"
                v-model:value="form.alamat"
                placeholder="Masukkan alamat"
              />
            </div>

            <!-- Upload Foto -->
            <div class="flex flex-col space-y-2">
              <label for="foto" class="text-sm font-semibold text-gray-700"
                >Foto Karyawan</label
              >
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

        <template #action>
          <div class="flex justify-end space-x-2">
            <n-button @click="showModal = false" secondary> Batal </n-button>
            <n-button type="info" @click="handleSubmit"> Simpan </n-button>
          </div>
        </template>
      </n-modal>
      <EmployeeTable />
    </BaseCard>
  </div>
</template>
