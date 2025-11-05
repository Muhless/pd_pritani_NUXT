<template>
  <aside
    class="fixed left-0 top-0 h-screen w-64 bg-green-600 text-white flex flex-col justify-between"
  >
    <!-- Header -->
    <div>
      <div
        class="flex items-center justify-center h-16 border-b border-green-500"
      >
        <h1 class="text-2xl font-bold">AdyTrans</h1>
      </div>

      <!-- Menu -->
      <nav class="mt-6">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.name"
          :to="item.to"
          class="flex items-center px-6 py-3 hover:bg-green-700 transition"
          :class="{ 'bg-green-700': route.path === item.to }"
        >
          <component :is="item.icon" class="w-5 h-5 mr-3" />
          <span>{{ item.name }}</span>
        </NuxtLink>
      </nav>
    </div>

    <!-- Footer / Logout -->
    <div class="border-t border-green-500 p-4">
      <button
        class="w-full flex items-center justify-center py-2 bg-green-700 hover:bg-green-800 rounded transition"
        @click="handleLogout"
      >
        <ArrowLeftOnRectangleIcon class="w-5 h-5 mr-2" />
        Keluar
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import {
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  HomeIcon,
  TruckIcon,
  UsersIcon,
} from "@heroicons/vue/24/solid";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "~/stores/AuthStores";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const menuItems = [
  { name: "Dashboard", to: "/dashboard", icon: HomeIcon },
  { name: "Pelanggan", to: "/dashboard/customer", icon: TruckIcon },
  { name: "Karyawan", to: "/dashboard/employee", icon: Cog6ToothIcon },
  { name: "Produk", to: "/dashboard/product", icon: UsersIcon },
];

const handleLogout = () => {
  auth.logout();
  router.push("/auth/login");
};
</script>
