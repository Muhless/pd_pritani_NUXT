<script setup lang="ts">
import { useDialog, useMessage } from "naive-ui";
import AddButton from "~/components/button/AddButton.vue";
import BaseCard from "~/components/card/BaseCard.vue";
import CustomerModal from "~/components/modal/CustomerModal.vue";
import CustomerTable from "~/components/table/CustomerTable.vue";

definePageMeta({
  layout: "dashboard",
});
useHead({
  title: "Pelanggan | PG. Pritani",
});

interface Customer {
  id: number;
  name: string;
  phone?: string;
  address?: string;
}

const message = useMessage();
const dialog = useDialog();
const search = ref("");
const customers = ref<Customer[]>([]);
const loading = ref(false);
const showModal = ref(false);
const editingCustomer = ref<Customer | null>(null);

const { get, del } = useApi();

const fetchCustomers = async () => {
  try {
    loading.value = true;
    const res = await get<Customer[]>("/customers");
    customers.value = res || [];
  } catch (err: any) {
    console.error("Error fetching Customer data", err);
    message.error(err?.message || "Gagal mengambil data pelanggan");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCustomers();
});

const handleAddNew = () => {
  editingCustomer.value = null;
  showModal.value = true;
};

const handleSuccess = () => {
  showModal.value = false;
  editingCustomer.value = null;
  fetchCustomers();
};

</script>

<template>
  <div class="p-9 space-y-3">
    <BaseCard>
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-primary">Pelanggan</h1>
        <AddButton label="Pelanggan" @click="handleAddNew"> </AddButton>
      </div>
    </BaseCard>
    <BaseCard>
      <CustomerTable :customers="customers" :loading="loading" />
    </BaseCard>

    <CustomerModal
      v-model:showModal="showModal"
      :customer="editingCustomer"
      @success="handleSuccess"
    />
  </div>
</template>
