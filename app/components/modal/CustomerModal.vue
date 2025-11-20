<script setup lang="ts">
import {
  NButton,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NSpace,
  useMessage,
} from "naive-ui";
import { computed, ref, watch } from "vue";
import { useApi } from "~/composables/useApi";

interface Customer {
  id?: number;
  name?: string;
  phone?: string;
  address?: string;
  company?: string;
}

interface Props {
  showModal: boolean;
  customer: Customer | null;
}

interface Emits {
  (e: "update:showModal", value: boolean): void;
  (e: "success"): void;
}

const props = withDefaults(defineProps<Props>(), {
  customer: null,
});

const emit = defineEmits<Emits>();
const { post, patch } = useApi();
const message = useMessage();

const loading = ref(false);

const modalVisible = computed({
  get: () => props.showModal,
  set: (v) => emit("update:showModal", v),
});

const isEdit = computed(() => !!props.customer?.id);

const form = ref({
  id: 0,
  name: "",
  phone: "",
  address: "",
  company: "",
});

const errors = ref({
  name: "",
  phone: "",
  address: "",
  company: "",
});

// VALIDATION
const validateForm = () => {
  errors.value = { name: "", phone: "", address: "", company: "" };
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

const resetForm = () => {
  form.value = {
    id: 0,
    name: "",
    phone: "",
    address: "",
    company: "",
  };
  errors.value = { name: "", phone: "", address: "", company: "" };
};

watch(
  () => props.customer,
  (e) => {
    if (e) {
      form.value.id = e.id ?? 0;
      form.value.name = e.name ?? "";
      form.value.phone = e.phone ?? "";
      form.value.address = e.address ?? "";
      form.value.company = e.company ?? "";
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

const closeModal = () => {
  emit("update:showModal", false);
  resetForm();
};

const handleSubmit = async () => {
  if (!validateForm()) {
    message.error("Data belum benar!");
    return;
  }

  try {
    loading.value = true;

    const payload = {
      name: form.value.name,
      phone: form.value.phone,
      address: form.value.address,
      company: form.value.company,
    };

    if (isEdit.value && props.customer?.id) {
      await patch(`/customers/${props.customer.id}`, payload);
      message.success("Data pelanggan berhasil diperbarui");
    } else {
      await post("/customers", payload);
      message.success("Data pelanggan berhasil ditambahkan");
    }

    emit("success");
    closeModal();
  } catch (err: any) {
    console.error(err);
    message.error(err.message || "Gagal menyimpan data");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <NModal
    v-model:show="modalVisible"
    preset="card"
    :title="isEdit ? 'Ubah Data Pelanggan' : 'Tambah Pelanggan'"
    style="width: 600px"
    :bordered="false"
    :segmented="{ content: true }"
  >
    <NForm>
      <NFormItem
        label="Nama"
        :validation-status="errors.name ? 'error' : undefined"
        :feedback="errors.name"
      >
        <NInput
          v-model:value="form.name"
          placeholder="Masukkan nama pelanggan"
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

      <NFormItem label="Perusahaan/Toko">
        <NInput
          v-model:value="form.company"
          placeholder="Masukkan nama perusahaan"
          :disabled="loading"
        />
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
