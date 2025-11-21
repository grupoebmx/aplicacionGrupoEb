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
  <form @submit.prevent="insertarProducto">

    <div class="min-h-screen w-full p-4 bg-gray-100 flex justify-center items-start">

      <div class="w-full max-w-[1700px] bg-white p-6 rounded shadow mt-8">
        <h2 class="font-bold mb-4 text-center text-lg">Agregar producto</h2>
         <div id="alert-container" class="position-fixed top-0 end-0 p-3" style="z-index: 1055;"></div>
        <!-- Contenedor principal con flex -->
        <div class="flex items-start justify-between gap-4">
          <!-- Columna de inputs -->
            <div class="flex flex-col gap-2 w-full">
            <!-- Primera fila -->
            <div class="table w-full border-separate border-spacing-2">
              <div class="table-row">
                <!-- Campo Empresa -->
                <div class="table-cell p-1 border border-gray-300 rounded">
                  <div class="text-center text-xs font-semibold mb-1">Empresa</div>
                  <select
                    v-model="selectedEmpresa"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full bg-white text-black leading-tight"
                  >
                    <option value="">Seleccione una empresa</option>
                    <option
                      v-for="cliente in clientes"
                      :key="cliente.num_cliente"
                      :value="cliente.num_cliente"
                    >
                      {{ cliente.nombre_empresa }}
                    </option>
                  </select>
                </div>
                <div class="table-cell p-1 border border-gray-300 rounded">
                <div class="text-center text-xs font-semibold mb-1">Impresión</div>
                <!-- Impresión -->
                <input
                type="text"
                placeholder="Impresión"
                class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight"
                :value="impresion"
                readonly
                />
                </div>
                <!-- Descripción -->
                <div class="table-cell p-1 border border-gray-300 rounded">
                  <div class="text-center text-xs font-semibold mb-1">Descripción</div>
                  <input
                    type="text"
                    placeholder="Descripción"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight"
                    v-model="form.descripcion"
                  />
                </div>

                <!-- Tipo de caja -->
                <div class="table-cell p-1 w-40 border border-gray-300 rounded">
                  <div class="text-center text-xs font-semibold mb-1">Tipo de caja</div>
                  <select
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full bg-white leading-tight" v-model="form.tipo"
                  >
                    <option value="">Tipo de caja</option>
                    <option value="Ranurada">Ranurada</option>
                    <option value="Ranurada con suaje">Ranurada con suaje</option>
                    <option value="Ranurada con suaje y división">Ranurada con suaje y división</option>
                    <option value="Ranurada con suaje con división separador">Ranurada con suaje con división separador</option>
                    <option value="División separador">División separador</option>
                    <option value="Separador">Separador</option>
                    <option value="División">División</option>
                  </select>
                </div>

                <!-- Producto -->
                 <div class="table-cell p-1 border w-20 border-gray-300 rounded">
                  <div class="text-center text-xs font-semibold mb-1">Producto</div>
                  <input
                    type="text"
                    placeholder="Producto"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-full leading-tight"
                    v-model="form.producto"
                  />
                </div>




                <!-- Guía -->
                <div class="table-cell p-1 border w-20 border-gray-300 rounded">
                  <div class="text-center text-xs font-semibold mb-1">Guía</div>
                  <input
                    type="text"
                    placeholder="Guía"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-full leading-tight"
                    v-model="form.guia"
                  />
                </div>

               <div class="table-cell p-1 border border-gray-300 rounded w-2/8">
               <div class="text-center text-xs font-semibold mb-1">Medidas internas cm</div>
               <div class="flex justify-between gap-2">
               <input type="number" step="any" placeholder="Ancho" class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 leading-tight" v-model="form.anchoInt"/>
               <input type="number" step="any" placeholder="Largo" class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 leading-tight" v-model="form.largoInt"/>
               <input type="number" step="any" placeholder="Alto"  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 leading-tight" v-model="form.altoInt"/>
               <input type="number" step="any" placeholder="Ceja"  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 leading-tight" v-model="form.ceja"/>
               </div>
               </div>


              </div>
            </div>

            <!-- Segunda fila -->
            <!-- ================== Primera fila: Materiales ================== -->
