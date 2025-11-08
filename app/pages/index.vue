<script setup>
definePageMeta({
  middleware: [
    function (to, from) {
      const authStore = useAuthStore();
      if (authStore.isAuthenticated) {
        return navigateTo("/dashboard");
      }
      return navigateTo("/login");
    },
  ],
});
</script>
