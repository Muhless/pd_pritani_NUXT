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
          <component :is="item.icon" class="size-6" />
        </NuxtLink>
      </nav>
    </div>

    <!-- Footer / Logout -->
    <div class="mb-5 flex text-center items-center justify-center">
      <button
        class="flex items-center justify-center p-2 bg-green-700 hover:bg-white hover:text-primary rounded-full transition"
        @click="handleLogout"
      >
        <ArrowLeftStartOnRectangleIcon class="size-6" />
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import {
  ArrowLeftStartOnRectangleIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/vue/16/solid";
import { HomeIcon, UsersIcon } from "@heroicons/vue/24/solid";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "~/stores/AuthStores";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const menuItems = [
  { name: "Dashboard", to: "/dashboard", icon: HomeIcon },
  { name: "Karyawan", to: "/dashboard/employee", icon: UserIcon },
  { name: "Pelanggan", to: "/dashboard/customer", icon: UsersIcon },
  { name: "Produk", to: "/dashboard/product", icon: ShoppingBagIcon },
];

const handleLogout = () => {
  auth.logout();
  router.push("/login");
};
</script>
