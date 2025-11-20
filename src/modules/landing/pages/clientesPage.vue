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
    <div class="w-full mt-8 mx-20 bg-white p-8 rounded-lg shadow-md">

      <!-- Título + Botón Agregar Cliente -->
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold font-[Inter]">Clientes</h2>
        <div id="alert-container" class="position-fixed top-0 end-0 p-3" style="z-index: 1055;"></div>
        <router-link to="/AgregarCliente" class="btn btn-active btn-success">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
        <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
        </svg>

        </router-link>

      </div>

      <!-- Tabla de clientes -->
      <TablaComponent
        :encabezado="['Núm. de cliente', 'N. de la empresa', 'Impresión','Razón social', 'RFC', 'Email', 'Teléfono','Régimen fiscal', 'CFDI','Estado', 'Colonia','C.p.','Calle','Núm. exterior','Núm. interior']"
        :claves="['num_cliente','nombre_empresa','impresion','razon_social','rfc','email','telefono','regimen','cfdi','estado','colonia','cp','calle','num_ext','num_int']"
        :info="clientes"
        @eliminar="borrarCliente"
        @editar="editarCliente"
      />
    </div>
  </div>
</template>

<script setup>
import TablaComponent from '@/components/TablaComponent.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'


const clientes = ref([])

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

const obtenerClientes = async () => {
  const options = {
    method: 'GET',
    url: 'http://localhost:3000/api/buscarTabla/clientes',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const response = await axios.request(options)
    console.log(response.data)
    clientes.value = response.data
  } catch (error) {
    console.error('Error al obtener clientes:', error)
    clientes.value = []
  }
}


const borrarCliente = async (num_cliente) => {
  console.log('Eliminando cliente:', num_cliente)
  const options = {
    method: 'DELETE',
    url: `http://localhost:3000/api/clientes/borrar/${num_cliente}`,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    await axios.request(options)
    console.log(`Cliente con num_cliente ${num_cliente} eliminado`)
    mostrarAlerta('success', 'Cliente eliminado correctamente')
    obtenerClientes()
  } catch (error) {
    console.error('Error al eliminar cliente:', error)
    mostrarAlerta('danger', 'Error al eliminar cliente')
  }
}

const router = useRouter()

const editarCliente = (cliente) => {
  router.push({ name: 'EditarCliente', params: { id: cliente.num_cliente } })
}

obtenerClientes()

</script>

