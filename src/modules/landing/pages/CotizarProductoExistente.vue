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

  <div class="min-h-screen w-full p-4 bg-gray-100 flex flex-col items-center">
    <div class="w-full max-w-[1700px] bg-white p-6 rounded shadow mt-8">


      <form @submit.prevent="insertarCotizacion">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold font-[Inter]">Cotizaciones</h2>
        <router-link to="/listaCotizaciones" class="btn btn-active btn-success">
        Visualizar cotizaciones
        </router-link>
      </div>
      <div id="alert-container" class="position-fixed top-0 end-0 p-3" style="z-index: 1055;"></div>
      <div class="flex justify-start">
        <img
          v-if="productoSeleccionado?.imagen"
          :src="productoSeleccionado.imagen"
          alt="Imagen del producto"
          class="w-90 h-64 object-contain rounded-lg"
        />
      </div>
      <div class="mt-8 max-w-full">
        <fieldset class="bg-gray-100 rounded-lg shadow-md w-full p-4 border border-gray-300">
          <legend class="fieldset-legend text-lg font-semibold">Detalles</legend>
            <div class="flex flex-wrap gap-2 w-full items-end">

              <!-- Fecha -->
              <div class="flex-none min-w-[90px] p-1 border border-gray-300 rounded">
                <div class="text-center text-xs font-semibold mb-1">Fecha</div>
                <input
                  type="date"
                  :value="fechaActual"
                  readonly
                  class="border border-gray-300 rounded-md px-1 py-1 h-8 text-xs w-full leading-tight"
                />
              </div>

              <!-- Empresa -->
              <div class="flex-none min-w-[110px] p-1 border border-gray-300 rounded">
                <div class="text-center text-xs font-semibold mb-1">Empresa</div>
                <select
                  v-model="selectedEmpresa"
                  @change="obtenerProductosPorEmpresa"
                  class="border border-gray-300 rounded-md px-1 py-1 h-8 text-xs w-full bg-white text-black leading-tight"
                >
                  <option value="">Seleccione</option>
                  <option
                    v-for="cliente in clientes"
                    :key="cliente.num_cliente"
                    :value="cliente.num_cliente"
                  >
                    {{ cliente.nombre_empresa }}
                  </option>
                </select>
              </div>

              <!-- Producto -->
              <div class="flex-none min-w-[120px] p-1 border border-gray-300 rounded">
                <div class="text-center text-xs font-semibold mb-1">Producto</div>
                <select
                  v-model="selectedProducto"
                  @change="obtenerTintasPorProducto"
                  class="border border-gray-300 rounded-md px-1 py-1 h-8 text-xs w-full bg-white text-black leading-tight"
                >
                  <option value="">Seleccione producto</option>
                  <option
                    v-for="producto in productosEmpresa"
                    :key="producto.identificador"
                    :value="producto.identificador"
                  >
                    {{ producto.producto }}
                  </option>
                </select>
              </div>

              <!-- Clave Material -->
          <div class="flex-none w-[150px] p-1 border border-gray-300 rounded">
            <div class="text-center text-xs font-semibold mb-1">Clave</div>
            <input
              type="text"
              :value="productoSeleccionado?.material_clave || ''"
              readonly
              class="border border-gray-300 rounded-md px-1 py-1 h-7 text-xs w-full text-center"
            />
          </div>

          <!-- Tipo de Material -->
          <div class="flex-none w-[150px] p-1 border border-gray-300 rounded">
            <div class="text-center text-xs font-semibold mb-1">Tipo</div>
            <input
              type="text"
              :value="productoSeleccionado?.material_tipo || ''"
              readonly
              class="border border-gray-300 rounded-md px-1 py-1 h-7 text-xs w-full text-center"
            />
          </div>

          <!-- Precio Material -->
          <div class="flex-none w-[100px] p-1 border border-gray-300 rounded">
            <div class="text-center text-xs font-semibold mb-1">Precio</div>
            <input
              type="text"
              :value="productoSeleccionado?.material_precio || ''"
              readonly
              class="border border-gray-300 rounded-md px-1 py-1 h-7 text-xs w-full text-center"
            />
          </div>

              <!-- Tintas -->
              <div class="flex-none w-[110px] p-1 border border-gray-300 rounded">
                <div class="text-center text-[10px] font-semibold mb-0.5">Tintas</div>
                <input
                  type="text"
                  :value="tintasProducto.length || 0"
                  readonly
                  class="border border-gray-300 rounded-md px-1 py-0.5 h-7 text-[10px] w-full text-center"
                />
              </div>

              <!-- Área -->
              <div class="flex-none w-[110px] p-1 border border-gray-300 rounded">
                <div class="text-center text-[10px] font-semibold mb-0.5">Área</div>
                <div class="flex items-center justify-center space-x-1">
                  <input
                    class="w-20 px-1 py-0.5 border rounded text-center text-[10px] h-7"
                    :value="areaTotal"
                    readonly
                  />
                  <span class="text-[15px] font-medium text-gray-700">m²</span>
                </div>
              </div>

            </div>
        </fieldset>
      </div>


      <!--Div cotizar-->
      <div class="mt-8 max-w-full">
      <fieldset class="bg-gray-100 rounded-lg shadow-md w-full p-4 border border-gray-300">
        <legend class="fieldset-legend text-lg font-semibold">Cotizar</legend>


          <div class="flex gap-2 w-full overflow-x-auto p-2  rounded">
            <div class="flex-none w-27 p-1 border border-gray-300 rounded">
            <div class="text-center text-xs font-semibold mb-1">Identificador</div>
            <input type="text" :value="productoSeleccionado?.identificador || ''" readonly class="border rounded-md px-1 py-1 h-8 w-full text-sm text-center" />
            </div>
            <div class="flex-none w-27 p-1 border border-gray-300 rounded">
            <div class="text-center text-xs font-semibold mb-1">Cantidad</div>
            <input type="number" v-model="cantidad" min="0" class="border rounded-md px-1 py-1 h-8 w-full text-sm text-center bg-white" />
            </div>
            <div class="flex-none w-27 p-1 border border-gray-300 rounded">
              <div class="text-center text-xs font-semibold mb-1">Cartón</div>
              <input type="text" :value="totalCarton" class="border rounded-md px-1 py-1 h-8 w-full text-sm text-center" />
            </div>

            <div class="flex-none w-fit p-2 border border-gray-300 rounded">
              <div class="text-center text-xs font-semibold mb-1">Tintas</div>

              <div class="flex items-center justify-center gap-2">
                <input
                  type="number"
                  v-model="tintas"
                  min="0"
                  class="border rounded-md px-1 py-1 h-8 w-16 text-sm text-center flex-shrink-0 bg-white"
                  placeholder="Cant."
                />
                <input
                  type="text"
                  :value="precioTintas"
                  class="border rounded-md px-1 py-1 h-8 w-20 text-sm text-center bg-gray-50 flex-shrink-0"
                  placeholder="Precio"
                  readonly
                />
              </div>
            </div>

            <div class="flex-none w-27 p-1 border border-gray-300 rounded">
              <div class="text-center text-xs font-semibold mb-1">Maquina</div>
              <input type="text" :value="precioMaquina" readonly class="border rounded-md px-1 py-1 h-8 w-full text-sm text-center" />
            </div>

            <div class="flex-none w-27 p-1 border border-gray-300 rounded">
              <div class="text-center text-xs font-semibold mb-1">Pegado</div>
              <input type="text" :value="precioPegadoFinal" class="border rounded-md px-1 py-1 h-8 w-full text-sm text-center" />
            </div>

            <div class="flex-none w-27 p-1 border border-gray-300 rounded">
              <div class="text-center text-xs font-semibold mb-1">Fijos</div>
              <input type="text" :value="fijosCalculada" class="border rounded-md px-1 py-1 h-8 w-full text-sm text-center" />
            </div>

            <div class="flex-none w-27 p-1 border border-gray-300 rounded">
              <div class="text-center text-xs font-semibold mb-1">Utilidad</div>
              <input type="text" :value="utilidad" class="border rounded-md px-1 py-1 h-8 w-full text-sm text-center" />
            </div>

            <div class="flex-none w-27 p-1 border border-gray-300 rounded">
              <div class="text-center text-xs font-semibold mb-1">Otros</div>
              <input type="text" v-model="otros" class="border rounded-md px-1 py-1 h-8 w-full text-sm text-center bg-white" />
            </div>

            <div class="flex-none w-27 p-1 border border-gray-300 rounded">
              <div class="text-center text-xs font-semibold mb-1">Envio</div>
              <input type="text" :value="envioCalculada" class="border rounded-md px-1 py-1 h-8 w-full text-sm text-center" />
            </div>

            <div class="flex-none w-27 p-1 border border-gray-300 rounded">
              <div class="text-center text-xs font-semibold mb-1">Precio venta</div>
              <input type="text" :value="precioVenta" class="border rounded-md px-1 py-1 h-8 w-full text-sm text-center" />
            </div>

            <div class="flex-none w-27 p-1 border border-gray-300 rounded">
              <div class="text-center text-xs font-semibold mb-1">Precio final</div>
              <input type="text" v-model="precioFinal"  @input="precioEditado = true" class="border rounded-md px-1 py-1 h-8 w-full text-sm text-center bg-white" />
            </div>
                    <!-- Botón para agregar producto -->
            <div class="p-0.5 flex items-center justify-start">
              <button type="button" @click="agregarProductoACotizacion" class="bg-blue-500 text-white px-3 py-1 rounded">
                +
              </button>
            </div>
          </div>

          <div class="mt-4 overflow-x-auto">
           <table class="w-full border border-gray-300 rounded text-sm">
              <thead class="bg-gray-200">
        <tr>
          <th class="border px-2 py-1">ID Producto</th>
          <th class="border px-2 py-1">Cantidad</th>
          <th class="border px-2 py-1">Cartón</th>
          <th class="border px-2 py-1">Tintas</th>
          <th class="border px-2 py-1">Maquina</th>
          <th class="border px-2 py-1">Pegado</th>
          <th class="border px-2 py-1">Fijos</th>
          <th class="border px-2 py-1">Utilidad</th>
          <th class="border px-2 py-1">Otros</th>
          <th class="border px-2 py-1">Envio</th>
          <th class="border px-2 py-1">Precio Venta</th>
          <th class="border px-2 py-1">Precio Final</th>
        </tr>
              </thead>
              <tbody>
        <tr v-for="(p, index) in productos" :key="index">
          <td class="border px-2 py-1">{{ p.idProducto }}</td>
          <td class="border px-2 py-1">{{ p.cantidad }}</td>
          <td class="border px-2 py-1">{{ p.totalCarton }}</td>
          <td class="border px-2 py-1">{{ p.tintas }}</td>
          <td class="border px-2 py-1">{{ p.precioMaquina }}</td>
          <td class="border px-2 py-1">{{ p.precioPegadoFinal }}</td>
          <td class="border px-2 py-1">{{ p.fijosCalculada }}</td>
          <td class="border px-2 py-1">{{ p.utilidadCalculada }}</td>
          <td class="border px-2 py-1">{{ p.otros }}</td>
          <td class="border px-2 py-1">{{ p.envioCalculada }}</td>
          <td class="border px-2 py-1">{{ p.precioVenta }}</td>
          <td class="border px-2 py-1">{{ p.precioFinal }}</td>
        </tr>
              </tbody>

           </table>
          </div>
          <!-- Botón de envío -->
        <div class="p-0.5 flex items-center justify-end mt-4">
        <button
    class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
    type="submit"
  >
    Hacer cotización
        </button>
        </div>
      </fieldset>
      </div>

      </form>
    </div>


  </div>


