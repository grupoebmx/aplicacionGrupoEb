<template>
   <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75
             0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75
             0 0 0-1.06 1.06L6.97 11.03a.75.75
             0 0 0 1.079-.02l3.992-4.99a.75.75
             0 0 0-.01-1.05z"/>
  </symbol>
  <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1
             4.705c-.07.34.029.533.304.533.194 0
             .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703
             0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381
             2.29-.287zM8 5.5a1 1 0 1 1 0-2
             1 1 0 0 1 0 2z"/>
  </symbol>
  <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13
             0 0 0-1.96 0L.165 13.233c-.457.778.091
             1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982
             1.566zM8 5c.535 0 .954.462.9.995l-.35
             3.507a.552.552 0 0 1-1.1
             0L7.1 5.995A.905.905 0 0 1 8
             5zm.002 6a1 1 0 1 1 0
             2 1 1 0 0 1 0-2z"/>
  </symbol>
</svg>
  <div class="flex items-start justify-center min-h-screen bg-gray-100 p-4">
    <form
      class="w-full mt-8 mx-20 bg-white p-8 rounded-lg shadow-md"
      @submit.prevent="insertarCliente"
    >
      <!-- Título -->
      <div class="flex justify-center w-full mb-6">
        <h1 class="text-5xl font-bold text-gray-800 text-center font-[Inter]">
          Agregar cliente
        </h1>
        <div id="alert-container" class="position-fixed top-0 end-0 p-3" style="z-index: 1055;"></div>
      </div>

      <!-- Primera fila -->
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
        <div class="sm:col-span-1">
          <label class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Nombre de la empresa
          </label>
          <input
            v-model="form.nombreEmpresa"
            type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          />
        </div>

        <div class="sm:col-span-1">
          <label class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Impresión
          </label>
          <input
            v-model="form.impresion"
            type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          />
        </div>
      </div>

      <!-- Segunda fila -->
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 mt-4">
        <div class="sm:col-span-1">
          <label class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Correo electrónico
          </label>
          <input
            v-model="form.email"
            type="email"
            maxlength="50"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          />
        </div>

        <div class="sm:col-span-1">
          <label class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Teléfono
          </label>
          <input
            v-model="form.telefono"
            type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          />
        </div>
      </div>

      <!-- Datos fiscales -->
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 mt-4">
        <div class="sm:col-span-1">
          <label class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Razón social
          </label>
          <input
            v-model="form.razonSocial"
            type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          />
        </div>

        <div class="sm:col-span-1">
          <label class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            RFC
          </label>
          <input
            v-model="form.rfc"
            type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          />
        </div>


        <div class="sm:col-span-1">
          <label class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Régimen fiscal
          </label>
          <select
            v-model="form.regimen"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          >
            <option value="">Selecciona un régimen</option>
            <option value="605-Sueldos y Salarios e Ingresos Asimilados a Salarios">Sueldos y Salarios e Ingresos Asimilados a Salarios</option>
            <option value="606-Arrendamiento">Arrendamiento</option>
            <option value="607-Enajenación o Adquisición de Bienes">Enajenación o Adquisición de Bienes</option>
            <option value="608-Demás Ingresos">Demás Ingresos</option>
            <option value="612-Actividades Empresariales y Profesionales">Actividades Empresariales y Profesionales</option>
            <option value="614-Ingresos por Intereses">Ingresos por Intereses</option>
            <option value="616-Sin Obligaciones Fiscales">Sin Obligaciones Fiscales</option>
            <option value="621-Incorporación Fiscal">Incorporación Fiscal</option>
            <option value="622-Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras">Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras</option>
            <option value="623-Opcional para Grupos de Sociedades">Opcional para Grupos de Sociedades</option>
            <option value="624-Coordinados">Coordinados</option>
            <option value="625-Actividades con Ingresos por Plataformas Tecnológicas">Actividades con Ingresos por Plataformas Tecnológicas</option>
            <option value="601-Ley general de personas morales">Ley general de personas morales</option>
            <option value="603-Personas Morales con Fines no Lucrativos">Personas Morales con Fines no Lucrativos</option>
          </select>
        </div>

        <!-- CFDI con value combinado -->
        <div class="sm:col-span-1">
          <label class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            CFDI
          </label>
          <select
            v-model="form.cfdi"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
          >
            <option value="">Selecciona un CFDI</option>
            <option value="G01-Adquisición de mercancias">Adquisición de mercancias</option>
            <option value="G03-Gastos en general">Gastos en general</option>
            <option value="S01-Sin efectos fiscales">Sin efectos fiscales</option>
          </select>
        </div>
      </div>

      <!-- Dirección -->
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 mt-4">
        <div class="sm:col-span-1">
          <label class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Estado
          </label>
          <input v-model="form.estado" type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]" />
        </div>

        <div class="sm:col-span-1">
          <label class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Colonia
          </label>
          <input v-model="form.colonia" type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]" />
        </div>

        <div class="sm:col-span-1">
          <label class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            C.p.
          </label>
          <input v-model="form.cp" type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]" />
        </div>
      </div>

      <!-- Calle -->
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 mt-4">
        <div class="sm:col-span-1">
          <label class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Calle
          </label>
          <input v-model="form.calle" type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]" />
        </div>

        <div class="sm:col-span-1">
          <label class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Núm. exterior
          </label>
          <input v-model="form.numeroExterior" type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]" />
        </div>

        <div class="sm:col-span-1">
          <label class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
            Núm. interior
          </label>
          <input v-model="form.numeroInterior" type="text"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]" />
        </div>
      </div>

      <!-- Botón -->
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button
          class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          type="submit"
        >
          Insertar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'


const router = useRouter()

const form = reactive({
  nombreEmpresa: '',
  impresion: '',
  razonSocial: '',
  rfc: '',
  email: '',
  telefono: '',
  regimen: '',
  cfdi: '',
  estado: '',
  colonia: '',
  cp: '',
  calle: '',
  numeroExterior: '',
  numeroInterior: ''
})

function mostrarAlerta(tipo, mensaje) {
  const alertContainer = document.getElementById('alert-container');
  const icono = {
    success: '#check-circle-fill',
    danger: '#exclamation-triangle-fill',
    warning: '#exclamation-triangle-fill',
    primary: '#info-fill'
  }[tipo] || '#info-fill';

  const alerta = document.createElement('div');
  alerta.className = `alert alert-${tipo} d-flex align-items-center fade show shadow-sm`;
  alerta.setAttribute('role', 'alert');
  alerta.innerHTML = `
    <svg class="bi flex-shrink-0 me-2" width="24" height="24">
      <use xlink:href="${icono}"></use>
    </svg>
    <div>${mensaje}</div>
  `;

  alertContainer.appendChild(alerta);


  setTimeout(() => {
    alerta.classList.remove('show');
    alerta.classList.add('fade');
    setTimeout(() => alerta.remove(), 500);
  }, 3000);
}

const insertarCliente = async () => {
  try {
    const response = await axios.post('https://backendgrupoeb.onrender.com/api/clientes/insertar', form)
    console.log(response.data)
    Object.keys(form).forEach(key => form[key] = '')
    mostrarAlerta('success', 'Cliente insertado correctamente')
    setTimeout(() => {
      router.push('/clientes')
    }, 1000)
  } catch (error) {
    console.error('Error al insertar cliente', error)
    mostrarAlerta('danger', 'Error al insertar cliente')
  }
}
</script>

