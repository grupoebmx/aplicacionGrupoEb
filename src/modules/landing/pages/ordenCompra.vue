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
  <form @submit.prevent="guardarOrdenCompra">
    <div class="min-h-screen w-full p-4 bg-white flex justify-center items-start">
      <div class="w-full max-w-[1700px] bg-gray p-6 rounded shadow mt-8">
        <h2 class="font-bold mb-4 text-center text-lg">Orden de compra</h2>
        <div id="alert-container" class="position-fixed top-0 end-0 p-3" style="z-index: 1055;"></div>
        <!-- ====================== INFO ENVÍO ====================== -->
        <fieldset class="bg-gray-100 border border-gray-300 rounded p-2 mb-4 mt-5">
          <legend class="text-xs font-semibold px-2">Info envío</legend>

          <div class="grid grid-cols-8 gap-4">
            <!-- SELECT DE PROVEEDORES -->
            <div>
              <div class="text-center text-xs font-semibold mb-1">Nombre:</div>
              <select
                v-model="proveedorSeleccionado"
                class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full bg-gray-50"
              >
                <option value="" disabled>Selecciona un proveedor</option>
                <option v-for="prov in proveedores" :key="prov.id" :value="prov.idproveedores">
                  {{ prov.nombre }}
                </option>
              </select>
            </div>

            <div>
              <div class="text-center text-xs font-semibold mb-1">Ejecutivo de ventas:</div>
              <input
                type="text"
                readonly
                :value="datosProveedor.ejecutivo_ventas"
                class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full bg-gray-50"
              />
            </div>

            <div>
              <div class="text-center text-xs font-semibold mb-1">Correo:</div>
              <input
                type="text"
                readonly
                :value="datosProveedor.correo"
                class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full bg-gray-50"
              />
            </div>

            <div>
              <div class="text-center text-xs font-semibold mb-1">Categoría:</div>
              <input
                type="text"
                readonly
                :value="datosProveedor.categoria"
                class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full bg-gray-50"
              />
            </div>

            <div>
              <div class="text-center text-xs font-semibold mb-1">Teléfono:</div>
              <input
                type="text"
                readonly
                :value="datosProveedor.telefono"
                class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full bg-gray-50"
              />
            </div>

            <div>
              <div class="text-center text-xs font-semibold mb-1">Fecha:</div>
              <input
                type="text"
                readonly
                :value="fecha"
                class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full bg-gray-50"
              />
            </div>

          </div>
        </fieldset>

        <!-- ====================== EMBARQUE ====================== -->
        <fieldset class="bg-gray-100 border border-gray-300 rounded p-2 mb-4 mt-5">
          <legend class="text-xs font-semibold px-2">Embarque</legend>

          <div class="grid grid-cols-8 gap-4 justify-items-center items-center">
            <div class="col-span-2 text-center">
              <div class="text-xs font-semibold mb-1">Nombre:</div>
              <span>GrupoEB S.A. de C.V</span>
            </div>

            <div class="col-span-3 text-center">
              <div class="text-xs font-semibold mb-1">Dirección:</div>
              <span>Rogelio Ledesma #102, Tlajomulco de Zúñiga</span>
            </div>

            <div class="col-span-2 text-center">
              <div class="text-xs font-semibold mb-1">Número de contacto:</div>
              <span>3331259595</span>
            </div>

            <div class="col-span-1 flex justify-center">
              <img src="/imagen/logo.jpg" alt="Plano" class="w-16 h-16 object-contain" />
            </div>
          </div>
        </fieldset>

        <!-- ====================== TABLA DE MATERIALES ====================== -->
        <fieldset class="bg-gray-100 border border-gray-300 rounded p-2 mb-4 mt-5">
          <legend class="text-xs font-semibold px-2">Materiales por comprar</legend>

          <div class="table w-full border-separate border-spacing-2 table-fixed">
            <div class="table-row bg-gray-200 font-semibold">
              <div class="table-cell p-1">Clave</div>
              <div class="table-cell p-1">Ancho Milimetros</div>
              <div class="table-cell p-1">Largo Milimetros</div>
              <div class="table-cell p-1">Area M2</div>
              <div class="table-cell p-1">Estructura</div>
              <div class="table-cell p-1">Marcas</div>
              <div class="table-cell p-1">Precio M2</div>
              <div class="table-cell p-1">Costo Unitario</div>
              <div class="table-cell p-1">Piezas</div>
              <div class="table-cell p-1">Total P-MX</div>
            </div>

            <!-- Filas dinámicas -->
            <div v-for="(fila, index) in filasMateriales" :key="index" class="table-row bg-white">
              <div class="table-cell p-1 border border-gray-300">
                <input
                  type="text"
                  v-model="fila.clave"
                  class="w-full bg-transparent border-none focus:outline-none"
                />
              </div>
              <div class="table-cell p-1 border border-gray-300">
                <input
                  type="text"
                  v-model="fila.ancho"
                  class="w-full bg-transparent border-none focus:outline-none"
                />
              </div>
              <div class="table-cell p-1 border border-gray-300">
                <input
                  type="text"
                  v-model="fila.largo"
                  class="w-full bg-transparent border-none focus:outline-none"
                />
              </div>
              <div class="table-cell p-1 border border-gray-300">
                <input
                  type="text"
                  v-model="fila.area"
                  class="w-full bg-transparent border-none focus:outline-none"
                />
              </div>
              <div class="table-cell p-1 border border-gray-300">
                <input
                  type="text"
                  v-model="fila.estructura"
                  class="w-full bg-transparent border-none focus:outline-none"
                />
              </div>
              <div class="table-cell p-1 border border-gray-300">
                <input
                  type="text"
                  v-model="fila.marcas"
                  class="w-full bg-transparent border-none focus:outline-none"
                />
              </div>
              <div class="table-cell p-1 border border-gray-300">
                <input
                  type="text"
                  :value="formatoMoneda(fila.precio_m2)"
                  class="w-full bg-transparent border-none focus:outline-none"
                />
              </div>
              <div class="table-cell p-1 border border-gray-300">
                <input
                  type="text"
                  :value="formatoMoneda(fila.precio_unitario)"
                  class="w-full bg-transparent border-none focus:outline-none"
                />
              </div>
              <div class="table-cell p-1 border border-gray-300">
                <input
                  type="text"
                  v-model="fila.piezas"
                  class="w-full bg-transparent border-none focus:outline-none"
                />
              </div>
              <div class="table-cell p-1 border border-gray-300">
                <input
                  type="text"
                  :value="formatoMoneda(fila.total)"
                  class="w-full bg-transparent border-none focus:outline-none"
                />
              </div>
            </div>

            <div class="table-row bg-white font-bold">
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1 text-right">Subtotal:</div>
              <div class="table-cell p-1 text-center" id="total-celda">{{ formatoMoneda(subtotal) }}</div>
            </div>
            <div class="table-row bg-white font-bold">
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1 text-right">IVA:</div>
              <div class="table-cell p-1 text-center" id="total-celda">{{ formatoMoneda(iva) }}</div>
            </div>
            <div class="table-row bg-white font-bold">
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1"></div>
              <div class="table-cell p-1 text-right">Total:</div>
              <div class="table-cell p-1 text-center" id="total-celda">{{ formatoMoneda(total) }}</div>
            </div>
          </div>
        </fieldset>

        <img src="/imagen/medidas .jpg" alt="Plano" class="imagen" />

        <!-- Botón para generar PDF -->
        <div class="flex justify-center mt-6">
          <button

            type="submit"
            class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-md text-xs px-2 py-1 text-center"
          >
            Generar orden de compra
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import jsPDF from 'jspdf'
import { useRoute } from 'vue-router'
import axios from 'axios'


