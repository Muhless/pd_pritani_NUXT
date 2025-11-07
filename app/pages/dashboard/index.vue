<script setup lang="ts">
import {
  ShoppingBagIcon,
  UserCircleIcon,
  UsersIcon,
  ViewColumnsIcon,
} from "@heroicons/vue/24/solid";
import BaseCard from "~/components/card/DashboardCard.vue";
import { useAuthStore } from "~/stores/AuthStores";

useHead({
  title: "Dashboard | PG. Pritani",
});

const auth = useAuthStore();
definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <div>
    <div class="bg-gray-300 rounded-xl p-2">
      <h1 class="text-2xl font-bold text-green-600 mb-2">Dashboard</h1>
      <p v-if="auth.user">
        Selamat datang,
        <span class="font-semibold">{{ auth.user.username }}</span>
      </p>
      <p v-else>Memuat data pengguna...</p>
    </div>
    <div class="space-x-3 grid grid-cols-4">
      <BaseCard label="Pesanan" content="430" :icon="UserCircleIcon" />
      <BaseCard label="Produk" :icon="ShoppingBagIcon" />
      <BaseCard label="Pesanan" :icon="UsersIcon" />
      <BaseCard label="Pesanan" :icon="ViewColumnsIcon" />
    </div>
  </div>
</template>