<div class="table w-full table-fixed border-separate border-spacing-2">
  <div class="table-row">
    <!-- Materiales -->
    <div class="table-cell p-1 border border-gray-300 rounded w-[12%]">
      <div class="text-center text-xs font-semibold mb-1">Materiales</div>
      <select
        v-model="selectedMaterial"
        class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full bg-white text-black leading-tight"
      >
        <option value="">Seleccione la clave</option>
        <option
          v-for="material in materiales"
          :key="material.clave"
          :value="material.clave"
        >
          {{ material.clave }}
        </option>
      </select>
    </div>

    <!-- Tipo -->
    <div class="table-cell p-1 border border-gray-300 rounded w-[11%]">
      <div class="text-center text-xs font-semibold mb-1">Tipo</div>
      <input
        type="text"
        :value="tipo"
        readonly
        placeholder="Tipo"
        class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight"
      />
    </div>

    <!-- Material -->
    <div class="table-cell p-1 border border-gray-300 rounded w-[12%]">
      <div class="text-center text-xs font-semibold mb-1">Material</div>
      <input
        type="text"
        :value="material"
        readonly
        placeholder="Material"
        class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight"
      />
    </div>

    <!-- Resistencia -->
    <div class="table-cell p-1 border border-gray-300 rounded w-[11%]">
      <div class="text-center text-xs font-semibold mb-1">Resistencia</div>
      <input
        type="text"
        :value="resistencia"
        readonly
        placeholder="Resistencia"
        class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight"
      />
    </div>

    <!-- Flauta -->
    <div class="table-cell p-1 border border-gray-300 rounded w-[11%]">
      <div class="text-center text-xs font-semibold mb-1">Flauta</div>
      <input
        type="text"
        :value="flauta"
        readonly
        placeholder="Flauta"
        class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight"
      />
    </div>

    <!-- Tipo material -->
    <div class="table-cell p-1 border border-gray-300 rounded w-[12%]">
      <div class="text-center text-xs font-semibold mb-1">Tipo material</div>
      <input
        type="text"
        :value="tipo_material"
        readonly
        placeholder="Tipo material"
        class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight"
      />
    </div>

    <!-- Calibre -->
    <div class="table-cell p-1 border border-gray-300 rounded w-[11%]">
      <div class="text-center text-xs font-semibold mb-1">Calibre</div>
      <input
        type="text"
        :value="calibre"
        readonly
        placeholder="Calibre"
        class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight"
      />
    </div>

    <!-- Peso -->
    <div class="table-cell p-1 border border-gray-300 rounded w-[11%]">
      <div class="text-center text-xs font-semibold mb-1">Peso</div>
      <input
        type="text"
        :value="peso"
        readonly
        placeholder="Peso"
        class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight"
      />
    </div>
  </div>
</div>

