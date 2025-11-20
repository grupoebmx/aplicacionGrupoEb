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
        <h2 class="text-2xl font-bold font-[Inter]">Pedidos</h2>
        <div id="alert-container" class="position-fixed top-0 end-0 p-3" style="z-index: 1055;"></div>

      </div>

      <!-- Tabla de pedidos -->
      <TablaPedidos
        :encabezado="['Núm. de pedido', 'Productos', 'Cliente', 'Fecha', 'Estado', 'Acciones']"
        :claves="['no_pedido','productos','nombre_cliente','fecha_formateada','status']"
        :info="pedidos"
        @OrdenCompra="hacerOrdenCompra"
        @OrdenProduccion="hacerOrdenProduccion"
      />
    </div>
  </div>
</template>

<script setup>
import TablaPedidos from '@/components/TablaPedidos.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';


const router = useRouter();


const detallePedidos= ref([])
const pedidos = ref([])


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
use xlink:href="${icono}"></use>
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

const obtenerPedidos = async () => {
  try {

    const [pedidosRes, clientesRes] = await Promise.all([
      axios.get('http://localhost:3000/api/buscarTabla/pedidos'),
      axios.get('http://localhost:3000/api/buscarTabla/clientes'),
    ]);


    const clientesMap = Object.fromEntries(
      clientesRes.data.map(c => [c.num_cliente, c.nombre_empresa])
    );


    detallePedidos.value = {};


    pedidos.value = await Promise.all(
  pedidosRes.data
    .sort((a, b) => {
      const fechaDiff = new Date(b.fecha) - new Date(a.fecha);
      if (fechaDiff !== 0) return fechaDiff;
      return b.no_pedido.localeCompare(a.no_pedido); // ordenar por id si quieres
    })
    .map(async (c) => {
      const idPedido = c.no_pedido; // 🔹 usar no_pedido

      // Obtener productos del pedido
      const { data: productosPed } = await axios.get(
        `http://localhost:3000/api/detallePedidos/${idPedido}`
      );

      // Guardar detalles completos por id de pedido
      detallePedidos.value[idPedido] = productosPed;

      // Extraer solo el nombre del producto para la columna Productos
      const productosDescripcion = productosPed.map(p => p.producto).join(', ');

      // Retornar objeto final de la cotización
      return {
        ...c,
        fecha_formateada: new Date(c.fecha).toLocaleDateString('es-ES'),
        nombre_cliente: clientesMap[c.num_cliente] || 'Desconocido',
        productos: productosDescripcion, // ahora sí se muestra en la tabla
      };
    })
);


    console.log('Pedidos:', pedidos.value);
    console.log('DetallePedidos:', detallePedidos.value);

  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    pedidos.value = [];
    detallePedidos.value = {};
  }
};

const hacerOrdenCompra = async (pedido) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/ordenes/verificar/${pedido.no_pedido}`);

    if (res.data.existe) {
      mostrarAlerta('warning', `Ya existe una orden de compra para este pedido.`);
      return;
    }

    router.push({
      name: 'ordenCompra',
      params: { id: pedido.no_pedido }
    });

  } catch (error) {
    console.error("Error al verificar orden de compra:", error);
  }
};





const hacerOrdenProduccion = (pedido) => {
  // Ya no necesitas validar ni mostrar alerta
  console.log('Generando Orden de Producción para:', pedido.no_pedido);
  // Aquí iría tu lógica normal para generar la orden
};








obtenerPedidos()

</script>

