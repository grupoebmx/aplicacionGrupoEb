<template>
  <div class="relative">
    <div class="text-sm font-bold" :class="getCantidadClass()">
      {{ formatNumber(cantidad) }}
    </div>
    <div class="text-xs text-gray-500">
      {{ porcentaje }}%
    </div>
    <!-- Barra de progreso -->
    <div class="mt-1 w-full bg-gray-200 rounded-full h-1.5">
      <div
        class="h-1.5 rounded-full transition-all duration-300"
        :class="getBarraClass()"
        :style="{ width: `${porcentaje}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  cantidad: {
    type: [Number, String],
    default: 0
  },
  total: {
    type: [Number, String],
    required: true
  }
})

const porcentaje = computed(() => {
  const cant = Number(props.cantidad) || 0
  const tot = Number(props.total) || 1
  return Math.min(Math.round((cant / tot) * 100), 100)
})

const formatNumber = (num) => {
  return Number(num || 0).toLocaleString('es-MX')
}

const getCantidadClass = () => {
  const p = porcentaje.value
  if (p === 0) return 'text-gray-400'
  if (p < 50) return 'text-orange-600'
  if (p < 100) return 'text-blue-600'
  return 'text-green-600'
}

const getBarraClass = () => {
  const p = porcentaje.value
  if (p === 0) return 'bg-gray-300'
  if (p < 50) return 'bg-orange-400'
  if (p < 100) return 'bg-blue-400'
  return 'bg-green-400'
}
</script>
