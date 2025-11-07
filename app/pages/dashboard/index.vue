<script setup lang="ts">
import { Icon } from "@iconify/vue";
import BaseCard from "~/components/card/BaseCard.vue";
import DashboardCard from "~/components/card/DashboardCard.vue";
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
        <DashboardCard label="Pesanan" content="430" icon="mdi:cart-arrow-right" />
        <DashboardCard label="Produk" icon="mdi:shopping" />
        <DashboardCard label="Pelanggan" icon="mdi:account"/>
        <DashboardCard label="Karyawan" icon="mdi:account-group" />
      </div>
    </div>
    <div class="w-3/12 bg-foreground border-2 p-9">
      <UserProfile />
      <div class="mt-5">
        <h1 class="text-2xl">Pesanan</h1>
        <div>
          <Icon icon="heroicons:home" />
        </div>
      </div>
    </div>
  </div>
</template>
