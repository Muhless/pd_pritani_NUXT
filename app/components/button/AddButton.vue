<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { NButton } from "naive-ui";

interface Props {
  label?: string;
  icon?: string;
  type?: "default" | "primary" | "info" | "success" | "warning" | "error";
  size?: "tiny" | "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  icon: "ic:round-add",
  type: "primary",
  size: "medium",
  loading: false,
  disabled: false,
  block: false,
});
</script>

<template>
  <NButton
    :type="props.type"
    :size="props.size"
    :loading="props.loading"
    :disabled="props.disabled"
    :block="props.block"
    class="rounded-md"
    :class="{ 'w-48': !props.block }"
  >
    <template #icon>
      <Icon :icon="props.icon" class="size-5" />
    </template>
    <slot>
      <span v-if="props.label">Tambah {{ props.label }}</span>
      <span v-else>Tambah</span>
    </slot>
  </NButton>
</template>