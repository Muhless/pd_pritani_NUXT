<script setup lang="ts">
import { navigateTo, useHead } from "#app";
import { ref } from "vue";
import BaseInput from "~/components/input/BaseInput.vue";

useHead({
  title: "Register | Dashboard PG. Pritani",
});

const loading = ref(false);
const error = ref("");
const registerStore = useRegisterStore();

onMounted(() => {
  if (registerStore.loadFromStorage) {
    registerStore.loadFromStorage();
  }
  console.log("📋 Step1 data setelah load:", registerStore.step1);
  console.log("📋 Step2 data setelah load:", registerStore.step2);
});

const submit = async () => {
  error.value = "";

  console.log("Step1 data:", registerStore.step1);
  console.log("Step2 data:", registerStore.step2);

  // Validasi input
  const { name, phone, address } = registerStore.step2;

  if (!name || !phone || !address) {
    error.value = "Semua field harus diisi";
    return;
  }

  if (phone.length < 10) {
    error.value = "Nomor telepon minimal 10 digit";
    return;
  }

  loading.value = true;

  try {
    await registerStore.submitRegister();
    await navigateTo("/auth/login");
  } catch (err: any) {
    console.error("Gagal buat akun baru:", err);
    error.value = err?.data?.message ?? "Registrasi gagal, silakan coba lagi";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div
      class="flex flex-col items-center justify-center text-center bg-white w-96 p-8 rounded-lg"
    >
      <div class="mb-4 flex flex-col items-center">
        <img
          src="/images/logo-pritani.png"
          alt="logo-pritani"
          class="w-12 h-auto"
        />
        <h1 class="mb-2 text-4xl font-bold text-green-600">Registrasi Akun</h1>
        <p class="text-gray-600">Silahkan isi data diri anda.</p>
      </div>

      <form @submit.prevent="submit" class="flex flex-col space-y-5 w-full">
        <BaseInput
          v-model="registerStore.step2.name"
          id="name"
          label="Nama"
          placeholder="Masukkan nama anda"
          :disabled="loading"
        />

        <BaseInput
          v-model="registerStore.step2.phone"
          id="phone"
          label="Nomor Telepon"
          type="tel"
          placeholder="Masukkan nomor telepon anda"
          :disabled="loading"
        />

        <BaseInput
          v-model="registerStore.step2.address"
          id="address"
          label="Alamat"
          placeholder="Masukkan alamat anda"
          as="textarea"
          :disabled="loading"
        />

        <p v-if="error" class="mt-2 text-sm text-red-500">{{ error }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="py-3 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {{ loading ? "Memproses..." : "Daftar" }}
        </button>

        <p class="text-gray-500">
          Sudah punya akun?
          <NuxtLink
            to="/auth/login"
            class="underline hover:text-green-600 transition"
          >
            Login Disini
          </NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>
