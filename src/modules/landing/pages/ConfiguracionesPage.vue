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
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Configuraciones</h1>
    <div id="alert-container" class="position-fixed top-0 end-0 p-3" style="z-index: 1055;"></div>

    <div class="flex gap-6">
      <div class="w-1/4 border-r pr-4">
        <ul>
          <li
            v-for="op in opciones"
            :key="op.id"
            @click="seleccionar(op.id)"
            class="cursor-pointer p-2 rounded mb-1 hover:bg-gray-200"
            :class="{
              'bg-blue-100 text-blue-700 font-semibold': seccionActiva === op.id
            }"
          >
            {{ op.label }}
          </li>
        </ul>
      </div>

      <!-- Contenido dinámico -->
         <div class="flex-1 pl-4">
        <div v-if="seccionActiva === 'usuarios'">
          <tablaUsuarios
        :encabezado="['Id', 'Correo', 'Rol', 'Num. empleado', 'Nombre', 'Apellido']"
        :claves="['id','correo','rol','numeroempleado','nombre','apellido']"
        :info="listaUsuarios"
        @editar="abrirModal"
        @eliminar="eliminarUsuario"
        @agregar="irAFormularioAgregar"
        @cambiarContrasena="cambiarContrasena"
      />
        </div>


        <div v-if="seccionActiva === 'porcentajes'">
          <tablaPorcentajes
        :encabezado="['Id', 'Rango', 'Porcentaje']"
        :claves="['id','rango','porcentaje']"
        :info="porcentajes"
        @editar="abrirModal"
      />
        </div>

        <div v-else-if="seccionActiva === 'precios tintas'">
          <tablaTintas
        :encabezado="['Id', 'Rango', 'Precio']"
        :claves="['id','rango','precio']"
        :info="tintas"
        @editar="abrirModal"
      />
        </div>

        <div v-else-if="seccionActiva === 'precios maquinas'">
          <tablaMaquinas
        :encabezado="['Id', 'Rango', 'Precio']"
        :claves="['id','rango','precio']"
        :info="maquinas"
        @editar="abrirModal"
      />
        </div>

        <div v-else-if="seccionActiva === 'precios pegados'">
          <tablaPegados
        :encabezado="['Id', 'Rango', 'Precio']"
        :claves="['id','rango','precio']"
        :info="pegados"
        @editar="abrirModal"
      />
        </div>

        <div v-else-if="seccionActiva === 'precios fijos'">
          <tablaFijos
        :encabezado="['Id', 'Rango', 'Precio']"
        :claves="['id','rango','precio']"
        :info="fijos"
        @editar="abrirModal"
      />
        </div>

        <div v-else-if="seccionActiva === 'precios utilidad'">
          <tablaUtilidad
        :encabezado="['Id', 'Categoría', 'Rango', 'Precio']"
        :claves="['id','categoria','rango','precio']"
        :info="utilidad"
        @editar="abrirModal"
      />
        </div>

        <div v-else-if="seccionActiva === 'precios envio'">
          <tablaEnvio
        :encabezado="['Id', 'Rango', 'Precio']"
        :claves="['id','rango','precio']"
        :info="envio"
        @editar="abrirModal"
      />
        </div>

        <div v-else-if="seccionActiva === 'lista tintas'">
          <TablaTintas
            :encabezado="['Id', 'Gcmi', 'Nombre']"
            :claves="['id_tinta','gcmi','nombre_tinta']"
            :info="listaTintas"
            @eliminar="borrarTinta"
          />
        </div>

        <div v-else-if="seccionActiva === 'lista materiales'">
          <TablaMateriales
            :encabezado="['Clave', 'Tipo', 'Material', 'Resistencia', 'Flauta', 'Tipo material','Calibre','Peso','Precio']"
            :claves="['clave','tipo','material','resistencia','flauta','tipo_material','calibre','peso','precio']"
            :info="listaMateriales"
            @editar="abrirModal"
            @eliminar="borrarMaterial"
          />
        </div>

        <div v-else-if="seccionActiva === 'lista cajas'">
          <TablaCajas
            :encabezado="['Id', 'Nombre', 'Área Minima', 'Área Máxima']"
            :claves="['id','nombre','area_min','area_max']"
            :info="listaCajas"
            @editar="abrirModal"
          />
        </div>
        <!-- Modal Reutilizable -->
    <ModalPorcentajes
      :visible="modalPorcentajes"
      titulo="Editar Porcentaje"
      @cancelar="cerrarModal('porcentajes')"
      @confirmar="guardarCambios"
    >
      <template #contenido>
        <div class="mb-3">
          <label class="block text-gray-700 text-sm font-medium mb-1">Rango</label>
          <input
            v-model="formData.rango"
            type="text"
            class="w-full border rounded p-2"
            disabled
          />
        </div>

        <div class="mb-3">
          <label class="block text-gray-700 text-sm font-medium mb-1">Porcentaje</label>
          <input
            v-model="formData.porcentaje"
            type="number"
            step="0.01"
            class="w-full border rounded p-2"
          />
        </div>
      </template>
    </ModalPorcentajes>

    <ModalTintas
      :visible="modalTintas"
      titulo="Editar Tinta"
      @cancelar="cerrarModal('tintas')"
      @confirmar="guardarCambios"
    >
      <template #contenido>
        <div class="mb-3">
          <label class="block text-gray-700 text-sm font-medium mb-1">Rango</label>
          <input
            v-model="formData.rango"
            type="text"
            class="w-full border rounded p-2"
            disabled
          />
        </div>

        <div class="mb-3">
          <label class="block text-gray-700 text-sm font-medium mb-1">Precio</label>
          <input
            v-model="formData.precio"
            type="number"
            step="0.01"
            class="w-full border rounded p-2"
          />
        </div>
      </template>
    </ModalTintas>

    <ModalMaquinas
      :visible="modalMaquinas"
      titulo="Editar Maquina"
      @cancelar="cerrarModal('maquinas')"
      @confirmar="guardarCambios"
    >
      <template #contenido>
        <div class="mb-3">
          <label class="block text-gray-700 text-sm font-medium mb-1">Rango</label>
          <input
            v-model="formData.rango"
            type="text"
            class="w-full border rounded p-2"
            disabled
          />
        </div>

        <div class="mb-3">
          <label class="block text-gray-700 text-sm font-medium mb-1">Precio</label>
          <input
            v-model="formData.precio"
            type="number"
            step="0.01"
            class="w-full border rounded p-2"
          />
        </div>
      </template>
    </ModalMaquinas>

    <ModalPegados
      :visible="modalPegados"
      titulo="Editar Pegado"
      @cancelar="cerrarModal('pegados')"
      @confirmar="guardarCambios"
    >
      <template #contenido>
        <div class="mb-3">
          <label class="block text-gray-700 text-sm font-medium mb-1">Rango</label>
          <input
            v-model="formData.rango"
            type="text"
            class="w-full border rounded p-2"
            disabled
          />
        </div>

        <div class="mb-3">
          <label class="block text-gray-700 text-sm font-medium mb-1">Precio</label>
          <input
            v-model="formData.precio"
            type="number"
            step="0.01"
            class="w-full border rounded p-2"
          />
        </div>
      </template>
    </ModalPegados>

    <ModalFijos
      :visible="modalFijos"
      titulo="Editar Fijos"
      @cancelar="cerrarModal('fijos')"
      @confirmar="guardarCambios"
    >
      <template #contenido>
        <div class="mb-3">
          <label class="block text-gray-700 text-sm font-medium mb-1">Rango</label>
          <input
            v-model="formData.rango"
            type="text"
            class="w-full border rounded p-2"
            disabled
          />
        </div>

        <div class="mb-3">
          <label class="block text-gray-700 text-sm font-medium mb-1">Precio</label>
          <input
            v-model="formData.precio"
            type="number"
            step="0.01"
            class="w-full border rounded p-2"
          />
        </div>
      </template>
    </ModalFijos>


    <ModalUtilidad
      :visible="modalUtilidad"
      titulo="Editar Utilidad"
      @cancelar="cerrarModal('utilidad')"
      @confirmar="guardarCambios"
    >
      <template #contenido>
        <div class="mb-3">
          <label class="block text-gray-700 text-sm font-medium mb-1">Rango</label>
          <input
            v-model="formData.rango"
            type="text"
            class="w-full border rounded p-2"
            disabled
          />
        </div>

        <div class="mb-3">
          <label class="block text-gray-700 text-sm font-medium mb-1">Precio</label>
          <input
            v-model="formData.precio"
            type="number"
            step="0.01"
            class="w-full border rounded p-2"
          />
        </div>
      </template>
    </ModalUtilidad>

    <ModalEnvio
      :visible="modalEnvio"
      titulo="Editar Envío"
      @cancelar="cerrarModal('envio')"
      @confirmar="guardarCambios"
    >
      <template #contenido>
        <div class="mb-3">
          <label class="block text-gray-700 text-sm font-medium mb-1">Rango</label>
          <input
            v-model="formData.rango"
            type="text"
            class="w-full border rounded p-2"
            disabled
          />
        </div>

        <div class="mb-3">
          <label class="block text-gray-700 text-sm font-medium mb-1">Precio</label>
          <input
            v-model="formData.precio"
            type="number"
            step="0.01"
            class="w-full border rounded p-2"
          />
        </div>
      </template>
    </ModalEnvio>

     <ModalMateriales
      :visible="modalListaMateriales"
      titulo="Editar Materiales"
      @cancelar="cerrarModal('lista materiales')"
      @confirmar="guardarCambiosMateriales"
    >
      <template #contenido>
        <div v-for="(campo, key) in formDataMateriales" :key="key" class="mb-3">
      <label class="block text-gray-700 text-sm font-medium mb-1">{{ key }}</label>
      <input
        v-model="formDataMateriales[key]"
        type="text"
        class="w-full border rounded p-2"
        :disabled="key === 'clave'"
      />
    </div>
      </template>
    </ModalMateriales>


      <ModalCajas
      :visible="modalListaCajas"
      titulo="Editar Cajas"
      @cancelar="cerrarModal('lista cajas')"
      @confirmar="guardarCambiosCajas"
    >
      <template #contenido>
        <div v-for="(campo, key) in formDataCajas" :key="key" class="mb-3">
      <label class="block text-gray-700 text-sm font-medium mb-1">{{ key }}</label>
      <input
        v-model="formDataCajas[key]"
        type="text"
        class="w-full border rounded p-2"
        :disabled="key === 'id'"
      />
    </div>
      </template>
    </ModalCajas>

    <ModalUsuarios
      :visible="modalListaUsuarios"
      titulo="Editar Usuarios"
      @cancelar="cerrarModal('lista usuarios')"
      @confirmar="guardarCambiosUsuarios"
    >
      <template #contenido>
        <div v-for="(campo, key) in formDataUsuarios" :key="key" class="mb-3">
      <label class="block text-gray-700 text-sm font-medium mb-1">{{ key }}</label>
      <input
        v-model="formDataUsuarios[key]"
        type="text"
        class="w-full border rounded p-2"
        :disabled="key === 'id'"
      />
    </div>
      </template>
    </ModalUsuarios>


          <!-- Modal simple -->
      <div v-if="mostrarModalCambiarPass" class="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-96">
          <h2 class="text-xl font-bold mb-4">Cambiar Contraseña</h2>

          <p class="mb-4">
            Usuario: <strong>{{ usuarioSeleccionado?.correo }}</strong>
          </p>

          <div class="relative mb-4">
            <input
              v-model="nuevaContrasena"
              :type="mostrarPassword ? 'text' : 'password'"
              class="w-full px-3 py-2 border rounded-md pr-10"
              placeholder="Nueva contraseña"
            />
            <button
              @click="mostrarPassword = !mostrarPassword"
              type="button"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <svg v-if="!mostrarPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            </button>
          </div>

          <div class="flex gap-2 justify-end">
            <button @click="cerrarModalCambiarPass" class="px-4 py-2 bg-gray-300 rounded-md">
              Cancelar
            </button>
            <button
              @click="confirmarCambioContrasena"
              class="px-4 py-2 bg-blue-600 text-white rounded-md"
              :disabled="!nuevaContrasena"
            >
              Cambiar
            </button>
          </div>
        </div>
      </div>

      <ModalMateriales
      :visible="modalListaMateriales"
      titulo="Editar Materiales"
      @cancelar="cerrarModal('lista materiales')"
      @confirmar="guardarCambiosMateriales"
    >
      <template #contenido>
        <div v-for="(campo, key) in formDataMateriales" :key="key" class="mb-3">
      <label class="block text-gray-700 text-sm font-medium mb-1">{{ key }}</label>
      <input
        v-model="formDataMateriales[key]"
        type="text"
        class="w-full border rounded p-2"
        :disabled="key === 'clave'"
      />
    </div>
      </template>
    </ModalMateriales>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import tablaPorcentajes from '@/components/TablaPrecios.vue'
