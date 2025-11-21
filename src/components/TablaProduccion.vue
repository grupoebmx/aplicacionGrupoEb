<template>
  <div class="overflow-x-auto">
    <table class="table w-full border border-gray-300 rounded-md">
      <thead class="bg-gray-100">
        <tr>
          <th
            v-for="etiqueta in encabezado"
            :key="etiqueta"
            class="font-bold text-gray-700 p-3 text-left"
          >
            {{ etiqueta }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="orden in infoProcesada"
          :key="orden.no_orden"
          class="hover border-b border-gray-200"
        >
          <!-- No. de orden -->
          <td class="p-3 font-medium text-gray-900">
            {{ orden.no_orden }}
          </td>

          <!-- No. de pedido -->
          <td class="p-3 text-gray-700">
            {{ orden.no_pedido || '—' }}
          </td>

          <!-- Producto -->
          <td class="p-3 text-gray-700">
            {{ orden.nombre_producto || orden.productos_identificador || 'Sin producto' }}
          </td>

          <!-- Fecha de inicio -->
          <td class="p-3 text-gray-700">
            {{ formatFecha(orden.fecha_inicio) }}
          </td>

          <!-- Semáforo de días -->
          <td class="p-3">
            <div class="flex items-center space-x-3">
              <!-- Semáforo visual -->
              <div class="flex flex-col items-center space-y-1">
                <div class="flex space-x-1">
                  <!-- Luz verde -->
                  <div
                    class="w-4 h-4 rounded-full border-2 border-gray-300"
                    :class="{
                      'bg-green-500 shadow-green-glow': orden.diasTranscurridos <= 9,
                      'bg-green-300': orden.diasTranscurridos > 9,
                    }"
                  ></div>
                  <!-- Luz naranja -->
                  <div
                    class="w-4 h-4 rounded-full border-2 border-gray-300"
                    :class="{
                      'bg-orange-500 shadow-orange-glow':
                        orden.diasTranscurridos >= 10 && orden.diasTranscurridos <= 14,
                      'bg-orange-300': orden.diasTranscurridos < 10 || orden.diasTranscurridos > 14,
                    }"
                  ></div>
                  <!-- Luz roja -->
                  <div
                    class="w-4 h-4 rounded-full border-2 border-gray-300"
                    :class="{
                      'bg-red-500 shadow-red-glow': orden.diasTranscurridos >= 15,
                      'bg-red-300': orden.diasTranscurridos < 15,
                    }"
                  ></div>
                </div>
                <!-- Indicador de días -->
                <span
                  class="text-xs font-medium px-2 py-1 rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': orden.diasTranscurridos <= 9,
                    'bg-orange-100 text-orange-800':
                      orden.diasTranscurridos >= 10 && orden.diasTranscurridos <= 14,
                    'bg-red-100 text-red-800': orden.diasTranscurridos >= 15,
                  }"
                >
                  {{ orden.diasTranscurridos }} días
                </span>
              </div>

              <!-- Estado del semáforo -->
              <div class="text-sm">
                <div
                  class="font-semibold"
                  :class="{
                    'text-green-600': orden.diasTranscurridos <= 9,
                    'text-orange-600':
                      orden.diasTranscurridos >= 10 && orden.diasTranscurridos <= 14,
                    'text-red-600': orden.diasTranscurridos >= 15,
                  }"
                >
                  {{ obtenerEstadoSemaforo(orden.diasTranscurridos) }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ obtenerRangoDias(orden.diasTranscurridos) }}
                </div>
              </div>
            </div>
          </td>

          <!-- Progreso -->
          <td class="p-3">
            <div class="flex items-center space-x-2">
              <!-- Barra de progreso -->
              <div class="w-20 bg-gray-200 rounded-full h-2.5 flex-1">
                <div
                  class="h-2.5 rounded-full transition-all duration-300"
                  :class="{
                    'bg-red-500': orden.progreso < 25,
                    'bg-yellow-500': orden.progreso >= 25 && orden.progreso < 50,
                    'bg-blue-500': orden.progreso >= 50 && orden.progreso < 75,
                    'bg-green-600': orden.progreso >= 75,
                  }"
                  :style="{ width: `${orden.progreso || 0}%` }"
                ></div>
              </div>

              <!-- Porcentaje y contador -->
              <div class="text-xs text-gray-600 min-w-16">
                <div class="font-medium">{{ orden.progreso || 0 }}%</div>
                <div class="text-gray-400">{{ orden.procesos_completados || 0 }}/8</div>
              </div>
            </div>

            <!-- Procesos individuales INCLUYENDO ALMACÉN -->
            <div class="flex space-x-1 mt-2">
              <div
                v-for="(proceso, index) in ['R', 'I', 'S', 'P', 'A', 'AL', 'C', 'E']"
                :key="index"
                class="w-4 h-4 rounded text-xs flex items-center justify-center text-white font-bold"
                :class="{
                  'bg-green-500': index < (orden.procesos_completados || 0),
                  'bg-gray-300': index >= (orden.procesos_completados || 0),
                }"
                :title="obtenerNombreProceso(index)"
              >
                {{ proceso }}
              </div>
            </div>
          </td>

          <!-- Estado con colores -->
          <td class="p-3">
            <span
              :class="[
                'px-3 py-1 rounded-full text-white text-xs font-medium capitalize',
                {
                  'bg-gray-400':
                    orden.estado_detallado === 'Pendiente' ||
                    orden.estado_detallado === 'Sin información',
                  'bg-blue-500': orden.estado_detallado === 'En proceso',
                  'bg-purple-500': orden.estado_detallado === 'Avanzada',
                  'bg-green-600': orden.estado_detallado === 'Completada',
                },
              ]"
            >
              {{ orden.estado_detallado || orden.estado || 'Desconocido' }}
            </span>
          </td>

          <!-- Botones de acción -->
          <td class="p-3">
            <div class="flex space-x-2">
              <button
                @click="verDetalleOrden(orden)"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                Ver detalle
              </button>

              <!-- PDF Normal (actual) -->
              <button
                @click="generarPDF(orden)"
                class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm flex items-center gap-1"
                :disabled="generandoPDF === orden.no_orden"
              >
                <svg
                  v-if="generandoPDF === orden.no_orden"
                  class="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {{ generandoPDF === orden.no_orden ? '...' : 'PDF' }}
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Estado vacío -->
    <div v-if="infoProcesada.length === 0" class="text-center py-8 text-gray-500">
      No hay órdenes de producción registradas
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'

