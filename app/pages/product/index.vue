<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { NEmpty, NInput, useDialog, useMessage } from "naive-ui";
import { computed, onMounted, ref } from "vue";
import AddButton from "~/components/button/AddButton.vue";
import ProductCard from "~/components/card/ProductCard.vue";
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
  price: number;
  photo?: string;
}

const message = useMessage();
const dialog = useDialog();
const search = ref("");
const products = ref<Product[]>([]);
const loading = ref(false);
const showModal = ref(false);

const { get } = useApi();

const fetchProducts = async () => {
  try {
    loading.value = true;
    const res = await get<Product[]>("/products");
    products.value = res || [];
  } catch (err: any) {
    message.error("Gagal mengambil data produk");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});

const filteredProducts = computed(() =>
  products.value.filter((p) =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const handleSuccess = () => {
  fetchProducts();
};

const handleDetail = (id?: number) => {
  message.info(`Detail produk ID: ${id}`);
  // TODO: Implementasi detail modal atau navigasi
};

const handleEdit = (id?: number) => {
  message.info(`Edit produk ID: ${id}`);
  // TODO: Implementasi edit modal
};
</script>

<template>
  <div class="p-9">
    <BaseCard>
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-primary">Daftar Produk</h1>
          <p class="text-gray-500 text-sm mt-1">
            Total {{ products.length }} produk
          </p>
        </div>
        <AddButton @click="showModal = true">
          <Icon icon="mdi:plus" class="mr-1" />
          Tambah Produk
        </AddButton>
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

    <!-- Loading Skeleton -->
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

    <!-- Empty State -->
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
          <AddButton @click="showModal = true">
            <Icon icon="mdi:plus" class="mr-1" />
            Tambah Produk
          </AddButton>
        </template>
      </NEmpty>
    </div>

    <!-- Product Grid -->
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
      />
    </div>

    <!-- Modal Form -->
    <ProductFormModal v-model:show="showModal" @success="handleSuccess" />
  </div>
</template>