import tablaTintas from '@/components/TablaPrecios.vue'
import tablaMaquinas from '@/components/TablaPrecios.vue'
import tablaPegados from '@/components/TablaPrecios.vue'
import tablaFijos from '@/components/TablaPrecios.vue'
import tablaUtilidad from '@/components/TablaPrecios.vue'
import tablaEnvio from '@/components/TablaPrecios.vue'
import ModalPorcentajes from '@/components/ModalBase.vue'
import ModalTintas from '@/components/ModalBase.vue'
import ModalMaquinas from '@/components/ModalBase.vue'
import ModalPegados from '@/components/ModalBase.vue'
import ModalFijos from '@/components/ModalBase.vue'
import ModalUtilidad from '@/components/ModalBase.vue'
import ModalEnvio from '@/components/ModalBase.vue'
import TablaTintas from '@/components/TablaTintas.vue'
import TablaMateriales from '@/components/TablaMateriales.vue'
import ModalMateriales from '@/components/ModalBase.vue'
import TablaCajas from '@/components/TablaCajas.vue'
import ModalCajas from '@/components/ModalBase.vue'
import TablaUsuarios from '@/components/TablaUsuarios.vue'
import ModalUsuarios from '@/components/ModalBase.vue'


const router = useRouter()

const porcentajes = ref([])
const tintas = ref([])
const maquinas = ref([])
const pegados = ref([])
const fijos = ref([])
const utilidad = ref([])
const envio = ref([])
const listaTintas = ref([])
const listaMateriales = ref([])
const listaCajas = ref([])
const listaUsuarios = ref([])
const mostrarModalCambiarPass = ref(false)
const usuarioSeleccionado = ref(null)
const nuevaContrasena = ref('')
const mostrarPassword = ref(false)

