<template>
  <n-modal
    v-model:show="modalVisible"
    preset="dialog"
    :title="isEdit ? 'Edit Produk' : 'Tambah Produk'"
    :mask-closable="false"
    transform-origin="center"
    style="width: 600px"
  >
    <template #default>
      <div class="space-y-4 py-4">
        <!-- Nama Produk -->
        <div class="flex flex-col space-y-1">
          <label for="name" class="text-sm font-semibold text-gray-700">
            Nama Produk <span class="text-red-500">*</span>
          </label>
          <n-input
            id="name"
            v-model:value="form.name"
            placeholder="Contoh: Gula Pasir Premium"
            :status="errors.name ? 'error' : undefined"
          />
          <span v-if="errors.name" class="text-xs text-red-500">
            {{ errors.name }}
          </span>
        </div>

        <!-- Tipe Produk -->
        <div class="flex flex-col space-y-1">
          <label for="type" class="text-sm font-semibold text-gray-700">
            Tipe Produk <span class="text-red-500">*</span>
          </label>
          <n-select
            id="type"
            v-model:value="form.type"
            :options="productTypes"
            placeholder="Pilih tipe produk"
            :status="errors.type ? 'error' : undefined"
          />
          <span v-if="errors.type" class="text-xs text-red-500">
            {{ errors.type }}
          </span>
        </div>

        <!-- Harga & Stok (Row) -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Harga -->
          <div class="flex flex-col space-y-1">
            <label for="price" class="text-sm font-semibold text-gray-700">
              Harga (Rp) <span class="text-red-500">*</span>
            </label>
            <n-input-number
              id="price"
              v-model:value="form.price"
              placeholder="0"
              :min="0"
              :step="500"
              :show-button="false"
              :status="errors.price ? 'error' : undefined"
              :parse="parsePrice"
              :format="formatPriceInput"
              style="width: 100%"
            />
            <span v-if="errors.price" class="text-xs text-red-500">
              {{ errors.price }}
            </span>
          </div>

          <!-- Stok -->
          <div class="flex flex-col space-y-1">
            <label for="stock" class="text-sm font-semibold text-gray-700">
              Stok <span class="text-red-500">*</span>
            </label>
            <n-input-number
              id="stock"
              v-model:value="form.stock"
              placeholder="0"
              :min="0"
              :show-button="false"
              :status="errors.stock ? 'error' : undefined"
              style="width: 100%"
            />
            <span v-if="errors.stock" class="text-xs text-red-500">
              {{ errors.stock }}
            </span>
          </div>
        </div>

        <!-- Upload Foto -->
        <div class="flex flex-col space-y-2">
          <label for="photo" class="text-sm font-semibold text-gray-700">
            Foto Produk
          </label>
          <n-upload
            id="photo"
            accept="image/*"
            :max="1"
            list-type="image-card"
            @change="handleUploadChange"
            :default-file-list="defaultFileList"
          >
            <n-button>
              <template #icon>
                <Icon icon="mdi:upload" />
              </template>
              Upload Foto
            </n-button>
          </n-upload>
          <span class="text-xs text-gray-500">
            Format: JPG, PNG. Maksimal 2MB
          </span>

          <!-- Preview Foto -->
          <div v-if="form.photoPreview" class="mt-2 flex justify-center">
            <img
              :src="form.photoPreview"
              alt="Preview Foto"
              class="object-cover w-40 h-40 border-2 rounded-lg shadow-sm"
            />
          </div>
        </div>
      </div>
    </template>

    <template #action>
      <div class="flex justify-end space-x-2">
        <n-button @click="closeModal" secondary :disabled="loading">
          Batal
        </n-button>
        <n-button type="primary" @click="handleSubmit" :loading="loading">
          {{ isEdit ? "Update" : "Simpan" }}
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useMessage } from "naive-ui";
import { computed, ref, watch } from "vue";
import { useApi } from "~/composables/useApi";

interface Product {
  id?: number;
  name: string;
  type: string;
  stock: number;
  price: number | string;
  photo?: string;
}

interface Props {
  showModal: boolean;
  product?: Product | null;
}

interface Emits {
  (e: "update:showModal", value: boolean): void;
  (e: "success"): void;
}

const props = withDefaults(defineProps<Props>(), {
  product: null,
});

const emit = defineEmits<Emits>();

const message = useMessage();
const { post, patch } = useApi();