</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import jsPDF from 'jspdf'
import axios from 'axios'



const clientes = ref([])
const selectedEmpresa = ref('')
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
  if (!selectedEmpresa.value) {
    productosEmpresa.value = []
    return
  }

  try {
    const res = await axios.get(
      `https://backendgrupoeb.onrender.com/api/productos/empresa/${selectedEmpresa.value}`
    )
    productosEmpresa.value = res.data
    console.log('✅ Productos cargados:', res.data)
  } catch (error) {
    console.error('❌ Error al obtener productos:', error)
  }
}

const productoSeleccionado = computed(() =>
  productosEmpresa.value.find(p => p.identificador === selectedProducto.value)
)

async function obtenerTintasPorProducto() {
  if (!selectedProducto.value) return;

  try {
    const res = await axios.get(`https://backendgrupoeb.onrender.com/api/productos/tintas/${selectedProducto.value}`);
    tintasProducto.value = res.data;
    console.log('Tintas del producto:', tintasProducto.value);
  } catch (error) {
    console.error('Error al obtener tintas:', error);
    tintasProducto.value = [];
  }
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


const generarPDFCotizacionProfesional = (cotizacion, cliente, productosDetalle, idCotizacion) => {
  // Verificación de seguridad
  if (!idCotizacion) {
    console.error('Error: idCotizacion es undefined');
    mostrarAlerta('danger', 'Error al generar el PDF: ID de cotización no disponible');
    return;
  }

  // Configurar para tamaño carta (215.9 x 279.4 mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter',
  })

  let yPosition = 33

  // --- LOGO ---
  try {
    const img = new Image()
    img.src = '/imagen/logo.jpg'
    doc.addImage(img, 'JPEG', 12, 10, 30, 20)
  } catch {
    console.log('Logo no encontrado, continuando sin logo')
  }

  // --- ENCABEZADO ---
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text('GRUPEB S.A. de C.V.', 50, 15)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text('Rogelio Ledesma #102 Col. Cruz Vieja Tlaquepaque de Zúñiga, Jalisco.', 50, 20)
  doc.text('Tel  (33) 3180-3713, 3125-9585, 3180-1460', 50, 24)
  doc.text('www.grupoeb.com.mx   Email: ventas3@grupoeb.com.mx', 50, 28)

  // --- TABLA COTIZACIÓN Y FECHA ---
  doc.setFont('helvetica', 'bold')
  const tablaX = 160
  const tablaY = 10
  const anchoTabla = 40
  const altoFila = 8

  for (let i = 0; i < 4; i++) {
    doc.rect(tablaX, tablaY + i * altoFila, anchoTabla, altoFila)
  }

  doc.setFontSize(10)
  doc.text('C O T I Z A C I Ó N ', tablaX + 5, tablaY + 6)
  doc.setFont('helvetica', 'normal')

  // NÚMERO DE COTIZACIÓN - usando el ID con formato
  const numeroFormateado = `C-${idCotizacion.toString().padStart(3, '0')}`
  doc.text(numeroFormateado, tablaX + 15, tablaY + 13)

  doc.setFont('helvetica', 'bold')
  doc.text('F E C H A', tablaX + 13, tablaY + 21)
  doc.setFont('helvetica', 'normal')

  const fecha = cotizacion?.fecha || new Intl.DateTimeFormat('es-MX', {
  timeZone: 'America/Mexico_City',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}).format(new Date());


  doc.text(fecha, tablaX + 12, tablaY + 29)

  yPosition += 15

  // --- DATOS DEL CLIENTE - MANTENER COMO ESTÁ ---
  const marcoY = yPosition - 4
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('DATOS DEL CLIENTE', 12, yPosition)
  doc.setDrawColor(0)
  doc.line(12, yPosition + 1, 198, yPosition + 1)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)

  yPosition += 7

  // Primera columna
  doc.setFont('helvetica', 'bold')
  doc.text('Razón Social:', 12, yPosition)
  doc.setFont('helvetica', 'normal')
  doc.text(cliente?.razon_social || cliente?.nombre_empresa || '-', 35, yPosition)
  doc.line(12, yPosition + 1, 198, yPosition + 1)
  yPosition += 5

  doc.setFont('helvetica', 'bold')
  doc.text(`At'n Nombre:`, 12, yPosition)
  doc.setFont('helvetica', 'normal')
  doc.text(cliente?.nombre_empresa || cliente?.razon_social || '-', 35, yPosition)
  doc.line(12, yPosition + 1, 198, yPosition + 1)
  yPosition += 5

  doc.setFont('helvetica', 'bold')
  doc.text('Tel:', 12, yPosition)
  doc.setFont('helvetica', 'normal')
  doc.text(cliente?.telefono || '-', 35, yPosition)
  doc.line(12, yPosition + 1, 198, yPosition + 1)
  yPosition += 5

  doc.setFont('helvetica', 'bold')
  doc.text('E-mail:', 12, yPosition)
  doc.setFont('helvetica', 'normal')
  doc.text(cliente?.email || '-', 35, yPosition)

  // Segunda columna - DATOS ADICIONALES DEL CLIENTE
 doc.setFont('helvetica', 'bold')
  doc.text('No. Cliente:', 120, marcoY + 11)
  doc.setFont('helvetica', 'normal')
  doc.text(cliente?.num_cliente || '-', 140, marcoY + 11)

  doc.setFont('helvetica', 'bold')
  doc.text('R.F.C.:', 120, marcoY + 16)
  doc.setFont('helvetica', 'normal')
  doc.text(cliente?.rfc || '-', 130, marcoY + 16)

  doc.setFont('helvetica', 'bold')
  doc.text('Régimen:', 120, marcoY + 21)
  doc.setFont('helvetica', 'normal')
  doc.text(cliente?.regimen || '-', 135, marcoY + 21)

  doc.setFont('helvetica', 'bold')
  doc.text('Edo.:', 120, marcoY + 26)
  doc.setFont('helvetica', 'normal')
  doc.text(cliente?.estado || '-', 130, marcoY + 26)

  doc.setDrawColor(0)
  doc.rect(10, marcoY, 190, 35)

  yPosition += 15

  // --- TABLA DE PRODUCTOS - AJUSTADA AL MISMO ANCHO QUE DATOS DEL CLIENTE ---
  doc.setFont('helvetica', 'bold')
  doc.text('DETALLE DE PRODUCTOS', 12, yPosition)
  doc.line(12, yPosition + 1, 198, yPosition + 1) // Misma longitud que datos del cliente
  yPosition += 7

  // Headers de la tabla
  const headers = [
    'Descripción',
    'Medidas',
    'Tintas',
    'Material',
    'Calibre',
    'Cantidad',
    'Precio Unitario',
  ]

  // Ajustar widths para ocupar los 190mm (mismo ancho que datos del cliente)
  const totalWidthAvailable = 190; // Mismo ancho que el rectángulo de datos del cliente
  const widths = [55, 25, 20, 25, 20, 20, 25] // Ajusté la primera columna para ocupar más espacio

  // Ajustar el último width para que la suma sea exactamente 190mm
  const totalCurrentWidth = widths.reduce((sum, width) => sum + width, 0);
  widths[widths.length - 1] += totalWidthAvailable - totalCurrentWidth;

  const yStart = yPosition + 1
  let x = 12 // Mismo inicio que datos del cliente

  // DIBUJAR HEADERS
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  headers.forEach((h, index) => {
    doc.rect(x, yStart, widths[index], 7)
    // Ajustar texto para columnas largas
    let textoAjustado = h
    if (h === 'Precio Unitario') {
      textoAjustado = 'P.Unitario'
    }
    // Centrar texto
    const textWidth = doc.getTextWidth(textoAjustado)
    const centerX = x + (widths[index] - textWidth) / 2
    doc.text(textoAjustado, centerX, yStart + 4.5)
    x += widths[index]
  })

  // DIBUJAR FILAS CON LOS DATOS DEL ENDPOINT
  let yFila = yStart + 7

  // Asegurarnos que productosDetalle sea un array
  const productosArray = Array.isArray(productosDetalle) ? productosDetalle : [productosDetalle]

  productosArray.forEach((prod) => {
    x = 12

    // Dibujar celdas
    widths.forEach((w) => {
      doc.rect(x, yFila, w, 7)
      x += w
    })

    // Llenar datos con la estructura de tu endpoint
    x = 12
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)

    // Descripción (campo: producto)
    doc.text(prod?.producto || '-', x + 2, yFila + 4.5)
    x += widths[0]

    // Medidas (campo: medidas - ya viene formateado del endpoint)
    doc.text(prod?.medidas || '-', x + 2, yFila + 4.5)
    x += widths[1]

  doc.text(prod.tintas ? prod.tintas.toString() : '', x + 2, yFila + 4.5)
x += widths[2]

    // Material (campo: clave_material)
    doc.text(prod?.clave_material || '-', x + 2, yFila + 4.5)
    x += widths[3]

    // Calibre (campo: calibre)
    doc.text(prod?.calibre || '-', x + 2, yFila + 4.5)
    x += widths[4]

    // Cantidad (campo: cantidad)
    doc.text((prod?.cantidad || 0).toString(), x + 2, yFila + 4.5)
    x += widths[5]

    // Precio Unitario (campo: precio_unitario)
    const precioUnitario = prod?.precio_unitario || 0
    doc.text(`$${precioUnitario.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, x + 2, yFila + 4.5)

    yFila += 7
  })

  yPosition = yFila + 50

  // --- OBSERVACIONES - AJUSTADA AL MISMO ANCHO ---
  doc.rect(12, yPosition, 190, 30) // Mismo ancho que datos del cliente (190mm)
  doc.setFontSize(12)
  doc.text('Observaciones:', 13, yPosition + 5)

  yPosition += 32

  // --- BLOQUE DE OBSERVACIONES Y FIRMA - AJUSTADO AL MISMO ANCHO ---
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)

  const obsX = 12 // Mismo inicio que datos del cliente
  const obsY = yPosition
  const obsWidth = 190 // Mismo ancho que datos del cliente
  const obsHeight = 45

  // Rectángulo principal OBSERVACIONES
  doc.rect(obsX, obsY, obsWidth, obsHeight)

  // Texto dentro del bloque OBSERVACIONES
  doc.setFont('times', 'bold')
  doc.setFontSize(12)

  const lineasObservaciones = [
    '*  Precios más IVA.',
    '* Tiempo de entrega:  30-35 días después de autorizado el diseño.',
    '*  L.A.B. Guadalajara EL FLETE VA POR CUENTA DEL CLIENTE.',
    '*  Condiciones de Pago: 50%  ANTICIPO    resto contra entrega.',
    '* Esta cotización puede variar +/- 10% en la cantidad final.',
    '* Precios sujetos a cambio sin previo aviso.',
    '* Rogelio Ledesma Gutierrez',
  ]

  const textoDividido = doc.splitTextToSize(lineasObservaciones, obsWidth - 4)
  doc.text(textoDividido, obsX + 2, obsY + 4)

  // --- GUARDAR PDF CON NOMBRE PERSONALIZADO ---
  const nombreArchivo = `cotizacion-${numeroFormateado}-${cliente?.nombre_empresa || cliente?.razon_social || 'cliente'}.pdf`
  doc.save(nombreArchivo)
}


const fechaActual = new Date().toISOString().substring(0, 10)




const tintas = ref()
const otros = ref ()
const utilidad = ref(0)
const categoria = ref('')
const rango = ref('')
const cantidad = ref ()



const areaTotal = computed(() => {
  if (!productoSeleccionado.value) return 0
  const largo = parseFloat(productoSeleccionado.value.largo_carton || 0)
  const ancho = parseFloat(productoSeleccionado.value.ancho_carton || 0)
  return ((largo * ancho) / 10000).toFixed(4)
})



const precioTinta= ref({
  precioTinta1: 0,
  precioTinta2: 0,
  precioTinta3: 0,
  precioTinta4: 0,
  precioTinta5: 0
})

const obtenerPreciosTintas = async () => {
  try {
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/buscarTabla/tinta_cantidad');
    const data = res.data;
    precioTinta.value = {
      precioTinta1: parseFloat(data.find(d => d.id === 1)?.precio || 0),
      precioTinta2: parseFloat(data.find(d => d.id === 2)?.precio || 0),
      precioTinta3: parseFloat(data.find(d => d.id === 3)?.precio || 0),
      precioTinta4: parseFloat(data.find(d => d.id === 4)?.precio || 0),
      precioTinta5: parseFloat(data.find(d => d.id === 5)?.precio || 0),
    }
    console.log('Precios de tintas:', precioTinta.value);

  } catch (error) {
    console.error('Error al obtener precios de tintas:', error);
    return null;
  }
};


const precioTintas = computed(() => {
  const cantidadTintas = parseInt(tintas.value || 0)
  const cantidadNum = parseInt(cantidad.value || 0)
  let precio = 0

   const {
    precioTinta1,
    precioTinta2,
    precioTinta3,
    precioTinta4,
    precioTinta5
  } = precioTinta.value



  if (cantidadNum < 1000) {
    precio = precioTinta1
  } else if (cantidadNum >= 1000 && cantidadNum < 3000) {
    precio = precioTinta2
  } else if (cantidadNum >= 3000 && cantidadNum < 5000) {
    precio = precioTinta3
  } else if (cantidadNum >= 5000 && cantidadNum < 10000) {
    precio = precioTinta4
  } else if (cantidadNum >= 10000){
    precio = precioTinta5
  }


  const total = cantidadTintas * precio

  return total.toFixed(2)
})


const porcentajes = ref({
  porcentaje1: 0,
  porcentaje2: 0,
  porcentaje3: 0,
  porcentaje4: 0,
  porcentaje5: 0
})

const obtenerPorcentaje = async () => {
  try {
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/porcentajeCantidad');
    const data = res.data;

    porcentajes.value = {
      porcentaje1: parseFloat(data.find(d => d.id === 1)?.porcentaje || 0),
      porcentaje2: parseFloat(data.find(d => d.id === 2)?.porcentaje || 0),
      porcentaje3: parseFloat(data.find(d => d.id === 3)?.porcentaje || 0),
      porcentaje4: parseFloat(data.find(d => d.id === 4)?.porcentaje || 0),
      porcentaje5: parseFloat(data.find(d => d.id === 5)?.porcentaje || 0),
    }
    console.log('Porcentajes reactivos:', porcentajes.value);

  } catch (error) {
    console.error('Error al obtener porcentajes:', error);
    return null;
  }
};

const totalCarton = computed(() => {
  const area = parseFloat(areaTotal.value || 0)
  const precioUnit = parseFloat(productoSeleccionado.value?.material_precio || 0)
  const cantidadNum = parseInt(cantidad.value || 0)

   const {
    porcentaje1,
    porcentaje2,
    porcentaje3,
    porcentaje4,
    porcentaje5
  } = porcentajes.value



  const totalBase = area * precioUnit


  let porcentajeExtra = 0
  if (cantidadNum < 1000) {
  porcentajeExtra = porcentaje1
} else if (cantidadNum >= 1000 && cantidadNum < 3000) {
  porcentajeExtra = porcentaje2
} else if (cantidadNum >= 3000 && cantidadNum < 5000) {
  porcentajeExtra = porcentaje3
} else if (cantidadNum >= 5000 && cantidadNum < 10000) {
  porcentajeExtra = porcentaje4
} else if (cantidadNum >= 10000) {
  porcentajeExtra = porcentaje5
}

  const totalFinal = totalBase * porcentajeExtra

  return totalFinal.toFixed(2)
})

//variables reactivas para maquina

const precioMaquinas = ref({
  precioMaquina1: 0,
  precioMaquina2: 0,
  precioMaquina3: 0,
  precioMaquina4: 0,
  precioMaquina5: 0
})

const obtenerPreciosMaquinas = async () => {
  try {
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/buscarTabla/maquina_cantidad');
    const data = res.data;
    precioMaquinas.value = {
      precioMaquina1: parseFloat(data.find(d => d.id === 1)?.precio || 0),
      precioMaquina2: parseFloat(data.find(d => d.id === 2)?.precio || 0),
      precioMaquina3: parseFloat(data.find(d => d.id === 3)?.precio || 0),
      precioMaquina4: parseFloat(data.find(d => d.id === 4)?.precio || 0),
      precioMaquina5: parseFloat(data.find(d => d.id === 5)?.precio || 0),
    }
    console.log('Precios de maquinas:', precioMaquinas.value);

  } catch (error) {
    console.error('Error al obtener precios de maquinas:', error);
    return null;
  }
};

const precioMaquina = computed(() => {
  const cantidadNum = parseInt(cantidad.value || 0)
  let precio = 0
    const { precioMaquina1, precioMaquina2, precioMaquina3, precioMaquina4, precioMaquina5 } = precioMaquinas.value

    if (cantidadNum < 1000) {
    precio = precioMaquina1
  } else if (cantidadNum >= 1000 && cantidadNum < 3000) {
    precio = precioMaquina2
  } else if (cantidadNum >= 3000 && cantidadNum < 5000) {
    precio = precioMaquina3
  } else if (cantidadNum >= 5000 && cantidadNum < 10000) {
    precio = precioMaquina4
  } else if (cantidadNum >= 10000){
    precio = precioMaquina5
  }

  const total = precio

  return total.toFixed(2)
})


//variables reactivas para pegado

const precioPegado = ref({
  precioPegado1: 0,
  precioPegado2: 0,
  precioPegado3: 0,
  precioPegado4: 0,
  precioPegado5: 0
})

const obtenerPreciosPegado = async () => {
  try {
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/buscarTabla/pegado_cantidad');
    const data = res.data;
    precioPegado.value = {
      precioPegado1: parseFloat(data.find(d => d.id === 1)?.precio || 0),
      precioPegado2: parseFloat(data.find(d => d.id === 2)?.precio || 0),
      precioPegado3: parseFloat(data.find(d => d.id === 3)?.precio || 0),
      precioPegado4: parseFloat(data.find(d => d.id === 4)?.precio || 0),
      precioPegado5: parseFloat(data.find(d => d.id === 5)?.precio || 0),
    }
    console.log('Precios de pegado:', precioPegado.value);

  } catch (error) {
    console.error('Error al obtener precios de pegado:', error);
    return null;
  }
};

const precioPegadoFinal = computed(() => {
  const cantidadNum = parseInt(cantidad.value || 0)
  let precio = 0
    const { precioPegado1, precioPegado2, precioPegado3, precioPegado4, precioPegado5 } = precioPegado.value

    if (cantidadNum < 1000) {
    precio = precioPegado1
  } else if (cantidadNum >= 1000 && cantidadNum < 3000) {
    precio = precioPegado2
  } else if (cantidadNum >= 3000 && cantidadNum < 5000) {
    precio = precioPegado3
  } else if (cantidadNum >= 5000 && cantidadNum < 10000) {
    precio = precioPegado4
  } else if (cantidadNum >= 10000){
    precio = precioPegado5
  }

  const total = precio

  return total.toFixed(2)
})


//variables reactivas para fijos

const fijosValor = ref({
  fijos1: 0,
  fijos2: 0,
  fijos3: 0,
  fijos4: 0,
  fijos5: 0
})

const obtenerFijos = async () => {
  try {
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/buscarTabla/fijos_cantidad');
    const data = res.data;

    fijosValor.value = {
      fijos1: parseFloat(data.find(d => d.id === 1)?.precio || 0),
      fijos2: parseFloat(data.find(d => d.id === 2)?.precio || 0),
      fijos3: parseFloat(data.find(d => d.id === 3)?.precio || 0),
      fijos4: parseFloat(data.find(d => d.id === 4)?.precio || 0),
      fijos5: parseFloat(data.find(d => d.id === 5)?.precio || 0),
    }
    console.log('Fijos reactivas:', fijosValor.value);

  } catch (error) {
    console.error('Error al obtener fijos:', error);
    return null;
  }
};

const fijosCalculada = computed(() => {
  const cantidadNum = parseInt(cantidad.value || 0)
  let fijosCalc = 0
    const { fijos1, fijos2, fijos3, fijos4, fijos5 } = fijosValor.value

    if (cantidadNum < 1000) {
    fijosCalc = fijos1
  } else if (cantidadNum >= 1000 && cantidadNum < 3000) {
    fijosCalc = fijos2
  } else if (cantidadNum >= 3000 && cantidadNum < 5000) {
    fijosCalc = fijos3
  } else if (cantidadNum >= 5000 && cantidadNum < 10000) {
    fijosCalc = fijos4
  } else if (cantidadNum >= 10000){
    fijosCalc = fijos5
  }

  return fijosCalc.toFixed(2)
})

//variables reativas para envio

const envioValor = ref({
  envio1: 0,
  envio2: 0,
  envio3: 0,
  envio4: 0,
  envio5: 0
})

const obtenerEnvio = async () => {
  try {
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/buscarTabla/envio_cantidad');
    const data = res.data;

    envioValor.value = {
      envio1: parseFloat(data.find(d => d.id === 1)?.precio || 0),
      envio2: parseFloat(data.find(d => d.id === 2)?.precio || 0),
      envio3: parseFloat(data.find(d => d.id === 3)?.precio || 0),
      envio4: parseFloat(data.find(d => d.id === 4)?.precio || 0),
      envio5: parseFloat(data.find(d => d.id === 5)?.precio || 0),
    }
    console.log('Envios reactivas:', envioValor.value);

  } catch (error) {
    console.error('Error al obtener envios:', error);
    return null;
  }
};

const envioCalculada = computed(() => {
  const cantidadNum = parseInt(cantidad.value || 0)
  let envioCalc = 0
    const { envio1, envio2, envio3, envio4, envio5 } = envioValor.value

    if (cantidadNum < 1000) {
    envioCalc = envio1
  } else if (cantidadNum >= 1000 && cantidadNum < 3000) {
    envioCalc = envio2
  } else if (cantidadNum >= 3000 && cantidadNum < 5000) {
    envioCalc = envio3
  } else if (cantidadNum >= 5000 && cantidadNum < 10000) {
    envioCalc = envio4
  } else if (cantidadNum >= 10000){
    envioCalc = envio5
  }

  return envioCalc.toFixed(2)
})



const obtenerUtilidad = async () => {
  try {
    if (areaTotal.value <= 0 || cantidad.value <= 0) {
      utilidad.value = 0
      categoria.value = ''
      rango.value = ''
      return
    }

    const payload = {
      area: parseFloat(areaTotal.value),
      cantidad: parseInt(cantidad.value)
    }

    const res = await axios.post('https://backendgrupoeb.onrender.com/api/utilidad/calcular', payload)
    const data = res.data

    utilidad.value = data.precioUtilidad
    categoria.value = data.categoria
    rango.value = data.rango

    console.log(' Utilidad calculada:', data)

  } catch (err) {
    console.error('Error al obtener utilidad:', err)
    utilidad.value = 0
    categoria.value = ''
    rango.value = ''
  }
}

watch([areaTotal, cantidad], () => {
  obtenerUtilidad()
})



async function insertarCotizacion() {
  if (!selectedEmpresa.value) {
    mostrarAlerta('warning', 'Selecciona un cliente antes de continuar');
    return;
  }

  if (productos.value.length === 0) {
    mostrarAlerta('warning', 'Agrega al menos un producto a la cotización');
    return;
  }

  const payload = {
    num_cliente: selectedEmpresa.value,
    fecha: fechaActual,
    productos: productos.value,
    tintas: tintas.value
  };

  try {
    const res = await axios.post('https://backendgrupoeb.onrender.com/api/cotizaciones/insertar', payload);
    const idCotizacion = res.data.idCotizacion;
    console.log('ID cotización recuperada:', idCotizacion);


    const productosDetalle = await obtenerInfoPDF(idCotizacion);
    console.log('Productos detalle:', productosDetalle);

    mostrarAlerta('success', 'Cotización guardada correctamente');

    // Pasar los productos detalle al PDF
    generarPDFCotizacion(idCotizacion, productosDetalle);

    productos.value = [];

  } catch (error) {
    console.error('Error al insertar cotización:', error);
    mostrarAlerta('danger', 'Error al insertar la cotización');
  }
}


const obtenerInfoPDF = async (idCotizacion) => {
  try {
    const response = await axios.get(`https://backendgrupoeb.onrender.com/api/cotizaciones/detalle/${idCotizacion}`);

    if (response.data && response.data.length > 0) {
      return response.data;
    } else {
      console.log('No se encontraron detalles para la cotización');
      return [];
    }
  } catch (error) {
    console.error('Error al obtener información para el PDF:', error);
    mostrarAlerta('danger', 'Error al obtener los detalles de la cotización');
    return [];
  }
}


