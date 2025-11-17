<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { NButton, NTag } from "naive-ui";

interface Props {
  id: number;
  name: string;
  position: string;
  department: string;
  phone?: string;
  email?: string;
  salary?: string | number;
  status: string; // active, inactive, leave
  photo?: string;
  join_date?: string;
  created_at?: string;
  updated_at?: string;
}

interface Emits {
  (e: "detail", id?: number): void;
  (e: "edit", id?: number): void;
  (e: "delete", id?: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const formatSalary = (salary: number | string) => {
  const numSalary = typeof salary === "string" ? parseFloat(salary) : salary;

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(numSalary);
};

const formatDate = (date?: string) => {
  if (!date) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  target.src = "https://via.placeholder.com/400x400?text=No+Photo";
};

const getStatusTagType = (status: string) => {
  if (status === "active") return "success";
  if (status === "leave") return "warning";
  return "error";
};

const getStatusLabel = (status: string) => {
  if (status === "active") return "Aktif";
  if (status === "leave") return "Cuti";
  if (status === "inactive") return "Tidak Aktif";
  return status;
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
</script>

<template>
  <div
    class="relative p-5 cursor-pointer border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 bg-white"
  >
    <!-- Photo Section -->
    <div class="relative mb-4 group">
      <!-- Photo or Avatar -->
      <div class="flex justify-center mb-3">
        <div class="relative">
          <img
            v-if="props.photo"
            :src="props.photo"
            :alt="props.name"
            class="w-32 h-32 object-cover rounded-full border-4 border-gray-100"
            @error="handleImageError"
          />
          <div
            v-else
            class="w-32 h-32 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center border-4 border-gray-100"
          >
            <span class="text-white text-3xl font-bold">
              {{ getInitials(props.name) }}
            </span>
          </div>

          <!-- Status Badge -->
          <div class="absolute bottom-0 right-0">
            <NTag :type="getStatusTagType(props.status)" size="small" round>
              {{ getStatusLabel(props.status) }}
            </NTag>
          </div>
        </div>
      </div>

      <!-- Hover Overlay -->
      <div
        class="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2"
      >
        <NButton
          circle
          type="primary"
          size="small"
          @click.stop="emit('detail', props.id)"
        >
          <Icon icon="mdi:eye" :width="18" />
        </NButton>
        <NButton
          circle
          type="info"
          size="small"
          @click.stop="emit('edit', props.id)"
        >
          <Icon icon="mdi:pencil" :width="18" />
        </NButton>
        <NButton
          circle
          type="error"
          size="small"
          @click.stop="emit('delete', props.id)"
        >
          <Icon icon="mdi:delete" :width="18" />
        </NButton>
      </div>
    </div>

    <!-- Employee Info -->
    <div class="space-y-3">
      <!-- Name -->
      <div class="text-center">
        <h2 class="font-bold text-xl line-clamp-1">
          {{ props.name }}
        </h2>
        <p class="text-sm text-gray-500 mt-1">{{ props.position }}</p>
      </div>

      <!-- Department Badge -->
      <div class="flex justify-center">
        <NTag type="info" size="small">
          <Icon icon="mdi:office-building" class="mr-1" :width="14" />
          {{ props.department }}
        </NTag>
      </div>

      <!-- Details -->
      <div class="pt-2 space-y-2 border-t">
        <!-- Email -->
        <div v-if="props.email" class="flex items-center gap-2 text-sm">
          <Icon icon="mdi:email" :width="16" class="text-gray-400" />
          <span class="text-gray-600 truncate">{{ props.email }}</span>
        </div>

        <!-- Phone -->
        <div v-if="props.phone" class="flex items-center gap-2 text-sm">
          <Icon icon="mdi:phone" :width="16" class="text-gray-400" />
          <span class="text-gray-600">{{ props.phone }}</span>
        </div>

        <!-- Salary (Optional) -->
        <div
          v-if="props.salary"
          class="flex items-center justify-between pt-2 border-t"
        >
          <span class="text-sm text-gray-500">Gaji</span>
          <span class="font-bold text-primary">
            {{ formatSalary(props.salary) }}
          </span>
        </div>

        <!-- Join Date -->
        <div
          v-if="props.join_date"
          class="flex items-center justify-between text-sm"
        >
          <span class="text-gray-500">Bergabung</span>
          <span class="text-gray-700">{{ formatDate(props.join_date) }}</span>
        </div>
      </div>
    </div>

    <!-- Actions (Mobile) -->
    <div class="mt-4 flex gap-2 sm:hidden">
      <NButton
        type="primary"
        size="small"
        block
        @click.stop="emit('detail', props.id)"
      >
        <Icon icon="mdi:eye" class="mr-1" />
        Detail
      </NButton>
      <NButton type="info" size="small" @click.stop="emit('edit', props.id)">
        <Icon icon="mdi:pencil" />
      </NButton>
      <NButton type="error" size="small" @click.stop="emit('delete', props.id)">
        <Icon icon="mdi:delete" />
      </NButton>
    </div>
  </div>
</template>