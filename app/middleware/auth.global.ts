// middleware/auth.global.ts
let isLoaded = false;
let navigationCount = 0;

export default defineNuxtRouteMiddleware((to, from) => {
  navigationCount++;
  
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔢 Navigation #${navigationCount}
📍 FROM: ${from?.path || 'initial'} 
📍 TO: ${to.path}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
  
  const authStore = useAuthStore();

  if (!isLoaded) {
    console.log("🔄 First load - reading from storage");
    authStore.loadFromStorage();
    isLoaded = true;
  }

  console.log("🛡️ Auth State:", {
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user?.username,
  });

  const publicPages = ["/login", "/register"];
  const isPublicPage = publicPages.includes(to.path);
  
  console.log("📄 Page Check:", {
    path: to.path,
    isPublicPage: isPublicPage,
  });

  // CRITICAL: Return early untuk prevent multiple navigations
  
  // 1. Handle root
  if (to.path === "/") {
    const target = authStore.isAuthenticated ? "/dashboard" : "/login";
    console.log("🏠 Root redirect →", target);
    return navigateTo(target);
  }

  // 2. Public pages + authenticated = go to dashboard
  if (isPublicPage && authStore.isAuthenticated) {
    console.log("🚫 Public page while authenticated → /dashboard");
    return navigateTo("/dashboard");
  }

  // 3. Protected pages + not authenticated = go to login
  if (!isPublicPage && !authStore.isAuthenticated) {
    console.log("🚫 Protected page while not authenticated → /login");
    return navigateTo("/login");
  }

  // 4. All good - allow navigation
  console.log("✅ Navigation allowed to:", to.path);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  // IMPORTANT: Explicitly return undefined untuk allow navigation
  return undefined;
});