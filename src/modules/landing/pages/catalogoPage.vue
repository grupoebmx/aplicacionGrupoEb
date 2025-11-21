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
  <div class="min-h-screen w-full p-4 bg-gray-100 flex justify-center items-start">
    <div class="w-full max-w-[1700px] bg-white p-6 rounded shadow mt-8">

      <!-- Título + Botón Agregar Producto -->
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold font-[Inter]">Catálogo</h2>
        <div id="alert-container" class="position-fixed top-0 end-0 p-3" style="z-index: 1055;"></div>
        <router-link to="/productos" class="btn btn-active btn-success">
          Agregar Producto
        </router-link>
      </div>

      <!-- Barra de búsqueda -->
      <div class="flex justify-center items-center mb-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar producto..."
          class="border rounded-md p-2 w-1/3 shadow-sm text-sm"
        />
      </div>

      <!-- Lista de productos -->
      <div v-if="loading" class="text-center text-gray-500">Cargando productos...</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="producto in productosFiltrados"
          :key="producto.producto"
          class="border rounded shadow-md p-4 flex flex-col gap-2 bg-gray-50"
        >
          <!-- Imagen -->
          <div class="flex justify-center">
            <img
              v-if="producto.imagen_final_base64"
              :src="`data:image/png;base64,${producto.imagen_final_base64}`"
              alt="Imagen producto"
              class="w-40 h-40 object-contain border rounded"
            />
            <div
              v-else
              class="w-40 h-40 border border-dashed flex items-center justify-center text-gray-400 text-xs"
            >
              Sin imagen
            </div>
          </div>

          <!-- Información -->
          <div class="flex flex-col text-sm">
            <span><strong>Empresa:</strong> {{ producto.nombre_empresa }}</span>
            <span><strong>Impresión:</strong> {{ producto.impresion }}</span>
            <span><strong>Producto:</strong> {{ producto.producto }}</span>
            <span><strong>Descripción:</strong> {{ producto.descripcion }}</span>
            <span><strong>Tipo:</strong> {{ producto.tipo }}</span>
            <span>
              <strong>Dimensiones:</strong> {{ producto.ancho_int }} x {{ producto.largo_int }} x
              {{ producto.alto_int }}
            </span>
            <span><strong>Material:</strong> {{ producto.material_tipo }}</span>
            <span><strong>Fecha:</strong> {{ producto.fecha }}</span>
          </div>

          <!-- Acciones -->
          <div class="flex justify-end gap-2 mt-2">
            <button
              class="bg-neutral-950 text-white px-3 py-1 rounded text-xs hover:bg-yellow-500"
              @click="editarProducto(producto.identificador)"
            >
              Editar
            </button>
            <button
              class="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
              @click="eliminarProducto(producto.identificador)"
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
import { ref, computed, } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const searchQuery = ref('')
const productos = ref([])
const loading = ref(true)


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

const cargarProductos = async () => {
  loading.value = true;
  try {
    const { data } = await axios.get('https://backendgrupoeb.onrender.com/api/producto/catalogo');
    productos.value = data;
    console.log('Productos cargados:', productos.value);
  } catch (error) {
    console.error('Error al cargar productos:', error);
  } finally {
    loading.value = false;
  }
}






const productosFiltrados = computed(() =>
  productos.value.filter(
    (p) =>
      p.nombre_empresa?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)


const editarProducto = (id) => {
  if (!id) {
    console.warn('Identificador inválido')
    return
  }
  console.log('Navegando a editar producto con id:', id)
  router.push({ name: 'EditarProducto', params: { id } })
}


const eliminarProducto = async (identificador) => {
  if (!identificador) {
    console.warn('Identificador inválido para eliminar')
    return
  }
  try {
    await axios.delete(`https://backendgrupoeb.onrender.com/api/productos/${identificador}`)
    productos.value = productos.value.filter((p) => p.identificador !== identificador)
    console.log('Producto eliminado:', identificador)
    mostrarAlerta('success', 'Producto eliminado correctamente');
  } catch (error) {

    if (error.response && error.response.status === 409) {
      mostrarAlerta('danger', error.response.data);
    } else {
      mostrarAlerta('danger', 'Error al eliminar material');
    }
  }
}

cargarProductos();
</script>
