<template>
  <div class="w-3/12 bg-foreground border-2 p-7">
    <UserProfile />
    <h1 class="text-2xl py-3">Transaksi</h1>
    <div>
      <!-- Header -->
      <div class="flex justify-evenly border-b pb-2">
        <h1
          @click="activeTab = 'pesanan'"
          :class="[
            'cursor-pointer',
            activeTab === 'pesanan'
              ? 'text-green-600 font-bold'
              : 'text-gray-500',
          ]"
        >
          Pesanan
        </h1>

        <h1
          @click="activeTab = 'belumLunas'"
          :class="[
            'cursor-pointer',
            activeTab === 'belumLunas'
              ? 'text-green-600 font-bold'
              : 'text-gray-500',
          ]"
        >
          Belum Lunas
        </h1>
      </div>

      <!-- Isi berdasarkan tab -->
      <div v-if="activeTab === 'pesanan'">
        <ul class="py-3">
          <li v-for="(p, i) in pesanan" :key="i"><OrderCard /></li>
        </ul>
      </div>

      <div v-else>
        <p>💰 Data Belum Lunas</p>
        <ul>
          <li v-for="(b, i) in belumLunas" :key="i">{{ b }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import OrderCard from "~/components/card/OrderCard.vue";

const activeTab = ref("pesanan");

const pesanan = ["Pesanan A", "Pesanan B", "Pesanan C", "1"];
const belumLunas = ["Pesanan B", "Pesanan C"];
</script>
