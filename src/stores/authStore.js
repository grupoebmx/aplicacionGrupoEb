import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    usuario: null,
    token: null,
    cargando: false,
    error: null
  }),

  getters: {
    estaAutenticado: (state) => !!state.token,
    rolUsuario: (state) => state.usuario?.rol || null
  },

  actions: {
    async login(correo, contrasenia) {
      this.cargando = true
      this.error = null

      try {
        const { data } = await axios.post('http://localhost:3000/api/auth/login', {
          correo,
          contrasenia
        })


        this.usuario = data.usuario
        this.token = data.token


        localStorage.setItem('token', data.token)
        localStorage.setItem('usuario', JSON.stringify(data.usuario))


        router.push({ name: 'home' })

      } catch (error) {
        console.error('Error al iniciar sesión:', error)
        this.error = error.response?.data?.message || 'Error al iniciar sesión'
      } finally {
        this.cargando = false
      }
    },


    cargarUsuario() {
      const token = localStorage.getItem('token')
      const usuario = localStorage.getItem('usuario')

      if (token && usuario) {
        this.token = token
        this.usuario = JSON.parse(usuario)
      } else {
        this.logout() // limpia si algo está mal
      }
    },


    logout() {
      this.usuario = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
      router.push({ name: 'login' })
    }
  }
})
