<template>
  <div class="overflow-x-auto">
    <table class="table w-full border border-gray-300 rounded-md">
      <thead class="bg-gray-100">
        <tr>
          <th
            v-for="etiqueta in encabezado"
            :key="etiqueta"
            class="font-bold text-gray-700"
          >
            {{ etiqueta }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="compra in info" :key="compra.id" class="hover">
          <!-- No. de orden -->
          <td>{{ compra.no_orden || compra.id }}</td>

          <!-- No. de pedido -->
          <td>{{ compra.no_pedido || '—' }}</td>

          <!-- Producto -->
          <td>{{ compra.producto || 'Sin producto' }}</td>

          <!-- Fecha -->
          <td>{{ compra.fecha || '—' }}</td>

          <!-- Estado con colores -->
          <td>
            <span
              :class="[
                'px-2 py-1 rounded-md text-white text-sm font-medium',
                {
                  'bg-yellow-500': compra.estado === 'Realizada',
                  'bg-green-600': compra.estado === 'Finalizado',
                  'bg-gray-500': !['Realizada', 'Finalizado'].includes(compra.estado),
                },
              ]"
            >
              {{ compra.estado || 'Desconocido' }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const { encabezado, info } = defineProps(['encabezado', 'info'])
</script>
