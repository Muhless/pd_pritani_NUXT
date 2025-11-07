<template>
  <aside
    class="fixed h-screen w-16 bg-secondary text-white flex flex-col justify-between"
  >
    <!-- Header -->
    <div class="flex flex-col items-center">
      <div class="mt-10">
        <img src="/images/logo-pritani.png" alt="" class="size-12" />
      </div>

      <!-- Menu -->
      <nav class="mt-6 space-y-5">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.name"
          :to="item.to"
          class="flex items-center p-2 hover:bg-white hover:text-primary rounded-full transition"
          :class="{ 'bg-green-700': route.path === item.to }"
        >
          <Icon :icon="item.icon" class="size-6" />
        </NuxtLink>
      </nav>
    </div>

    <!-- Footer / Logout -->
    <div class="mb-5 flex text-center items-center justify-center">
      <button
        class="flex items-center justify-center p-2 hover:bg-red-600 hover:text-white rounded-full transition"
        @click="handleLogout"
      >
        <Icon icon="mdi:exit-run" class="size-6" />
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "~/stores/AuthStores";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const menuItems = [
  { name: "Dashboard", to: "/dashboard", icon: "mdi:view-dashboard" },
  { name: "Karyawan", to: "/dashboard/employee", icon: "mdi:account-box" },
  { name: "Pelanggan", to: "/dashboard/customer", icon: "mdi:account-group" },
  { name: "Produk", to: "/dashboard/product", icon: "mdi:cube" },
];

const handleLogout = () => {
  auth.logout();
  router.push("/login");
};
</script>
