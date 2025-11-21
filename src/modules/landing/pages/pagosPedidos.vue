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
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold font-[Inter]">Pagos</h2>
        <div id="alert-container" class="position-fixed top-0 end-0 p-3" style="z-index: 1055;"></div>
      </div>


      <form class="flex gap-6" @submit.prevent="guardarPago">

        <!-- Fieldset del formulario de pago -->
        <fieldset class="bg-gray-100 rounded-lg shadow-md w-1/2 p-4 border border-gray-300">
          <legend class="fieldset-legend text-lg font-semibold">Detalles del pago</legend>

          <!-- Primera línea: Fecha -->
          <div class="mb-3">
            <div class="table-cell p-1 border border-gray-300 rounded w-49">
              <label for="fecha" class="block text-sm font-medium text-gray-700">Fecha</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                :value="fechaActual"
                readonly
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm"
              />
            </div>
          </div>

          <!-- Segunda línea: Campos en grid -->
          <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <!-- Pedido -->
            <div>
              <label class="block text-sm font-medium text-gray-700">No. Pedido</label>
              <select
                v-model="pedidoSeleccionado"
                class="mt-1 w-full border border-gray-300 bg-white rounded-md p-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option disabled value="">Selecciona un pedido</option>
                <option v-for="p in pedidosPendientes" :key="p.no_pedido" :value="p.no_pedido">
                  {{ p.no_pedido }}
                </option>
              </select>
            </div>

            <!-- Monto -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Monto</label>
              <input
                type="number"
                step="0.01"
                min="0"
                v-model.number="montoPago"
                class="mt-1 w-full border border-gray-300 bg-white rounded-md p-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej. 2500.00"
                required
              />
            </div>

            <!-- Método de Pago -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Método de Pago</label>
              <select v-model="metodoPago"
                class="mt-1 w-full border border-gray-300 bg-white rounded-md p-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option disabled value="">Selecciona una opción</option>
                <option>Transferencia</option>
                <option>Efectivo</option>
                <option>Tarjeta</option>
                <option>Cheque</option>
                <option>Otro</option>
              </select>
            </div>

            <!-- Forma de Pago -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Forma de Pago</label>
              <select
                class="mt-1 w-full border border-gray-300 bg-white rounded-md p-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                v-model="formaPago"
              >
                <option disabled value="">Selecciona una opción</option>
                <option>Anticipo</option>
                <option>Abono</option>
                <option>Liquidación</option>
              </select>
            </div>
          </div>

          <!-- Botón Guardar -->
          <div class="flex justify-end mt-6">
            <button
              type="submit"
              class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-lime-300 font-medium rounded-md text-xs px-3 py-1.5 text-center"
            >
              Guardar Pago
            </button>
          </div>
        </fieldset>

                <!-- Fieldset del estado de cuenta -->
      <fieldset class="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg w-full max-w-2xl p-6 border border-blue-200">
  <legend class="fieldset-legend text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md">
    Estado de Cuenta
  </legend>

  <div v-if="estadoCuenta" class="space-y-4">

    <!-- Badge de advertencia si NO hay productos en almacén -->
    <div v-if="!estadoCuenta.puede_generar_pdf"
         class="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
      <div class="flex items-start">
        <svg class="w-5 h-5 text-yellow-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <div>
          <p class="text-sm font-medium text-yellow-800">Productos aún no disponibles en almacén</p>
          <p class="text-xs text-yellow-600 mt-1">
            Puedes registrar pagos anticipados. El estado de cuenta (PDF) estará disponible cuando los productos estén en almacén.
          </p>
        </div>
      </div>
    </div>

    <!-- Badge informativo si HAY recálculo -->
    <div v-else-if="estadoCuenta.total_original && Math.abs(Number(estadoCuenta.total_original) - Number(estadoCuenta.total)) > 0.01"
         class="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
      <div class="flex items-start">
        <svg class="w-5 h-5 text-blue-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <p class="text-sm font-medium text-blue-800">Totales recalculados</p>
          <p class="text-xs text-blue-600 mt-1">
            Los montos reflejan la cantidad real en almacén ({{ estadoCuenta.productos.reduce((sum, p) => sum + Number(p.cantidad_almacen || 0), 0) }} unidades producidas)
          </p>
        </div>
      </div>
    </div>

    <!-- Badge de éxito si HAY productos y no hay cambios -->
    <div v-else-if="estadoCuenta.puede_generar_pdf"
         class="bg-green-50 border-l-4 border-green-400 p-3 rounded-r-lg">
      <div class="flex items-start">
        <svg class="w-5 h-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <p class="text-sm font-medium text-green-800">Productos disponibles en almacén</p>
          <p class="text-xs text-green-600 mt-1">
            El estado de cuenta está listo para descargar ({{ estadoCuenta.productos.reduce((sum, p) => sum + Number(p.cantidad_almacen || 0), 0) }} unidades)
          </p>
        </div>
      </div>
    </div>

    <!-- Tarjeta unificada de información del pedido -->
    <div class="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-500">
      <h4 class="font-bold text-lg text-gray-800 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        Información del Pedido
      </h4>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p class="text-sm text-gray-500 font-medium">No. Pedido</p>
          <p class="text-lg font-bold text-gray-800">{{ estadoCuenta.no_pedido }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Empresa</p>
          <p class="text-lg font-semibold text-gray-800">{{ estadoCuenta.nombre_empresa }}</p>
        </div>
      </div>

      <!-- Mostrar comparativa si hay recálculo -->
      <div v-if="estadoCuenta.puede_generar_pdf && estadoCuenta.total_original && Math.abs(Number(estadoCuenta.total_original) - Number(estadoCuenta.total)) > 0.01"
           class="mb-4 p-3 bg-blue-50 rounded-lg">
        <p class="text-xs text-gray-600 mb-2 font-medium">Comparativa:</p>
        <div class="grid grid-cols-3 gap-2 text-xs">
          <div>
            <p class="text-gray-500">Pedido original</p>
            <p class="font-semibold text-gray-700">{{ formatoMoneda(estadoCuenta.total_original) }}</p>
          </div>
          <div>
            <p class="text-gray-500">Total actual</p>
            <p class="font-semibold text-blue-700">{{ formatoMoneda(estadoCuenta.total) }}</p>
          </div>
          <div>
            <p class="text-gray-500">Diferencia</p>
            <p :class="Number(estadoCuenta.total) > Number(estadoCuenta.total_original) ? 'text-orange-600' : 'text-green-600'"
               class="font-semibold">
              {{ formatoMoneda(Math.abs(Number(estadoCuenta.total) - Number(estadoCuenta.total_original))) }}
              {{ Number(estadoCuenta.total) > Number(estadoCuenta.total_original) ? '↑' : '↓' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Total, Pagado y Saldo en una línea -->
      <div class="grid grid-cols-3 gap-4 mb-4">
        <div class="text-center p-3 bg-gray-50 rounded-lg">
          <p class="text-sm text-gray-500 font-medium mb-1">Total</p>
          <p class="text-xl font-bold text-gray-800">{{ formatoMoneda(estadoCuenta.total) }}</p>
          <p v-if="!estadoCuenta.puede_generar_pdf" class="text-xs text-gray-400 mt-1">(Pedido original)</p>
        </div>
        <div class="text-center p-3 bg-green-50 rounded-lg">
          <p class="text-sm text-gray-500 font-medium mb-1">Pagado</p>
          <p class="text-xl font-bold text-green-600">{{ formatoMoneda(estadoCuenta.pagado) }}</p>
        </div>
        <div class="text-center p-3 bg-orange-50 rounded-lg">
          <p class="text-sm text-gray-500 font-medium mb-1">Saldo Pendiente</p>
          <p class="text-xl font-bold text-orange-600">{{ formatoMoneda(estadoCuenta.saldo_pendiente) }}</p>
        </div>
      </div>

      <!-- Barra de progreso -->
      <div class="mt-4">
        <div class="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progreso de pago</span>
          <span>{{ Math.min(Math.round((estadoCuenta.pagado / estadoCuenta.total) * 100), 100) }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div class="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full transition-all duration-500"
               :style="{ width: `${Math.min((estadoCuenta.pagado / estadoCuenta.total) * 100, 100)}%` }"></div>
        </div>
      </div>
    </div>

    <!-- Sección de pagos realizados -->
    <div class="bg-white rounded-xl shadow-sm p-5">
      <h4 class="font-bold text-lg text-gray-800 mb-3 flex items-center">
        <svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        Pagos realizados
        <span v-if="estadoCuenta.pagos && estadoCuenta.pagos.length > 0"
              class="ml-2 px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
          {{ estadoCuenta.pagos.length }}
        </span>
      </h4>

      <div v-if="estadoCuenta.pagos && estadoCuenta.pagos.length > 0">
        <div class="space-y-3">
          <div v-for="pago in estadoCuenta.pagos" :key="pago.id_pago"
               class="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100 hover:bg-green-100 transition-colors duration-200">
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-800">{{ new Date(pago.fecha_pago).toLocaleDateString('es-MX') }}</p>
                <p class="text-sm text-gray-600">{{ pago.metodo_pago }} • {{ pago.forma_pago }}</p>
              </div>
            </div>
            <span class="font-bold text-green-700">{{ formatoMoneda(pago.monto) }}</span>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-6">
        <div class="w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
          </svg>
        </div>
        <p class="text-gray-500 text-sm italic">No se han registrado pagos para este pedido.</p>
        <p class="text-gray-400 text-xs mt-1">Los pagos aparecerán aquí una vez registrados.</p>
      </div>

      <!-- Botones de descarga -->
<div class="flex justify-center gap-4 mt-6">
  <!-- Botón Estado de Cuenta -->
  <div>
    <button
      v-if="estadoCuenta.puede_generar_pdf"
      @click="generarPDFEstadoCuenta"
      class="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      Estado de Cuenta
    </button>
    <div v-else class="text-center">
      <button
        disabled
        class="flex items-center justify-center gap-2 bg-gray-300 text-gray-500 font-medium py-2 px-4 rounded-lg shadow-sm cursor-not-allowed"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
        PDF no disponible
      </button>
      <p class="text-xs text-gray-500 mt-2">Disponible con productos en almacén</p>
    </div>
  </div>

  <!-- Botón Factura/Remisión -->
  <div>
    <button
      v-if="estadoCuenta.puede_generar_pdf && datosFacturacion"
      @click="generarRemisionPDF"
      class="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      Descargar Remisión electronica
    </button>
    <div v-else class="text-center">
      <button
        disabled
        class="flex items-center justify-center gap-2 bg-gray-300 text-gray-500 font-medium py-2 px-4 rounded-lg shadow-sm cursor-not-allowed"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        Factura no disponible
      </button>
      <p class="text-xs text-gray-500 mt-2">Complete datos de facturación</p>
    </div>
  </div>
</div>
    </div>
  </div>

  <!-- Mostrar solo cuando NO se ha seleccionado ningún pedido -->
  <div v-else class="text-center py-12">
    <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
      <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    </div>
    <p class="text-gray-700 font-medium mb-2">Selecciona un pedido</p>
    <p class="text-gray-500 text-sm">Elige un pedido de la lista para ver su estado de cuenta y pagos realizados.</p>
  </div>
</fieldset>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import jsPDF from 'jspdf'

const fechaActual = new Date().toISOString().substring(0, 10)
const pedidosPendientes = ref([])
const pedidoSeleccionado = ref('')
const montoPago = ref(0);
const metodoPago = ref('');
const formaPago = ref('');
const datosFacturacion = ref(null);

const estadoCuenta = ref(null)

const formatoMoneda = (valor) => {
  // Validar que el valor sea válido
  if (valor === null || valor === undefined || valor === '' || isNaN(valor)) {
    return '$0.00'
  }

  const numero = Number(valor)

  if (isNaN(numero)) {
    return '$0.00'
  }

  return numero.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

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

async function cargarPedidosPendientes() {
  try {
    const { data } = await axios.get('https://backendgrupoeb.onrender.com/api/pedidos-pendientes');
    pedidosPendientes.value = data;
  } catch (error) {
    console.error('❌ Error al cargar pedidos pendientes:', error);
  }
}

watch(pedidoSeleccionado, async (nuevoPedido) => {

  if (!nuevoPedido || nuevoPedido === '' || nuevoPedido === 'undefined') {
    estadoCuenta.value = null
    datosFacturacion.value = null
    return
  }

  try {
    // 1. Cargar estado de cuenta
    const { data } = await axios.get(`https://backendgrupoeb.onrender.com/api/pedido-estado/${nuevoPedido}`)
    estadoCuenta.value = data
    console.log('📊 Estado de cuenta:', data)

    // 2. Solo cargar facturación si hay productos en almacén
    if (data.puede_generar_pdf) {
      const datosFactura = await cargarDatosFacturacion(nuevoPedido)

      if (datosFactura) {
        mostrarAlerta('success', 'Datos de facturación cargados correctamente')
      }

      // Verificar si hay recálculo
      if (data.total_original && Math.abs(Number(data.total_original) - Number(data.total)) > 0.01) {
        mostrarAlerta('primary',
          'Los totales se han recalculado con base en los productos en almacén.'
        )
      }
    } else {
      // Si NO hay productos en almacén, limpiar datos de facturación
      datosFacturacion.value = null
      mostrarAlerta('primary',
        'Este pedido aún no tiene productos en almacén. Puedes registrar pagos anticipados.'
      )
    }

  } catch (error) {
    console.error('❌ Error al obtener estado de cuenta:', error)
    estadoCuenta.value = null
    datosFacturacion.value = null
    mostrarAlerta('danger', 'Error al obtener estado de cuenta')
  }
})

async function cargarDatosFacturacion(nuevoPedido) {

  if (!nuevoPedido || nuevoPedido === '' || nuevoPedido === 'undefined') {
    console.log('⚠️ No hay pedido seleccionado');
    return null;
  }

  try {
    const { data } = await axios.get(`https://backendgrupoeb.onrender.com/api/remision/${nuevoPedido}`);
    datosFacturacion.value = data;
    console.log('📄 Datos de facturación:', data);
    return data;
  } catch (error) {
    console.error("❌ Error al obtener datos de facturación:", error);


    if (error.response?.status === 404) {
      console.log(' No hay datos de facturación para este pedido');
      datosFacturacion.value = null;
      return null;
    }

    // Para otros errores, mostrar alerta
    mostrarAlerta('warning', 'No se pudo obtener los datos de facturación.');
    datosFacturacion.value = null;
    return null;
  }
}

async function guardarPago() {
  try {
    if (!pedidoSeleccionado.value) {
      mostrarAlerta('warning', 'Selecciona un pedido');
      return;
    }

    if (!montoPago.value || montoPago.value <= 0) {
      mostrarAlerta('warning', 'Ingresa un monto válido');
      return;
    }

    if (!metodoPago.value || !formaPago.value) {
      mostrarAlerta('warning', 'Completa todos los campos');
      return;
    }

    // Validación flexible según el estado
    if (estadoCuenta.value) {
      // Si hay estado de cuenta (con o sin productos en almacén)
      const saldoDisponible = Number(estadoCuenta.value.saldo_pendiente);
      const montoAPagar = Number(montoPago.value);

      if (montoAPagar > saldoDisponible) {
        mostrarAlerta('warning',
          `El monto ($${montoAPagar.toFixed(2)}) excede el saldo pendiente ($${saldoDisponible.toFixed(2)})`
        );
        return;
      }
    } else {

      const pedido = pedidosPendientes.value.find(p => p.no_pedido === pedidoSeleccionado.value);

      if (pedido) {
        const saldoDisponible = Number(pedido.saldo_pendiente);
        const montoAPagar = Number(montoPago.value);

        if (montoAPagar > saldoDisponible) {
          mostrarAlerta('warning',
            `El monto ($${montoAPagar.toFixed(2)}) excede el saldo pendiente ($${saldoDisponible.toFixed(2)})`
          );
          return;
        }
      }
    }

    // Preparar payload
    const payload = {
      no_pedido: pedidoSeleccionado.value,
      fecha_pago: fechaActual,
      monto: montoPago.value,
      metodo_pago: metodoPago.value,
      forma_pago: formaPago.value
    };

    // Enviar pago
    const response = await axios.post('https://backendgrupoeb.onrender.com/api/pagos', payload);

    // Mostrar mensaje según si hay productos en almacén o no
    if (response.data.tiene_productos_almacen) {
      mostrarAlerta('success', 'Pago registrado correctamente (calculado con productos en almacén)');
    } else {
      mostrarAlerta('success', 'Pago anticipado registrado correctamente');
    }

    // Recargar datos
    await cargarPedidosPendientes();

    // Intentar recargar estado de cuenta
    try {
      const { data } = await axios.get(`https://backendgrupoeb.onrender.com/api/pedido-estado/${pedidoSeleccionado.value}`);
      estadoCuenta.value = data;
    } catch (error) {
      // Si falla, limpiar estado de cuenta
      console.error('Error al recargar estado de cuenta después del pago:', error);
      estadoCuenta.value = null;
    }

    // Resetear formulario
    montoPago.value = 0;
    metodoPago.value = '';
    formaPago.value = '';

  } catch (error) {
    console.error('Error al guardar pago:', error);

    if (error.response && error.response.data && error.response.data.message) {
      mostrarAlerta('danger', error.response.data.message);
    } else {
      mostrarAlerta('danger', 'Error al guardar pago');
    }
  }
}



const generarEstadoCuentaPDF = (datosEstadoCuenta) => {
  try {
    // Configurar para tamaño carta vertical
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'letter',
    })

    let yPosition = 40

    // --- LOGO ---
    const img = new Image()
    img.src = '/imagen/logo.jpg'

    // Manejar la carga asíncrona de la imagen
    img.onload = function () {
      doc.addImage(img, 'JPEG', 12, 10, 30, 20)
      continuarGeneracionEstadoCuenta(doc, yPosition, img, datosEstadoCuenta)
    }

    img.onerror = function () {
      console.warn('No se pudo cargar el logo, continuando sin imagen...')
      continuarGeneracionEstadoCuenta(doc, yPosition, null, datosEstadoCuenta)
    }
  } catch (error) {
    console.error('Error al generar Estado de Cuenta PDF:', error)
    mostrarAlerta('danger', 'Error al generar el Estado de Cuenta: ' + error.message)
  }
}

const continuarGeneracionEstadoCuenta = (doc, yPosition, img, datos) => {
  try {
    // --- ENCABEZADO ---
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text('ESTADO DE CUENTA', 105, 25, { align: 'center' })

    // Nombre del cliente (más abajo)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Cliente:', 12, 45)
    doc.setFont('helvetica', 'normal')
    const nombreCliente = String(datos.nombre_empresa || '')
    doc.text(nombreCliente, 30, 45)

    // Fecha (más abajo)
    doc.setFont('helvetica', 'bold')
    doc.text('Fecha:', 160, 45)
    doc.setFont('helvetica', 'normal')
    const hoy = new Date()
    const fecha = hoy.toLocaleDateString('es-MX')
    doc.text(fecha, 175, 45)

    yPosition = 55

    // --- DESCRIPCIÓN ---
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('A continuación le informo como quedó su estado de cuenta con nosotros:', 12, yPosition)

    yPosition += 10

    // --- TABLA DE PRODUCTOS CON FORMATO AMPLIADO ---
    const headers = ['Medida', 'Cantidad', 'Producto', 'Precio Unitario', 'Importe']
    const widths = [25, 20, 80, 30, 35] // Total: 190mm
    const tableX = 10
    const tableY = yPosition

    // Encabezado de la tabla
    let x = tableX
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')

    headers.forEach((h, i) => {
      doc.rect(x, tableY, widths[i], 7)
      doc.text(h, x + 2, tableY + 4)
      x += widths[i]
    })

    // Filas de productos
    let yFila = tableY + 7
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)

   if (datos.productos && datos.productos.length > 0) {
  datos.productos.forEach((producto) => {
    x = tableX

    // Dibujar celdas
    widths.forEach((w) => {
      doc.rect(x, yFila, w, 7)
      x += w
    })

    // Llenar datos
    x = tableX

    // Medida
    const medidas = `${producto.ancho_int || ''}x${producto.largo_int || ''}${producto.alto_int ? 'x' + producto.alto_int : ''}`
    doc.text(medidas, x + 2, yFila + 4)
    x += widths[0]

    // Cantidad de ALMACÉN
    const cantidad = String(producto.cantidad_almacen || '0')
    doc.text(cantidad, x + 2, yFila + 4)
    x += widths[1]

    // Producto
    const productoNombre = String(producto.producto || '')
    doc.text(productoNombre, x + 2, yFila + 4)
    x += widths[2]

    // Precio Unitario
    const precioUnitario = Number(producto.precio_unitario) || 0
    doc.text(formatoMoneda(precioUnitario), x + 2, yFila + 4)
    x += widths[3]

    // Importe RECALCULADO
    const importeTotal = formatoMoneda(Number(producto.importe_recalculado) || 0)
    doc.text(importeTotal, x + 2, yFila + 4)

    yFila += 7
  })
}

    // --- TOTALES PEGADOS DEBAJO (como en la imagen) ---
    yFila += 3 // Espacio mínimo

    // Fila Sub-Total
    x = tableX
    // Saltar las primeras 3 columnas
    x += widths[0] + widths[1] + widths[2]

    doc.rect(x, yFila, widths[3], 7)
    doc.rect(x + widths[3], yFila, widths[4], 7)

    doc.setFont('helvetica', 'bold')
    doc.text('Sub-Total', x + 2, yFila + 4)
    doc.text(formatoMoneda(Number(datos.subtotal) || 0), x + widths[3] + 2, yFila + 4)
    yFila += 7

    // Fila I.V.A.
    x = tableX + widths[0] + widths[1] + widths[2]
    doc.rect(x, yFila, widths[3], 7)
    doc.rect(x + widths[3], yFila, widths[4], 7)

    doc.text('I.V.A.', x + 2, yFila + 4)
    doc.text(formatoMoneda(Number(datos.iva) || 0), x + widths[3] + 2, yFila + 4)
    yFila += 7

    // Fila Total
    x = tableX + widths[0] + widths[1] + widths[2]
    doc.rect(x, yFila, widths[3], 7)
    doc.rect(x + widths[3], yFila, widths[4], 7)

    doc.text('Total', x + 2, yFila + 4)
    doc.text(formatoMoneda(Number(datos.total) || 0), x + widths[3] + 2, yFila + 4)
    yFila += 7

    // Fila Anticipo
    x = tableX + widths[0] + widths[1] + widths[2]
    doc.rect(x, yFila, widths[3], 7)
    doc.rect(x + widths[3], yFila, widths[4], 7)

    doc.text('Anticipo', x + 2, yFila + 4)
    doc.text(formatoMoneda(Number(datos.pagado) || 0), x + widths[3] + 2, yFila + 4)
    yFila += 7

    // Fila Saldo (RESALTADA)
    x = tableX + widths[0] + widths[1] + widths[2]
    doc.rect(x, yFila, widths[3], 7)
    doc.rect(x + widths[3], yFila, widths[4], 7)

    // Resaltar el saldo
    doc.setFillColor(255, 240, 240) // Fondo rojo claro
    doc.rect(x, yFila, widths[3] + widths[4], 7, 'F')
    doc.rect(x, yFila, widths[3], 7)
    doc.rect(x + widths[3], yFila, widths[4], 7)

    doc.setFont('helvetica', 'bold')
    doc.setTextColor(200, 0, 0) // Texto rojo
    doc.text('Saldo', x + 2, yFila + 4)
    doc.text(formatoMoneda(Number(datos.saldo_pendiente) || 0), x + widths[3] + 2, yFila + 4)

    // Restaurar color
    doc.setTextColor(0, 0, 0)

    yPosition = yFila + 15

    // --- TABLA DE PAGOS (MISMO ANCHO QUE PRODUCTOS) ---
    if (datos.pagos && datos.pagos.length > 0) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text('Historial de Pagos:', 12, yPosition)

      yPosition += 7

      // Usar el mismo ancho total que la tabla de productos (190mm)
      const pagosHeaders = ['Fecha Pago', 'Monto', 'Método Pago', 'Forma Pago']
      const pagosWidths = [40, 30, 80, 40] // Total: 190mm
      const pagosX = 10
      const pagosY = yPosition

      // Encabezado pagos
      x = pagosX
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')

      pagosHeaders.forEach((h, i) => {
        doc.rect(x, pagosY, pagosWidths[i], 6)
        doc.text(h, x + 2, pagosY + 3.5)
        x += pagosWidths[i]
      })

      // Filas de pagos
      let yPagosFila = pagosY + 6
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)

      datos.pagos.forEach((pago) => {
        x = pagosX

        // Dibujar celdas
        pagosWidths.forEach((w) => {
          doc.rect(x, yPagosFila, w, 6)
          x += w
        })

        // Llenar datos
        x = pagosX

        // Fecha Pago
        const fechaPago = pago.fecha_pago ? new Date(pago.fecha_pago).toLocaleDateString('es-MX') : ''
        doc.text(fechaPago, x + 2, yPagosFila + 3.5)
        x += pagosWidths[0]

        // Monto
        const monto = formatoMoneda(Number(pago.monto) || 0)
        doc.text(monto, x + 2, yPagosFila + 3.5)
        x += pagosWidths[1]

        // Método Pago
        doc.text(String(pago.metodo_pago || ''), x + 2, yPagosFila + 3.5)
        x += pagosWidths[2]

        // Forma Pago
        doc.text(String(pago.forma_pago || ''), x + 2, yPagosFila + 3.5)

        yPagosFila += 6
      })

      yPosition = yPagosFila + 3
    }


    const infoDepositoY = yPosition + 2


doc.setFont('helvetica', 'normal')
doc.setFontSize(10)


// Información organizada en líneas separadas
const depositoLines = [
    'Favor de depositar en Banamex.',
    'CTA # 70010708964.',
    'CLABE 002320700107089643.',
    'Grupeb S.A. de C.V.',
    'RFC: GRU110202DS5',
    'Favor de enviar comprobante vía:',
    'correo: ventas3@grupoeb.com.mx',
    'o whatsapp: 33 3954 0924'
]

// Añadir cada línea con espaciado
let currentY = infoDepositoY
depositoLines.forEach(line => {
    doc.text(line, 12, currentY)
    currentY += 5
})

// Espacio entre la info del depósito y "Estoy a sus órdenes"
const infoContactoY = infoDepositoY + (depositoLines.length * 6) + 10

doc.setFont('helvetica', 'bold')
doc.setFontSize(10)
doc.text('Estoy a sus órdenes para cualquier duda o aclaración.', 105, infoContactoY, { align: 'center' })

// 3 espacios después de "Estoy a sus órdenes"
doc.setFont('helvetica', 'bold')
doc.text('Maria  P.', 105, infoContactoY + 10, { align: 'center' })
doc.setFont('helvetica', 'normal')
doc.text('Departamento de Ventas', 105, infoContactoY + 13, { align: 'center' })

// Mover el resto hasta abajo (posición final del documento)
const finalY = doc.internal.pageSize.height - 20

doc.setFont('helvetica', 'bold')
doc.text('www.grupoeb.com.mx', 105, finalY, { align: 'center' })

doc.setFont('helvetica', 'normal')
doc.text('Rogelio Ledesma # 102   Col. Cruz Vieja   45644   Tlajomulco de Zuñiga , Jalisco. México', 105, finalY + 4, { align: 'center' })
doc.text('Tels. (33) 3180-3373, 3125-9595 , 3180-1460', 105, finalY + 8, { align: 'center' })

doc.setFont('helvetica', 'bold')
doc.text('ventas@grupoeb.com.mx', 105, finalY + 12, { align: 'center' })


    const nombreArchivo = `estado-cuenta-${datos.no_pedido || 'sin-numero'}.pdf`
    doc.save(nombreArchivo)
    mostrarAlerta('success', 'Estado de Cuenta generado correctamente')

  } catch (error) {
    console.error('Error en la generación del Estado de Cuenta:', error)
    mostrarAlerta('danger', 'Error al generar el Estado de Cuenta: ' + error.message)
  }
}

