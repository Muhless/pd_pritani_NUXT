<script setup lang="ts">
import AddButton from "~/components/button/AddButton.vue";
import BaseCard from "~/components/card/BaseCard.vue";
import CustomerModal from "~/components/modal/CustomerModal.vue";
import CustomerTable from "~/components/table/CustomerTable.vue";

definePageMeta({ layout: "dashboard" });

useHead({ title: "Pelanggan | PG. Pritani" });

interface Customer {
  id: number;
  name: string;
  phone: string;
  address: string;
  company: string;
}

interface CustomerResponse {
  data: Customer[];
  total: number;
}

const page = ref(1);
const pageSize = 5;
const totalItems = ref(0);

const customers = ref<Customer[]>([]);
const loading = ref(false);
const showModal = ref(false);
const editingCustomer = ref<Customer | null>(null);

const { get, del } = useApi();

const fetchCustomers = async () => {
  loading.value = true;

  try {
    const res = await get<CustomerResponse>(
      `/customers?page=${page.value}&limit=${pageSize}`,
    );

    customers.value = res.data ?? [];
    totalItems.value = res.total ?? 0;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

await fetchCustomers();
watch(page, fetchCustomers);

const handlePageChange = (p: number) => {
  page.value = p;
};

// ADD NEW
const handleAddNew = () => {
  editingCustomer.value = null;
  showModal.value = true;
};

// SUCCESS FROM MODAL
const handleSuccess = () => {
  showModal.value = false;
  editingCustomer.value = null;
  fetchCustomers();
};

// EDIT
const openEdit = (id: number) => {
  editingCustomer.value = customers.value.find((x) => x.id === id) ?? null;
  showModal.value = true;
};

// DELETE
const deleteCustomer = async (id: number) => {
  await del(`/customers/${id}`);
  fetchCustomers();
};
</script>

<template>
  <div class="p-9 space-y-3">
    <BaseCard>
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-primary">Customers</h1>
        <AddButton label="Pelanggan" @click="handleAddNew" />
      </div>
    </BaseCard>

    <CustomerTable
      :customers="customers"
      :page="page"
      :page-size="pageSize"
      :total-items="totalItems"
      :loading="loading"
      @page-change="handlePageChange"
      @edit="openEdit"
      @delete="deleteCustomer"
    />

    <CustomerModal
      v-model:showModal="showModal"
      :customer="editingCustomer"
      @success="handleSuccess"
    />
  </div>
</template>