const router = useRouter()
const { encabezado, info } = defineProps(['encabezado', 'info'])

const generandoPDF = ref(null)

// Computed para procesar la información y calcular días transcurridos
const infoProcesada = computed(() => {
  return info.map((orden) => {
    // Calcular días transcurridos desde la fecha de inicio
    const diasTranscurridos = calcularDiasTranscurridos(orden.fecha_inicio)

    return {
      ...orden,
      diasTranscurridos,
    }
  })
})

const verDetalleOrden = (orden) => {
  console.log('🧠 Datos de orden:', orden)
  router.push({
    name: 'ordenProduccion',
    params: { id: orden.no_orden },
  })
}

const generarPDF = async (orden) => {
  generandoPDF.value = orden.no_orden
  try {
    // Emitir evento al componente padre para generar el PDF
    emit('generar-pdf', orden.no_orden)
  } catch (error) {
    console.error('Error al generar PDF:', error)
  } finally {
    generandoPDF.value = null
  }
}

// Definir el emit
const emit = defineEmits(['generar-pdf', 'generar-pdf-completo'])

// Función para calcular días transcurridos
const calcularDiasTranscurridos = (fechaInicio) => {
  if (!fechaInicio) return 0

  try {
    const fechaInicioObj = new Date(fechaInicio)
    const fechaActual = new Date()
    const diferenciaTiempo = fechaActual.getTime() - fechaInicioObj.getTime()
    const diasTranscurridos = Math.floor(diferenciaTiempo / (1000 * 3600 * 24))

    return Math.max(0, diasTranscurridos)
  } catch {
    return 0
  }
}

// Función para formatear fecha
const formatFecha = (fecha) => {
  if (!fecha) return '—'

  try {
    const fechaObj = new Date(fecha)
    return fechaObj.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  } catch {
    return fecha
  }
}

// Función para obtener el estado del semáforo
const obtenerEstadoSemaforo = (dias) => {
  if (dias <= 9) return 'En tiempo'
  if (dias <= 14) return 'Por vencer'
  return 'Atrasado'
}

// Función para obtener el rango de días
const obtenerRangoDias = (dias) => {
  if (dias <= 9) return 'Días 1-9'
  if (dias <= 14) return 'Días 10-14'
  return 'Día 15+'
}

// Función para obtener nombres de procesos (INCLUYENDO ALMACÉN)
const obtenerNombreProceso = (index) => {
  const procesos = [
    'Recepción',
    'Impresión',
    'Suaje',
    'Pegado',
    'Armado',
    'Almacén',
    'Calidad',
    'Envío',
  ]
  return procesos[index] || 'Proceso'
}
</script>

<style scoped>
.hover:hover {
  background-color: #f9fafb;
}

/* Efectos de brillo para las luces del semáforo */
.shadow-green-glow {
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
}

.shadow-orange-glow {
  box-shadow: 0 0 8px rgba(249, 115, 22, 0.6);
}

.shadow-red-glow {
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.6);
}
</style>
