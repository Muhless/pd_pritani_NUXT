// middleware/auth.global.ts
let isLoaded = false; // ⬅️ Flag untuk load sekali saja

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // Load dari storage hanya sekali
  if (!isLoaded) {
    console.log("🔄 First load - reading from storage");
    authStore.loadFromStorage();
    isLoaded = true;
  }

  console.log("🛡️ Auth check:", {
    path: to.path,
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user?.username,
  });

  const publicPages = ["/login", "/register"];
  const isPublicPage = publicPages.some((page) => to.path.startsWith(page));

  if (!authStore.isAuthenticated && !isPublicPage) {
    console.log("❌ Redirect to login");
    return navigateTo("/login");
  }

  if (authStore.isAuthenticated && to.path === "/login") {
    console.log("✅ Redirect to dashboard");
    return navigateTo("/dashboard");
  }
});