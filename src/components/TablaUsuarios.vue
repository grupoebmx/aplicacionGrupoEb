<template>
  <div class="overflow-x-auto">
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th v-for="etiqueta in encabezado" :key="etiqueta" class="font-bold">
            {{ etiqueta }}
          </th>
          <th class="font-bold">Acciones</th>
        </tr>
      </thead>

      <!-- body -->
      <tbody>
        <tr v-for="inf in info" :key="inf.id" class="hover">
          <!-- datos del usuario -->
          <td v-for="c in claves" :key="c">
            {{ inf[c] }}
          </td>

          <!-- botones de acción -->
          <td>
            <div class="flex gap-2">
              <!-- Botón eliminar -->
              <button
                class="flex items-center justify-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-3 focus:ring-red-300 rounded-md text-sm px-3 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                @click="eliminar(inf.id)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                  <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                </svg>
              </button>

              <!-- Botón editar -->
              <button
                class="flex items-center justify-center focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-3 focus:ring-yellow-300 rounded-md text-sm px-3 py-2 dark:focus:ring-yellow-900"
                @click="editar(inf)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                </svg>
              </button>

              <!-- Botón cambiar contraseña -->
              <button
                class="flex items-center justify-center focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-3 focus:ring-blue-300 rounded-md text-sm px-3 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                @click="cambiarContrasena(inf)"
                title="Cambiar contraseña"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                  <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </td>
        </tr>

        <!-- Fila del botón Agregar Usuario -->
        <tr>
          <td :colspan="encabezado.length + 1" class="text-center py-4">
            <button
              class="flex items-center justify-center gap-2 mx-auto focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-3 focus:ring-green-300 rounded-lg text-sm px-4 py-3 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800 transition-colors duration-200"
              @click="agregarUsuario"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
              </svg>
              Agregar Usuario
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const { encabezado, info, claves } = defineProps(['encabezado', 'info', 'claves'])
const emit = defineEmits(['eliminar', 'editar', 'agregar', 'cambiarContrasena'])

const eliminar = (id) => emit('eliminar', id)
const editar = (inf) => emit('editar', inf)
const agregarUsuario = () => emit('agregar')
const cambiarContrasena = (inf) => emit('cambiarContrasena', inf)
</script>
