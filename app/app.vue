<script setup lang="ts">
import "~/assets/css/tailwind.css";
</script>

<template>
  <n-config-provider>
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-message-provider>
          <n-notification-provider>
            <NuxtLayout>
              <NuxtPage />
            </NuxtLayout>
          </n-notification-provider>
        </n-message-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
