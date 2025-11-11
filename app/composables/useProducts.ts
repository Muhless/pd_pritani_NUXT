import { onMounted, ref } from "vue";

export function useProducts() {
  const products = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await $fetch(
        `${useRuntimeConfig().public.API_BASE_URL}/products`
      );
      products.value = (res as any).data || res;
    } catch (err: any) {
      error.value = err.message || "Gagal memuat produk";
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchProducts);

  return { products, loading, error, fetchProducts };
}
