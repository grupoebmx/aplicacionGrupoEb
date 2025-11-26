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
        <h2 class="text-2xl font-bold font-[Inter]">Pedidos</h2>
        <div id="alert-container" class="position-fixed top-0 end-0 p-3" style="z-index: 1055;"></div>
      </div>
      <!-- Formulario de pedido -->
      <form @submit.prevent="insertarPedido">
        <select
          class="input w-60"
          v-model="selectedEmpresa"
          @change="obtenerProductosPorEmpresa"
        >
          <option value="">Selecciona un cliente</option>
          <option
            v-for="cliente in clientes"
            :key="cliente.num_cliente"
            :value="cliente"
          >
            {{ cliente.nombre_empresa }}
          </option>
        </select>
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Detalles cliente -->
          <fieldset
            class="bg-gray-100 rounded-lg shadow-md w-full md:flex-1 p-4 border border-gray-300"
          >
            <legend class="fieldset-legend text-lg font-semibold">Detalles cliente</legend>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
            <label class="label">Impresión</label>
            <input type="text" class="input w-full" v-model="selectedEmpresa.impresion" readonly />
              </div>
              <div>
                <label class="label">Razón social</label>
                <input type="text" class="input w-full" v-model="selectedEmpresa.razon_social" readonly />
              </div>
              <div>
                <label class="label">RFC</label>
                <input type="text" class="input w-full" v-model="selectedEmpresa.rfc" readonly />
              </div>
              <div>
                <label class="label">Email</label>
                <input type="text" class="input w-full" v-model="selectedEmpresa.email" readonly />
              </div>
              <div>
                <label class="label">Teléfono</label>
                <input type="text" class="input w-full" v-model="selectedEmpresa.telefono" readonly />
              </div>
              <div>
                <label class="label">Régimen fiscal</label>
                <input type="text" class="input w-full" v-model="selectedEmpresa.regimen" readonly />
              </div>
              <div>
                <label class="label">Estado</label>
                <input type="text" class="input w-full" v-model="selectedEmpresa.estado" readonly />
              </div>
              <div>
                <label class="label">Colonia</label>
                <input type="text" class="input w-full" v-model="selectedEmpresa.colonia" readonly />
              </div>
              <div>
                <label class="label">C.P.</label>
                <input type="text" class="input w-full" v-model="selectedEmpresa.cp" readonly />
              </div>
              <div>
                <label class="label">Calle</label>
                <input type="text" class="input w-full" v-model="selectedEmpresa.calle" readonly />
              </div>
              <div>
                <label class="label">Núm. exterior</label>
                <input type="text" class="input w-full" v-model="selectedEmpresa.num_ext" readonly />
              </div>
              <div>
                <label class="label">Núm. interior</label>
                <input type="text" class="input w-full" v-model="selectedEmpresa.num_int" readonly />
              </div>
              <div>
                <label class="label">CFDI</label>
                <input type="text" class="input w-full" v-model="selectedEmpresa.cfdi" readonly />
              </div>
              </div>
          </fieldset>

          <!-- Número de pedido y fecha -->
          <div class="bg-gray-100 rounded-lg shadow-md w-full md:w-64 p-4 border border-gray-300">
            <label class="label mt-4">Fecha</label>
            <input type="date" class="input w-full" :value="fechaActual" />
          </div>
        </div>

     <fieldset class="bg-gray-100 rounded-lg shadow-md w-full p-4 border border-gray-300">
    <legend class="fieldset-legend text-lg font-semibold">Detalles pedido</legend>
    <div class="flex-1 w-[90px]">
        <label class="label">No. identificación</label>
        <input type="text" class="input w-full" v-model="numeroIdentificacion" />
      </div>
    <!-- FORMULARIO -->
    <div class="flex flex-nowrap gap-2 overflow-x-auto mb-4">
      <!-- No. identifacion -->



      <!-- Producto -->
      <div class="flex-1 min-w-[200px]">
        <label class="label">Producto</label>
        <select
          class="input w-full"
          v-model="selectedProducto"
          @change="obtenerTintasPorProducto"
        >
          <option value="">Selecciona un producto</option>
          <option
            v-for="producto in productosEmpresa"
            :key="producto.identificador"
            :value="producto"
          >
            {{ producto.producto }}
          </option>
        </select>
      </div>

        <!-- Cantidad -->
      <div class="flex-1 min-w-[80px]">
        <label class="label">Cantidad</label>
        <input
          type="number"
          class="input w-full"
          v-model="cantidad"
          @input="obtenerPrecioFinal"
        />
      </div>

      <!-- Medidas -->
      <div class="flex-1 min-w-[160px]">
        <label class="label">Medidas</label>
        <input
          type="text"
          class="input w-full"
          :value="selectedProducto ? `${selectedProducto.ancho_int} x ${selectedProducto.largo_int} x ${selectedProducto.alto_int}` : ''"
          readonly
        />
      </div>

      <!-- Tintas -->
      <div class="flex-1 min-w-[200px]">
        <label class="label">Tintas</label>
        <input
          type="text"
          class="input w-full"
          :value="tintasProducto.length ? tintasProducto.map(t => `${t.gcmi}-${t.nombre_tinta}`).join(', ') : ''"
          readonly
        />
      </div>

      <!-- Tipo material -->
      <div class="flex-1 min-w-[150px]">
        <label class="label">Tipo material</label>
        <input type="text" class="input w-full" :value="selectedProducto?.material_tipo" readonly />
      </div>

      <!-- Material -->
      <div class="flex-1 min-w-[110px]">
        <label class="label">Material</label>
        <input type="text" class="input w-full" :value="selectedProducto?.nombre_material" readonly />
      </div>

      <!-- Flauta -->
      <div class="flex-1 min-w-[60px]">
        <label class="label">Flauta</label>
        <input type="text" class="input w-full" :value="selectedProducto?.material_flauta" readonly />
      </div>

      <!-- ETC -->
      <div class="flex-1 min-w-[60px]">
        <label class="label">ETC</label>
        <input type="text" class="input w-full" :value="selectedProducto?.material_resistencia" readonly />
      </div>

      <!-- Calibre -->
      <div class="flex-1 min-w-[60px]">
        <label class="label">Calibre</label>
        <input type="text" class="input w-full" :value="selectedProducto?.material_calibre" readonly />
      </div>

      <!-- Peso -->
      <div class="flex-1 min-w-[60px]">
        <label class="label">Peso</label>
        <input type="text" class="input w-full" :value="selectedProducto?.material_peso" readonly />
      </div>

      <!-- Precio Unitario -->
      <div class="flex-1 min-w-[100px]">
        <label class="label">P/Unitario</label>
        <input
          type="text"
          class="input w-full"
          v-model="precioUnitario"
        />
      </div>

      <!-- Importe -->
      <div class="flex-1 min-w-[120px]">
        <label class="label">Importe</label>
        <input
          type="text"
          class="input w-full"
          :value="importe"
          readonly
        />
      </div>

      <!-- Botón agregar -->
      <div  class="p-0.5 flex items-center justify-start">
        <button
          type="button"
          class="bg-blue-500 text-white px-3 py-1 rounded"
          @click="agregarProducto"
        >
        +
        </button>
      </div>
    </div>

    <!-- TABLA DE PRODUCTOS -->
    <table class="min-w-full bg-white border border-gray-300 rounded-lg">
      <thead class="bg-gray-200">
        <tr>
          <th class="px-2 py-1 border">Cantidad</th>
          <th class="px-2 py-1 border">Producto</th>
          <th class="px-2 py-1 border">Medidas</th>
          <th class="px-2 py-1 border">Tintas</th>
          <th class="px-2 py-1 border">Tipo material</th>
          <th class="px-2 py-1 border">Material</th>
          <th class="px-2 py-1 border">Flauta</th>
          <th class="px-2 py-1 border">ETC</th>
          <th class="px-2 py-1 border">Calibre</th>
          <th class="px-2 py-1 border">Peso</th>
          <th class="px-2 py-1 border">P/Unitario</th>
          <th class="px-2 py-1 border">Importe</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in productosAgregados" :key="index">
          <td class="px-2 py-1 border text-center">{{ item.cantidad }}</td>
          <td class="px-2 py-1 border">{{ item.producto }}</td>
          <td class="px-2 py-1 border">{{ item.medidas }}</td>
          <td class="px-2 py-1 border">{{ item.tintas }}</td>
          <td class="px-2 py-1 border">{{ item.material_tipo }}</td>
          <td class="px-2 py-1 border">{{ item.nombre_material }}</td>
          <td class="px-2 py-1 border text-center">{{ item.material_flauta }}</td>
          <td class="px-2 py-1 border text-center">{{ item.material_resistencia }}</td>
          <td class="px-2 py-1 border text-center">{{ item.material_calibre }}</td>
          <td class="px-2 py-1 border text-center">{{ item.material_peso }}</td>
          <td class="px-2 py-1 border text-center">{{ item.precioUnitario }}</td>
          <td class="px-2 py-1 border text-center">{{ item.importe }}</td>
        </tr>
      </tbody>
    </table>
  </fieldset>



        <!-- ============================================================================================================================== -->
        <fieldset class="bg-gray-100 rounded-lg shadow-md w-full p-4 border border-gray-300 mt-3">
          <legend class="fieldset-legend text-lg font-semibold"></legend>
          <div class="flex space-x-6 mt-4">
            <!-- Columna izquierda: Observaciones + Fieldset -->
            <div class="w-2/3 flex flex-col">
              <!-- Observaciones -->
              <div>
                <label class="label block font-semibold mb-1">Observaciones</label>
                <textarea
                  v-model="observaciones"
                  class="border border-gray-300 rounded-md px-2 py-1 h-24 text-sm w-full bg-white leading-tight"
                  placeholder="Escribe tus observaciones aquí..."
                ></textarea>
              </div>

              <!-- Fieldset debajo con margen superior -->
              <fieldset class="border border-gray-300 rounded p-2 mb-4 mt-2 bg-white w-full">
              <div class="grid grid-cols-8 gap-4 items-start">
              <!-- Forma de pago -->
              <div class="col-span-2 flex flex-col">
                <div>
                <label class="label">Anticipo por $</label>
                <input type="number" step="0.01" class="input border border-black w-full" v-model.number="anticipo" />
              </div>
              </div>

              <!-- Método de pago -->
              <div class="col-span-2 flex flex-col">
                <label class="label mb-1">Método de pago</label>
                <input
                  list="metodos"
                  v-model="metodoPago"
                  class="border border-black w-full rounded-md px-3 py-2 text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Selecciona o escribe un método"
                />
                <datalist id="metodos">
                  <option value="Transferencia"></option>
                  <option value="Efectivo"></option>
                  <option value="Tarjeta"></option>
                  <option value="Cheque"></option>
                  <option value="Otro"></option>
                </datalist>
              </div>

                <!-- Entregar en -->
                <div class="col-span-2 flex flex-col">
                  <label class="label mb-1">Entregar en:</label>
                  <select
                    v-model="entrega"
                    class="border border-black w-full rounded-md px-3 py-2 text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Local">Local</option>
                    <option value="Paquetería">Paquetería</option>
                    <option value="Cliente recoge">Cliente recoge</option>
                  </select>
                </div>

                <!-- Condiciones de pago -->
                <div class="col-span-2 flex flex-col">
                  <label class="label mb-1">Condiciones de pago</label>
                  <select
                    v-model="condicionPago"
                    class="border border-black w-full rounded-md px-3 py-2 text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="Contado">Contado</option>
                    <option value="Crédito 30">Crédito 30</option>
                    <option value="Crédito 45">Crédito 45</option>
                    <option value="Crédito 60">Crédito 60</option>
                  </select>
                </div>
              </div>
              </fieldset>

            </div>


            <!-- Tabla de totales -->
          <div class="w-1/5 bg-gray-100 rounded-lg shadow-md p-4 border border-gray-300 ml-auto">
          <table class="table-auto w-full">
            <tbody>
              <tr class="border-b border-gray-300">
                <td class="py-2 pr-3 text-right font-medium">Subtotal:</td>
                <td class="py-2">
                  <input
                    :value="formatoMoneda(subtotal)"
                    type="text"
                    class="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                    placeholder="0.00"
                    readonly
                  />
                </td>
              </tr>

              <tr class="border-b border-gray-300">
                <td class="py-2 pr-3 text-right font-medium">IVA:</td>
                <td class="py-2">
                  <input
                    :value="formatoMoneda(iva)"
                    type="text"
                    class="w-full border border-gray-300 rounded-md px-2 py-1 text-sm bg-gray-50"
                    readonly
                  />

                </td>
              </tr>

              <tr class="border-b border-gray-300">
                <td class="py-2 pr-3 text-right font-medium">Total:</td>
                <td class="py-2">
                  <input
                    :value="formatoMoneda(total)"
                    type="text"
                    class="w-full border border-gray-300 rounded-md px-2 py-1 text-sm bg-gray-50"
                    readonly
                  />
                </td>
              </tr>

              <tr class="border-b border-gray-300">
                <td class="py-2 pr-3 text-right font-medium">Anticipo:</td>
                <td class="py-2">
                <input
                  type="text"
                  class="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                  :value="formatoMoneda(anticipoMinimo)"

                />

                </td>
              </tr>

              <tr>
                <td class="py-2 pr-3 text-right font-medium">Saldo:</td>
                <td class="py-2">
                  <input
                    :value="formatoMoneda(saldo)"
                    type="text"
                    class="w-full border border-gray-300 rounded-md px-2 py-1 text-sm bg-gray-50"
                    readonly
                  />
                </td>
              </tr>
            </tbody>
          </table>
          </div>

          </div>
          <div class="flex justify-end mt-4">
          <button
          class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-md text-xs px-2 py-1 text-center"
          type="submit"
          >
      Generar Pedido
    </button>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch} from 'vue'