const route = useRoute()

// Fecha
const fecha = new Date().toISOString().substring(0, 10)

const filasMateriales = ref([]);

const proveedores = ref([]);
const proveedorSeleccionado = ref('');

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



const formatoMoneda = (valor) => {
  const numero = Number(valor)
  if (isNaN(numero)) return ''
  return numero.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  })
}


// Datos del proveedor seleccionado
const datosProveedor = computed(() => {
  return proveedores.value.find(p => p.idproveedores === proveedorSeleccionado.value) || {};
});

// Obtener proveedores desde el backend
const obtenerProveedores = async () => {
  try {
    const res = await fetch('https://backendgrupoeb.onrender.com/api/buscarTabla/proveedores');
    const data = await res.json();
    proveedores.value = data;
    console.log('Proveedores cargados:', data);
  } catch (error) {
    console.error('Error al obtener proveedores:', error);
  }
};



const cargarDatos = async () => {
  try {
    const idPedido = route.params.id;
    if (!idPedido) return console.error("No se recibió id de pedido");

    // Obtener los detalles del pedido
    const { data: detalles } = await axios.get(
      `https://backendgrupoeb.onrender.com/api/pedidos/${idPedido}/detalles`
    );


filasMateriales.value = detalles.map((d) => {
  let piezasExtra = 0;

  // Aplicar reglas según cantidad base
  if (d.cantidad < 3000) {
    piezasExtra = 100;
  } else if (d.cantidad >= 3000 && d.cantidad < 5000) {
    piezasExtra = 150;
  } else if (d.cantidad >= 5000 && d.cantidad < 10000) {
    piezasExtra = 200;
  } else if (d.cantidad >= 10000 && d.cantidad < 20000) {
    piezasExtra = 300;
  } else if (d.cantidad >= 20000 && d.cantidad < 50000) {
    piezasExtra = 400;
  } else if (d.cantidad >= 50000) {
    piezasExtra = 500;
  }

  // Total de piezas = cantidad original + extra
  const totalPiezas = d.cantidad + piezasExtra;

  return {
    id_producto: d.id_producto,
    clave: d.clave,
    ancho: (d.ancho_carton * 10),
    largo: (d.largo_carton * 10),
    area: 0,
    estructura: `${d.resistencia} - ${d.flauta} - ${d.material}`,
    marcas: d.marcas,
    precio_m2: d.precio,
    precio_unitario: 0,
    piezas: totalPiezas,
    total: 0
  };
});



    calcularFilas();
  } catch (error) {
    console.error("Error al cargar detalles del pedido:", error);
  }
};