const seccionActiva = ref('porcentajes')


const modalPorcentajes = ref(false)
const modalTintas = ref(false)
const modalMaquinas = ref(false)
const modalPegados = ref(false)
const modalFijos = ref(false)
const modalUtilidad = ref(false)
const modalEnvio = ref(false)
const modalListaMateriales = ref(false)
const modalListaCajas = ref(false)
const modalListaUsuarios = ref(false)

const formData = ref({ id: null, rango: '', porcentaje: 0, precio: 0 })
const formDataMateriales = ref({
  clave: '',
  tipo: '',
  material: '',
  resistencia: '',
  flauta: '',
  tipo_material: '',
  calibre: '',
  peso: 0,
  precio: 0
})

const formDataCajas = ref({
  id: null,
  nombre: '',
  area_min: 0,
  area_max: 0
})

const formDataUsuarios = ref({
  id: null,
  correo: '',
  rol: '',
  numeroempleado: '',
  nombre: '',
  apellido: ''
})

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



const obtenerPorcentajes = async () => {
  try {
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/porcentajeCantidad')
    porcentajes.value = res.data
  } catch (error) {
    console.error('Error al obtener porcentajes:', error)
  }
}

const obtenerTintas = async () => {
  try {
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/buscarTabla/tinta_cantidad')
    tintas.value = res.data
  } catch (error) {
    console.error('Error al obtener tintas:', error)
  }
}

