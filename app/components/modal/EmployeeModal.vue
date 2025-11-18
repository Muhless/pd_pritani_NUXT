<script setup lang="ts">
import {
  NButton,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NSelect,
  NSpace,
  NUpload,
  useMessage,
} from "naive-ui";
import { computed, ref, watch } from "vue";
import { useApi } from "~/composables/useApi";

interface Employee {
  id?: number;
  name: string;
  phone: string;
  address: string;
  status: string;
  photo?: string;
}

interface Props {
  showModal: boolean;
  employee: Employee | null;
}

interface Emits {
  (e: "update:showModal", value: boolean): void;
  (e: "success"): void;
}

const props = withDefaults(defineProps<Props>(), {
  employee: null,
});

const emit = defineEmits<Emits>();
const { post, patch } = useApi();
const message = useMessage();

const loading = ref(false);

const modalVisible = computed({
  get: () => props.showModal,
  set: (v) => emit("update:showModal", v),
});

const isEdit = computed(() => !!props.employee?.id);

const form = ref({
  id: 0,
  name: "",
  phone: "",
  address: "",
  status: "active",
  photo: null as File | null,
  photoPreview: "",
});

const errors = ref({
  name: "",
  phone: "",
  address: "",
});

// Status options
const statusOptions = [
  { label: "Aktif", value: "active" },
  { label: "Cuti", value: "leave" },
  { label: "Tidak Aktif", value: "inactive" },
];

// Default file list untuk upload
const defaultFileList = computed(() => {
  if (props.employee?.photo) {
    return [
      {
        id: "existing",
        name: "photo",
        status: "finished" as const,
        url: props.employee.photo,
      },
    ];
  }
  return [];
});

// Upload foto
const handleUploadChange = (options: any) => {
  const { fileList } = options;

  if (fileList.length > 0) {
    const file = fileList[fileList.length - 1].file;

    if (file.size > 2 * 1024 * 1024) {
      message.error("Ukuran maksimal 2MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      message.error("File harus berupa gambar");
      return;
    }

    form.value.photo = file;
    form.value.photoPreview = URL.createObjectURL(file);
  } else {
    form.value.photo = null;
    form.value.photoPreview = props.employee?.photo || "";
  }
};

// VALIDATION
const validateForm = () => {
  errors.value = { name: "", phone: "", address: "" };
  let valid = true;

  if (!form.value.name.trim()) {
    errors.value.name = "Nama wajib diisi";
    valid = false;
  }

  if (!form.value.phone.trim()) {
    errors.value.phone = "Nomor telepon wajib diisi";
    valid = false;
  }

  if (!form.value.address.trim()) {
    errors.value.address = "Alamat wajib diisi";
    valid = false;
  }

  return valid;
};

// RESET FORM
const resetForm = () => {
  form.value = {
    id: 0,
    name: "",
    phone: "",
    address: "",
    status: "active",
    photo: null,
    photoPreview: "",
  };
  errors.value = { name: "", phone: "", address: "" };
};

watch(
  () => props.employee,
  (e) => {
    if (e) {
      form.value.id = e.id ?? 0;
      form.value.name = e.name;
      form.value.phone = e.phone;
      form.value.address = e.address;
      form.value.status = e.status ?? "active";
      form.value.photo = null;
      form.value.photoPreview = e.photo ?? "";
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

const closeModal = () => {
  emit("update:showModal", false);
  setTimeout(() => resetForm(), 200);
};

const handleSubmit = async () => {
  if (!validateForm()) {
    message.error("Data belum benar!");
    return;
  }

  try {
    loading.value = true;

    const fd = new FormData();
    fd.append("name", form.value.name);
    fd.append("phone", form.value.phone);
    fd.append("address", form.value.address);
    fd.append("status", form.value.status);
    if (form.value.photo) fd.append("photo", form.value.photo);

    if (isEdit.value && props.employee?.id) {
      await patch(`/employees/${props.employee.id}`, fd);
      message.success("Data karyawan berhasil diperbarui");
    } else {
      await post("/employees", fd);
      message.success("Data karyawan berhasil ditambahkan");
    }

    emit("success");
    closeModal();
  } catch (err: any) {
    console.error(err);
    message.error(err?.message || "Gagal menyimpan data");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <NModal
    v-model:show="modalVisible"
    preset="card"
    :title="isEdit ? 'Edit Karyawan' : 'Tambah Karyawan'"
    style="width: 600px"
    :bordered="false"
    :segmented="{ content: true }"
  >
    <NForm>
      <NFormItem
        label="Nama Lengkap"
        :validation-status="errors.name ? 'error' : undefined"
        :feedback="errors.name"
      >
        <NInput
          v-model:value="form.name"
          placeholder="Masukkan nama lengkap"
          :disabled="loading"
        />
      </NFormItem>

      <NFormItem
        label="Nomor Telepon"
        :validation-status="errors.phone ? 'error' : undefined"
        :feedback="errors.phone"
      >
        <NInput
          v-model:value="form.phone"
          placeholder="Contoh: 081234567890"
          :disabled="loading"
        />
      </NFormItem>

      <NFormItem
        label="Alamat"
        :validation-status="errors.address ? 'error' : undefined"
        :feedback="errors.address"
      >
        <NInput
          v-model:value="form.address"
          type="textarea"
          placeholder="Masukkan alamat lengkap"
          :autosize="{ minRows: 3, maxRows: 5 }"
          :disabled="loading"
        />
      </NFormItem>

      <NFormItem label="Status">
        <NSelect
          v-model:value="form.status"
          :options="statusOptions"
          placeholder="Pilih status"
          :disabled="loading"
        />
      </NFormItem>

      <NFormItem label="Foto">
        <NUpload
          :default-file-list="defaultFileList"
          :max="1"
          accept="image/*"
          list-type="image-card"
          @change="handleUploadChange"
          :disabled="loading"
        >
          <div class="text-sm text-gray-500">
            Klik untuk upload foto
            <br />
            Max 2MB
          </div>
        </NUpload>
      </NFormItem>
    </NForm>

    <template #footer>
      <NSpace justify="end">
        <NButton @click="closeModal" :disabled="loading"> Batal </NButton>
        <NButton type="primary" @click="handleSubmit" :loading="loading">
          {{ isEdit ? "Perbarui" : "Simpan" }}
        </NButton>
      </NSpace>
    </template>
  </NModal>
</template>
