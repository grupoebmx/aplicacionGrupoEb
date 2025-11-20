<template>
  <div class="overflow-x-auto">
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th v-for="etiqueta in encabezado" :key="etiqueta" class="font-bold">
            {{ etiqueta }}
          </th>
        </tr>
      </thead>

      <!-- body -->
      <tbody>
        <tr v-for="pedido in info" :key="pedido.id" class="hover">
          <!-- datos del pedido -->
          <td v-for="c in claves" :key="c">
            {{ pedido[c] }}
          </td>

          <!-- botones de acción -->
          <td>
            <div class="flex gap-2">
              <!-- Botón Generar Orden de Compra -->
              <button
              :disabled="pedido.status === 'Pendiente'"
                class="flex items-center justify-center text-white bg-green-600 hover:bg-green-700 focus:ring-3 focus:ring-green-300 font-medium rounded-md text-sm px-3 py-2"
                @click="generarOrdenCompra(pedido)"
              >
                Orden de Compra
              </button>

              <!-- Botón Generar Orden de Producción -->
              <button

              :disabled="pedido.status === 'Pendiente'"
                class="flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-3 focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-2"
                @click="generarOrdenProduccion(pedido)"
              >
                Orden de Producción
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const { encabezado, info, claves } = defineProps(['encabezado', 'info', 'claves'])
const emit = defineEmits(['ordenCompra', 'ordenProduccion'])

// Emitir eventos hacia la vista padre
const generarOrdenCompra = (pedido) => emit('ordenCompra', pedido)
const generarOrdenProduccion = (pedido) => emit('ordenProduccion', pedido)
</script>