import axios from 'axios'
import jsPDF from 'jspdf'

const condicionPago = ref('Contado')
const metodoPago = ref('Transferencia')
const entrega = ref('Local')
const observaciones = ref('')
const cantidad = ref('');
const precioUnitario = ref('');
const importe = ref('');
const productosAgregados = ref([])
const numeroIdentificacion = ref('')


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

const clientes = ref([])
const selectedEmpresa = ref({})
const productosEmpresa = ref([])
const selectedProducto = ref('')
const tintasProducto = ref([]);


const obtenerClientes = async () => {
  try {
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/clientes')
    clientes.value = res.data
  } catch (error) {
    console.error('Error al obtener clientes:', error)
  }
}

const obtenerProductosPorEmpresa = async () => {
  if (!selectedEmpresa.value || !selectedEmpresa.value.num_cliente) {
    productosEmpresa.value = [];
    return;
  }

  try {
    const res = await axios.get(
      `https://backendgrupoeb.onrender.com/api/productos/empresa/${selectedEmpresa.value.num_cliente}`
    );
    productosEmpresa.value = res.data;

  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
};




async function obtenerTintasPorProducto() {
  if (!selectedProducto.value || !selectedProducto.value.identificador) return;

  try {
    const res = await axios.get(
      `https://backendgrupoeb.onrender.com/api/productos/tintas/${selectedProducto.value.identificador}`
    );
    tintasProducto.value = res.data;
    console.log('Tintas del producto:', tintasProducto.value);
  } catch (error) {
    console.error('Error al obtener tintas:', error);
    tintasProducto.value = [];
  }
}



const obtenerPrecioFinal = async () => {
  if (!selectedProducto.value?.identificador || !cantidad.value) return;

  try {
    const res = await axios.get(
      `https://backendgrupoeb.onrender.com/api/detalle_cotizaciones/${selectedProducto.value.identificador}/${cantidad.value}`
    );

    if (!res.data || !res.data.precio_final) {
      precioUnitario.value = '';
      importe.value = '';
      return;
    }


    precioUnitario.value = parseFloat(res.data.precio_final).toFixed(2);
    importe.value = (cantidad.value * precioUnitario.value).toFixed(2);

  } catch (error) {
    console.error("❌ Error al obtener precio_final:", error);
    precioUnitario.value = '';
    importe.value = '';
  }
};

watch([cantidad, precioUnitario], () => {
  importe.value = (cantidad.value * precioUnitario.value).toFixed(2) || 0;
});


// Agregar producto a la tabla
const agregarProducto = () => {

  console.log("🧠 selectedProducto:", selectedProducto.value)

  if (!selectedProducto.value || !cantidad.value || !precioUnitario.value) {
    alert('⚠️ Debes seleccionar un producto y cantidad válidos.')
    return
  }

  productosAgregados.value.push({
    id_producto: selectedProducto.value.identificador,
    cantidad: cantidad.value,
    producto: selectedProducto.value.producto,
    medidas: `${selectedProducto.value.ancho_int} x ${selectedProducto.value.largo_int} x ${selectedProducto.value.alto_int}`,
    tintas: tintasProducto.value.length
      ? tintasProducto.value.map(t => `${t.gcmi}-${t.nombre_tinta}`).join(', ')
      : '',
    material_tipo: selectedProducto.value.material_tipo,
    nombre_material: selectedProducto.value.nombre_material,
    material_flauta: selectedProducto.value.material_flauta,
    material_resistencia: selectedProducto.value.material_resistencia,
    material_calibre: selectedProducto.value.material_calibre,
    material_peso: selectedProducto.value.material_peso,
    precioUnitario: precioUnitario.value,
    importe: importe.value
  })

  // 🧩 Verifica en consola qué se está agregando
  console.log("🧾 Producto agregado:", productosAgregados.value)


    // 🔹 Recalcular subtotal
  subtotal.value = productosAgregados.value.reduce(
    (total, item) => total + Number(item.importe || 0),
    0
  )

  // Limpiar formulario
  cantidad.value = ''
  selectedProducto.value = null
  tintasProducto.value = []
  precioUnitario.value = ''
  importe.value = ''
}



const fechaActual = new Date().toISOString().substring(0, 10)

const formatoMoneda = (valor) => {
  const numero = Number(valor)
  if (isNaN(numero)) return ''
  return numero.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  })
}


