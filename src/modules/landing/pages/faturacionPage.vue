<template>
  <form @submit.prevent="submitForm">
    <div class="min-h-screen w-full bg-gray-100 flex justify-center items-center p-6">
      <div class="w-full max-w-5xl bg-white p-8 rounded-xl shadow-2xl">
        <!-- ENCABEZADO -->
        <div class="flex items-center justify-between mb-10">
          <img src="/imagen/logo.jpg" alt="Logo" class="h-16" />
          <div class="text-center flex-1">
            <h2 class="text-3xl font-bold text-gray-800">Datos Facturación y Envío</h2>
          </div>
        </div>

        <!-- SECCIÓN FACTURACIÓN -->
        <div class="mb-10">
          <div class="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mb-6">
            <h3 class="font-semibold text-gray-800 text-xl flex items-center">
              Datos de Facturación
            </h3>
          </div>
          <!-- NÚMERO DE PEDIDO EDITABLE -->
          <div class="mb-6">
            <label class="block text-lg font-medium text-gray-700 mb-2">Número de Pedido:</label>
            <input
              v-model="formData.numero_pedido"
              type="text"
              class="w-48 border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-bold text-red-600"
              placeholder="Ingrese el pedido"
              required
            />
            <p v-if="numeroPedidoError" class="text-red-600 text-sm mt-1">
              {{ numeroPedidoError }}
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">Razón Social:</label>
              <input
                v-model="formData.razon_social_facturacion"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">RFC:</label>
              <input
                v-model="formData.rfc_facturacion"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">Email:</label>
              <input
                v-model="formData.email_facturacion"
                type="email"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">C.P.:</label>
              <input
                v-model="formData.cp_facturacion"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">Uso de CFDI:</label>
              <select
                v-model="formData.uso_cfdi"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Selecciona un CFDI</option>
                <option value="G01 - Adquisición de mercancias">G01 - Adquisición de mercancias</option>
                <option value="G03 - Gastos en general">G03 - Gastos en general</option>
                <option value="S01 - Sin efectos fiscales">S01 - Sin efectos fiscales</option>
              </select>
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">Método de pago:</label>
              <select
                v-model="formData.metodo_pago"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Selecciona metodo de pago</option>
                <option value="PUE - Pago en una sola exhibición ">PUE - Pago en una sola exhibición</option>
                <option value="PPD - Pago en parcialidades o diferido">PPD - Pago en parcialidades o diferido</option>
              </select>
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">Forma de pago:</label>
              <select
                v-model="formData.forma_pago"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Selecciona su forma de pago</option>
                <option v-for="pago in formasPago" :key="pago.codigo" :value="pago.texto">
                  {{ pago.codigo }} - {{ pago.texto }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- SECCIÓN DESTINATARIO -->
        <div class="mb-10">
          <div class="bg-orange-50 border-l-4 border-orange-500 p-5 rounded-r-lg mb-1">
            <h3 class="font-semibold text-gray-800 text-xl flex items-center">
              Datos Destinatario (Envío de mercancía)
            </h3>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2"
                >Nombre (quien recibe):</label
              >
              <input
                v-model="formData.nombre_destinatario"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">Razón Social:</label>
              <input
                v-model="formData.razon_social_destinatario"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">RFC:</label>
              <input
                v-model="formData.rfc_destinatario"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">Teléfono:</label>
              <input
                v-model="formData.telefono_destinatario"
                type="tel"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div class="lg:col-span-2">
              <label class="block text-lg font-medium text-gray-700 mb-2">Domicilio:</label>
              <input
                v-model="formData.domicilio_destinatario"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">Colonia:</label>
              <input
                v-model="formData.colonia_destinatario"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">Ciudad:</label>
              <input
                v-model="formData.ciudad_destinatario"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">Estado:</label>
              <select
                v-model="formData.estado_destinatario"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              >
                <option value="">Selecciona un estado</option>
                <option value="Aguascalientes">Aguascalientes</option>
                <option value="Baja California">Baja California</option>
                <option value="Baja California Sur">Baja California Sur</option>
                <option value="Campeche">Campeche</option>
                <option value="Chiapas">Chiapas</option>
                <option value="Chihuahua">Chihuahua</option>
                <option value="Ciudad de México">Ciudad de México</option>
                <option value="Coahuila">Coahuila</option>
                <option value="Colima">Colima</option>
                <option value="Durango">Durango</option>
                <option value="Estado de México">Estado de México</option>
                <option value="Guanajuato">Guanajuato</option>
                <option value="Guerrero">Guerrero</option>
                <option value="Hidalgo">Hidalgo</option>
                <option value="Jalisco">Jalisco</option>
                <option value="Michoacán">Michoacán</option>
                <option value="Morelos">Morelos</option>
                <option value="Nayarit">Nayarit</option>
                <option value="Nuevo León">Nuevo León</option>
                <option value="Oaxaca">Oaxaca</option>
                <option value="Puebla">Puebla</option>
                <option value="Querétaro">Querétaro</option>
                <option value="Quintana Roo">Quintana Roo</option>
                <option value="San Luis Potosí">San Luis Potosí</option>
                <option value="Sinaloa">Sinaloa</option>
                <option value="Sonora">Sonora</option>
                <option value="Tabasco">Tabasco</option>
                <option value="Tamaulipas">Tamaulipas</option>
                <option value="Tlaxcala">Tlaxcala</option>
                <option value="Veracruz">Veracruz</option>
                <option value="Yucatán">Yucatán</option>
                <option value="Zacatecas">Zacatecas</option>
              </select>
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">C.P.:</label>
              <input
                v-model="formData.cp_destinatario"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">Email:</label>
              <input
                v-model="formData.email_destinatario"
                type="email"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <!-- PAQUETERÍA Y ENTREGA -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <label class="block text-xl font-semibold text-gray-700 mb-3">Paquetería</label>
            <select
              v-model="formData.paqueteria"
              class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:border-transparent"
              required
            >
              <option value="">seleccione un opción</option>
              <option value="Castores">Castores</option>
              <option value="Tres Guerras">Tres Guerras</option>
              <option value="Paquete Express">Paquete Express</option>
              <option value="FedEx">FedEx</option>
              <option value="Estafeta">Estafeta</option>
              <option value="Cora express">Cora express</option>
              <option value="Sinaloa express">Sinaloa express</option>
              <option value="Local">Local</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div>
            <label class="block text-xl font-semibold text-gray-700 mb-3">Tipo de entrega</label>
            <select
              v-model="formData.tipo_entrega"
              class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:border-transparent"
              required
            >
              <option value="">seleccione un opción</option>
              <option value="Ocurre">Ocurre</option>
              <option value="A Domicilio">A Domicilio</option>
              <option value="Guias">Guias</option>
            </select>
          </div>
        </div>

        <!-- NOTA -->
        <div class="mb-8">
          <label class="block text-xl font-semibold text-gray-700 mb-3">Nota:</label>
          <textarea
            v-model="formData.nota"
            class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent h-28"
          ></textarea>
        </div>

        <!-- BOTÓN ENVIAR -->
        <div class="flex justify-center">
          <button
            type="submit"
            :disabled="loading"
            class="bg-green-600 hover:bg-green-700 text-white font-bold text-xl px-16 py-4 rounded-xl shadow-lg transition-colors transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Enviando...' : 'Enviar Formulario' }}
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Estado de carga
const loading = ref(false)

// Estado del formulario
const formData = ref({
  // Facturación
  numero_pedido: '',
  razon_social_facturacion: '',
  rfc_facturacion: '',
  email_facturacion: '',
  cp_facturacion: '',
  uso_cfdi: '',
  metodo_pago: '',
  forma_pago: '',

  // Destinatario
  nombre_destinatario: '',
  razon_social_destinatario: '',
  rfc_destinatario: '',
  telefono_destinatario: '',
  domicilio_destinatario: '',
  colonia_destinatario: '',
  ciudad_destinatario: '',
  estado_destinatario: '',
  cp_destinatario: '',
  email_destinatario: '',

  // Paquetería
  paqueteria: '',
  tipo_entrega: '',

  // Nota
  nota: '',
})

// Lista de facturas existentes (para validar duplicados)
const facturas = ref([])

// Error de número de pedido
const numeroPedidoError = ref('')

// Formas de pago
const formasPago = [
  { codigo: '01', texto: 'Efectivo' },
  { codigo: '02', texto: 'Cheque nominativo' },
  { codigo: '03', texto: 'Transferencia electrónica de fondos' },
  { codigo: '04', texto: 'Tarjeta de crédito' },
  { codigo: '05', texto: 'Monedero electrónico' },
  { codigo: '06', texto: 'Dinero electrónico' },
  { codigo: '08', texto: 'Vales de despensa' },
  { codigo: '28', texto: 'Tarjeta de débito' },
]

// --- Función para obtener facturas existentes ---
const obtenerFacturas = async () => {
  try {
    const res = await fetch('https://backendgrupoeb.onrender.com/api/facturacion-envio/todos')
    facturas.value = await res.json()
  } catch (error) {
    console.error('Error al obtener facturas:', error)
  }
}

// --- Validación número de pedido ---
const validarNumeroPedido = () => {
  const existe = facturas.value.some((f) => f.numero_pedido === formData.value.numero_pedido)
  if (existe) {
    numeroPedidoError.value = '¡Este número de pedido ya existe!'
    return false
  }
  numeroPedidoError.value = ''
  return true
}

// --- Enviar formulario ---
const submitForm = async () => {
  // Validar número de pedido antes de enviar
  if (!validarNumeroPedido()) return

  loading.value = true
  try {
    const response = await fetch('https://backendgrupoeb.onrender.com/api/facturacion-envio/insertar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value),
    })

    const contentType = response.headers.get('content-type')
    let result
    if (contentType && contentType.includes('application/json')) {
      result = await response.json()
    } else {
      const text = await response.text()
      throw new Error(`Respuesta no JSON: ${text}`)
    }

    if (!response.ok) {
      throw new Error(result.error || result.message || 'Error del servidor')
    }

    alert('Formulario enviado exitosamente!')

    // Resetear formulario
    Object.keys(formData.value).forEach((key) => {
      formData.value[key] = ''
    })

    // Actualizar lista de facturas
    obtenerFacturas()
  } catch (error) {
    alert(`Error al enviar el formulario: ${error.message}`)
  } finally {
    loading.value = false
  }
}

// Cargar facturas al montar el componente
onMounted(obtenerFacturas)
</script>
