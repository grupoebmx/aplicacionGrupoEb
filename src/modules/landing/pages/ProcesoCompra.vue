<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
    <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75
             0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75
             0 0 0-1.06 1.06L6.97 11.03a.75.75
             0 0 0 1.079-.02l3.992-4.99a.75.75
             0 0 0-.01-1.05z"
      />
    </symbol>
  </svg>

  <div class="flex items-start justify-center min-h-screen bg-gray-100 p-4">
    <div class="w-full mt-8 mx-20 bg-white p-8 rounded-lg shadow-md">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold font-[Inter]">Órdenes de compra</h2>
      </div>

      <!-- Tabla de órdenes -->
      <TablaCompra
        :encabezado="['N° Orden de compra', 'Pedido', 'Producto', 'Fecha', 'Estado']"
        :info="compras"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import TablaCompra from '@/components/TablaOrdenCompra.vue'


const compras = ref([])

const obtenerOrdenes = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/orden_compra')

    compras.value = res.data.map((o) => ({
      no_orden: o.id,
      no_pedido: o.no_pedido,
      producto: o.productos,
      fecha: new Date(o.fecha).toLocaleDateString('es-ES'),
      estado: o.status
    }))
  } catch (error) {
    console.error('Error al obtener órdenes de compras:', error)
    compras.value = []
  }
}



onMounted(() => obtenerOrdenes())
</script>