const obtenerMaquinas = async () => {
  try {
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/buscarTabla/maquina_cantidad')
    maquinas.value = res.data
  } catch (error) {
    console.error('Error al obtener maquinas:', error)
  }
}

const obtenerPegados = async () => {
  try {
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/buscarTabla/pegado_cantidad')
    pegados.value = res.data
  } catch (error) {
    console.error('Error al obtener pegados:', error)
  }
}

const obtenerFijos = async () => {
  try {
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/buscarTabla/fijos_cantidad')
    fijos.value = res.data
  } catch (error) {
    console.error('Error al obtener fijos:', error)
  }
}

const obtenerUtilidad = async () => {
  try {
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/utilidades')
    utilidad.value = res.data
  } catch (error) {
    console.error('Error al obtener utilidad:', error)
  }
}

const obtenerEnvio = async () => {
  try {
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/buscarTabla/envio_cantidad')
    envio.value = res.data
  } catch (error) {
    console.error('Error al obtener envio:', error)
  }
}

const obtenerListaTintas = async () => {
  try {
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/buscarTabla/tintas')
    listaTintas.value = res.data
  } catch (error) {
    console.error('Error al obtener lista de tintas:', error)
  }
}

const obtenerListaMateriales = async () => {
  try {
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/buscarTabla/materiales')
    listaMateriales.value = res.data
  } catch (error) {
    console.error('Error al obtener lista de materiales:', error)
  }
}

