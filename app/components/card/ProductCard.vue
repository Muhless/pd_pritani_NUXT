<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { NButton, NTag } from "naive-ui";

interface Props {
  id?: number;
  name: string;
  type: string; // Ganti dari 'category' ke 'type' sesuai backend
  price: number;
  stock: number;
  photo?: string;
}

interface Emits {
  (e: "detail", id?: number): void;
  (e: "edit", id?: number): void;
  (e: "delete", id?: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  target.src = "https://via.placeholder.com/400x300?text=No+Image";
};

const getStockTagType = (stock: number) => {
  if (stock === 0) return "error";
  if (stock < 10) return "warning";
  return "success";
};

const getStockLabel = (stock: number) => {
  if (stock === 0) return "Habis";
  if (stock < 10) return "Stok Rendah";
  return "Tersedia";
};
</script>

<template>
  <div
    class="relative p-5 border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 bg-white"
  >
    <!-- Image Section -->
    <div class="relative mb-4 group">
      <img
        v-if="props.photo"
        :src="props.photo"
        :alt="props.name"
        class="w-full h-48 object-cover rounded-lg"
        @error="handleImageError"
      />
      <div
        v-else
        class="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center"
      >
        <Icon
          icon="material-symbols:image-outline"
          :width="64"
          class="text-gray-300"
        />
      </div>

      <!-- Stock Badge -->
      <div class="absolute top-2 right-2">
        <NTag :type="getStockTagType(props.stock)" size="small" round>
          {{ getStockLabel(props.stock) }}
        </NTag>
      </div>

      <!-- Hover Overlay -->
      <div
        class="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2"
      >
        <NButton
          circle
          type="primary"
          size="small"
          @click="emit('detail', props.id)"
        >
          <Icon icon="mdi:eye" :width="18" />
        </NButton>
        <NButton
          circle
          type="info"
          size="small"
          @click="emit('edit', props.id)"
        >
          <Icon icon="mdi:pencil" :width="18" />
        </NButton>
        <NButton
          circle
          type="error"
          size="small"
          @click="emit('delete', props.id)"
        >
          <Icon icon="mdi:delete" :width="18" />
        </NButton>
      </div>
    </div>

    <!-- Product Info -->
    <div class="space-y-2">
      <div class="flex justify-between items-start gap-2">
        <h2 class="font-bold text-lg line-clamp-2 flex-1">
          {{ props.name }}
        </h2>
      </div>

      <NTag type="info" size="small">{{ props.type }}</NTag>

      <div class="pt-2 space-y-1">
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">Harga</span>
          <span class="font-bold text-lg text-primary">
            {{ formatPrice(props.price) }}
          </span>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">Stok</span>
          <span
            class="font-semibold"
            :class="{
              'text-red-500': props.stock === 0,
              'text-orange-500': props.stock > 0 && props.stock < 10,
              'text-green-500': props.stock >= 10,
            }"
          >
            {{ props.stock }} unit
          </span>
        </div>
      </div>
    </div>

    <!-- Actions (Mobile) -->
    <div class="mt-4 flex gap-2 sm:hidden">
      <NButton
        type="primary"
        size="small"
        block
        @click="emit('detail', props.id)"
      >
        <Icon icon="mdi:eye" class="mr-1" />
        Detail
      </NButton>
      <NButton type="info" size="small" @click="emit('edit', props.id)">
        <Icon icon="mdi:pencil" />
      </NButton>
      <NButton type="error" size="small" @click="emit('delete', props.id)">
        <Icon icon="mdi:delete" />
      </NButton>
    </div>
  </div>
</template>
