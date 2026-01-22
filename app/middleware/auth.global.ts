let isLoaded = false;
let navigationCount = 0;

export default defineNuxtRouteMiddleware((to, from) => {
  navigationCount++;

  const authStore = useAuthStore();

  if (!isLoaded) {
    authStore.loadFromStorage();
    isLoaded = true;
  }

  console.log("🛡️ Auth State:", {
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user?.username,
  });

  /** 🔓 PUBLIC ROUTES */
  const publicPages = [
    "/auth/login",
    "/auth/register",
    "/auth/register/profile",
  ];
  const isPublicPage = publicPages.includes(to.path);

  /** 🏠 ROOT */
  if (to.path === "/") {
    const target = authStore.isAuthenticated ? "/home" : "/auth/login";
    return navigateTo(target);
  }

  if (isPublicPage && authStore.isAuthenticated) {
    return navigateTo("/home");
  }

  if (!isPublicPage && !authStore.isAuthenticated) {
    return navigateTo("/auth/login");
  }

  return;
});