const generarPDFEstadoCuenta = () => {
  if (!estadoCuenta.value) {
    mostrarAlerta('warning', 'No hay estado de cuenta para generar PDF');
    return;
  }

  generarEstadoCuentaPDF(estadoCuenta.value);
}

async function obtenerFolioConsecutivo() {
  try {
    const response = await fetch('https://backendgrupoeb.onrender.com/api/folios/remision');

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log('Respuesta del API:', data); // Para debugging

    // Verificar que existe el folio en la respuesta
    if (!data.folio) {
      console.error('El API no devolvió un folio válido:', data);
      return 'R-000'; // Valor por defecto
    }

    return data.folio;
  } catch (error) {
    console.error('Error al obtener folio:', error);
    // Retornar un folio por defecto en caso de error
    return 'R-000';
  }
}


const generarRemisionPDF = () => {
  try {
    const datosRemision = {
      ...datosFacturacion.value,
      ...estadoCuenta.value
    }

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'letter',
    })

    let yPosition = 40

    const img = new Image()
    img.src = '/imagen/logo.jpg'

    img.onload = function () {
      continuarGeneracionRemision(doc, yPosition, img, datosRemision)
    }

    img.onerror = function () {
      console.warn('No se pudo cargar el logo, continuando sin imagen...')
      continuarGeneracionRemision(doc, yPosition, null, datosRemision)
    }
  } catch (error) {
    console.error('Error al generar Remisión PDF:', error)
    mostrarAlerta('danger', 'Error al generar la Remisión: ' + error.message)
  }
}

