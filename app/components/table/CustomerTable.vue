<script setup lang="ts">
import { Icon } from "@iconify/vue";

const page = ref(1);
const pageSize = 10;
const totalItems = ref(0);
const employees = ref(<any[]>[]);

const fetchEmployees = async () => {
  try {
    const res = await fetch(
      `http://localhost:8080/employees?page=${page.value}&limit=${pageSize}`
    );
    const json = await res.json();
    employees.value = json.data || [];
    totalItems.value = json.total || 0;
  } catch (error) {
    console.error("Failed to fetch employees", error);
  }
};

onMounted(fetchEmployees);

watch(page, fetchEmployees);

const StatusClass = (status: string) => {
  return status === "active" ? "text-green-600" : "text-red-500";
};
</script>

<template>
  <n-table
    :bordered="false"
    :single-line="false"
    class="overflow-hidden rounded-xl shadow-lg"
  >
    <thead class="text-white">
      <tr>
        <th class="px-4 py-3 text-left">No</th>
        <th class="px-4 py-3 text-left">Nama</th>
        <th class="px-4 py-3 text-left">Nomor Telepon</th>
        <th class="px-4 py-3 text-left">Alamat</th>
        <th class="px-4 py-3 text-left">Status</th>
        <th class="px-4 py-3 text-left">Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in employees"
        :key="item.id"
        class="transition hover:bg-gray-100"
      >
        <td class="px-4 py-3">{{ (page - 1) * pageSize + (index + 1) }}</td>
        <td class="px-4 py-3">{{ item.name }}</td>
        <td class="px-4 py-3">{{ item.phone }}</td>
        <td class="px-4 py-3">{{ item.address }}</td>
        <td
          class="px-4 py-3 font-semibold text-green-600"
          :class="StatusClass(item.status)"
        >
          {{ item.status === "active" ? "Aktif" : "Tidak Aktif" }}
        </td>
        <td class="flex justify-center gap-2">
          <div
            class="flex items-center justify-center bg-yellow-400 rounded size-8"
          >
            <button
              class="flex items-center justify-center w-full h-full"
              @click="$emit('edit', item.id)"
            >
              <Icon icon="ci:edit" class="w-5 h-5" />
            </button>
          </div>

          <div
            class="flex items-center justify-center bg-red-400 rounded size-8"
          >
            <button
              class="flex items-center justify-center w-full h-full"
              @click="$emit('delete', item.id)"
            >
              <Icon icon="ci:trash-full" class="w-5 h-5" />
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </n-table>
  <div class="flex justify-center py-3">
    <n-pagination
      v-model:page="page"
      :page-size="pageSize"
      :item-count="totalItems"
      show-size-picker="false"
    />
  </div>
</template>
