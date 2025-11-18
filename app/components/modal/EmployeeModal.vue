<script setup lang="ts">
import { useMessage } from "naive-ui";
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

// Modal visibility
const modalVisible = computed({
  get: () => props.showModal,
  set: (v) => emit("update:showModal", v),
});

// Edit mode
const isEdit = computed(() => !!props.employee?.id);

// FORM (dibuat lengkap + konsisten)
const form = ref({
  id: 0,
  name: "",
  phone: "",
  address: "",
  status: "active",
  photo: null as File | null,
  photoPreview: "",
});

// ERROR
const errors = ref({
  name: "",
  phone: "",
  address: "",
});

// Default file list untuk upload
const defaultFileList = computed(() => {
  if (props.employee?.photo) {
    return [
      {
        id: "existing",
        name: "photo",
        status: "finished",
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

// CLOSE MODAL
const closeModal = () => {
  emit("update:showModal", false);
  setTimeout(() => resetForm(), 200);
};

// SUBMIT
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