const continuarGeneracionRemision = async (doc, yPosition, img, datosRemision) => {



  try {

    const folio = await obtenerFolioConsecutivo();
    // --- LOGO ---
    if (img) {
      doc.addImage(img, 'JPEG', 10, 10, 40, 25)
    }

    // --------------------------------------------
    // BLOQUE CENTRADO ENTRE LOGO Y COLUMNA DERECHA
    // --------------------------------------------
    const bordeDerechoLogo = 10 + 40 // = 50
    const columnaDerechaX = 140
    const centerX = (bordeDerechoLogo + columnaDerechaX) / 2 // = 95

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text('GRUPEB', centerX, 13, { align: 'center' })

    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text('GRU110202DSS', centerX, 20, { align: 'center' })
    doc.text('(601) General de Ley Personas Morales', centerX, 25, { align: 'center' })
    doc.text('31801460, 31803373', centerX, 30, { align: 'center' })
    doc.text('facturas@grupoeb.com.mx', centerX, 35, { align: 'center' })
    doc.text('www.grupoeb.com.mx', centerX, 40, { align: 'center' })

    // --------------------------------------------
    // COLUMNA DERECHA (REMISIÓN)
    // --------------------------------------------
    const rightX = 140

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text('REMISIÓN ELECTRÓNICA', rightX, 15)

    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text(`Folio: ${folio}`, rightX, 22)
    doc.text(`Versión: 4.0`, rightX, 26)
    doc.text(`Tipo de comprobante: (I) Ingreso`, rightX, 30)
    doc.text(`Lugar de expedición: 45644`, rightX, 34)

    yPosition = 63

// Receptor
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text('Receptor', 10, yPosition)

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)

      doc.text(String(datosRemision.razon_social_facturacion || ''), 10, yPosition + 3)
      doc.text(String(datosRemision.rfc_facturacion || ''), 10, yPosition + 6)

      // Domicilio fiscal
      doc.setFont('helvetica', 'bold')
      doc.text('Domicilio fiscal: ', 10, yPosition + 9)

      doc.setFont('helvetica', 'normal')
      doc.text(String(datosRemision.cp_facturacion || ''), 38, yPosition + 9)

      // Régimen fiscal
      doc.setFont('helvetica', 'bold')
      doc.text('Régimen fiscal:', 10, yPosition + 12)

      doc.setFont('helvetica', 'normal')
      doc.text(String(datosRemision.regimen || ''), 10, yPosition + 15)

      // Uso CFDI
      doc.setFont('helvetica', 'bold')
      doc.text('Uso CFDI:', 10, yPosition + 21)

      doc.setFont('helvetica', 'normal')
      doc.text(String(datosRemision.uso_cfdi || ''), 30, yPosition + 21)


// --------------------------------------------
// COLUMNA DERECHA (HIPER-JUNTA)
// --------------------------------------------
      const infoRightX = 60

      // Fecha emisión
      doc.setFont('helvetica', 'bold')
      doc.text('Fecha de Emisión:', infoRightX, yPosition)

      doc.setFont('helvetica', 'normal')
      doc.text(fechaActual, infoRightX + 30, yPosition)

      // Moneda
      doc.setFont('helvetica', 'bold')
      doc.text('Moneda:', infoRightX, yPosition + 3)

      doc.setFont('helvetica', 'normal')
      doc.text('(MXN) Peso Mexicano', infoRightX + 20, yPosition + 3)

      // Tipo de cambio
      doc.setFont('helvetica', 'bold')
      doc.text('Tipo de cambio:', infoRightX, yPosition + 6)

      doc.setFont('helvetica', 'normal')
      doc.text('1', infoRightX + 28, yPosition + 6)

      // Forma de pago
      doc.setFont('helvetica', 'bold')
      doc.text('Forma de pago:', infoRightX, yPosition + 9)

      doc.setFont('helvetica', 'normal')
      doc.text(String(datosRemision.forma_pago || ''), infoRightX + 28, yPosition + 9)

      // Método de pago
      doc.setFont('helvetica', 'bold')
      doc.text('Método de pago:', infoRightX, yPosition + 12)

      doc.setFont('helvetica', 'normal')
      doc.text(String(datosRemision.metodo_pago || ''), infoRightX + 32, yPosition + 12)

      // Exportación
      doc.setFont('helvetica', 'bold')
      doc.text('Exportación:', infoRightX, yPosition + 15)

      doc.setFont('helvetica', 'normal')
      doc.text('(01) No aplica', infoRightX + 24, yPosition + 15)





// --------------------------------------------
// TOTAL DEL CFDI – A LA DERECHA (como tu ejemplo)
// --------------------------------------------
doc.setFont('helvetica', 'bold')
doc.setFontSize(14)
const totalCFDI = formatoMoneda(Number(datosRemision.total) || 0)
doc.text(`Total del CFDI: ${totalCFDI}`, 200, yPosition, { align: 'right' })


    // --------------------------------------------
    // LÍNEA SEPARADORA Y TABLA DE PRODUCTOS
    // --------------------------------------------
    yPosition += 30
    doc.setLineWidth(0.5)
    doc.line(10, yPosition, 200, yPosition)

    yPosition += 8

    doc.setFontSize(7)
    let yFila = yPosition

if (datosRemision.productos && datosRemision.productos.length > 0) {
  datosRemision.productos.forEach((producto, index) => {
    if (index > 0) {
      doc.line(10, yFila, 200, yFila)
      yFila += 5
    }

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)

    // PRIMERA LÍNEA: Producto - Clave + Cantidad, Precio Unitario e Importe
    const descripcion = String(producto.producto || 'Producto sin nombre')
    const clave = String(producto.clave || '')
    const productoConClave = clave ? `${descripcion} - ${clave}` : descripcion
    const cantidad = String(producto.cantidad_almacen || '0')
    const precioUnitario = Number(producto.precio_unitario) || 0
    const importe = Number(producto.importe_recalculado) || 0

    // Producto y clave (izquierda)
    doc.text(productoConClave, 10, yFila)

    // Cantidad, Precio Unitario e Importe (derecha)
    doc.setFontSize(9)
    doc.text(cantidad, 150, yFila, { align: 'right' })
    doc.text(formatoMoneda(precioUnitario), 170, yFila, { align: 'right' })
    doc.text(formatoMoneda(importe), 200, yFila, { align: 'right' })

    yFila += 5

    // SEGUNDA LÍNEA: Detalles del producto (AJUSTADO PARA QUE QUEPAN)
doc.setFontSize(7)
const noIdentificacion = String(datosRemision.numeroidentificacion || 'N/A')
const claveProducto = String(producto.satclaveproductoservicio || '')
const claveUnidad = String(producto.satclaveunidad || '')
const unidad = 'Pieza'
const objetoImp = '(02) Sí objeto de impuesto.'

// Distribuidos en la línea para que quepan
doc.text(`No.ID: ${noIdentificacion}`, 10, yFila)
doc.text(`Clave de producto o servicio: ${claveProducto}`, 45, yFila)
doc.text(`Clave de unidad: ${claveUnidad}`, 100, yFila)
doc.text(`Unidad: ${unidad}`, 125, yFila)
doc.text(`ObjImp: ${objetoImp}`, 150, yFila)
yFila += 4

    // IMPUESTOS TRASLADADOS (con fondo gris)
    doc.setFontSize(7)

// Encabezado de impuestos con fondo gris - ALINEADO CON LAS CANTIDADES
doc.setFillColor(240, 240, 240)
doc.rect(110, yFila - 1, 90, 4, 'F')
doc.setFont('helvetica', 'bold')
doc.text('Impuestos trasladados del concepto', 112, yFila + 2)
doc.text('Base', 170, yFila + 2, { align: 'right' })  // Alineado a la derecha
doc.text('Importe', 200, yFila + 2, { align: 'right' }) // Alineado a la derecha
yFila += 5

// Detalle del impuesto - ALINEADO CON LOS ENCABEZADOS
doc.setFont('helvetica', 'normal')
const baseIVA = (importe).toFixed(2)
const importeIVA = (importe * 0.16).toFixed(2)
doc.text('(002) IVA - Tasa 0.160000', 112, yFila)
doc.text(formatoMoneda(Number(baseIVA)), 170, yFila, { align: 'right' })
doc.text(formatoMoneda(Number(importeIVA)), 200, yFila, { align: 'right' })
yFila += 7
  })
}

