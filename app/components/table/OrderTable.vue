<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <n-table
    :bordered="false"
    :single-line="false"
    class="bg-white rounded-2xl p-4 space-y-3 shadow-lg"
  >
    <thead class="text-white bg-green-600">
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
      <tr class="transition hover:bg-gray-100">
        <td class="px-4 py-3">1</td>
        <td class="px-4 py-3">反常的</td>
        <td class="px-4 py-3">08123456789</td>
        <td class="px-4 py-3">Jl. Padi Raya No.1</td>
        <td class="px-4 py-3 font-semibold text-green-600">Aktif</td>
        <td class="flex justify-center gap-2">
          <div
            class="flex items-center justify-center bg-yellow-400 rounded size-8"
          >
            <button class="flex items-center justify-center w-full h-full">
              <Icon icon="ci:edit" class="w-5 h-5" />
            </button>
          </div>

          <div
            class="flex items-center justify-center bg-red-400 rounded size-8"
          >
            <button class="flex items-center justify-center w-full h-full">
              <Icon icon="ci:trash-full" class="w-5 h-5" />
            </button>
          </div>
        </td>
      </tr>
      <tr class="transition hover:bg-gray-100">
        <td class="px-4 py-3">2</td>
        <td class="px-4 py-3">彻底废除</td>
        <td class="px-4 py-3">08987654321</td>
        <td class="px-4 py-3">Jl. Sawah Luhur No.2</td>
        <td class="px-4 py-3 font-semibold text-red-500">Tidak Aktif</td>
        <td class="flex justify-center gap-2">
          <div
            class="flex items-center justify-center bg-yellow-400 rounded size-8"
          >
            <button class="flex items-center justify-center w-full h-full">
              <Icon icon="ci:edit" class="w-5 h-5" />
            </button>
          </div>

          <div
            class="flex items-center justify-center bg-red-400 rounded size-8"
          >
            <button class="flex items-center justify-center w-full h-full">
              <Icon icon="ci:trash-full" class="w-5 h-5" />
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </n-table>
</template>