const cargarIva = async () => {
  try {
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/buscarTabla/iva');
    const data = res.data;

    ivaPorcentaje.value = parseFloat(data.find(d => d.id === 1)?.porcentaje || 0);
    console.log('IVA cargado:', ivaPorcentaje.value);

  } catch (error) {
    console.error('Error al obtener IVA:', error);
    return null;
  }
};




const subtotal = ref(0)
const anticipo = ref(0)



const ivaPorcentaje = ref(0);


const ivaDecimal = computed(() => Number(ivaPorcentaje.value) / 100);

const iva = computed(() => {
  return Number(subtotal.value) * ivaDecimal.value;
});



const total = computed(() => subtotal.value + iva.value)
const saldo = computed(() => {
  return total.value - anticipo.value
})




const anticipoMinimo = computed(() => {
  return (total.value * 0.5).toFixed(2)
})




const status = computed(() => {
  if (condicionPago.value.startsWith('Crédito')) {
    return 'Autorizado';
  }
  if (anticipo.value >= total.value * 0.5) {
    return 'Autorizado';
  }
  return 'Pendiente';
});


const insertarPedido = async () => {
  try {
    if (!selectedEmpresa.value || !productosAgregados.value.length) {
      mostrarAlerta("danger", "Faltan datos del cliente o productos");
      return;
    }

    const payload = {
      num_cliente: selectedEmpresa.value.num_cliente,
      fecha: fechaActual,
      observaciones: observaciones.value || "",
      anticipo: Number(anticipo.value) || 0,
      iva: Number(iva.value) || 0,
      subtotal: Number(subtotal.value) || 0,
      total: Number(total.value) || 0,
      metodoPago: metodoPago.value || "",
      entrega: entrega.value || "",
      condicionesPago: condicionPago.value || "",
      status: status.value,
      formaPago: "Anticipo",
      numeroIdentificacion: numeroIdentificacion.value || "",
      productos: productosAgregados.value.map(p => ({
      idProducto: p.id_producto,
      cantidad: Number(p.cantidad),
      importe: Number(p.importe)
}))
    };

    console.log("📦 Payload final:", JSON.stringify(payload, null, 2));

    const { data } = await axios.post("https://backendgrupoeb.onrender.com/api/pedidos/insertar", payload);

    console.log("Pedido insertado:", data);
    mostrarAlerta("success", `Pedido creado correctamente.`);
    generarPDF(data.no_pedido);

  } catch (error) {
    console.error("❌ Error al insertar pedido:", error);
    mostrarAlerta("danger", "Ocurrió un error al crear el pedido");
  }
};

