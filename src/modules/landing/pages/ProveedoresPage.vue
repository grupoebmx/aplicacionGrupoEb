<template>
  <div class="flex items-start justify-center min-h-screen bg-gray-100 p-4">
    <div class="w-full mt-8 mx-20 bg-white p-8 rounded-lg shadow-md">

      <!-- Agregar Proveedor -->
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold font-[Inter]">Proveedores</h2>
        <router-link to="/AgregarProveedor" class="btn btn-active btn-success">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
        <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
        </svg>

        </router-link>

      </div>

      <!-- Tabla de proveedor -->
      <TablaProveedores
        :encabezado="['Núm. de proveedor', 'Nombre', 'Ejecutivo de ventas','Email', 'Categoria' ,'Teléfono','Colonia','Calle','C.p','Estado','Núm. exterior','Núm. interior', 'RFC','Banco','Cuenta bancaria','CLABE','Beneficiario']"
        :claves="['idproveedores','nombre','ejecutivo_ventas','correo','categoria','telefono','colonia','calle','cp','estado','numero_exterior','numero_interior', 'rfc','banco','cuenta_bancaria','clabe','beneficiario']"
        :info="proveedores"
        @eliminar="borrarProveedor"
        @editar="editarProveedor"
      />
    </div>
  </div>
</template>

<script setup>
import TablaProveedores from '@/components/TablaProveedores.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'


const proveedores = ref([])


const obtenerProveedores = async () => {
  const options = {
    method: 'GET',
    url: 'http://localhost:3000/api/buscarTabla/proveedores',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const response = await axios.request(options)
    console.log(response.data)
    proveedores.value = response.data
  } catch (error) {
    console.error('Error al obtener proveedores:', error)
    proveedores.value = []
  }
}


const borrarProveedor = async (idproveedores) => {
  console.log('Eliminando proveedor:', idproveedores)
  const options = {
    method: 'DELETE',
    url: `http://localhost:3000/api/proveedores/borrar/${idproveedores}`,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    await axios.request(options)
    console.log(`Proveedor con id ${idproveedores} eliminado`)
    alert('Proveedor eliminado correctamente')
    obtenerProveedores()
  } catch (error) {
    console.error('Error al eliminar proveedor:', error)
    alert('Error al eliminar proveedor')
  }
}

const router = useRouter()

const editarProveedor = (proveedor) => {
  router.push({ name: 'EditarProveedor', params: { id: proveedor.idproveedores } })
}

obtenerProveedores()

</script>