<!-- ================== Segunda fila: Dimensiones y Tintas ================== -->
<div class="table w-full table-fixed border-separate border-spacing-2 mt-2">
  <div class="table-row">
    <!-- Dimensiones Cartón -->
    <div class="table-cell p-1 border border-gray-300 rounded w-[10%]">
      <div class="text-center text-xs font-semibold mb-1">Dimensiones Cartón cm</div>
      <div class="flex justify-between gap-2">
        <input
          type="number"
          v-model="form.anchoCarton"
          placeholder="ancho"
          class="border border-gray-300 rounded-md px-2 h-8 text-xs w-1/2 leading-tight"
        />
        <input
          type="number"
          v-model="form.largoCarton"
          placeholder="largo"
          class="border border-gray-300 rounded-md px-2 h-8 text-xs w-1/2 leading-tight"
        />
      </div>
    </div>

    <!-- Marcas -->
    <div class="table-cell p-1 border border-gray-300 rounded w-[10%]">
      <div class="text-center text-xs font-semibold mb-1">Marcas Ml</div>
      <input
        type="text"
        v-model="form.marcas"
        placeholder="Marcas"
        class="border border-gray-300 rounded-md px-2 h-8 text-sm w-full leading-tight"
      />
    </div>

    <!-- Pegado -->

    <div class="table-cell p-1 border border-gray-300 rounded w-[10%]">
      <div class="text-center text-xs font-semibold mb-1">Pegado</div>
      <input
        list="pegadoOptions"
        v-model="form.pegado"
        placeholder="Selecciona o escribe"
        class="border border-gray-300 rounded-md px-2 h-8 text-sm w-full leading-tight"
      />
      <datalist id="pegadoOptions">
        <option value="Automático 1300"></option>
        <option value="Manual"></option>
        <option value="2 piezas manual"></option>
      </datalist>
    </div>


    <!-- Tintas -->
    <div class="table-cell p-1 border border-gray-300 rounded w-[35%]">
      <div class="text-center text-xs font-semibold mb-1">Tintas</div>
      <div class="flex gap-2">
        <select v-model="tinta1" class="border border-gray-300 rounded-md px-2 h-8 text-sm w-1/5">
          <option value="">Seleccionar tinta</option>
          <option v-for="t in tintas" :key="t.id_tinta" :value="t.id_tinta">
            {{ t.gcmi }} - {{ t.nombre_tinta }}
          </option>
        </select>

        <select v-model="tinta2" class="border border-gray-300 rounded-md px-2 h-8 text-sm w-1/5">
          <option value="">Seleccionar tinta</option>
          <option v-for="t in tintas" :key="t.id_tinta" :value="t.id_tinta">
            {{ t.gcmi }} - {{ t.nombre_tinta }}
          </option>
        </select>

        <select v-model="tinta3" class="border border-gray-300 rounded-md px-2 h-8 text-sm w-1/5">
          <option value="">Seleccionar tinta</option>
          <option v-for="t in tintas" :key="t.id_tinta" :value="t.id_tinta">
            {{ t.gcmi }} - {{ t.nombre_tinta }}
          </option>
        </select>

        <select v-model="tinta4" class="border border-gray-300 rounded-md px-2 h-8 text-sm w-1/5">
          <option value="">Seleccionar tinta</option>
          <option v-for="t in tintas" :key="t.id_tinta" :value="t.id_tinta">
            {{ t.gcmi }} - {{ t.nombre_tinta }}
          </option>
        </select>

        <button type="button" @click="openModal" class="btn btn-active btn-success h-8 px-2 w-1/5">
          +
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Cuarta fila: Campos SAT -->
<div class="table w-full table-fixed border-separate border-spacing-1 mt-1">
  <div class="table-row">

    <!-- Clave del Producto o Servicio -->
    <div class="table-cell p-0.5 border border-gray-300 rounded w-[15%]">
      <div class="text-center text-[10px] font-semibold mb-0.5">Clave Producto/Servicio</div>
      <select
        v-model="form.satClaveProductoServicio"
        class="border border-gray-300 rounded px-1 py-0.5 h-6 text-[10px] w-full bg-white text-black leading-none"
      >
        <option value="">Seleccione producto cartón</option>
        <option value="24112404">24112404 - Caja</option>
        <option value="24112408">24112408 - Cajas antiestática</option>
        <option value="24112414">24112414 - Caja refrigerado</option>
        <option value="24112500">24112500 - Cartón ondulado</option>
        <option value="24112501">24112501 - Cartones ranurados</option>
        <option value="24112502">24112502 - Cajas troquel una pieza</option>
        <option value="24112503">24112503 - Cartones tapas separadas</option>
        <option value="24112504">24112504 - Cajas moldeadas</option>
        <option value="24112505">24112505 - Formas corrugado</option>
        <option value="24113002">24113002 - Lámina cartón sólida</option>
        <option value="24111502">24111502 - Bolsas de papel</option>
      </select>
    </div>

    <!-- Clave de Unidad -->
    <div class="table-cell p-0.5 border border-gray-300 rounded w-[12%]">
      <div class="text-center text-[10px] font-semibold mb-0.5">Clave Unidad</div>
      <select
        v-model="form.satClaveUnidad"
        class="border border-gray-300 rounded px-1 py-0.5 h-6 text-[10px] w-full bg-white text-black leading-none"
      >
        <option value="">Seleccione unidad</option>
        <option value="H87">H87 - Pieza</option>
        <option value="EA">EA - Elemento</option>
        <option value="KGM">KGM - Kilogramo</option>
        <option value="MTR">MTR - Metro</option>
        <option value="XBX">XBX - Caja</option>
        <option value="MTK">MTK - Metro Cuadrado</option>
        <option value="XPK">XPK - Paquete</option>
        <option value="XUN">XUN - Unidad</option>
        <option value="XLT">XLT - Lote</option>
        <option value="PR">PR - Par</option>
        <option value="SET">SET - Conjunto</option>
        <option value="KT">KT - KIT</option>
      </select>
    </div>

    <!-- Empaque -->
                <div class="table-cell p-1 border border-gray-300 rounded w-1/3">
                  <div class="text-center text-xs font-semibold mb-1">Empaque</div>
                  <input
                    type="text"
                    v-model="form.empaque"
                    placeholder="Empaque"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight"
                  />
                </div>

                <!-- Paq X -->
                <div class="table-cell p-1 border border-gray-300 rounded w-1/3">
                  <div class="text-center text-xs font-semibold mb-1">Paq X</div>
                  <input
                    type="number"
                    v-model="form.paqX"
                    placeholder="Paq X"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight"
                  />
                </div>

                <!-- Cantidad -->
                <div class="table-cell p-1 border border-gray-300 rounded w-1/3">
                  <div class="text-center text-xs font-semibold mb-1">Cantidad</div>
                  <input
                    type="number"
                    v-model="form.cantidad"
                    placeholder="Cantidad"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight"
                  />
                </div>
  </div>
