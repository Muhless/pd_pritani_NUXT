<script setup lang="ts">
import BaseCard from "~/components/card/BaseCard.vue";
import DashboardCard from "~/components/card/DashboardCard.vue";
import RightSide from "~/components/layout/dashboard/RightSide.vue";
import UserProfile from "~/components/UserProfile.vue";
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
  <div class="flex space-x-3">
    <div class="w-3/4 space-y-3 p-9 h-screen">
      <BaseCard>
        <h1 class="text-2xl font-bold text-green-600 mb-2">Dashboard</h1>
        <p v-if="auth.user">
          Selamat datang,
          <span class="font-semibold">{{ auth.user.username }}</span>
        </p>
        <p v-else>Memuat data pengguna...</p>
      </BaseCard>

      <div class="gap-3 grid grid-cols-4">
        <DashboardCard
          label="Pesanan"
          content="430"
          icon="mdi:cart-arrow-right"
        />
        <DashboardCard label="Produk" icon="mdi:shopping" />
        <DashboardCard label="Pelanggan" icon="mdi:account" />
        <DashboardCard label="Karyawan" icon="mdi:account-group" />
      </div>
    </div>
  <RightSide/>
  </div>
</template>
