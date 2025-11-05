export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();

  // ✅ Jangan panggil loadFromCookie di sini
  // Karena sudah dipanggil di plugin saat app initialize

  console.log("Middleware check:", {
    path: to.path,
    hasToken: !!auth.token,
    hasUser: !!auth.user,
  });

  // ✅ Cek apakah sudah login
  if (!auth.token || !auth.user) {
    console.warn("Belum login, redirect ke halaman login");
    return navigateTo("/auth/login");
  }
});
