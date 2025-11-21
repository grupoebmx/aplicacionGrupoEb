<template>
  <div class="min-h-screen bg-gray-100">
    <!-- SVG Icons -->
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
      <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
      </symbol>
      <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
      </symbol>
      <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </symbol>
    </svg>

    <!-- Contenedor principal SIN márgenes laterales -->
    <div class="w-full p-6">
      <div id="alert-container" class="fixed top-4 right-4 z-50 space-y-2"></div>

      <!-- Encabezado -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Tablero general</h1>

      </div>

      <!-- Filtros -->
      <div class="mb-6 flex gap-4">
        <input
          v-model="filtroTexto"
          type="text"
          placeholder="Buscar por pedido, producto o cliente..."
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          v-model="filtroEstado"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos los estados</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En Proceso">En Proceso</option>
          <option value="Completado">Completado</option>
          <option value="Autorizado">Autorizado</option>
        </select>
        <button
          @click="cargarDatos"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Actualizar
        </button>
      </div>

      <!-- Tabla -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Pedido
                </th>
                <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Producto
                </th>
                <th class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Solicitado
                </th>
                <th class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  O.C.
                </th>
                <th class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  O.P.
                </th>
                <th class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Recepción
                </th>
                <th class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Impresión
                </th>
                <th class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Suaje
                </th>
                <th class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Pegado
                </th>
                <th class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Armado
                </th>
                <th class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Almacén
                </th>
                <th class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="item in datosFiltrados"
                :key="`${item.no_pedido}-${item.id_producto}-${item.no_orden}`"
                class="hover:bg-gray-50 transition-colors"
              >
                <!-- Pedido -->
                <td class="px-3 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ item.no_pedido }}</div>
                  <div class="text-xs text-gray-500 truncate max-w-[120px]">{{ item.nombre_empresa }}</div>
                  <div class="mt-1">
                    <span
                      :class="getEstadoClass(item.status)"
                      class="px-2 py-1 text-xs font-semibold rounded-full"
                    >
                      {{ item.status }}
                    </span>
                  </div>
                </td>

                <!-- Producto -->
                <td class="px-3 py-4">
                  <div class="text-sm font-medium text-gray-900 max-w-[150px] truncate">{{ item.nombre_producto }}</div>
                  <div class="text-xs text-gray-500">{{ item.clave_producto }}</div>
                </td>

                <!-- Cantidad Solicitada -->
                <td class="px-3 py-4 text-center">
                  <div class="text-sm font-bold text-gray-900">
                    {{ formatNumber(item.cantidad_pedido) }}
                  </div>
                  <div class="text-xs text-gray-500">pzas</div>
                </td>

                <!-- Orden Compra -->
                <td class="px-3 py-4 text-center">
                  <div class="text-xs text-gray-900">{{ item.orden_compra_id || '-' }}</div>
                </td>

                <!-- Orden Producción -->
                <td class="px-3 py-4 text-center">
                  <div class="text-sm font-medium text-blue-600">
                    {{ item.no_orden ? item.no_orden : 'N/A' }}
                  </div>
                </td>

                <!-- Procesos -->
                <td
                  v-for="proceso in ['recepcion', 'impresion', 'suaje', 'pegado', 'armado', 'almacen']"
                  :key="proceso"
                  class="px-3 py-4 text-center"
                >
                  <ProcesoCell
                    :cantidad="item[`cantidad_${proceso}`]"
                    :total="item.cantidad_pedido"
                  />
                </td>

                <!-- Acciones -->
                <td class="px-3 py-4">
                  <div class="flex flex-col gap-1.5">
                    <!-- <button
                      @click="generarCertificadoCalidadPDF(item)"
                      class="px-2 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
                      :disabled="!item.no_orden"
                      title="Imprimir etiquetas"
                    >
                      🏷️ Etiquetas
                    </button> -->
                    <button
                      @click="imprimirEstadoCuenta(item)"
                      class="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
                      :disabled="Number(item.cantidad_almacen) === 0"
                      title="Descargar estado de cuenta"
                    >
                      📄 Estado
                    </button>
                    <button
                      @click="generarFactura(item)"
                      class="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
                      :disabled="Number(item.cantidad_almacen) === 0"
                      title="Generar remisión electrónica"
                    >
                      🧾 Remisión
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Sin datos -->
        <div v-if="datosFiltrados.length === 0" class="text-center py-12">
          <p class="text-gray-500">No hay datos para mostrar</p>
        </div>
      </div>

      <!-- Resumen -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-blue-50 p-4 rounded-lg">
          <div class="text-sm text-blue-600 font-medium">Total Pedidos</div>
          <div class="text-2xl font-bold text-blue-900">{{ totalPedidos }}</div>
        </div>
        <div class="bg-yellow-50 p-4 rounded-lg">
          <div class="text-sm text-yellow-600 font-medium">En Proceso</div>
          <div class="text-2xl font-bold text-yellow-900">{{ pedidosEnProceso }}</div>
        </div>
        <div class="bg-green-50 p-4 rounded-lg">
          <div class="text-sm text-green-600 font-medium">Completados</div>
          <div class="text-2xl font-bold text-green-900">{{ pedidosCompletados }}</div>
        </div>
        <div class="bg-purple-50 p-4 rounded-lg">
          <div class="text-sm text-purple-600 font-medium">En Almacén</div>
          <div class="text-2xl font-bold text-purple-900">{{ pedidosEnAlmacen }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import jsPDF from 'jspdf'
import ProcesoCell from '@/components/ProcesoCell.vue'


const fechaActual = new Date().toISOString().substring(0, 10)
const datos = ref([])
const filtroTexto = ref('')
const filtroEstado = ref('')


// Cargar datos
const cargarDatos = async () => {
  try {
    const { data } = await axios.get('https://backendgrupoeb.onrender.com/api/tablero-produccion')
    datos.value = data
    console.log('📊 Datos del tablero:', data)
  } catch (error) {
    console.error('❌ Error al cargar datos:', error)
    mostrarAlerta('danger', 'Error al cargar datos del tablero')
  }
}

// Datos filtrados
const datosFiltrados = computed(() => {
  return datos.value.filter(item => {
    const textoMatch = !filtroTexto.value ||
      item.no_pedido.toLowerCase().includes(filtroTexto.value.toLowerCase()) ||
      item.nombre_producto.toLowerCase().includes(filtroTexto.value.toLowerCase()) ||
      item.nombre_empresa.toLowerCase().includes(filtroTexto.value.toLowerCase())

    const estadoMatch = !filtroEstado.value || item.status === filtroEstado.value

    return textoMatch && estadoMatch
  })
})

// Resúmenes
const totalPedidos = computed(() => {
  const pedidos = new Set(datos.value.map(d => d.no_pedido))
  return pedidos.size
})

const pedidosEnProceso = computed(() => {
  return datos.value.filter(d => d.estado_orden === 'En Proceso').length
})

const pedidosCompletados = computed(() => {
  return datos.value.filter(d => d.estado_orden === 'Completada').length
})

const pedidosEnAlmacen = computed(() => {
  return datos.value.filter(d => Number(d.cantidad_almacen) > 0).length
})

// Funciones auxiliares
const formatNumber = (num) => {
  return Number(num || 0).toLocaleString('es-MX')
}

const formatoMoneda = (valor) => {
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

const getEstadoClass = (status) => {
  const classes = {
    'Pendiente': 'bg-yellow-100 text-yellow-800',
    'En Proceso': 'bg-blue-100 text-blue-800',
    'Completado': 'bg-green-100 text-green-800',
    'Autorizado': 'bg-purple-100 text-purple-800',
    'Cancelado': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
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

// Acciones
// const imprimirEtiquetas = (item) => {
//   console.log('🏷️ Imprimir etiquetas:', item)
//   mostrarAlerta('primary', 'Función de etiquetas en desarrollo')
// }

const imprimirEstadoCuenta = async (item) => {
  console.log('📄 Imprimir estado de cuenta:', item)

  if (Number(item.cantidad_almacen) === 0) {
    mostrarAlerta('warning', 'No hay productos en almacén para este pedido')
    return
  }

  try {
    const { data } = await axios.get(`https://backendgrupoeb.onrender.com/api/pedido-estado/${item.no_pedido}`)
    generarEstadoCuentaPDF(data)
  } catch (error) {
    console.error('Error al obtener estado de cuenta:', error)
    mostrarAlerta('danger', 'Error al obtener datos del estado de cuenta')
  }
}

const generarFactura = async (item) => {
  console.log('🧾 Generar remisión:', item)

  if (Number(item.cantidad_almacen) === 0) {
    mostrarAlerta('warning', 'No hay productos en almacén para este pedido')
    return
  }

  try {
    // Obtener datos de facturación y estado de cuenta
    const [estadoCuentaRes, facturacionRes] = await Promise.all([
      axios.get(`https://backendgrupoeb.onrender.com/api/pedido-estado/${item.no_pedido}`),
      axios.get(`https://backendgrupoeb.onrender.com/api/remision/${item.no_pedido}`)
    ])

    console.log('📋 Datos estado cuenta:', estadoCuentaRes.data)
    console.log('📋 Datos facturación:', facturacionRes.data)

    // Combinar los datos
    const datosRemision = {
      ...facturacionRes.data,
      ...estadoCuentaRes.data,
      no_pedido: item.no_pedido // Asegurar que tenga el número de pedido
    }

    // Generar el PDF directamente
    generarRemisionPDFDocumento(datosRemision)

  } catch (error) {
    console.error('Error al generar remisión:', error)
    if (error.response?.status === 404) {
      mostrarAlerta('warning', 'No hay datos de facturación para este pedido')
    } else {
      mostrarAlerta('danger', 'Error al generar la remisión: ' + error.message)
    }
  }
}

const generarRemisionPDFDocumento = (datosRemision) => {
  try {
    console.log('🎨 Generando PDF con datos:', datosRemision)

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

const generarEstadoCuentaPDF = (datosEstadoCuenta) => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'letter',
    })

    let yPosition = 40

    const img = new Image()
    img.src = '/imagen/logo.jpg'

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
doc.text(String(datosRemision.cp_facturacion || ''), 40, yPosition + 9)

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

// async function obtenerFolioConsecutivoCalidad() {
//   try {
//     const response = await fetch('http://localhost:3000/api/folios/calidad');

//     // Verificar si la respuesta es exitosa
//     if (!response.ok) {
//       throw new Error(`Error HTTP: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log('Respuesta del API:', data); // Para debugging

//     // Verificar que existe el folio en la respuesta
//     if (!data.folio) {
//       console.error('El API no devolvió un folio válido:', data);
//       return 'R-000'; // Valor por defecto
//     }

//     return data.folio;
//   } catch (error) {
//     console.error('Error al obtener folio:', error);
//     // Retornar un folio por defecto en caso de error
//     return 'R-000';
//   }
// }

// const generarCertificadoCalidadPDF = () => {
//   try {
//     const doc = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'letter',
//     })

//     let yPosition = 40

//     const img = new Image()
//     img.src = '/imagen/logo.jpg'

//     img.onload = function () {
//       continuarGeneracionCertificado(doc, yPosition, img)
//     }

//     img.onerror = function () {
//       console.warn('No se pudo cargar el logo, continuando sin imagen...')
//       continuarGeneracionCertificado(doc, yPosition, null)
//     }
//   } catch (error) {
//     console.error('Error al generar Certificado de Calidad PDF:', error)
//     mostrarAlerta('danger', 'Error al generar el Certificado: ' + error.message)
//   }
// }

// const continuarGeneracionCertificado = async (doc, yPosition, img) => {
//   try {

//      const folio = await obtenerFolioConsecutivoCalidad();

//     // --- LOGO CENTRADO EN LA PARTE SUPERIOR ---
//     if (img) {
//       const pageWidth = doc.internal.pageSize.getWidth()
//       const imgWidth = 40
//       const imgX = (pageWidth - imgWidth) / 2
//       doc.addImage(img, 'JPEG', imgX, 15, imgWidth, 25)
//     }

//     // --- FOLIO Y FECHA EN LA ESQUINA SUPERIOR DERECHA ---
//     doc.setFont('helvetica', 'bold')
//     doc.setFontSize(10)
//     doc.text(`FOLIO: ${folio}`, 195, 20, { align: 'right' })
//     doc.setFontSize(9)
//     doc.text('12 Noviembre 2025', 195, 25, { align: 'right' })

//     // --- CERTIFICADO DE CALIDAD CENTRADO ---
//     doc.setFont('helvetica', 'bold')
//     doc.setFontSize(16)
//     doc.text('CERTIFICADO DE CALIDAD', 105, 50, { align: 'center' })

//     yPosition = 60

//     // --- ENCABEZADOS SIN LÍNEAS ---
//     const tableX = 25
//     const tableWidth = 160

//     // Encabezados sin bordes
//     doc.setFontSize(10)
//     doc.setFont('helvetica', 'normal')
//     doc.text('Información Proveedor', tableX + tableWidth/4, yPosition, { align: 'center' })
//     doc.text('Información Cliente', tableX + 3*tableWidth/4, yPosition, { align: 'center' })

//     yPosition += 5

//     // --- TABLA DE INFORMACIÓN PROVEEDOR/CLIENTE CON BORDES ---
//     doc.setLineWidth(0.3)
//     doc.setDrawColor(0, 0, 0)

//     const contentHeight = 22

//     // Rectángulo con línea divisoria vertical
//     doc.rect(tableX, yPosition, tableWidth, contentHeight)
//     doc.line(tableX + tableWidth/2, yPosition, tableX + tableWidth/2, yPosition + contentHeight)

//     yPosition += 4

//     // Contenido Proveedor (Izquierda)
//     const proveedorLines = [
//       'Grupeb S.A. de C.V.',
//       'Rogelio Ledesma #102',
//       'Col. Cruz Vieja',
//       'Tlajomulco de Zuñiga, Jalisco cp. 45644',
//       '(33) 931259595'
//     ]

//     // Contenido Cliente (Derecha)
//     const clienteLines = [
//       'Take Flight Venture',
//       'Av Siempre viva 45287',
//       'Col. centro',
//       'Tlajomulco de Zuñiga, Jalisco cp. 45644',
//       '(33) 31803373'
//     ]

//     doc.setFontSize(8)
//     doc.setFont('helvetica', 'normal')

//     // Mostrar información en paralelo
//     for (let i = 0; i < proveedorLines.length; i++) {
//   // Proveedor (izquierda)
//   doc.text(proveedorLines[i], tableX + 3, yPosition + (i * 3.5), { align: 'left' })

//   // Cliente (derecha)
//   doc.text(clienteLines[i], tableX + tableWidth/2 + 3, yPosition + (i * 3.5), { align: 'left' })
// }

//     yPosition += contentHeight
//     // --- CELDA INDEPENDIENTE PARA "INFORMACIÓN DEL PRODUCTO" ---
//       const headerCellX = tableX
//       const headerCellY = yPosition
//       const headerCellWidth = tableWidth
//       const headerCellHeight = 8

//       // Dibujar la celda del encabezado
//       doc.setLineWidth(0.3)
//       doc.rect(headerCellX, headerCellY, headerCellWidth, headerCellHeight)

//       // Texto centrado dentro de la celda
//       doc.setFont('helvetica', 'bold')
//       doc.setFontSize(13)
//       doc.text(
//         'Información del Producto',
//         headerCellX + headerCellWidth / 2,
//         headerCellY + 6,
//         { align: 'center' }
//       )

//       yPosition += headerCellHeight + 4


//     // --- TABLA GRANDE QUE CONTIENE TODO ---
//     const bigTableY = yPosition
//     const bigTableHeight = 103 // Altura total para contener toda la información

//     doc.rect(tableX, bigTableY, tableWidth, bigTableHeight)

//     yPosition += 5

//     // Contenido del producto (centrado)
//     const productInfo = [
//       ['Producto:', 'Caja Ranurada'],
//       ['Código:', '21007852'],
//       ['Cantidad Solicitada:', '3,000'],
//       ['Cantidad Enviada:', '2,740'],
//       ['Orden de Producción:', '02158'],
//       ['Remisión Factura:', '3541']
//     ]

//     doc.setFontSize(8)
//     doc.setFont('helvetica', 'normal')

//     productInfo.forEach((item, index) => {
//       doc.text(item[0], 105, yPosition + (index * 4), { align: 'right' })
//       doc.text(item[1], 107, yPosition + (index * 4))
//     })

//     yPosition += (productInfo.length * 4) + 2

//     // --- LÍNEA SEPARADORA (DOBLE) DENTRO DE LA TABLA - MÁS CORTA ---
//     doc.setLineWidth(0.3)
//     const lineMargin = 5
//     doc.line(tableX + lineMargin, yPosition, tableX + tableWidth - lineMargin, yPosition)
//     doc.line(tableX + lineMargin, yPosition + 1.0, tableX + tableWidth - lineMargin, yPosition + 1.0)

//     yPosition += 5

//     // Especificaciones técnicas - A LA DERECHA, UNO DEBAJO DEL OTRO
//     const specsInfo = [
//       ['Cartón Tipo:', 'Corrugado Kraft'],
//       ['Flauta:', 'C'],
//       ['Resistencia:', '32'],
//       ['Impresión Color:', 'GCMI 32']
//     ]

//     doc.setFontSize(8)

//     specsInfo.forEach((item, index) => {
//       doc.text(item[0], 70, yPosition + (index * 4), { align: 'right' })
//       doc.text(item[1], 80, yPosition + (index * 4))
//     })

//     yPosition += (specsInfo.length * 4) + 3

//     // --- PRUEBAS (DOS COLUMNAS ALINEADAS) ---
//     const pruebas = [
//       ['Prueba de Resistencia', 'Aprobada'],
//       ['Prueba de Estiba', 'Aprobada'],
//       ['Prueba de Medidas', 'Aprobada'],
//       ['Pruebas de Color', 'Aprobada'],
//       ['Prueba de empaque', 'Aprobada'],
//       ['Fumigación de Partida', 'Realizada'],
//       ['Calidad', 'Certificado']
//     ]

//     doc.setFontSize(8)

//     const pruebaCol1X = 70
//     const pruebaCol2X = 120

//     doc.setFont('helvetica', 'bold')

//     pruebas.forEach((prueba, index) => {
//       doc.text(prueba[0], pruebaCol1X, yPosition + (index * 4), { align: 'left' })
//       doc.text(prueba[1], pruebaCol2X, yPosition + (index * 4), { align: 'left' })
//     })

//     yPosition = bigTableY + bigTableHeight + 20

//     // --- FIRMAS ---
//     const firmaY = yPosition

//     // Certifica (Izquierda)
//     doc.setFont('helvetica', 'normal')
//     doc.setFontSize(12)
//     doc.text('Certifica', 60, firmaY, { align: 'center' })

//     // Línea para firma calidad
//     doc.setLineWidth(0.3)
//     doc.line(35, firmaY + 8, 85, firmaY + 8)
//     doc.setFontSize(11)
//     doc.text('Nombre del de Calidad', 60, firmaY + 12, { align: 'center' })

//     // Valida (Derecha)
//     doc.setFontSize(12)
//     doc.text('Valida', 150, firmaY, { align: 'center' })

//     // Línea para firma validador
//     doc.line(125, firmaY + 8, 175, firmaY + 8)
//     doc.setFontSize(11)
//     doc.text('Nombre del Validador', 150, firmaY + 12, { align: 'center' })

//     yPosition = firmaY + 20

//     // --- OBSERVACIONES Y REVISIÓN EN LA MISMA LÍNEA ---
//     const pageHeight = doc.internal.pageSize.getHeight()
//     const bottomY = pageHeight - 15

//     // Observaciones a la izquierda
//     doc.setFont('helvetica', 'normal')
//     doc.setFontSize(8)
//     const observaciones = 'Observaciones: El Color es una Variable del papel que no afecta las características funcionales del cartón, ya que existen diferentes tonos de color apegados al estándar que en este caso es el kraft.'

//     // Texto de observaciones con ancho máximo
//     const splitObs = doc.splitTextToSize(observaciones, 140)
//     doc.text(splitObs, 20, bottomY)

//     // Revisión a la derecha en la misma línea
//     doc.text('RC-CA-001', 195, bottomY, { align: 'right' })
//     doc.setFont('helvetica', 'bold')
//     doc.setFillColor(173, 216, 230) // Azul claro
//     doc.rect(165, bottomY + 2, 30, 5, 'F')
//     doc.setFont('helvetica', 'normal')
//     doc.text('Rev. 12-11/25', 195, bottomY + 5, { align: 'right' })

//     // Guardar el PDF
//     const nombreArchivo = `certificado-calidad-250100.pdf`
//     doc.save(nombreArchivo)
//     mostrarAlerta('success', 'Certificado de Calidad generado correctamente')

//   } catch (error) {
//     console.error('Error en la generación del Certificado:', error)
//     mostrarAlerta('danger', 'Error al generar el Certificado: ' + error.message)
//   }
// }


onMounted(() => {
  cargarDatos()
})
</script>

<style scoped>

.alert {
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  display: inline-flex;
  align-items: center;
  min-width: 300px;
}

.alert-success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.alert-warning {
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeaa7;
}

.alert-primary {
  color: #004085;
  background-color: #cce5ff;
  border-color: #b8daff;
}
</style>
