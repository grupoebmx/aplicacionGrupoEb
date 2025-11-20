<template>
  <div class="min-h-screen w-full p-4 bg-gray-100 flex justify-center items-start">
    <div class="w-full max-w-[1700px] bg-white p-6 rounded shadow mt-8">
      <form @submit.prevent="guardarCambios">
        <!-- ENCABEZADO -->
        <div class="flex items-center justify-between mb-10">
          <h1 class="text-4xl font-bold text-gray-800 text-center flex-1">
            Editar Facturación y Envío
          </h1>
        </div>

        <!-- SECCIÓN: DATOS DE FACTURACIÓN -->
        <div class="mb-10">
          <div>
            <h3 class="font-semibold text-gray-800 text-2xl">Datos de Facturación</h3>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">Número de Pedido:</label>
              <input
                v-model="form.numero_pedido"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:border-transparent font-bold text-red-600"
                placeholder="Ingrese el pedido"
                required
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">Razón Social:</label>
              <input
                v-model="form.razon_social_facturacion"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">RFC:</label>
              <input
                v-model="form.rfc_facturacion"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">Correo:</label>
              <input
                v-model="form.email_facturacion"
                type="email"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">C.P.:</label>
              <input
                v-model="form.cp_facturacion"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">Uso de CFDI:</label>
              <select
                v-model="form.uso_cfdi"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:border-transparent"
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
                v-model="form.metodo_pago"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:border-transparent"
                required
              >
                <option value="">Selecciona un método</option>
                <option value="PUE - Pago en una sola exhibición ">PUE - Pago en una sola exhibición</option>
                <option value="PPD - Pago en parcialidades o diferido">PPD - Pago en parcialidades o diferido</option>
              </select>
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">Forma de pago:</label>
              <select
                v-model="form.forma_pago"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:border-transparent"
                required
              >
                <option value="">Selecciona forma de pago</option>
                <option v-for="pago in formasPago" :key="pago.codigo" :value="pago.texto">
                  {{ pago.codigo }} - {{ pago.texto }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2"
                >Nombre del producto:</label
              >
              <input
                v-model="form.nombre_producto"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">Cantidad:</label>
              <input
                v-model="form.cantidad"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        <!-- SECCIÓN: DATOS DEL DESTINATARIO -->
        <div class="mb-10">
          <div>
            <h3 class="font-semibold text-gray-800 text-2xl">Datos Destinatario</h3>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2"
                >Nombre Destinatario:</label
              >
              <input
                v-model="form.nombre_destinatario"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2"
                >Razón Social Destinatario:</label
              >
              <input
                v-model="form.razon_social_destinatario"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">RFC Destinatario:</label>
              <input
                v-model="form.rfc_destinatario"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">Teléfono:</label>
              <input
                v-model="form.telefono_destinatario"
                type="tel"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">Email:</label>
              <input
                v-model="form.email_destinatario"
                type="email"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:border-transparent"
              />
            </div>
            <div class="lg:col-span-2">
              <label class="block text-lg font-medium text-gray-700 mb-2">Domicilio:</label>
              <input
                v-model="form.domicilio_destinatario"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">Colonia:</label>
              <input
                v-model="form.colonia_destinatario"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">Ciudad:</label>
              <input
                v-model="form.ciudad_destinatario"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">Estado:</label>
              <input
                v-model="form.estado_destinatario"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-lg font-medium text-gray-700 mb-2">C.P.:</label>
              <input
                v-model="form.cp_destinatario"
                type="text"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        <!-- PAQUETERÍA Y ENTREGA -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <label class="block text-lg font-semibold text-gray-700 mb-3">Paquetería</label>
            <select
              v-model="form.paqueteria"
              class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:border-transparent"
            >
              <option value="">Seleccione una opción</option>
              <option>Castores</option>
              <option>Tres Guerras</option>
              <option>FedEx</option>
              <option>Estafeta</option>
              <option>Paquete Express</option>
              <option>Local</option>
            </select>
          </div>
          <div>
            <label class="block text-lg font-semibold text-gray-700 mb-3">Tipo de entrega</label>
            <select
              v-model="form.tipo_entrega"
              class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:border-transparent"
            >
              <option value="">Seleccione una opción</option>
              <option>Ocurre</option>
              <option>A Domicilio</option>
              <option>Guias</option>
            </select>
          </div>
        </div>

        <!-- BOTÓN GUARDAR -->
        <div class="flex justify-center mt-8">
          <button
            type="submit"
            class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

// Datos del formulario
const form = reactive({
  numero_pedido: '',
  razon_social_facturacion: '',
  rfc_facturacion: '',
  email_facturacion: '',
  cp_facturacion: '',
  uso_cfdi: '',
  metodo_pago: '',
  forma_pago: '',
  nombre_producto: '',
  cantidad: '',
  domicilio_fiscal: '',
  nombre_destinatario: '',
  razon_social_destinatario: '',
  rfc_destinatario: '',
  telefono_destinatario: '',
  email_destinatario: '',
  domicilio_destinatario: '',
  colonia_destinatario: '',
  ciudad_destinatario: '',
  estado_destinatario: '',
  cp_destinatario: '',
  paqueteria: '',
  tipo_entrega: '',
  nota: '',
})

// Cargar datos existentes
const cargarFactura = async () => {
  try {
    const { numero_pedido } = route.params
    const res = await axios.get(`http://localhost:3000/api/facturacion-envio/${numero_pedido}`)
    if (res.data && res.data.length > 0) {
      Object.assign(form, res.data[0])
    } else {
      console.warn('No se encontró la factura')
    }
  } catch (error) {
    console.error('Error al cargar factura:', error)
  }
}

// Actualizar datos
const actualizarFactura = async () => {
  try {
    const { numero_pedido } = route.params
    await axios.put(`http://localhost:3000/api/facturacion-envio/actualizar/${numero_pedido}`, form)

    router.push('/TablaF')
  } catch (error) {
    console.error('Error al actualizar:', error)
    alert('Error al actualizar la factura')
  }
}

const guardarCambios = async () => {
  await actualizarFactura()
}

onMounted(() => {
  cargarFactura()
})

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
</script>