const obtenerListaCajas = async () => {
  try {
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/buscarTabla/categoria_cajas')
    listaCajas.value = res.data
  } catch (error) {
    console.error('Error al obtener lista de cajas:', error)
  }
}

const obtenerUsuarios = async () => {
  try {
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/usuarios')
    listaUsuarios.value = res.data
    console.log(res.data)
  } catch (error) {
    console.error('Error al obtener lista de usuarios:', error)
  }
}

const abrirModal = (item) => {

   if (seccionActiva.value === 'lista materiales') {
    formDataMateriales.value = { ...item }
    modalListaMateriales.value = true
    return
  }

  if (seccionActiva.value === 'lista cajas') {
    formDataCajas.value = { ...item }
    modalListaCajas.value = true
    return
  }

  if (seccionActiva.value === 'usuarios') {
    formDataUsuarios.value = { ...item }
    modalListaUsuarios.value = true
    return
  }

  formData.value = { ...item }

  switch (seccionActiva.value) {
    case 'porcentajes': modalPorcentajes.value = true; break
    case 'precios tintas': modalTintas.value = true; break
    case 'precios maquinas': modalMaquinas.value = true; break
    case 'precios pegados': modalPegados.value = true; break
    case 'precios fijos': modalFijos.value = true; break
    case 'precios utilidad': modalUtilidad.value = true; break
    case 'precios envio': modalEnvio.value = true; break


  }
}

const cerrarModal = (tipo) => {
  switch (tipo) {
    case 'porcentajes': modalPorcentajes.value = false; break
    case 'tintas': modalTintas.value = false; break
    case 'maquinas': modalMaquinas.value = false; break
    case 'pegados': modalPegados.value = false; break
    case 'fijos': modalFijos.value = false; break
    case 'utilidad': modalUtilidad.value = false; break
    case 'envio': modalEnvio.value = false; break
    case 'lista materiales': modalListaMateriales.value = false; break
    case 'lista cajas': modalListaCajas.value = false; break
    case 'lista usuarios': modalListaUsuarios.value = false; break
  }
}

