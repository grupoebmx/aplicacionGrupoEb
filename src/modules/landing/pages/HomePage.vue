<template>
  <div class="flex justify-center items-center min-h-screen p-6 bg-gray-50">
    <!-- Contenedor principal con grid responsivo -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full max-w-7xl">

      <!-- Botón Cotizar nuevo producto -->
      <router-link
        to="/cotizaciones"
        class="group flex flex-col items-center"
        v-if="tieneAcceso('cotizaciones')"
      >
        <img
          src="@/assets/cotizaciones.png"
          alt="Cotizaciones"
          class="w-24 md:w-32 h-24 md:h-32 object-contain cursor-pointer transform transition duration-300 group-hover:scale-110 group-hover:shadow-lg"
        />
        <p class="text-center mt-2 font-semibold">Cotizar nuevo producto</p>
      </router-link>

      <!-- Botón Cotizar producto existente -->
      <router-link
        to="/cotizarNuevo"
        class="group flex flex-col items-center"
        v-if="tieneAcceso('cotizarNuevo')"
      >
        <img
          src="@/assets/cotizaciones.png"
          alt="Cotizaciones"
          class="w-24 md:w-32 h-24 md:h-32 object-contain cursor-pointer transform transition duration-300 group-hover:scale-110 group-hover:shadow-lg"
        />
        <p class="text-center mt-2 font-semibold">Cotizar producto existente</p>
      </router-link>

      <!-- Botón Realizar pedido -->
      <router-link
        to="/pedidosManual"
        class="group flex flex-col items-center"
        v-if="tieneAcceso('pedidosManual')"
      >
        <img
          src="@/assets/pedidos.png"
          alt="Pedidos"
          class="w-24 md:w-32 h-24 md:h-32 object-contain cursor-pointer transform transition duration-300 group-hover:scale-110 group-hover:shadow-lg"
        />
        <p class="text-center mt-2 font-semibold">Realizar pedido manual</p>
      </router-link>

      <router-link
        to="/listaCotizaciones"
        class="group flex flex-col items-center"
        v-if="tieneAcceso('listaCotizaciones')"
      >
        <img
          src="@/assets/pedidos.png"
          alt="Pedidos"
          class="w-24 md:w-32 h-24 md:h-32 object-contain cursor-pointer transform transition duration-300 group-hover:scale-110 group-hover:shadow-lg"
        />
        <p class="text-center mt-2 font-semibold">Realizar pedido desde cotizaciones</p>
      </router-link>

      <!-- Botón Lista de pedidos -->
      <router-link
        to="/listaPedidos"
        class="group flex flex-col items-center"
        v-if="tieneAcceso('listaPedidos')"
      >
        <img
          src="@/assets/iconoPedido.png"
          alt="Pedidos"
          class="w-24 md:w-32 h-24 md:h-32 object-contain cursor-pointer transform transition duration-300 group-hover:scale-110 group-hover:shadow-lg"
        />
        <p class="text-center mt-2 font-semibold">Lista de pedidos</p>
      </router-link>

      <!-- Botón Clientes -->
      <router-link
        to="/clientes"
        class="group flex flex-col items-center"
        v-if="tieneAcceso('clientes')"
      >
        <img
          src="@/assets/clientes.png"
          alt="Clientes"
          class="w-24 md:w-32 h-24 md:h-32 object-contain cursor-pointer transform transition duration-300 group-hover:scale-110 group-hover:shadow-lg"
        />
        <p class="text-center mt-2 font-semibold">Clientes</p>
      </router-link>

      <!-- Botón Productos -->
      <router-link
        to="/catalogo"
        class="group flex flex-col items-center"
        v-if="tieneAcceso('catalogo')"
      >
        <img
          src="@/assets/productos.png"
          alt="Productos"
          class="w-24 md:w-32 h-24 md:h-32 object-contain cursor-pointer transform transition duration-300 group-hover:scale-110 group-hover:shadow-lg"
        />
        <p class="text-center mt-2 font-semibold">Productos</p>
      </router-link>

      <!-- Botón Proveedores -->
      <router-link
        to="/proveedores"
        class="group flex flex-col items-center"
        v-if="tieneAcceso('proveedores')"
      >
        <img
          src="@/assets/proveedores.png"
          alt="Proveedores"
          class="w-24 md:w-32 h-24 md:h-32 object-contain cursor-pointer transform transition duration-300 group-hover:scale-110 group-hover:shadow-lg"
        />
        <p class="text-center mt-2 font-semibold">Proveedores</p>
      </router-link>

      <!-- Botón Pagos -->
      <router-link
        to="/pagosPedidos"
        class="group flex flex-col items-center"
        v-if="tieneAcceso('pagos')"
      >
        <img
          src="@/assets/pago.png"
          alt="Pagos"
          class="w-24 md:w-32 h-24 md:h-32 object-contain cursor-pointer transform transition duration-300 group-hover:scale-110 group-hover:shadow-lg"
        />
        <p class="text-center mt-2 font-semibold">Pagos</p>
      </router-link>

        <router-link
        to="/TableroGeneral"
        class="group flex flex-col items-center"
        v-if="tieneAcceso('TableroGeneral')"
      >
        <img
          src="@/assets/tablero.png"
          alt="Tablero general"
          class="w-24 md:w-32 h-24 md:h-32 object-contain cursor-pointer transform transition duration-300 group-hover:scale-110 group-hover:shadow-lg"
        />
        <p class="text-center mt-2 font-semibold">Tablero general</p>
      </router-link>

      <!-- Botón Datos facturación y envío -->
      <router-link
        to="/TablaF"
        class="group flex flex-col items-center"
        v-if="tieneAcceso('TablaF')"
      >
        <img
          src="@/assets/iconoEnvio.png"
          alt="Facturación y envío"
          class="w-24 md:w-32 h-24 md:h-32 object-contain cursor-pointer transform transition duration-300 group-hover:scale-110 group-hover:shadow-lg"
        />
        <p class="text-center mt-2 font-semibold">Datos facturación y envío</p>
      </router-link>

      <!-- Botón Configuraciones -->
      <router-link
        to="/Configuraciones"
        class="group flex flex-col items-center"
        v-if="tieneAcceso('configuraciones')"
      >
        <img
          src="@/assets/configuraciones.png"
          alt="Configuraciones"
          class="w-24 md:w-32 h-24 md:h-32 object-contain cursor-pointer transform transition duration-300 group-hover:scale-110 group-hover:shadow-lg"
        />
        <p class="text-center mt-2 font-semibold">Configuraciones</p>
      </router-link>

    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()

// Función para verificar si el usuario tiene acceso a un botón específico
const tieneAcceso = (buttonName) => {

  // Si es Administrador, solo ve el botón de Pagos (según solicitud)
  if (auth.rolUsuario === 'Administrador') {
    return buttonName === 'pagos'
  }

  if (auth.rolUsuario === 'Direccion') {
    return true
  }

  // Si es Gerente, ve todos los botones excepto los de configuración
  if (auth.rolUsuario === 'Gerente') {
    return buttonName !== 'configuraciones'
  }

  // Si es Ventas, ve estos botones específicos
  if (auth.rolUsuario === 'Ventas') {
    const botonesVentas = ['clientes', 'pedidosManual', 'listaPedidos', 'listaCotizaciones', 'TablaF', 'TableroGeneral']
    return botonesVentas.includes(buttonName)
  }

  // Por defecto, no mostrar nada
  return false
}
</script>