const generarPDF = (no_pedido) => {
  try {
    // Configurar para tamaño carta (215.9 x 279.4 mm)
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'letter',
    })

    let yPosition = 33

    // --- LOGO ---
    const img = new Image()
    img.src = '/imagen/logo.jpg'

    // Manejar la carga asíncrona de la imagen
    img.onload = function () {
      doc.addImage(img, 'JPEG', 12, 10, 30, 20)
      continuarGeneracionPDF(doc, yPosition, img, no_pedido) // Pasar img como parámetro
    }

    img.onerror = function () {
      console.warn('No se pudo cargar el logo, continuando sin imagen...')
      continuarGeneracionPDF(doc, yPosition, null) // Pasar null si no hay imagen
    }
  } catch (error) {
    console.error('Error al generar PDF:', error)
    mostrarAlerta('danger', 'Error al generar el PDF: ' + error.message)
  }
}

const continuarGeneracionPDF = (doc, yPosition, img, no_pedido) => {
  try {
    // --- ENCABEZADO ---
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text('GRUPEB S.A. de C.V.', 50, 15)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text('Rogelio Ledesma #102 Col. Cruz Vieja Tlajomulco de Zúñiga, Jalisco.', 50, 20)
    doc.text('Tel  (33) 3180-3713, 3125-9585, 3180-1460', 50, 24)
    doc.text('www.grupoeb.com.mx   Email: ventas@grupoeb.com.mx', 50, 28)

    // --- TABLA PEDIDO Y FECHA ---
    doc.setFont('helvetica', 'bold')
    const tablaX = 160
    const tablaY = 10
    const anchoTabla = 40
    const altoFila = 8
    for (let i = 0; i < 4; i++) {
      doc.rect(tablaX, tablaY + i * altoFila, anchoTabla, altoFila)
    }

    doc.setFontSize(10)
    doc.text('P E D I D O', tablaX + 12.5, tablaY + 6)
    doc.setFont('helvetica', 'normal')

    // Usar el ID como número de pedido
    const numPedido = no_pedido
      ? `${String(no_pedido).padStart(3, '0')}`
      : 'N/A'
    doc.text(numPedido, tablaX + 18, tablaY + 13)
    doc.setFont('helvetica', 'bold')
    doc.text('F E C H A', tablaX + 13, tablaY + 21)
    doc.setFont('helvetica', 'normal')
    const hoy = new Date()
    const fecha = hoy.toLocaleDateString('es-MX')
    doc.text(fecha, tablaX + 12, tablaY + 29)

    yPosition += 15

    // --- DATOS DEL CLIENTE ---
    const marcoY = yPosition - 4
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('DATOS DEL CLIENTE', 12, yPosition)
    doc.setDrawColor(0)
    doc.line(12, yPosition + 1, 198, yPosition + 1)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)

    yPosition += 7

        // Validar y asegurar que los valores sean strings
    const razonSocial = String(selectedEmpresa.value.razon_social || '')
    const nombreEmpresa = String(selectedEmpresa.value.nombre_empresa || '')
    const telefono = String(selectedEmpresa.value.telefono || '')
    const email = String(selectedEmpresa.value.email || '')
    const numCliente = String(selectedEmpresa.value.num_cliente || '')
    const rfc = String(selectedEmpresa.value.rfc || '')
    const estado = String(selectedEmpresa.value.estado || '')
    const regimen = String(selectedEmpresa.value.regimen || '')

    doc.setFont('helvetica', 'bold')
    doc.text('Razón Social:', 12, yPosition)
    doc.setFont('helvetica', 'normal')
    doc.text(razonSocial, 35, yPosition)
    doc.line(12, yPosition + 1, 198, yPosition + 1)
    yPosition += 5

    doc.setFont('helvetica', 'bold')
    doc.text(`At'n Nombre:`, 12, yPosition)
    doc.setFont('helvetica', 'normal')
    doc.text(nombreEmpresa, 35, yPosition)
    doc.line(12, yPosition + 1, 198, yPosition + 1)
    yPosition += 5

    // Construir domicilio completo
    const calle = String(selectedEmpresa.value.calle || '')
    const numExt = String(selectedEmpresa.value.num_ext || '')
    const numInt = String(selectedEmpresa.value.num_int || '')
    const colonia = String(selectedEmpresa.value.colonia || '')

    const domicilioCompleto = `${calle} ${numExt} ${numInt}, ${colonia}`.trim()

    doc.setFont('helvetica', 'bold')
    doc.text('Domicilio:', 12, yPosition)
    doc.setFont('helvetica', 'normal')
    doc.text(domicilioCompleto, 35, yPosition)
    doc.line(12, yPosition + 1, 198, yPosition + 1)
    yPosition += 5

    doc.setFont('helvetica', 'bold')
    doc.text('Tel:', 12, yPosition)
    doc.setFont('helvetica', 'normal')
    doc.text(telefono, 35, yPosition)
    doc.line(12, yPosition + 1, 198, yPosition + 1)
    yPosition += 5

    doc.setFont('helvetica', 'bold')
    doc.text('E-mail:', 12, yPosition)
    doc.setFont('helvetica', 'normal')
    doc.text(email, 35, yPosition)

    // Segunda columna
    doc.setFont('helvetica', 'bold')
    doc.text('No. Cliente:', 120, marcoY + 11)
    doc.setFont('helvetica', 'normal')
    doc.text(numCliente, 140, marcoY + 11)

    doc.setFont('helvetica', 'bold')
    doc.text('R.F.C.:', 120, marcoY + 16)
    doc.setFont('helvetica', 'normal')
    doc.text(rfc, 140, marcoY + 16)

    // Construir población
    const cp = String(selectedEmpresa.value.cp || '')
    const poblacion = `${colonia}, ${cp}`.trim()

    doc.setFont('helvetica', 'bold')
    doc.text('Población:', 120, marcoY + 21)
    doc.setFont('helvetica', 'normal')
    doc.text(poblacion, 140, marcoY + 21)

    doc.setFont('helvetica', 'bold')
    doc.text('Edo.:', 120, marcoY + 26)
    doc.setFont('helvetica', 'normal')
    doc.text(estado, 140, marcoY + 26)

    doc.setFont('helvetica', 'bold')
    doc.text('Régimen:', 120, marcoY + 31)
    doc.setFont('helvetica', 'normal')
    doc.text(regimen, 140, marcoY + 31)
    doc.setDrawColor(0)
    doc.rect(10, marcoY, 190, 35)

    yPosition += 15

    // --- TABLA PRODUCTOS (REDUCIDA) ---
const headers = [
  'Cantidad',
  'Producto',
  'Medidas',
  'Tintas',
  'Material',
  'Flauta',
  'ETC',
  'Precio Unitario',
  'Importe',
]

const widths = [18, 30, 22, 40, 18, 15, 10, 18, 18]
const yStart = yPosition + 1
let x = 10
doc.setFontSize(8)
doc.setFont('helvetica', 'bold')

headers.forEach((h, i) => {
  doc.rect(x, yStart, widths[i], 7)
  let textoAjustado = h
  if (h === 'Precio Unitario') {
    textoAjustado = 'P.Unitario'
  }
  doc.text(textoAjustado, x + 1, yStart + 4)
  x += widths[i]
})

// Dibujar filas dinámicas
let yFila = yStart + 7
const maxFilas = 11
const productosMostrar = productosAgregados.value.slice(0, maxFilas)

for (let i = 0; i < productosMostrar.length; i++) {
  const producto = productosMostrar[i]

  // Asegurar que todos los valores sean strings
  const cantidad = String(producto.cantidad || '')
  const productoNombre = String(producto.producto || '')
  const medidas = String(producto.medidas || '')
  const tintas = String(producto.tintas || '')
  const material = String(producto.nombre_material || '')
  const flauta = String(producto.material_flauta || '')
  const etc = String(producto.material_resistencia || '')
  const precioFinal = Number(producto.precioUnitario) || 0
  const importe = (Number(producto.cantidad) || 0) * precioFinal

  // ✅ NUEVO: Formatear tintas con saltos de línea
  let tintasFormateadas = tintas
  if (tintas.includes(',')) {
    tintasFormateadas = tintas.split(',').map(t => t.trim()).join('\n')
  }

  // ✅ NUEVO: Dividir texto en múltiples líneas
  doc.setFontSize(8)
  const tintasLineas = doc.splitTextToSize(tintasFormateadas, widths[3] - 2)
  const numLineas = tintasLineas.length
  const alturaFila = Math.max(7, numLineas * 3.5 + 3)

  // ✅ MODIFICADO: Dibujar celdas con altura dinámica
  x = 10
  widths.forEach((w) => {
    doc.rect(x, yFila, w, alturaFila)
    x += w
  })

  // Llenar datos del producto
  x = 10
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)

  // Cantidad
  doc.text(cantidad, x + 2, yFila + 4)
  x += widths[0]

  // Producto
  doc.text(productoNombre, x + 1, yFila + 4)
  x += widths[1]

  // Medidas
  doc.text(medidas, x + 1, yFila + 4)
  x += widths[2]

  // ✅ MODIFICADO: Tintas (múltiples líneas)
  doc.text(tintasLineas, x + 1, yFila + 4)
  x += widths[3]

  // Material
  doc.text(material, x + 1, yFila + 4)
  x += widths[4]

  // Flauta
  doc.text(flauta, x + 1, yFila + 4)
  x += widths[5]

  // ETC
  doc.text(etc, x + 1, yFila + 4)
  x += widths[6]

  // Precio Unitario
  doc.text(formatoMoneda(precioFinal), x + 1, yFila + 4)
  x += widths[7]

  // Importe
  doc.text(formatoMoneda(importe), x + 1, yFila + 4)

  // ✅ MODIFICADO: Incrementar con altura dinámica
  yFila += alturaFila
}