</div>


            <!--Aqui termina la segunda fila  -->
             <!-- Modal -->
            <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50">
              <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                <h3 class="text-lg font-semibold mb-4">Nueva tinta</h3>

                <form @submit.prevent="guardarTinta" class="space-y-4">
                  <div>
                    <label for="gcmi" class="block mb-1 text-sm font-medium">GCMI</label>
                    <input
                      id="gcmi"
                      type="text"
                      v-model="gcmi"
                      placeholder="GCMI"
                      class="border border-gray-300 rounded-md px-2 h-7 w-full"
                      required
                    />
                  </div>

                  <div>
                    <label for="nombre_tinta" class="block mb-1 text-sm font-medium">Nombre de la tinta</label>
                    <input
                      id="nombre_tinta"
                      type="text"
                      v-model="nombreTinta"
                      placeholder="Nombre de la tinta"
                      class="border border-gray-300 rounded-md px-2 h-7 w-full"
                      required
                    />
                  </div>

                  <div class="flex justify-end gap-2">
                    <button type="button" @click="closeModal" class="px-4 py-2 rounded border">Cancelar</button>
                    <button type="submit" class="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800">Guardar</button>
                  </div>
                </form>
              </div>
            </div>
            </div>

    <!-- Contenedor de los inputs -->
    <div class="flex flex-col gap-4 w-[350px]">
      <!-- Fecha -->
      <div class="table-cell p-1 border border-gray-300 rounded">
        <label for="fecha" class="block text-sm font-medium text-gray-700">Fecha</label>
        <input type="date" id="fecha" name="fecha" :value="fechaActual"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm">

      </div>


      <!-- Clave -->
      <div class="table-cell p-1 border border-gray-300 rounded">
        <label for="clave" class="block text-sm font-medium text-gray-700">Clave</label>
        <input type="text" id="clave" name="clave" placeholder="Ingresa tu clave" v-model="form.clave"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm">
      </div>

      <!-- Imagen 1 -->
      <div class="w-[200px] h-[200px] border border-gray-300 rounded flex justify-center items-center shadow-md relative mx-auto">
        <label
          class="flex items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-gray-500 overflow-hidden">
          <span v-if="!imagenFinalData" class="text-xs text-gray-500 text-center">Imagen final</span>
          <img v-if="imagenFinalData" :src="imagenFinalData.vistaPrevia" class="w-full h-full object-contain" />
          <input type="file" accept="image/*" @change="cargarImagenFinal" class="hidden" />
        </label>
        <button v-if="imagenFinalData" @click.prevent="eliminarImagenFinal"
          class="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded">X</button>
      </div>
    </div>


        </div>

        <!-- Div de la imagen base -->
        <div class="flex justify-center mt-6">
          <div class="p-2 border border-b-black rounded flex justify-center items-center w-[620px] h-[420px] relative shadow-md">
            <label
              class="flex items-center justify-center w-100 h-90 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-gray-500 overflow-hidden"
            >
              <span v-if="!imagenBaseData" class="text-xs text-gray-500 text-center">Imagen medidas</span>
              <img v-if="imagenBaseData" :src="imagenBaseData.vistaPrevia" class="w-full h-full object-contain" accept="image/*" />
              <input type="file" accept="image/*" @change="cargarImagenBase" class="hidden" />
            </label>
            <button
              v-if="imagenBaseData"
              @click.prevent="eliminarImagenBase"
              class="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
            >
              X
            </button>
          </div>
        </div>

        <hr class="my-4 border-t border-gray-300" />

        <!-- Contenedor principal de la fila -->
        <div class="flex mt-6 w-full justify-between">

        <!-- Bloque izquierdo: Imagen 3 + Número de grabado -->
            <div class="flex flex-col gap-2 items-start">
    <!-- Número de grabado -->
    <div class="table-cell p-2 border border-gray-300 rounded w-[300px]">
      <div class="text-center text-xs font-semibold mb-1">Número de grabado</div>
      <input
        type="text"
        placeholder="Número de grabado"
        class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-full text-center"
        v-model="form.grabado"
      />
    </div>

    <!-- Imagen 3 -->
    <div
      class="p-2 border border-gray-300 rounded flex justify-center items-center w-[620px] h-[420px] relative shadow-md"
    >
      <label
        class="flex items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-gray-500 overflow-hidden"
      >
        <span v-if="!imagenGrabadoData" class="text-xs text-gray-500 text-center">Master gráfico</span>
        <img v-if="imagenGrabadoData" :src="imagenGrabadoData.vistaPrevia" class="w-full h-full object-contain" />
        <input type="file" accept="image/*" @change="cargarImagenGrabado" class="hidden" />
      </label>
      <button
        v-if="imagenGrabadoData"
        @click.prevent="eliminarImagenGrabado"
        class="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
      >
        X
      </button>
    </div>
            </div>

        <!-- Bloque derecho: Imagen 4 + Número de Suaje + Medidas + Separadores -->
            <div class="flex flex-col gap-2 items-center">
    <!-- Campos arriba de la imagen 4 -->
    <div class="flex gap-4">
      <!-- Número de Suaje -->
      <div class="table-cell p-2 border border-gray-300 rounded w-[200px]">
        <div class="text-center text-xs font-semibold mb-1">Número de Suaje</div>
        <input
          type="text"
          placeholder="Número de Suaje"
          class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-full text-center"
          v-model="form.suajesNumsuaje"
        />
      </div>

      <!-- Medidas de suaje -->
      <div class="table-cell p-2 border border-gray-300 rounded w-[200px]">
        <div class="text-center text-xs font-semibold mb-1">Medidas Suaje</div>
        <div class="flex gap-2">
          <input
            type="text"
            placeholder="Ancho"
            class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/2 text-center"
            v-model="form.ancho_suaje"
          />
          <input
            type="text"
            placeholder="Largo"
            class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/2 text-center"
            v-model="form.largo_suaje"
          />
        </div>
      </div>

      <!-- Separadores -->
      <div class="table-cell p-2 border border-gray-300 rounded w-[200px]">
        <div class="text-center text-xs font-semibold mb-1">Separadores</div>
        <div class="flex gap-2">
          <input
            type="text"
            placeholder="Corto"
            class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/2 text-center"
            v-model="form.corto_sep"
          />
          <input
            type="text"
            placeholder="Largo"
            class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/2 text-center"
            v-model="form.largo_sep"
          />
        </div>
      </div>
    </div>

    <!-- Imagen 4 -->
    <div
      class="p-2 border border-gray-300 rounded flex justify-center items-center w-[620px] h-[420px] relative shadow-md"
    >
      <label
        class="flex items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-gray-500 overflow-hidden"
      >
        <span v-if="!imagenSuajeData" class="text-xs text-gray-500 text-center">Imagen suaje</span>
        <img v-if="imagenSuajeData" :src="imagenSuajeData.vistaPrevia" class="w-full h-full object-contain" />
        <input type="file" accept="image/*" @change="cargarImagenSuaje" class="hidden" />
      </label>
      <button
        v-if="imagenSuajeData"
        @click.prevent="eliminarImagenSuaje"
        class="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
      >
        X
      </button>
    </div>
            </div>

        </div>

        <!-- Botón de envío -->
        <div class="mt-6 text-right">
            <button
          class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          type="submit"
        >
          Insertar
            </button>
        </div>
      </div>

    </div>

  </form>