const guardarCambiosMateriales = async () => {
  try {
    if (!formDataMateriales.value.clave) {
      mostrarAlerta('danger', 'No se puede guardar sin clave');
      return;
    }


    const body = {
      material: formDataMateriales.value.material || '',
      tipo: formDataMateriales.value.tipo || '',
      flauta: formDataMateriales.value.flauta || '',
      resistencia: formDataMateriales.value.resistencia || '',
      precio: formDataMateriales.value.precio !== ''
        ? Number(formDataMateriales.value.precio)
        : null,
      tipo_material: formDataMateriales.value.tipo_material || '',
      calibre: formDataMateriales.value.calibre !== ''
        ? Number(formDataMateriales.value.calibre)
        : null,
      peso: formDataMateriales.value.peso !== ''
        ? Number(formDataMateriales.value.peso)
        : null
    };

    // Llamada al endpoint PUT
    await axios.put(
      `https://backendgrupoeb.onrender.com/api/materiales/${formDataMateriales.value.clave}`,
      body
    );

    mostrarAlerta('success', 'Material actualizado correctamente');
    cerrarModal('lista materiales');
    await obtenerListaMateriales();
  } catch (error) {
    console.error('Error al guardar material:', error);
    mostrarAlerta('danger', 'Error al actualizar material');
  }
};

const guardarCambiosCajas = async () => {
  try {
    if (!formDataCajas.value.id) {
      mostrarAlerta('danger', 'No se puede guardar sin seleccionar una caja');
      return;
    }

    const body = {
      area_min: parseFloat(formDataCajas.value.area_min) || 0,
      area_max: parseFloat(formDataCajas.value.area_max) || 0
    };

    // Llamada al endpoint PUT para actualizar la caja
    await axios.put(
      `https://backendgrupoeb.onrender.com/api/categoria_cajas/${formDataCajas.value.id}`,
      body
    );

    mostrarAlerta('success', 'Caja actualizada correctamente');
    cerrarModal('lista cajas');
    await obtenerListaCajas(); // refresca la lista
  } catch (error) {
    console.error('Error al guardar caja:', error);
    mostrarAlerta('danger', 'Error al actualizar la caja');
  }
};


const guardarCambiosUsuarios = async () => {
  try {
    if (!formDataUsuarios.value.id) {
      mostrarAlerta('danger', 'No se puede guardar sin ID del usuario');
      return;
    }

    const body = {
      correo: formDataUsuarios.value.correo || '',
      rol: formDataUsuarios.value.rol || '',
      numeroempleado: formDataUsuarios.value.numeroempleado || null,
      nombre: formDataUsuarios.value.nombre || '',
      apellido: formDataUsuarios.value.apellido || ''
    };

    await axios.put(
      `https://backendgrupoeb.onrender.com/api/usuarios/${formDataUsuarios.value.id}`,
      body
    );

    mostrarAlerta('success', 'Usuario actualizado correctamente');
    cerrarModal('lista usuarios');
    await obtenerUsuarios();

  } catch (error) {
    console.error('Error al guardar usuario:', error);
    mostrarAlerta('danger', 'Error al actualizar usuario');
  }
};



const guardarCambios = async () => {
  try {
    let url = ''
    let body = {}

    switch (seccionActiva.value) {
      case 'porcentajes': {
        url = `https://backendgrupoeb.onrender.com/api/porcentajeCantidad/actualizar/${formData.value.id}`
        body = { porcentaje: formData.value.porcentaje }
        break
      }

      default: {

        const tablaMap = {
          'precios tintas': 'tinta_cantidad',
          'precios maquinas': 'maquina_cantidad',
          'precios pegados': 'pegado_cantidad',
          'precios fijos': 'fijos_cantidad',
          'precios utilidad': 'utilidades',
          'precios envio': 'envio_cantidad'
        }

        const tabla = tablaMap[seccionActiva.value]

        if (!tabla) {
          console.error('Sección no válida:', seccionActiva.value)
          return
        }

        url = `https://backendgrupoeb.onrender.com/api/general/actualizar/${tabla}/${formData.value.id}`
        body = { precio: formData.value.precio }
        break
      }
    }


    await axios.put(url, body)


    switch (seccionActiva.value) {
      case 'porcentajes':
        cerrarModal('porcentajes')
        await obtenerPorcentajes()
        break
      case 'precios tintas':
        cerrarModal('tintas')
        await obtenerTintas()
        break
      case 'precios maquinas':
        cerrarModal('maquinas')
        await obtenerMaquinas()
        break
      case 'precios pegados':
        cerrarModal('pegados')
        await obtenerPegados()
        break
      case 'precios fijos':
        cerrarModal('fijos')
        await obtenerFijos()
        break
      case 'precios utilidad':
        cerrarModal('utilidad')
        await obtenerUtilidad()
        break
      case 'precios envio':
        cerrarModal('envio')
        await obtenerEnvio()
        break
      case 'lista tintas':
        cerrarModal('listaTintas')
        await obtenerListaTintas()
        break
      case 'lista materiales':
        cerrarModal('listaMateriales')
        await obtenerListaMateriales()
        break
    }
  } catch (error) {
    console.error('Error al guardar cambios:', error)
  }
}

