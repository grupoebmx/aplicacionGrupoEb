<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
    <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75
             0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75
             0 0 0-1.06 1.06L6.97 11.03a.75.75
             0 0 0 1.079-.02l3.992-4.99a.75.75
             0 0 0-.01-1.05z"
      />
    </symbol>
  </svg>

  <div class="flex items-start justify-center min-h-screen bg-gray-100 p-4">
    <div class="w-full mt-8 mx-20 bg-white p-8 rounded-lg shadow-md">
      <!-- ENCABEZADO CON BOTÓN DE GENERAR PDF -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold font-[Inter]">Órdenes de Producción</h2>
          <div class="text-sm text-gray-500 mt-1">
            Activas: {{ ordenesActivas.length }} | Completadas: {{ ordenesCompletadas.length }}
          </div>
        </div>
      </div>

      <!-- Tabla de órdenes ACTIVAS -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Órdenes Activas</h3>
        <TablaProduccion
          :encabezado="[
            'N° Orden',
            'Pedido',
            'Producto',
            'Fecha Inicio',
            'Tiempo',
            'Progreso',
            'Estado',
            'Acciones',
          ]"
          :info="ordenesActivas"
          @generar-pdf="generarPDFPorOrden"
          @generar-pdf-completo="generarPDFCompleto"
        />
      </div>

      <!-- Sección de órdenes COMPLETADAS -->
      <div v-if="ordenesCompletadas.length > 0" class="mt-12">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800">Órdenes Finalizadas</h3>
          <div class="text-sm text-gray-500">Se eliminarán automáticamente después de 7 días</div>
        </div>

        <div class="bg-green-50 border border-green-200 rounded-lg p-6">
          <table class="table w-full border border-gray-300 rounded-md">
            <thead class="bg-green-100">
              <tr>
                <th class="font-bold text-gray-700 p-3 text-left">N° Orden</th>
                <th class="font-bold text-gray-700 p-3 text-left">Producto</th>

                <th class="font-bold text-gray-700 p-3 text-left">Días Restantes</th>
                <th class="font-bold text-gray-700 p-3 text-left">Progreso</th>
                <th class="font-bold text-gray-700 p-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="orden in ordenesCompletadas"
                :key="'completada-' + orden.no_orden"
                class="border-b border-green-200 hover:bg-green-100 transition-colors"
              >
                <!-- No. de orden -->
                <td class="p-3 font-medium text-gray-900">
                  {{ orden.no_orden }}
                </td>

                <!-- Producto -->
                <td class="p-3 text-gray-700">
                  {{ orden.nombre_producto || orden.productos_identificador || 'Sin producto' }}
                </td>

                <!-- Días Restantes (CORREGIDO) -->
                <td class="p-3 text-gray-700">
                  {{
                    orden.diasRestantes !== null && orden.diasRestantes !== undefined
                      ? `${orden.diasRestantes} días`
                      : '—'
                  }}
                </td>

                <!-- Progreso (siempre 100% para completadas) -->
                <td class="p-3">
                  <div class="flex items-center space-x-2">
                    <div class="w-20 bg-gray-200 rounded-full h-2.5 flex-1">
                      <div class="h-2.5 rounded-full bg-green-600" style="width: 100%"></div>
                    </div>
                    <div class="text-xs text-gray-600 min-w-16">
                      <div class="font-medium">100%</div>
                      <div class="text-gray-400">8/8</div>
                    </div>
                  </div>
                </td>

                <!-- Botones de acción -->
                <td class="p-3">
                  <div class="flex space-x-2">
                    <!-- <button
                      @click="verDetalleOrden(orden)"
                      class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                    >
                      Ver detalle
                    </button> -->

                    <!-- PDF Completo -->
                    <button
                      @click="generarPDFCompleto(orden.no_orden)"
                      class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm flex items-center gap-1"
                      :disabled="generandoPDFCompleto === orden.no_orden"
                    >
                      <svg
                        v-if="generandoPDFCompleto === orden.no_orden"
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
                      <svg
                        v-else
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      {{ generandoPDFCompleto === orden.no_orden ? '...' : 'PDF Completo' }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Mensaje informativo -->
          <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p class="text-sm text-blue-700 flex items-center">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
              Las órdenes finalizadas se eliminarán automáticamente después de 7 días
            </p>
          </div>
        </div>
      </div>

      <!-- Mensaje cuando no hay órdenes completadas -->
      <div
        v-else
        class="mt-8 text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg"
      >
        <svg
          class="w-12 h-12 mx-auto text-gray-400 mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p>No hay órdenes finalizadas</p>
        <p class="text-sm mt-1">Las órdenes completadas aparecerán aquí durante 7 días</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
//import { useRouter } from 'vue-router'
import TablaProduccion from '@/components/TablaProduccion.vue'
import { jsPDF } from 'jspdf'

// const router = useRouter()
const ordenes = ref([])
const loading = ref(true)
const generandoPDF = ref(false)
const generandoPDFCompleto = ref(false)
const API_BASE_URL = 'https://backendgrupoeb.onrender.com'

// Función para validar si un string es una imagen base64 válida
const validarBase64Imagen = (base64String) => {
  if (!base64String || typeof base64String !== 'string') {
    return false
  }

  // Patrón básico para validar base64
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/

  try {
    // Verificar formato base64
    if (!base64Regex.test(base64String)) {
      return false
    }

    // Intentar decodificar para verificar que es válido
    const binaryString = atob(base64String)
    return binaryString.length > 0
  } catch (error) {
    console.warn('Error validando base64:', error)
    return false
  }
}

// Función para agregar un placeholder cuando no hay imagen disponible
const agregarPlaceholderImagen = (doc, x, y, width, height, texto = 'Sin imagen') => {
  // ⬇️ SOLO BORDE - SIN FONDO GRIS
  doc.setDrawColor(0, 0, 0) // Color gris para el borde
  doc.rect(x, y, width, height) // ⬅️ SIN 'F' - solo borde, sin relleno

  // Texto centrado
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(0, 0, 0) // Texto gris oscuro

  const textWidth =
    (doc.getStringUnitWidth(texto) * doc.internal.getFontSize()) / doc.internal.scaleFactor
  const textX = x + (width - textWidth) / 2
  const textY = y + height / 2

  doc.text(texto, textX, textY)
}
// Computed para separar órdenes
const ordenesActivas = computed(() => {
  return ordenes.value.filter(
    (orden) => orden.estado_detallado !== 'Completada' && !orden.eliminada,
  )
})

const ordenesCompletadas = computed(() => {
  return ordenes.value.filter(
    (orden) => orden.estado_detallado === 'Completada' && !orden.eliminada,
  )
})

// Función para generar PDF por orden específica (PDF NORMAL - VACÍO)
const generarPDFPorOrden = async (noOrden) => {
  try {
    generandoPDF.value = noOrden

    // 1. Obtener datos de producción
    console.log('📋 Obteniendo datos de producción...')
    const responseDatos = await fetch(`${API_BASE_URL}/api/produccion/PDF/${noOrden}`)

    if (!responseDatos.ok) {
      throw new Error(`Error ${responseDatos.status} al obtener datos`)
    }

    const datos = await responseDatos.json()
    console.log('✅ Datos obtenidos:', datos)

    if (!datos || datos.length === 0) {
      throw new Error('No se encontraron datos para esta orden')
    }

    const producto = datos[0]

    // 2. Obtener imagen de suaje
    let imagen = null
    let imagenF = null

    try {
      const responseImagen = await fetch(`${API_BASE_URL}/api/imagenes-orden/${noOrden}`)
      if (responseImagen.ok) {
        const dataImagen = await responseImagen.json()
        imagen = dataImagen.imagen
        imagenF = dataImagen.imagen_final
        console.log('✅ Imágenes obtenidas')
      }
    } catch (imagenError) {
      console.warn('⚠️ No se pudo obtener las imágenes:', imagenError)
    }

    // 3. Generar PDF con datos reales (formulario vacío)
    generarPDFConDatos(producto, imagen, noOrden, imagenF)
  } catch (error) {
    console.error('💥 Error:', error)
    alert(`Error: ${error.message}`)
  } finally {
    generandoPDF.value = null
  }
}

// Función para generar PDF COMPLETO (con datos llenos)
const generarPDFCompleto = async (noOrden) => {
  try {
    generandoPDFCompleto.value = noOrden

    // 1. Obtener datos de producción completos
    console.log('📋 Obteniendo datos completos de producción...')
    const responseCompleto = await fetch(`${API_BASE_URL}/api/PDFcompleto/${noOrden}`)

    if (!responseCompleto.ok) {
      throw new Error(`Error ${responseCompleto.status} al obtener datos completos`)
    }

    const datosCompletos = await responseCompleto.json()
    console.log('✅ Datos completos obtenidos:', datosCompletos)

    if (!datosCompletos.success) {
      throw new Error('No se pudieron obtener los datos completos')
    }

    const { recepcion, suaje, armado, envio, pegado, impresion, calidad, almacen } = datosCompletos

    // 2. Obtener datos básicos del producto
    const responseDatos = await fetch(`${API_BASE_URL}/api/produccion/PDF/${noOrden}`)
    if (!responseDatos.ok) {
      throw new Error(`Error ${responseDatos.status} al obtener datos básicos`)
    }
    const datos = await responseDatos.json()
    const producto = datos[0]

    // 3. Obtener imágenes
    let imagen = null
    let imagenF = null
    try {
      const responseImagen = await fetch(`${API_BASE_URL}/api/imagenes-orden/${noOrden}`)
      if (responseImagen.ok) {
        const dataImagen = await responseImagen.json()
        imagen = dataImagen.imagen
        imagenF = dataImagen.imagen_final
        console.log('✅ Imágenes obtenidas')
      }
    } catch (imagenError) {
      console.warn('⚠️ No se pudo obtener las imágenes:', imagenError)
    }

    // 4. Generar PDF con datos completos
    generarPDFConDatosCompletos(producto, imagen, noOrden, imagenF, {
      recepcion,
      suaje,
      armado,
      envio,
      pegado,
      impresion,
      calidad,
      almacen,
    })
  } catch (error) {
    console.error('💥 Error:', error)
    alert(`Error: ${error.message}`)
  } finally {
    generandoPDFCompleto.value = null
  }
}

// Función para generar el PDF normal (VACÍO)
const generarPDFConDatos = (producto, imagen, noOrden, imagenF) => {
  // 1. Configuración del Documento
  const doc = new jsPDF({
    orientation: 'l',
    unit: 'mm',
    format: 'a4',
  })

  // PRIMERA SECCIÓN (Superior) - CON DATOS REALES
  let startX = 2
  let startY = 2

  // Producto
  let widthProducto = 30
  let heightProducto = 6
  doc.setFillColor(200, 200, 200)
  doc.rect(startX, startY, widthProducto, heightProducto, 'F')
  doc.rect(startX, startY, widthProducto, heightProducto)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.text('Producto', startX + 2, startY + 5)

  // Descripción del producto - DATO REAL
  doc.rect(startX, startY + heightProducto, widthProducto, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6)
  const textoProducto = producto.producto || ''
  doc.text(textoProducto, startX + 2, startY + heightProducto + 7)

  // Medidas Internas
  let startX2 = startX + widthProducto + 1
  let widthMedidas = 30
  doc.setFillColor(220, 220, 220)
  doc.rect(startX2, startY, widthMedidas, 5, 'F')
  doc.rect(startX2, startY, widthMedidas, 5)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Medidas Internas', startX2 + 2, startY + 4.5)

  // Tabla de medidas - DATOS REALES
  let colsMedidas = ['Largo', 'Ancho', 'Alto', 'Caja']
  let colWidthMedidas = widthMedidas / colsMedidas.length
  let valoresMedidas = [
    producto.largo_int?.toString() || '450',
    producto.ancho_int?.toString() || '240',
    producto.alto_int?.toString() || '200',
    producto.ceja?.toString() || '35',
  ]

  // Encabezados
  colsMedidas.forEach((texto, i) => {
    doc.rect(startX2 + i * colWidthMedidas, startY + 5, colWidthMedidas, 5)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(6)
    doc.text(texto, startX2 + i * colWidthMedidas + 1, startY + 5 + 4.5)
  })

  // Valores
  valoresMedidas.forEach((texto, i) => {
    doc.rect(startX2 + i * colWidthMedidas, startY + 10, colWidthMedidas, 5)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6)
    doc.text(texto, startX2 + i * colWidthMedidas + 2, startY + 10 + 4.5)
  })

  // Guía - DATO REAL
  let startX3 = startX2 + widthMedidas + 1
  let widthGuia = 14
  doc.setFillColor(200, 200, 200)
  doc.rect(startX3, startY, widthGuia, 6, 'F')
  doc.rect(startX3, startY, widthGuia, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Guía', startX3 + 2, startY + 5)

  doc.rect(startX3, startY + 6, widthGuia, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  const textoGuia = producto.guia || 'CB'
  doc.text(textoGuia, startX3 + 2, startY + 6 + 7)

  // Marcas - DATO REAL
  let startX4 = startX3 + widthGuia + 1
  let widthMarcas = 30
  doc.setFillColor(200, 200, 200)
  doc.rect(startX4, startY, widthMarcas, 6, 'F')
  doc.rect(startX4, startY, widthMarcas, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Marcas', startX4 + 2, startY + 5)

  doc.rect(startX4, startY + 6, widthMarcas, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  const textoMarcas = producto.marcas || '123**205**123'
  doc.text(textoMarcas, startX4 + 2, startY + 6 + 7)

  // SEGUNDA SECCIÓN (Tipo) - CON DATOS REALES
  let startYTipo = startY + heightProducto + 9 + 4

  // Tipo - DATO REAL
  let widthTipo = 30
  let heightTipo = 6
  doc.setFillColor(200, 200, 200)
  doc.rect(startX, startYTipo, widthTipo, heightTipo, 'F')
  doc.rect(startX, startYTipo, widthTipo, heightTipo)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Tipo', startX + 2, startYTipo + 5)

  // Valor Tipo - DATO REAL
  doc.rect(startX, startYTipo + heightTipo, widthTipo, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  const textoTipo = producto.tipo || 'Caja RANURADA'
  doc.text(textoTipo, startX + 2, startYTipo + heightTipo + 7)

  // Medida Cartón - DATOS REALES
  let startXTabla1 = startX + widthTipo + 1
  let widthTabla1 = 25
  doc.setFillColor(220, 220, 220)
  doc.rect(startXTabla1, startYTipo, widthTabla1, 5, 'F')
  doc.rect(startXTabla1, startYTipo, widthTabla1, 5)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Medida Cartón', startXTabla1 + 2, startYTipo + 4.5)

  // Tabla Medida Cartón - DATOS REALES
  let colsCarton = ['Ancho', 'Largo']
  let colWidthCarton = widthTabla1 / colsCarton.length
  let valoresCarton = [
    producto.ancho_carton?.toString() || '451',
    producto.largo_carton?.toString() || '1438',
  ]

  colsCarton.forEach((texto, i) => {
    doc.rect(startXTabla1 + i * colWidthCarton, startYTipo + 5, colWidthCarton, 5)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.text(texto, startXTabla1 + i * colWidthCarton + 2, startYTipo + 5 + 4.5)
  })

  valoresCarton.forEach((texto, i) => {
    doc.rect(startXTabla1 + i * colWidthCarton, startYTipo + 10, colWidthCarton, 5)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text(texto, startXTabla1 + i * colWidthCarton + 2, startYTipo + 10 + 4.5)
  })

  // Material Flauta - DATO REAL
  let startXMat = startXTabla1 + widthTabla1 + 1
  let widthMat = 20
  doc.setFillColor(200, 200, 200)
  doc.rect(startXMat, startYTipo, widthMat, 6, 'F')
  doc.rect(startXMat, startYTipo, widthMat, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Material ', startXMat + 2, startYTipo + 5)

  doc.rect(startXMat, startYTipo + 6, widthMat, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  const textoMaterial = producto.material || 'Corrugado'
  doc.text(textoMaterial, startXMat + 2, startYTipo + 6 + 7)

  // Tipo C - DATO REAL
  let startXTipoC = startXMat + widthMat + 1
  let widthTipoC = 10
  doc.setFillColor(200, 200, 200)
  doc.rect(startXTipoC, startYTipo, widthTipoC, 6, 'F')
  doc.rect(startXTipoC, startYTipo, widthTipoC, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.text('Flauta', startXTipoC + 1, startYTipo + 5)

  doc.rect(startXTipoC, startYTipo + 6, widthTipoC, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  const textoFlauta = producto.flauta || 'C'
  doc.text(textoFlauta, startXTipoC + 2, startYTipo + 6 + 7)

  // Combinar Kraft Nat. y ECT en una columna dividida a la mitad
  let startXKraftECT = startXTipoC + widthTipoC + 1
  let widthKraftECT = 20 // Ancho total de la columna combinada

  // Fila 1: Títulos (Kraft Nat. y ECT)
  let colWidthKraftECT = widthKraftECT / 1

  // Resistencia (mitad izquierda) - MODIFICADO
  doc.setFillColor(200, 200, 200)
  doc.rect(startXKraftECT, startYTipo, colWidthKraftECT, 6, 'F')
  doc.rect(startXKraftECT, startYTipo, colWidthKraftECT, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Resistencia', startXKraftECT + 1, startYTipo + 5)

  // ECT (mitad derecha)
  doc.setFillColor(200, 200, 200)
  doc.rect(startXKraftECT + colWidthKraftECT, startYTipo, colWidthKraftECT, 6, 'F')
  doc.rect(startXKraftECT + colWidthKraftECT, startYTipo, colWidthKraftECT, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('ECT', startXKraftECT + colWidthKraftECT + 1, startYTipo + 5)

  // Fila 2: Valores
  // Resistencia valor (mitad izquierda) - MODIFICADO
  doc.rect(startXKraftECT, startYTipo + 6, colWidthKraftECT, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXKraftECT + 2, startYTipo + 6 + 7)

  // ECT valor (mitad derecha) - DATO REAL
  doc.rect(startXKraftECT + colWidthKraftECT, startYTipo + 6, colWidthKraftECT, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  const textoECT = producto.resistencia?.toString() || '32'
  doc.text(textoECT, startXKraftECT + colWidthKraftECT + 2, startYTipo + 6 + 7)

  // Definir las variables primero
  const logoWidth = 30
  const logoHeight = 20
  const logoX = startXKraftECT + colWidthKraftECT * 2 + 20
  const logoY = 3
  // Agregar la imagen (USAR las variables definidas)
  try {
    doc.addImage('imagen/logo.jpg', 'JPEG', logoX, logoY, logoWidth, logoHeight)
  } catch (e) {
    console.warn('No se pudo cargar el logo:', e)
  }

  // Agregar texto "ORDEN DE PRODUCCIÓN" centrado debajo de la imagen
  const textoY = logoY + logoHeight + 4
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)

  // Calcular ancho del texto para centrarlo
  const texto = 'ORDEN DE PRODUCCIÓN'
  const textoWidth =
    (doc.getStringUnitWidth(texto) * doc.internal.getFontSize()) / doc.internal.scaleFactor
  const textoX = logoX + (logoWidth - textoWidth) / 2

  doc.text(texto, textoX, textoY)
  // TABLA DE TRES COLUMNAS - 15px a la derecha de la primera imagen
  const tablaX = logoX + logoWidth + 25 // 15px a la derecha de la imagen
  const tablaY = logoY

  // PRIMERA COLUMNA: Imagen (sin líneas internas)
  const imagenFWidth = 25
  const imagenFHeight = 25
  const imagenFX = tablaX
  const imagenFY = tablaY

  // Agregar la imagen de la tabla (usando la imagen obtenida de la API)
  if (imagenF && validarBase64Imagen(imagenF)) {
    try {
      const imageData = `data:image/png;base64,${imagenF}`
      doc.addImage(imageData, 'PNG', imagenFX, imagenFY, imagenFWidth, imagenFHeight)
      console.log('✅ Imagen de tabla agregada desde API')
    } catch (error) {
      console.warn('⚠️ Error al cargar imagen de API, usando placeholder:', error)
      agregarPlaceholderImagen(doc, imagenFX, imagenFY, imagenFWidth, imagenFHeight, 'Imagen Final')
    }
  } else {
    console.log('ℹ️ Usando placeholder para imagen de tabla')
    agregarPlaceholderImagen(doc, imagenFX, imagenFY, imagenFWidth, imagenFHeight, 'Imagen Final')
  }

  // SEGUNDA COLUMNA: Etiquetas (a la derecha de la imagen de la tabla)
  const labelsX = imagenFX + imagenFWidth + 5 // Margen pequeño a la derecha de la imagen
  let currentY = tablaY

  // Función para obtener fecha actual en formato dd/mm/aaaa
  function obtenerFechaActual() {
    const hoy = new Date()
    const dia = String(hoy.getDate()).padStart(2, '0')
    const mes = String(hoy.getMonth() + 1).padStart(2, '0')
    const año = hoy.getFullYear()
    return `${dia}/${mes}/${año}`
  }

  // Color de fondo para toda la columna
  doc.setFillColor(220, 220, 220)
  doc.rect(labelsX - 3, currentY - 2, 25, 30, 'F')

  // Primera fila - Fecha
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Fecha', labelsX, currentY + 5)

  // Segunda fila - Pedido
  doc.text('Pedido', labelsX, currentY + 12)

  // Tercera fila - No. orden
  doc.text('No. orden', labelsX, currentY + 19)
  // TERCERA COLUMNA: Valores (a la derecha de las etiquetas)
  const valuesX = labelsX + 25 // Espacio suficiente para las etiquetas
  currentY = tablaY

  // Primera fila - Valor fecha (usando la función)
  doc.setFont('helvetica', 'bold')
  doc.text(obtenerFechaActual(), valuesX, currentY + 5)

  // Segunda fila - Valor pedido (puedes reemplazar con tu variable)
  const pedidoValor = producto.no_pedido_id || '-' // Reemplaza con tu variable real
  doc.text(pedidoValor, valuesX, currentY + 12)

  // Tercera fila - Valor No. orden (usando el no_orden de la API)
  const ordenValor = producto.no_orden || '-'
  doc.text(ordenValor, valuesX, currentY + 19)

  // Borde general alrededor de toda la tabla de tres columnas
  const sectionWidth = valuesX + 35 - imagenFX // Ancho total desde imagen de tabla hasta el final de los valores
  const sectionHeight = 28 // Altura fija para las 3 filas
  doc.rect(imagenFX - 2, imagenFY - 2, sectionWidth, sectionHeight)

  // Bordes internos verticales para separar las columnas (SOLO entre columna 2 y 3)
  doc.line(labelsX + 22, imagenFY - 2, labelsX + 22, imagenFY + sectionHeight - 2) // Línea entre etiquetas y valores

  // Bordes internos horizontales para separar las filas (SOLO en columnas 2 y 3)
  doc.line(labelsX - 2, imagenFY + 7, imagenFX + sectionWidth - 2, imagenFY + 7) // Línea después de primera fila
  doc.line(labelsX - 2, imagenFY + 14, imagenFX + sectionWidth - 2, imagenFY + 14) // Línea después de segunda fila
  doc.line(
    imagenFX + imagenFWidth + 2,
    imagenFY - 2,
    imagenFX + imagenFWidth + 2,
    imagenFY + sectionHeight - 2,
  )

  // TABLA DE 4 COLUMNAS - Debajo de la tabla anterior
  const tabla4X = imagenFX // Misma posición X que la tabla anterior
  const tabla4Y = imagenFY + sectionHeight + 0 // 5px debajo de la tabla anterior

  // Configuración de la tabla de 4 columnas
  const tabla4Width = sectionWidth // Mismo ancho que la tabla anterior
  const tabla4Height = 11 // Altura para 2 filas
  const col4Width = tabla4Width / 4 // Ancho de cada columna

  // Campos para la primera fila
  const campos = ['Ventas', 'Diseño', 'Logística', 'Planeación']

  // Dibujar borde exterior de la tabla
  doc.rect(tabla4X - 2, tabla4Y - 2, tabla4Width, tabla4Height)

  // Primera fila - Campos con color de fondo
  campos.forEach((campo, i) => {
    const colX = tabla4X - 2 + i * col4Width

    // Celda de la primera fila con color de fondo
    doc.setFillColor(220, 220, 220)
    doc.rect(colX, tabla4Y - 2, col4Width, tabla4Height / 2, 'F')

    // Borde de la celda
    doc.rect(colX, tabla4Y - 2, col4Width, tabla4Height / 2)

    // Texto centrado en cada celda
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    const textoWidth =
      (doc.getStringUnitWidth(campo) * doc.internal.getFontSize()) / doc.internal.scaleFactor
    const textoX = colX + (col4Width - textoWidth) / 2
    doc.text(campo, textoX, tabla4Y - 2 + 5)
  })

  // Segunda fila - Vacía
  for (let i = 0; i < 4; i++) {
    const colX = tabla4X - 2 + i * col4Width

    // Celda de la segunda fila
    doc.rect(colX, tabla4Y - 2 + tabla4Height / 2, col4Width, tabla4Height / 2)
  }

  // Línea horizontal que separa las 2 filas
  doc.line(
    tabla4X - 2,
    tabla4Y - 2 + tabla4Height / 2,
    tabla4X - 2 + tabla4Width,
    tabla4Y - 2 + tabla4Height / 2,
  )

  // Líneas verticales entre columnas
  for (let i = 1; i < 4; i++) {
    const lineX = tabla4X - 2 + i * col4Width
    doc.line(lineX, tabla4Y - 2, lineX, tabla4Y - 2 + tabla4Height)
  }

  // TERCERA SECCIÓN (Cantidad) - CON DATOS REALES
  let startYCantidad = startYTipo + heightTipo + 9 + 5
  // Cantidad
  let widthCantidad = 40
  let heightCantidad = 6
  doc.setFillColor(200, 200, 200)
  doc.rect(startX, startYCantidad, widthCantidad, heightCantidad, 'F')
  doc.rect(startX, startYCantidad, widthCantidad, heightCantidad)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Cantidad', startX + 2, startYCantidad + 5)

  // Pedido Real Producción - DATOS REALES
  doc.rect(startX, startYCantidad + heightCantidad, widthCantidad, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)

  const cantidadPedido = producto.cantidad?.toString() || ''
  const piezas = producto.piezas?.toString() || ''

  doc.text('Pedido  Produccion', startX + 2, startYCantidad + heightCantidad + 4)
  doc.text(`${piezas} |    | ${cantidadPedido}`, startX + 2, startYCantidad + heightCantidad + 7)
  // Recibidas
  let startXRecibidas = startX + widthCantidad + 2
  let widthRecibidas = 25
  doc.setFillColor(200, 200, 200)
  doc.rect(startXRecibidas, startYCantidad, widthRecibidas, 6, 'F')
  doc.rect(startXRecibidas, startYCantidad, widthRecibidas, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Recibidas', startXRecibidas + 2, startYCantidad + 5)

  doc.rect(startXRecibidas, startYCantidad + 6, widthRecibidas, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXRecibidas + 2, startYCantidad + 6 + 7)

  // Agregar imagen antes de Metida
  let startXImagenCantidad = startXRecibidas + widthRecibidas + 1
  let widthImagenCantidad = 5
  let heightImagenCantidad = 15

  // Cargar y agregar la imagen
  try {
    doc.addImage(
      '/imagen/image.png',
      'PNG',
      startXImagenCantidad,
      startYCantidad,
      widthImagenCantidad,
      heightImagenCantidad,
    )
  } catch (e) {
    console.warn('No se pudo cargar imagen de separador:', e)
  }

  // Ajustar la posición de Metida después de la imagen
  let startXMetida = startXImagenCantidad + widthImagenCantidad + 0
  let widthMetida = 20
  doc.setFillColor(200, 200, 200)
  doc.rect(startXMetida, startYCantidad, widthMetida, 6, 'F')
  doc.rect(startXMetida, startYCantidad, widthMetida, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Medidas', startXMetida + 1, startYCantidad + 4)

  doc.rect(startXMetida, startYCantidad + 6, widthMetida, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXMetida + 2, startYCantidad + 6 + 7)

  // Certificado Calidad
  let startXCertificado = startXMetida + widthMetida + 2
  let widthCertificado = 20
  doc.setFillColor(200, 200, 200)
  doc.rect(startXCertificado, startYCantidad, widthCertificado, 6, 'F')
  doc.rect(startXCertificado, startYCantidad, widthCertificado, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Resistencia', startXCertificado + 1, startYCantidad + 4)

  doc.rect(startXCertificado, startYCantidad + 6, widthCertificado, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXCertificado + 2, startYCantidad + 6 + 7)

  // Autorización Recepción Calidad
  let startXAuthRec = startXCertificado + widthCertificado + 2
  let widthAuthRec = 30
  doc.setFillColor(200, 200, 200)
  doc.rect(startXAuthRec, startYCantidad, widthAuthRec, 6, 'F')
  doc.rect(startXAuthRec, startYCantidad, widthAuthRec, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.text('Certificado Calidad', startXAuthRec + 1, startYCantidad + 4)

  doc.rect(startXAuthRec, startYCantidad + 6, widthAuthRec, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXAuthRec + 2, startYCantidad + 6 + 7)

  // Autorización Planeación
  let startXAuthPlan = startXAuthRec + widthAuthRec + 2
  let widthAuthPlan = 30
  doc.setFillColor(200, 200, 200)
  doc.rect(startXAuthPlan, startYCantidad, widthAuthPlan, 6, 'F')
  doc.rect(startXAuthPlan, startYCantidad, widthAuthPlan, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Autorización', startXAuthPlan + 2, startYCantidad + 3)
  doc.text('Recepción', startXAuthPlan + 2, startYCantidad + 5.5)

  doc.rect(startXAuthPlan, startYCantidad + 6, widthAuthPlan, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXAuthPlan + 2, startYCantidad + 6 + 7)

  // Autorización Recepción (al lado derecho de Autorización Planeación)
  let startXAuthRecepcion = startXAuthPlan + widthAuthPlan + 2
  let widthAuthRecepcion = 30
  doc.setFillColor(200, 200, 200)
  doc.rect(startXAuthRecepcion, startYCantidad, widthAuthRecepcion, 6, 'F')
  doc.rect(startXAuthRecepcion, startYCantidad, widthAuthRecepcion, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Autorización', startXAuthRecepcion + 2, startYCantidad + 3)
  doc.text('Planeación', startXAuthRecepcion + 2, startYCantidad + 5.5)

  doc.rect(startXAuthRecepcion, startYCantidad + 6, widthAuthRecepcion, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXAuthRecepcion + 2, startYCantidad + 6 + 7)

  // CUARTA SECCIÓN (Impresión)
  let startYImpresion = startYCantidad + heightCantidad + 9 + 5

  // Impresión
  let widthImpresion = 40
  let heightImpresion = 6
  doc.setFillColor(200, 200, 200)
  doc.rect(startX, startYImpresion, widthImpresion, heightImpresion, 'F')
  doc.rect(startX, startYImpresion, widthImpresion, heightImpresion)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Impresión', startX + 2, startYImpresion + 5)

  // Máquina
  doc.rect(startX, startYImpresion + heightImpresion, widthImpresion, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startX + 2, startYImpresion + heightImpresion + 7)

  // Grabado - DATO REAL
  let startXGrabado = startX + widthImpresion + 1
  let widthGrabado = 16
  doc.setFillColor(200, 200, 200)
  doc.rect(startXGrabado, startYImpresion, widthGrabado, 6, 'F')
  doc.rect(startXGrabado, startYImpresion, widthGrabado, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.text('Grabado', startXGrabado + 2, startYImpresion + 5)

  doc.rect(startXGrabado, startYImpresion + 6, widthGrabado, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  const textoGrabado = producto.grabado || ' '
  doc.text(textoGrabado, startXGrabado + 2, startYImpresion + 6 + 7)

  // Tintas - Columna con DOS filas - DATOS REALES
  let startXTintas = startXGrabado + widthGrabado + 2
  let widthTintas = 60 // Ancho mayor para las 4 columnas internas
  let filaAltosTintas = [6, 9] // Solo dos filas: título y tintas (GCMI + nombre)

  // Fila 1: Título "Tintas"
  doc.setFillColor(200, 200, 200)
  doc.rect(startXTintas, startYImpresion, widthTintas, filaAltosTintas[0], 'F')
  doc.rect(startXTintas, startYImpresion, widthTintas, filaAltosTintas[0])
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Tintas', startXTintas + 25, startYImpresion + 4)

  // Fila 2: GCMI y nombre de tintas en una fila más alta
  let tintasCompletas = []
  if (producto.tintas && producto.nombres_tintas) {
    for (let i = 0; i < Math.min(4, producto.tintas.length); i++) {
      tintasCompletas.push({
        gcmi: producto.tintas[i] || '',
        nombre: producto.nombres_tintas[i] || '',
      })
    }
  }
  // Completar con objetos vacíos si hay menos de 4 tintas
  while (tintasCompletas.length < 4) {
    tintasCompletas.push({ gcmi: '', nombre: '' })
  }

  let colWidthTintas = widthTintas / tintasCompletas.length

  tintasCompletas.forEach((tinta, i) => {
    doc.rect(
      startXTintas + i * colWidthTintas,
      startYImpresion + filaAltosTintas[0],
      colWidthTintas,
      filaAltosTintas[1],
    )

    // GCMI (primera línea - negrita)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
    doc.text(
      tinta.gcmi,
      startXTintas + i * colWidthTintas + 2,
      startYImpresion + filaAltosTintas[0] + 3,
    )

    // Nombre (segunda línea - normal)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6)
    doc.text(
      tinta.nombre,
      startXTintas + i * colWidthTintas + 2,
      startYImpresion + filaAltosTintas[0] + 7,
    )
  })

  let startXImagenImpresion = startXTintas + widthTintas + 1
  let widthImagenImpresion = 5
  let heightImagenImpresion = 15
  // Cargar y agregar la imagen
  try {
    doc.addImage(
      '/imagen/image.png',
      'PNG',
      startXImagenImpresion,
      startYImpresion,
      widthImagenImpresion,
      heightImagenImpresion,
    )
  } catch (e) {
    console.warn('No se pudo cargar imagen de separador:', e)
  }

  let startXTono = startXImagenImpresion + widthImagenImpresion + 0

  // Columna 1: Tono
  let widthTono = 10
  doc.setFillColor(200, 200, 200)
  doc.rect(startXTono, startYImpresion, widthTono, 6, 'F')
  doc.rect(startXTono, startYImpresion, widthTono, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6)
  doc.text('Tono', startXTono + 1, startYImpresion + 5)

  doc.rect(startXTono, startYImpresion + 6, widthTono, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXTono + 2, startYImpresion + 6 + 7)

  // Columna 2: Medidas
  let startXMedidas = startXTono + widthTono + 1
  let widthMedidasCol = 10
  doc.setFillColor(200, 200, 200)
  doc.rect(startXMedidas, startYImpresion, widthMedidasCol, 6, 'F')
  doc.rect(startXMedidas, startYImpresion, widthMedidasCol, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6)
  doc.text('Medidas', startXMedidas + 1, startYImpresion + 5)

  doc.rect(startXMedidas, startYImpresion + 6, widthMedidasCol, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXMedidas + 2, startYImpresion + 6 + 7)

  // Columna 3: Vacío
  let startXVacio = startXMedidas + widthMedidasCol + 1
  let widthVacio = 10
  doc.setFillColor(200, 200, 200)
  doc.rect(startXVacio, startYImpresion, widthVacio, 6, 'F')
  doc.rect(startXVacio, startYImpresion, widthVacio, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.text('', startXVacio + 1, startYImpresion + 5)

  doc.rect(startXVacio, startYImpresion + 6, widthVacio, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXVacio + 2, startYImpresion + 6 + 7)

  // Autorización Impresión Calidad
  let startXAuthImpresion = startXVacio + widthVacio + 1
  let widthAuthImpresion = 36
  doc.setFillColor(200, 200, 200)
  doc.rect(startXAuthImpresion, startYImpresion, widthAuthImpresion, 6, 'F')
  doc.rect(startXAuthImpresion, startYImpresion, widthAuthImpresion, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Autorización', startXAuthImpresion + 2, startYImpresion + 3)
  doc.text('Impresión Calidad', startXAuthImpresion + 2, startYImpresion + 6)

  doc.rect(startXAuthImpresion, startYImpresion + 6, widthAuthImpresion, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXAuthImpresion + 2, startYImpresion + 6 + 7)

  // Merma - Columna con 3 filas
  let startXMerma = startXAuthImpresion + widthAuthImpresion + 1
  let widthMerma = 16
  let filaAltosMerma = [5, 5, 5] // Alto de cada fila: título, número, porcentaje

  // Fila 1: Título "Merma"
  doc.setFillColor(200, 200, 200)
  doc.rect(startXMerma, startYImpresion, widthMerma, filaAltosMerma[0], 'F')
  doc.rect(startXMerma, startYImpresion, widthMerma, filaAltosMerma[0])
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Merma', startXMerma + 2, startYImpresion + 5)

  // Fila 2: Número
  doc.rect(startXMerma, startYImpresion + filaAltosMerma[0], widthMerma, filaAltosMerma[1])
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXMerma + 2, startYImpresion + filaAltosMerma[0] + 4.5)

  // Fila 3: Número con %
  doc.rect(
    startXMerma,
    startYImpresion + filaAltosMerma[0] + filaAltosMerma[1],
    widthMerma,
    filaAltosMerma[2],
  )
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('% ', startXMerma + 12, startYImpresion + filaAltosMerma[0] + filaAltosMerma[1] + 4.5)

  // Total Entregadas (entre Merma y Firma Operador)
  let startXTotalEntregadas = startXMerma + widthMerma + 1
  let widthTotalEntregadas = 40
  doc.setFillColor(200, 200, 200)
  doc.rect(startXTotalEntregadas, startYImpresion, widthTotalEntregadas, 6, 'F')
  doc.rect(startXTotalEntregadas, startYImpresion, widthTotalEntregadas, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Total Entregadas', startXTotalEntregadas + 2, startYImpresion + 5)

  doc.rect(startXTotalEntregadas, startYImpresion + 6, widthTotalEntregadas, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(' ', startXTotalEntregadas + 2, startYImpresion + 6 + 7)

  // Firma Operador
  let startXFirmaOp = startXTotalEntregadas + widthTotalEntregadas + 1
  let widthFirmaOp = 40
  doc.setFillColor(200, 200, 200)
  doc.rect(startXFirmaOp, startYImpresion, widthFirmaOp, 6, 'F')
  doc.rect(startXFirmaOp, startYImpresion, widthFirmaOp, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Firma Operador', startXFirmaOp + 2, startYImpresion + 5)

  doc.rect(startXFirmaOp, startYImpresion + 6, widthFirmaOp, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(' ', startXFirmaOp + 2, startYImpresion + 6 + 7)

  // QUINTA SECCIÓN (Slotter o Suaje)
  let startYSlotter = startYImpresion + 15 + 5

  // Slotter o Suaje
  let widthSlotter = 40
  let heightSlotter = 6
  doc.setFillColor(200, 200, 200)
  doc.rect(startX, startYSlotter, widthSlotter, heightSlotter, 'F')
  doc.rect(startX, startYSlotter, widthSlotter, heightSlotter)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Slotter o Suaje', startX + 2, startYSlotter + 5)

  // Medidas Internas
  doc.rect(startX, startYSlotter + heightSlotter, widthSlotter, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startX + 2, startYSlotter + heightSlotter + 7)

  // Función para verificar si el tipo es exactamente Ranurada
  function esTipoRanurada(tipo) {
    return tipo && tipo.trim().toLowerCase() === 'ranurada'
  }

  // Inicializar variables aquí para que estén disponibles en todo el scope
  let startXSuaje = startX + widthSlotter + 1
  let widthSuaje = 14

  // Variable para controlar la posición después de Suaje
  let startXDespuesSuaje = startXSuaje + widthSuaje + 1

  // Solo mostrar estas secciones si el tipo es exactamente Ranurada
  if (esTipoRanurada(producto.tipo)) {
    // Tabla Medidas Internas - DATOS REALES
    let startXMedidasSlotter = startX + widthSlotter + 1
    let widthMedidasSlotter = 45
    doc.setFillColor(220, 220, 220)
    doc.rect(startXMedidasSlotter, startYSlotter, widthMedidasSlotter, 5, 'F')
    doc.rect(startXMedidasSlotter, startYSlotter, widthMedidasSlotter, 5)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.text('Medidas Internas', startXMedidasSlotter + 2, startYSlotter + 4.5)

    // Tabla de medidas - DATOS REALES
    let colsMedidasSlotter = ['Largo', 'Ancho', 'Alto', 'Caja']
    let colWidthMedidasSlotter = widthMedidasSlotter / colsMedidasSlotter.length
    let valoresMedidasSlotter = [
      producto.largo_int?.toString() || '450',
      producto.ancho_int?.toString() || '240',
      producto.alto_int?.toString() || '200',
      producto.ceja?.toString() || '35',
    ]

    // Encabezados
    colsMedidasSlotter.forEach((texto, i) => {
      doc.rect(
        startXMedidasSlotter + i * colWidthMedidasSlotter,
        startYSlotter + 5,
        colWidthMedidasSlotter,
        5,
      )
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.text(
        texto,
        startXMedidasSlotter + i * colWidthMedidasSlotter + 2,
        startYSlotter + 5 + 4.5,
      )
    })

    // Valores
    valoresMedidasSlotter.forEach((texto, i) => {
      doc.rect(
        startXMedidasSlotter + i * colWidthMedidasSlotter,
        startYSlotter + 10,
        colWidthMedidasSlotter,
        5,
      )
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.text(
        texto,
        startXMedidasSlotter + i * colWidthMedidasSlotter + 2,
        startYSlotter + 10 + 4.5,
      )
    })

    // Actualizar startXSuaje para que esté después de la tabla de medidas
    startXSuaje = startXMedidasSlotter + widthMedidasSlotter + 1

    // Marcas - DATO REAL
    let startXMarcasSlotter = startXSuaje + widthSuaje + 1
    let widthMarcasSlotter = 25
    doc.setFillColor(200, 200, 200)
    doc.rect(startXMarcasSlotter, startYSlotter, widthMarcasSlotter, 6, 'F')
    doc.rect(startXMarcasSlotter, startYSlotter, widthMarcasSlotter, 6)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.text('Marcas', startXMarcasSlotter + 2, startYSlotter + 5)

    doc.rect(startXMarcasSlotter, startYSlotter + 6, widthMarcasSlotter, 9)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text(textoMarcas, startXMarcasSlotter + 2, startYSlotter + 6 + 7)

    // Actualizar la posición después de Suaje para incluir las Marcas
    startXDespuesSuaje = startXMarcasSlotter + widthMarcasSlotter + 1
  }

  // Suaje (siempre se muestra)
  doc.setFillColor(200, 200, 200)
  doc.rect(startXSuaje, startYSlotter, widthSuaje, 6, 'F')
  doc.rect(startXSuaje, startYSlotter, widthSuaje, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Suaje', startXSuaje + 2, startYSlotter + 5)

  doc.rect(startXSuaje, startYSlotter + 6, widthSuaje, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXSuaje + 2, startYSlotter + 6 + 7)

  // Agregar imagen - usar startXDespuesSuaje que se ajusta según si es Ranurada o no
  let startXImagenSlotter = startXDespuesSuaje
  let widthImagenSlotter = 5
  let heightImagenSlotter = 15

  // Cargar y agregar la imagen
  try {
    doc.addImage(
      '/imagen/image.png',
      'PNG',
      startXImagenSlotter,
      startYSlotter,
      widthImagenSlotter,
      heightImagenSlotter,
    )
  } catch (e) {
    console.warn('No se pudo cargar imagen de separador:', e)
  }

  // Después de la imagen - 3 columnas pequeñas
  let startXTonoSlotter = startXImagenSlotter + widthImagenSlotter + 0

  // Columna 1: Medidas
  let widthTonoSlotter = 10
  doc.setFillColor(200, 200, 200)
  doc.rect(startXTonoSlotter, startYSlotter, widthTonoSlotter, 6, 'F')
  doc.rect(startXTonoSlotter, startYSlotter, widthTonoSlotter, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6)
  doc.text('Medidas', startXTonoSlotter + 1, startYSlotter + 5)

  doc.rect(startXTonoSlotter, startYSlotter + 6, widthTonoSlotter, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXTonoSlotter + 2, startYSlotter + 6 + 7)

  // Columna 2: Cuadre
  let startXMedidasSlotter2 = startXTonoSlotter + widthTonoSlotter + 1
  let widthMedidasColSlotter = 10
  doc.setFillColor(200, 200, 200)
  doc.rect(startXMedidasSlotter2, startYSlotter, widthMedidasColSlotter, 6, 'F')
  doc.rect(startXMedidasSlotter2, startYSlotter, widthMedidasColSlotter, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6)
  doc.text('Cuadre', startXMedidasSlotter2 + 1, startYSlotter + 5)

  doc.rect(startXMedidasSlotter2, startYSlotter + 6, widthMedidasColSlotter, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXMedidasSlotter2 + 2, startYSlotter + 6 + 7)

  // Columna 3: Marcas
  let startXVacioSlotter = startXMedidasSlotter2 + widthMedidasColSlotter + 1
  let widthVacioSlotter = 10
  doc.setFillColor(200, 200, 200)
  doc.rect(startXVacioSlotter, startYSlotter, widthVacioSlotter, 6, 'F')
  doc.rect(startXVacioSlotter, startYSlotter, widthVacioSlotter, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.text('Marcas', startXVacioSlotter + 1, startYSlotter + 5)

  doc.rect(startXVacioSlotter, startYSlotter + 6, widthVacioSlotter, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXVacioSlotter + 2, startYSlotter + 6 + 7)

  // Autorización Slotter / Suaje Calidad (después de las 3 columnas)
  let startXAuthSlotter = startXVacioSlotter + widthVacioSlotter + 2
  let widthAuthSlotter = 32
  doc.setFillColor(200, 200, 200)
  doc.rect(startXAuthSlotter, startYSlotter, widthAuthSlotter, 6, 'F')
  doc.rect(startXAuthSlotter, startYSlotter, widthAuthSlotter, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.text('Autorización', startXAuthSlotter + 1, startYSlotter + 3)
  doc.text('Slotter / Suaje Calidad', startXAuthSlotter + 1, startYSlotter + 6)

  doc.rect(startXAuthSlotter, startYSlotter + 6, widthAuthSlotter, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXAuthSlotter + 2, startYSlotter + 6 + 7)

  // Merma Slotter
  let startXMermaSlotter = startXAuthSlotter + widthAuthSlotter + 1
  let widthMermaSlotter = 16
  let filaAltosMermaSlotter = [5, 5, 5]

  // Fila 1: Título "Merma"
  doc.setFillColor(200, 200, 200)
  doc.rect(startXMermaSlotter, startYSlotter, widthMermaSlotter, filaAltosMermaSlotter[0], 'F')
  doc.rect(startXMermaSlotter, startYSlotter, widthMermaSlotter, filaAltosMermaSlotter[0])
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Merma', startXMermaSlotter + 2, startYSlotter + 5)

  // Fila 2: Número
  doc.rect(
    startXMermaSlotter,
    startYSlotter + filaAltosMermaSlotter[0],
    widthMermaSlotter,
    filaAltosMermaSlotter[1],
  )
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXMermaSlotter + 2, startYSlotter + filaAltosMermaSlotter[0] + 4.5)

  // Fila 3: Número con %
  doc.rect(
    startXMermaSlotter,
    startYSlotter + filaAltosMermaSlotter[0] + filaAltosMermaSlotter[1],
    widthMermaSlotter,
    filaAltosMermaSlotter[2],
  )
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(
    '% ',
    startXMermaSlotter + 2,
    startYSlotter + filaAltosMermaSlotter[0] + filaAltosMermaSlotter[1] + 4.5,
  )

  // Total Entregadas Slotter
  let startXTotalSlotter = startXMermaSlotter + widthMermaSlotter + 1
  let widthTotalSlotter = 38
  doc.setFillColor(200, 200, 200)
  doc.rect(startXTotalSlotter, startYSlotter, widthTotalSlotter, 6, 'F')
  doc.rect(startXTotalSlotter, startYSlotter, widthTotalSlotter, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Total Entregadas', startXTotalSlotter + 2, startYSlotter + 5)

  doc.rect(startXTotalSlotter, startYSlotter + 6, widthTotalSlotter, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(' ', startXTotalSlotter + 2, startYSlotter + 6 + 7)

  // Firma Operador Slotter
  let startXFirmaSlotter = startXTotalSlotter + widthTotalSlotter + 1
  let widthFirmaSlotter = 37
  doc.setFillColor(200, 200, 200)
  doc.rect(startXFirmaSlotter, startYSlotter, widthFirmaSlotter, 6, 'F')
  doc.rect(startXFirmaSlotter, startYSlotter, widthFirmaSlotter, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Firma Operador', startXFirmaSlotter + 2, startYSlotter + 5)

  doc.rect(startXFirmaSlotter, startYSlotter + 6, widthFirmaSlotter, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXFirmaSlotter + 2, startYSlotter + 6 + 7)
  // SEXTA SECCIÓN (Pegado)
  let startYPegado = startYSlotter + 15 + 5

  // Pegado
  let widthPegado = 40
  let heightPegado = 6
  doc.setFillColor(200, 200, 200)
  doc.rect(startX, startYPegado, widthPegado, heightPegado, 'F')
  doc.rect(startX, startYPegado, widthPegado, heightPegado)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Pegado', startX + 2, startYPegado + 5)

  // Descripción Pegado
  doc.rect(startX, startYPegado + heightPegado, widthPegado, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startX + 2, startYPegado + heightPegado + 7)

  // PRIMERA PARTE - Pegado inicial
  let startXPegadoInicial = startX + widthPegado + 1
  let widthPegadoInicial = 25
  doc.setFillColor(200, 200, 200)
  doc.rect(startXPegadoInicial, startYPegado, widthPegadoInicial, 6, 'F')
  doc.rect(startXPegadoInicial, startYPegado, widthPegadoInicial, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Tipo', startXPegadoInicial + 2, startYPegado + 5)

  doc.rect(startXPegadoInicial, startYPegado + 6, widthPegadoInicial, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXPegadoInicial + 2, startYPegado + 6 + 7)

  // Imagen entre Pegado y Empaque
  let startXImagenPegado = startXPegadoInicial + widthPegadoInicial + 1
  let widthImagenPegado = 5
  let heightImagenPegado = 15

  // Cargar y agregar la imagen
  try {
    doc.addImage(
      '/imagen/image.png',
      'PNG',
      startXImagenPegado,
      startYPegado,
      widthImagenPegado,
      heightImagenPegado,
    )
  } catch (e) {
    console.warn('No se pudo cargar imagen de separador:', e)
  }

  // Empaque (después de la imagen)
  let startXEmpaque = startXImagenPegado + widthImagenPegado + 0
  let widthEmpaque = 10
  doc.setFillColor(200, 200, 200)
  doc.rect(startXEmpaque, startYPegado, widthEmpaque, 6, 'F')
  doc.rect(startXEmpaque, startYPegado, widthEmpaque, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.text('Cuadre', startXEmpaque + 0, startYPegado + 5)

  doc.rect(startXEmpaque, startYPegado + 6, widthEmpaque, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.text('', startXEmpaque + 2, startYPegado + 6 + 7)

  let startXPaqTar = startXEmpaque + widthEmpaque + 1
  let widthPaqTar = 13
  doc.setFillColor(200, 200, 200)
  doc.rect(startXPaqTar, startYPegado, widthPaqTar, 6, 'F')
  doc.rect(startXPaqTar, startYPegado, widthPaqTar, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.text('Desgarre', startXPaqTar + 0, startYPegado + 5)

  doc.rect(startXPaqTar, startYPegado + 6, widthPaqTar, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.text('', startXPaqTar + 2, startYPegado + 6 + 7)

  let startXCantTar = startXPaqTar + widthPaqTar + 1
  let widthCantTar = 12
  doc.setFillColor(200, 200, 200)
  doc.rect(startXCantTar, startYPegado, widthCantTar, 6, 'F')
  doc.rect(startXCantTar, startYPegado, widthCantTar, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.text('Marcas', startXCantTar + 0, startYPegado + 5)

  doc.rect(startXCantTar, startYPegado + 6, widthCantTar, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXCantTar + 2, startYPegado + 6 + 7)

  // Autorización Pegado Calidad (después de las 3 columnas pequeñas)
  let startXAuthPegadoFinal = startXCantTar + widthCantTar + 1
  let widthAuthPegadoFinal = 30
  doc.setFillColor(200, 200, 200)
  doc.rect(startXAuthPegadoFinal, startYPegado, widthAuthPegadoFinal, 6, 'F')
  doc.rect(startXAuthPegadoFinal, startYPegado, widthAuthPegadoFinal, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Autorización', startXAuthPegadoFinal + 1, startYPegado + 3)
  doc.text('Pegado Calidad', startXAuthPegadoFinal + 1, startYPegado + 6)

  doc.rect(startXAuthPegadoFinal, startYPegado + 6, widthAuthPegadoFinal, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXAuthPegadoFinal + 2, startYPegado + 6 + 7)

  // Entre Autorización y Merma - 3 columnas pequeñas
  let startXEmpaqueTabla = startXAuthPegadoFinal + widthAuthPegadoFinal + 1

  // Columna 1: Empaque
  let widthEmpaqueTabla = 19
  doc.setFillColor(200, 200, 200)
  doc.rect(startXEmpaqueTabla, startYPegado, widthEmpaqueTabla, 6, 'F')
  doc.rect(startXEmpaqueTabla, startYPegado, widthEmpaqueTabla, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Empaque', startXEmpaqueTabla + 2, startYPegado + 5)

  doc.rect(startXEmpaqueTabla, startYPegado + 6, widthEmpaqueTabla, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXEmpaqueTabla + 2, startYPegado + 6 + 7)

  // Columna 2: Paq. x Tar
  let startXPaqTarTabla = startXEmpaqueTabla + widthEmpaqueTabla + 1
  let widthPaqTarTabla = 18
  doc.setFillColor(200, 200, 200)
  doc.rect(startXPaqTarTabla, startYPegado, widthPaqTarTabla, 6, 'F')
  doc.rect(startXPaqTarTabla, startYPegado, widthPaqTarTabla, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Paq. x Tar', startXPaqTarTabla + 2, startYPegado + 5)

  doc.rect(startXPaqTarTabla, startYPegado + 6, widthPaqTarTabla, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXPaqTarTabla + 2, startYPegado + 6 + 7)

  // Columna 3: Cant x Tar
  let startXCantTarTabla = startXPaqTarTabla + widthPaqTarTabla + 1
  let widthCantTarTabla = 18
  doc.setFillColor(200, 200, 200)
  doc.rect(startXCantTarTabla, startYPegado, widthCantTarTabla, 6, 'F')
  doc.rect(startXCantTarTabla, startYPegado, widthCantTarTabla, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Cant x Tar', startXCantTarTabla + 2, startYPegado + 5)

  doc.rect(startXCantTarTabla, startYPegado + 6, widthCantTarTabla, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  const cantTarima = producto.cantidad_tarima

  doc.text((cantTarima || '').toString(), startXCantTarTabla + 2, startYPegado + 6 + 7)
  // Merma Pegado (después de las 3 columnas)
  let startXMermaPegado = startXCantTarTabla + widthCantTarTabla + 1
  let widthMermaPegado = 16
  let filaAltosMermaPegado = [5, 5, 5]

  // Fila 1: Título "Merma"
  doc.setFillColor(200, 200, 200)
  doc.rect(startXMermaPegado, startYPegado, widthMermaPegado, filaAltosMermaPegado[0], 'F')
  doc.rect(startXMermaPegado, startYPegado, widthMermaPegado, filaAltosMermaPegado[0])
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Merma', startXMermaPegado + 2, startYPegado + 5)

  // Fila 2: Número
  doc.rect(
    startXMermaPegado,
    startYPegado + filaAltosMermaPegado[0],
    widthMermaPegado,
    filaAltosMermaPegado[1],
  )
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXMermaPegado + 2, startYPegado + filaAltosMermaPegado[0] + 4.5)

  // Fila 3: Número con %
  doc.rect(
    startXMermaPegado,
    startYPegado + filaAltosMermaPegado[0] + filaAltosMermaPegado[1],
    widthMermaPegado,
    filaAltosMermaPegado[2],
  )
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(
    '% ',
    startXMermaPegado + 2,
    startYPegado + filaAltosMermaPegado[0] + filaAltosMermaPegado[1] + 4.5,
  )

  // Total Entregadas Pegado
  let startXTotalPegado = startXMermaPegado + widthMermaPegado + 1
  let widthTotalPegado = 40
  doc.setFillColor(200, 200, 200)
  doc.rect(startXTotalPegado, startYPegado, widthTotalPegado, 6, 'F')
  doc.rect(startXTotalPegado, startYPegado, widthTotalPegado, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Total Entregadas', startXTotalPegado + 2, startYPegado + 5)

  doc.rect(startXTotalPegado, startYPegado + 6, widthTotalPegado, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(' ', startXTotalPegado + 2, startYPegado + 6 + 7)

  // Firma Operador Pegado
  let startXFirmaPegado = startXTotalPegado + widthTotalPegado + 1
  let widthFirmaPegado = 36
  doc.setFillColor(200, 200, 200)
  doc.rect(startXFirmaPegado, startYPegado, widthFirmaPegado, 6, 'F')
  doc.rect(startXFirmaPegado, startYPegado, widthFirmaPegado, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Firma Operador', startXFirmaPegado + 2, startYPegado + 5)

  doc.rect(startXFirmaPegado, startYPegado + 6, widthFirmaPegado, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXFirmaPegado + 2, startYPegado + 6 + 7)
  // SÉPTIMA SECCIÓN (Armado)
  let startYArmado = startYPegado + 15 + 5
  // Armado
  let widthArmado = 40
  let heightArmado = 6
  doc.setFillColor(200, 200, 200)
  doc.rect(startX, startYArmado, widthArmado, heightArmado, 'F')
  doc.rect(startX, startYArmado, widthArmado, heightArmado)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Armado', startX + 2, startYArmado + 5)

  doc.rect(startX, startYArmado + heightArmado, widthArmado, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startX + 2, startYArmado + heightArmado + 7)

  // Autorización Armado Calidad (entre Armado y Total Entregadas)
  let startXAuthArmado = startX + widthArmado + 1
  let widthAuthArmado = 32
  doc.setFillColor(200, 200, 200)
  doc.rect(startXAuthArmado, startYArmado, widthAuthArmado, 6, 'F')
  doc.rect(startXAuthArmado, startYArmado, widthAuthArmado, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Autorización', startXAuthArmado + 2, startYArmado + 3)
  doc.text('Armado Calidad', startXAuthArmado + 2, startYArmado + 5.5)

  doc.rect(startXAuthArmado, startYArmado + 6, widthAuthArmado, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXAuthArmado + 2, startYArmado + 6 + 7)

  // Total Entregadas Armado
  let startXTotalArmado = startXAuthArmado + widthAuthArmado + 1
  let widthTotalArmado = 25
  doc.setFillColor(200, 200, 200)
  doc.rect(startXTotalArmado, startYArmado, widthTotalArmado, 6, 'F')
  doc.rect(startXTotalArmado, startYArmado, widthTotalArmado, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Total Entregadas', startXTotalArmado + 0, startYArmado + 5)

  doc.rect(startXTotalArmado, startYArmado + 6, widthTotalArmado, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(' ', startXTotalArmado + 2, startYArmado + 6 + 7)

  // Firma Operador Armado
  let startXFirmaArmado = startXTotalArmado + widthTotalArmado + 1
  let widthFirmaArmado = 35
  doc.setFillColor(200, 200, 200)
  doc.rect(startXFirmaArmado, startYArmado, widthFirmaArmado, 6, 'F')
  doc.rect(startXFirmaArmado, startYArmado, widthFirmaArmado, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Firma Operador', startXFirmaArmado + 2, startYArmado + 5)

  doc.rect(startXFirmaArmado, startYArmado + 6, widthFirmaArmado, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXFirmaArmado + 2, startYArmado + 6 + 7)

  // AGREGAR IMAGEN AL LADO DERECHO DE FIRMA OPERADOR ARMADO
  let startXImagenArmado = startXFirmaArmado + widthFirmaArmado + 20
  let widthImagenArmado = 130
  let heightImagenArmado = 75

  // Cargar y agregar la imagen si existe
  if (imagen && validarBase64Imagen(imagen)) {
    try {
      const imageData = `data:image/png;base64,${imagen}`
      doc.addImage(
        imageData,
        'PNG',
        startXImagenArmado,
        startYArmado,
        widthImagenArmado,
        heightImagenArmado,
      )
      console.log('✅ Imagen de suaje agregada desde API')
    } catch (imageError) {
      console.error('Error al cargar imagen en armado:', imageError)
      agregarPlaceholderImagen(
        doc,
        startXImagenArmado,
        startYArmado,
        widthImagenArmado,
        heightImagenArmado,
        'Imagen Suaje',
      )
    }
  } else {
    agregarPlaceholderImagen(
      doc,
      startXImagenArmado,
      startYArmado,
      widthImagenArmado,
      heightImagenArmado,
      'Imagen Suaje',
    )
  }

  // OCTAVA SECCIÓN (Almacén)
  let startYAlmacen = startYArmado + 15 + 5 // 15 = altura total de Armado, 8 = separación

  // Almacén
  let widthAlmacen = 40
  let heightAlmacen = 6
  doc.setFillColor(200, 200, 200)
  doc.rect(startX, startYAlmacen, widthAlmacen, heightAlmacen, 'F')
  doc.rect(startX, startYAlmacen, widthAlmacen, heightAlmacen)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Almacén', startX + 2, startYAlmacen + 5)

  // Recibidas Almacén
  doc.rect(startX, startYAlmacen + heightAlmacen, widthAlmacen, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startX + 2, startYAlmacen + heightAlmacen + 7)

  // Opciones PAQ, TAR, BUL, ATA con círculos - SIN BORDES
  let startXTablaAlmacen = startX + widthAlmacen + 1

  let opcionesAlmacen = ['PAQ', 'TAR', 'BUL', 'ATA']
  opcionesAlmacen.forEach((texto, i) => {
    doc.circle(startXTablaAlmacen + 2, startYAlmacen + i * 4 + 2, 1, 'S')
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text(texto, startXTablaAlmacen + 5, startYAlmacen + i * 4 + 3)
  })

  // Columna de 4 filas con width 7
  let startXColumna = startXTablaAlmacen + 13 // 20 = espacio para las opciones anteriores
  let widthColumna = 7

  // Crear 4 filas
  for (let i = 0; i < 4; i++) {
    doc.rect(startXColumna, startYAlmacen + i * 4, widthColumna, 4)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text('', startXColumna + 1, startYAlmacen + i * 4 + 2.5)
  }

  // Tabla vacía con 10 columnas y 2 filas
  let startXTablaGrande = startXColumna + widthColumna + 1
  let widthTablaGrande = 73 // 10 columnas × 7mm cada una
  let filaAltosTabla = [8, 8] // 2 filas

  let colWidthTabla = widthTablaGrande / 10

  // Fila 1: Encabezados vacíos
  for (let i = 0; i < 10; i++) {
    doc.rect(startXTablaGrande + i * colWidthTabla, startYAlmacen, colWidthTabla, filaAltosTabla[0])
  }

  // Fila 2: Valores vacíos
  for (let i = 0; i < 10; i++) {
    doc.rect(
      startXTablaGrande + i * colWidthTabla,
      startYAlmacen + filaAltosTabla[0],
      colWidthTabla,
      filaAltosTabla[1],
    )
  }
  // OCTAVA SECCIÓN (Autorizaciones Envío)
  let startYAuthEnvio = startYAlmacen + 15 + 5

  // Agregar imagen antes de Certificado
  let startXImagenAuth = startX
  let widthImagenAuth = 5
  let heightImagenAuth = 15

  // Cargar y agregar la imagen
  try {
    doc.addImage(
      '/imagen/image.png',
      'PNG',
      startXImagenAuth,
      startYAuthEnvio,
      widthImagenAuth,
      heightImagenAuth,
    )
  } catch (e) {
    console.warn('No se pudo cargar imagen de separador:', e)
  }

  // Certificado (IZQUIERDA) - después de la imagen
  let startXCertificadoAuth = startXImagenAuth + widthImagenAuth + 0
  let widthCertificadoAuth = 15
  doc.setFillColor(200, 200, 200)
  doc.rect(startXCertificadoAuth, startYAuthEnvio, widthCertificadoAuth, 6, 'F')
  doc.rect(startXCertificadoAuth, startYAuthEnvio, widthCertificadoAuth, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.text('Certificado', startXCertificadoAuth + 0, startYAuthEnvio + 5)

  doc.rect(startXCertificadoAuth, startYAuthEnvio + 6, widthCertificadoAuth, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXCertificadoAuth + 2, startYAuthEnvio + 6 + 7)
  // Etiquetas (IZQUIERDA)
  let startXEtiquetasAuth = startXCertificadoAuth + widthCertificadoAuth + 1
  let widthEtiquetasAuth = 15
  doc.setFillColor(200, 200, 200)
  doc.rect(startXEtiquetasAuth, startYAuthEnvio, widthEtiquetasAuth, 6, 'F')
  doc.rect(startXEtiquetasAuth, startYAuthEnvio, widthEtiquetasAuth, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Etiquetas', startXEtiquetasAuth + 0, startYAuthEnvio + 5)

  doc.rect(startXEtiquetasAuth, startYAuthEnvio + 6, widthEtiquetasAuth, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXEtiquetasAuth + 2, startYAuthEnvio + 6 + 7)
  // Revisión (IZQUIERDA)
  let startXRevisionAuth = startXEtiquetasAuth + widthEtiquetasAuth + 1
  let widthRevisionAuth = 15
  doc.setFillColor(200, 200, 200)
  doc.rect(startXRevisionAuth, startYAuthEnvio, widthRevisionAuth, 6, 'F')
  doc.rect(startXRevisionAuth, startYAuthEnvio, widthRevisionAuth, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Revisión', startXRevisionAuth + 0, startYAuthEnvio + 5)

  doc.rect(startXRevisionAuth, startYAuthEnvio + 6, widthRevisionAuth, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXRevisionAuth + 2, startYAuthEnvio + 6 + 7)

  // Vacío (IZQUIERDA) - después de Revisión
  let startXVacioAuth = startXRevisionAuth + widthRevisionAuth + 1
  let widthVacioAuth = 13
  doc.setFillColor(200, 200, 200)
  doc.rect(startXVacioAuth, startYAuthEnvio, widthVacioAuth, 6, 'F')
  doc.rect(startXVacioAuth, startYAuthEnvio, widthVacioAuth, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('', startXVacioAuth + 2, startYAuthEnvio + 5)

  doc.rect(startXVacioAuth, startYAuthEnvio + 6, widthVacioAuth, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXVacioAuth + 2, startYAuthEnvio + 6 + 7)

  let startXAuthCalidad = startXVacioAuth + widthVacioAuth + 1
  let widthAuthEnvioCalidad = 32.5
  let heightAuthEnvioCalidad = 6
  doc.setFillColor(200, 200, 200)
  doc.rect(startXAuthCalidad, startYAuthEnvio, widthAuthEnvioCalidad, heightAuthEnvioCalidad, 'F')
  doc.rect(startXAuthCalidad, startYAuthEnvio, widthAuthEnvioCalidad, heightAuthEnvioCalidad)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6)
  doc.text('Autorizacion Envio Calidad', startXAuthCalidad + 0, startYAuthEnvio + 5)

  doc.rect(startXAuthCalidad, startYAuthEnvio + heightAuthEnvioCalidad, widthAuthEnvioCalidad, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXAuthCalidad + 2, startYAuthEnvio + heightAuthEnvioCalidad + 7)

  // Autorización Envio Administración (DERECHA)
  let startXAuthEnvioAdmin = startXAuthCalidad + widthAuthEnvioCalidad + 1
  let widthAuthEnvioAdmin = 35
  doc.setFillColor(200, 200, 200)
  doc.rect(startXAuthEnvioAdmin, startYAuthEnvio, widthAuthEnvioAdmin, 6, 'F')
  doc.rect(startXAuthEnvioAdmin, startYAuthEnvio, widthAuthEnvioAdmin, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6)
  doc.text('Autorización Envio Administración', startXAuthEnvioAdmin + 0, startYAuthEnvio + 5)

  doc.rect(startXAuthEnvioAdmin, startYAuthEnvio + 6, widthAuthEnvioAdmin, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXAuthEnvioAdmin + 0, startYAuthEnvio + 6 + 7)

  // NOVENA SECCIÓN (Vehículo y Observaciones)
  let startYVehiculo = startYAuthEnvio + 15 + 4 // Espacio después de la sección anterior

  // Vehículo (columna de 3 filas)
  let startXVehiculo = startX
  let widthVehiculo = 25
  let alturaFila = 4.5 // Altura para cada fila

  // Primera fila - Encabezado
  doc.setFillColor(200, 200, 200)
  doc.rect(startXVehiculo, startYVehiculo, widthVehiculo, 6, 'F')
  doc.rect(startXVehiculo, startYVehiculo, widthVehiculo, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Vehículo', startXVehiculo + 2, startYVehiculo + 5)

  // Segunda fila - Vacía
  doc.rect(startXVehiculo, startYVehiculo + 6, widthVehiculo, alturaFila)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXVehiculo + 2, startYVehiculo + 6 + 5)

  // Tercera fila - Vacía
  doc.rect(startXVehiculo, startYVehiculo + 6 + alturaFila, widthVehiculo, alturaFila)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXVehiculo + 2, startYVehiculo + 6 + alturaFila + 5)

  // Operador
  let startXOperador = startXVehiculo + widthVehiculo + 1
  let widthOperador = 25
  doc.setFillColor(200, 200, 200)
  doc.rect(startXOperador, startYVehiculo, widthOperador, 6, 'F')
  doc.rect(startXOperador, startYVehiculo, widthOperador, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Operador', startXOperador + 2, startYVehiculo + 5)

  doc.rect(startXOperador, startYVehiculo + 6, widthOperador, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXOperador + 2, startYVehiculo + 6 + 7)

  // Observations
  let startXObservations = startXOperador + widthOperador + 1
  let widthObservations = 50
  doc.setFillColor(200, 200, 200)
  doc.rect(startXObservations, startYVehiculo, widthObservations, 6, 'F')
  doc.rect(startXObservations, startYVehiculo, widthObservations, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Observations:', startXObservations + 2, startYVehiculo + 5)

  doc.rect(startXObservations, startYVehiculo + 6, widthObservations, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXObservations + 2, startYVehiculo + 6 + 7)

  // Total Enviadas
  let startXTotalEnviadas = startXObservations + widthObservations + 1
  let widthTotalEnviadas = 32
  doc.setFillColor(200, 200, 200)
  doc.rect(startXTotalEnviadas, startYVehiculo, widthTotalEnviadas, 6, 'F')
  doc.rect(startXTotalEnviadas, startYVehiculo, widthTotalEnviadas, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Total Enviadas', startXTotalEnviadas + 2, startYVehiculo + 5)

  doc.rect(startXTotalEnviadas, startYVehiculo + 6, widthTotalEnviadas, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXTotalEnviadas + 2, startYVehiculo + 6 + 7)

  // Porcentaje
  let startYPorcentaje = startYVehiculo + 15 + 2
  let widthPorcentaje = 15
  let heightPorcentaje = 8

  // Mover hacia la derecha sumando más espacio
  let startXPorcentaje = startXTotalEnviadas + 9 // Ajusta este número según necesites

  // Recuadro blanco
  doc.rect(startXPorcentaje, startYPorcentaje, widthPorcentaje, heightPorcentaje)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXPorcentaje + 2, startYPorcentaje + 6)

  // Texto % a la derecha del recuadro
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('%', startXPorcentaje + widthPorcentaje + 2, startYPorcentaje + 6)

  //////////////////////////////////////////////////////////////////////////////////////////
  doc.save(`orden_produccion_${noOrden}.pdf`)
}

// Función para generar el PDF completo (CON DATOS LLENOS)
const generarPDFConDatosCompletos = (producto, imagen, noOrden, imagenF, datosCompletos) => {
  const { recepcion, suaje, armado, envio, pegado, impresion, calidad, almacen } = datosCompletos

  // 1. Configuración del Documento: Horizontal ('l') y unidades en milímetros ('mm')
  const doc = new jsPDF({
    orientation: 'l',
    unit: 'mm',
    format: 'a4',
  })

  // PRIMERA SECCIÓN (Superior) - CON DATOS REALES
  let startX = 2
  let startY = 2

  // Producto
  let widthProducto = 30
  let heightProducto = 6
  doc.setFillColor(200, 200, 200)
  doc.rect(startX, startY, widthProducto, heightProducto, 'F')
  doc.rect(startX, startY, widthProducto, heightProducto)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Producto', startX + 2, startY + 5)

  // Descripción del producto - DATO REAL
  doc.rect(startX, startY + heightProducto, widthProducto, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  const textoProducto = producto.producto || ''
  doc.text(textoProducto, startX + 2, startY + heightProducto + 7)

  // Medidas Internas
  let startX2 = startX + widthProducto + 1
  let widthMedidas = 30
  doc.setFillColor(220, 220, 220)
  doc.rect(startX2, startY, widthMedidas, 5, 'F')
  doc.rect(startX2, startY, widthMedidas, 5)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Medidas Internas', startX2 + 2, startY + 4.5)

  // Tabla de medidas - DATOS REALES
  let colsMedidas = ['Largo', 'Ancho', 'Alto', 'Caja']
  let colWidthMedidas = widthMedidas / colsMedidas.length
  let valoresMedidas = [
    producto.largo_int?.toString() || '450',
    producto.ancho_int?.toString() || '240',
    producto.alto_int?.toString() || '200',
    producto.ceja?.toString() || '35',
  ]

  // Encabezados
  colsMedidas.forEach((texto, i) => {
    doc.rect(startX2 + i * colWidthMedidas, startY + 5, colWidthMedidas, 5)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(6)
    doc.text(texto, startX2 + i * colWidthMedidas + 1, startY + 5 + 4.5)
  })

  // Valores
  valoresMedidas.forEach((texto, i) => {
    doc.rect(startX2 + i * colWidthMedidas, startY + 10, colWidthMedidas, 5)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text(texto?.toString() || '', startX2 + i * colWidthMedidas + 2, startY + 10 + 4.5)
  })

  // Guía - DATO REAL
  let startX3 = startX2 + widthMedidas + 1
  let widthGuia = 14
  doc.setFillColor(200, 200, 200)
  doc.rect(startX3, startY, widthGuia, 6, 'F')
  doc.rect(startX3, startY, widthGuia, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Guía', startX3 + 2, startY + 5)

  doc.rect(startX3, startY + 6, widthGuia, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  const textoGuia = producto.guia || 'CB'
  doc.text(textoGuia, startX3 + 2, startY + 6 + 7)

  // Marcas - DATO REAL
  let startX4 = startX3 + widthGuia + 1
  let widthMarcas = 30
  doc.setFillColor(200, 200, 200)
  doc.rect(startX4, startY, widthMarcas, 6, 'F')
  doc.rect(startX4, startY, widthMarcas, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Marcas', startX4 + 2, startY + 5)

  doc.rect(startX4, startY + 6, widthMarcas, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  const textoMarcas = producto.marcas || '123**205**123'
  doc.text(textoMarcas, startX4 + 2, startY + 6 + 7)

  // SEGUNDA SECCIÓN (Tipo) - CON DATOS REALES
  let startYTipo = startY + heightProducto + 9 + 4

  // Tipo - DATO REAL
  let widthTipo = 30
  let heightTipo = 6
  doc.setFillColor(200, 200, 200)
  doc.rect(startX, startYTipo, widthTipo, heightTipo, 'F')
  doc.rect(startX, startYTipo, widthTipo, heightTipo)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Tipo', startX + 2, startYTipo + 5)

  // Valor Tipo - DATO REAL
  doc.rect(startX, startYTipo + heightTipo, widthTipo, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  const textoTipo = producto.tipo || 'Caja RANURADA'
  doc.text(textoTipo, startX + 2, startYTipo + heightTipo + 7)

  // Medida Cartón - DATOS REALES
  let startXTabla1 = startX + widthTipo + 1
  let widthTabla1 = 25
  doc.setFillColor(220, 220, 220)
  doc.rect(startXTabla1, startYTipo, widthTabla1, 5, 'F')
  doc.rect(startXTabla1, startYTipo, widthTabla1, 5)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Medida Cartón', startXTabla1 + 2, startYTipo + 4.5)

  // Tabla Medida Cartón - DATOS REALES
  let colsCarton = ['Ancho', 'Largo']
  let colWidthCarton = widthTabla1 / colsCarton.length
  let valoresCarton = [
    producto.ancho_carton?.toString() || '451',
    producto.largo_carton?.toString() || '1438',
  ]

  colsCarton.forEach((texto, i) => {
    doc.rect(startXTabla1 + i * colWidthCarton, startYTipo + 5, colWidthCarton, 5)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.text(texto, startXTabla1 + i * colWidthCarton + 2, startYTipo + 5 + 4.5)
  })

  valoresCarton.forEach((texto, i) => {
    doc.rect(startXTabla1 + i * colWidthCarton, startYTipo + 10, colWidthCarton, 5)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text(texto?.toString() || '', startXTabla1 + i * colWidthCarton + 2, startYTipo + 10 + 4.5)
  })

  // Material Flauta - DATO REAL
  let startXMat = startXTabla1 + widthTabla1 + 1
  let widthMat = 20
  doc.setFillColor(200, 200, 200)
  doc.rect(startXMat, startYTipo, widthMat, 6, 'F')
  doc.rect(startXMat, startYTipo, widthMat, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Material ', startXMat + 2, startYTipo + 5)

  doc.rect(startXMat, startYTipo + 6, widthMat, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  const textoMaterial = producto.material || 'Corrugado'
  doc.text(textoMaterial, startXMat + 2, startYTipo + 6 + 7)

  // Tipo C - DATO REAL
  let startXTipoC = startXMat + widthMat + 1
  let widthTipoC = 10
  doc.setFillColor(200, 200, 200)
  doc.rect(startXTipoC, startYTipo, widthTipoC, 6, 'F')
  doc.rect(startXTipoC, startYTipo, widthTipoC, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.text('Flauta', startXTipoC + 1, startYTipo + 5)

  doc.rect(startXTipoC, startYTipo + 6, widthTipoC, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  const textoFlauta = producto.flauta || 'C'
  doc.text(textoFlauta, startXTipoC + 2, startYTipo + 6 + 7)

  // Combinar Kraft Nat. y ECT en una columna dividida a la mitad
  let startXKraftECT = startXTipoC + widthTipoC + 1
  let widthKraftECT = 20 // Ancho total de la columna combinada

  // Fila 1: Títulos (Kraft Nat. y ECT)
  let colWidthKraftECT = widthKraftECT / 1

  // Resistencia (mitad izquierda) - MODIFICADO
  doc.setFillColor(200, 200, 200)
  doc.rect(startXKraftECT, startYTipo, colWidthKraftECT, 6, 'F')
  doc.rect(startXKraftECT, startYTipo, colWidthKraftECT, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Resistencia', startXKraftECT + 1, startYTipo + 5)

  // ECT (mitad derecha)
  doc.setFillColor(200, 200, 200)
  doc.rect(startXKraftECT + colWidthKraftECT, startYTipo, colWidthKraftECT, 6, 'F')
  doc.rect(startXKraftECT + colWidthKraftECT, startYTipo, colWidthKraftECT, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('ECT', startXKraftECT + colWidthKraftECT + 1, startYTipo + 5)

  // Fila 2: Valores
  // Resistencia valor (mitad izquierda) - MODIFICADO
  doc.rect(startXKraftECT, startYTipo + 6, colWidthKraftECT, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXKraftECT + 2, startYTipo + 6 + 7)

  // ECT valor (mitad derecha) - DATO REAL
  doc.rect(startXKraftECT + colWidthKraftECT, startYTipo + 6, colWidthKraftECT, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  const textoECT = producto.resistencia?.toString() || '32'
  doc.text(textoECT, startXKraftECT + colWidthKraftECT + 2, startYTipo + 6 + 7)

  // Definir las variables primero
  const logoWidth = 30
  const logoHeight = 20
  const logoX = startXKraftECT + colWidthKraftECT * 2 + 20
  const logoY = 3
  // Agregar la imagen (USAR las variables definidas)
  doc.addImage('imagen/logo.jpg', 'JPEG', logoX, logoY, logoWidth, logoHeight)

  // Agregar texto "ORDEN DE PRODUCCIÓN" centrado debajo de la imagen
  const textoY = logoY + logoHeight + 4
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)

  // Calcular ancho del texto para centrarlo
  const texto = 'ORDEN DE PRODUCCIÓN'
  const textoWidth =
    (doc.getStringUnitWidth(texto) * doc.internal.getFontSize()) / doc.internal.scaleFactor
  const textoX = logoX + (logoWidth - textoWidth) / 2

  doc.text(texto, textoX, textoY)
  // TABLA DE TRES COLUMNAS - 15px a la derecha de la primera imagen
  const tablaX = logoX + logoWidth + 25 // 15px a la derecha de la imagen
  const tablaY = logoY

  // PRIMERA COLUMNA: Imagen (sin líneas internas)
  const imagenFWidth = 25
  const imagenFHeight = 25
  const imagenFX = tablaX
  const imagenFY = tablaY

  // Agregar la imagen de la tabla (usando la imagen obtenida de la API)
  if (imagenF) {
    try {
      const imageData = `data:image/png;base64,${imagenF}`
      doc.addImage(imageData, 'PNG', imagenFX, imagenFY, imagenFWidth, imagenFHeight)
      console.log('✅ Imagen de tabla agregada desde API')
    } catch (error) {
      console.warn('⚠️ Error al cargar imagen de API, usando imagen por defecto:', error)
      doc.addImage('imagen/logo.jpg', 'JPEG', imagenFX, imagenFY, imagenFWidth, imagenFHeight)
    }
  } else {
    console.log('ℹ️ Usando imagen por defecto para tabla')
    doc.addImage('imagen/logo.jpg', 'JPEG', imagenFX, imagenFY, imagenFWidth, imagenFHeight)
  }

  // SEGUNDA COLUMNA: Etiquetas (a la derecha de la imagen de la tabla)
  const labelsX = imagenFX + imagenFWidth + 5 // Margen pequeño a la derecha de la imagen
  let currentY = tablaY

  // Función para obtener fecha actual en formato dd/mm/aaaa
  function obtenerFechaActual() {
    const hoy = new Date()
    const dia = String(hoy.getDate()).padStart(2, '0')
    const mes = String(hoy.getMonth() + 1).padStart(2, '0')
    const año = hoy.getFullYear()
    return `${dia}/${mes}/${año}`
  }

  // Color de fondo para toda la columna
  doc.setFillColor(220, 220, 220)
  doc.rect(labelsX - 3, currentY - 2, 25, 30, 'F')

  // Primera fila - Fecha
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Fecha', labelsX, currentY + 5)

  // Segunda fila - Pedido
  doc.text('Pedido', labelsX, currentY + 12)

  // Tercera fila - No. orden
  doc.text('No. orden', labelsX, currentY + 19)
  // TERCERA COLUMNA: Valores (a la derecha de las etiquetas)
  const valuesX = labelsX + 25 // Espacio suficiente para las etiquetas
  currentY = tablaY

  // Primera fila - Valor fecha (usando la función)
  doc.setFont('helvetica', 'normal')
  doc.text(obtenerFechaActual(), valuesX, currentY + 5)

  // Segunda fila - Valor pedido (puedes reemplazar con tu variable)
  const pedidoValor = producto.no_pedido_id || '-' // Reemplaza con tu variable real
  doc.text(pedidoValor, valuesX, currentY + 12)

  // Tercera fila - Valor No. orden (usando el no_orden de la API)
  const ordenValor = producto.no_orden || '-'
  doc.text(ordenValor, valuesX, currentY + 19)

  // Borde general alrededor de toda la tabla de tres columnas
  const sectionWidth = valuesX + 35 - imagenFX // Ancho total desde imagen de tabla hasta el final de los valores
  const sectionHeight = 28 // Altura fija para las 3 filas
  doc.rect(imagenFX - 2, imagenFY - 2, sectionWidth, sectionHeight)

  // Bordes internos verticales para separar las columnas (SOLO entre columna 2 y 3)
  doc.line(labelsX + 22, imagenFY - 2, labelsX + 22, imagenFY + sectionHeight - 2) // Línea entre etiquetas y valores

  // Bordes internos horizontales para separar las filas (SOLO en columnas 2 y 3)
  doc.line(labelsX - 2, imagenFY + 7, imagenFX + sectionWidth - 2, imagenFY + 7) // Línea después de primera fila
  doc.line(labelsX - 2, imagenFY + 14, imagenFX + sectionWidth - 2, imagenFY + 14) // Línea después de segunda fila
  doc.line(
    imagenFX + imagenFWidth + 2,
    imagenFY - 2,
    imagenFX + imagenFWidth + 2,
    imagenFY + sectionHeight - 2,
  )

  // TABLA DE 4 COLUMNAS - Debajo de la tabla anterior
  const tabla4X = imagenFX // Misma posición X que la tabla anterior
  const tabla4Y = imagenFY + sectionHeight + 0 // 5px debajo de la tabla anterior

  // Configuración de la tabla de 4 columnas
  const tabla4Width = sectionWidth // Mismo ancho que la tabla anterior
  const tabla4Height = 11 // Altura para 2 filas
  const col4Width = tabla4Width / 4 // Ancho de cada columna

  // Campos para la primera fila
  const campos = ['Ventas', 'Diseño', 'Logística', 'Planeación']

  // Dibujar borde exterior de la tabla
  doc.rect(tabla4X - 2, tabla4Y - 2, tabla4Width, tabla4Height)

  // Primera fila - Campos con color de fondo
  campos.forEach((campo, i) => {
    const colX = tabla4X - 2 + i * col4Width

    // Celda de la primera fila con color de fondo
    doc.setFillColor(220, 220, 220)
    doc.rect(colX, tabla4Y - 2, col4Width, tabla4Height / 2, 'F')

    // Borde de la celda
    doc.rect(colX, tabla4Y - 2, col4Width, tabla4Height / 2)

    // Texto centrado en cada celda
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    const textoWidth =
      (doc.getStringUnitWidth(campo) * doc.internal.getFontSize()) / doc.internal.scaleFactor
    const textoX = colX + (col4Width - textoWidth) / 2
    doc.text(campo, textoX, tabla4Y - 2 + 5)
  })

  // Segunda fila - Vacía
  for (let i = 0; i < 4; i++) {
    const colX = tabla4X - 2 + i * col4Width

    // Celda de la segunda fila
    doc.rect(colX, tabla4Y - 2 + tabla4Height / 2, col4Width, tabla4Height / 2)
  }

  // Línea horizontal que separa las 2 filas
  doc.line(
    tabla4X - 2,
    tabla4Y - 2 + tabla4Height / 2,
    tabla4X - 2 + tabla4Width,
    tabla4Y - 2 + tabla4Height / 2,
  )

  // Líneas verticales entre columnas
  for (let i = 1; i < 4; i++) {
    const lineX = tabla4X - 2 + i * col4Width
    doc.line(lineX, tabla4Y - 2, lineX, tabla4Y - 2 + tabla4Height)
  }

  // TERCERA SECCIÓN (Cantidad) - CON DATOS REALES
  let startYCantidad = startYTipo + heightTipo + 9 + 5

  // Cantidad
  let widthCantidad = 40
  let heightCantidad = 6
  doc.setFillColor(200, 200, 200)
  doc.rect(startX, startYCantidad, widthCantidad, heightCantidad, 'F')
  doc.rect(startX, startYCantidad, widthCantidad, heightCantidad)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Cantidad', startX + 2, startYCantidad + 5)

  // Pedido Real Producción - DATOS REALES
  doc.rect(startX, startYCantidad + heightCantidad, widthCantidad, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)

  const cantidadPedido = producto.cantidad?.toString() || ''
  const piezas = producto.piezas?.toString() || ''

  doc.text('Pedido Real Produccion', startX + 2, startYCantidad + heightCantidad + 4)
  doc.text(`${cantidadPedido} | ${piezas}`, startX + 2, startYCantidad + heightCantidad + 7)
  // Recibidas - CON DATOS DEL NUEVO ENDPOINT
  let startXRecibidas = startX + widthCantidad + 2
  let widthRecibidas = 25
  doc.setFillColor(200, 200, 200)
  doc.rect(startXRecibidas, startYCantidad, widthRecibidas, 6, 'F')
  doc.rect(startXRecibidas, startYCantidad, widthRecibidas, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Recibidas', startXRecibidas + 2, startYCantidad + 5)

  doc.rect(startXRecibidas, startYCantidad + 6, widthRecibidas, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(
    recepcion.cantidad_recibida?.toString() || '',
    startXRecibidas + 2,
    startYCantidad + 6 + 7,
  )

  // Agregar imagen antes de Metida
  let startXImagenCantidad = startXRecibidas + widthRecibidas + 1
  let widthImagenCantidad = 5
  let heightImagenCantidad = 15

  // Cargar y agregar la imagen
  doc.addImage(
    '/imagen/image.png',
    'PNG',
    startXImagenCantidad,
    startYCantidad,
    widthImagenCantidad,
    heightImagenCantidad,
  )

  // Ajustar la posición de Metida después de la imagen
  let startXMetida = startXImagenCantidad + widthImagenCantidad + 0
  let widthMetida = 20
  doc.setFillColor(200, 200, 200)
  doc.rect(startXMetida, startYCantidad, widthMetida, 6, 'F')
  doc.rect(startXMetida, startYCantidad, widthMetida, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Medidas', startXMetida + 1, startYCantidad + 4)

  doc.rect(startXMetida, startYCantidad + 6, widthMetida, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(recepcion.calidad_medida_carton || '', startXMetida + 2, startYCantidad + 6 + 7)

  // Certificado Calidad - CON DATOS DEL NUEVO ENDPOINT
  let startXCertificado = startXMetida + widthMetida + 2
  let widthCertificado = 20
  doc.setFillColor(200, 200, 200)
  doc.rect(startXCertificado, startYCantidad, widthCertificado, 6, 'F')
  doc.rect(startXCertificado, startYCantidad, widthCertificado, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Resistencia', startXCertificado + 1, startYCantidad + 4)

  doc.rect(startXCertificado, startYCantidad + 6, widthCertificado, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(recepcion.calidad_resistencia || '', startXCertificado + 2, startYCantidad + 6 + 7)

  // Autorización Recepción Calidad - CON DATOS DEL NUEVO ENDPOINT
  let startXAuthRec = startXCertificado + widthCertificado + 2
  let widthAuthRec = 30
  doc.setFillColor(200, 200, 200)
  doc.rect(startXAuthRec, startYCantidad, widthAuthRec, 6, 'F')
  doc.rect(startXAuthRec, startYCantidad, widthAuthRec, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.text('Certificado Calidad', startXAuthRec + 1, startYCantidad + 4)

  doc.rect(startXAuthRec, startYCantidad + 6, widthAuthRec, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(recepcion.certificado_calidad || '', startXAuthRec + 2, startYCantidad + 6 + 7)

  // Autorización Planeación - CON DATOS DEL NUEVO ENDPOINT
  let startXAuthPlan = startXAuthRec + widthAuthRec + 2
  let widthAuthPlan = 30
  doc.setFillColor(200, 200, 200)
  doc.rect(startXAuthPlan, startYCantidad, widthAuthPlan, 6, 'F')
  doc.rect(startXAuthPlan, startYCantidad, widthAuthPlan, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Autorización', startXAuthPlan + 2, startYCantidad + 3)
  doc.text('Recepción', startXAuthPlan + 2, startYCantidad + 5.5)

  doc.rect(startXAuthPlan, startYCantidad + 6, widthAuthPlan, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(recepcion.autorizacion_recepcion || '', startXAuthPlan + 2, startYCantidad + 6 + 7)

  // Autorización Recepción (al lado derecho de Autorización Planeación) - CON DATOS DEL NUEVO ENDPOINT
  let startXAuthRecepcion = startXAuthPlan + widthAuthPlan + 2
  let widthAuthRecepcion = 30
  doc.setFillColor(200, 200, 200)
  doc.rect(startXAuthRecepcion, startYCantidad, widthAuthRecepcion, 6, 'F')
  doc.rect(startXAuthRecepcion, startYCantidad, widthAuthRecepcion, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Autorización', startXAuthRecepcion + 2, startYCantidad + 3)
  doc.text('Planeación', startXAuthRecepcion + 2, startYCantidad + 5.5)

  doc.rect(startXAuthRecepcion, startYCantidad + 6, widthAuthRecepcion, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(recepcion.autorizacion_planeacion || '', startXAuthRecepcion + 2, startYCantidad + 6 + 7)

  // CUARTA SECCIÓN (Impresión)
  let startYImpresion = startYCantidad + heightCantidad + 9 + 5

  // Impresión
  let widthImpresion = 40
  let heightImpresion = 6
  doc.setFillColor(200, 200, 200)
  doc.rect(startX, startYImpresion, widthImpresion, heightImpresion, 'F')
  doc.rect(startX, startYImpresion, widthImpresion, heightImpresion)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Impresión', startX + 2, startYImpresion + 5)

  // Máquina - CON DATOS DEL NUEVO ENDPOINT
  doc.rect(startX, startYImpresion + heightImpresion, widthImpresion, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(
    impresion.cantidad_impresion?.toString() || '',
    startX + 2,
    startYImpresion + heightImpresion + 7,
  )

  // Grabado - DATO REAL
  let startXGrabado = startX + widthImpresion + 1
  let widthGrabado = 16
  doc.setFillColor(200, 200, 200)
  doc.rect(startXGrabado, startYImpresion, widthGrabado, 6, 'F')
  doc.rect(startXGrabado, startYImpresion, widthGrabado, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.text('Grabado', startXGrabado + 2, startYImpresion + 5)

  doc.rect(startXGrabado, startYImpresion + 6, widthGrabado, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  const textoGrabado = producto.grabado || ' '
  doc.text(textoGrabado, startXGrabado + 2, startYImpresion + 6 + 7)

  // Tintas - Columna con DOS filas - DATOS REALES
  let startXTintas = startXGrabado + widthGrabado + 2
  let widthTintas = 60 // Ancho mayor para las 4 columnas internas
  let filaAltosTintas = [6, 9] // Solo dos filas: título y tintas (GCMI + nombre)

  // Fila 1: Título "Tintas"
  doc.setFillColor(200, 200, 200)
  doc.rect(startXTintas, startYImpresion, widthTintas, filaAltosTintas[0], 'F')
  doc.rect(startXTintas, startYImpresion, widthTintas, filaAltosTintas[0])
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Tintas', startXTintas + 25, startYImpresion + 4)

  // Fila 2: GCMI y nombre de tintas en una fila más alta
  let tintasCompletas = []
  if (producto.tintas && producto.nombres_tintas) {
    for (let i = 0; i < Math.min(4, producto.tintas.length); i++) {
      tintasCompletas.push({
        gcmi: producto.tintas[i]?.toString() || '',
        nombre: producto.nombres_tintas[i] || '',
      })
    }
  }
  // Completar con objetos vacíos si hay menos de 4 tintas
  while (tintasCompletas.length < 4) {
    tintasCompletas.push({ gcmi: '', nombre: '' })
  }

  let colWidthTintas = widthTintas / tintasCompletas.length

  tintasCompletas.forEach((tinta, i) => {
    doc.rect(
      startXTintas + i * colWidthTintas,
      startYImpresion + filaAltosTintas[0],
      colWidthTintas,
      filaAltosTintas[1],
    )

    // GCMI (primera línea - negrita)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
    doc.text(
      tinta.gcmi?.toString() || '',
      startXTintas + i * colWidthTintas + 2,
      startYImpresion + filaAltosTintas[0] + 3,
    )

    // Nombre (segunda línea - normal)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6)
    doc.text(
      tinta.nombre,
      startXTintas + i * colWidthTintas + 2,
      startYImpresion + filaAltosTintas[0] + 7,
    )
  })

  let startXImagenImpresion = startXTintas + widthTintas + 1
  let widthImagenImpresion = 5
  let heightImagenImpresion = 15
  // Cargar y agregar la imagen
  doc.addImage(
    '/imagen/image.png',
    'PNG',
    startXImagenImpresion,
    startYImpresion,
    widthImagenImpresion,
    heightImagenImpresion,
  )

  let startXTono = startXImagenImpresion + widthImagenImpresion + 0

  // Columna 1: Tono - CON DATOS DEL NUEVO ENDPOINT
  let widthTono = 10
  doc.setFillColor(200, 200, 200)
  doc.rect(startXTono, startYImpresion, widthTono, 6, 'F')
  doc.rect(startXTono, startYImpresion, widthTono, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6)
  doc.text('Tono', startXTono + 1, startYImpresion + 5)

  doc.rect(startXTono, startYImpresion + 6, widthTono, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(impresion.calidad_tono || '', startXTono + 2, startYImpresion + 6 + 7)

  // Columna 2: Medidas - CON DATOS DEL NUEVO ENDPOINT
  let startXMedidas = startXTono + widthTono + 1
  let widthMedidasCol = 10
  doc.setFillColor(200, 200, 200)
  doc.rect(startXMedidas, startYImpresion, widthMedidasCol, 6, 'F')
  doc.rect(startXMedidas, startYImpresion, widthMedidasCol, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6)
  doc.text('Medidas', startXMedidas + 1, startYImpresion + 5)

  doc.rect(startXMedidas, startYImpresion + 6, widthMedidasCol, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(impresion.calidad_medidas || '', startXMedidas + 2, startYImpresion + 6 + 7)

  // Columna 3: Vacío
  let startXVacio = startXMedidas + widthMedidasCol + 1
  let widthVacio = 10
  doc.setFillColor(200, 200, 200)
  doc.rect(startXVacio, startYImpresion, widthVacio, 6, 'F')
  doc.rect(startXVacio, startYImpresion, widthVacio, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.text('', startXVacio + 1, startYImpresion + 5)

  doc.rect(startXVacio, startYImpresion + 6, widthVacio, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXVacio + 2, startYImpresion + 6 + 7)

  // Autorización Impresión Calidad - CON DATOS DEL NUEVO ENDPOINT
  let startXAuthImpresion = startXVacio + widthVacio + 1
  let widthAuthImpresion = 36
  doc.setFillColor(200, 200, 200)
  doc.rect(startXAuthImpresion, startYImpresion, widthAuthImpresion, 6, 'F')
  doc.rect(startXAuthImpresion, startYImpresion, widthAuthImpresion, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Autorización', startXAuthImpresion + 2, startYImpresion + 3)
  doc.text('Impresión Calidad', startXAuthImpresion + 2, startYImpresion + 6)

  doc.rect(startXAuthImpresion, startYImpresion + 6, widthAuthImpresion, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(impresion.autorizacion_impresion || '', startXAuthImpresion + 2, startYImpresion + 6 + 7)

  // Merma - Columna con 3 filas - CON DATOS DEL NUEVO ENDPOINT
  let startXMerma = startXAuthImpresion + widthAuthImpresion + 1
  let widthMerma = 16
  let filaAltosMerma = [5, 5, 5] // Alto de cada fila: título, número, porcentaje

  // Fila 1: Título "Merma"
  doc.setFillColor(200, 200, 200)
  doc.rect(startXMerma, startYImpresion, widthMerma, filaAltosMerma[0], 'F')
  doc.rect(startXMerma, startYImpresion, widthMerma, filaAltosMerma[0])
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Merma', startXMerma + 2, startYImpresion + 5)

  // Fila 2: Número
  doc.rect(startXMerma, startYImpresion + filaAltosMerma[0], widthMerma, filaAltosMerma[1])
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(
    impresion.merma?.toString() || '',
    startXMerma + 2,
    startYImpresion + filaAltosMerma[0] + 4.5,
  )

  // Fila 3: Número con %
  doc.rect(
    startXMerma,
    startYImpresion + filaAltosMerma[0] + filaAltosMerma[1],
    widthMerma,
    filaAltosMerma[2],
  )
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('% ', startXMerma + 12, startYImpresion + filaAltosMerma[0] + filaAltosMerma[1] + 4.5)

  // Total Entregadas (entre Merma y Firma Operador) - CON DATOS DEL NUEVO ENDPOINT
  let startXTotalEntregadas = startXMerma + widthMerma + 1
  let widthTotalEntregadas = 40
  doc.setFillColor(200, 200, 200)
  doc.rect(startXTotalEntregadas, startYImpresion, widthTotalEntregadas, 6, 'F')
  doc.rect(startXTotalEntregadas, startYImpresion, widthTotalEntregadas, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Total Entregadas', startXTotalEntregadas + 2, startYImpresion + 5)

  doc.rect(startXTotalEntregadas, startYImpresion + 6, widthTotalEntregadas, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(
    impresion.total_entregadas?.toString() || '',
    startXTotalEntregadas + 2,
    startYImpresion + 6 + 7,
  )

  // Firma Operador - CON DATOS DEL NUEVO ENDPOINT
  let startXFirmaOp = startXTotalEntregadas + widthTotalEntregadas + 1
  let widthFirmaOp = 40
  doc.setFillColor(200, 200, 200)
  doc.rect(startXFirmaOp, startYImpresion, widthFirmaOp, 6, 'F')
  doc.rect(startXFirmaOp, startYImpresion, widthFirmaOp, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Firma Operador', startXFirmaOp + 2, startYImpresion + 5)

  doc.rect(startXFirmaOp, startYImpresion + 6, widthFirmaOp, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(impresion.firma_operador || '', startXFirmaOp + 2, startYImpresion + 6 + 7)

  // QUINTA SECCIÓN (Slotter o Suaje)
  let startYSlotter = startYImpresion + 15 + 5

  // Slotter o Suaje
  let widthSlotter = 40
  let heightSlotter = 6
  doc.setFillColor(200, 200, 200)
  doc.rect(startX, startYSlotter, widthSlotter, heightSlotter, 'F')
  doc.rect(startX, startYSlotter, widthSlotter, heightSlotter)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Slotter o Suaje', startX + 2, startYSlotter + 5)

  // Cantidad Suaje - CON DATOS DEL NUEVO ENDPOINT
  doc.rect(startX, startYSlotter + heightSlotter, widthSlotter, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(
    suaje.cantidadsuaje?.toString() || suaje.total_entregadas?.toString() || '',
    startX + 2,
    startYSlotter + heightSlotter + 7,
  )
  // Función para verificar si el tipo es exactamente Ranurada
  function esTipoRanurada(tipo) {
    return tipo && tipo.trim().toLowerCase() === 'ranurada'
  }

  // Inicializar variables aquí para que estén disponibles en todo el scope
  let startXSuaje = startX + widthSlotter + 1
  let widthSuaje = 14

  // Variable para controlar la posición después de Suaje
  let startXDespuesSuaje = startXSuaje + widthSuaje + 1

  // Solo mostrar estas secciones si el tipo es exactamente Ranurada
  if (esTipoRanurada(producto.tipo)) {
    // Tabla Medidas Internas - DATOS REALES
    let startXMedidasSlotter = startX + widthSlotter + 1
    let widthMedidasSlotter = 45
    doc.setFillColor(220, 220, 220)
    doc.rect(startXMedidasSlotter, startYSlotter, widthMedidasSlotter, 5, 'F')
    doc.rect(startXMedidasSlotter, startYSlotter, widthMedidasSlotter, 5)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.text('Medidas Internas', startXMedidasSlotter + 2, startYSlotter + 4.5)

    // Tabla de medidas - DATOS REALES
    let colsMedidasSlotter = ['Largo', 'Ancho', 'Alto', 'Caja']
    let colWidthMedidasSlotter = widthMedidasSlotter / colsMedidasSlotter.length
    let valoresMedidasSlotter = [
      producto.largo_int?.toString() || '450',
      producto.ancho_int?.toString() || '240',
      producto.alto_int?.toString() || '200',
      producto.ceja?.toString() || '35',
    ]

    // Encabezados
    colsMedidasSlotter.forEach((texto, i) => {
      doc.rect(
        startXMedidasSlotter + i * colWidthMedidasSlotter,
        startYSlotter + 5,
        colWidthMedidasSlotter,
        5,
      )
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.text(
        texto,
        startXMedidasSlotter + i * colWidthMedidasSlotter + 2,
        startYSlotter + 5 + 4.5,
      )
    })

    // Valores
    valoresMedidasSlotter.forEach((texto, i) => {
      doc.rect(
        startXMedidasSlotter + i * colWidthMedidasSlotter,
        startYSlotter + 10,
        colWidthMedidasSlotter,
        5,
      )
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.text(
        texto?.toString() || '',
        startXMedidasSlotter + i * colWidthMedidasSlotter + 2,
        startYSlotter + 10 + 4.5,
      )
    })

    // Actualizar startXSuaje para que esté después de la tabla de medidas
    startXSuaje = startXMedidasSlotter + widthMedidasSlotter + 1

    // Marcas - DATO REAL
    let startXMarcasSlotter = startXSuaje + widthSuaje + 1
    let widthMarcasSlotter = 25
    doc.setFillColor(200, 200, 200)
    doc.rect(startXMarcasSlotter, startYSlotter, widthMarcasSlotter, 6, 'F')
    doc.rect(startXMarcasSlotter, startYSlotter, widthMarcasSlotter, 6)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.text('Marcas', startXMarcasSlotter + 2, startYSlotter + 5)

    doc.rect(startXMarcasSlotter, startYSlotter + 6, widthMarcasSlotter, 9)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text(textoMarcas, startXMarcasSlotter + 2, startYSlotter + 6 + 7)

    // Actualizar la posición después de Suaje para incluir las Marcas
    startXDespuesSuaje = startXMarcasSlotter + widthMarcasSlotter + 1
  }

  // Suaje (siempre se muestra) - CON DATOS DEL NUEVO ENDPOINT
  doc.setFillColor(200, 200, 200)
  doc.rect(startXSuaje, startYSlotter, widthSuaje, 6, 'F')
  doc.rect(startXSuaje, startYSlotter, widthSuaje, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Suaje', startXSuaje + 2, startYSlotter + 5)

  doc.rect(startXSuaje, startYSlotter + 6, widthSuaje, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(suaje.autorizacion_suaje || '', startXSuaje + 2, startYSlotter + 6 + 7)

  // Agregar imagen - usar startXDespuesSuaje que se ajusta según si es Ranurada o no
  let startXImagenSlotter = startXDespuesSuaje
  let widthImagenSlotter = 5
  let heightImagenSlotter = 15

  // Cargar y agregar la imagen
  doc.addImage(
    '/imagen/image.png',
    'PNG',
    startXImagenSlotter,
    startYSlotter,
    widthImagenSlotter,
    heightImagenSlotter,
  )

  // Después de la imagen - 3 columnas pequeñas
  let startXTonoSlotter = startXImagenSlotter + widthImagenSlotter + 0

  // Columna 1: Medidas
  let widthTonoSlotter = 10
  doc.setFillColor(200, 200, 200)
  doc.rect(startXTonoSlotter, startYSlotter, widthTonoSlotter, 6, 'F')
  doc.rect(startXTonoSlotter, startYSlotter, widthTonoSlotter, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6)
  doc.text('Medidas', startXTonoSlotter + 1, startYSlotter + 5)

  // Respuesta: "calidad_medidas"
  doc.rect(startXTonoSlotter, startYSlotter + 6, widthTonoSlotter, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(suaje.calidad_medidas || '', startXTonoSlotter + 2, startYSlotter + 6 + 7)

  // Columna 2: Cuadre
  let startXMedidasSlotter2 = startXTonoSlotter + widthTonoSlotter + 1
  let widthMedidasColSlotter = 10
  doc.setFillColor(200, 200, 200)
  doc.rect(startXMedidasSlotter2, startYSlotter, widthMedidasColSlotter, 6, 'F')
  doc.rect(startXMedidasSlotter2, startYSlotter, widthMedidasColSlotter, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6)
  doc.text('Cuadre', startXMedidasSlotter2 + 1, startYSlotter + 5)

  // Respuesta: "calidad_cuadre"
  doc.rect(startXMedidasSlotter2, startYSlotter + 6, widthMedidasColSlotter, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(suaje.calidad_cuadre || '', startXMedidasSlotter2 + 2, startYSlotter + 6 + 7)

  // Columna 3: Marcas
  let startXVacioSlotter = startXMedidasSlotter2 + widthMedidasColSlotter + 1
  let widthVacioSlotter = 10
  doc.setFillColor(200, 200, 200)
  doc.rect(startXVacioSlotter, startYSlotter, widthVacioSlotter, 6, 'F')
  doc.rect(startXVacioSlotter, startYSlotter, widthVacioSlotter, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.text('Marcas', startXVacioSlotter + 1, startYSlotter + 5)

  // Respuesta: "calidad_marca"
  doc.rect(startXVacioSlotter, startYSlotter + 6, widthVacioSlotter, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(suaje.calidad_marca || '', startXVacioSlotter + 2, startYSlotter + 6 + 7)

  // Autorización Slotter / Suaje Calidad (después de las 3 columnas) - CON DATOS DEL NUEVO ENDPOINT
  let startXAuthSlotter = startXVacioSlotter + widthVacioSlotter + 2
  let widthAuthSlotter = 32
  doc.setFillColor(200, 200, 200)
  doc.rect(startXAuthSlotter, startYSlotter, widthAuthSlotter, 6, 'F')
  doc.rect(startXAuthSlotter, startYSlotter, widthAuthSlotter, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.text('Autorización', startXAuthSlotter + 1, startYSlotter + 3)
  doc.text('Slotter / Suaje Calidad', startXAuthSlotter + 1, startYSlotter + 6)

  doc.rect(startXAuthSlotter, startYSlotter + 6, widthAuthSlotter, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(suaje.autorizacion_suaje || '', startXAuthSlotter + 2, startYSlotter + 6 + 7)

  // Merma Slotter - CON DATOS DEL NUEVO ENDPOINT
  let startXMermaSlotter = startXAuthSlotter + widthAuthSlotter + 1
  let widthMermaSlotter = 16
  let filaAltosMermaSlotter = [5, 5, 5]

  // Fila 1: Título "Merma"
  doc.setFillColor(200, 200, 200)
  doc.rect(startXMermaSlotter, startYSlotter, widthMermaSlotter, filaAltosMermaSlotter[0], 'F')
  doc.rect(startXMermaSlotter, startYSlotter, widthMermaSlotter, filaAltosMermaSlotter[0])
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Merma', startXMermaSlotter + 2, startYSlotter + 5)

  // Fila 2: Número
  doc.rect(
    startXMermaSlotter,
    startYSlotter + filaAltosMermaSlotter[0],
    widthMermaSlotter,
    filaAltosMermaSlotter[1],
  )
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(
    suaje.merma?.toString() || '',
    startXMermaSlotter + 2,
    startYSlotter + filaAltosMermaSlotter[0] + 4.5,
  )

  // Fila 3: Número con %
  doc.rect(
    startXMermaSlotter,
    startYSlotter + filaAltosMermaSlotter[0] + filaAltosMermaSlotter[1],
    widthMermaSlotter,
    filaAltosMermaSlotter[2],
  )
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(
    '% ',
    startXMermaSlotter + 2,
    startYSlotter + filaAltosMermaSlotter[0] + filaAltosMermaSlotter[1] + 4.5,
  )

  // Total Entregadas Slotter - CON DATOS DEL NUEVO ENDPOINT
  let startXTotalSlotter = startXMermaSlotter + widthMermaSlotter + 1
  let widthTotalSlotter = 38
  doc.setFillColor(200, 200, 200)
  doc.rect(startXTotalSlotter, startYSlotter, widthTotalSlotter, 6, 'F')
  doc.rect(startXTotalSlotter, startYSlotter, widthTotalSlotter, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Total Entregadas', startXTotalSlotter + 2, startYSlotter + 5)

  doc.rect(startXTotalSlotter, startYSlotter + 6, widthTotalSlotter, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(suaje.total_entregadas?.toString() || '', startXTotalSlotter + 2, startYSlotter + 6 + 7)

  // Firma Operador Slotter - CON DATOS DEL NUEVO ENDPOINT
  let startXFirmaSlotter = startXTotalSlotter + widthTotalSlotter + 1
  let widthFirmaSlotter = 37
  doc.setFillColor(200, 200, 200)
  doc.rect(startXFirmaSlotter, startYSlotter, widthFirmaSlotter, 6, 'F')
  doc.rect(startXFirmaSlotter, startYSlotter, widthFirmaSlotter, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Firma Operador', startXFirmaSlotter + 2, startYSlotter + 5)

  doc.rect(startXFirmaSlotter, startYSlotter + 6, widthFirmaSlotter, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(suaje.firma_operador || '', startXFirmaSlotter + 2, startYSlotter + 6 + 7)

  // SEXTA SECCIÓN (Pegado)
  let startYPegado = startYSlotter + 15 + 5

  // Pegado
  let widthPegado = 40
  let heightPegado = 6
  doc.setFillColor(200, 200, 200)
  doc.rect(startX, startYPegado, widthPegado, heightPegado, 'F')
  doc.rect(startX, startYPegado, widthPegado, heightPegado)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Pegado', startX + 2, startYPegado + 5)

  // Cantidad Pegado - CON DATOS DEL NUEVO ENDPOINT
  doc.rect(startX, startYPegado + heightPegado, widthPegado, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(
    pegado.cantidad_pegado?.toString() || pegado.total_entregadas?.toString() || '',
    startX + 2,
    startYPegado + heightPegado + 7,
  )

  // PRIMERA PARTE - Pegado inicial - CON DATOS DEL NUEVO ENDPOINT
  let startXPegadoInicial = startX + widthPegado + 1
  let widthPegadoInicial = 25
  doc.setFillColor(200, 200, 200)
  doc.rect(startXPegadoInicial, startYPegado, widthPegadoInicial, 6, 'F')
  doc.rect(startXPegadoInicial, startYPegado, widthPegadoInicial, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Tipo', startXPegadoInicial + 2, startYPegado + 5)

  doc.rect(startXPegadoInicial, startYPegado + 6, widthPegadoInicial, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(pegado.tipo_pegado || '', startXPegadoInicial + 2, startYPegado + 6 + 7)

  // Imagen entre Pegado y Empaque
  let startXImagenPegado = startXPegadoInicial + widthPegadoInicial + 1
  let widthImagenPegado = 5
  let heightImagenPegado = 15

  // Cargar y agregar la imagen
  doc.addImage(
    '/imagen/image.png',
    'PNG',
    startXImagenPegado,
    startYPegado,
    widthImagenPegado,
    heightImagenPegado,
  )

  // Empaque (después de la imagen) - CON DATOS DEL NUEVO ENDPOINT
  let startXEmpaque = startXImagenPegado + widthImagenPegado + 0
  let widthEmpaque = 10
  doc.setFillColor(200, 200, 200)
  doc.rect(startXEmpaque, startYPegado, widthEmpaque, 6, 'F')
  doc.rect(startXEmpaque, startYPegado, widthEmpaque, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.text('Cuadre', startXEmpaque + 0, startYPegado + 5)

  doc.rect(startXEmpaque, startYPegado + 6, widthEmpaque, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.text(pegado.calidad_cuerdre || '', startXEmpaque + 2, startYPegado + 6 + 7)

  let startXPaqTar = startXEmpaque + widthEmpaque + 1
  let widthPaqTar = 13
  doc.setFillColor(200, 200, 200)
  doc.rect(startXPaqTar, startYPegado, widthPaqTar, 6, 'F')
  doc.rect(startXPaqTar, startYPegado, widthPaqTar, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.text('Desgarre', startXPaqTar + 0, startYPegado + 5)

  doc.rect(startXPaqTar, startYPegado + 6, widthPaqTar, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.text(pegado.calidad_desgarre || '', startXPaqTar + 2, startYPegado + 6 + 7)

  let startXCantTar = startXPaqTar + widthPaqTar + 1
  let widthCantTar = 12
  doc.setFillColor(200, 200, 200)
  doc.rect(startXCantTar, startYPegado, widthCantTar, 6, 'F')
  doc.rect(startXCantTar, startYPegado, widthCantTar, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.text('Marcas', startXCantTar + 0, startYPegado + 5)

  doc.rect(startXCantTar, startYPegado + 6, widthCantTar, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(pegado.calidad_marcas || '', startXCantTar + 2, startYPegado + 6 + 7)

  // Autorización Pegado Calidad (después de las 3 columnas pequeñas) - CON DATOS DEL NUEVO ENDPOINT
  let startXAuthPegadoFinal = startXCantTar + widthCantTar + 1
  let widthAuthPegadoFinal = 30
  doc.setFillColor(200, 200, 200)
  doc.rect(startXAuthPegadoFinal, startYPegado, widthAuthPegadoFinal, 6, 'F')
  doc.rect(startXAuthPegadoFinal, startYPegado, widthAuthPegadoFinal, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Autorización', startXAuthPegadoFinal + 1, startYPegado + 3)
  doc.text('Pegado Calidad', startXAuthPegadoFinal + 1, startYPegado + 6)

  doc.rect(startXAuthPegadoFinal, startYPegado + 6, widthAuthPegadoFinal, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(pegado.autorizacion_pegado || '', startXAuthPegadoFinal + 2, startYPegado + 6 + 7)

  // Entre Autorización y Merma - 3 columnas pequeñas
  let startXEmpaqueTabla = startXAuthPegadoFinal + widthAuthPegadoFinal + 1

  // Columna 1: Empaque
  let widthEmpaqueTabla = 19
  doc.setFillColor(200, 200, 200)
  doc.rect(startXEmpaqueTabla, startYPegado, widthEmpaqueTabla, 6, 'F')
  doc.rect(startXEmpaqueTabla, startYPegado, widthEmpaqueTabla, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Empaque', startXEmpaqueTabla + 2, startYPegado + 5)

  doc.rect(startXEmpaqueTabla, startYPegado + 6, widthEmpaqueTabla, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(producto.empaque || '', startXEmpaqueTabla + 2, startYPegado + 6 + 7)

  // Columna 2: Paq. x Tar
  let startXPaqTarTabla = startXEmpaqueTabla + widthEmpaqueTabla + 1
  let widthPaqTarTabla = 18
  doc.setFillColor(200, 200, 200)
  doc.rect(startXPaqTarTabla, startYPegado, widthPaqTarTabla, 6, 'F')
  doc.rect(startXPaqTarTabla, startYPegado, widthPaqTarTabla, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Paq. x Tar', startXPaqTarTabla + 2, startYPegado + 5)

  doc.rect(startXPaqTarTabla, startYPegado + 6, widthPaqTarTabla, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(producto.paquete || '', startXPaqTarTabla + 2, startYPegado + 6 + 7)

  // Columna 3: Cant x Tar
  let startXCantTarTabla = startXPaqTarTabla + widthPaqTarTabla + 1
  let widthCantTarTabla = 18
  doc.setFillColor(200, 200, 200)
  doc.rect(startXCantTarTabla, startYPegado, widthCantTarTabla, 6, 'F')
  doc.rect(startXCantTarTabla, startYPegado, widthCantTarTabla, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Cant x Tar', startXCantTarTabla + 2, startYPegado + 5)

  doc.rect(startXCantTarTabla, startYPegado + 6, widthCantTarTabla, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  const cantTarima = producto.cantidad_tarima
  doc.text((cantTarima || '').toString(), startXCantTarTabla + 2, startYPegado + 6 + 7)

  // Merma Pegado (después de las 3 columnas) - CON DATOS DEL NUEVO ENDPOINT
  let startXMermaPegado = startXCantTarTabla + widthCantTarTabla + 1
  let widthMermaPegado = 16
  let filaAltosMermaPegado = [5, 5, 5]

  // Fila 1: Título "Merma"
  doc.setFillColor(200, 200, 200)
  doc.rect(startXMermaPegado, startYPegado, widthMermaPegado, filaAltosMermaPegado[0], 'F')
  doc.rect(startXMermaPegado, startYPegado, widthMermaPegado, filaAltosMermaPegado[0])
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Merma', startXMermaPegado + 2, startYPegado + 5)

  // Fila 2: Número
  doc.rect(
    startXMermaPegado,
    startYPegado + filaAltosMermaPegado[0],
    widthMermaPegado,
    filaAltosMermaPegado[1],
  )
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(
    pegado.merma?.toString() || '',
    startXMermaPegado + 2,
    startYPegado + filaAltosMermaPegado[0] + 4.5,
  )

  // Fila 3: Número con %
  doc.rect(
    startXMermaPegado,
    startYPegado + filaAltosMermaPegado[0] + filaAltosMermaPegado[1],
    widthMermaPegado,
    filaAltosMermaPegado[2],
  )
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(
    '% ',
    startXMermaPegado + 2,
    startYPegado + filaAltosMermaPegado[0] + filaAltosMermaPegado[1] + 4.5,
  )

  // Total Entregadas Pegado - CON DATOS DEL NUEVO ENDPOINT
  let startXTotalPegado = startXMermaPegado + widthMermaPegado + 1
  let widthTotalPegado = 40
  doc.setFillColor(200, 200, 200)
  doc.rect(startXTotalPegado, startYPegado, widthTotalPegado, 6, 'F')
  doc.rect(startXTotalPegado, startYPegado, widthTotalPegado, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Total Entregadas', startXTotalPegado + 2, startYPegado + 5)

  doc.rect(startXTotalPegado, startYPegado + 6, widthTotalPegado, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(pegado.total_entregadas?.toString() || '', startXTotalPegado + 2, startYPegado + 6 + 7)

  // Firma Operador Pegado - CON DATOS DEL NUEVO ENDPOINT
  let startXFirmaPegado = startXTotalPegado + widthTotalPegado + 1
  let widthFirmaPegado = 36
  doc.setFillColor(200, 200, 200)
  doc.rect(startXFirmaPegado, startYPegado, widthFirmaPegado, 6, 'F')
  doc.rect(startXFirmaPegado, startYPegado, widthFirmaPegado, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Firma Operador', startXFirmaPegado + 2, startYPegado + 5)

  doc.rect(startXFirmaPegado, startYPegado + 6, widthFirmaPegado, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(pegado.firma_operador || '', startXFirmaPegado + 2, startYPegado + 6 + 7)

  // SÉPTIMA SECCIÓN (Armado)
  let startYArmado = startYPegado + 15 + 5

  // Armado
  let widthArmado = 40
  let heightArmado = 6
  doc.setFillColor(200, 200, 200)
  doc.rect(startX, startYArmado, widthArmado, heightArmado, 'F')
  doc.rect(startX, startYArmado, widthArmado, heightArmado)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Armado', startX + 2, startYArmado + 5)

  // Cantidad Armado - CON DATOS DEL NUEVO ENDPOINT
  doc.rect(startX, startYArmado + heightArmado, widthArmado, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(
    armado.cantidad_recibida?.toString() || armado.total_entregadas?.toString() || '',
    startX + 2,
    startYArmado + heightArmado + 7,
  )

  // Autorización Armado Calidad (entre Armado y Total Entregadas) - CON DATOS DEL NUEVO ENDPOINT
  let startXAuthArmado = startX + widthArmado + 1
  let widthAuthArmado = 32
  doc.setFillColor(200, 200, 200)
  doc.rect(startXAuthArmado, startYArmado, widthAuthArmado, 6, 'F')
  doc.rect(startXAuthArmado, startYArmado, widthAuthArmado, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Autorización', startXAuthArmado + 2, startYArmado + 3)
  doc.text('Armado Calidad', startXAuthArmado + 2, startYArmado + 5.5)

  doc.rect(startXAuthArmado, startYArmado + 6, widthAuthArmado, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(armado.autorizacion || '', startXAuthArmado + 2, startYArmado + 6 + 7)

  // Total Entregadas Armado - CON DATOS DEL NUEVO ENDPOINT
  let startXTotalArmado = startXAuthArmado + widthAuthArmado + 1
  let widthTotalArmado = 25
  doc.setFillColor(200, 200, 200)
  doc.rect(startXTotalArmado, startYArmado, widthTotalArmado, 6, 'F')
  doc.rect(startXTotalArmado, startYArmado, widthTotalArmado, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Total Entregadas', startXTotalArmado + 0, startYArmado + 5)

  doc.rect(startXTotalArmado, startYArmado + 6, widthTotalArmado, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(armado.total_entregadas?.toString() || '', startXTotalArmado + 2, startYArmado + 6 + 7)

  // Firma Operador Armado - CON DATOS DEL NUEVO ENDPOINT
  let startXFirmaArmado = startXTotalArmado + widthTotalArmado + 1
  let widthFirmaArmado = 35
  doc.setFillColor(200, 200, 200)
  doc.rect(startXFirmaArmado, startYArmado, widthFirmaArmado, 6, 'F')
  doc.rect(startXFirmaArmado, startYArmado, widthFirmaArmado, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Firma Operador', startXFirmaArmado + 2, startYArmado + 5)

  doc.rect(startXFirmaArmado, startYArmado + 6, widthFirmaArmado, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(armado.firma_operador || '', startXFirmaArmado + 2, startYArmado + 6 + 7)

  // AGREGAR IMAGEN AL LADO DERECHO DE FIRMA OPERADOR ARMADO
  let startXImagenArmado = startXFirmaArmado + widthFirmaArmado + 20
  let widthImagenArmado = 130
  let heightImagenArmado = 75

  // Cargar y agregar la imagen si existe
  if (imagen) {
    try {
      const imageData = `data:image/png;base64,${imagen}`
      doc.addImage(
        imageData,
        'PNG',
        startXImagenArmado,
        startYArmado,
        widthImagenArmado,
        heightImagenArmado,
      )
    } catch (imageError) {
      console.error('Error al cargar imagen en armado:', imageError)
    }
  } else {
    // Si no hay imagen, agregar un rectángulo placeholder rojo
    doc.setFillColor(255, 200, 200) // Color rojo claro
    doc.rect(startXImagenArmado, startYArmado, widthImagenArmado, heightImagenArmado, 'F')
    doc.rect(startXImagenArmado, startYArmado, widthImagenArmado, heightImagenArmado)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6)
    doc.text('Imagen Suaje', startXImagenArmado + 2, startYArmado + heightImagenArmado / 2)
  }

  // OCTAVA SECCIÓN (Almacén)
  let startYAlmacen = startYArmado + 15 + 5 // 15 = altura total de Armado, 8 = separación

  // Almacén
  let widthAlmacen = 40
  let heightAlmacen = 6
  doc.setFillColor(200, 200, 200)
  doc.rect(startX, startYAlmacen, widthAlmacen, heightAlmacen, 'F')
  doc.rect(startX, startYAlmacen, widthAlmacen, heightAlmacen)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Almacén', startX + 2, startYAlmacen + 5)

  // Recibidas Almacén - CON DATOS DEL NUEVO ENDPOINT
  doc.rect(startX, startYAlmacen + heightAlmacen, widthAlmacen, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(almacen.cantidad?.toString() || '', startX + 2, startYAlmacen + heightAlmacen + 7)

  // Opciones PAQ, TAR, BUL, ATA con círculos - SIN BORDES
  let startXTablaAlmacen = startX + widthAlmacen + 1

  let opcionesAlmacen = ['PAQ', 'TAR', 'BUL', 'ATA']
  opcionesAlmacen.forEach((texto, i) => {
    doc.circle(startXTablaAlmacen + 2, startYAlmacen + i * 4 + 2, 1, 'S')
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text(texto, startXTablaAlmacen + 5, startYAlmacen + i * 4 + 3)
  })

  // Columna de 4 filas con width 7
  let startXColumna = startXTablaAlmacen + 13 // 20 = espacio para las opciones anteriores
  let widthColumna = 7

  // Crear 4 filas
  for (let i = 0; i < 4; i++) {
    doc.rect(startXColumna, startYAlmacen + i * 4, widthColumna, 4)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text('', startXColumna + 1, startYAlmacen + i * 4 + 2.5)
  }

  // Tabla con 10 columnas y 2 filas - CON DATOS DE TARIMAS
  let startXTablaGrande = startXColumna + widthColumna + 1
  let widthTablaGrande = 73 // 10 columnas × 7mm cada una
  let filaAltosTabla = [8, 8] // 2 filas

  let colWidthTabla = widthTablaGrande / 10

  // Dividir las tarimas en un array
  const tarimasArray = almacen.tarimas ? almacen.tarimas.split(', ') : []

  // Mostrar tarimas en orden continuo a través de las filas
  for (let fila = 0; fila < 2; fila++) {
    for (let columna = 0; columna < 10; columna++) {
      const indice = fila * 10 + columna
      const tarimaValor = tarimasArray[indice] || ''

      // Dibujar celda
      doc.rect(
        startXTablaGrande + columna * colWidthTabla,
        startYAlmacen + fila * filaAltosTabla[0],
        colWidthTabla,
        filaAltosTabla[fila],
      )

      // Mostrar valor de tarima
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(7)
      doc.text(
        tarimaValor,
        startXTablaGrande + columna * colWidthTabla + 1,
        startYAlmacen + fila * filaAltosTabla[0] + 5,
      )
    }
  }
  // OCTAVA SECCIÓN (Autorizaciones Envío)
  let startYAuthEnvio = startYAlmacen + 15 + 5

  // Agregar imagen antes de Certificado
  let startXImagenAuth = startX
  let widthImagenAuth = 5
  let heightImagenAuth = 15

  // Cargar y agregar la imagen
  doc.addImage(
    '/imagen/image.png',
    'PNG',
    startXImagenAuth,
    startYAuthEnvio,
    widthImagenAuth,
    heightImagenAuth,
  )

  // Certificado (IZQUIERDA) - después de la imagen - CON DATOS DEL NUEVO ENDPOINT
  let startXCertificadoAuth = startXImagenAuth + widthImagenAuth + 0
  let widthCertificadoAuth = 15
  doc.setFillColor(200, 200, 200)
  doc.rect(startXCertificadoAuth, startYAuthEnvio, widthCertificadoAuth, 6, 'F')
  doc.rect(startXCertificadoAuth, startYAuthEnvio, widthCertificadoAuth, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.text('Certificado', startXCertificadoAuth + 0, startYAuthEnvio + 5)

  doc.rect(startXCertificadoAuth, startYAuthEnvio + 6, widthCertificadoAuth, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(calidad.certificado || '', startXCertificadoAuth + 2, startYAuthEnvio + 6 + 7)

  // Etiquetas (IZQUIERDA) - CON DATOS DEL NUEVO ENDPOINT
  let startXEtiquetasAuth = startXCertificadoAuth + widthCertificadoAuth + 1
  let widthEtiquetasAuth = 15
  doc.setFillColor(200, 200, 200)
  doc.rect(startXEtiquetasAuth, startYAuthEnvio, widthEtiquetasAuth, 6, 'F')
  doc.rect(startXEtiquetasAuth, startYAuthEnvio, widthEtiquetasAuth, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Etiquetas', startXEtiquetasAuth + 0, startYAuthEnvio + 5)

  doc.rect(startXEtiquetasAuth, startYAuthEnvio + 6, widthEtiquetasAuth, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(calidad.etiquetas || '', startXEtiquetasAuth + 2, startYAuthEnvio + 6 + 7)

  // Revisión (IZQUIERDA) - CON DATOS DEL NUEVO ENDPOINT
  let startXRevisionAuth = startXEtiquetasAuth + widthEtiquetasAuth + 1
  let widthRevisionAuth = 15
  doc.setFillColor(200, 200, 200)
  doc.rect(startXRevisionAuth, startYAuthEnvio, widthRevisionAuth, 6, 'F')
  doc.rect(startXRevisionAuth, startYAuthEnvio, widthRevisionAuth, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Revisión', startXRevisionAuth + 0, startYAuthEnvio + 5)

  doc.rect(startXRevisionAuth, startYAuthEnvio + 6, widthRevisionAuth, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(calidad.revision || '', startXRevisionAuth + 2, startYAuthEnvio + 6 + 7)

  // Vacío (IZQUIERDA) - después de Revisión
  let startXVacioAuth = startXRevisionAuth + widthRevisionAuth + 1
  let widthVacioAuth = 13
  doc.setFillColor(200, 200, 200)
  doc.rect(startXVacioAuth, startYAuthEnvio, widthVacioAuth, 6, 'F')
  doc.rect(startXVacioAuth, startYAuthEnvio, widthVacioAuth, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('', startXVacioAuth + 2, startYAuthEnvio + 5)

  doc.rect(startXVacioAuth, startYAuthEnvio + 6, widthVacioAuth, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', startXVacioAuth + 2, startYAuthEnvio + 6 + 7)

  let startXAuthCalidad = startXVacioAuth + widthVacioAuth + 1
  let widthAuthEnvioCalidad = 32.5
  let heightAuthEnvioCalidad = 6
  doc.setFillColor(200, 200, 200)
  doc.rect(startXAuthCalidad, startYAuthEnvio, widthAuthEnvioCalidad, heightAuthEnvioCalidad, 'F')
  doc.rect(startXAuthCalidad, startYAuthEnvio, widthAuthEnvioCalidad, heightAuthEnvioCalidad)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6)
  doc.text('Autorizacion Envio Calidad', startXAuthCalidad + 0, startYAuthEnvio + 5)

  doc.rect(startXAuthCalidad, startYAuthEnvio + heightAuthEnvioCalidad, widthAuthEnvioCalidad, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(
    calidad.autorizacion_calidad || '',
    startXAuthCalidad + 2,
    startYAuthEnvio + heightAuthEnvioCalidad + 7,
  )

  // Autorización Envio Administración (DERECHA) - CON DATOS DEL NUEVO ENDPOINT
  let startXAuthEnvioAdmin = startXAuthCalidad + widthAuthEnvioCalidad + 1
  let widthAuthEnvioAdmin = 35
  doc.setFillColor(200, 200, 200)
  doc.rect(startXAuthEnvioAdmin, startYAuthEnvio, widthAuthEnvioAdmin, 6, 'F')
  doc.rect(startXAuthEnvioAdmin, startYAuthEnvio, widthAuthEnvioAdmin, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6)
  doc.text('Autorización Envio Administración', startXAuthEnvioAdmin + 0, startYAuthEnvio + 5)

  doc.rect(startXAuthEnvioAdmin, startYAuthEnvio + 6, widthAuthEnvioAdmin, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(
    calidad.autorizacion_administracion || '',
    startXAuthEnvioAdmin + 0,
    startYAuthEnvio + 6 + 7,
  )

  // NOVENA SECCIÓN (Vehículo y Observaciones)
  let startYVehiculo = startYAuthEnvio + 15 + 4 // Espacio después de la sección anterior

  // Vehículo (columna de 3 filas) - CON DATOS DEL NUEVO ENDPOINT
  let startXVehiculo = startX
  let widthVehiculo = 25
  let alturaFila = 4.5 // Altura para cada fila

  // Primera fila - Encabezado
  doc.setFillColor(200, 200, 200)
  doc.rect(startXVehiculo, startYVehiculo, widthVehiculo, 6, 'F')
  doc.rect(startXVehiculo, startYVehiculo, widthVehiculo, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Vehículo', startXVehiculo + 2, startYVehiculo + 5)

  // Dividir el vehículo en marca y placa
  const vehiculoCompleto = envio.vehiculo || ''
  const partesVehiculo = vehiculoCompleto.split(' ')
  const marcaVehiculo = partesVehiculo[0] || '' // "Toyota"
  const placaVehiculo = partesVehiculo.slice(1).join(' ') || '' // "ABC-1234"

  // Segunda fila - Marca del vehículo
  doc.rect(startXVehiculo, startYVehiculo + 6, widthVehiculo, alturaFila)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(marcaVehiculo, startXVehiculo + 2, startYVehiculo + 4 + 5)

  // Tercera fila - Placa del vehículo
  doc.rect(startXVehiculo, startYVehiculo + 6 + alturaFila, widthVehiculo, alturaFila)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(placaVehiculo, startXVehiculo + 2, startYVehiculo + 4 + alturaFila + 5)
  // Operador - CON DATOS DEL NUEVO ENDPOINT
  let startXOperador = startXVehiculo + widthVehiculo + 1
  let widthOperador = 25
  doc.setFillColor(200, 200, 200)
  doc.rect(startXOperador, startYVehiculo, widthOperador, 6, 'F')
  doc.rect(startXOperador, startYVehiculo, widthOperador, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Operador', startXOperador + 2, startYVehiculo + 5)

  doc.rect(startXOperador, startYVehiculo + 6, widthOperador, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(envio.operador || '', startXOperador + 2, startYVehiculo + 6 + 7)

  // Observations - CON DATOS DEL NUEVO ENDPOINT
  let startXObservations = startXOperador + widthOperador + 1
  let widthObservations = 50
  doc.setFillColor(200, 200, 200)
  doc.rect(startXObservations, startYVehiculo, widthObservations, 6, 'F')
  doc.rect(startXObservations, startYVehiculo, widthObservations, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Observations:', startXObservations + 2, startYVehiculo + 5)

  doc.rect(startXObservations, startYVehiculo + 6, widthObservations, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(envio.observaciones || '', startXObservations + 2, startYVehiculo + 6 + 7)

  // Total Enviadas - CON DATOS DEL NUEVO ENDPOINT
  let startXTotalEnviadas = startXObservations + widthObservations + 1
  let widthTotalEnviadas = 32
  doc.setFillColor(200, 200, 200)
  doc.rect(startXTotalEnviadas, startYVehiculo, widthTotalEnviadas, 6, 'F')
  doc.rect(startXTotalEnviadas, startYVehiculo, widthTotalEnviadas, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Total Enviadas', startXTotalEnviadas + 2, startYVehiculo + 5)

  doc.rect(startXTotalEnviadas, startYVehiculo + 6, widthTotalEnviadas, 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(envio.total_envio?.toString() || '', startXTotalEnviadas + 2, startYVehiculo + 6 + 7)

  // Porcentaje
  let startYPorcentaje = startYVehiculo + 15 + 2
  let widthPorcentaje = 15
  let heightPorcentaje = 8

  // Mover hacia la derecha sumando más espacio
  let startXPorcentaje = startXTotalEnviadas + 9 // Ajusta este número según necesites
  // Recuadro blanco con merma - CON DATOS DEL NUEVO ENDPOINT
  doc.rect(startXPorcentaje, startYPorcentaje, widthPorcentaje, heightPorcentaje)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(envio.merma?.toString() || '', startXPorcentaje + 2, startYPorcentaje + 6)

  // Texto % a la derecha del recuadro
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('%', startXPorcentaje + widthPorcentaje + 2, startYPorcentaje + 6)

  //////////////////////////////////////////////////////////////////////////////////////////
  doc.save(`orden_produccion_completa_${noOrden}.pdf`)
}

// Las funciones existentes se mantienen igual
const obtenerOrdenes = async () => {
  try {
    loading.value = true
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/buscarTabla/orden_produccion')

    // Verificar y eliminar órdenes completadas con más de 7 días
    await verificarEliminaciones()

    const ordenesConProgreso = await Promise.all(
      res.data.map(async (orden) => {
        try {
          const detalleRes = await axios.get(
            `https://backendgrupoeb.onrender.com/api/ordenproduccion/${orden.no_orden}`,
          )
          const detalle = detalleRes.data

          // Calcular días restantes para órdenes completadas
          const diasRestantes =
            orden.estado_detallado === 'Completada' && orden.fecha_completada
              ? calcularDiasRestantes(orden.fecha_completada)
              : null

          return {
            ...orden,
            fecha: new Date(orden.fecha).toLocaleDateString('es-ES'),
            no_pedido: orden.no_pedido_id,
            progreso: calcularProgreso(detalle),
            procesos_completados: contarProcesosCompletados(detalle),
            estado_detallado: obtenerEstadoDetallado(detalle),
            nombre_producto: detalle.nombre_producto || 'Producto',
            fecha_inicio: orden.fecha_inicio || orden.fecha,
            fecha_completada: orden.fecha_completada,
            eliminada: orden.eliminada || false,
            diasRestantes, // Esto se mostrará en la tabla
          }
        } catch (error) {
          console.error(`Error al obtener detalle de ${orden.no_orden}:`, error)
          return {
            ...orden,
            fecha: new Date(orden.fecha).toLocaleDateString('es-ES'),
            no_pedido: orden.no_pedido_id,
            progreso: 0,
            procesos_completados: 0,
            estado_detallado: 'Sin información',
            nombre_producto: 'Producto',
            fecha_inicio: orden.fecha_inicio || orden.fecha,
            fecha_completada: orden.fecha_completada,
            eliminada: orden.eliminada || false,
            diasRestantes: null,
          }
        }
      }),
    )

    ordenes.value = ordenesConProgreso.sort((a, b) => b.no_orden.localeCompare(a.no_orden))
  } catch (error) {
    console.error('Error al obtener órdenes de producción:', error)
    ordenes.value = []
  } finally {
    loading.value = false
  }
}
// Función para calcular días restantes antes de eliminación
// Función para calcular días restantes antes de eliminación
const calcularDiasRestantes = (fechaCompletada) => {
  if (!fechaCompletada) return 7

  try {
    const fechaCompletadaObj = new Date(fechaCompletada)
    const fechaEliminacion = new Date(fechaCompletadaObj)
    fechaEliminacion.setDate(fechaEliminacion.getDate() + 7) // +7 días

    const fechaActual = new Date()
    const diferenciaTiempo = fechaEliminacion.getTime() - fechaActual.getTime()
    const diasRestantes = Math.ceil(diferenciaTiempo / (1000 * 3600 * 24))

    return diasRestantes
  } catch {
    return 7
  }
}

// Función para verificar y eliminar órdenes completadas con más de 7 días
const verificarEliminaciones = async () => {
  try {
    await axios.post('https://backendgrupoeb.onrender.com/api/ordenproduccion/limpiar-completadas')
    console.log('✅ Verificación de eliminaciones completada')
  } catch (error) {
    console.error('Error al verificar eliminaciones:', error)
  }
}

// Función para formatear fecha
// const formatFecha = (fecha) => {
//   if (!fecha) return '—'

//   try {
//     const fechaObj = new Date(fecha)
//     return fechaObj.toLocaleDateString('es-ES', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//     })
//   } catch {
//     return fecha
//   }
// }

// const verDetalleOrden = (orden) => {
//   console.log('🧠 Datos de orden:', orden)
//   router.push({
//     name: 'ordenProduccion',
//     params: { id: orden.no_orden },
//   })
// }

// Resto de funciones se mantienen igual...
const calcularProgreso = (orden) => {
  const procesos = [
    orden.proceso_recepcion_id,
    orden.proceso_impresion_id,
    orden.proceso_suaje_id,
    orden.proceso_pegado_id,
    orden.proceso_armado_id,
    orden.proceso_almacen_id,
    orden.proceso_calidad_id,
    orden.proceso_envio_id,
  ]

  const completados = procesos.filter((proceso) => proceso !== null).length
  return Math.round((completados / 8) * 100)
}

const contarProcesosCompletados = (orden) => {
  const procesos = [
    orden.proceso_recepcion_id,
    orden.proceso_impresion_id,
    orden.proceso_suaje_id,
    orden.proceso_pegado_id,
    orden.proceso_armado_id,
    orden.proceso_almacen_id,
    orden.proceso_calidad_id,
    orden.proceso_envio_id,
  ]

  return procesos.filter((proceso) => proceso !== null).length
}

const obtenerEstadoDetallado = (orden) => {
  const procesosCompletados = contarProcesosCompletados(orden)

  if (procesosCompletados === 0) return 'Pendiente'
  if (procesosCompletados === 8) return 'Completada'
  if (procesosCompletados >= 5) return 'Avanzada'
  return 'En proceso'
}

onMounted(() => obtenerOrdenes())
</script>