// Función para calcular los campos dinámicos
const calcularFilas = () => {
  filasMateriales.value.forEach((fila) => {
    // Área = ancho * largo
  fila.area = ((Number(fila.ancho) * Number(fila.largo)) / 1_000_000).toFixed(3);
    // Precio unitario = precio_m2 * area
  fila.precio_unitario = (fila.precio_m2 * fila.area).toFixed(3);

    // Total = piezas * precio_unitario
  fila.total = fila.piezas * fila.precio_unitario;
  });
};


watch(filasMateriales, calcularFilas, { deep: true });

const subtotal = computed(() =>
  filasMateriales.value.reduce((acc, fila) => acc + fila.total, 0)

);

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


const ivaPorcentaje = ref(0);


const ivaDecimal = computed(() => Number(ivaPorcentaje.value) / 100);

const iva = computed(() => {
  return Number(subtotal.value) * ivaDecimal.value;
});


const total = computed(() => subtotal.value + iva.value)


const guardarOrdenCompra = async () => {
  try {
    const idPedido = route.params.id;

    // Validaciones básicas
    if (!proveedorSeleccionado.value) {
      return mostrarAlerta("warning", "Selecciona un proveedor");
    }
    if (!filasMateriales.value.length) {
      return mostrarAlerta("warning", "No hay materiales para registrar");
    }

    // Construir el array de productos
    const materiales = filasMateriales.value.map((fila) => ({
      id_producto: fila.id_producto,
      area: Number(fila.area),
      precio_m2: Number(fila.precio_m2),
      precio_unitario: Number(fila.precio_unitario),
      piezas: Number(fila.piezas),
      total: Number(fila.total),
    }));

    // Construir payload
    const payload = {
      id_pedido: idPedido,
      id_proveedor: proveedorSeleccionado.value,
      subtotal: Number(subtotal.value),
      fecha: fecha, // Se envía en formato DD/MM/YYYY - el backend lo convertirá
      iva: Number(iva.value),
      total_orden: Number(total.value),
      materiales,
    };

    console.log('📤 Enviando orden:', payload);

    // Enviar al backend
    const { data } = await axios.post(
      'https://backendgrupoeb.onrender.com/api/ordenes/insertar',
      payload
    );

    console.log("✅ Orden de compra guardada:", data);
    mostrarAlerta("success", `Orden de compra #${data.idOrden} registrada correctamente`);

    // Generar PDF
    generarPDF(data.idOrden);

  } catch (error) {
    console.error("❌ Error completo:", error);
    console.error("Respuesta del servidor:", error.response?.data);

    // Mostrar mensaje específico del error
    let mensaje = "Ocurrió un error al guardar la orden de compra";

    if (error.response?.data?.message) {
      mensaje = error.response.data.message;
    } else if (error.message) {
      mensaje = error.message;
    }

    mostrarAlerta("danger", mensaje);

    // Si hay detalles adicionales, mostrarlos en consola
    if (error.response?.data?.detalle) {
      console.error("Detalle adicional:", error.response.data.detalle);
    }
  }
};