const loading = ref(false);
const modalVisible = computed({
  get: () => props.showModal,
  set: (value) => emit("update:showModal", value),
});

const isEdit = computed(() => !!props.product?.id);

// Product types
const productTypes = [
  { label: "Gula Pasir", value: "Gula Pasir" },
  { label: "Gula Putih", value: "Gula Putih" },
  { label: "Gula Merah", value: "Gula Merah" },
  { label: "Gula Aren", value: "Gula Aren" },
  { label: "Gula Kristal", value: "Gula Kristal" },
  { label: "Beras Premium", value: "Beras Premium" },
  { label: "Beras Organik", value: "Beras Organik" },
];

// Form state
const form = ref({
  name: "",
  type: "",
  price: 0,
  stock: 0,
  photo: null as File | null,
  photoPreview: "",
});

// Validation errors
const errors = ref({
  name: "",
  type: "",
  price: "",
  stock: "",
});

// Default file list untuk edit mode
const defaultFileList = computed(() => {
  if (props.product?.photo) {
    return [
      {
        id: "existing",
        name: "product-photo",
        status: "finished",
        url: props.product.photo,
      },
    ];
  }
  return [];
});

// Watch product prop untuk edit mode
watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      form.value.name = newProduct.name;
      form.value.type = newProduct.type;
      form.value.price =
        typeof newProduct.price === "string"
          ? parseFloat(newProduct.price)
          : newProduct.price;
      form.value.stock = newProduct.stock;
      form.value.photoPreview = newProduct.photo || "";
      form.value.photo = null;
    }
  },
  { immediate: true }
);

// Format price untuk display
const formatPriceInput = (value: number | null) => {
  if (!value) return "";
  return new Intl.NumberFormat("id-ID").format(value);
};

// Parse price dari input
const parsePrice = (input: string) => {
  const value = input.replace(/\./g, "").replace(/,/g, "");
  return Number(value);
};

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

    form.value.photo = file;
    form.value.photoPreview = URL.createObjectURL(file);
  } else {
    form.value.photo = null;
    form.value.photoPreview = props.product?.photo || "";
  }
};

// Validate form
const validateForm = (): boolean => {
  errors.value = {
    name: "",
    type: "",
    price: "",
    stock: "",
  };

  let isValid = true;

  // Validasi nama
  if (!form.value.name.trim()) {
    errors.value.name = "Nama produk wajib diisi";
    isValid = false;
  } else if (form.value.name.trim().length < 3) {
    errors.value.name = "Nama produk minimal 3 karakter";
    isValid = false;
  }

  // Validasi type
  if (!form.value.type) {
    errors.value.type = "Tipe produk wajib dipilih";
    isValid = false;
  }

  // Validasi price
  if (form.value.price <= 0) {
    errors.value.price = "Harga harus lebih dari 0";
    isValid = false;
  }

  // Validasi stock
  if (form.value.stock < 0) {
    errors.value.stock = "Stok tidak boleh negatif";
    isValid = false;
  }

  return isValid;
};

// Reset form
const resetForm = () => {
  form.value = {
    name: "",
    type: "",
    price: 0,
    stock: 0,
    photo: null,
    photoPreview: "",
  };
  errors.value = {
    name: "",
    type: "",
    price: "",
    stock: "",
  };
};

// Close modal
const closeModal = () => {
  emit("update:showModal", false);
  setTimeout(() => {
    resetForm();
  }, 300);
};

// Submit form
const handleSubmit = async () => {
  if (!validateForm()) {
    message.error("Harap lengkapi semua field yang wajib diisi");
    return;
  }

  try {
    loading.value = true;

    // Prepare form data untuk upload
    const formData = new FormData();
    formData.append("name", form.value.name);
    formData.append("type", form.value.type);
    formData.append("price", form.value.price.toString());
    formData.append("stock", form.value.stock.toString());

    if (form.value.photo) {
      formData.append("photo", form.value.photo);
    }

    if (isEdit.value && props.product?.id) {
      // Update product
      await patch(`/products/${props.product.id}`, formData);
      message.success("Produk berhasil diupdate");
    } else {
      // Create new product
      await post("/products", formData);
      message.success("Produk berhasil ditambahkan");
    }

    emit("success");
    closeModal();
  } catch (err: any) {
    console.error("Error submitting product:", err);
    message.error(err?.message || "Gagal menyimpan produk");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
:deep(.n-input-number) {
  width: 100%;
}
</style>
