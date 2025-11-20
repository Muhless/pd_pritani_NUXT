<script setup lang="ts">
interface Customer {
  id: number;
  name: string;
  phone: string;
  address: string;
  company: string;
}

const props = defineProps<{
  customers: Customer[];
  page: number;
  pageSize: number;
  totalItems: number;
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: "page-change", page: number): void;
  (e: "edit", id: number): void;
  (e: "delete", id: number): void;
}>();
</script>

<template>
  <n-table :bordered="false" :single-line="false">
    <thead>
      <tr>
        <th>No</th>
        <th>Nama</th>
        <th>Telepon</th>
        <th>Alamat</th>
        <th>Perusahaan</th>
        <th>Aksi</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, index) in props.customers" :key="item.id">
        <td>{{ (props.page - 1) * props.pageSize + index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.address }}</td>
        <td>{{ item.company }}</td>

        <td>
          <button @click="emit('edit', item.id)">
            <Icon icon="ci:edit" />
          </button>

          <button @click="emit('delete', item.id)">
            <Icon icon="ci:trash-full" />
          </button>
        </td>
      </tr>
    </tbody>
  </n-table>

  <div class="flex justify-center py-3">
    <n-pagination
      :page="props.page"
      :page-size="props.pageSize"
      :item-count="props.totalItems"
      @update:page="emit('page-change', $event)"
    />
  </div>
</template>