</template>

<script setup>
import { ref, onMounted, computed, reactive} from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const fechaActual = new Date().toISOString().substring(0, 10)


const form = reactive({

  grabado: '',
  num_cliente: '',
  clave_material: '',
  satClaveProductoServicio: '',
  satClaveUnidad: '',
  suajesNumsuaje: '',
  clave: '',
  fecha: fechaActual,
  descripcion: '',
  tipo: '',
  producto: '',
  guia: '',
  anchoInt: '',
  largoInt: '',
  altoInt: '',
  ceja: '3.5',
  anchoCarton: '',
  largoCarton: '',
  marcas: '',
  pegado: '',
  ancho_suaje: '',
  largo_suaje: '',
  corto_sep: '',
  largo_sep: '',
  empaque: '',
  paqX: '',
  cantidad: ''

});

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

async function insertarProducto() {

  const formData = new FormData();

  // Campos de texto
  Object.keys(form).forEach(key => {
    formData.append(key, form[key] || '');
  });

  // Cliente y material seleccionados
  formData.set('num_cliente', selectedEmpresa.value || '');
  formData.set('clave_material', selectedMaterial.value || '');

  // Asegurar que la clave de unidad SAT se envíe tal cual se muestra en el select
  // (por ejemplo: "H87 - Pieza" o "EA - Elemento")
  formData.set('satClaveUnidad', form.satClaveUnidad || '');

  // Tintas
  const tintasArray = [tinta1.value, tinta2.value, tinta3.value, tinta4.value].filter(Boolean);
  formData.append('tintas', JSON.stringify(tintasArray));

  // Imágenes con nombres que reconoce el backend
if (imagenFinalData.value?.archivo) formData.append('imagenFinal', imagenFinalData.value.archivo);
if (imagenBaseData.value?.archivo) formData.append('imagen', imagenBaseData.value.archivo);
if (imagenGrabadoData.value?.archivo) formData.append('imagenGrabado', imagenGrabadoData.value.archivo);
if (imagenSuajeData.value?.archivo) formData.append('imagenSuaje', imagenSuajeData.value.archivo);


for (let [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`${key}: archivo -> ${value.name} (${value.type}, ${value.size} bytes)`);
    } else {
      console.log(`${key}:`, value);
    }
  }

  try {
    const response = await axios.post(
      'https://backendgrupoeb.onrender.com/api/productos/insertar',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    if (response.data.message) {
      mostrarAlerta('success', 'Producto insertado correctamente');
      router.push('/catalogo');
    }
  } catch (error) {
    console.error('Error al insertar producto:', error);
    mostrarAlerta('danger', 'Error al insertar producto');
  }
}