const borrarTinta = async (id_tinta) => {
  try {
    await axios.delete(`https://backendgrupoeb.onrender.com/api/tintas/borrar/${id_tinta}`)
    mostrarAlerta('success', 'Tinta eliminada correctamente')
    await obtenerListaTintas()
  } catch (error) {
    console.error('Error al eliminar tinta:', error)
    mostrarAlerta('danger', 'Error al eliminar tinta')
  }
}

const borrarMaterial = async (clave) => {
  try {
    // Intentamos eliminar el material
    await axios.delete(`https://backendgrupoeb.onrender.com/api/materiales/borrar/${clave}`);

    // Si todo sale bien, mostramos alerta de éxito
    mostrarAlerta('success', 'Material eliminado correctamente');
    await obtenerListaMateriales();

  } catch (error) {
    console.error('Error al eliminar material:', error);

    // Si el error viene de la base de datos por FK
    if (error.response && error.response.status === 409) {
      mostrarAlerta('danger', error.response.data); // Mostrará mensaje "No se puede eliminar..."
    } else {
      mostrarAlerta('danger', 'Error al eliminar material');
    }
  }
};

const eliminarUsuario = async (id) => {
  try {
    await axios.delete(`https://backendgrupoeb.onrender.com/api/usuarios/${id}`)
    mostrarAlerta('success', 'Usuario eliminado correctamente')
    obtenerUsuarios()
  } catch (error) {
    console.error('Error al eliminar usuario:', error)
    mostrarAlerta('danger', 'Error al eliminar usuario')
  }
}


const cambiarContrasena = (usuario) => {
  usuarioSeleccionado.value = usuario
  mostrarModalCambiarPass.value = true
}

const confirmarCambioContrasena = async () => {
  try {
    await axios.put(
      `https://backendgrupoeb.onrender.com/api/usuarios/${usuarioSeleccionado.value.id}/cambiar-contrasenia`,
      { nuevaContrasenia: nuevaContrasena.value }
    )
    mostrarAlerta('success', 'Contraseña actualizada correctamente')
    cerrarModalCambiarPass()
  } catch (error) {
    console.error('Error al cambiar contraseña:', error)
    mostrarAlerta('danger', 'Error al cambiar la contraseña')
  }
}

const cerrarModalCambiarPass = () => {
  mostrarModalCambiarPass.value = false
  nuevaContrasena.value = ''
  usuarioSeleccionado.value = null
}



const opciones = [
  { id: 'porcentajes', label: 'Merma' },
  { id: 'precios tintas', label: 'Costo tintas' },
  { id: 'precios maquinas', label: 'Costo maquinas' },
  { id: 'precios pegados', label: 'Costo Pegado' },
  { id: 'precios fijos', label: 'Costo fijos' },
  { id: 'precios utilidad', label: 'Utilidad' },
  { id: 'precios envio', label: 'Costo envío' },
  { id: 'lista tintas', label: 'Lista Tintas' },
  { id: 'lista materiales', label: 'Lista Materiales' },
  { id: 'lista cajas', label: 'Lista Cajas' },
  { id: 'usuarios', label: 'Usuarios' }
]

const seleccionar = (id) => {
  seccionActiva.value = id
}

const irAFormularioAgregar = () => {
  router.push('/AgregarUsuario')
}

// === CARGA INICIAL ===
obtenerPorcentajes()
obtenerTintas()
obtenerMaquinas()
obtenerPegados()
obtenerFijos()
obtenerUtilidad()
obtenerEnvio()
obtenerListaTintas()
obtenerListaMateriales()
obtenerListaCajas()
obtenerUsuarios()
</script>


