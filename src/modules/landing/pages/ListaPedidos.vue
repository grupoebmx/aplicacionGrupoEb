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
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold font-[Inter]">Pedidos</h2>
      </div>

      <TablaPedidos
        :encabezado="['Núm. de pedido', 'Productos', 'Cliente', 'Fecha', 'Estado', 'Acciones']"
        :claves="['no_pedido', 'productos', 'nombre_cliente', 'fecha_formateada', 'status']"
        :info="pedidos"
        @OrdenCompra="hacerOrdenCompra"
        @OrdenProduccion="abrirModalProductos"
      />
    </div>
  </div>

  <!-- Modal Productos más grande -->
  <div
    v-if="showModal"
    class="fixed inset-0 bg-neutral-400/30 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-lg w-3/4 max-w-4xl max-h-[90vh] overflow-y-auto">
      <h3 class="text-2xl font-bold mb-4">
        Productos del Pedido {{ pedidoSeleccionado.no_pedido }}
      </h3>

      <ul class="mb-4">
        <li
          v-for="producto in productosSeleccionados"
          :key="producto.id"
          class="flex justify-between items-center mb-2 p-2 border rounded"
        >
          <span>{{ producto.producto }}</span>
          <button
            @click="iniciarProduccion(producto)"
            class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Iniciar Producción
          </button>
        </li>
        <li v-if="productosSeleccionados.length === 0" class="text-center text-gray-500 mt-4">
          Todos los productos han sido iniciados.
        </li>
      </ul>

      <button @click="cerrarModal" class="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        Cerrar
      </button>
    </div>
  </div>
</template>

<script setup>
import TablaPedidos from '@/components/TablaPedidos.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const detallePedidos = ref([])
const pedidos = ref([])

const showModal = ref(false)
const pedidoSeleccionado = ref(null)
const productosSeleccionados = ref([])

// Obtener pedidos
const obtenerPedidos = async () => {
  try {
    const [pedidosRes, clientesRes] = await Promise.all([
      axios.get('https://backendgrupoeb.onrender.com/api/buscarTabla/pedidos'),
      axios.get('https://backendgrupoeb.onrender.com/api/buscarTabla/clientes'),
    ])

    const clientesMap = Object.fromEntries(
      clientesRes.data.map((c) => [c.num_cliente, c.nombre_empresa]),
    )

    detallePedidos.value = {}

    pedidos.value = await Promise.all(
      pedidosRes.data
        .sort((a, b) => {
          const fechaDiff = new Date(b.fecha) - new Date(a.fecha)
          if (fechaDiff !== 0) return fechaDiff
          return b.no_pedido.localeCompare(a.no_pedido)
        })
        .map(async (c) => {
          const idPedido = c.no_pedido
          const { data: productosPed } = await axios.get(
            `https://backendgrupoeb.onrender.com/api/detallePedidos/${idPedido}`,
          )
          detallePedidos.value[idPedido] = productosPed
          const productosDescripcion = productosPed.map((p) => p.producto).join(', ')
          return {
            ...c,
            fecha_formateada: new Date(c.fecha).toLocaleDateString('es-ES'),
            nombre_cliente: clientesMap[c.num_cliente] || 'Desconocido',
            productos: productosDescripcion,
          }
        }),
    )
  } catch (error) {
    console.error('Error al obtener pedidos:', error)
    pedidos.value = []
    detallePedidos.value = {}
  }
}

// Funciones de orden
const hacerOrdenCompra = (pedido) => {
  router.push({
    name: 'ordenCompra',
    params: { id: pedido.no_pedido },
  })
}

// Modal para productos
const abrirModalProductos = async (pedido) => {
  pedidoSeleccionado.value = pedido
  const productos = detallePedidos.value[pedido.no_pedido] || []

  try {
    // Verificar cuáles productos ya tienen orden de producción
    const verificaciones = await Promise.all(
      productos.map(async (p) => {
        const res = await axios.get(
          `https://backendgrupoeb.onrender.com/api/produccion/verificar/${pedido.no_pedido}/${p.id_producto}`,
        )
        return { ...p, tieneProduccion: res.data.existe }
      }),
    )

    // Filtrar solo los que NO tienen producción
    productosSeleccionados.value = verificaciones.filter((p) => !p.tieneProduccion)
  } catch (error) {
    console.error('Error al verificar productos en producción:', error)
    productosSeleccionados.value = productos
  }

  showModal.value = true
}

const cerrarModal = () => {
  showModal.value = false
}

const iniciarProduccion = async (producto) => {
  try {
    // Verificar si ya existe una orden de producción
    const verificar = await axios.get(
      `https://backendgrupoeb.onrender.com/api/produccion/verificar/${pedidoSeleccionado.value.no_pedido}/${producto.id_producto}`,
    )

    if (verificar.data.existe) {
      mostrarAlerta('warning', 'Ya existe una orden de producción para este producto.')
      productosSeleccionados.value = productosSeleccionados.value.filter(
        (p) => p.id_producto !== producto.id_producto,
      )
      return
    }

    // Crear nueva orden de producción
    const payload = {
      productoIdentificador: producto.id_producto,
      fecha: new Date(),
      estado: 'Pendiente',
      procesoRecepcionId: null,
      procesoSuajeId: null,
      procesoArmadoId: null,
      procesoEnvioId: null,
      procesoPegadoId: null,
      procesoImpresionId: null,
      procesoCalidadId: null,
      procesoAlmacenId: null,
      noPedidoId: pedidoSeleccionado.value.no_pedido,
    }

    const res = await axios.post('https://backendgrupoeb.onrender.com/api/ordenproduccion/insertar', payload)
    console.log('Producción iniciada:', res.data)

    mostrarAlerta('success', 'Orden de producción creada correctamente.')

    // 🔹 Quitar el producto del listado inmediatamente
    productosSeleccionados.value = productosSeleccionados.value.filter(
      (p) => p.id_producto !== producto.id_producto,
    )
  } catch (error) {
    console.error('Error al iniciar producción:', error)
    mostrarAlerta('error', 'Error al iniciar producción.')
  }
}

const mostrarAlerta = (tipo, mensaje) => {
  switch (tipo) {
    case 'success':
      alert(`✅ ${mensaje}`)
      break
    case 'warning':
      alert(`⚠️ ${mensaje}`)
      break
    case 'error':
      alert(`❌ ${mensaje}`)
      break
    default:
      alert(mensaje)
  }
}

obtenerPedidos()
</script>
