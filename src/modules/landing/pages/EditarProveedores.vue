<template>
  <div class="flex items-start justify-center min-h-screen bg-gray-100 p-4">
    <form class="w-full mt-8 mx-20 bg-white p-8 rounded-lg shadow-md" @submit.prevent="guardarCambios">

      <!-- Título centrado en todo el formulario -->
      <div class="flex justify-center w-full mb-6">
        <h1 class="text-5xl font-bold text-gray-800 text-center font-[Inter]">
          Editar proveedor
        </h1>
      </div>


      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
        <div class="sm:col-span-1">
          <label for="idproveedores" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            ID del proveedor
          </label>
          <input id="idproveedores" type="text" name="idproveedores"
            v-model="form.idproveedores"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          />
        </div>
        <div class="sm:col-span-1">
          <label for="nombre" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Nombre
          </label>
          <input id="nombre" type="text" name="nombre"
            v-model="form.nombre"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          />
        </div>
        <div class="sm:col-span-1">
          <label for="ejecutivo_ventas" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Ejecutivo de ventas
          </label>
          <input id="ejecutivo_ventas" type="text" name="ejecutivo_ventas"
            v-model="form.ejecutivo_ventas"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          />
        </div>
      </div>

      <!-- Segunda fila: Correo, Teléfono -->
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 mt-4">
          <div class="sm:col-span-1">
         <label for="categoria" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
         Categoría
         </label>
         <select id="categoria" name="categoria" v-model="form.categoria" required
         class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
           py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]">
          <option disabled value="">Seleccione una categoría</option>
          <option value="Cartón">Cartón</option>
          <option value="Tintas">Tintas</option>
          <option value="Pegamento">Pegamento</option>
          <option value="Otros">Otros</option>
          </select>
       </div>
        <div class="sm:col-span-1">
          <label for="correo" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Correo electrónico
          </label>
          <input id="correo"  name="correo" type="email" required maxlength="50"
            v-model="form.correo"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          />
        </div>
        <div class="sm:col-span-1">
          <label for="telefono" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Teléfono
          </label>
          <input id="telefono" type="text" name="telefono"
            v-model="form.telefono"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          />
        </div>
        <div class="sm:col-span-1"></div>
      </div>


      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 mt-4">
        <div class="sm:col-span-1">
          <label for="estado" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Estado
          </label>
          <input id="estado" type="text" name="estado"
            v-model="form.estado"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          />
        </div>
        <div class="sm:col-span-1">
          <label for="colonia" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Colonia
          </label>
          <input id="colonia" type="text" name="colonia"
            v-model="form.colonia"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          />
        </div>
        <div class="sm:col-span-1">
          <label for="cp" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            C.p.
          </label>
          <input id="cp" type="text" name="cp"
            v-model="form.cp"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          />
        </div>
      </div>

      <!-- Nueva fila: Calle, Núm. exterior, Núm. interior -->
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 mt-4">


        <div class="sm:col-span-1">
          <label for="calle" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Calle
          </label>
          <input id="calle" type="text" name="calle"
            v-model="form.calle"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          />
        </div>
        <div class="sm:col-span-1">
          <label for="numero_exterior" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Núm. exterior
          </label>
          <input id="numero_exterior" type="text" name="numero_exterior"
            v-model="form.numero_exterior"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          />
        </div>
        <div class="sm:col-span-1">
          <label for="numero_interior" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Núm. interior
          </label>
          <input id="numero_interior" type="text" name="numero_interior"
            v-model="form.numero_interior"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 mt-4">


        <div class="sm:col-span-1">
          <label for="rfc" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            RFC
          </label>
          <input id="rfc" type="text" name="rfc"
            v-model="form.rfc"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          />
        </div>
        <div class="sm:col-span-1">
          <label for="banco" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Banco
          </label>
          <input id="banco" type="text" name="banco"
            v-model="form.banco"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          />
        </div>
        <div class="sm:col-span-1">
          <label for="cuenta_bancaria" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Cuenta bancaria
          </label>
          <input id="cuenta_bancaria" type="text" name="cuenta_bancaria"
            v-model="form.cuenta_bancaria"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          />
        </div>

        <div class="sm:col-span-1">
          <label for="clabe" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            CLABE
          </label>
          <input id="clabe" type="text" name="clabe"
            v-model="form.clabe"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          />
        </div>

        <div class="sm:col-span-1">
          <label for="beneficiario" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Beneficiario
          </label>
          <input id="beneficiario" type="text" name="beneficiario"
            v-model="form.beneficiario"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          />
        </div>

      </div>
       <!-- Botón -->
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" type="submit">
          Actualizar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const form = reactive({
  idproveedores: '',
  nombre: '',
  ejecutivo_ventas: '',
  correo: '',
  categoria: '',
  telefono: '',
  estado: '',
  colonia: '',
  cp: '',
  calle: '',
  numero_exterior: '',
  numero_interior: '',
  rfc: '',
  banco: '',
  cuenta_bancaria: '',
  clabe: '',
  beneficiario: ''
})

/** Cargar datos del proveedor */
const cargarProveedor = async () => {
  try {
    const { id } = route.params
    const res = await axios.get(`http://localhost:3000/api/proveedor/${id}`)

    if (res.data && res.data.length > 0) {
      Object.assign(form, res.data[0])
    } else {
      console.warn('No se encontró el proveedor con ese número')
    }
  } catch (error) {
    console.error('Error al cargar proveedor:', error)
  }
}


const ActualizarProveedor = async (json, idproveedores) => {
  try {
    const res = await axios.put(`http://localhost:3000/api/proveedores/actualizar/${idproveedores}`, json)
    console.log("Proveedor actualizado:", res.data)
    alert("Proveedor actualizado correctamente")
    router.push('/proveedores')
  } catch (error) {
    console.error("Error al actualizar proveedor:", error)
  }
}


const guardarCambios = async () => {
  await ActualizarProveedor(form, form.idproveedores)
}

cargarProveedor()
</script>