const imagenFinalData = ref(null)
const imagenBaseData = ref(null)
const imagenGrabadoData = ref(null)
const imagenSuajeData = ref(null)


const isModalOpen = ref(false)
const gcmi = ref('')
const nombreTinta = ref('')

const clientes = ref([])
const materiales = ref([])
const tintas = ref([])
const tinta1 = ref('')
const tinta2 = ref('')
const tinta3 = ref('')
const tinta4 = ref('')
const selectedEmpresa = ref('')
const selectedMaterial = ref('')

const openModal = () => { isModalOpen.value = true }
const closeModal = () => {
  isModalOpen.value = false
  gcmi.value = ''
  nombreTinta.value = ''
}

const obtenerTintas = async () => {
  try {
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/tintas')
    tintas.value = res.data
  } catch (error) {
    console.error('Error al obtener tintas:', error)
  }
}

const guardarTinta = async () => {
  try {
    const res = await axios.post('https://backendgrupoeb.onrender.com/api/tintas/insertar', {
      gcmi: gcmi.value,
      nombre_tinta: nombreTinta.value
    })

    // Agregar la tinta al listado
    tintas.value.push(res.data[0]) // si tu endpoint devuelve un array de filas

    // Limpiar los inputs
    gcmi.value = ''
    nombreTinta.value = ''

    closeModal()
    mostrarAlerta('success', 'Tinta guardada correctamente')
  } catch (err) {
    console.error(err)
    mostrarAlerta('danger', 'Error al guardar la tinta')
  }
}

