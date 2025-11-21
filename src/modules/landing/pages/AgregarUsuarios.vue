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
    <form
      class="w-full max-w-2xl mt-8 mx-auto bg-white p-8 rounded-lg shadow-md"
      @submit.prevent="insertarUsuario"
    >
      <!-- Título -->
      <div class="flex justify-center w-full mb-6">
        <h1 class="text-3xl font-bold text-gray-800 text-center font-[Inter]">
          Agregar usuario
        </h1>
         <div id="alert-container" class="position-fixed top-0 end-0 p-3" style="z-index: 1055;"></div>
      </div>

      <!-- Alertas -->
      <div id="alert-container" class="mb-4"></div>

      <!-- Campos del formulario -->
      <div class="space-y-6">
        <!-- Información de cuenta -->
        <div class="border-b border-gray-200 pb-4">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Información de la cuenta</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
                Correo electrónico *
              </label>
              <input
                v-model="form.correo"
                type="email"
                maxlength="50"
                required
                class="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
                placeholder="ejemplo@correo.com"
              />
            </div>

            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
                Contraseña *
              </label>
              <div class="relative">
                <input
                  v-model="form.contrasenia"
                  :type="mostrarContrasenia ? 'text' : 'password'"
                  required
                  class="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-300 rounded py-3 px-4 pr-10 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  @click="mostrarContrasenia = !mostrarContrasenia"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
                >
                  <svg
                    v-if="mostrarContrasenia"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-5 h-5"
                  >
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-5 h-5"
                  >
                    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                  </svg>
                </button>
              </div>
              <p class="text-xs text-gray-500 mt-1">
                {{ mostrarContrasenia ? 'Ocultar contraseña' : 'Mostrar contraseña' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Información del rol -->
        <div class="border-b border-gray-200 pb-4">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Rol y acceso</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
                Rol
              </label>
              <select
                v-model="form.rol"
                class="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
              >
                <option value="" disabled selected>Selecciona un rol</option>

                <option value="Direccion">Dirección</option>
                <option value="Gerente">Gerente</option>
                <option value="Administrador">Administrador</option>
                <option value="Ventas">Ventas</option>
                <option value="Usuario">Usuario</option>
                <option value="Recepcion">Recepción</option>
                <option value="Calidad">Calidad</option>
                <option value="Operador">Operador</option>
                <option value="Planeacion">Planeación</option>
                <option value="Chofer">Chofer</option>
                <option value="Supervisor">Supervisor</option>
              </select>
            </div>

            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
                Número de empleado
              </label>
              <input
                v-model="form.numeroEmpleado"
                type="text"
                class="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
                placeholder="Opcional"
              />
            </div>
          </div>
        </div>

        <!-- Información personal -->
        <div>
          <h2 class="text-lg font-medium text-gray-900 mb-4">Información personal</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
                Nombre *
              </label>
              <input
                v-model="form.nombre"
                type="text"
                required
                class="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
                placeholder="Ingresa el nombre"
              />
            </div>

            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2 font-[Inter]">
                Apellidos *
              </label>
              <input
                v-model="form.apellido"
                type="text"
                required
                class="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 font-[Inter]"
                placeholder="Ingresa los apellidos"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="mt-8 flex items-center justify-between">
        <button
          type="button"
          @click="cancelar"
          class="text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Agregar Usuario
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const mostrarContrasenia = ref(false)

const form = reactive({
  correo: '',
  contrasenia: '',
  rol: 'usuario',
  numeroEmpleado: '',
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

const validarFormulario = () => {
  if (!form.correo || !form.contrasenia || !form.nombre || !form.apellido) {
    mostrarAlerta('warning', 'Por favor, completa todos los campos obligatorios (*)');
    return false;
  }

  if (!/^\S+@\S+\.\S+$/.test(form.correo)) {
    mostrarAlerta('warning', 'Por favor, ingresa un correo electrónico válido');
    return false;
  }

  if (form.contrasenia.length < 6) {
    mostrarAlerta('warning', 'La contraseña debe tener al menos 6 caracteres');
    return false;
  }

  return true;
}

const insertarUsuario = async () => {
  if (!validarFormulario()) {
    return;
  }

  try {
    const response = await axios.post('https://backendgrupoeb.onrender.com/api/usuarios/insertar', form)
    console.log(response.data)
    Object.keys(form).forEach(key => {
      if (key === 'rol') {
        form[key] = 'usuario'
      } else {
        form[key] = ''
      }
    })
    mostrarAlerta('success', 'Usuario agregado correctamente')
    setTimeout(() => {
      router.push('/Configuraciones')
    }, 1500)
  } catch (error) {
    console.error('Error al agregar usuario', error)
    if (error.response && error.response.data && error.response.data.message) {
      mostrarAlerta('danger', error.response.data.message)
    } else {
      mostrarAlerta('danger', 'Error al agregar usuario')
    }
  }
}

const cancelar = () => {
  router.push('/Configuraciones')
}
</script>
