<template>
  <div class="flex items-start justify-center min-h-screen bg-gray-100 p-4">
    <div class="w-full mt-8 mx-20 bg-white p-8 rounded-lg shadow-md">
      <!-- Título y Botón Agregar -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold font-[Inter]">Facturación y Envío</h2>

      </div>

      <!-- Tabla de Facturación y Envío -->
      <TablaFactura
        :encabezado="[
          'Núm. Pedido',
          'Facturación',
          'RFC Facturación',
          'Contacto Facturación',
          'CFDI',
          'Nota',
          'Forma de pago',
          'Destinatario',
          'RFC Destinatario',
          'Contacto Destinatario',
          'Ubicación',
          'Paqueteria',
          'Tipo de entrega',
        ]"
        :claves="[
          'numero_pedido',
          'razon_social_facturacion',
          'rfc_facturacion',
          'email_facturacion',
          'uso_cfdi',
          'nota',
          'forma_pago',
          'nombre_destinatario',
          'rfc_destinatario',
          'telefono_destinatario',
          'estado_destinatario',
          'paqueteria',
          'tipo_entrega',
        ]"
        :registros="facturas"
        @eliminar="eliminarRegistro"
        @editar="editarRegistro"
        @generarEtiqueta="generarEtiquetaPDF"
      />

      <!-- Modal de confirmación -->
      <div
        v-if="showConfirm"
        class="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50"
      >
        <div class="bg-white rounded-lg p-6 w-96 shadow-lg">
          <h3 class="text-lg font-semibold mb-4 text-gray-800">Confirmar Eliminación</h3>
          <p class="mb-6 text-gray-600">¿Seguro que quieres eliminar este registro?</p>
          <div class="flex justify-end gap-3">
            <button
              @click="cancelarEliminar"
              class="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              Cancelar
            </button>
            <button
              @click="confirmarEliminar"
              class="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import TablaFactura from '@/components/TablaFactura.vue'
import { ref, onMounted } from 'vue'

import jsPDF from 'jspdf'

// --- Variables reactivas ---
const facturas = ref([])
const showConfirm = ref(false)
const registroAEliminar = ref(null)




// --- Obtener registros ---
const obtenerRegistros = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/facturacion-envio/todos')
    facturas.value = await res.json()
  } catch (error) {
    console.error('Error al obtener registros:', error)
  }
}

// --- Eliminar registro ---
const eliminarRegistro = (numero_pedido) => {
  registroAEliminar.value = numero_pedido
  showConfirm.value = true
}

const confirmarEliminar = async () => {
  showConfirm.value = false
  const numero_pedido = registroAEliminar.value

  try {
    await fetch(`http://localhost:3000/api/facturacion-envio/eliminar/${numero_pedido}`, {
      method: 'DELETE',
    })
    registroAEliminar.value = null
    obtenerRegistros()
  } catch (error) {
    console.error('Error al eliminar registro:', error)
  }
}

const cancelarEliminar = () => {
  showConfirm.value = false
  registroAEliminar.value = null
}

// --- Editar registro ---
const editarRegistro = (registro) => {
  console.log('Editar registro:', registro)
  // Aquí puedes agregar la navegación a la vista de edición
  // Ejemplo: router.push(`/editar/${registro.numero_pedido}`)
}

// --- Generar etiqueta PDF ---
const generarEtiquetaPDF = (registro) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [170, 110],
  })

  doc.setFont('helvetica')
  const margenIzquierdo = 7
  let yPosition = 10

  // LOGO
  try {
    const logoUrl = '/imagen/logo.jpg'
    doc.addImage(logoUrl, 'JPEG', 45, yPosition, 20, 15)
  } catch {
    console.log('Logo no encontrado, continuando sin logo')
  }

  // REMITENTE
  yPosition = 30
  doc.setFontSize(9)
  doc.text('Remitente:', margenIzquierdo, yPosition)
  yPosition += 4
  doc.text('Grupeb', margenIzquierdo, yPosition)
  yPosition += 4
  doc.text('GRU110202DSS5', margenIzquierdo, yPosition)
  yPosition += 4
  doc.text('Rogelio Ledesma # 102', margenIzquierdo, yPosition)
  yPosition += 4
  doc.text('Col. Cruz Vieja', margenIzquierdo, yPosition)
  yPosition += 4
  doc.text('Tlajomulco de Zúñiga , Jalisco', margenIzquierdo, yPosition)
  yPosition += 4
  doc.text('cp. 45644', margenIzquierdo, yPosition)
  yPosition += 4
  doc.text('33 31259595', margenIzquierdo, yPosition)
  yPosition += 4
  doc.text(`Núm. Pedido: ${registro.numero_pedido || '-'}`, margenIzquierdo, yPosition)

  yPosition += 5
  doc.setDrawColor(0, 0, 0)
  doc.line(margenIzquierdo, yPosition, 100, yPosition)
  yPosition += 7

  doc.setFontSize(10)
  doc.setFont(undefined, 'bold')
  doc.text('Destinatario', margenIzquierdo, yPosition)
  yPosition += 5

  const campos = [
    { label: 'Producto:', value: registro.nombre_producto, bold: true, fontSize: 13 },
    { label: 'Cantidad:', value: registro.cantidad },
    { label: 'Nombre:', value: registro.nombre_destinatario },
    { label: 'Empresa:', value: registro.razon_social_facturacion },
    { label: 'RFC:', value: registro.rfc_destinatario },
    { label: 'Teléfono:', value: registro.telefono_destinatario },
    { label: 'Domicilio:', value: registro.domicilio_destinatario },
    { label: 'Colonia:', value: registro.colonia_destinatario },
    { label: 'Ciudad:', value: registro.ciudad_destinatario },
    { label: 'Estado:', value: registro.estado_destinatario },
    { label: 'C.P.:', value: registro.cp_destinatario || registro.cp_facturacion },
  ]

  campos.forEach((campo) => {
    // Etiqueta siempre en negrita con tamaño 10
    doc.setFontSize(10)
    doc.setFont(undefined, 'bold')
    doc.text(campo.label, margenIzquierdo, yPosition)

    // Aplicar estilo al valor
    doc.setFontSize(campo.fontSize || 10) // Tamaño 13 para producto, 10 para los demás
    doc.setFont(undefined, campo.bold ? 'bold' : 'normal')

    const valor = campo.value || '-'
    const lineas = doc.splitTextToSize(valor, 100)
    doc.text(lineas, margenIzquierdo + 25, yPosition)
    yPosition += Math.max(6, lineas.length * 5)
  })

  yPosition += 4
  doc.line(margenIzquierdo, yPosition, 100, yPosition)
  yPosition += 5
  doc.setFont(undefined, 'bold')
  doc.text(`Paquetería: ${registro.paqueteria || '-'}`, margenIzquierdo, yPosition)

  const nombreArchivo = `etiqueta-${registro.razon_social_facturacion || 'grupo'}.pdf`
  doc.save(nombreArchivo)
}

// --- Cargar registros al montar ---
onMounted(obtenerRegistros)
</script>