const precioVenta = computed(() => {
  return (
    parseFloat(totalCarton.value || 0) +
    parseFloat(precioTintas.value || 0) +
    parseFloat(precioMaquina.value || 0) +
    parseFloat(precioPegadoFinal.value || 0) +
    parseFloat(fijosCalculada.value || 0) +
    parseFloat(utilidad.value || 0) +
    parseFloat(otros.value || 0) +
    parseFloat(envioCalculada.value || 0)
  ).toFixed(2)
})



const precioFinal = ref(precioVenta.value)
const precioEditado = ref(false)

// 🔹 Solo se sincroniza si el usuario no lo ha tocado
watch(precioVenta, (nuevoValor) => {
  if (!precioEditado.value) {
    precioFinal.value = nuevoValor
  }
})


const generarPDFCotizacion = (idCotizacion, productosDetalle, cantidadTintas) => {
  const clienteSeleccionado = clientes.value.find(c => c.num_cliente === selectedEmpresa.value) || {}

  generarPDFCotizacionProfesional({
    cantidad: parseFloat(cantidad.value || 0),
    precioCarton: parseFloat(totalCarton.value || 0),
    precioTintas: parseFloat(precioTintas.value || 0),
    precioMaquina: parseFloat(precioMaquina.value || 0),
    precioPegado: parseFloat(precioPegadoFinal.value || 0),
    precioFijos: parseFloat(fijosCalculada.value || 0),
    precioUtilidad: parseFloat(utilidad.value || 0),
    precioOtros: parseFloat(otros.value || 0),
    precioEnvio: parseFloat(envioCalculada.value || 0),
    precioVenta: parseFloat(precioVenta.value || 0),
    precioFinal: parseFloat(precioFinal.value || 0),
    fecha: fechaActual
  }, clienteSeleccionado, productosDetalle, idCotizacion, cantidadTintas)
}



const productos = ref([]);

function agregarProductoACotizacion() {
  if (!productoSeleccionado.value) {
    return mostrarAlerta('warning', 'Selecciona un producto antes de agregar');
  }

  productos.value.push({
    idProducto: productoSeleccionado.value.identificador,
    cantidad: cantidad.value,
    totalCarton: totalCarton.value,
    tintas: tintas.value,
    precioTintas: precioTintas.value,
    precioMaquina: precioMaquina.value,
    precioPegadoFinal: precioPegadoFinal.value,
    fijosCalculada: fijosCalculada.value,
    utilidadCalculada: utilidad.value,
    otros: otros.value,
    envioCalculada: envioCalculada.value,
    precioVenta: precioVenta.value,
    precioFinal: precioFinal.value
  });

   selectedProducto.value = null
   cantidad.value = ''
   otros.value = ''
   tintas.value = ''

  mostrarAlerta('success', 'Producto agregado a la cotización');


}




onMounted(() => {
  obtenerClientes()
  obtenerPorcentaje()
  obtenerPreciosTintas()
  obtenerPreciosMaquinas()
  obtenerPreciosPegado()
  obtenerUtilidad()
  obtenerFijos()
  obtenerEnvio()

})






</script>
