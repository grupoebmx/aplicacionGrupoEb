<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
  <!-- Header -->
<header class="bg-black border-b border-gray-300 h-40 w-full flex items-center">
  <!-- Contenedor principal -->
  <div class="flex justify-between items-center w-full px-6">

    <!-- 🔹 Logo izquierda -->
    <div class="flex items-center">
      <RouterLink
        to="/"
        class="flex items-center font-semibold text-white hover:opacity-80 transition"
      >
        <img
          alt="Logo Grupo EB"
          class="object-contain cursor-pointer h-40 w-auto"
          src="@/assets/logoEB.png"
        />
      </RouterLink>
    </div>

    <!-- 🔹 Botón cerrar sesión derecha -->
    <div class="flex items-center">
      <button
        @click="cerrarSesion"
        class="flex items-center gap-2 hover:opacity-80 transition"
      >
        <img
          alt="Cerrar sesión"
          class="object-contain cursor-pointer h-8 w-8"
          src="@/assets/cerrarSesion.png"
        />
        <span class="text-white text-sm font-medium">Cerrar Sesión</span>
      </button>
    </div>

  </div>
</header>


    <!-- Fin Header -->

    <!-- Main -->
    <main class="flex-1 flex items-center justify-center">
      <router-view />
    </main>
    <!-- Fin Main -->

    <!-- Footer -->
    <footer class="flex items-center h-14 px-4 border-t border-gray-300 sm:h-16 md:px-6 lg:px-8">
      <p class="flex-1 text-sm text-gray-500 text-center">
        © {{ new Date().getFullYear() }} GRUPEB, S.A. DE C.V.. Derechos reservados
      </p>
    </footer>
    <!-- Fin Footer -->
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore' // Ajusta la ruta según tu proyecto

const auth = useAuthStore()

const cerrarSesion = () => {
  auth.logout()
}
</script>