const generarPDF = (idOrdenGenerada) => {
  // Configurar para tamaño carta horizontal
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'letter' })

  // Márgenes definidos
  const MARGIN = {
    left: 12,
    right: 12,
    top: 15,
    bottom: 20
  }

  let yPosition = MARGIN.top + 18

  // --- LOGO ---
  const img = new Image()
  img.src = '/imagen/logo.jpg'
  doc.addImage(img, 'JPEG', MARGIN.left, MARGIN.top, 30, 20)

  // --- ENCABEZADO ---
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text('GRUPEB S.A. de C.V.', MARGIN.left, MARGIN.top + 25)

  // --- INFORMACIÓN DEL CLIENTE ---
  yPosition += 15
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('INFORMACIÓN DEL PROVEEDOR', MARGIN.left, yPosition)
  yPosition += 8

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text('Nombre:', MARGIN.left, yPosition)
  doc.text(datosProveedor.value.nombre || '[Seleccione un proveedor]', MARGIN.left + 33, yPosition)
  yPosition += 5
  doc.text('Ejecutivo de ventas:', MARGIN.left, yPosition)
  doc.text(datosProveedor.value.ejecutivo_ventas || '[No disponible]', MARGIN.left + 33, yPosition)
  yPosition += 5
  doc.text('Correo:', MARGIN.left, yPosition)
  doc.text(datosProveedor.value.correo || '[No disponible]', MARGIN.left + 33, yPosition)
  yPosition += 5
  doc.text('Categoría:', MARGIN.left, yPosition)
  doc.text(datosProveedor.value.categoria || '[No disponible]', MARGIN.left + 33, yPosition)
  yPosition += 5
  doc.text('Teléfono:', MARGIN.left, yPosition)
  doc.text(datosProveedor.value.telefono || '[No disponible]', MARGIN.left + 33, yPosition)
  yPosition += 5

  // --- INFORMACIÓN DE EMBARQUE ---
  let rightYPosition = yPosition - 33
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('INFORMACIÓN DE EMBARQUE', 100, rightYPosition)
  rightYPosition += 8
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text('Nombre:', 100, rightYPosition)
  doc.text('GrupoEB S.A. de CV', 120, rightYPosition)
  rightYPosition += 5
  doc.text('Dirección:', 100, rightYPosition)
  doc.text('Rogelio Ledesma #102, Tlajomulco de Zúñiga', 120, rightYPosition)
  rightYPosition += 5
  doc.text('Número de contacto:', 100, rightYPosition)
  doc.text('3331259595', 134, rightYPosition)
  rightYPosition += 5

  yPosition = Math.max(yPosition, rightYPosition) + 10

// --- TABLA PEDIDO Y FECHA - ALINEADA AL MARGEN DERECHO ---
doc.setFont('helvetica', 'bold')
// Tu tabla original estaba en x=210, la movemos para que termine en el margen derecho
const anchoTabla = 45 // Ancho que tenías aproximadamente
const tablaX = 279 - MARGIN.right - anchoTabla // Esto la posiciona para que termine en el margen derecho
const tablaY = 15
const altoFila = 8

// Dibujar las 4 celdas CON ANCHO REAL para que se vean las líneas
for (let i = 0; i < 4; i++) {
  doc.rect(tablaX, tablaY + i * altoFila, anchoTabla, altoFila)
}