// Función para traer clientes
const obtenerClientes = async () => {
  try {
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/clientes')
    clientes.value = res.data
  } catch (error) {
    console.error('Error al obtener clientes:', error)
  }
}



const obtenerMateriales = async () => {
  try {
    const res = await axios.get('https://backendgrupoeb.onrender.com/api/materiales')
    materiales.value = res.data
    console.log('Materiales cargados:', materiales.value)
  } catch (error) {
    console.error('Error al obtener materiales:', error)
  }
}

const tipo = computed(() => {
  const material = materiales.value.find(c => c.clave === selectedMaterial.value)
  return material ? material.tipo : ''
})

const material = computed(() => {
  const material = materiales.value.find(c => c.clave === selectedMaterial.value)
  return material ? material.material : ''
})

const resistencia = computed(() => {
  const material = materiales.value.find(c => c.clave === selectedMaterial.value)
  return material ? material.resistencia : ''
})

const flauta = computed(() => {
  const material = materiales.value.find(c => c.clave === selectedMaterial.value)
  return material ? material.flauta : ''
})
const calibre = computed(() => {
  const material = materiales.value.find(c => c.clave === selectedMaterial.value)
  return material ? material.calibre : ''
})
const peso = computed(() => {
  const material = materiales.value.find(c => c.clave === selectedMaterial.value)
  return material ? material.peso : ''
})
const tipo_material = computed(() => {
  const material = materiales.value.find(c => c.clave === selectedMaterial.value)
  return material ? material.tipo_material : ''
})


const impresion = computed(() => {
  const cliente = clientes.value.find(c => c.num_cliente === selectedEmpresa.value)
  return cliente ? cliente.impresion : ''
})




onMounted(() => {
  obtenerClientes()
  obtenerTintas()
  obtenerMateriales()
})





function cargarImagenFinal(event) {
  const archivo = event.target.files[0]
  if (!archivo) return

  const lector = new FileReader()
  lector.onload = () => {
    imagenFinalData.value = {
      vistaPrevia: lector.result,
      archivo
    }
  }
  lector.readAsDataURL(archivo)
}

function cargarImagenBase(event) {
  const archivo = event.target.files[0]
  if (!archivo) return

  const lector = new FileReader()
  lector.onload = () => {
    imagenBaseData.value = {
      vistaPrevia: lector.result,
      archivo
    }
  }
  lector.readAsDataURL(archivo)
}

function cargarImagenGrabado(event) {
  const archivo = event.target.files[0]
  if (!archivo) return

  const lector = new FileReader()
  lector.onload = () => {
    imagenGrabadoData.value = {
      vistaPrevia: lector.result,
      archivo
    }
  }
  lector.readAsDataURL(archivo)
}

function cargarImagenSuaje(event) {
  const archivo = event.target.files[0]
  if (!archivo) return

  const lector = new FileReader()
  lector.onload = () => {
    imagenSuajeData.value = {
      vistaPrevia: lector.result,
      archivo
    }
  }
  lector.readAsDataURL(archivo)
}


function eliminarImagenFinal() {
  imagenFinalData.value = null
}
function eliminarImagenBase() {
  imagenBaseData.value = null
}
function eliminarImagenGrabado() {
  imagenGrabadoData.value = null
}
function eliminarImagenSuaje() {
  imagenSuajeData.value = null
}


</script>
