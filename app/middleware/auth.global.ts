let isLoaded = false;
let navigationCount = 0;

export default defineNuxtRouteMiddleware((to, from) => {
  navigationCount++;

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔢 Navigation #${navigationCount}
📍 FROM: ${from?.path || "initial"}
📍 TO: ${to.path}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);

  const authStore = useAuthStore();

  // Load auth dari storage sekali saja
  if (!isLoaded) {
    console.log("🔄 First load - reading from storage");
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

  console.log("📄 Page Check:", {
    path: to.path,
    isPublicPage,
  });

  /** 🏠 ROOT */
  if (to.path === "/") {
    const target = authStore.isAuthenticated ? "/home" : "/auth/login";
    console.log("🏠 Root redirect →", target);
    return navigateTo(target);
  }

  /** 🚫 SUDAH LOGIN TAPI KE LOGIN / REGISTER */
  if (isPublicPage && authStore.isAuthenticated) {
    console.log("🚫 Public page while authenticated → /home");
    return navigateTo("/home");
  }

  /** 🔒 BELUM LOGIN TAPI KE HALAMAN PROTECTED */
  if (!isPublicPage && !authStore.isAuthenticated) {
    console.log("🚫 Protected page while not authenticated → /auth/login");
    return navigateTo("/auth/login");
  }

  console.log("✅ Navigation allowed to:", to.path);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  return;
});
