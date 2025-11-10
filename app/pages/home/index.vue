<script setup lang="ts">
import BaseCard from "~/components/card/BaseCard.vue";
import DashboardCard from "~/components/card/DashboardCard.vue";
import OrderCard from "~/components/card/OrderCard.vue";
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
  <div class="space-y-3 p-9 h-screen">
    <BaseCard>
      <h1 class="text-2xl font-bold text-primary mb-2">Dashboard</h1>
      <p v-if="auth.user">
        Selamat datang,
        <span class="font-semibold">{{ auth.user.username }}</span>
      </p>
      <p v-else>Memuat data pengguna...</p>
    </BaseCard>

    <div class="gap-3 grid grid-cols-4">
      <DashboardCard label="Transaksi" content="430" icon="mdi:handshake" />
      <DashboardCard label="Pesanan" icon="mdi:cart" />
      <DashboardCard label="Pelanggan" icon="mdi:account" />
      <DashboardCard label="Pendapatan" icon="ic:round-attach-money" />
    </div>
    <div class="grid grid-cols-3 gap-3">
      <OrderCard class="col-span-2" />
      <div>
        <BaseCard>
          <h1 class="text-xl font-bold">Transaksi Bulan Ini</h1>
          <p class="text-center text-8xl font-bold">51</p>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
