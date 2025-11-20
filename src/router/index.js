import HomePage from '@/modules/landing/pages/HomePage.vue';
import { createRouter, createWebHistory} from 'vue-router';
import NotFound404 from '@/modules/common/pages/NotFound404.vue';
import { useAuthStore } from '@/stores/authStore'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: '/', name: 'landing', component: () => import('@/modules/landing/layouts/LandingLayout.vue'),
    children: [
    { path: '/', name: 'home', component: HomePage},
    {path: '/cotizaciones', name: 'cotizaciones', component: () => import('@/modules/landing/pages/cotizacionesPage.vue'), meta: { rol: ['Direccion', 'Gerente'] }},
    {path: '/cotizarNuevo', name:'cotizarNuevo', component:() => import ('@/modules/landing/pages/CotizarProductoExistente.vue'), meta: { rol: ['Direccion', 'Gerente'] }},
    {path: '/clientes', name: 'clientes', component: () => import('@/modules/landing/pages/clientesPage.vue'), meta: { rol: ['Direccion', 'Gerente', 'Ventas'] } },
    {path: '/AgregarCliente', name: 'AgregarCliente', component: () => import('@/modules/landing/pages/AgregarClientes.vue'), meta: { rol: ['Direccion', 'Gerente', 'Ventas'] }},
    {path: '/AgregarUsuario', name: 'AgregarUsuario', component: () => import('@/modules/landing/pages/AgregarUsuarios.vue'), meta: { rol: ['Direccion', 'Gerente'] }},
    {path: '/EditarCliente/:id', name: 'EditarCliente', component: () => import('@/modules/landing/pages/EditarClientes.vue'), meta: { rol: ['Direccion', 'Gerente', 'Ventas'] }},
    {path: '/proveedores', name: 'proveedores', component: () => import('@/modules/landing/pages/ProveedoresPage.vue'), meta: { rol: ['Direccion', 'Gerente'] }},
    {path: '/AgregarProveedor', name: 'AgregarProveedor', component: () => import('@/modules/landing/pages/AgregarProveedores.vue'), meta: { rol: ['Direccion', 'Gerente'] }},
    {path: '/EditarProveedor/:id', name: 'EditarProveedor', component: () => import('@/modules/landing/pages/EditarProveedores.vue'), meta: { rol: ['Direccion', 'Gerente'] }},
    {path: '/pedidos/:id', name: 'pedidos', component: () => import('@/modules/landing/pages/pedidosPage.vue'), meta: { rol: ['Direccion', 'Gerente'] }},
    {path: '/listaPedidos', name: 'listaPedidos', component: () => import('@/modules/landing/pages/ListaPedidos.vue'), meta: { rol: ['Direccion', 'Gerente', 'Usuario', 'Ventas'] }},
    {path: '/productos', name: 'productos', component: () => import('@/modules/landing/pages/productosPage.vue'), meta: { rol: ['Direccion', 'Gerente'] }},
    {path: '/catalogo', name: 'catalogo', component: () => import('@/modules/landing/pages/catalogoPage.vue'), meta: { rol: ['Direccion', 'Gerente'] }},
    {path: '/ordenPage',name: 'ordenPage',component: () => import('@/modules/landing/pages/ordenPage.vue'), meta: { rol: ['Direccion', 'Gerente'] } },
    {path: '/editarProductos/:id',name: 'EditarProducto',component: () => import('@/modules/landing/pages/editarproductoPage.vue'), meta: { rol: ['Direccion', 'Gerente'] }},
    {path: '/configuraciones',name: 'configuraciones',component: () => import('@/modules/landing/pages/ConfiguracionesPage.vue'), meta: { rol: ['Direccion'] }},
    {path: '/listaCotizaciones', name: 'listaCotizaciones', component: () => import('@/modules/landing/pages/ListaCotizaciones.vue'), meta: { rol: ['Direccion', 'Gerente', 'Ventas'] }},
    {path: '/ordenCompra/:id', name:'ordenCompra', component:()=> import('@/modules/landing/pages/ordenCompra.vue'), meta: { rol: ['Direccion', 'Gerente'] }},
    {path: '/procesoCompra', name:'procesoCompra', component:()=> import('@/modules/landing/pages/ProcesoCompra.vue'), meta: { rol: ['Direccion', 'Gerente'] }},
    {path: '/pedidosManual', name:'pedidosManual', component:()=> import('@/modules/landing/pages/pedidoManual.vue'), meta: { rol: ['Direccion', 'Gerente', 'Ventas'] }},
    {path: '/pagosPedidos', name:'pagosPedidos', component:()=> import('@/modules/landing/pages/pagosPedidos.vue'),meta: { rol: ['Direccion', 'Administrador', 'Gerente'] }},
    {path: '/facturacion', name: 'facturacion', component: () => import('@/modules/landing/pages/faturacionPage.vue')},
    {path: '/TablaF', name: 'TablaF', component: () => import('@/modules/landing/pages/facturatablaPage.vue'), meta: { rol: ['Direccion', 'Gerente', 'Ventas'] }},
    {path: '/editar-factura/:numero_pedido', name: 'EditarFactura', component: () => import('@/modules/landing/pages/editarfactuPage.vue'), meta: { rol: ['Direccion', 'Gerente', 'Ventas'] }},
    {path: '/TableroGeneral', name: 'TableroGeneral', component: () => import('@/modules/landing/pages/TableroGeneral.vue'), meta: { rol: ['Direccion', 'Gerente', 'Ventas'] }},
  ]

    },

    // Auth
    {
      path: '/auth',
      redirect: { name: 'login' }, //'/login',
      component: () => import('@/auth/layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/auth/pages/LoginPage.vue'),
        },
      ],
    },

      {
      path: '/:pathMatch(.*)*',
      // redirect: '/',
      component: NotFound404,
    },
  ],
});

export default router;




router.beforeEach((to, from, next) => {
  const auth = useAuthStore()


  if (!auth.usuario && localStorage.getItem('token')) {
    auth.cargarUsuario()
  }


  const rutasPublicas = ['facturacion', 'login']


  if (!rutasPublicas.includes(to.name) && !auth.estaAutenticado) {
    return next({ name: 'login' })
  }


  if (to.name === 'login' && auth.estaAutenticado) {
    return next({ name: 'home' })
  }


  if (to.meta?.rol) {
  const rolesPermitidos = Array.isArray(to.meta.rol) ? to.meta.rol : [to.meta.rol]
  if (!rolesPermitidos.includes(auth.rolUsuario)) {
    return next({ name: 'home' })
  }
}

  next()
})

