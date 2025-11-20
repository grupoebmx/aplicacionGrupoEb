<template>
  <div class="overflow-x-auto">
    <table class="table w-full">
      <!-- Encabezado -->
      <thead>
        <tr>
          <th v-for="col in encabezado" :key="col" class="font-bold text-gray-700 text-base">
            {{ col }}
          </th>
          <th class="font-bold text-gray-700 text-base">Acciones</th>
        </tr>
      </thead>

      <!-- Cuerpo -->
      <tbody>
        <tr
          v-for="registro in registros"
          :key="registro.numero_pedido"
          class="hover:bg-gray-50 transition-colors"
        >
          <!-- Campos dinámicos -->
          <td v-for="clave in claves" :key="clave" class="text-sm text-gray-800">
            {{ registro[clave] }}
          </td>

          <!-- Botones -->
          <td>
            <div class="flex gap-2">
              <!-- Botón eliminar -->
              <button
                class="flex items-center justify-center focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-3 focus:ring-red-300 rounded-md text-sm px-3 py-2 transition-colors"
                @click="eliminar(registro.numero_pedido)"
                title="Eliminar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>
              </button>

              <!-- Botón editar -->
              <button
                class="flex items-center justify-center focus:outline-none text-white bg-green-600 focus:ring-3 rounded-md text-sm px-3 py-2 transition-colors"
                @click="editar(registro)"
                title="Editar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>

              <!-- Botón generar etiqueta PDF -->
              <button
                class="flex items-center justify-center focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-3 focus:ring-blue-300 rounded-md text-sm px-3 py-2 transition-colors"
                @click="generarEtiqueta(registro)"
                title="Generar Etiqueta PDF"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5h20v5a2 2 0 0 1-2 2h-2M6 14h12v8H6v-8z"
                  />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const { encabezado, registros, claves } = defineProps(['encabezado', 'registros', 'claves'])
const emit = defineEmits(['eliminar', 'generarEtiqueta'])

const eliminar = (numero_pedido) => emit('eliminar', numero_pedido)

const editar = (registro) => {
  router.push(`/editar-factura/${registro.numero_pedido}`)
}

const generarEtiqueta = (registro) => emit('generarEtiqueta', registro)
</script>
