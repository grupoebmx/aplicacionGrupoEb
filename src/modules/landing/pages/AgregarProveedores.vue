<template>
  <div class="flex items-start justify-center min-h-screen bg-gray-100 p-4">
    <form class="w-full mt-8 mx-20 bg-white p-8 rounded-lg shadow-md" @submit.prevent="guardarProveedor">

      <!-- Título centrado -->
      <div class="flex justify-center w-full mb-6">
        <h1 class="text-5xl font-bold text-gray-800 text-center font-[Inter]">
          Agregar proveedor
        </h1>
      </div>

      <!-- Primera fila -->
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
        <div class="sm:col-span-1">
          <label for="nombre" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">Nombre</label>
          <input id="nombre" v-model="form.nombre" type="text" required
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]" />
        </div>

        <div class="sm:col-span-1">
          <label for="ejecutivo_ventas" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">Ejecutivo de ventas</label>
          <input id="ejecutivo_ventas" v-model="form.ejecutivo_ventas" type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]" />
        </div>

        <div class="sm:col-span-1">
          <label for="categoria" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">Categoría</label>
          <select id="categoria" v-model="form.categoria" required
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]">
            <option disabled value="">Seleccione una categoría</option>
            <option value="Carton">Cartón</option>
            <option value="Tintas">Tintas</option>
            <option value="Pegamento">Pegamento</option>
            <option value="Otros">Otros</option>
          </select>
        </div>
      </div>

      <!-- Segunda fila -->
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 mt-4">
        <div class="sm:col-span-1">
          <label for="correo" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">Correo electrónico</label>
          <input id="correo" v-model="form.correo" type="email" required
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]" />
        </div>

        <div class="sm:col-span-1">
          <label for="telefono" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">Teléfono</label>
          <input id="telefono" v-model="form.telefono" type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]" />
        </div>
      </div>

      <!-- Dirección -->
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 mt-4">
        <div class="sm:col-span-1">
          <label for="estado" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">Estado</label>
          <input id="estado" v-model="form.estado" type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]" />
        </div>
        <div class="sm:col-span-1">
          <label for="colonia" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">Colonia</label>
          <input id="colonia" v-model="form.colonia" type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]" />
        </div>
        <div class="sm:col-span-1">
          <label for="cp" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">C.P.</label>
          <input id="cp" v-model="form.cp" type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]" />
        </div>
      </div>

      <!-- Calle y números -->
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 mt-4">
        <div class="sm:col-span-1">
          <label for="calle" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">Calle</label>
          <input id="calle" v-model="form.calle" type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]" />
        </div>
        <div class="sm:col-span-1">
          <label for="numero_exterior" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">Núm. exterior</label>
          <input id="numero_exterior" v-model="form.numero_exterior" type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]" />
        </div>
        <div class="sm:col-span-1">
          <label for="numero_interior" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">Núm. interior</label>
          <input id="numero_interior" v-model="form.numero_interior" type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]" />
        </div>
      </div>

      <!-- Datos fiscales -->
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 mt-4">
        <div class="sm:col-span-1">
          <label for="rfc" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">RFC</label>
          <input id="rfc" v-model="form.rfc" type="text" required
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]" />
        </div>
        <div class="sm:col-span-1">
          <label for="banco" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">Banco</label>
          <input id="banco" v-model="form.banco" type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]" />
        </div>
        <div class="sm:col-span-1">
          <label for="cuenta_bancaria" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">Cuenta bancaria</label>
          <input id="cuenta_bancaria" v-model="form.cuenta_bancaria" type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]" />
        </div>
        <div class="sm:col-span-1">
          <label for="clabe" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">CLABE</label>
          <input id="clabe" v-model="form.clabe" type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]" />
        </div>
        <div class="sm:col-span-1">
          <label for="beneficiario" class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">Beneficiario</label>
          <input id="beneficiario" v-model="form.beneficiario" type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]" />
        </div>
      </div>

      <!-- Botón -->
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="submit"
          class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br
                 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5">
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"

const router = useRouter()

const form = reactive({
  nombre: "",
  ejecutivo_ventas: "",
  correo: "",
  categoria: "",
  telefono: "",
  estado: "",
  colonia: "",
  cp: "",
  calle: "",
  numero_exterior: "",
  numero_interior: "",
  rfc: "",
  banco: "",
  cuenta_bancaria: "",
  clabe: "",
  beneficiario: ""
})

const guardarProveedor = async () => {
  try {
    const res = await axios.post("http://localhost:3000/api/proveedor/insertar", form)
    console.log("Proveedor insertado:", res.data)
    alert("Proveedor agregado correctamente")
    router.push("/proveedores")
  } catch (error) {
    console.error("Error al insertar proveedor:", error)
    alert("Error al insertar proveedor")
  }
}
</script>