yPosition = 190
    // --- OBSERVACIONES Y TOTALES ---
    doc.rect(10, yPosition, 140, 33)
    doc.setFontSize(12)
    doc.text('Observaciones:', 12, yPosition + 5)

    // Mostrar observaciones del pedido
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    const obsText = String(observaciones.value || '')
    if (obsText) {
      const obsLines = doc.splitTextToSize(obsText, 136)
      doc.text(obsLines, 12, yPosition + 10)
    }

    // Mensaje de depósito
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    const mensajeDeposito =
      'Favor de depositar en Banamex. CTA # 70010708964. CLABE 002320700107089643. A nombre de Grupeb S.A. de C.V. y enviar deposito vía WhatsApp (33 3954 0924) o correo ventas3@grupoeb.com.mx.'
    const depositoLines = doc.splitTextToSize(mensajeDeposito, 136)
    doc.text(depositoLines, 12, yPosition + 20)

    const subtotalesX = 150
    const subtotalesY = yPosition
    const anchoCol = 25
    const altoFilaSub = 6.6
    for (let fila = 0; fila < 5; fila++) {
      doc.rect(subtotalesX, subtotalesY + fila * altoFilaSub, anchoCol, altoFilaSub)
      doc.rect(subtotalesX + anchoCol, subtotalesY + fila * altoFilaSub, anchoCol, altoFilaSub)
    }

    const datos = ['Sub-Total:', 'I.V.A:', 'Total:', 'Anticipo:', 'Saldo:']
    const valores = [
      formatoMoneda(subtotal.value),
      formatoMoneda(iva.value),
      formatoMoneda(total.value),
      formatoMoneda(anticipo.value),
      formatoMoneda(saldo.value),
    ]

    datos.forEach((etiqueta, index) => {
      const y = subtotalesY + index * altoFilaSub
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text(etiqueta, subtotalesX + 2, y + 3)
      doc.setFont('helvetica', 'normal')
      doc.text(valores[index], subtotalesX + anchoCol + 2, y + 3)
    })

    yPosition += 35

    // --- BLOQUE DE OBSERVACIONES Y FIRMA ---
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)

    const obsX = 60
    const obsY = yPosition
    const obsWidth = 85
    const obsHeight = 47

    // Rectángulo principal OBSERVACIONES
    doc.rect(obsX, obsY, obsWidth, obsHeight)

    // Texto dentro del bloque OBSERVACIONES
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6.5)

    const lineasObservaciones = [
      '* Para su mayor comodidad en el pago de su anticipo y/o liquidación deberá',
      'cubrirlo con cheque nominativo a favor de GRUPEB S.A. de C.V. con la leyenda para depósito en cuenta',
      '* No nos hacemos responsables por pagos en efectivo.',
      '* En Bolsas impresas, existen cargas adicionales (negativos, diseño, etc.)',
      'que deberán cubrirse a contra entrega.',
      '* Todo cheque devuelto causará un 20% por daños y perjuicios según el art.',
      '193 de la Ley de Títulos y Operaciones de Crédito.',
      '* Flete por cuenta del Cliente.',
      '* Su pedido puede tener una variación de un 20% más o un 20% menos en la cantidad final.',
      '* Autorizo para que se imprima como pié de casa.',
    ]

    // CORRECCIÓN: Unir el array en un string
    const textoObservaciones = lineasObservaciones.join(' ')
    const textoDividido = doc.splitTextToSize(textoObservaciones, obsWidth - 4)
    doc.text(textoDividido, obsX + 2, obsY + 4)

    // --- LOGO DENTRO DEL BLOQUE DE OBSERVACIONES ---
    // Solo agregar el logo si está disponible
    if (img) {
      const logoY = obsY + obsHeight - 12
      doc.addImage(img, 'JPEG', obsX + 65, logoY, 8, 8)
    }

    // --- BLOQUE DE ANTICIPO / FIRMA (IZQUIERDA) ---
    const blockX = 10
    const blockY = obsY
    const blockWidth = 50
    const blockHeight = 47

    doc.rect(blockX, blockY, blockWidth, blockHeight)
    doc.line(blockX, blockY + 8, blockX + blockWidth, blockY + 8)
    doc.line(blockX, blockY + 16, blockX + blockWidth, blockY + 16)
    doc.line(blockX, blockY + 24, blockX + blockWidth, blockY + 24)

    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(`Anticipo por: ${formatoMoneda(anticipo.value)}`, blockX + 2, blockY + 6);
    doc.text('Banco:', blockX + 2, blockY + 22)
    doc.text('Firma de Recibido', blockX + 10, blockY + 30)
    doc.text('____________________', blockX + 5, blockY + 42)

    // --- NUEVO CONTENEDOR ANTICIPO/FIRMA (DERECHA) ---
    const blockRightX = obsX + obsWidth + 2
    const blockRightY = obsY
    const blockRightWidth = 53
    const blockRightHeight = 47

    doc.rect(blockRightX, blockRightY, blockRightWidth, blockRightHeight)
    doc.line(blockRightX, blockRightY + 20, blockRightX + blockRightWidth, blockRightY + 20)

    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('Condiciones del pago:', blockRightX + 2, blockRightY + 6)
    doc.text(condicionPago.value, blockRightX + 2, blockRightY + 12)
    doc.text('Firma de Autorización', blockRightX + 8, blockRightY + 30)
    doc.text('____________________', blockRightX + 8, blockRightY + 42)

    // Guardar el PDF
    doc.save('pedido-grupoEB.pdf')
    mostrarAlerta('success', 'PDF generado correctamente')
  } catch (error) {
    console.error('Error en la generación del PDF:', error)
    mostrarAlerta('danger', 'Error al generar el PDF: ' + error.message)
  }
}



cargarIva()
obtenerClientes()
obtenerProductosPorEmpresa()
obtenerTintasPorProducto()
</script>