// Línea separadora ANTES del resumen de impuestos
doc.setLineWidth(0.5)
doc.line(10, yFila, 200, yFila)
yFila += 5

// --------------------------------------------
// IMPUESTOS Y TOTALES (RESUMEN FINAL)
// --------------------------------------------
doc.setFontSize(8)

// Detalle del impuesto total (SIN encabezado, solo alineado)
const subtotal = Number(datosRemision.subtotal) || 0
const iva = Number(datosRemision.iva) || 0
const total = Number(datosRemision.total) || 0

doc.setFont('helvetica', 'normal')
doc.text('(002) IVA - Tasa 0.160000', 112, yFila)
doc.text(formatoMoneda(subtotal), 170, yFila, { align: 'right' })
doc.text(formatoMoneda(iva), 200, yFila, { align: 'right' })
yFila += 8

// Línea separadora DESPUÉS del resumen de impuestos
doc.line(10, yFila, 200, yFila)
yFila += 10

// Resto del código...
// Importe con letra
doc.setFont('helvetica', 'bold')
doc.setFontSize(8)
doc.text('Importe con letra:', 10, yFila)
doc.setFont('helvetica', 'normal')
const importeConLetra = numeroALetras(total)
doc.text(importeConLetra, 10, yFila + 4)

// Totales a la derecha
yFila -= 5
doc.setFontSize(9)
doc.setFont('helvetica', 'bold')
doc.text(formatoMoneda(subtotal), 200, yFila, { align: 'right' })
yFila += 5
doc.text(formatoMoneda(iva), 200, yFila, { align: 'right' })
yFila += 5
doc.text(formatoMoneda(total), 200, yFila, { align: 'right' })



    const nombreArchivo = `factura-${datosRemision.numero_pedido || datosRemision.no_pedido || 'sin-folio'}.pdf`
    doc.save(nombreArchivo)
    mostrarAlerta('success', 'Factura generada correctamente')

  } catch (error) {
    console.error('Error en la generación de la Factura:', error)
    mostrarAlerta('danger', 'Error al generar la Factura: ' + error.message)
  }
}