// Mantener EXACTAMENTE las mismas posiciones de texto RELATIVAS
doc.setFontSize(10)
doc.text('Orden Compra', tablaX + 5.5, tablaY + 6)
doc.setFont('helvetica', 'normal')
doc.text(`C-${idOrdenGenerada}`, tablaX + 15, tablaY + 13)

doc.setFont('helvetica', 'bold')
doc.text('Fecha', tablaX + 15, tablaY + 21)
doc.setFont('helvetica', 'normal')
const hoy = new Date()
const fechaPDF = hoy.toLocaleDateString('es-MX')
doc.text(fechaPDF, tablaX + 12, tablaY + 29)
yPosition += 2

  // --- TABLA PRODUCTOS DINÁMICA ---
  const headers = [
    'Clave', 'Ancho Milimetros', 'Largo Milimetros', 'Area M2', 'Estructura', 'Marcas',
    'Precios M2', 'Costo unitario', 'Piezas', 'Total Pesos'
  ]
  const widths = [30, 25, 25, 25, 30, 40, 20, 20, 20, 25]
  const yStart = yPosition + 1
  const xStart = MARGIN.left
  let x = xStart

  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  headers.forEach((h, i) => {
    doc.rect(x, yStart, widths[i], 7)
    let textoAjustado = h
    if (h === 'Costo unitario') textoAjustado = 'Costo unitario'
    if (h === 'Total Pesos') textoAjustado = 'T. por producto'
    const textWidth = doc.getTextWidth(textoAjustado)
    const centerX = x + (widths[i] - textWidth) / 2
    doc.text(textoAjustado, centerX, yStart + 4)
    x += widths[i]
  })

  // --- FILAS PRODUCTOS ---
  let yFila = yStart + 7
  filasMateriales.value.forEach(fila => {
    x = xStart
    const valores = [
      fila.clave,
      Number(fila.ancho),
      Number(fila.largo),
      Number(fila.area),
      fila.estructura,
      fila.marcas,
      new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(fila.precio_m2),
      new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(fila.precio_unitario),
      fila.piezas,
      new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(fila.total)
    ]

    valores.forEach((val, i) => {
      doc.rect(x, yFila, widths[i], 7)
      doc.text(val.toString(), x + 1, yFila + 5)
      x += widths[i]
    })
    yFila += 7
  })

  // --- TABLA DE TOTALES BIEN ALINEADA ---
  const totalTableY = yFila + 5
  const totalTableWidth = 80  // Ancho de la tabla de totales
  // CALCULAR POSICIÓN X AL FINAL DE LA TABLA PRINCIPAL
  const anchoTotalTabla = widths.reduce((sum, width) => sum + width, 0)
  const totalTableX = xStart + anchoTotalTabla - totalTableWidth

  // Configuración de la tabla de totales
  const totalRowHeight = 8
  const labelWidth = 50

  // Dibujar tabla de totales
  for (let i = 0; i < 3; i++) {
    doc.rect(totalTableX, totalTableY + (i * totalRowHeight), totalTableWidth, totalRowHeight)
  }

  // Subtotales
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)

  // Subtotal
  const subtotalFormateado = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(subtotal.value)
  doc.text('Subtotal:', totalTableX + 5, totalTableY + 5)
  doc.text(subtotalFormateado, totalTableX + labelWidth + 5, totalTableY + 5)

  // IVA
  const ivaFormateado = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(iva.value)
  doc.text('IVA:', totalTableX + 5, totalTableY + 13)
  doc.text(ivaFormateado, totalTableX + labelWidth + 5, totalTableY + 13)

  // Total
  const totalFormateado = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(total.value)
  doc.text('Total:', totalTableX + 5, totalTableY + 21)
  doc.text(totalFormateado, totalTableX + labelWidth + 5, totalTableY + 21)

  // Actualizar posición Y para elementos siguientes
  yFila = totalTableY + 30

  // --- IMAGEN DE MEDIDAS ---
  const imgMedidas = new Image()
  imgMedidas.src = '/imagen/medidas .jpg'
  doc.addImage(imgMedidas, 'JPEG', MARGIN.left, yFila, 70, 40)

  // --- GUARDAR PDF ---
  doc.save('OrdenCompra-grupoEB.pdf')
}





onMounted(() => {
  obtenerProveedores()
  cargarDatos()
  cargarIva()
})
</script>
