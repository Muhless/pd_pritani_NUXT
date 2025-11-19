<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { NButton, NTag } from "naive-ui";
import { computed } from "vue";

interface Props {
  id: number;
  name: string;
  phone?: string;
  address?: string;
  photo?: string;
  status: string;
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

// ✅ Get base URL from runtime config
const config = useRuntimeConfig();
const baseURL = config.public.apiBase || 'http://localhost:8080';

// ✅ Computed untuk full photo URL
const fullPhotoUrl = computed(() => {
  if (!props.photo) return '';
  if (props.photo.startsWith('http')) return props.photo;
  return `${baseURL}${props.photo}`;
});

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  target.src = "https://placehold.co/400x400/3b82f6/ffffff?text=No+Photo";
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
    class="relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100 group"
  >
    <!-- ✨ Decorative Background -->
    <div class="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-primary/10 to-blue-500/10"></div>
    
    <!-- ✨ Action Buttons - Top Right -->
    <div class="absolute top-3 right-3 z-30 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <NButton
        circle
        type="primary"
        size="small"
        @click.stop="emit('detail', props.id)"
        class="shadow-lg"
      >
        <Icon icon="mdi:eye" :width="16" />
      </NButton>
      <NButton
        circle
        type="info"
        size="small"
        @click.stop="emit('edit', props.id)"
        class="shadow-lg"
      >
        <Icon icon="mdi:pencil" :width="16" />
      </NButton>
      <NButton
        circle
        type="error"
        size="small"
        @click.stop="emit('delete', props.id)"
        class="shadow-lg"
      >
        <Icon icon="mdi:delete" :width="16" />
      </NButton>
    </div>
    
    <!-- Content -->
    <div class="relative p-6">
      <!-- Photo Section -->
      <div class="flex justify-center mb-4">
        <div class="relative">
          <!-- Photo Container with Ring -->
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-br from-primary to-blue-600 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
            
            <div class="relative">
              <img
                v-if="fullPhotoUrl"
                :src="fullPhotoUrl"
                :alt="props.name"
                class="w-28 h-28 object-cover rounded-full border-4 border-white shadow-lg relative z-10"
                @error="handleImageError"
              />
              <div
                v-else
                class="w-28 h-28 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg relative z-10"
              >
                <span class="text-white text-2xl font-bold">
                  {{ getInitials(props.name) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Hover Action Buttons -->
        </div>
      </div>

      <!-- Employee Info -->
      <div class="text-center space-y-3">
        <!-- Name -->
        <h2 class="font-bold text-lg text-gray-800 line-clamp-1 group-hover:text-primary transition-colors">
          {{ props.name }}
        </h2>

        <!-- Status Badge -->
        <div class="flex justify-center">
          <NTag 
            :type="getStatusTagType(props.status)" 
            size="medium" 
            round
            class="shadow-sm"
          >
            <template #icon>
              <Icon 
                :icon="props.status === 'active' ? 'mdi:check-circle' : props.status === 'leave' ? 'mdi:clock-outline' : 'mdi:close-circle'" 
                :width="14" 
              />
            </template>
            {{ getStatusLabel(props.status) }}
          </NTag>
        </div>

        <!-- Phone -->
        <div 
          v-if="props.phone" 
          class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full text-sm text-gray-600"
        >
          <Icon icon="mdi:phone" :width="14" class="text-primary" />
          <span>{{ props.phone }}</span>
        </div>

        <!-- Address -->
        <div 
          v-if="props.address" 
          class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full text-xs text-gray-500 max-w-full"
        >
          <Icon icon="mdi:map-marker" :width="12" class="text-gray-400 flex-shrink-0" />
          <span class="line-clamp-1">{{ props.address }}</span>
        </div>
      </div>

      <!-- Divider -->
    </div>

    <!-- ✨ Hover Effect Border -->
    <div class="absolute inset-0 border-2 border-primary rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
  </div>
</template>