// Función auxiliar para convertir números a letras
const numeroALetras = (numero) => {
  const partes = numero.toFixed(2).split('.')
  const entero = parseInt(partes[0])
  const centavos = partes[1]

  if (entero === 0) return `CERO PESOS ${centavos}/100 MXN`

  let resultado = ''

  // Miles
  if (entero >= 1000) {
    const miles = Math.floor(entero / 1000)
    if (miles === 1) {
      resultado += 'MIL '
    } else {
      resultado += numeroSimple(miles) + ' MIL '
    }
  }

  // Centenas, decenas y unidades
  const resto = entero % 1000
  if (resto > 0) {
    resultado += numeroSimple(resto)
  }

  return `${resultado.trim()} PESOS ${centavos}/100 MXN`
}

const numeroSimple = (num) => {
  const unidades = ['', 'UN', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE']
  const especiales = ['DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISÉIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE']
  const decenas = ['', '', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA']
  const centenas = ['', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS']

  if (num === 100) return 'CIEN'
  if (num < 10) return unidades[num]
  if (num < 20) return especiales[num - 10]
  if (num < 100) {
    const dec = Math.floor(num / 10)
    const uni = num % 10
    if (uni === 0) return decenas[dec]
    if (dec === 2) return 'VEINTI' + unidades[uni]
    return decenas[dec] + ' Y ' + unidades[uni]
  }

  const cen = Math.floor(num / 100)
  const resto = num % 100
  if (resto === 0) return centenas[cen]
  return centenas[cen] + ' ' + numeroSimple(resto)
}



onMounted(() => {
  cargarPedidosPendientes();
  cargarDatosFacturacion();
});

</script>


