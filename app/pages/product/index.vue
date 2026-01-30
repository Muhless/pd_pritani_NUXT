<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { NEmpty, NInput, useDialog, useMessage } from "naive-ui";
import { computed, onMounted, ref } from "vue";
import AddButton from "~/components/button/AddButton.vue";
import ProductCard from "~/components/card/ProductCard.vue";
import ProductModal from "~/components/modal/ProductModal.vue";
import { useApi } from "~/composables/useApi";

definePageMeta({
  layout: "dashboard",
});

useHead({
  title: "Produk | PG. Pritani",
});

interface Product {
  id: number;
  name: string;
  type: string;
  stock: number;
  price: string | number;
  photo?: string;
  created_at?: string;
  updated_at?: string;
}

const message = useMessage();
const dialog = useDialog();
const search = ref("");
const products = ref<Product[]>([]);
const loading = ref(false);
const showModal = ref(false);
const editingProduct = ref<Product | null>(null);

const { get, del } = useApi();

const fetchProducts = async () => {
  loading.value = true;
  try {
    const res = await get<Product[]>("/products");
    console.log("Response:", res); // Debug: lihat struktur response
    products.value = res.data || [];
  } catch (err: any) {
    console.error("Error fetching products:", err);
    message.error(err?.message || "Gagal mengambil data produk");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});

const filteredProducts = computed(() =>
  products.value.filter((p) =>
    p.name.toLowerCase().includes(search.value.toLowerCase()),
  ),
);

const handleSuccess = () => {
  showModal.value = false;
  editingProduct.value = null;
  fetchProducts();
};

const handleDetail = (id?: number) => {
  if (!id) {
    message.warning("ID produk tidak valid");
    return;
  }

  navigateTo(`/dashboard/products/${id}`);
};

const handleEdit = (id?: number) => {
  if (!id) {
    message.warning("ID produk tidak valid");
    return;
  }

  const product = products.value.find((p) => p.id === id);
  if (product) {
    editingProduct.value = product;
    showModal.value = true;
  } else {
    message.error("Produk tidak ditemukan");
  }
};

const handleDelete = async (id?: number) => {
  if (!id) {
    message.warning("ID produk tidak valid");
    return;
  }

  dialog.warning({
    title: "Konfirmasi Hapus",
    content:
      "Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.",
    positiveText: "Hapus",
    negativeText: "Batal",
    onPositiveClick: async () => {
      try {
        await del(`/products/${id}`);
        message.success("Produk berhasil dihapus");
        await fetchProducts();
      } catch (err: any) {
        console.error("Error deleting product:", err);
        message.error(err?.message || "Gagal menghapus produk");
      }
    },
  });
};

const handleAddNew = () => {
  editingProduct.value = null;
  showModal.value = true;
};
</script>

<template>
  <div class="p-9 space-y-3">
    <BaseCard>
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-primary">Daftar Produk</h1>
          <p class="text-gray-500 text-sm mt-1">
            Total {{ products.length }} produk
          </p>
        </div>
        <AddButton @click="handleAddNew"> Tambah Produk </AddButton>
      </div>
    </BaseCard>

    <!-- Search Bar -->
    <div class="mb-6">
      <NInput
        v-model:value="search"
        placeholder="Cari produk berdasarkan nama..."
        size="large"
        clearable
      >
        <template #prefix>
          <Icon icon="material-symbols:search" :width="20" />
        </template>
      </NInput>
    </div>

    <div
      v-if="loading"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <div v-for="i in 8" :key="i" class="p-5 border rounded-xl animate-pulse">
        <div class="h-48 bg-gray-200 rounded-lg mb-4"></div>
        <div class="h-4 bg-gray-200 rounded mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>

    <div
      v-else-if="filteredProducts.length === 0"
      class="flex flex-col items-center justify-center py-20"
    >
      <NEmpty
        :description="
          search
            ? `Tidak ada produk dengan kata kunci '${search}'`
            : 'Belum ada produk'
        "
      >
        <template #extra>
          <AddButton @click="handleAddNew"> Tambah Produk </AddButton>
        </template>
      </NEmpty>
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :id="product.id"
        :name="product.name"
        :type="product.type"
        :price="product.price"
        :stock="product.stock"
        :photo="product.photo"
        @detail="handleDetail"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>

    <ProductModal
      v-model:show-modal="showModal"
      :product="editingProduct"
      @success="handleSuccess"
    />
  </div>
</template>
