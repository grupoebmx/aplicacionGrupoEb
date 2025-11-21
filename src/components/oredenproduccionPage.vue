<template>
  <form>
    <div class="min-h-screen w-full p-2 md:p-4 bg-gray-100 flex justify-center items-start">
      <div class="w-full max-w-[1700px] bg-white p-4 md:p-6 rounded shadow mt-4 md:mt-8">
        <h2 class="font-bold mb-4 text-center text-base md:text-lg">Orden de producción</h2>
        <fieldset class="border border-gray-300 rounded p-3 md:p-4 mb-4">
          <legend class="text-xs font-semibold px-2">Detalles</legend>

          <!-- MOBILE VIEW -->
          <div class="space-y-4 md:hidden">
            <div
              v-for="item in productos"
              :key="'mobile-' + item.id"
              class="bg-white p-3 rounded border space-y-3"
            >
              <div>
                <label class="text-xs font-semibold block mb-1">Producto</label>
                <input
                  type="text"
                  readonly
                  :value="item.nombre"
                  class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full bg-gray-50"
                />
              </div>

              <div>
                <label class="text-xs font-semibold block mb-1">Medidas Internas</label>
                <div class="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    :value="item.largo_carton"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-2 text-xs bg-gray-50"
                    placeholder="Largo"
                  />
                  <input
                    type="number"
                    :value="item.ancho_carton"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-2 text-xs bg-gray-50"
                    placeholder="Ancho"
                  />
                  <input
                    type="number"
                    :value="item.alto_int"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-2 text-xs bg-gray-50"
                    placeholder="Alto"
                  />
                  <input
                    type="number"
                    :value="item.ceja"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-2 text-xs bg-gray-50"
                    placeholder="Ceja"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-xs font-semibold block mb-1">Guía</label>
                  <input
                    type="text"
                    :value="item.guia"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full bg-gray-50"
                  />
                </div>
                <div>
                  <label class="text-xs font-semibold block mb-1">Marcas</label>
                  <input
                    type="text"
                    readonly
                    :value="item.marcas"
                    class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label class="text-xs font-semibold block mb-1">Tipo</label>
                <input
                  type="text"
                  :value="item.tipo"
                  readonly
                  class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full bg-gray-50"
                />
              </div>

              <div>
                <label class="text-xs font-semibold block mb-1">Medidas de Cartón</label>
                <div class="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    :value="item.ancho_carton"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-2 text-xs bg-gray-50"
                    placeholder="Ancho"
                  />
                  <input
                    type="number"
                    :value="item.largo_carton"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-2 text-xs bg-gray-50"
                    placeholder="Largo"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-xs font-semibold block mb-1">Material</label>
                  <div class="space-y-2">
                    <input
                      type="text"
                      readonly
                      :value="item.material"
                      class="border border-gray-300 rounded-md px-2 py-2 text-xs w-full bg-gray-50"
                      placeholder="Material"
                    />
                  </div>
                </div>
                <div>
                  <label class="text-xs font-semibold block mb-1">Flauta / ECT</label>
                  <div class="space-y-2">
                    <input
                      type="text"
                      readonly
                      :value="item.flauta"
                      class="border border-gray-300 rounded-md px-2 py-2 text-xs w-full bg-gray-50"
                      placeholder="Flauta"
                    />
                    <input
                      type="text"
                      readonly
                      :value="item.resistencia"
                      class="border border-gray-300 rounded-md px-2 py-2 text-xs w-full bg-gray-50"
                      placeholder="ECT"
                    />
                  </div>
                </div>
              </div>

              <!-- 🔥 IMÁGENES (MOBILE) CON MANEJO DE ERRORES -->
              <div class="space-y-3">
                <!-- Imagen Final con manejo de errores -->
                <div v-if="imagenes.imagen_final">
                  <label class="text-xs font-semibold block mb-1">Imagen Final</label>
                  <div
                    class="border border-gray-300 rounded-md p-2 cursor-pointer hover:bg-gray-50 transition-colors"
                    @click="abrirLightbox(0)"
                  >
                    <img
                      :src="imagenes.imagen_final"
                      class="w-full rounded border"
                      alt="Imagen Final"
                      @error="(e) => handleImageError(e, 'imagen_final')"
                    />
                    <span class="text-xs text-gray-600 mt-1 block text-center"
                      >Click para ampliar</span
                    >
                  </div>
                </div>
                <div v-else class="text-center py-2">
                  <span class="text-xs text-gray-500">Imagen Final no disponible</span>
                </div>

                <!-- Imagen con manejo de errores -->
                <div v-if="imagenes.imagen">
                  <label class="text-xs font-semibold block mb-1">Imagen</label>
                  <div
                    class="border border-gray-300 rounded-md p-2 cursor-pointer hover:bg-gray-50 transition-colors"
                    @click="abrirLightbox(1)"
                  >
                    <img
                      :src="imagenes.imagen"
                      class="w-full rounded border"
                      alt="Imagen"
                      @error="(e) => handleImageError(e, 'imagen')"
                    />
                    <span class="text-xs text-gray-600 mt-1 block text-center"
                      >Click para ampliar</span
                    >
                  </div>
                </div>
                <div v-else class="text-center py-2">
                  <span class="text-xs text-gray-500">Imagen no disponible</span>
                </div>

                <!-- Imagen Suaje con manejo de errores -->
                <div v-if="imagenes.imagen_suaje">
                  <label class="text-xs font-semibold block mb-1">Imagen Suaje</label>
                  <div
                    class="border border-gray-300 rounded-md p-2 cursor-pointer hover:bg-gray-50 transition-colors"
                    @click="abrirLightbox(2)"
                  >
                    <img
                      :src="imagenes.imagen_suaje"
                      class="w-full rounded border"
                      alt="Imagen Suaje"
                      @error="(e) => handleImageError(e, 'imagen_suaje')"
                    />
                    <span class="text-xs text-gray-600 mt-1 block text-center"
                      >Click para ampliar</span
                    >
                  </div>
                </div>
                <div v-else class="text-center py-2">
                  <span class="text-xs text-gray-500">Imagen Suaje no disponible</span>
                </div>
              </div>
            </div>
          </div>

          <!-- DESKTOP VIEW -->
          <div class="hidden md:table w-full border-separate border-spacing-2 table-fixed">
            <!-- Primer renglón -->
            <div class="table-row" v-for="item in productos" :key="'r1-' + item.id">
              <div class="table-cell p-1 w-[96px] border-gray-300 rounded"></div>

              <!-- Producto -->
              <div class="table-cell p-1 border w-[120px] border-gray-300 rounded">
                <div class="text-center text-xs font-semibold mb-1">Producto</div>
                <input
                  type="text"
                  readonly
                  :value="item.nombre"
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                />
              </div>

              <!-- Medidas Internas -->
              <div class="table-cell p-1 border w-[240px] border-gray-300 rounded">
                <div class="text-center text-xs font-semibold mb-1">Medidas Internas</div>
                <div class="flex justify-between gap-2">
                  <input
                    type="number"
                    :value="item.largo_carton"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 bg-gray-50"
                    placeholder="Largo"
                  />
                  <input
                    type="number"
                    :value="item.ancho_carton"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 bg-gray-50"
                    placeholder="Ancho"
                  />
                  <input
                    type="number"
                    :value="item.alto_int"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 bg-gray-50"
                    placeholder="Alto"
                  />
                  <input
                    type="number"
                    :value="item.ceja"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 bg-gray-50"
                    placeholder="Ceja"
                  />
                </div>
              </div>

              <!-- Guía -->
              <div class="table-cell p-1 border w-[120px] border-gray-300 rounded">
                <div class="text-center text-xs font-semibold mb-1">Guía</div>
                <input
                  type="text"
                  :value="item.guia"
                  readonly
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                />
              </div>

              <!-- Marcas -->
              <div class="table-cell p-1 border w-[120px] border-gray-300 rounded">
                <div class="text-center text-xs font-semibold mb-1">Marcas</div>
                <input
                  type="text"
                  readonly
                  :value="item.marcas"
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                />
              </div>

              <div class="table-cell p-1 w-[96px] border-gray-300 rounded"></div>
            </div>

            <!-- Segundo renglón -->
            <div class="table-row" v-for="item in productos" :key="'r2-' + item.id">
              <div class="table-cell p-1 w-[96px] border-gray-300 rounded"></div>

              <!-- Tipo -->
              <div class="table-cell p-1 border w-[120px] border-gray-300 rounded">
                <div class="text-center text-xs font-semibold mb-1">Tipo</div>
                <input
                  type="text"
                  :value="item.tipo"
                  readonly
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                />
              </div>

              <!-- Medidas de Cartón -->
              <div class="table-cell p-1 border w-[240px] border-gray-300 rounded">
                <div class="text-center text-xs font-semibold mb-1">Medidas de Cartón</div>
                <div class="flex justify-between gap-2">
                  <input
                    type="number"
                    :value="item.ancho_carton"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/2 bg-gray-50"
                    placeholder="Ancho"
                  />
                  <input
                    type="number"
                    :value="item.largo_carton"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/2 bg-gray-50"
                    placeholder="Largo"
                  />
                </div>
              </div>

              <!-- Material -->
              <div class="table-cell p-1 border w-[240px] border-gray-300 rounded">
                <div class="text-center text-xs font-semibold mb-1">Material</div>
                <div class="flex justify-between gap-2">
                  <input
                    type="text"
                    readonly
                    :value="item.material"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-full bg-gray-50"
                    placeholder="Material"
                  />
                </div>
              </div>

              <!-- Flauta / ECT -->
              <div class="table-cell p-1 border w-[240px] border-gray-300 rounded">
                <div class="text-center text-xs font-semibold mb-1">Flauta / ECT</div>
                <div class="flex justify-between gap-2">
                  <input
                    type="text"
                    readonly
                    :value="item.flauta"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/2 bg-gray-50"
                    placeholder="Flauta"
                  />
                  <input
                    type="text"
                    readonly
                    :value="item.resistencia"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/2 bg-gray-50"
                    placeholder="ECT"
                  />
                </div>
              </div>

              <div class="table-cell p-1 w-[96px] border-gray-300 rounded"></div>
            </div>

            <!-- 🔥 TERCER RENGLÓN - SOLO PARA IMÁGENES CON MANEJO DE ERRORES -->
            <div class="table-row" v-for="item in productos" :key="'r3-' + item.id">
              <div class="table-cell p-1 w-[96px] border-gray-300 rounded"></div>

              <!-- Celda para título de imágenes -->
              <div class="table-cell p-1 border w-[120px] border-gray-300 rounded">
                <div class="text-center text-xs font-semibold mb-1">Imágenes</div>
              </div>

              <!-- IMÁGENES EN UNA CELDA GRANDE QUE OCUPE EL RESTO DEL ANCHO -->
              <div class="table-cell p-1 border border-gray-300 rounded" colspan="3">
                <div class="flex justify-center gap-6 py-2">
                  <!-- Imagen Final con manejo de errores -->
                  <div class="text-center">
                    <div
                      class="cursor-pointer hover:bg-gray-50 transition-colors p-2 rounded border"
                      @click="abrirLightbox(0)"
                    >
                      <img
                        v-if="imagenes.imagen_final"
                        :src="imagenes.imagen_final"
                        class="w-32 h-24 object-contain rounded mx-auto"
                        alt="Imagen Final"
                        @error="(e) => handleImageError(e, 'imagen_final')"
                      />
                      <div
                        v-else
                        class="w-32 h-24 flex items-center justify-center bg-gray-100 rounded"
                      >
                        <span class="text-xs text-gray-500">No disponible</span>
                      </div>
                      <span class="text-xs text-gray-600 mt-1 block">Imagen Final</span>
                    </div>
                  </div>

                  <!-- Imagen con manejo de errores -->
                  <div class="text-center">
                    <div
                      class="cursor-pointer hover:bg-gray-50 transition-colors p-2 rounded border"
                      @click="abrirLightbox(1)"
                    >
                      <img
                        v-if="imagenes.imagen"
                        :src="imagenes.imagen"
                        class="w-32 h-24 object-contain rounded mx-auto"
                        alt="Imagen"
                        @error="(e) => handleImageError(e, 'imagen')"
                      />
                      <div
                        v-else
                        class="w-32 h-24 flex items-center justify-center bg-gray-100 rounded"
                      >
                        <span class="text-xs text-gray-500">No disponible</span>
                      </div>
                      <span class="text-xs text-gray-600 mt-1 block">Imagen</span>
                    </div>
                  </div>

                  <!-- Imagen Suaje con manejo de errores -->
                  <div class="text-center">
                    <div
                      class="cursor-pointer hover:bg-gray-50 transition-colors p-2 rounded border"
                      @click="abrirLightbox(2)"
                    >
                      <img
                        v-if="imagenes.imagen_suaje"
                        :src="imagenes.imagen_suaje"
                        class="w-32 h-24 object-contain rounded mx-auto"
                        alt="Imagen Suaje"
                        @error="(e) => handleImageError(e, 'imagen_suaje')"
                      />
                      <div
                        v-else
                        class="w-32 h-24 flex items-center justify-center bg-gray-100 rounded"
                      >
                        <span class="text-xs text-gray-500">No disponible</span>
                      </div>
                      <span class="text-xs text-gray-600 mt-1 block">Imagen Suaje</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="table-cell p-1 w-[96px] border-gray-300 rounded"></div>
            </div>
          </div>
        </fieldset>

        <!-- Lightbox Component (fuera del fieldset) -->
        <vue-easy-lightbox
          :visible="lightboxVisible"
          :imgs="lightboxImages"
          :index="lightboxIndex"
          @hide="lightboxVisible = false"
        />
        <!--====================================================================================================================================== -->
        <fieldset
          class="border border-gray-300 rounded p-3 md:p-4 mb-4"
          v-for="item in productos"
          :key="item.id"
        >
          <legend class="text-xs font-semibold px-2">Recepción - {{ item.nombre }}</legend>

          <div class="space-y-4 md:hidden">
            <!-- Mobile View -->
            <div class="bg-white p-3 rounded border space-y-3">
              <div>
                <label class="text-xs font-semibold block mb-1">Pedido</label>
                <input
                  type="number"
                  placeholder=""
                  :value="item.piezas"
                  class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full bg-gray-50"
                  readonly
                />
              </div>

              <!-- En la vista móvil -->
              <div>
                <label class="text-xs font-semibold block mb-1">Producción</label>
                <input
                  type="number"
                  placeholder=""
                  :value="item.cantidad"
                  readonly
                  class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full bg-gray-50"
                />
              </div>

              <div>
                <label class="text-xs font-semibold block mb-1">Recibidas</label>
                <input
                  type="number"
                  v-model.number="cantidadRecepcion"
                  :readonly="recepcionGuardada"
                  class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full bg-gray-50"
                  @input="activarVerificacionModal"
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-xs font-semibold block mb-2">Medida del cartón</label>
                  <div class="flex gap-4">
                    <label class="flex items-center gap-1">
                      <input
                        type="radio"
                        name="medida"
                        value="si"
                        class="w-4 h-4"
                        v-model="datosRecepcion.medidaCarton"
                        :disabled="recepcionGuardada"
                        @change="activarVerificacionModal"
                      />
                      <span class="text-sm">Sí</span>
                    </label>
                    <label class="flex items-center gap-1">
                      <input
                        type="radio"
                        name="medida"
                        value="no"
                        class="w-4 h-4"
                        v-model="datosRecepcion.medidaCarton"
                        :disabled="recepcionGuardada"
                        @change="activarVerificacionModal"
                      />
                      <span class="text-sm">No</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="text-xs font-semibold block mb-2">Resistencia</label>
                  <div class="flex gap-4">
                    <label class="flex items-center gap-1">
                      <input
                        type="radio"
                        name="resistencia"
                        value="si"
                        class="w-4 h-4"
                        v-model="datosRecepcion.resistencia"
                        :disabled="recepcionGuardada"
                        @change="activarVerificacionModal"
                      />
                      <span class="text-sm">Sí</span>
                    </label>
                    <label class="flex items-center gap-1">
                      <input
                        type="radio"
                        name="resistencia"
                        value="no"
                        class="w-4 h-4"
                        v-model="datosRecepcion.resistencia"
                        :disabled="recepcionGuardada"
                        @change="activarVerificacionModal"
                      />
                      <span class="text-sm">No</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label class="text-xs font-semibold block mb-2">Certificado calidad</label>
                <div class="flex gap-4">
                  <label class="flex items-center gap-1">
                    <input
                      type="radio"
                      name="certificado"
                      value="si"
                      class="w-4 h-4"
                      v-model="datosRecepcion.certificadoCalidad"
                      :disabled="recepcionGuardada"
                      @change="activarVerificacionModal"
                    />
                    <span class="text-sm">Sí</span>
                  </label>
                  <label class="flex items-center gap-1">
                    <input
                      type="radio"
                      name="certificado"
                      value="no"
                      class="w-4 h-4"
                      v-model="datosRecepcion.certificadoCalidad"
                      :disabled="recepcionGuardada"
                      @change="activarVerificacionModal"
                    />
                    <span class="text-sm">No</span>
                  </label>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  @click="abrirAutorizacion('recepcion', 'rc')"
                  :class="[
                    'px-3 py-2 rounded text-sm w-full',
                    autorizaciones.recepcion.rc.autorizado || recepcionGuardada
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600',
                  ]"
                  :disabled="autorizaciones.recepcion.rc.autorizado || recepcionGuardada"
                >
                  {{
                    autorizaciones.recepcion.rc.autorizado
                      ? '✓ R.C Autorizado'
                      : recepcionGuardada
                        ? 'Proceso Finalizado'
                        : 'Autorizar R.C'
                  }}
                </button>
                <button
                  type="button"
                  @click="abrirAutorizacion('recepcion', 'planeacion')"
                  :class="[
                    'px-3 py-2 rounded text-sm w-full',
                    autorizaciones.recepcion.planeacion.autorizado || recepcionGuardada
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600',
                  ]"
                  :disabled="autorizaciones.recepcion.planeacion.autorizado || recepcionGuardada"
                >
                  {{
                    autorizaciones.recepcion.planeacion.autorizado
                      ? '✓ Planeación Autorizado'
                      : recepcionGuardada
                        ? 'Proceso Finalizado'
                        : 'Autorizar Planeación'
                  }}
                </button>
              </div>
              <div
                v-if="autorizaciones.recepcion.rc.autorizado"
                class="text-xs text-green-600 text-center"
              >
                R.C: {{ autorizaciones.recepcion.rc.usuario }}
              </div>
              <div
                v-if="autorizaciones.recepcion.planeacion.autorizado"
                class="text-xs text-green-600 text-center"
              >
                Planeación: {{ autorizaciones.recepcion.planeacion.usuario }}
              </div>
            </div>
          </div>

          <!-- Desktop View -->
          <div class="hidden md:table w-full border-separate border-spacing-2 table-fixed">
            <div class="table-row">
              <div class="table-cell p-1 w-[96px] h-20 border-gray-300 rounded align-middle"></div>

              <!-- Pedido -->
              <div
                class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
              >
                <div class="text-center text-xs font-semibold mb-1">Pedido</div>
                <input
                  type="number"
                  placeholder=""
                  :value="item.piezas"
                  readonly
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                />
              </div>

              <!-- Producción -->
              <!-- Producción -->
              <div
                class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
              >
                <div class="text-center text-xs font-semibold mb-1">Producción</div>
                <input
                  type="number"
                  placeholder=""
                  :value="item.cantidad"
                  readonly
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                />
              </div>

              <!-- Recibidas -->
              <div
                class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
              >
                <div class="text-center text-xs font-semibold mb-1">Recibidas</div>
                <input
                  type="number"
                  v-model.number="cantidadRecepcion"
                  :readonly="recepcionGuardada"
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                  @input="activarVerificacionModal"
                />
              </div>

              <!-- Medida del cartón -->
              <div
                class="table-cell p-1 border w-[100px] h-20 border-gray-300 rounded align-middle"
              >
                <div class="text-center text-xs font-semibold mb-1">Medida del cartón</div>
                <fieldset class="flex flex-1/2 items-center h-1 gap-1">
                  <div class="flex gap-2">
                    <input
                      id="si"
                      type="radio"
                      name="medida"
                      value="si"
                      class="peer/si"
                      v-model="datosRecepcion.medidaCarton"
                      :disabled="recepcionGuardada"
                      @change="activarVerificacionModal"
                    />
                    <label
                      for="si"
                      :class="[
                        'text-sm',
                        recepcionGuardada ? 'text-gray-400' : 'peer-checked/si:text-green-600',
                      ]"
                      >Sí</label
                    >

                    <input
                      id="no"
                      type="radio"
                      name="medida"
                      value="no"
                      class="peer/no"
                      v-model="datosRecepcion.medidaCarton"
                      :disabled="recepcionGuardada"
                      @change="activarVerificacionModal"
                    />
                    <label
                      for="no"
                      :class="[
                        'text-sm',
                        recepcionGuardada ? 'text-gray-400' : 'peer-checked/no:text-red-600',
                      ]"
                      >No</label
                    >
                  </div>
                </fieldset>
              </div>

              <!-- Resistencia -->
              <div
                class="table-cell p-1 border w-[100px] h-20 border-gray-300 rounded align-middle"
              >
                <div class="text-center text-xs font-semibold mb-1">Resistencia</div>
                <fieldset class="flex flex-1/2 items-center h-1 gap-1">
                  <div class="flex gap-2">
                    <input
                      id="resistencia-si"
                      type="radio"
                      name="resistencia"
                      value="si"
                      class="peer/si"
                      v-model="datosRecepcion.resistencia"
                      :disabled="recepcionGuardada"
                      @change="activarVerificacionModal"
                    />
                    <label
                      for="resistencia-si"
                      :class="[
                        'text-sm',
                        recepcionGuardada ? 'text-gray-400' : 'peer-checked/si:text-green-600',
                      ]"
                      >Sí</label
                    >

                    <input
                      id="resistencia-no"
                      type="radio"
                      name="resistencia"
                      value="no"
                      class="peer/no"
                      v-model="datosRecepcion.resistencia"
                      :disabled="recepcionGuardada"
                      @change="activarVerificacionModal"
                    />
                    <label
                      for="resistencia-no"
                      :class="[
                        'text-sm',
                        recepcionGuardada ? 'text-gray-400' : 'peer-checked/no:text-red-600',
                      ]"
                      >No</label
                    >
                  </div>
                </fieldset>
              </div>

              <!-- Certificado calidad -->
              <div
                class="table-cell p-1 border w-[100px] h-20 border-gray-300 rounded align-middle"
              >
                <div class="text-center text-xs font-semibold mb-1">Certificado calidad</div>
                <fieldset class="flex flex-1/2 items-center h-1 gap-1">
                  <div class="flex gap-2">
                    <input
                      id="certificado-si"
                      type="radio"
                      name="certificado"
                      value="si"
                      class="peer/si"
                      v-model="datosRecepcion.certificadoCalidad"
                      :disabled="recepcionGuardada"
                      @change="activarVerificacionModal"
                    />
                    <label
                      for="certificado-si"
                      :class="[
                        'text-sm',
                        recepcionGuardada ? 'text-gray-400' : 'peer-checked/si:text-green-600',
                      ]"
                      >Sí</label
                    >

                    <input
                      id="certificado-no"
                      type="radio"
                      name="certificado"
                      value="no"
                      class="peer/no"
                      v-model="datosRecepcion.certificadoCalidad"
                      :disabled="recepcionGuardada"
                      @change="activarVerificacionModal"
                    />
                    <label
                      for="certificado-no"
                      :class="[
                        'text-sm',
                        recepcionGuardada ? 'text-gray-400' : 'peer-checked/no:text-red-600',
                      ]"
                      >No</label
                    >
                  </div>
                </fieldset>
              </div>

              <!-- Autorización R.C -->
              <div
                class="table-cell p-1 border w-[140px] h-20 border-gray-300 rounded align-middle text-center"
              >
                <div class="text-xs font-semibold mb-1">Autorización R.C</div>
                <button
                  type="button"
                  @click="abrirAutorizacion('recepcion', 'rc')"
                  :class="[
                    'px-3 py-1 rounded text-sm mt-1 w-full',
                    autorizaciones.recepcion.rc.autorizado || recepcionGuardada
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600',
                  ]"
                  :disabled="autorizaciones.recepcion.rc.autorizado || recepcionGuardada"
                >
                  {{
                    autorizaciones.recepcion.rc.autorizado
                      ? '✓ Autorizado'
                      : recepcionGuardada
                        ? 'Finalizado'
                        : 'Autorizar'
                  }}
                </button>
                <div
                  v-if="autorizaciones.recepcion.rc.autorizado"
                  class="text-xs text-green-600 mt-1"
                >
                  {{ autorizaciones.recepcion.rc.usuario }}
                </div>
              </div>

              <!-- Autorización planeación -->
              <div
                class="table-cell p-1 border w-[140px] h-20 border-gray-300 rounded align-middle text-center"
              >
                <div class="text-xs font-semibold mb-1">Autorización planeación</div>
                <button
                  type="button"
                  @click="abrirAutorizacion('recepcion', 'planeacion')"
                  :class="[
                    'px-3 py-1 rounded text-sm mt-1 w-full',
                    autorizaciones.recepcion.planeacion.autorizado || recepcionGuardada
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600',
                  ]"
                  :disabled="autorizaciones.recepcion.planeacion.autorizado || recepcionGuardada"
                >
                  {{
                    autorizaciones.recepcion.planeacion.autorizado
                      ? '✓ Autorizado'
                      : recepcionGuardada
                        ? 'Finalizado'
                        : 'Autorizar'
                  }}
                </button>
                <div
                  v-if="autorizaciones.recepcion.planeacion.autorizado"
                  class="text-xs text-green-600 mt-1"
                >
                  {{ autorizaciones.recepcion.planeacion.usuario }}
                </div>
              </div>

              <div class="table-cell p-1 w-[96px] h-20 border-gray-300 rounded align-middle"></div>
            </div>
          </div>

          <!-- Estado de completitud -->
          <div class="mt-6 text-center border-t pt-4">
            <!-- Mensaje de campos faltantes -->
            <div v-if="!puedeGuardarRecepcion && !recepcionGuardada" class="text-xs text-gray-600">
              <span class="font-medium">Faltan por completar:</span> {{ camposFaltantesRecepcion }}
            </div>

            <!-- Mensaje de éxito después de guardar -->
            <div v-if="recepcionGuardada" class="text-xs text-green-600 bg-green-50 p-2 rounded">
              ✅ Recepción guardada exitosamente
            </div>

            <!-- Debug temporal -->
          </div>
        </fieldset>
        <!-- Modal de Confirmación -->
        <div
          v-if="mostrarModalConfirmacion"
          class="fixed inset-0 bg-neutral-400/30 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-lg p-6 max-w-md w-full mx-auto shadow-xl">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-green-100 p-2 rounded-full">
                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Confirmar Recepción</h3>
            </div>

            <!-- Resumen de datos -->
            <div class="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg">
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Cantidad recibida:</span>
                <span class="text-sm font-semibold bg-white px-2 py-1 rounded border">{{
                  cantidadRecepcion || '0'
                }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Medida cartón:</span>
                <span
                  class="text-sm font-semibold"
                  :class="datosRecepcion.medidaCarton === 'si' ? 'text-green-600' : 'text-red-600'"
                >
                  {{
                    datosRecepcion.medidaCarton === 'si'
                      ? '✅ Sí'
                      : datosRecepcion.medidaCarton === 'no'
                        ? '❌ No'
                        : 'No seleccionado'
                  }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Resistencia:</span>
                <span
                  class="text-sm font-semibold"
                  :class="datosRecepcion.resistencia === 'si' ? 'text-green-600' : 'text-red-600'"
                >
                  {{
                    datosRecepcion.resistencia === 'si'
                      ? '✅ Sí'
                      : datosRecepcion.resistencia === 'no'
                        ? '❌ No'
                        : 'No seleccionado'
                  }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Certificado calidad:</span>
                <span
                  class="text-sm font-semibold"
                  :class="
                    datosRecepcion.certificadoCalidad === 'si' ? 'text-green-600' : 'text-red-600'
                  "
                >
                  {{
                    datosRecepcion.certificadoCalidad === 'si'
                      ? '✅ Sí'
                      : datosRecepcion.certificadoCalidad === 'no'
                        ? '❌ No'
                        : 'No seleccionado'
                  }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Autorización RC:</span>
                <span
                  class="text-sm font-semibold text-green-600"
                  v-if="autorizaciones.recepcion.rc.autorizado"
                >
                  ✅ {{ autorizaciones.recepcion.rc.usuario }}
                </span>
                <span class="text-sm font-semibold text-red-600" v-else>❌ Pendiente</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-sm text-gray-600">Autorización Planeación:</span>
                <span
                  class="text-sm font-semibold text-green-600"
                  v-if="autorizaciones.recepcion.planeacion.autorizado"
                >
                  ✅ {{ autorizaciones.recepcion.planeacion.usuario }}
                </span>
                <span class="text-sm font-semibold text-red-600" v-else>❌ Pendiente</span>
              </div>
            </div>

            <p class="text-sm text-gray-600 mb-4 text-center">
              ¿Estás seguro de que deseas guardar esta recepción? Esta acción no se puede deshacer.
            </p>

            <div class="flex gap-3 justify-end">
              <button
                type="button"
                @click="cerrarModalConfirmacion"
                class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                Cancelar
              </button>
              <button
                type="button"
                @click="guardarRecepcion"
                :disabled="guardandoRecepcion"
                :class="[
                  'px-4 py-2 text-sm text-white rounded-lg flex items-center gap-2 transition-colors font-medium',
                  guardandoRecepcion
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700',
                ]"
              >
                <span v-if="guardandoRecepcion">
                  <svg
                    class="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Guardando...
                </span>
                <span v-else class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Confirmar y Guardar
                </span>
              </button>
            </div>
          </div>
        </div>
        <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

        <!-- Impresión Responsive -->
        <fieldset
          v-if="autorizaciones.impresion.visible"
          class="border border-gray-300 rounded p-3 md:p-4 mb-4"
        >
          <div v-for="item in productos" :key="'impresion-' + item.id">
            <legend class="text-xs font-semibold px-2">Impresión - {{ item.nombre }}</legend>

            <div class="space-y-4 md:hidden">
              <!-- Mobile View -->
              <div class="bg-white p-3 rounded border space-y-3">
                <div>
                  <label class="text-xs font-semibold block mb-1">Cantidad</label>
                  <input
                    type="number"
                    v-model.number="cantidadImpresion"
                    :readonly="impresionGuardada"
                    class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full bg-gray-50"
                    @input="activarVerificacionModalImpresion"
                  />
                </div>

                <div>
                  <label class="text-xs font-semibold block mb-1">Grabado</label>
                  <input
                    type="text"
                    readonly
                    :value="item?.grabado || ''"
                    class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full bg-gray-50"
                  />
                </div>

                <div>
                  <label class="text-xs font-semibold block mb-1">Tintas</label>
                  <div class="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      readonly
                      class="border border-gray-300 rounded-md px-2 py-2 text-xs"
                    />
                    <input
                      type="text"
                      readonly
                      class="border border-gray-300 rounded-md px-2 py-2 text-xs"
                    />
                    <input
                      type="text"
                      readonly
                      class="border border-gray-300 rounded-md px-2 py-2 text-xs"
                    />
                    <input
                      type="text"
                      readonly
                      class="border border-gray-300 rounded-md px-2 py-2 text-xs"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="text-xs font-semibold block mb-2">Tono</label>
                    <div class="flex gap-4">
                      <label class="flex items-center gap-1">
                        <input
                          type="radio"
                          name="tono"
                          value="si"
                          v-model="datosImpresion.tono"
                          :disabled="impresionGuardada"
                          @change="activarVerificacionModalImpresion"
                          class="w-4 h-4"
                        />
                        <span class="text-sm">Sí</span>
                      </label>
                      <label class="flex items-center gap-1">
                        <input
                          type="radio"
                          name="tono"
                          value="no"
                          v-model="datosImpresion.tono"
                          :disabled="impresionGuardada"
                          @change="activarVerificacionModalImpresion"
                          class="w-4 h-4"
                        />
                        <span class="text-sm">No</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label class="text-xs font-semibold block mb-2">Medidas</label>
                    <div class="flex gap-4">
                      <label class="flex items-center gap-1">
                        <input
                          type="radio"
                          name="medidas"
                          value="si"
                          v-model="datosImpresion.medidas"
                          :disabled="impresionGuardada"
                          @change="activarVerificacionModalImpresion"
                          class="w-4 h-4"
                        />
                        <span class="text-sm">Sí</span>
                      </label>
                      <label class="flex items-center gap-1">
                        <input
                          type="radio"
                          name="medidas"
                          value="no"
                          v-model="datosImpresion.medidas"
                          :disabled="impresionGuardada"
                          @change="activarVerificacionModalImpresion"
                          class="w-4 h-4"
                        />
                        <span class="text-sm">No</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="text-xs font-semibold block mb-1">Entregado</label>
                  <input
                    type="number"
                    v-model.number="entregadoImpresion"
                    :readonly="impresionGuardada"
                    class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full bg-gray-50"
                    @input="activarVerificacionModalImpresion"
                  />
                </div>

                <div class="bg-gray-50 p-2 rounded">
                  <div class="text-xs font-semibold text-center mb-1">Merma</div>
                  <div class="text-center text-sm font-bold">
                    {{ merma(entregadoImpresion, cantidadImpresion) }}%
                  </div>
                  <div class="text-center text-xs">
                    Restante: {{ cantidadRestante(entregadoImpresion, cantidadImpresion) }}
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    @click="abrirAutorizacion('impresion', 'ci')"
                    :class="[
                      'px-3 py-2 rounded text-sm w-full',
                      autorizaciones.impresion.ci.autorizado || impresionGuardada
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600',
                    ]"
                    :disabled="autorizaciones.impresion.ci.autorizado || impresionGuardada"
                  >
                    {{
                      autorizaciones.impresion.ci.autorizado
                        ? '✓ C.I Autorizado'
                        : impresionGuardada
                          ? 'Proceso Finalizado'
                          : 'Autorizar C.I'
                    }}
                  </button>
                  <button
                    type="button"
                    @click="abrirAutorizacion('impresion', 'operador')"
                    :class="[
                      'px-3 py-2 rounded text-sm w-full',
                      autorizaciones.impresion.operador.autorizado || impresionGuardada
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600',
                    ]"
                    :disabled="autorizaciones.impresion.operador.autorizado || impresionGuardada"
                  >
                    {{
                      autorizaciones.impresion.operador.autorizado
                        ? '✓ Operador Autorizado'
                        : impresionGuardada
                          ? 'Proceso Finalizado'
                          : 'Autorizar Operador'
                    }}
                  </button>
                </div>
                <div
                  v-if="autorizaciones.impresion.ci.autorizado"
                  class="text-xs text-green-600 text-center"
                >
                  C.I: {{ autorizaciones.impresion.ci.usuario }}
                </div>
                <div
                  v-if="autorizaciones.impresion.operador.autorizado"
                  class="text-xs text-green-600 text-center"
                >
                  Operador: {{ autorizaciones.impresion.operador.usuario }}
                </div>
              </div>
            </div>

            <!-- Desktop View -->
            <div class="hidden md:table w-full border-separate border-spacing-2 table-fixed">
              <div class="table-row">
                <!-- Cantidad -->
                <div
                  class="table-cell p-1 border w-[100px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Cantidad</div>
                  <input
                    type="number"
                    v-model.number="cantidadImpresion"
                    :readonly="impresionGuardada"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                    @input="activarVerificacionModalImpresion"
                  />
                </div>

                <!-- Grabado -->
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Grabado</div>
                  <input
                    type="text"
                    readonly
                    :value="item?.grabado || ''"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                  />
                </div>

                <!-- Tintas -->
                <div class="table-cell p-1 border w-[257px] border-gray-300 rounded">
                  <div class="text-center text-xs font-semibold mb-1">Tintas</div>
                  <div class="flex justify-between gap-2">
                    <input
                      type="text"
                      readonly
                      :value="
                        productos.length > 0 && productos[0].tintas && productos[0].tintas[0]
                          ? productos[0].tintas[0]
                          : ''
                      "
                      class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 leading-tight"
                    />
                    <input
                      type="text"
                      readonly
                      :value="
                        productos.length > 0 && productos[0].tintas && productos[0].tintas[1]
                          ? productos[0].tintas[1]
                          : ''
                      "
                      class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 leading-tight"
                    />
                    <input
                      type="text"
                      readonly
                      :value="
                        productos.length > 0 && productos[0].tintas && productos[0].tintas[2]
                          ? productos[0].tintas[2]
                          : ''
                      "
                      class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 leading-tight"
                    />
                    <input
                      type="text"
                      readonly
                      :value="
                        productos.length > 0 && productos[0].tintas && productos[0].tintas[3]
                          ? productos[0].tintas[3]
                          : ''
                      "
                      class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 leading-tight"
                    />
                  </div>
                </div>

                <!-- Tono -->
                <div
                  class="table-cell p-1 border w-[100px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Tono</div>
                  <fieldset class="flex flex-1/2 items-center h-1 gap-1">
                    <div class="flex gap-2">
                      <input
                        id="si-tono"
                        type="radio"
                        name="tono"
                        value="si"
                        v-model="datosImpresion.tono"
                        :disabled="impresionGuardada"
                        @change="activarVerificacionModalImpresion"
                        class="peer/si"
                      />
                      <label
                        for="si-tono"
                        :class="[
                          'text-sm',
                          impresionGuardada ? 'text-gray-400' : 'peer-checked/si:text-green-600',
                        ]"
                      >
                        Sí
                      </label>

                      <input
                        id="no-tono"
                        type="radio"
                        name="tono"
                        value="no"
                        v-model="datosImpresion.tono"
                        :disabled="impresionGuardada"
                        @change="activarVerificacionModalImpresion"
                        class="peer/no"
                      />
                      <label
                        for="no-tono"
                        :class="[
                          'text-sm',
                          impresionGuardada ? 'text-gray-400' : 'peer-checked/no:text-red-600',
                        ]"
                      >
                        No
                      </label>
                    </div>
                  </fieldset>
                </div>

                <!-- Medidas -->
                <div
                  class="table-cell p-1 border w-[100px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Medidas</div>
                  <fieldset class="flex flex-1/2 items-center h-1 gap-1">
                    <div class="flex gap-2">
                      <input
                        id="si-medidas"
                        type="radio"
                        name="medidas"
                        value="si"
                        v-model="datosImpresion.medidas"
                        :disabled="impresionGuardada"
                        @change="activarVerificacionModalImpresion"
                        class="peer/si"
                      />
                      <label
                        for="si-medidas"
                        :class="[
                          'text-sm',
                          impresionGuardada ? 'text-gray-400' : 'peer-checked/si:text-green-600',
                        ]"
                      >
                        Sí
                      </label>

                      <input
                        id="no-medidas"
                        type="radio"
                        name="medidas"
                        value="no"
                        v-model="datosImpresion.medidas"
                        :disabled="impresionGuardada"
                        @change="activarVerificacionModalImpresion"
                        class="peer/no"
                      />
                      <label
                        for="no-medidas"
                        :class="[
                          'text-sm',
                          impresionGuardada ? 'text-gray-400' : 'peer-checked/no:text-red-600',
                        ]"
                      >
                        No
                      </label>
                    </div>
                  </fieldset>
                </div>

                <!-- Autorización C.I -->
                <div
                  class="table-cell p-1 border w-[140px] h-20 border-gray-300 rounded align-middle text-center"
                >
                  <div class="text-xs font-semibold mb-1">Autorización C.I</div>
                  <button
                    type="button"
                    @click="abrirAutorizacion('impresion', 'ci')"
                    :class="[
                      'px-3 py-1 rounded text-sm mt-1 w-full',
                      autorizaciones.impresion.ci.autorizado || impresionGuardada
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600',
                    ]"
                    :disabled="autorizaciones.impresion.ci.autorizado || impresionGuardada"
                  >
                    {{
                      autorizaciones.impresion.ci.autorizado
                        ? '✓ Autorizado'
                        : impresionGuardada
                          ? 'Finalizado'
                          : 'Autorizar'
                    }}
                  </button>
                  <div
                    v-if="autorizaciones.impresion.ci.autorizado"
                    class="text-xs text-green-600 mt-1"
                  >
                    {{ autorizaciones.impresion.ci.usuario }}
                  </div>
                </div>

                <div
                  class="table-cell p-1 border w-[100px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Entregado</div>
                  <input
                    type="number"
                    v-model.number="entregadoImpresion"
                    :readonly="impresionGuardada"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                    @input="activarVerificacionModalImpresion"
                  />
                </div>

                <!-- Merma -->
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle text-center"
                >
                  <input
                    type="number"
                    :value="cantidadRestante(entregadoImpresion, cantidadImpresion)"
                    readonly
                    class="border rounded px-2 py-1 text-sm w-full text-center bg-gray-50"
                    placeholder="0"
                  />
                  <div class="mt-1 text-xs text-center">
                    {{ merma(entregadoImpresion, cantidadImpresion) }}%
                  </div>
                </div>

                <!-- Autorización operador -->
                <div
                  class="table-cell p-1 border w-[140px] h-20 border-gray-300 rounded align-middle text-center"
                >
                  <div class="text-xs font-semibold mb-1">Autorización operador</div>
                  <button
                    type="button"
                    @click="abrirAutorizacion('impresion', 'operador')"
                    :class="[
                      'px-3 py-1 rounded text-sm mt-1 w-full',
                      autorizaciones.impresion.operador.autorizado || impresionGuardada
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600',
                    ]"
                    :disabled="autorizaciones.impresion.operador.autorizado || impresionGuardada"
                  >
                    {{
                      autorizaciones.impresion.operador.autorizado
                        ? '✓ Autorizado'
                        : impresionGuardada
                          ? 'Finalizado'
                          : 'Autorizar'
                    }}
                  </button>
                  <div
                    v-if="autorizaciones.impresion.operador.autorizado"
                    class="text-xs text-green-600 mt-1"
                  >
                    {{ autorizaciones.impresion.operador.usuario }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Estado de completitud -->
            <div class="mt-6 text-center border-t pt-4">
              <!-- Mensaje de campos faltantes -->
              <div
                v-if="!puedeGuardarImpresion && !impresionGuardada"
                class="text-xs text-gray-600"
              >
                <span class="font-medium">Faltan por completar:</span>
                {{ camposFaltantesImpresion }}
              </div>

              <!-- Mensaje de éxito después de guardar -->
              <div v-if="impresionGuardada" class="text-xs text-green-600 bg-green-50 p-2 rounded">
                ✅ Impresión guardada exitosamente
              </div>
            </div>
          </div>
        </fieldset>

        <!-- Modal de Confirmación Impresión -->
        <div
          v-if="mostrarModalConfirmacionImpresion"
          class="fixed inset-0 bg-neutral-400/30 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-lg p-6 max-w-md w-full mx-auto shadow-xl">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-blue-100 p-2 rounded-full">
                <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Confirmar Impresión</h3>
            </div>

            <!-- Resumen de datos -->
            <div class="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg">
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Cantidad impresión:</span>
                <span class="text-sm font-semibold bg-white px-2 py-1 rounded border">{{
                  cantidadImpresion || '0'
                }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Entregado:</span>
                <span class="text-sm font-semibold bg-white px-2 py-1 rounded border">{{
                  entregadoImpresion || '0'
                }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Merma:</span>
                <span class="text-sm font-semibold bg-white px-2 py-1 rounded border">
                  {{ merma(entregadoImpresion, cantidadImpresion) }}%
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Tono:</span>
                <span
                  class="text-sm font-semibold"
                  :class="datosImpresion.tono === 'si' ? 'text-green-600' : 'text-red-600'"
                >
                  {{
                    datosImpresion.tono === 'si'
                      ? '✅ Sí'
                      : datosImpresion.tono === 'no'
                        ? '❌ No'
                        : 'No seleccionado'
                  }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Medidas:</span>
                <span
                  class="text-sm font-semibold"
                  :class="datosImpresion.medidas === 'si' ? 'text-green-600' : 'text-red-600'"
                >
                  {{
                    datosImpresion.medidas === 'si'
                      ? '✅ Sí'
                      : datosImpresion.medidas === 'no'
                        ? '❌ No'
                        : 'No seleccionado'
                  }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Autorización C.I:</span>
                <span
                  class="text-sm font-semibold text-green-600"
                  v-if="autorizaciones.impresion.ci.autorizado"
                >
                  ✅ {{ autorizaciones.impresion.ci.usuario }}
                </span>
                <span class="text-sm font-semibold text-red-600" v-else>❌ Pendiente</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-sm text-gray-600">Autorización Operador:</span>
                <span
                  class="text-sm font-semibold text-green-600"
                  v-if="autorizaciones.impresion.operador.autorizado"
                >
                  ✅ {{ autorizaciones.impresion.operador.usuario }}
                </span>
                <span class="text-sm font-semibold text-red-600" v-else>❌ Pendiente</span>
              </div>
            </div>

            <p class="text-sm text-gray-600 mb-4 text-center">
              ¿Estás seguro de que deseas guardar esta impresión? Esta acción no se puede deshacer.
            </p>

            <div class="flex gap-3 justify-end">
              <button
                type="button"
                @click="cerrarModalConfirmacionImpresion"
                class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                Cancelar
              </button>
              <button
                type="button"
                @click="guardarImpresion"
                :disabled="guardandoImpresion"
                :class="[
                  'px-4 py-2 text-sm text-white rounded-lg flex items-center gap-2 transition-colors font-medium',
                  guardandoImpresion
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700',
                ]"
              >
                <span v-if="guardandoImpresion">
                  <svg
                    class="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Guardando...
                </span>
                <span v-else class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Confirmar y Guardar
                </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Slotter o Suaje Responsive -->
        <fieldset
          v-if="autorizaciones.suaje.visible"
          class="border border-gray-300 rounded p-3 md:p-4 mb-4"
        >
          <div v-for="item in productos" :key="'suaje-' + item.id">
            <legend class="text-xs font-semibold px-2">Slotter o suaje - {{ item.nombre }}</legend>

            <div class="space-y-4 md:hidden">
              <div class="bg-white p-3 rounded border space-y-3">
                <div>
                  <label class="text-xs font-semibold block mb-1">Cantidad Suaje</label>
                  <input
                    type="number"
                    v-model.number="cantidadSuaje"
                    :readonly="suajeGuardada"
                    class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full bg-gray-50"
                    @input="activarVerificacionModalSuaje"
                    placeholder="Ingrese cantidad"
                  />
                </div>

                <div>
                  <label class="text-xs font-semibold block mb-1">Medidas internas (mm)</label>
                  <div class="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      :value="item.largo_carton"
                      readonly
                      class="border border-gray-300 rounded-md px-2 py-2 text-xs bg-gray-50"
                      placeholder="Largo"
                    />
                    <input
                      type="number"
                      :value="item.ancho_carton"
                      readonly
                      class="border border-gray-300 rounded-md px-2 py-2 text-xs bg-gray-50"
                      placeholder="Ancho"
                    />
                    <input
                      type="number"
                      :value="item.alto_int"
                      readonly
                      class="border border-gray-300 rounded-md px-2 py-2 text-xs bg-gray-50"
                      placeholder="Alto"
                    />
                    <input
                      type="number"
                      :value="item.ceja"
                      readonly
                      class="border border-gray-300 rounded-md px-2 py-2 text-xs bg-gray-50"
                      placeholder="Ceja"
                    />
                  </div>
                </div>

                <div>
                  <label class="text-xs font-semibold block mb-1">Suaje</label>
                  <input
                    type="text"
                    v-model="datosSuaje.suaje"
                    :readonly="suajeGuardada"
                    class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full"
                    @input="activarVerificacionModalSuaje"
                  />
                </div>

                <!-- CAMPO MARCAS (solo lectura) -->
                <div>
                  <label class="text-xs font-semibold block mb-1">Marcas</label>
                  <input
                    type="text"
                    :value="item.marcas"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full bg-gray-50"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="text-xs font-semibold block mb-2">Medidas cartón</label>
                    <div class="flex gap-4">
                      <label class="flex items-center gap-1">
                        <input
                          type="radio"
                          value="si"
                          v-model="datosSuaje.medidaCarton"
                          :disabled="suajeGuardada"
                          @change="activarVerificacionModalSuaje"
                          class="w-4 h-4"
                        />
                        <span class="text-sm">Sí</span>
                      </label>
                      <label class="flex items-center gap-1">
                        <input
                          type="radio"
                          value="no"
                          v-model="datosSuaje.medidaCarton"
                          :disabled="suajeGuardada"
                          @change="activarVerificacionModalSuaje"
                          class="w-4 h-4"
                        />
                        <span class="text-sm">No</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label class="text-xs font-semibold block mb-2">Cuadre</label>
                    <div class="flex gap-4">
                      <label class="flex items-center gap-1">
                        <input
                          type="radio"
                          value="si"
                          v-model="datosSuaje.cuadre"
                          :disabled="suajeGuardada"
                          @change="activarVerificacionModalSuaje"
                          class="w-4 h-4"
                        />
                        <span class="text-sm">Sí</span>
                      </label>
                      <label class="flex items-center gap-1">
                        <input
                          type="radio"
                          value="no"
                          v-model="datosSuaje.cuadre"
                          :disabled="suajeGuardada"
                          @change="activarVerificacionModalSuaje"
                          class="w-4 h-4"
                        />
                        <span class="text-sm">No</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="text-xs font-semibold block mb-2">Marcas (Calidad)</label>
                  <div class="flex gap-4">
                    <label class="flex items-center gap-1">
                      <input
                        type="radio"
                        value="si"
                        v-model="datosSuaje.marcas"
                        :disabled="suajeGuardada"
                        @change="activarVerificacionModalSuaje"
                        class="w-4 h-4"
                      />
                      <span class="text-sm">Sí</span>
                    </label>
                    <label class="flex items-center gap-1">
                      <input
                        type="radio"
                        value="no"
                        v-model="datosSuaje.marcas"
                        :disabled="suajeGuardada"
                        @change="activarVerificacionModalSuaje"
                        class="w-4 h-4"
                      />
                      <span class="text-sm">No</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="text-xs font-semibold block mb-1">Entregado</label>
                  <input
                    type="number"
                    v-model.number="entregadoSuaje"
                    :readonly="suajeGuardada"
                    class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full bg-gray-50"
                    @input="activarVerificacionModalSuaje"
                  />
                </div>

                <div class="bg-gray-50 p-2 rounded">
                  <div class="text-xs font-semibold text-center mb-1">Merma</div>
                  <div class="text-center text-sm font-bold">
                    {{ merma(entregadoSuaje, cantidadSuaje) }}%
                  </div>
                  <div class="text-center text-xs">
                    Restante: {{ cantidadRestante(entregadoSuaje, cantidadSuaje) }}
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    @click="abrirAutorizacion('suaje', 'ci')"
                    :class="[
                      'px-3 py-2 rounded text-sm w-full',
                      autorizaciones.suaje.ci.autorizado || suajeGuardada
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600',
                    ]"
                    :disabled="autorizaciones.suaje.ci.autorizado || suajeGuardada"
                  >
                    {{
                      autorizaciones.suaje.ci.autorizado
                        ? '✓ C.I Autorizado'
                        : suajeGuardada
                          ? 'Proceso Finalizado'
                          : 'Autorizar C.I'
                    }}
                  </button>
                  <button
                    type="button"
                    @click="abrirAutorizacion('suaje', 'operador')"
                    :class="[
                      'px-3 py-2 rounded text-sm w-full',
                      autorizaciones.suaje.operador.autorizado || suajeGuardada
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600',
                    ]"
                    :disabled="autorizaciones.suaje.operador.autorizado || suajeGuardada"
                  >
                    {{
                      autorizaciones.suaje.operador.autorizado
                        ? '✓ Operador Autorizado'
                        : suajeGuardada
                          ? 'Proceso Finalizado'
                          : 'Autorizar Operador'
                    }}
                  </button>
                </div>
                <div
                  v-if="autorizaciones.suaje.ci.autorizado"
                  class="text-xs text-green-600 text-center"
                >
                  C.I: {{ autorizaciones.suaje.ci.usuario }}
                </div>
                <div
                  v-if="autorizaciones.suaje.operador.autorizado"
                  class="text-xs text-green-600 text-center"
                >
                  Operador: {{ autorizaciones.suaje.operador.usuario }}
                </div>
              </div>
            </div>

            <!-- Desktop View -->
            <div class="hidden md:table w-full border-separate border-spacing-2 table-fixed">
              <div class="table-row">
                <!-- Cantidad -->
                <div
                  class="table-cell p-1 border w-[100px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Cantidad</div>
                  <input
                    type="number"
                    v-model.number="cantidadSuaje"
                    :readonly="suajeGuardada"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                    @input="activarVerificacionModalSuaje"
                  />
                </div>

                <!-- Medidas internas -->
                <div class="table-cell p-1 border w-[240px] border-gray-300 rounded">
                  <div class="text-center text-xs font-semibold mb-1">Medidas internas (mm)</div>
                  <div class="flex justify-between gap-2">
                    <input
                      type="text"
                      readonly
                      :value="item.largo_carton"
                      class="border border-gray-300 rounded-md px-2 py-1 h-9 text-xs w-1/4 leading-tight bg-gray-50"
                      placeholder="Largo"
                    />
                    <input
                      type="text"
                      :value="item.ancho_carton"
                      readonly
                      class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 leading-tight bg-gray-50"
                      placeholder="Ancho"
                    />
                    <input
                      type="text"
                      :value="item.alto_int"
                      readonly
                      class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 leading-tight bg-gray-50"
                      placeholder="Alto"
                    />
                    <input
                      type="text"
                      :value="item.ceja"
                      readonly
                      class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 leading-tight bg-gray-50"
                      placeholder="Ceja"
                    />
                  </div>
                </div>

                <!-- Suaje -->
                <div
                  class="table-cell p-1 border w-[100px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Suaje</div>
                  <input
                    type="text"
                    v-model="datosSuaje.suaje"
                    :readonly="suajeGuardada"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight"
                    @input="activarVerificacionModalSuaje"
                  />
                </div>

                <!-- CAMPO MARCAS (solo lectura) - Desktop -->
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Marcas</div>
                  <input
                    type="text"
                    :value="item.marcas"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                  />
                </div>

                <!-- Medidas cartón -->
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Medidas</div>
                  <fieldset class="flex flex-1/2 items-center h-1 gap-1">
                    <div class="flex gap-2">
                      <input
                        id="si-med-carton"
                        type="radio"
                        value="si"
                        v-model="datosSuaje.medidaCarton"
                        :disabled="suajeGuardada"
                        @change="activarVerificacionModalSuaje"
                        class="peer/si"
                      />
                      <label
                        for="si-med-carton"
                        :class="[
                          'text-sm',
                          suajeGuardada ? 'text-gray-400' : 'peer-checked/si:text-green-600',
                        ]"
                      >
                        Sí
                      </label>

                      <input
                        id="no-med-carton"
                        type="radio"
                        value="no"
                        v-model="datosSuaje.medidaCarton"
                        :disabled="suajeGuardada"
                        @change="activarVerificacionModalSuaje"
                        class="peer/no"
                      />
                      <label
                        for="no-med-carton"
                        :class="[
                          'text-sm',
                          suajeGuardada ? 'text-gray-400' : 'peer-checked/no:text-red-600',
                        ]"
                      >
                        No
                      </label>
                    </div>
                  </fieldset>
                </div>

                <!-- Cuadre -->
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Cuadre</div>
                  <fieldset class="flex flex-1/2 items-center h-1 gap-1">
                    <div class="flex gap-2">
                      <input
                        id="si-cuadre"
                        type="radio"
                        value="si"
                        v-model="datosSuaje.cuadre"
                        :disabled="suajeGuardada"
                        @change="activarVerificacionModalSuaje"
                        class="peer/si"
                      />
                      <label
                        for="si-cuadre"
                        :class="[
                          'text-sm',
                          suajeGuardada ? 'text-gray-400' : 'peer-checked/si:text-green-600',
                        ]"
                      >
                        Sí
                      </label>

                      <input
                        id="no-cuadre"
                        type="radio"
                        value="no"
                        v-model="datosSuaje.cuadre"
                        :disabled="suajeGuardada"
                        @change="activarVerificacionModalSuaje"
                        class="peer/no"
                      />
                      <label
                        for="no-cuadre"
                        :class="[
                          'text-sm',
                          suajeGuardada ? 'text-gray-400' : 'peer-checked/no:text-red-600',
                        ]"
                      >
                        No
                      </label>
                    </div>
                  </fieldset>
                </div>

                <!-- Marcas (Calidad) -->
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Marcas (Calidad)</div>
                  <fieldset class="flex flex-1/2 items-center h-1 gap-1">
                    <div class="flex gap-2">
                      <input
                        id="si-marcas"
                        type="radio"
                        value="si"
                        v-model="datosSuaje.marcas"
                        :disabled="suajeGuardada"
                        @change="activarVerificacionModalSuaje"
                        class="peer/si"
                      />
                      <label
                        for="si-marcas"
                        :class="[
                          'text-sm',
                          suajeGuardada ? 'text-gray-400' : 'peer-checked/si:text-green-600',
                        ]"
                      >
                        Sí
                      </label>

                      <input
                        id="no-marcas"
                        type="radio"
                        value="no"
                        v-model="datosSuaje.marcas"
                        :disabled="suajeGuardada"
                        @change="activarVerificacionModalSuaje"
                        class="peer/no"
                      />
                      <label
                        for="no-marcas"
                        :class="[
                          'text-sm',
                          suajeGuardada ? 'text-gray-400' : 'peer-checked/no:text-red-600',
                        ]"
                      >
                        No
                      </label>
                    </div>
                  </fieldset>
                </div>

                <!-- Autorización C.I -->
                <div
                  class="table-cell p-1 border w-[140px] h-20 border-gray-300 rounded align-middle text-center"
                >
                  <div class="text-xs font-semibold mb-1">Autorización C.I</div>
                  <button
                    type="button"
                    @click="abrirAutorizacion('suaje', 'ci')"
                    :class="[
                      'px-3 py-1 rounded text-sm mt-1 w-full',
                      autorizaciones.suaje.ci.autorizado || suajeGuardada
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600',
                    ]"
                    :disabled="autorizaciones.suaje.ci.autorizado || suajeGuardada"
                  >
                    {{
                      autorizaciones.suaje.ci.autorizado
                        ? '✓ Autorizado'
                        : suajeGuardada
                          ? 'Finalizado'
                          : 'Autorizar'
                    }}
                  </button>
                  <div
                    v-if="autorizaciones.suaje.ci.autorizado"
                    class="text-xs text-green-600 mt-1"
                  >
                    {{ autorizaciones.suaje.ci.usuario }}
                  </div>
                </div>

                <div
                  class="table-cell p-1 border w-[90px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Entregado</div>
                  <input
                    type="number"
                    v-model.number="entregadoSuaje"
                    :readonly="suajeGuardada"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                    @input="activarVerificacionModalSuaje"
                  />
                </div>

                <!-- Merma -->
                <div
                  class="table-cell p-1 border w-[90px] h-20 border-gray-300 rounded align-middle text-center"
                >
                  <input
                    type="number"
                    :value="cantidadRestante(entregadoSuaje, cantidadSuaje)"
                    readonly
                    class="border rounded px-2 py-1 text-sm w-full text-center bg-gray-50"
                    placeholder="0"
                  />
                  <div class="mt-1 text-xs text-center">
                    {{ merma(entregadoSuaje, cantidadSuaje) }}%
                  </div>
                </div>

                <!-- Autorización operador -->
                <div
                  class="table-cell p-1 border w-[140px] h-20 border-gray-300 rounded align-middle text-center"
                >
                  <div class="text-xs font-semibold mb-1">Autorización operador</div>
                  <button
                    type="button"
                    @click="abrirAutorizacion('suaje', 'operador')"
                    :class="[
                      'px-3 py-1 rounded text-sm mt-1 w-full',
                      autorizaciones.suaje.operador.autorizado || suajeGuardada
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600',
                    ]"
                    :disabled="autorizaciones.suaje.operador.autorizado || suajeGuardada"
                  >
                    {{
                      autorizaciones.suaje.operador.autorizado
                        ? '✓ Autorizado'
                        : suajeGuardada
                          ? 'Finalizado'
                          : 'Autorizar'
                    }}
                  </button>
                  <div
                    v-if="autorizaciones.suaje.operador.autorizado"
                    class="text-xs text-green-600 mt-1"
                  >
                    {{ autorizaciones.suaje.operador.usuario }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Estado de completitud -->
            <div class="mt-6 text-center border-t pt-4">
              <!-- Mensaje de campos faltantes -->
              <div v-if="!puedeGuardarSuaje && !suajeGuardada" class="text-xs text-gray-600">
                <span class="font-medium">Faltan por completar:</span> {{ camposFaltantesSuaje }}
              </div>

              <!-- Mensaje de éxito después de guardar -->
              <div v-if="suajeGuardada" class="text-xs text-green-600 bg-green-50 p-2 rounded">
                ✅ Suaje guardado exitosamente
              </div>
            </div>
          </div>
        </fieldset>
        <!-- Modal de Confirmación Suaje -->
        <div
          v-if="mostrarModalConfirmacionSuaje"
          class="fixed inset-0 bg-neutral-400/30 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-lg p-6 max-w-md w-full mx-auto shadow-xl">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-purple-100 p-2 rounded-full">
                <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Confirmar Suaje</h3>
            </div>

            <!-- Resumen de datos -->
            <div class="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg">
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Cantidad suaje:</span>
                <span class="text-sm font-semibold bg-white px-2 py-1 rounded border">{{
                  cantidadSuaje || '0'
                }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Entregado:</span>
                <span class="text-sm font-semibold bg-white px-2 py-1 rounded border">{{
                  entregadoSuaje || '0'
                }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Merma:</span>
                <span class="text-sm font-semibold bg-white px-2 py-1 rounded border">
                  {{ merma(entregadoSuaje, cantidadSuaje) }}%
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Medidas cartón:</span>
                <span
                  class="text-sm font-semibold"
                  :class="datosSuaje.medidaCarton === 'si' ? 'text-green-600' : 'text-red-600'"
                >
                  {{
                    datosSuaje.medidaCarton === 'si'
                      ? '✅ Sí'
                      : datosSuaje.medidaCarton === 'no'
                        ? '❌ No'
                        : 'No seleccionado'
                  }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Cuadre:</span>
                <span
                  class="text-sm font-semibold"
                  :class="datosSuaje.cuadre === 'si' ? 'text-green-600' : 'text-red-600'"
                >
                  {{
                    datosSuaje.cuadre === 'si'
                      ? '✅ Sí'
                      : datosSuaje.cuadre === 'no'
                        ? '❌ No'
                        : 'No seleccionado'
                  }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Marcas:</span>
                <span
                  class="text-sm font-semibold"
                  :class="datosSuaje.marcas === 'si' ? 'text-green-600' : 'text-red-600'"
                >
                  {{
                    datosSuaje.marcas === 'si'
                      ? '✅ Sí'
                      : datosSuaje.marcas === 'no'
                        ? '❌ No'
                        : 'No seleccionado'
                  }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Autorización C.I:</span>
                <span
                  class="text-sm font-semibold text-green-600"
                  v-if="autorizaciones.suaje.ci.autorizado"
                >
                  ✅ {{ autorizaciones.suaje.ci.usuario }}
                </span>
                <span class="text-sm font-semibold text-red-600" v-else>❌ Pendiente</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-sm text-gray-600">Autorización Operador:</span>
                <span
                  class="text-sm font-semibold text-green-600"
                  v-if="autorizaciones.suaje.operador.autorizado"
                >
                  ✅ {{ autorizaciones.suaje.operador.usuario }}
                </span>
                <span class="text-sm font-semibold text-red-600" v-else>❌ Pendiente</span>
              </div>
            </div>

            <p class="text-sm text-gray-600 mb-4 text-center">
              ¿Estás seguro de que deseas guardar este proceso de suaje? Esta acción no se puede
              deshacer.
            </p>

            <div class="flex gap-3 justify-end">
              <button
                type="button"
                @click="cerrarModalConfirmacionSuaje"
                class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                Cancelar
              </button>
              <button
                type="button"
                @click="guardarSuaje"
                :disabled="guardandoSuaje"
                :class="[
                  'px-4 py-2 text-sm text-white rounded-lg flex items-center gap-2 transition-colors font-medium',
                  guardandoSuaje
                    ? 'bg-purple-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700',
                ]"
              >
                <span v-if="guardandoSuaje">
                  <svg
                    class="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Guardando...
                </span>
                <span v-else class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Confirmar y Guardar
                </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Pegado Responsive -->
        <fieldset
          v-if="autorizaciones.pegado.visible"
          class="border border-gray-300 rounded p-3 md:p-4 mb-4"
        >
          <div v-for="item in productos" :key="'pegado-' + item.id">
            <legend class="text-xs font-semibold px-2">Pegado - {{ item.nombre }}</legend>

            <div class="space-y-4 md:hidden">
              <!-- Mobile View -->
              <div class="bg-white p-3 rounded border space-y-3">
                <div>
                  <label class="text-xs font-semibold block mb-1">Cantidad</label>
                  <input
                    type="number"
                    v-model.number="cantidadPegado"
                    :readonly="pegadoGuardada"
                    class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full bg-gray-50"
                    @input="activarVerificacionModalPegado"
                  />
                </div>

                <div>
                  <label class="text-xs font-semibold block mb-1">Tipo de pegado</label>
                  <input
                    type="text"
                    v-model="tipoPegamento"
                    :readonly="pegadoGuardada"
                    class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full"
                    @input="activarVerificacionModalPegado"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="text-xs font-semibold block mb-2">Cuadre</label>
                    <div class="flex gap-4">
                      <label class="flex items-center gap-1">
                        <input
                          type="radio"
                          value="si"
                          v-model="cuadre2"
                          :disabled="pegadoGuardada"
                          @change="activarVerificacionModalPegado"
                          class="w-4 h-4"
                          :name="`cuadre-mobile-${item.id}`"
                        />
                        <span class="text-sm">Sí</span>
                      </label>
                      <label class="flex items-center gap-1">
                        <input
                          type="radio"
                          value="no"
                          v-model="cuadre2"
                          :disabled="pegadoGuardada"
                          @change="activarVerificacionModalPegado"
                          class="w-4 h-4"
                          :name="`cuadre-mobile-${item.id}`"
                        />
                        <span class="text-sm">No</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label class="text-xs font-semibold block mb-2">Desgarre</label>
                    <div class="flex gap-4">
                      <label class="flex items-center gap-1">
                        <input
                          type="radio"
                          value="si"
                          v-model="desgarre"
                          :disabled="pegadoGuardada"
                          @change="activarVerificacionModalPegado"
                          class="w-4 h-4"
                          :name="`desgarre-mobile-${item.id}`"
                        />
                        <span class="text-sm">Sí</span>
                      </label>
                      <label class="flex items-center gap-1">
                        <input
                          type="radio"
                          value="no"
                          v-model="desgarre"
                          :disabled="pegadoGuardada"
                          @change="activarVerificacionModalPegado"
                          class="w-4 h-4"
                          :name="`desgarre-mobile-${item.id}`"
                        />
                        <span class="text-sm">No</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="text-xs font-semibold block mb-2">Marcas</label>
                  <div class="flex gap-4">
                    <label class="flex items-center gap-1">
                      <input
                        type="radio"
                        value="si"
                        v-model="marcas2"
                        :disabled="pegadoGuardada"
                        @change="activarVerificacionModalPegado"
                        class="w-4 h-4"
                        :name="`marcas-mobile-${item.id}`"
                      />
                      <span class="text-sm">Sí</span>
                    </label>
                    <label class="flex items-center gap-1">
                      <input
                        type="radio"
                        value="no"
                        v-model="marcas2"
                        :disabled="pegadoGuardada"
                        @change="activarVerificacionModalPegado"
                        class="w-4 h-4"
                        :name="`marcas-mobile-${item.id}`"
                      />
                      <span class="text-sm">No</span>
                    </label>
                  </div>
                </div>

                <!-- CAMPOS CORREGIDOS PARA MÓVIL -->
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Empaque</div>
                  <input
                    type="text"
                    placeholder=""
                    :value="item.empaque"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                  />
                </div>
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Paq X</div>
                  <input
                    type="text"
                    placeholder=""
                    :value="item.paquete"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                  />
                </div>
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">CantidadxTar</div>
                  <input
                    type="number"
                    placeholder=""
                    :value="item.cantidad_tarima"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                  />
                </div>

                <!-- CAMPOS DE MERMA -->
                <div>
                  <label class="text-xs font-semibold block mb-1">Entregado</label>
                  <input
                    type="number"
                    v-model.number="entregadoPegado"
                    :readonly="pegadoGuardada"
                    class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full bg-gray-50"
                    @input="activarVerificacionModalPegado"
                  />
                </div>

                <div class="bg-gray-50 p-2 rounded">
                  <div class="text-xs font-semibold text-center mb-1">Merma</div>
                  <div class="text-center text-sm font-bold">
                    {{ merma(entregadoPegado, cantidadPegado) }}%
                  </div>
                  <div class="text-center text-xs">
                    Restante: {{ cantidadRestante(entregadoPegado, cantidadPegado) }}
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    @click="abrirAutorizacion('pegado', 'pc')"
                    :class="[
                      'px-3 py-2 rounded text-sm w-full',
                      autorizaciones.pegado.pc.autorizado || pegadoGuardada
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600',
                    ]"
                    :disabled="autorizaciones.pegado.pc.autorizado || pegadoGuardada"
                  >
                    {{
                      autorizaciones.pegado.pc.autorizado
                        ? '✓ P.C Autorizado'
                        : pegadoGuardada
                          ? 'Proceso Finalizado'
                          : 'Autorizar P.C'
                    }}
                  </button>
                  <button
                    type="button"
                    @click="abrirAutorizacion('pegado', 'operador')"
                    :class="[
                      'px-3 py-2 rounded text-sm w-full',
                      autorizaciones.pegado.operador.autorizado || pegadoGuardada
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600',
                    ]"
                    :disabled="autorizaciones.pegado.operador.autorizado || pegadoGuardada"
                  >
                    {{
                      autorizaciones.pegado.operador.autorizado
                        ? '✓ Operador Autorizado'
                        : pegadoGuardada
                          ? 'Proceso Finalizado'
                          : 'Autorizar Operador'
                    }}
                  </button>
                </div>
                <div
                  v-if="autorizaciones.pegado.pc.autorizado"
                  class="text-xs text-green-600 text-center"
                >
                  P.C: {{ autorizaciones.pegado.pc.usuario }}
                </div>
                <div
                  v-if="autorizaciones.pegado.operador.autorizado"
                  class="text-xs text-green-600 text-center"
                >
                  Operador: {{ autorizaciones.pegado.operador.usuario }}
                </div>
              </div>
            </div>

            <!-- Desktop View -->
            <div class="hidden md:table w-full border-separate border-spacing-2 table-fixed">
              <div class="table-row">
                <!-- Cantidad -->
                <div
                  class="table-cell p-1 border w-[100px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Cantidad</div>
                  <input
                    type="number"
                    v-model.number="cantidadPegado"
                    :readonly="pegadoGuardada"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                    @input="activarVerificacionModalPegado"
                  />
                </div>

                <!-- Tipo de pegamento -->
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Tipo de pegado</div>

                  <select
                    v-model="tipoPegamento"
                    :disabled="pegadoGuardada"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight"
                    @change="activarVerificacionModalPegado"
                  >
                    <option value="">Selecciona...</option>
                    <option value="Automatico 1300">Automático 1300</option>
                    <option value="Manual">Manual</option>
                    <option value="2 piezas manual">2 piezas manual</option>
                  </select>
                </div>

                <!-- Cuadre -->
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Cuadre</div>
                  <fieldset class="flex flex-1/2 items-center h-1 gap-1">
                    <div class="flex gap-2">
                      <input
                        :id="`si-cuadre-pegado-desktop-${item.id}`"
                        type="radio"
                        value="si"
                        v-model="cuadre2"
                        :disabled="pegadoGuardada"
                        @change="activarVerificacionModalPegado"
                        class="peer/si"
                        :name="`cuadre-desktop-${item.id}`"
                      />
                      <label
                        :for="`si-cuadre-pegado-desktop-${item.id}`"
                        :class="[
                          'text-sm',
                          pegadoGuardada ? 'text-gray-400' : 'peer-checked/si:text-green-600',
                        ]"
                      >
                        Sí
                      </label>

                      <input
                        :id="`no-cuadre-pegado-desktop-${item.id}`"
                        type="radio"
                        value="no"
                        v-model="cuadre2"
                        :disabled="pegadoGuardada"
                        @change="activarVerificacionModalPegado"
                        class="peer/no"
                        :name="`cuadre-desktop-${item.id}`"
                      />
                      <label
                        :for="`no-cuadre-pegado-desktop-${item.id}`"
                        :class="[
                          'text-sm',
                          pegadoGuardada ? 'text-gray-400' : 'peer-checked/no:text-red-600',
                        ]"
                      >
                        No
                      </label>
                    </div>
                  </fieldset>
                </div>

                <!-- Desgarre -->
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Desgarre</div>
                  <fieldset class="flex flex-1/2 items-center h-1 gap-1">
                    <div class="flex gap-2">
                      <input
                        :id="`si-desgarre-pegado-desktop-${item.id}`"
                        type="radio"
                        value="si"
                        v-model="desgarre"
                        :disabled="pegadoGuardada"
                        @change="activarVerificacionModalPegado"
                        class="peer/si"
                        :name="`desgarre-desktop-${item.id}`"
                      />
                      <label
                        :for="`si-desgarre-pegado-desktop-${item.id}`"
                        :class="[
                          'text-sm',
                          pegadoGuardada ? 'text-gray-400' : 'peer-checked/si:text-green-600',
                        ]"
                      >
                        Sí
                      </label>

                      <input
                        :id="`no-desgarre-pegado-desktop-${item.id}`"
                        type="radio"
                        value="no"
                        v-model="desgarre"
                        :disabled="pegadoGuardada"
                        @change="activarVerificacionModalPegado"
                        class="peer/no"
                        :name="`desgarre-desktop-${item.id}`"
                      />
                      <label
                        :for="`no-desgarre-pegado-desktop-${item.id}`"
                        :class="[
                          'text-sm',
                          pegadoGuardada ? 'text-gray-400' : 'peer-checked/no:text-red-600',
                        ]"
                      >
                        No
                      </label>
                    </div>
                  </fieldset>
                </div>

                <!-- Marcas -->
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Marcas</div>
                  <fieldset class="flex flex-1/2 items-center h-1 gap-1">
                    <div class="flex gap-2">
                      <input
                        :id="`si-marcas-pegado-desktop-${item.id}`"
                        type="radio"
                        value="si"
                        v-model="marcas2"
                        :disabled="pegadoGuardada"
                        @change="activarVerificacionModalPegado"
                        class="peer/si"
                        :name="`marcas-desktop-${item.id}`"
                      />
                      <label
                        :for="`si-marcas-pegado-desktop-${item.id}`"
                        :class="[
                          'text-sm',
                          pegadoGuardada ? 'text-gray-400' : 'peer-checked/si:text-green-600',
                        ]"
                      >
                        Sí
                      </label>

                      <input
                        :id="`no-marcas-pegado-desktop-${item.id}`"
                        type="radio"
                        value="no"
                        v-model="marcas2"
                        :disabled="pegadoGuardada"
                        @change="activarVerificacionModalPegado"
                        class="peer/no"
                        :name="`marcas-desktop-${item.id}`"
                      />
                      <label
                        :for="`no-marcas-pegado-desktop-${item.id}`"
                        :class="[
                          'text-sm',
                          pegadoGuardada ? 'text-gray-400' : 'peer-checked/no:text-red-600',
                        ]"
                      >
                        No
                      </label>
                    </div>
                  </fieldset>
                </div>

                <!-- CAMPOS CORREGIDOS PARA DESKTOP -->
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Empaque</div>
                  <input
                    type="text"
                    placeholder=""
                    :value="item.empaque"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                  />
                </div>
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Paq X</div>
                  <input
                    type="text"
                    placeholder=""
                    :value="item.paquete"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                  />
                </div>
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">CantidadxTar</div>
                  <input
                    type="number"
                    placeholder=""
                    :value="item.cantidad_tarima"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                  />
                </div>

                <!-- Autorización P.C -->
                <div
                  class="table-cell p-1 border w-[140px] h-20 border-gray-300 rounded align-middle text-center"
                >
                  <div class="text-xs font-semibold mb-1">Autorización P.C</div>
                  <button
                    type="button"
                    @click="abrirAutorizacion('pegado', 'pc')"
                    :class="[
                      'px-3 py-1 rounded text-sm mt-1 w-full',
                      autorizaciones.pegado.pc.autorizado || pegadoGuardada
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600',
                    ]"
                    :disabled="autorizaciones.pegado.pc.autorizado || pegadoGuardada"
                  >
                    {{
                      autorizaciones.pegado.pc.autorizado
                        ? '✓ Autorizado'
                        : pegadoGuardada
                          ? 'Finalizado'
                          : 'Autorizar'
                    }}
                  </button>
                  <div
                    v-if="autorizaciones.pegado.pc.autorizado"
                    class="text-xs text-green-600 mt-1"
                  >
                    {{ autorizaciones.pegado.pc.usuario }}
                  </div>
                </div>

                <!-- Entregado -->
                <div
                  class="table-cell p-1 border w-[90px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Entregado</div>
                  <input
                    type="number"
                    v-model.number="entregadoPegado"
                    :readonly="pegadoGuardada"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                    @input="activarVerificacionModalPegado"
                  />
                </div>
                <!-- Merma -->
                <div
                  class="table-cell p-1 border w-[90px] h-20 border-gray-300 rounded align-middle text-center"
                >
                  <input
                    type="number"
                    :value="cantidadRestante(entregadoPegado, cantidadPegado)"
                    readonly
                    class="border rounded px-2 py-1 text-sm w-full text-center bg-gray-50"
                    placeholder="0"
                  />
                  <div class="mt-1 text-xs text-center">
                    {{ merma(entregadoPegado, cantidadPegado) }}%
                  </div>
                </div>

                <!-- Autorización operador -->
                <div
                  class="table-cell p-1 border w-[140px] h-20 border-gray-300 rounded align-middle text-center"
                >
                  <div class="text-xs font-semibold mb-1">Autorización operador</div>
                  <button
                    type="button"
                    @click="abrirAutorizacion('pegado', 'operador')"
                    :class="[
                      'px-3 py-1 rounded text-sm mt-1 w-full',
                      autorizaciones.pegado.operador.autorizado || pegadoGuardada
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600',
                    ]"
                    :disabled="autorizaciones.pegado.operador.autorizado || pegadoGuardada"
                  >
                    {{
                      autorizaciones.pegado.operador.autorizado
                        ? '✓ Autorizado'
                        : pegadoGuardada
                          ? 'Finalizado'
                          : 'Autorizar'
                    }}
                  </button>
                  <div
                    v-if="autorizaciones.pegado.operador.autorizado"
                    class="text-xs text-green-600 mt-1"
                  >
                    {{ autorizaciones.pegado.operador.usuario }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Estado de completitud -->
            <div class="mt-6 text-center border-t pt-4">
              <!-- Mensaje de campos faltantes -->
              <div v-if="!puedeGuardarPegado && !pegadoGuardada" class="text-xs text-gray-600">
                <span class="font-medium">Faltan por completar:</span> {{ camposFaltantesPegado }}
              </div>

              <!-- Mensaje de éxito después de guardar -->
              <div v-if="pegadoGuardada" class="text-xs text-green-600 bg-green-50 p-2 rounded">
                ✅ Pegado guardado exitosamente
              </div>
            </div>
          </div>
        </fieldset>

        <!-- Modal de Confirmación Pegado -->
        <div
          v-if="mostrarModalConfirmacionPegado"
          class="fixed inset-0 bg-neutral-400/30 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-lg p-6 max-w-md w-full mx-auto shadow-xl">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-purple-100 p-2 rounded-full">
                <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Confirmar Pegado</h3>
            </div>

            <!-- Resumen de datos -->
            <div class="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg">
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Cantidad pegado:</span>
                <span class="text-sm font-semibold bg-white px-2 py-1 rounded border">{{
                  cantidadPegado || '0'
                }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Entregado:</span>
                <span class="text-sm font-semibold bg-white px-2 py-1 rounded border">{{
                  entregadoPegado || '0'
                }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Merma:</span>
                <span class="text-sm font-semibold bg-white px-2 py-1 rounded border">
                  {{ merma(entregadoPegado, cantidadPegado) }}%
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Tipo pegado:</span>
                <span class="text-sm font-semibold bg-white px-2 py-1 rounded border">
                  {{ tipoPegamento || 'No especificado' }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Cuadre:</span>
                <span
                  class="text-sm font-semibold"
                  :class="cuadre2 === 'si' ? 'text-green-600' : 'text-red-600'"
                >
                  {{ cuadre2 === 'si' ? '✅ Sí' : cuadre2 === 'no' ? '❌ No' : 'No seleccionado' }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Desgarre:</span>
                <span
                  class="text-sm font-semibold"
                  :class="desgarre === 'si' ? 'text-green-600' : 'text-red-600'"
                >
                  {{
                    desgarre === 'si' ? '✅ Sí' : desgarre === 'no' ? '❌ No' : 'No seleccionado'
                  }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Marcas:</span>
                <span
                  class="text-sm font-semibold"
                  :class="marcas2 === 'si' ? 'text-green-600' : 'text-red-600'"
                >
                  {{ marcas2 === 'si' ? '✅ Sí' : marcas2 === 'no' ? '❌ No' : 'No seleccionado' }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Autorización P.C:</span>
                <span
                  class="text-sm font-semibold text-green-600"
                  v-if="autorizaciones.pegado.pc.autorizado"
                >
                  ✅ {{ autorizaciones.pegado.pc.usuario }}
                </span>
                <span class="text-sm font-semibold text-red-600" v-else>❌ Pendiente</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-sm text-gray-600">Autorización Operador:</span>
                <span
                  class="text-sm font-semibold text-green-600"
                  v-if="autorizaciones.pegado.operador.autorizado"
                >
                  ✅ {{ autorizaciones.pegado.operador.usuario }}
                </span>
                <span class="text-sm font-semibold text-red-600" v-else>❌ Pendiente</span>
              </div>
            </div>

            <p class="text-sm text-gray-600 mb-4 text-center">
              ¿Estás seguro de que deseas guardar este proceso de pegado? Esta acción no se puede
              deshacer.
            </p>

            <div class="flex gap-3 justify-end">
              <button
                type="button"
                @click="cerrarModalConfirmacionPegado"
                class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                Cancelar
              </button>
              <button
                type="button"
                @click="guardarPegado"
                :disabled="guardandoPegado"
                :class="[
                  'px-4 py-2 text-sm text-white rounded-lg flex items-center gap-2 transition-colors font-medium',
                  guardandoPegado
                    ? 'bg-purple-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700',
                ]"
              >
                <span v-if="guardandoPegado">
                  <svg
                    class="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Guardando...
                </span>
                <span v-else class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Confirmar y Guardar
                </span>
              </button>
            </div>
          </div>
        </div>
        <!-- Armado Responsive -->
        <!-- Armado Responsive CORREGIDO -->
        <fieldset
          v-if="autorizaciones.armado.visible"
          class="border border-gray-300 rounded p-3 md:p-4 mb-4"
        >
          <div v-for="item in productos" :key="'armado-' + item.id">
            <legend class="text-xs font-semibold px-2">Armado - {{ item.nombre }}</legend>

            <div class="space-y-4 md:hidden">
              <!-- Mobile View -->
              <div class="bg-white p-3 rounded border space-y-3">
                <div>
                  <label class="text-xs font-semibold block mb-1">Cantidad armado</label>
                  <input
                    type="number"
                    v-model.number="cantidadarmado"
                    :readonly="armadoGuardada"
                    class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full bg-gray-50"
                    @input="activarVerificacionModalArmado"
                  />
                </div>

                <div>
                  <label class="text-xs font-semibold block mb-1">Cantidad entregado</label>
                  <input
                    type="number"
                    v-model.number="entregadoArmado"
                    :readonly="armadoGuardada"
                    class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full bg-gray-50"
                    @input="activarVerificacionModalArmado"
                  />
                </div>

                <!-- CAMPOS DE MERMA -->
                <div class="bg-gray-50 p-2 rounded">
                  <div class="text-xs font-semibold text-center mb-1">Merma</div>
                  <div class="text-center text-sm font-bold">
                    {{ merma(entregadoArmado, cantidadarmado) }}%
                  </div>
                  <div class="text-center text-xs">
                    Restante: {{ cantidadRestante(entregadoArmado, cantidadarmado) }}
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    @click="abrirAutorizacion('armado', 'ac')"
                    :class="[
                      'px-3 py-2 rounded text-sm w-full',
                      autorizaciones.armado.ac.autorizado || armadoGuardada
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600',
                    ]"
                    :disabled="autorizaciones.armado.ac.autorizado || armadoGuardada"
                  >
                    {{
                      autorizaciones.armado.ac.autorizado
                        ? '✓ A.C Autorizado'
                        : armadoGuardada
                          ? 'Proceso Finalizado'
                          : 'Autorizar A.C'
                    }}
                  </button>
                  <button
                    type="button"
                    @click="abrirAutorizacion('armado', 'operador')"
                    :class="[
                      'px-3 py-2 rounded text-sm w-full',
                      autorizaciones.armado.operador.autorizado || armadoGuardada
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600',
                    ]"
                    :disabled="autorizaciones.armado.operador.autorizado || armadoGuardada"
                  >
                    {{
                      autorizaciones.armado.operador.autorizado
                        ? '✓ Operador Autorizado'
                        : armadoGuardada
                          ? 'Proceso Finalizado'
                          : 'Autorizar Operador'
                    }}
                  </button>
                </div>
                <div
                  v-if="autorizaciones.armado.ac.autorizado"
                  class="text-xs text-green-600 text-center"
                >
                  A.C: {{ autorizaciones.armado.ac.usuario }}
                </div>
                <div
                  v-if="autorizaciones.armado.operador.autorizado"
                  class="text-xs text-green-600 text-center"
                >
                  Operador: {{ autorizaciones.armado.operador.usuario }}
                </div>
              </div>
            </div>

            <!-- Desktop View -->
            <div class="hidden md:table w-full border-separate border-spacing-2 table-fixed">
              <div class="table-row">
                <!-- Cantidad armado -->
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Cantidad</div>
                  <input
                    type="number"
                    v-model.number="cantidadarmado"
                    :readonly="armadoGuardada"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                    @input="activarVerificacionModalArmado"
                  />
                </div>

                <!-- Autorización A.C -->
                <div
                  class="table-cell p-1 border w-[140px] h-20 border-gray-300 rounded align-middle text-center"
                >
                  <div class="text-xs font-semibold mb-1">Autorización A.C</div>
                  <button
                    type="button"
                    @click="abrirAutorizacion('armado', 'ac')"
                    :class="[
                      'px-3 py-1 rounded text-sm mt-1 w-full',
                      autorizaciones.armado.ac.autorizado || armadoGuardada
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600',
                    ]"
                    :disabled="autorizaciones.armado.ac.autorizado || armadoGuardada"
                  >
                    {{
                      autorizaciones.armado.ac.autorizado
                        ? '✓ Autorizado'
                        : armadoGuardada
                          ? 'Finalizado'
                          : 'Autorizar'
                    }}
                  </button>
                  <div
                    v-if="autorizaciones.armado.ac.autorizado"
                    class="text-xs text-green-600 mt-1"
                  >
                    {{ autorizaciones.armado.ac.usuario }}
                  </div>
                </div>

                <!-- Cantidad entregado -->
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Cantidad entregado</div>
                  <input
                    type="number"
                    v-model.number="entregadoArmado"
                    :readonly="armadoGuardada"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                    @input="activarVerificacionModalArmado"
                  />
                </div>

                <!-- Merma -->
                <div
                  class="table-cell p-1 border w-[90px] h-20 border-gray-300 rounded align-middle text-center"
                >
                  <input
                    type="number"
                    :value="cantidadRestante(entregadoArmado, cantidadarmado)"
                    readonly
                    class="border rounded px-2 py-1 text-sm w-full text-center bg-gray-50"
                    placeholder="0"
                  />
                  <div class="mt-1 text-xs text-center">
                    {{ merma(entregadoArmado, cantidadarmado) }}%
                  </div>
                </div>

                <!-- Autorización operador -->
                <div
                  class="table-cell p-1 border w-[140px] h-20 border-gray-300 rounded align-middle text-center"
                >
                  <div class="text-xs font-semibold mb-1">Autorización operador</div>
                  <button
                    type="button"
                    @click="abrirAutorizacion('armado', 'operador')"
                    :class="[
                      'px-3 py-1 rounded text-sm mt-1 w-full',
                      autorizaciones.armado.operador.autorizado || armadoGuardada
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600',
                    ]"
                    :disabled="autorizaciones.armado.operador.autorizado || armadoGuardada"
                  >
                    {{
                      autorizaciones.armado.operador.autorizado
                        ? '✓ Autorizado'
                        : armadoGuardada
                          ? 'Finalizado'
                          : 'Autorizar'
                    }}
                  </button>
                  <div
                    v-if="autorizaciones.armado.operador.autorizado"
                    class="text-xs text-green-600 mt-1"
                  >
                    {{ autorizaciones.armado.operador.usuario }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Estado de completitud -->
            <div class="mt-6 text-center border-t pt-4">
              <!-- Mensaje de campos faltantes -->
              <div v-if="!puedeGuardarArmado && !armadoGuardada" class="text-xs text-gray-600">
                <span class="font-medium">Faltan por completar:</span> {{ camposFaltantesArmado }}
              </div>

              <!-- Mensaje de éxito después de guardar -->
              <div v-if="armadoGuardada" class="text-xs text-green-600 bg-green-50 p-2 rounded">
                ✅ Armado guardado exitosamente
              </div>
            </div>
          </div>
        </fieldset>
        <!-- Modal de Confirmación Armado -->
        <div
          v-if="mostrarModalConfirmacionArmado"
          class="fixed inset-0 bg-neutral-400/30 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-lg p-6 max-w-md w-full mx-auto shadow-xl">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-purple-100 p-2 rounded-full">
                <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Confirmar Armado</h3>
            </div>

            <!-- Resumen de datos -->
            <div class="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg">
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Cantidad armado:</span>
                <span class="text-sm font-semibold bg-white px-2 py-1 rounded border">{{
                  cantidadarmado || '0'
                }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Entregado:</span>
                <span class="text-sm font-semibold bg-white px-2 py-1 rounded border">{{
                  entregadoArmado || '0'
                }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Merma:</span>
                <span class="text-sm font-semibold bg-white px-2 py-1 rounded border">
                  {{ merma(entregadoArmado, cantidadarmado) }}%
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Autorización A.C:</span>
                <span
                  class="text-sm font-semibold text-green-600"
                  v-if="autorizaciones.armado.ac.autorizado"
                >
                  ✅ {{ autorizaciones.armado.ac.usuario }}
                </span>
                <span class="text-sm font-semibold text-red-600" v-else>❌ Pendiente</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-sm text-gray-600">Autorización Operador:</span>
                <span
                  class="text-sm font-semibold text-green-600"
                  v-if="autorizaciones.armado.operador.autorizado"
                >
                  ✅ {{ autorizaciones.armado.operador.usuario }}
                </span>
                <span class="text-sm font-semibold text-red-600" v-else>❌ Pendiente</span>
              </div>
            </div>

            <p class="text-sm text-gray-600 mb-4 text-center">
              ¿Estás seguro de que deseas guardar este proceso de armado? Esta acción no se puede
              deshacer.
            </p>

            <div class="flex gap-3 justify-end">
              <button
                type="button"
                @click="cerrarModalConfirmacionArmado"
                class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                Cancelar
              </button>
              <button
                type="button"
                @click="guardarArmado"
                :disabled="guardandoArmado"
                :class="[
                  'px-4 py-2 text-sm text-white rounded-lg flex items-center gap-2 transition-colors font-medium',
                  guardandoArmado
                    ? 'bg-purple-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700',
                ]"
              >
                <span v-if="guardandoArmado">
                  <svg
                    class="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Guardando...
                </span>
                <span v-else class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Confirmar y Guardar
                </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Almacén Responsive CORREGIDO -->
        <fieldset
          v-if="autorizaciones.almacen.visible"
          class="border border-gray-300 rounded p-4 md:p-4 mb-4 bg-white"
        >
          <div v-for="item in productos" :key="'almacen-' + item.id">
            <legend class="text-xs font-semibold px-2 flex items-center gap-2">
              Almacén - {{ item.nombre }}
            </legend>

            <!-- Mobile View -->
            <div class="space-y-4 md:hidden">
              <div class="bg-white p-3 rounded border border-gray-300 space-y-3">
                <!-- Cantidad Entregada -->
                <div>
                  <label class="text-xs font-semibold block mb-1">Cantidad entregada</label>
                  <input
                    type="number"
                    v-model.number="cantidadAlmacen"
                    :readonly="almacenGuardada"
                    class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full bg-gray-50"
                    @input="onAlmacenChange"
                  />
                </div>

                <!-- Cantidad por Tarima (solo lectura) -->
                <div>
                  <label class="text-xs font-semibold block mb-1">Cantidad por Tarima</label>
                  <input
                    type="number"
                    :value="item.cantidad_tarima"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full bg-gray-50"
                  />
                </div>

                <!-- Información de Tarimas Calculadas -->
                <div
                  v-if="tarimasCalculadas.length > 0"
                  class="bg-gray-50 p-3 rounded border border-gray-300"
                >
                  <div class="text-xs font-semibold text-center mb-2">Distribución en Tarimas</div>
                  <div class="grid grid-cols-3 gap-1 mb-2">
                    <div
                      v-for="(tarima, index) in tarimasCalculadas"
                      :key="index"
                      class="bg-white p-1 rounded border border-gray-300 text-center"
                    >
                      <div class="text-[10px] text-gray-500">T{{ index + 1 }}</div>
                      <div class="text-xs font-bold text-gray-700">
                        {{ tarima }}/{{ item.cantidad_tarima }}
                      </div>
                    </div>
                  </div>
                  <div class="text-center text-xs text-gray-600">
                    Total: {{ totalCalculado }} unidades
                  </div>
                </div>

                <!-- Empaquetado -->
                <div>
                  <label class="text-xs font-semibold block mb-2">Empaquetado</label>
                  <div class="grid grid-cols-2 gap-2">
                    <label
                      class="flex items-center gap-2 p-2 bg-white rounded border border-gray-300 cursor-pointer"
                      :class="
                        empaquetadoSeleccionado === 'paq1' ? 'border-blue-500 bg-blue-50' : ''
                      "
                    >
                      <input
                        type="radio"
                        v-model="empaquetadoSeleccionado"
                        value="paq1"
                        :disabled="almacenGuardada"
                        class="w-4 h-4"
                        @change="onAlmacenChange"
                      />
                      <span class="text-sm text-gray-700">Paq</span>
                    </label>
                    <label
                      class="flex items-center gap-2 p-2 bg-white rounded border border-gray-300 cursor-pointer"
                      :class="empaquetadoSeleccionado === 'tar' ? 'border-blue-500 bg-blue-50' : ''"
                    >
                      <input
                        type="radio"
                        v-model="empaquetadoSeleccionado"
                        value="tar"
                        :disabled="almacenGuardada"
                        class="w-4 h-4"
                        @change="onAlmacenChange"
                      />
                      <span class="text-sm text-gray-700">Tar</span>
                    </label>
                    <label
                      class="flex items-center gap-2 p-2 bg-white rounded border border-gray-300 cursor-pointer"
                      :class="
                        empaquetadoSeleccionado === 'paq2' ? 'border-blue-500 bg-blue-50' : ''
                      "
                    >
                      <input
                        type="radio"
                        v-model="empaquetadoSeleccionado"
                        value="paq2"
                        :disabled="almacenGuardada"
                        class="w-4 h-4"
                        @change="onAlmacenChange"
                      />
                      <span class="text-sm text-gray-700">Bul</span>
                    </label>
                    <label
                      class="flex items-center gap-2 p-2 bg-white rounded border border-gray-300 cursor-pointer"
                      :class="
                        empaquetadoSeleccionado === 'paq3' ? 'border-blue-500 bg-blue-50' : ''
                      "
                    >
                      <input
                        type="radio"
                        v-model="empaquetadoSeleccionado"
                        value="paq3"
                        :disabled="almacenGuardada"
                        class="w-4 h-4"
                        @change="onAlmacenChange"
                      />
                      <span class="text-sm text-gray-700">Ata</span>
                    </label>
                  </div>
                </div>

                <!-- Botón de autorización para móvil -->
                <div class="text-center">
                  <div class="text-xs font-semibold mb-1">Autorización Almacén</div>
                  <button
                    type="button"
                    @click="abrirAutorizacion('almacen', 'operador')"
                    :class="[
                      'px-3 py-2 rounded text-sm w-full',
                      autorizaciones.almacen.operador.autorizado || almacenGuardada
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600',
                    ]"
                    :disabled="autorizaciones.almacen.operador.autorizado || almacenGuardada"
                  >
                    {{
                      autorizaciones.almacen.operador.autorizado
                        ? '✓ Autorizado'
                        : almacenGuardada
                          ? 'Proceso Finalizado'
                          : 'Autorizar Almacén'
                    }}
                  </button>
                  <div
                    v-if="autorizaciones.almacen.operador.autorizado"
                    class="text-xs text-green-600 mt-1"
                  >
                    {{ autorizaciones.almacen.operador.usuario }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Desktop View -->
            <div class="hidden md:table w-full border-separate border-spacing-2 table-fixed">
              <div class="table-row">
                <!-- Cantidad Entregada -->
                <div
                  class="table-cell p-1 border w-[100px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Cantidad</div>
                  <input
                    type="number"
                    v-model.number="cantidadAlmacen"
                    :readonly="almacenGuardada"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                    @input="onAlmacenChange"
                  />
                </div>

                <!-- Cantidad por Tarima -->
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Cantidad x Tar</div>
                  <input
                    type="number"
                    :value="item.cantidad_tarima"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50 text-center"
                  />
                </div>

                <!-- Empaquetado -->
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Empaquetado</div>
                  <div
                    class="flex flex-row justify-center items-center gap-2 text-xs font-semibold"
                  >
                    <label class="flex items-center gap-1">
                      <input
                        type="radio"
                        v-model="empaquetadoSeleccionado"
                        value="paq1"
                        :disabled="almacenGuardada"
                        @change="onAlmacenChange"
                      />
                      <span class="text-gray-700">Paq</span>
                    </label>
                    <label class="flex items-center gap-1">
                      <input
                        type="radio"
                        v-model="empaquetadoSeleccionado"
                        value="tar"
                        :disabled="almacenGuardada"
                        @change="onAlmacenChange"
                      />
                      <span class="text-gray-700">Tar</span>
                    </label>
                    <label class="flex items-center gap-1">
                      <input
                        type="radio"
                        v-model="empaquetadoSeleccionado"
                        value="paq2"
                        :disabled="almacenGuardada"
                        @change="onAlmacenChange"
                      />
                      <span class="text-gray-700">Bul</span>
                    </label>
                    <label class="flex items-center gap-1">
                      <input
                        type="radio"
                        v-model="empaquetadoSeleccionado"
                        value="paq3"
                        :disabled="almacenGuardada"
                        @change="onAlmacenChange"
                      />
                      <span class="text-gray-700">Ata</span>
                    </label>
                  </div>
                </div>

                <!-- Inventario con Tarimas -->
                <div class="table-cell p-1 border border-gray-300 rounded align-middle">
                  <div class="text-xs font-semibold text-center mb-1">Ubicación de Tarimas</div>
                  <div class="max-h-32 overflow-y-auto">
                    <table class="table-auto w-full border-collapse">
                      <thead>
                        <tr>
                          <th
                            v-for="(tarima, index) in tarimasCalculadas.slice(0, 10)"
                            :key="index"
                            class="px-1 py-1"
                          >
                            <div class="text-[10px] font-semibold text-gray-600 mb-1">
                              T{{ index + 1 }}
                            </div>
                            <input
                              type="number"
                              :value="tarima"
                              readonly
                              class="w-12 mx-auto text-center border border-gray-300 rounded px-1 py-1 text-xs bg-gray-50 font-semibold"
                            />
                          </th>
                          <th
                            v-for="n in 10 - Math.min(tarimasCalculadas.length, 10)"
                            :key="'empty-' + n"
                            class="px-1 py-1"
                          >
                            <div class="text-[10px] font-semibold text-gray-400 mb-1">-</div>
                            <input
                              type="number"
                              value=""
                              readonly
                              class="w-12 mx-auto text-center border border-gray-300 rounded px-1 py-1 text-xs bg-gray-50 text-gray-400"
                              placeholder="-"
                            />
                          </th>
                        </tr>
                        <tr>
                          <th
                            v-for="(tarima, index) in tarimasCalculadas.slice(10, 20)"
                            :key="index + 10"
                            class="px-1 py-1"
                          >
                            <div class="text-[10px] font-semibold text-gray-600 mb-1">
                              T{{ index + 11 }}
                            </div>
                            <input
                              type="number"
                              :value="tarima"
                              readonly
                              class="w-12 mx-auto text-center border border-gray-300 rounded px-1 py-1 text-xs bg-gray-50 font-semibold"
                            />
                          </th>
                          <th
                            v-for="n in 10 -
                            Math.min(Math.max(tarimasCalculadas.length - 10, 0), 10)"
                            :key="'empty2-' + n"
                            class="px-1 py-1"
                          >
                            <div class="text-[10px] font-semibold text-gray-400 mb-1">-</div>
                            <input
                              type="number"
                              value=""
                              readonly
                              class="w-12 mx-auto text-center border border-gray-300 rounded px-1 py-1 text-xs bg-gray-50 text-gray-400"
                              placeholder="-"
                            />
                          </th>
                        </tr>
                        <!-- Filas adicionales para más de 20 tarimas -->
                        <template v-if="tarimasCalculadas.length > 20">
                          <tr
                            v-for="(fila, filaIndex) in filasAdicionales"
                            :key="'fila-' + filaIndex"
                          >
                            <th
                              v-for="(tarima, index) in fila"
                              :key="'tarima-' + (filaIndex * 10 + index + 21)"
                              class="px-1 py-1"
                            >
                              <div class="text-[10px] font-semibold text-gray-600 mb-1">
                                T{{ filaIndex * 10 + index + 21 }}
                              </div>
                              <input
                                type="number"
                                :value="tarima"
                                readonly
                                class="w-12 mx-auto text-center border border-gray-300 rounded px-1 py-1 text-xs bg-gray-50 font-semibold"
                              />
                            </th>
                            <th
                              v-for="n in 10 - fila.length"
                              :key="'empty-adicional-' + n"
                              class="px-1 py-1"
                            >
                              <div class="text-[10px] font-semibold text-gray-400 mb-1">-</div>
                              <input
                                type="number"
                                value=""
                                readonly
                                class="w-12 mx-auto text-center border border-gray-300 rounded px-1 py-1 text-xs bg-gray-50 text-gray-400"
                                placeholder="-"
                              />
                            </th>
                          </tr>
                        </template>
                      </thead>
                    </table>
                  </div>
                  <!-- Indicador de scroll si hay muchas tarimas -->
                  <div v-if="tarimasCalculadas.length > 20" class="text-center mt-1">
                    <span class="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {{ tarimasCalculadas.length }} tarimas totales - Desplaza para ver más
                    </span>
                  </div>
                </div>

                <!-- Botón de autorización corregido para almacén -->
                <div
                  class="table-cell p-1 border w-[140px] h-20 border-gray-300 rounded align-middle text-center"
                >
                  <div class="text-xs font-semibold mb-1">Autorización Almacén</div>
                  <button
                    type="button"
                    @click="abrirAutorizacion('almacen', 'operador')"
                    :class="[
                      'px-3 py-1 rounded text-sm mt-1 w-full',
                      autorizaciones.almacen.operador.autorizado || almacenGuardada
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600',
                    ]"
                    :disabled="autorizaciones.almacen.operador.autorizado || almacenGuardada"
                  >
                    {{
                      autorizaciones.almacen.operador.autorizado
                        ? '✓ Autorizado'
                        : almacenGuardada
                          ? 'Finalizado'
                          : 'Autorizar'
                    }}
                  </button>
                  <div
                    v-if="autorizaciones.almacen.operador.autorizado"
                    class="text-xs text-green-600 mt-1"
                  >
                    {{ autorizaciones.almacen.operador.usuario }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Información adicional -->
            <div v-if="tarimasCalculadas.length > 0" class="mt-3 text-center">
              <div
                class="inline-flex items-center bg-gray-50 border border-gray-300 rounded px-3 py-1"
              >
                <span class="text-gray-600 text-xs">
                  Capacidad por tarima: {{ item.cantidad_tarima }} unidades • Total tarimas:
                  {{ tarimasCalculadas.length }}
                </span>
              </div>
            </div>

            <!-- Estado de completitud -->
            <div class="mt-6 text-center border-t pt-4">
              <!-- Mensaje de campos faltantes -->
              <div v-if="!puedeGuardarAlmacen && !almacenGuardada" class="text-xs text-gray-600">
                <span class="font-medium">Faltan por completar:</span> {{ camposFaltantesAlmacen }}
              </div>

              <!-- Mensaje de éxito después de guardar -->
              <div v-if="almacenGuardada" class="text-xs text-green-600 bg-green-50 p-2 rounded">
                ✅ Almacén guardado exitosamente
              </div>
            </div>
          </div>
        </fieldset>
        <!-- Modal de Confirmación Almacén -->
        <div
          v-if="mostrarModalConfirmacionAlmacen"
          class="fixed inset-0 bg-neutral-400/30 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-lg p-6 max-w-md w-full mx-auto shadow-xl">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-blue-100 p-2 rounded-full">
                <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Confirmar Almacén</h3>
            </div>

            <!-- Resumen de datos -->
            <div class="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg">
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Cantidad entregada:</span>
                <span class="text-sm font-semibold bg-white px-2 py-1 rounded border">{{
                  cantidadAlmacen || '0'
                }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Total tarimas:</span>
                <span class="text-sm font-semibold bg-white px-2 py-1 rounded border">
                  {{ tarimasCalculadas.length }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Empaquetado:</span>
                <span class="text-sm font-semibold bg-white px-2 py-1 rounded border">
                  {{ obtenerTextoEmpaquetado(empaquetadoSeleccionado) }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-sm text-gray-600">Autorización Operador:</span>
                <span
                  class="text-sm font-semibold text-green-600"
                  v-if="autorizaciones.almacen.operador.autorizado"
                >
                  ✅ {{ autorizaciones.almacen.operador.usuario }}
                </span>
                <span class="text-sm font-semibold text-red-600" v-else>❌ Pendiente</span>
              </div>
            </div>

            <!-- Detalle de tarimas -->
            <div v-if="tarimasCalculadas.length > 0" class="mb-4">
              <div class="text-xs font-semibold text-gray-600 mb-2">Detalle de tarimas:</div>
              <div class="bg-white border border-gray-200 rounded p-3 max-h-32 overflow-y-auto">
                <div class="grid grid-cols-4 gap-2 text-xs">
                  <div
                    v-for="(tarima, index) in tarimasCalculadas"
                    :key="index"
                    class="text-center p-1 bg-gray-50 rounded border"
                  >
                    <div class="font-semibold">T{{ index + 1 }}</div>
                    <div>{{ tarima }}/{{ productos[0]?.cantidad_tarima }}</div>
                  </div>
                </div>
              </div>
            </div>

            <p class="text-sm text-gray-600 mb-4 text-center">
              ¿Estás seguro de que deseas guardar este proceso de almacén? Esta acción no se puede
              deshacer.
            </p>

            <div class="flex gap-3 justify-end">
              <button
                type="button"
                @click="cerrarModalConfirmacionAlmacen"
                class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                Cancelar
              </button>
              <button
                type="button"
                @click="guardarAlmacen"
                :disabled="guardandoAlmacen"
                :class="[
                  'px-4 py-2 text-sm text-white rounded-lg flex items-center gap-2 transition-colors font-medium',
                  guardandoAlmacen
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700',
                ]"
              >
                <span v-if="guardandoAlmacen">
                  <svg
                    class="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Guardando...
                </span>
                <span v-else class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Confirmar y Guardar
                </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Calidad Responsive CORREGIDO -->
        <fieldset
          v-if="autorizaciones.calidad.visible"
          class="border border-gray-300 rounded p-3 md:p-4 mb-4"
        >
          <div v-for="item in productos" :key="'calidad-' + item.id">
            <legend class="text-xs font-semibold px-2">Calidad - {{ item.nombre }}</legend>

            <div class="space-y-4 md:hidden">
              <!-- Mobile View -->
              <div class="bg-white p-3 rounded border space-y-3">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="text-xs font-semibold block mb-2">Certificado</label>
                    <div class="flex gap-4">
                      <label class="flex items-center gap-1">
                        <input
                          type="radio"
                          value="si"
                          v-model="certificado"
                          :disabled="calidadGuardada"
                          @change="activarVerificacionModalCalidad"
                          class="w-4 h-4"
                          :name="`certificado-mobile-${item.id}`"
                        />
                        <span class="text-sm">Sí</span>
                      </label>
                      <label class="flex items-center gap-1">
                        <input
                          type="radio"
                          value="no"
                          v-model="certificado"
                          :disabled="calidadGuardada"
                          @change="activarVerificacionModalCalidad"
                          class="w-4 h-4"
                          :name="`certificado-mobile-${item.id}`"
                        />
                        <span class="text-sm">No</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label class="text-xs font-semibold block mb-2">Etiquetas</label>
                    <div class="flex gap-4">
                      <label class="flex items-center gap-1">
                        <input
                          type="radio"
                          value="si"
                          v-model="etiquetas"
                          :disabled="calidadGuardada"
                          @change="activarVerificacionModalCalidad"
                          class="w-4 h-4"
                          :name="`etiquetas-mobile-${item.id}`"
                        />
                        <span class="text-sm">Sí</span>
                      </label>
                      <label class="flex items-center gap-1">
                        <input
                          type="radio"
                          value="no"
                          v-model="etiquetas"
                          :disabled="calidadGuardada"
                          @change="activarVerificacionModalCalidad"
                          class="w-4 h-4"
                          :name="`etiquetas-mobile-${item.id}`"
                        />
                        <span class="text-sm">No</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="text-xs font-semibold block mb-2">Revisión</label>
                  <div class="flex gap-4">
                    <label class="flex items-center gap-1">
                      <input
                        type="radio"
                        value="si"
                        v-model="revision"
                        :disabled="calidadGuardada"
                        @change="activarVerificacionModalCalidad"
                        class="w-4 h-4"
                        :name="`revision-mobile-${item.id}`"
                      />
                      <span class="text-sm">Sí</span>
                    </label>
                    <label class="flex items-center gap-1">
                      <input
                        type="radio"
                        value="no"
                        v-model="revision"
                        :disabled="calidadGuardada"
                        @change="activarVerificacionModalCalidad"
                        class="w-4 h-4"
                        :name="`revision-mobile-${item.id}`"
                      />
                      <span class="text-sm">No</span>
                    </label>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    @click="abrirAutorizacion('calidad', 'ec')"
                    :class="[
                      'px-3 py-2 rounded text-sm w-full',
                      autorizaciones.calidad.ec.autorizado || calidadGuardada
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600',
                    ]"
                    :disabled="autorizaciones.calidad.ec.autorizado || calidadGuardada"
                  >
                    {{
                      autorizaciones.calidad.ec.autorizado
                        ? '✓ E.C Autorizado'
                        : calidadGuardada
                          ? 'Proceso Finalizado'
                          : 'Autorizar E.C'
                    }}
                  </button>
                  <button
                    type="button"
                    @click="abrirAutorizacion('calidad', 'ea')"
                    :class="[
                      'px-3 py-2 rounded text-sm w-full',
                      autorizaciones.calidad.ea.autorizado || calidadGuardada
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600',
                    ]"
                    :disabled="autorizaciones.calidad.ea.autorizado || calidadGuardada"
                  >
                    {{
                      autorizaciones.calidad.ea.autorizado
                        ? '✓ E.A Autorizado'
                        : calidadGuardada
                          ? 'Proceso Finalizado'
                          : 'Autorizar E.A'
                    }}
                  </button>
                </div>
                <div
                  v-if="autorizaciones.calidad.ec.autorizado"
                  class="text-xs text-green-600 text-center"
                >
                  E.C: {{ autorizaciones.calidad.ec.usuario }}
                </div>
                <div
                  v-if="autorizaciones.calidad.ea.autorizado"
                  class="text-xs text-green-600 text-center"
                >
                  E.A: {{ autorizaciones.calidad.ea.usuario }}
                </div>
              </div>
            </div>

            <!-- Desktop View -->
            <div class="hidden md:table w-full border-separate border-spacing-2 table-fixed">
              <div class="table-row">
                <!-- Certificado -->
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Certificado</div>
                  <fieldset class="flex flex-1/2 items-center h-1 gap-1">
                    <div class="flex gap-2">
                      <input
                        :id="`si-certificado-desktop-${item.id}`"
                        type="radio"
                        value="si"
                        v-model="certificado"
                        :disabled="calidadGuardada"
                        @change="activarVerificacionModalCalidad"
                        class="peer/si"
                        :name="`certificado-desktop-${item.id}`"
                      />
                      <label
                        :for="`si-certificado-desktop-${item.id}`"
                        :class="[
                          'text-sm',
                          calidadGuardada ? 'text-gray-400' : 'peer-checked/si:text-green-600',
                        ]"
                      >
                        Sí
                      </label>

                      <input
                        :id="`no-certificado-desktop-${item.id}`"
                        type="radio"
                        value="no"
                        v-model="certificado"
                        :disabled="calidadGuardada"
                        @change="activarVerificacionModalCalidad"
                        class="peer/no"
                        :name="`certificado-desktop-${item.id}`"
                      />
                      <label
                        :for="`no-certificado-desktop-${item.id}`"
                        :class="[
                          'text-sm',
                          calidadGuardada ? 'text-gray-400' : 'peer-checked/no:text-red-600',
                        ]"
                      >
                        No
                      </label>
                    </div>
                  </fieldset>
                </div>

                <!-- Etiquetas -->
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Etiquetas</div>
                  <fieldset class="flex flex-1/2 items-center h-1 gap-1">
                    <div class="flex gap-2">
                      <input
                        :id="`si-etiquetas-desktop-${item.id}`"
                        type="radio"
                        value="si"
                        v-model="etiquetas"
                        :disabled="calidadGuardada"
                        @change="activarVerificacionModalCalidad"
                        class="peer/si"
                        :name="`etiquetas-desktop-${item.id}`"
                      />
                      <label
                        :for="`si-etiquetas-desktop-${item.id}`"
                        :class="[
                          'text-sm',
                          calidadGuardada ? 'text-gray-400' : 'peer-checked/si:text-green-600',
                        ]"
                      >
                        Sí
                      </label>

                      <input
                        :id="`no-etiquetas-desktop-${item.id}`"
                        type="radio"
                        value="no"
                        v-model="etiquetas"
                        :disabled="calidadGuardada"
                        @change="activarVerificacionModalCalidad"
                        class="peer/no"
                        :name="`etiquetas-desktop-${item.id}`"
                      />
                      <label
                        :for="`no-etiquetas-desktop-${item.id}`"
                        :class="[
                          'text-sm',
                          calidadGuardada ? 'text-gray-400' : 'peer-checked/no:text-red-600',
                        ]"
                      >
                        No
                      </label>
                    </div>
                  </fieldset>
                </div>

                <!-- Revisión -->
                <div
                  class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
                >
                  <div class="text-center text-xs font-semibold mb-1">Revisión</div>
                  <fieldset class="flex flex-1/2 items-center h-1 gap-1">
                    <div class="flex gap-2">
                      <input
                        :id="`si-revision-desktop-${item.id}`"
                        type="radio"
                        value="si"
                        v-model="revision"
                        :disabled="calidadGuardada"
                        @change="activarVerificacionModalCalidad"
                        class="peer/si"
                        :name="`revision-desktop-${item.id}`"
                      />
                      <label
                        :for="`si-revision-desktop-${item.id}`"
                        :class="[
                          'text-sm',
                          calidadGuardada ? 'text-gray-400' : 'peer-checked/si:text-green-600',
                        ]"
                      >
                        Sí
                      </label>

                      <input
                        :id="`no-revision-desktop-${item.id}`"
                        type="radio"
                        value="no"
                        v-model="revision"
                        :disabled="calidadGuardada"
                        @change="activarVerificacionModalCalidad"
                        class="peer/no"
                        :name="`revision-desktop-${item.id}`"
                      />
                      <label
                        :for="`no-revision-desktop-${item.id}`"
                        :class="[
                          'text-sm',
                          calidadGuardada ? 'text-gray-400' : 'peer-checked/no:text-red-600',
                        ]"
                      >
                        No
                      </label>
                    </div>
                  </fieldset>
                </div>

                <!-- Autorización E.C -->
                <div
                  class="table-cell p-1 border w-[140px] h-20 border-gray-300 rounded align-middle text-center"
                >
                  <div class="text-xs font-semibold mb-1">Autorización E.C</div>
                  <button
                    type="button"
                    @click="abrirAutorizacion('calidad', 'ec')"
                    :class="[
                      'px-3 py-1 rounded text-sm mt-1 w-full',
                      autorizaciones.calidad.ec.autorizado || calidadGuardada
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600',
                    ]"
                    :disabled="autorizaciones.calidad.ec.autorizado || calidadGuardada"
                  >
                    {{
                      autorizaciones.calidad.ec.autorizado
                        ? '✓ Autorizado'
                        : calidadGuardada
                          ? 'Finalizado'
                          : 'Autorizar'
                    }}
                  </button>
                  <div
                    v-if="autorizaciones.calidad.ec.autorizado"
                    class="text-xs text-green-600 mt-1"
                  >
                    {{ autorizaciones.calidad.ec.usuario }}
                  </div>
                </div>

                <!-- Autorización E.A -->
                <div
                  class="table-cell p-1 border w-[140px] h-20 border-gray-300 rounded align-middle text-center"
                >
                  <div class="text-xs font-semibold mb-1">Autorización E.A</div>
                  <button
                    type="button"
                    @click="abrirAutorizacion('calidad', 'ea')"
                    :class="[
                      'px-3 py-1 rounded text-sm mt-1 w-full',
                      autorizaciones.calidad.ea.autorizado || calidadGuardada
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600',
                    ]"
                    :disabled="autorizaciones.calidad.ea.autorizado || calidadGuardada"
                  >
                    {{
                      autorizaciones.calidad.ea.autorizado
                        ? '✓ Autorizado'
                        : calidadGuardada
                          ? 'Finalizado'
                          : 'Autorizar'
                    }}
                  </button>
                  <div
                    v-if="autorizaciones.calidad.ea.autorizado"
                    class="text-xs text-green-600 mt-1"
                  >
                    {{ autorizaciones.calidad.ea.usuario }}
                  </div>
                </div>

                <!-- Botón 1 - Certificado PDF -->
                <div
                  class="table-cell p-1 border w-[140px] h-20 border-gray-300 rounded align-middle text-center"
                >
                  <div class="text-xs font-semibold mb-1">Certificado</div>
                  <button
                    type="button"
                    @click="generarPdfCertificado"
                    :disabled="certificado !== 'si' || calidadGuardada"
                    :class="[
                      'px-3 py-1 rounded text-sm mt-1 w-full transition-colors',
                      certificado === 'si' && !calidadGuardada
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed',
                    ]"
                  >
                    📄 PDF
                  </button>
                  <div v-if="certificado !== 'si'" class="text-xs text-gray-500 mt-1">
                    Selecciona "Sí"
                  </div>
                </div>

                <!-- Botón 2 - Etiquetas PDF -->
                <div
                  class="table-cell p-1 border w-[140px] h-20 border-gray-300 rounded align-middle text-center"
                >
                  <div class="text-xs font-semibold mb-1">Etiquetas</div>
                  <button
                    type="button"
                    @click="generarPDF"
                    :class="[
                      'px-3 py-1 rounded text-sm mt-1 w-full transition-colors',
                      'bg-purple-500 text-white hover:bg-purple-600',
                    ]"
                  >
                    🏷️ PDF
                  </button>
                </div>
              </div>
            </div>

            <!-- Estado de completitud -->
            <div class="mt-6 text-center border-t pt-4">
              <!-- Mensaje de campos faltantes -->
              <div v-if="!puedeGuardarCalidad && !calidadGuardada" class="text-xs text-gray-600">
                <span class="font-medium">Faltan por completar:</span> {{ camposFaltantesCalidad }}
              </div>

              <!-- Mensaje de éxito después de guardar -->
              <div v-if="calidadGuardada" class="text-xs text-green-600 bg-green-50 p-2 rounded">
                ✅ Calidad guardada exitosamente
              </div>
            </div>
          </div>
        </fieldset>

        <!-- Modal de Confirmación Calidad -->
        <div
          v-if="mostrarModalConfirmacionCalidad"
          class="fixed inset-0 bg-neutral-400/30 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-lg p-6 max-w-md w-full mx-auto shadow-xl">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-orange-100 p-2 rounded-full">
                <svg class="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Confirmar Calidad</h3>
            </div>

            <!-- Resumen de datos -->
            <div class="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg">
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Certificado:</span>
                <span
                  class="text-sm font-semibold"
                  :class="certificado === 'si' ? 'text-green-600' : 'text-red-600'"
                >
                  {{
                    certificado === 'si'
                      ? '✅ Sí'
                      : certificado === 'no'
                        ? '❌ No'
                        : 'No seleccionado'
                  }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Etiquetas:</span>
                <span
                  class="text-sm font-semibold"
                  :class="etiquetas === 'si' ? 'text-green-600' : 'text-red-600'"
                >
                  {{
                    etiquetas === 'si' ? '✅ Sí' : etiquetas === 'no' ? '❌ No' : 'No seleccionado'
                  }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Revisión:</span>
                <span
                  class="text-sm font-semibold"
                  :class="revision === 'si' ? 'text-green-600' : 'text-red-600'"
                >
                  {{
                    revision === 'si' ? '✅ Sí' : revision === 'no' ? '❌ No' : 'No seleccionado'
                  }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Autorización E.C:</span>
                <span
                  class="text-sm font-semibold text-green-600"
                  v-if="autorizaciones.calidad.ec.autorizado"
                >
                  ✅ {{ autorizaciones.calidad.ec.usuario }}
                </span>
                <span class="text-sm font-semibold text-red-600" v-else>❌ Pendiente</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-sm text-gray-600">Autorización E.A:</span>
                <span
                  class="text-sm font-semibold text-green-600"
                  v-if="autorizaciones.calidad.ea.autorizado"
                >
                  ✅ {{ autorizaciones.calidad.ea.usuario }}
                </span>
                <span class="text-sm font-semibold text-red-600" v-else>❌ Pendiente</span>
              </div>
            </div>

            <p class="text-sm text-gray-600 mb-4 text-center">
              ¿Estás seguro de que deseas guardar este proceso de calidad? Esta acción no se puede
              deshacer.
            </p>

            <div class="flex gap-3 justify-end">
              <button
                type="button"
                @click="cerrarModalConfirmacionCalidad"
                class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                Cancelar
              </button>
              <button
                type="button"
                @click="guardarCalidad"
                :disabled="guardandoCalidad"
                :class="[
                  'px-4 py-2 text-sm text-white rounded-lg flex items-center gap-2 transition-colors font-medium',
                  guardandoCalidad
                    ? 'bg-orange-400 cursor-not-allowed'
                    : 'bg-orange-600 hover:bg-orange-700',
                ]"
              >
                <span v-if="guardandoCalidad">
                  <svg
                    class="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Guardando...
                </span>
                <span v-else class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Confirmar y Guardar
                </span>
              </button>
            </div>
          </div>
        </div>
        <!-- Envío Responsive -->

        <fieldset
          v-if="autorizaciones.envio.visible"
          class="border border-gray-300 rounded p-3 md:p-4 mb-4"
        >
          <legend class="text-xs font-semibold px-2">Envío</legend>

          <div class="space-y-4 md:hidden">
            <!-- Mobile View -->
            <div class="bg-white p-3 rounded border space-y-3">
              <div>
                <label class="text-xs font-semibold block mb-1">Vehículo</label>
                <select
                  v-model="datosEnvio.vehiculo"
                  :disabled="envioGuardada"
                  class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full bg-white leading-tight"
                >
                  <option value="">Seleccionar vehículo</option>
                  <option value="Toyota ABC-1234">Toyota ABC-1234</option>
                  <option value="Ford XYZ-5678">Ford XYZ-5678</option>
                  <option value="Honda LMN-9012">Honda LMN-9012</option>
                </select>
              </div>

              <div>
                <label class="text-xs font-semibold block mb-1">Operador</label>
                <select
                  v-model="datosEnvio.operadorId"
                  :disabled="envioGuardada"
                  class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full bg-white leading-tight"
                >
                  <option value="">Seleccionar operador</option>
                  <option value="1">Francisco</option>
                  <option value="2">Rogelio</option>
                  <option value="3">Alberto</option>
                </select>
              </div>

              <div>
                <label class="text-xs font-semibold block mb-1">Entregado</label>
                <input
                  type="number"
                  v-model.number="entregadoEnvio"
                  :disabled="envioGuardada"
                  class="border border-gray-300 rounded-md px-2 py-2 text-sm w-full bg-gray-50"
                />
              </div>

              <div class="bg-gray-50 p-2 rounded">
                <div class="text-xs font-semibold text-center mb-1">Merma</div>
                <div class="text-center text-sm font-bold">
                  {{ merma(entregadoEnvio, cantidadRecepcion) }}%
                </div>
                <div class="text-center text-xs">
                  Restante: {{ cantidadRestante(entregadoEnvio, cantidadRecepcion) }}
                </div>
              </div>

              <!-- Autorizaciones Mobile -->
              <div class="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  @click="abrirAutorizacion('envio', 'operador')"
                  :class="[
                    'px-3 py-2 rounded text-sm w-full',
                    autorizaciones.envio.operador.autorizado || envioGuardada
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600',
                  ]"
                  :disabled="autorizaciones.envio.operador.autorizado || envioGuardada"
                >
                  {{
                    autorizaciones.envio.operador.autorizado
                      ? '✓ Operador Autorizado'
                      : envioGuardada
                        ? 'Proceso Finalizado'
                        : 'Autorizar Operador'
                  }}
                </button>
                <button
                  type="button"
                  @click="abrirAutorizacion('envio', 'supervisor')"
                  :class="[
                    'px-3 py-2 rounded text-sm w-full',
                    autorizaciones.envio.supervisor.autorizado || envioGuardada
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600',
                  ]"
                  :disabled="autorizaciones.envio.supervisor.autorizado || envioGuardada"
                >
                  {{
                    autorizaciones.envio.supervisor.autorizado
                      ? '✓ Supervisor Autorizado'
                      : envioGuardada
                        ? 'Proceso Finalizado'
                        : 'Autorizar Supervisor'
                  }}
                </button>
              </div>

              <div
                v-if="autorizaciones.envio.operador.autorizado"
                class="text-xs text-green-600 text-center"
              >
                Operador: {{ autorizaciones.envio.operador.usuario }}
              </div>
              <div
                v-if="autorizaciones.envio.supervisor.autorizado"
                class="text-xs text-green-600 text-center"
              >
                Supervisor: {{ autorizaciones.envio.supervisor.usuario }}
              </div>

              <div>
                <label class="text-xs font-semibold mb-1 block">Observaciones</label>
                <textarea
                  v-model="datosEnvio.observaciones"
                  :disabled="envioGuardada"
                  class="border border-gray-300 rounded-md px-2 py-2 h-20 text-sm w-full bg-white leading-tight"
                  placeholder="Escribe tus observaciones aquí..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Desktop View -->
          <div class="hidden md:table w-full border-separate border-spacing-1">
            <div class="table-row">
              <!-- Vehículo -->
              <div
                class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
              >
                <div class="text-center text-xs font-semibold mb-1">Vehículo</div>
                <select
                  v-model="datosEnvio.vehiculo"
                  :disabled="envioGuardada"
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full bg-white leading-tight"
                >
                  <option value="">Seleccionar</option>
                  <option value="Toyota ABC-1234">Toyota ABC-1234</option>
                  <option value="Ford XYZ-5678">Ford XYZ-5678</option>
                  <option value="Honda LMN-9012">Honda LMN-9012</option>
                </select>
              </div>

              <!-- Operador -->
              <!-- Operador -->
              <div
                class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
              >
                <div class="text-center text-xs font-semibold mb-1">Operador</div>

                <!-- Select para elegir chofer existente -->
                <select
                  v-model="datosEnvio.operadorId"
                  :disabled="envioGuardada"
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full bg-white leading-tight"
                  @change="onOperadorChange"
                >
                  <option value="">Seleccionar</option>
                  <option v-for="chofer in choferes" :key="chofer.id" :value="chofer.id">
                    {{ chofer.nombre }} {{ chofer.apellido }}
                  </option>
                  <option value="custom">+ Agregar nuevo</option>
                </select>

                <!-- Input para nombre personalizado -->
                <input
                  v-if="datosEnvio.operadorId === 'custom'"
                  v-model="datosEnvio.operadorPersonalizado"
                  :disabled="envioGuardada"
                  placeholder="Nombre del operador"
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full mt-1"
                  @blur="guardarOperadorPersonalizado"
                  @input="activarVerificacionModalEnvio"
                />

                <!-- Loading state -->
                <div v-if="loadingChoferes" class="text-xs text-gray-500 mt-1">
                  Cargando choferes...
                </div>
              </div>

              <!-- Entregado -->
              <div
                class="table-cell p-1 border w-[100px] h-20 border-gray-300 rounded align-middle"
              >
                <div class="text-center text-xs font-semibold mb-1">Entregado</div>
                <input
                  type="number"
                  v-model.number="entregadoEnvio"
                  :disabled="envioGuardada"
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                />
              </div>

              <!-- Merma y Restante -->
              <div
                class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle text-center"
              >
                <div class="text-xs font-semibold mb-1">Merma</div>
                <div class="text-sm font-bold text-red-600">
                  {{ merma(entregadoEnvio, cantidadRecepcion) }}%
                </div>
                <div class="text-xs text-gray-600 mt-1">
                  Restante: {{ cantidadRestante(entregadoEnvio, cantidadRecepcion) }}
                </div>
              </div>

              <!-- Autorización Operador -->
              <div
                class="table-cell p-1 border w-[140px] h-20 border-gray-300 rounded align-middle text-center"
              >
                <div class="text-xs font-semibold mb-1">Autorización Operador</div>
                <button
                  type="button"
                  @click="abrirAutorizacion('envio', 'operador')"
                  :class="[
                    'px-3 py-1 rounded text-sm mt-1 w-full',
                    autorizaciones.envio.operador.autorizado || envioGuardada
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600',
                  ]"
                  :disabled="autorizaciones.envio.operador.autorizado || envioGuardada"
                >
                  {{
                    autorizaciones.envio.operador.autorizado
                      ? '✓ Autorizado'
                      : envioGuardada
                        ? 'Finalizado'
                        : 'Autorizar'
                  }}
                </button>
                <div
                  v-if="autorizaciones.envio.operador.autorizado"
                  class="text-xs text-green-600 mt-1"
                >
                  {{ autorizaciones.envio.operador.usuario }}
                </div>
              </div>

              <!-- Autorización Supervisor -->
              <div
                class="table-cell p-1 border w-[140px] h-20 border-gray-300 rounded align-middle text-center"
              >
                <div class="text-xs font-semibold mb-1">Autorización Supervisor</div>
                <button
                  type="button"
                  @click="abrirAutorizacion('envio', 'supervisor')"
                  :class="[
                    'px-3 py-1 rounded text-sm mt-1 w-full',
                    autorizaciones.envio.supervisor.autorizado || envioGuardada
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600',
                  ]"
                  :disabled="autorizaciones.envio.supervisor.autorizado || envioGuardada"
                >
                  {{
                    autorizaciones.envio.supervisor.autorizado
                      ? '✓ Autorizado'
                      : envioGuardada
                        ? 'Finalizado'
                        : 'Autorizar'
                  }}
                </button>
                <div
                  v-if="autorizaciones.envio.supervisor.autorizado"
                  class="text-xs text-green-600 mt-1"
                >
                  {{ autorizaciones.envio.supervisor.usuario }}
                </div>
              </div>
            </div>
          </div>

          <!-- Observaciones Desktop -->
          <div class="hidden md:block mt-4">
            <label class="text-xs font-semibold mb-1 block">Observaciones</label>
            <textarea
              v-model="datosEnvio.observaciones"
              :disabled="envioGuardada"
              class="border border-gray-300 rounded-md px-2 py-1 h-24 text-sm w-full bg-white leading-tight"
              placeholder="Escribe tus observaciones aquí..."
            ></textarea>
          </div>

          <!-- Estado de completitud -->
          <div class="mt-4 text-center border-t pt-4">
            <!-- Mensaje de campos faltantes -->
            <div v-if="!puedeGuardarEnvio && !envioGuardada" class="text-xs text-gray-600">
              <span class="font-medium">Faltan por completar:</span> {{ camposFaltantesEnvio }}
            </div>

            <!-- ELIMINADO: Botón Guardar Envío - El modal se activa automáticamente -->

            <!-- Mensaje de éxito después de guardar -->
            <div v-if="envioGuardada" class="text-xs text-green-600 bg-green-50 p-2 rounded">
              ✅ Envío guardado exitosamente
            </div>
          </div>
        </fieldset>

        <!-- Modal de Confirmación Envío -->
        <!-- Modal de Confirmación Envío -->
        <div
          v-if="mostrarModalConfirmacionEnvioState"
          class="fixed inset-0 bg-neutral-400/30 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-lg p-6 max-w-md w-full mx-auto shadow-xl">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-orange-100 p-2 rounded-full">
                <svg class="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Confirmar Envío</h3>
            </div>

            <!-- Resumen de datos -->
            <div class="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg">
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Vehículo:</span>
                <span class="text-sm font-semibold text-green-600">
                  {{ datosEnvio.vehiculo || 'No seleccionado' }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Operador:</span>
                <span class="text-sm font-semibold text-green-600">
                  {{ obtenerNombreOperador(datosEnvio.operadorId) || 'No seleccionado' }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Entregado:</span>
                <span class="text-sm font-semibold text-green-600">
                  {{ entregadoEnvio }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Merma:</span>
                <span class="text-sm font-semibold text-red-600">
                  {{ merma(entregadoEnvio, cantidadRecepcion) }}%
                </span>
              </div>

              <!-- Campo de Observaciones agregado -->
              <div class="flex flex-col py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600 mb-1">Observaciones:</span>
                <span
                  class="text-sm font-semibold text-gray-700 bg-white p-2 rounded border min-h-[60px]"
                >
                  {{ datosEnvio.observaciones || 'Sin observaciones' }}
                </span>
              </div>

              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Autorización Operador:</span>
                <span
                  class="text-sm font-semibold text-green-600"
                  v-if="autorizaciones.envio.operador.autorizado"
                >
                  ✅ {{ autorizaciones.envio.operador.usuario }}
                </span>
                <span class="text-sm font-semibold text-red-600" v-else>❌ Pendiente</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-sm text-gray-600">Autorización Supervisor:</span>
                <span
                  class="text-sm font-semibold text-green-600"
                  v-if="autorizaciones.envio.supervisor.autorizado"
                >
                  ✅ {{ autorizaciones.envio.supervisor.usuario }}
                </span>
                <span class="text-sm font-semibold text-red-600" v-else>❌ Pendiente</span>
              </div>
            </div>

            <p class="text-sm text-gray-600 mb-4 text-center">
              ¿Estás seguro de que deseas guardar este proceso de envío? Esta acción no se puede
              deshacer.
            </p>

            <div class="flex gap-3 justify-end">
              <button
                type="button"
                @click="cerrarModalConfirmacionEnvio"
                class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                Cancelar
              </button>
              <button
                type="button"
                @click="guardarEnvio"
                :disabled="guardandoEnvioState"
                :class="[
                  'px-4 py-2 text-sm text-white rounded-lg flex items-center gap-2 transition-colors font-medium',
                  guardandoEnvioState
                    ? 'bg-orange-400 cursor-not-allowed'
                    : 'bg-orange-600 hover:bg-orange-700',
                ]"
              >
                <span v-if="guardandoEnvioState">
                  <svg
                    class="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Guardando...
                </span>
                <span v-else class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Confirmar y Guardar
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>

  <!-- Modal Responsive -->
  <div
    v-if="modalAbierto"
    class="fixed inset-0 bg-neutral-400/30 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm border">
      <h2 class="text-center font-semibold mb-4 text-base">Validar empleado</h2>

      <input
        v-model="numEmpleado"
        type="text"
        placeholder="Número de empleado"
        class="w-full border px-3 py-2 mb-3 rounded text-sm"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Contraseña"
        class="w-full border px-3 py-2 mb-4 rounded text-sm"
      />

      <div class="flex justify-end gap-3">
        <button @click="cerrarModal" class="px-4 py-2 bg-gray-300 rounded text-sm">Cancelar</button>
        <button @click="confirmarRegistro" class="px-4 py-2 bg-blue-500 text-white rounded text-sm">
          Aceptar
        </button>
      </div>
    </div>
  </div>
  <!-- Sistema de Alertas Personalizadas -->
  <!-- Sistema de Alertas Personalizadas -->
  <div id="alert-container" class="fixed top-0 end-0 p-3" style="z-index: 1055; position: fixed">
    <div
      v-if="mostrarAlertaPersonalizada"
      class="alert d-flex align-items-center fade show shadow-sm"
      :class="{
        'alert-danger': tipoAlerta === 'danger',
        'alert-success': tipoAlerta === 'success',
        'alert-warning': tipoAlerta === 'warning',
        'alert-primary': tipoAlerta === 'primary',
      }"
      role="alert"
      style="min-width: 400px"
    >
      <svg class="bi flex-shrink-0 me-2" width="24" height="24">
        <use
          :xlink:href="
            tipoAlerta === 'success'
              ? '#check-circle-fill'
              : tipoAlerta === 'warning'
                ? '#exclamation-triangle-fill'
                : tipoAlerta === 'primary'
                  ? '#info-fill'
                  : '#exclamation-triangle-fill'
          "
        ></use>
      </svg>
      <div class="flex-grow-1">
        {{ mensajeAlerta }}
      </div>
      <button
        type="button"
        class="btn-close ms-2"
        @click="mostrarAlertaPersonalizada = false"
        aria-label="Close"
      ></button>
    </div>
  </div>

  <!-- SVG Symbols (igual que en pedidos) -->
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
    <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75
         0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75
         0 0 0-1.06 1.06L6.97 11.03a.75.75
         0 0 0 1.079-.02l3.992-4.99a.75.75
         0 0 0-.01-1.05z"
      />
    </symbol>
    <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
      <path
        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1
         4.705c-.07.34.029.533.304.533.194 0
         .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703
         0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381
         2.29-.287zM8 5.5a1 1 0 1 1 0-2
         1 1 0 0 1 0 2z"
      />
    </symbol>
    <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path
        d="M8.982 1.566a1.13 1.13
         0 0 0-1.96 0L.165 13.233c-.457.778.091
         1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982
         1.566zM8 5c.535 0 .954.462.9.995l-.35
         3.507a.552.552 0 0 1-1.1
         0L7.1 5.995A.905.905 0 0 1 8
         5zm.002 6a1 1 0 1 1 0
         2 1 1 0 0 1 0-2z"
      />
    </symbol>
  </svg>
</template>
<!-- ======================================================================================================================================== -->
<script setup>
import { jsPDF } from 'jspdf'
import { ref, onMounted, computed, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import VueEasyLightbox from 'vue-easy-lightbox'

const route = useRoute()
const productos = ref([])
const pedidoId = ref('')
const loading = ref(false)
const error = ref('')
const no_orden = ref('')
// 🔥 VARIABLES PARA IMÁGENES
const imagenes = ref({
  imagen_final: null,
  imagen: null,
  imagen_suaje: null,
})
const lightboxVisible = ref(false)
const lightboxIndex = ref(0)
const lightboxImages = ref([])

// 🔄 VARIABLES PARA OPERADORES (Choferes)
const choferes = ref([])
const loadingChoferes = ref(false)

// 🔄 CONSTANTES MEJORADAS PARA PERSISTENCIA
const STORAGE_KEYS = {
  RECEPCION: `recepcion_${route.params.id}_v2`,
  IMPRESION: `impresion_${route.params.id}_v2`,
  SUAJE: `suaje_${route.params.id}_v2`,
  PEGADO: `pegado_${route.params.id}_v2`,
  ARMADO: `armado_${route.params.id}_v2`,
  ALMACEN: `almacen_${route.params.id}_v2`,
  CALIDAD: `calidad_${route.params.id}_v2`,
  ENVIO: `envio_${route.params.id}_v2`,
  AUTORIZACIONES: `autorizaciones_${route.params.id}_v2`,
  DATOS_FORMULARIOS: `datos_formularios_${route.params.id}_v2`,
  TIMESTAMP: `timestamp_${route.params.id}_v2`,
}

// 🔄 VARIABLE PARA CONTROLAR SINCRONIZACIÓN
let modoSincronizacion = false

// 🔄 FUNCIONES DE PERSISTENCIA MEJORADAS (EVITANDO RECURSIVIDAD)
// 🔄 FUNCIONES DE PERSISTENCIA MEJORADAS - VERSIÓN ROBUSTA
const guardarEnLocalStorage = (clave, datos, esSincronizacion = false) => {
  try {
    // 🔥 VALIDACIÓN CRÍTICA: Asegurar que los datos tengan estructura correcta
    let datosValidados = datos

    // Si es un proceso (recepcion, impresion, etc.), forzar estructura completa
    if (
      clave.includes('recepcion_') ||
      clave.includes('impresion_') ||
      clave.includes('suaje_') ||
      clave.includes('pegado_') ||
      clave.includes('armado_') ||
      clave.includes('almacen_') ||
      clave.includes('calidad_') ||
      clave.includes('envio_')
    ) {
      // Si es solo un boolean, convertirlo a estructura completa
      if (datos === true || datos === false) {
        datosValidados = {
          datosFormularios: obtenerDatosFormulariosCompletos(),
          autorizaciones: { ...autorizaciones.value },
          estadoProceso: datos,
          timestamp: new Date().getTime(),
          datosBD: null,
          pedidoId: pedidoId.value,
          no_orden: no_orden.value,
          version: '3.0', // ← NUEVA VERSIÓN
        }
        console.log(`🔄 Convertido ${clave} de boolean a estructura completa`)
      }

      // Si ya es objeto pero le faltan campos críticos, completarlos
      else if (typeof datos === 'object' && datos !== null) {
        datosValidados = {
          datosFormularios: datos.datosFormularios || obtenerDatosFormulariosCompletos(),
          autorizaciones: datos.autorizaciones || { ...autorizaciones.value },
          estadoProceso: datos.estadoProceso !== undefined ? datos.estadoProceso : true,
          timestamp: datos.timestamp || new Date().getTime(),
          datosBD: datos.datosBD || null,
          pedidoId: datos.pedidoId || pedidoId.value,
          no_orden: datos.no_orden || no_orden.value,
          version: datos.version || '3.0',
        }

        if (!datos.datosFormularios) {
          console.log(`🔄 Completados datosFormularios faltantes en ${clave}`)
        }
      }
    }

    const datosConTimestamp = {
      ...datosValidados,
      _timestamp: new Date().getTime(),
      _version: '3.0', // ← VERSIÓN ACTUAL
      _source: esSincronizacion ? 'sync' : 'local',
    }

    // 🔥 VALIDACIÓN FINAL: Verificar que los datos sean válidos
    if (!datosConTimestamp._timestamp) {
      throw new Error('Timestamp inválido')
    }

    const datosString = JSON.stringify(datosConTimestamp)

    // Verificar que el JSON sea válido
    JSON.parse(datosString)

    localStorage.setItem(clave, datosString)
    sessionStorage.setItem(clave, datosString)

    console.log(`💾 GUARDADO ROBUSTO en ${clave}:`, {
      tieneDatosFormularios: !!datosConTimestamp.datosFormularios,
      estadoProceso: datosConTimestamp.estadoProceso,
      version: datosConTimestamp._version,
    })

    // Solo disparar evento si no es sincronización
    if (!esSincronizacion && !modoSincronizacion) {
      const storageEvent = new StorageEvent('storage', {
        key: clave,
        newValue: datosString,
        oldValue: localStorage.getItem(clave),
        url: window.location.href,
        storageArea: localStorage,
      })
      window.dispatchEvent(storageEvent)
    }
  } catch (error) {
    console.error(`❌ ERROR CRÍTICO al guardar en ${clave}:`, error)

    // 🔥 ESTRATEGIA DE FALLBACK: Guardar como estructura básica
    try {
      const datosFallback = {
        datosFormularios: obtenerDatosFormulariosCompletos(),
        estadoProceso: true,
        timestamp: new Date().getTime(),
        pedidoId: pedidoId.value,
        no_orden: no_orden.value,
        version: '3.0-fallback',
        error: error.message,
      }

      localStorage.setItem(clave, JSON.stringify(datosFallback))
      console.log(`🔄 Guardado fallback en ${clave}`)
    } catch (fallbackError) {
      console.error(`❌ FALLBACK TAMBIÉN FALLÓ para ${clave}:`, fallbackError)
    }
  }
}
const cargarDeLocalStorage = (clave, valorPorDefecto = null) => {
  try {
    // Intentar primero con localStorage
    let datos = localStorage.getItem(clave)

    // Si no hay datos en localStorage, intentar con sessionStorage
    if (!datos) {
      datos = sessionStorage.getItem(clave)
      if (datos) {
        console.log(`🔄 Cargando desde sessionStorage: ${clave}`)
      }
    }

    if (datos) {
      const parsed = JSON.parse(datos)
      // Verificar si los datos son muy antiguos (más de 24 horas)
      const timestamp = parsed._timestamp || 0
      const ahora = new Date().getTime()
      const veinticuatroHoras = 24 * 60 * 60 * 1000

      if (ahora - timestamp > veinticuatroHoras) {
        console.log(`🕐 Datos muy antiguos en ${clave}, usando valores por defecto`)
        return valorPorDefecto
      }

      // Remover metadatos antes de retornar
      const datosLimpios = { ...parsed }
      delete datosLimpios._timestamp
      delete datosLimpios._version
      delete datosLimpios._source
      return datosLimpios
    }

    return valorPorDefecto
  } catch (error) {
    console.error('❌ Error al cargar de almacenamiento:', error)
    return valorPorDefecto
  }
}

// 🔄 FUNCIÓN PARA VERIFICAR Y SINCRONIZAR DATOS
// 🔄 FUNCIÓN PARA VERIFICAR Y SINCRONIZAR DATOS
const verificarYSincronizarDatos = () => {
  console.log('🔄 Verificando y sincronizando datos...')

  const claves = Object.values(STORAGE_KEYS)
  let datosCargados = false

  claves.forEach((clave) => {
    const datos = localStorage.getItem(clave) || sessionStorage.getItem(clave)
    if (datos) {
      datosCargados = true
      console.log(`✅ Datos encontrados en ${clave}`)
    }
  })

  if (!datosCargados) {
    console.log('⚠️ No se encontraron datos guardados, iniciando con valores por defecto')
  }
}

// 🔄 SISTEMA DE BACKUP MEJORADO
const hacerBackupCompleto = () => {
  const backup = {}

  Object.keys(STORAGE_KEYS).forEach((key) => {
    const claveCompleta = STORAGE_KEYS[key]
    const datos = localStorage.getItem(claveCompleta) || sessionStorage.getItem(claveCompleta)
    if (datos) {
      backup[claveCompleta] = datos
    }
  })

  // Guardar backup en un solo item
  localStorage.setItem(`backup_${pedidoId.value}`, JSON.stringify(backup))
  sessionStorage.setItem(`backup_${pedidoId.value}`, JSON.stringify(backup))

  console.log('💾 Backup completo guardado')
}

const restaurarBackup = () => {
  try {
    const backup =
      localStorage.getItem(`backup_${pedidoId.value}`) ||
      sessionStorage.getItem(`backup_${pedidoId.value}`)

    if (backup) {
      const datosBackup = JSON.parse(backup)

      Object.keys(datosBackup).forEach((clave) => {
        localStorage.setItem(clave, datosBackup[clave])
        sessionStorage.setItem(clave, datosBackup[clave])
      })

      console.log('🔄 Backup restaurado exitosamente')
      location.reload() // Recargar para aplicar los cambios
    } else {
      console.log('❌ No se encontró backup para restaurar')
      mostrarAlerta('warning', 'No se encontró backup para restaurar')
    }
  } catch (error) {
    console.error('❌ Error al restaurar backup:', error)
    mostrarAlerta('danger', 'Error al restaurar backup')
  }
}

const configurarSincronizacionEntrePestanas = () => {
  window.addEventListener('storage', (event) => {
    if (
      event.key &&
      (event.key.startsWith('recepcion_') ||
        event.key.startsWith('impresion_') ||
        event.key.startsWith('suaje_') ||
        event.key.startsWith('pegado_') ||
        event.key.startsWith('armado_') ||
        event.key.startsWith('almacen_') ||
        event.key.startsWith('calidad_') ||
        event.key.startsWith('envio_') ||
        event.key.startsWith('autorizaciones_') ||
        event.key.startsWith('datos_formularios_') ||
        event.key === `backup_${pedidoId.value}`)
    ) {
      // 🔥 EVITAR PROCESAR NUESTROS PROPIOS EVENTOS
      if (event.newValue) {
        try {
          const datos = JSON.parse(event.newValue)
          if (datos._source === 'local') {
            console.log('🔄 Ignorando evento storage propio')
            return
          }
        } catch (e) {
          // Ignorar errores de parsing
          console.log('⚠️ Error al parsear datos de storage:', e)
        }
      }

      console.log('🔄 Cambio detectado en otra pestaña/dispositivo:', event.key)

      // Verificar si el cambio viene de otro dispositivo (diferente URL)
      const esDeOtroDispositivo = event.url && event.url !== window.location.href

      if (esDeOtroDispositivo) {
        console.log('📱 Cambio detectado desde otro dispositivo:', event.url)
        mostrarAlerta('info', 'Se detectaron cambios desde otro dispositivo. Sincronizando...')
      } else {
        console.log('📑 Cambio detectado en otra pestaña')
        mostrarAlerta('info', 'Se detectaron cambios en otra pestaña. Sincronizando...')
      }

      // Procesar el cambio específico
      procesarCambioSincronizado(event.key, event.newValue)
    }
  })
}

// 🔄 FUNCIÓN PARA PROCESAR CAMBIOS SINCRONIZADOS (EVITANDO RECURSIVIDAD)
const procesarCambioSincronizado = (clave, nuevoValor) => {
  try {
    if (!nuevoValor) return

    const datos = JSON.parse(nuevoValor)

    // 🔥 EVITAR PROCESAR NUESTROS PROPIOS CAMBIOS
    if (datos._source === 'local') {
      console.log(`🔄 Ignorando cambio propio para: ${clave}`)
      return
    }

    console.log(`🔄 Procesando cambio sincronizado para: ${clave}`, datos)

    // Remover metadatos
    const datosLimpios = { ...datos }
    delete datosLimpios._timestamp
    delete datosLimpios._version
    delete datosLimpios._source

    // ⚠️ ACTIVAR MODO SINCRONIZACIÓN PARA EVITAR RECURSIVIDAD
    modoSincronizacion = true

    // Actualizar el estado correspondiente según la clave
    if (clave === STORAGE_KEYS.RECEPCION) {
      recepcionGuardada.value = datosLimpios
    } else if (clave === STORAGE_KEYS.IMPRESION) {
      impresionGuardada.value = datosLimpios
    } else if (clave === STORAGE_KEYS.SUAJE) {
      suajeGuardada.value = datosLimpios
    } else if (clave === STORAGE_KEYS.PEGADO) {
      pegadoGuardada.value = datosLimpios
    } else if (clave === STORAGE_KEYS.ARMADO) {
      armadoGuardada.value = datosLimpios
    } else if (clave === STORAGE_KEYS.ALMACEN) {
      almacenGuardada.value = datosLimpios
    } else if (clave === STORAGE_KEYS.CALIDAD) {
      calidadGuardada.value = datosLimpios
    } else if (clave === STORAGE_KEYS.ENVIO) {
      envioGuardada.value = datosLimpios
    } else if (clave === STORAGE_KEYS.AUTORIZACIONES) {
      Object.assign(autorizaciones.value, datosLimpios)
    } else if (clave === STORAGE_KEYS.DATOS_FORMULARIOS) {
      // Actualizar datos de formularios SIN disparar watchers
      actualizarDatosFormulariosSincronizados(datosLimpios)
    }

    console.log(`✅ Cambio sincronizado aplicado: ${clave}`)

    // DESACTIVAR MODO SINCRONIZACIÓN después de un breve delay
    setTimeout(() => {
      modoSincronizacion = false
      console.log('🔔 Modo sincronización desactivado')
    }, 100)

    // Recalcular tarimas si es necesario
    if (clave === STORAGE_KEYS.DATOS_FORMULARIOS || clave === STORAGE_KEYS.ALMACEN) {
      setTimeout(() => {
        calcularTarimas()
      }, 100)
    }
  } catch (error) {
    console.error(`❌ Error al procesar cambio sincronizado para ${clave}:`, error)
    // Asegurarse de desactivar el modo sincronización incluso en caso de error
    modoSincronizacion = false
  }
}

// 🔄 FUNCIÓN PARA ACTUALIZAR DATOS DE FORMULARIOS SIN DISPARAR WATCHERS
const actualizarDatosFormulariosSincronizados = (datosLimpios) => {
  // Usar asignación directa para evitar reactividad
  if (datosLimpios.produccionRecepcionInput !== undefined)
    produccionRecepcionInput.value = datosLimpios.produccionRecepcionInput
  if (datosLimpios.cantidadRecepcion !== undefined)
    cantidadRecepcion.value = datosLimpios.cantidadRecepcion
  if (datosLimpios.cantidadImpresion !== undefined)
    cantidadImpresion.value = datosLimpios.cantidadImpresion
  if (datosLimpios.entregadoImpresion !== undefined)
    entregadoImpresion.value = datosLimpios.entregadoImpresion
  if (datosLimpios.cantidadSuaje !== undefined) cantidadSuaje.value = datosLimpios.cantidadSuaje
  if (datosLimpios.entregadoSuaje !== undefined) entregadoSuaje.value = datosLimpios.entregadoSuaje
  if (datosLimpios.cantidadPegado !== undefined) cantidadPegado.value = datosLimpios.cantidadPegado
  if (datosLimpios.entregadoPegado !== undefined)
    entregadoPegado.value = datosLimpios.entregadoPegado
  if (datosLimpios.tipoPegamento !== undefined) tipoPegamento.value = datosLimpios.tipoPegamento
  if (datosLimpios.cuadre2 !== undefined) cuadre2.value = datosLimpios.cuadre2
  if (datosLimpios.desgarre !== undefined) desgarre.value = datosLimpios.desgarre
  if (datosLimpios.marcas2 !== undefined) marcas2.value = datosLimpios.marcas2
  if (datosLimpios.cantidadarmado !== undefined) cantidadarmado.value = datosLimpios.cantidadarmado
  if (datosLimpios.entregadoArmado !== undefined)
    entregadoArmado.value = datosLimpios.entregadoArmado
  if (datosLimpios.cantidadAlmacen !== undefined)
    cantidadAlmacen.value = datosLimpios.cantidadAlmacen
  if (datosLimpios.empaquetadoSeleccionado !== undefined)
    empaquetadoSeleccionado.value = datosLimpios.empaquetadoSeleccionado
  if (datosLimpios.certificado !== undefined) certificado.value = datosLimpios.certificado
  if (datosLimpios.etiquetas !== undefined) etiquetas.value = datosLimpios.etiquetas
  if (datosLimpios.revision !== undefined) revision.value = datosLimpios.revision
  if (datosLimpios.entregadoEnvio !== undefined) entregadoEnvio.value = datosLimpios.entregadoEnvio

  // Actualizar objetos reactivos de forma controlada
  if (datosLimpios.datosRecepcion) {
    Object.keys(datosLimpios.datosRecepcion).forEach((key) => {
      datosRecepcion[key] = datosLimpios.datosRecepcion[key]
    })
  }
  if (datosLimpios.datosImpresion) {
    Object.keys(datosLimpios.datosImpresion).forEach((key) => {
      datosImpresion[key] = datosLimpios.datosImpresion[key]
    })
  }
  if (datosLimpios.datosSuaje) {
    Object.keys(datosLimpios.datosSuaje).forEach((key) => {
      datosSuaje[key] = datosLimpios.datosSuaje[key]
    })
  }
  if (datosLimpios.datosEnvio) {
    Object.keys(datosLimpios.datosEnvio).forEach((key) => {
      datosEnvio[key] = datosLimpios.datosEnvio[key]
    })
  }
}

// 🔄 FUNCIONES NUEVAS MEJORADAS PARA GUARDADO COMPLETO
// 🔄 FUNCIÓN MEJORADA PARA OBTENER TODOS LOS DATOS DE FORMULARIOS
const obtenerDatosFormulariosCompletos = () => {
  return {
    produccionRecepcionInput: produccionRecepcionInput.value,
    cantidadRecepcion: cantidadRecepcion.value,
    cantidadImpresion: cantidadImpresion.value,
    entregadoImpresion: entregadoImpresion.value,
    cantidadSuaje: cantidadSuaje.value,
    entregadoSuaje: entregadoSuaje.value,
    cantidadPegado: cantidadPegado.value,
    entregadoPegado: entregadoPegado.value,
    tipoPegamento: tipoPegamento.value,
    cuadre2: cuadre2.value,
    desgarre: desgarre.value,
    marcas2: marcas2.value,
    cantidadarmado: cantidadarmado.value,
    entregadoArmado: entregadoArmado.value,
    cantidadAlmacen: cantidadAlmacen.value,
    empaquetadoSeleccionado: empaquetadoSeleccionado.value,
    certificado: certificado.value,
    etiquetas: etiquetas.value,
    revision: revision.value,
    entregadoEnvio: entregadoEnvio.value,
    datosRecepcion: { ...datosRecepcion },
    datosImpresion: { ...datosImpresion },
    datosSuaje: { ...datosSuaje },
    datosEnvio: { ...datosEnvio },
  }
}

// 🔄 FUNCIÓN PARA GUARDADO COMPLETO (BD + LOCALSTORAGE)
const guardarProcesoCompleto = async (proceso, datosBD, claveStorage) => {
  try {
    console.log(`💾 Iniciando guardado completo para ${proceso}`)

    // 1. PRIMERO: Guardar en Base de Datos
    console.log('📤 Guardando en BD:', datosBD)

    let respuesta
    switch (proceso) {
      case 'recepcion':
        respuesta = await axios.post('http://localhost:3000/api/recepcion/insertar', datosBD)
        break
      case 'impresion':
        respuesta = await axios.post('http://localhost:3000/api/impresion/insertar', datosBD)
        break
      case 'suaje':
        respuesta = await axios.post('http://localhost:3000/api/procesosuaje/insertar', datosBD)
        break
      case 'pegado':
        respuesta = await axios.post('http://localhost:3000/api/pegado/insertar', datosBD)
        break
      case 'armado':
        respuesta = await axios.post('http://localhost:3000/api/armado/insertar', datosBD)
        break
      case 'almacen':
        respuesta = await axios.post('http://localhost:3000/api/procesoalmacen/insertar', datosBD)
        break
      case 'calidad':
        respuesta = await axios.post('http://localhost:3000/api/calidad/insertar', datosBD)
        break
      case 'envio':
        respuesta = await axios.post('http://localhost:3000/api/envio/insertar', datosBD)
        break
    }

    // 2. ACTUALIZAR ESTADO LOCAL
    switch (proceso) {
      case 'recepcion':
        recepcionGuardada.value = true
        break
      case 'impresion':
        impresionGuardada.value = true
        break
      case 'suaje':
        suajeGuardada.value = true
        break
      case 'pegado':
        pegadoGuardada.value = true
        break
      case 'armado':
        armadoGuardada.value = true
        break
      case 'almacen':
        almacenGuardada.value = true
        break
      case 'calidad':
        calidadGuardada.value = true
        break
      case 'envio':
        envioGuardada.value = true
        break
    }

    // 3. FINALMENTE: Guardar en localStorage CON TODOS LOS DATOS
    const datosCompletosStorage = {
      datosFormularios: obtenerDatosFormulariosCompletos(),
      autorizaciones: { ...autorizaciones.value },
      estadoProceso: true,
      timestamp: new Date().getTime(),
      datosBD: datosBD, // ← Guardamos también los datos que se enviaron a BD
    }

    guardarEnLocalStorage(claveStorage, datosCompletosStorage)

    console.log(`✅ ${proceso} guardado exitosamente en BD y localStorage`)
    return respuesta
  } catch (error) {
    console.error(`❌ Error en guardado completo de ${proceso}:`, error)
    throw error
  }
}

// 🔄 FUNCIÓN PARA CARGAR DATOS PERSISTIDOS MEJORADA
const cargarDatosPersistidos = () => {
  console.log('🔄 Cargando datos persistidos mejorados...')

  // Cargar datos de formularios
  const datosFormularios = cargarDeLocalStorage(STORAGE_KEYS.DATOS_FORMULARIOS, {})
  if (datosFormularios && Object.keys(datosFormularios).length > 0) {
    console.log('📦 Datos de formularios cargados:', datosFormularios)

    // Restaurar todos los valores reactivos de forma segura
    if (datosFormularios.produccionRecepcionInput !== undefined)
      produccionRecepcionInput.value = datosFormularios.produccionRecepcionInput
    if (datosFormularios.cantidadRecepcion !== undefined)
      cantidadRecepcion.value = datosFormularios.cantidadRecepcion
    if (datosFormularios.cantidadImpresion !== undefined)
      cantidadImpresion.value = datosFormularios.cantidadImpresion
    if (datosFormularios.entregadoImpresion !== undefined)
      entregadoImpresion.value = datosFormularios.entregadoImpresion
    if (datosFormularios.cantidadSuaje !== undefined)
      cantidadSuaje.value = datosFormularios.cantidadSuaje
    if (datosFormularios.entregadoSuaje !== undefined)
      entregadoSuaje.value = datosFormularios.entregadoSuaje
    if (datosFormularios.cantidadPegado !== undefined)
      cantidadPegado.value = datosFormularios.cantidadPegado
    if (datosFormularios.entregadoPegado !== undefined)
      entregadoPegado.value = datosFormularios.entregadoPegado
    if (datosFormularios.tipoPegamento !== undefined)
      tipoPegamento.value = datosFormularios.tipoPegamento
    if (datosFormularios.cuadre2 !== undefined) cuadre2.value = datosFormularios.cuadre2
    if (datosFormularios.desgarre !== undefined) desgarre.value = datosFormularios.desgarre
    if (datosFormularios.marcas2 !== undefined) marcas2.value = datosFormularios.marcas2
    if (datosFormularios.cantidadarmado !== undefined)
      cantidadarmado.value = datosFormularios.cantidadarmado
    if (datosFormularios.entregadoArmado !== undefined)
      entregadoArmado.value = datosFormularios.entregadoArmado
    if (datosFormularios.cantidadAlmacen !== undefined)
      cantidadAlmacen.value = datosFormularios.cantidadAlmacen
    if (datosFormularios.empaquetadoSeleccionado !== undefined)
      empaquetadoSeleccionado.value = datosFormularios.empaquetadoSeleccionado
    if (datosFormularios.certificado !== undefined) certificado.value = datosFormularios.certificado
    if (datosFormularios.etiquetas !== undefined) etiquetas.value = datosFormularios.etiquetas
    if (datosFormularios.revision !== undefined) revision.value = datosFormularios.revision
    if (datosFormularios.entregadoEnvio !== undefined)
      entregadoEnvio.value = datosFormularios.entregadoEnvio

    // Restaurar objetos reactivos
    if (datosFormularios.datosRecepcion) {
      Object.keys(datosFormularios.datosRecepcion).forEach((key) => {
        datosRecepcion[key] = datosFormularios.datosRecepcion[key]
      })
    }
    if (datosFormularios.datosImpresion) {
      Object.keys(datosFormularios.datosImpresion).forEach((key) => {
        datosImpresion[key] = datosFormularios.datosImpresion[key]
      })
    }
    if (datosFormularios.datosSuaje) {
      Object.keys(datosFormularios.datosSuaje).forEach((key) => {
        datosSuaje[key] = datosFormularios.datosSuaje[key]
      })
    }
    if (datosFormularios.datosEnvio) {
      Object.keys(datosFormularios.datosEnvio).forEach((key) => {
        datosEnvio[key] = datosFormularios.datosEnvio[key]
      })
    }
  }

  // Cargar estados de procesos con verificación mejorada
  const procesos = [
    'recepcion',
    'impresion',
    'suaje',
    'pegado',
    'armado',
    'almacen',
    'calidad',
    'envio',
  ]
  procesos.forEach((proceso) => {
    const clave = STORAGE_KEYS[proceso.toUpperCase()]
    const datos = cargarDeLocalStorage(clave, null)
    if (datos && datos.estadoProceso) {
      // Solo marcar como guardado si realmente hay datos completos
      const tieneDatosCompletos = datos.datosFormularios && datos.datosBD
      if (tieneDatosCompletos) {
        switch (proceso) {
          case 'recepcion':
            recepcionGuardada.value = true
            break
          case 'impresion':
            impresionGuardada.value = true
            break
          case 'suaje':
            suajeGuardada.value = true
            break
          case 'pegado':
            pegadoGuardada.value = true
            break
          case 'armado':
            armadoGuardada.value = true
            break
          case 'almacen':
            almacenGuardada.value = true
            break
          case 'calidad':
            calidadGuardada.value = true
            break
          case 'envio':
            envioGuardada.value = true
            break
        }
        console.log(`✅ Estado ${proceso} restaurado con datos completos`)
      } else {
        console.log(`⚠️ Estado ${proceso} incompleto, no se restaura`)
      }
    }
  })
}

// 🔄 FUNCIÓN PARA REPARAR DATOS EXISTENTES
const repararDatosExistentes = () => {
  console.log('🔧 REPARANDO DATOS EXISTENTES...')

  const procesos = [
    'recepcion',
    'impresion',
    'suaje',
    'pegado',
    'armado',
    'almacen',
    'calidad',
    'envio',
  ]

  procesos.forEach((proceso) => {
    const claveStorage = STORAGE_KEYS[proceso.toUpperCase()]
    const datosStorage = cargarDeLocalStorage(claveStorage, null)

    if (datosStorage && typeof datosStorage === 'object') {
      // Si los datos existen pero no tienen la estructura completa, repararlos
      if (!datosStorage.datosFormularios) {
        console.log(`🔄 Reparando estructura de datos para ${proceso}`)

        const datosReparados = {
          datosFormularios: obtenerDatosFormulariosCompletos(),
          autorizaciones: datosStorage.autorizaciones || { ...autorizaciones.value },
          estadoProceso:
            datosStorage.estadoProceso !== undefined ? datosStorage.estadoProceso : true,
          timestamp: datosStorage.timestamp || new Date().getTime(),
          datosBD: datosStorage.datosBD || null,
          pedidoId: datosStorage.pedidoId || pedidoId.value,
          no_orden: datosStorage.no_orden || no_orden.value,
          version: datosStorage.version || '3.0',
        }

        guardarEnLocalStorage(claveStorage, datosReparados)
        console.log(`✅ ${proceso} reparado con nueva estructura`)
      }
    }
  })
}

// 🔄 FUNCIÓN PARA VERIFICAR INTEGRIDAD DE DATOS - VERSIÓN MEJORADA Y CORREGIDA
const verificarIntegridadDatos = () => {
  console.log('🔍 VERIFICANDO INTEGRIDAD DE DATOS - VERSIÓN MEJORADA...')

  const procesos = [
    'recepcion',
    'impresion',
    'suaje',
    'pegado',
    'armado',
    'almacen',
    'calidad',
    'envio',
  ]

  procesos.forEach((proceso) => {
    const claveStorage = STORAGE_KEYS[proceso.toUpperCase()]
    const datosStorage = cargarDeLocalStorage(claveStorage, null)

    // Obtener el estado actual CORRECTAMENTE
    let estadoGuardadoActual = false
    switch (proceso) {
      case 'recepcion':
        estadoGuardadoActual = recepcionGuardada.value
        break
      case 'impresion':
        estadoGuardadoActual = impresionGuardada.value
        break
      case 'suaje':
        estadoGuardadoActual = suajeGuardada.value
        break
      case 'pegado':
        estadoGuardadoActual = pegadoGuardada.value
        break
      case 'armado':
        estadoGuardadoActual = armadoGuardada.value
        break
      case 'almacen':
        estadoGuardadoActual = almacenGuardada.value
        break
      case 'calidad':
        estadoGuardadoActual = calidadGuardada.value
        break
      case 'envio':
        estadoGuardadoActual = envioGuardada.value
        break
    }

    // 🔥 VERIFICACIÓN MEJORADA: Verificar estructura real de datos
    const tieneEstructuraCompleta =
      datosStorage &&
      typeof datosStorage === 'object' &&
      datosStorage.datosFormularios !== undefined

    const tieneDatosFormularios =
      tieneEstructuraCompleta &&
      datosStorage.datosFormularios &&
      Object.keys(datosStorage.datosFormularios).length > 0

    console.log(`📊 ${proceso}:`, {
      enStorage: !!datosStorage,
      estadoGuardado: estadoGuardadoActual,
      tieneEstructuraCompleta,
      tieneDatosFormularios,
      tipoDatos: typeof datosStorage,
      datosKeys: datosStorage ? Object.keys(datosStorage) : 'null',
    })

    // 🔥 CORRECCIÓN PRINCIPAL: Verificar basado en estructura real, no en datosBD
    if (datosStorage && tieneEstructuraCompleta && !estadoGuardadoActual) {
      console.log(`🔄 CORRIGIENDO: ${proceso} tiene estructura completa pero estado es false`)

      switch (proceso) {
        case 'recepcion':
          recepcionGuardada.value = true
          break
        case 'impresion':
          impresionGuardada.value = true
          break
        case 'suaje':
          suajeGuardada.value = true
          break
        case 'pegado':
          pegadoGuardada.value = true
          break
        case 'armado':
          armadoGuardada.value = true
          break
        case 'almacen':
          almacenGuardada.value = true
          break
        case 'calidad':
          calidadGuardada.value = true
          break
        case 'envio':
          envioGuardada.value = true
          break
      }

      console.log(`✅ ${proceso}Guardada actualizado a: true`)
    }

    // 🔥 CORRECCIÓN: Si el estado es true pero no hay estructura completa, corregir
    if (estadoGuardadoActual && (!datosStorage || !tieneEstructuraCompleta)) {
      console.log(`🔄 CORRIGIENDO: ${proceso} estado es true pero no tiene estructura completa`)

      switch (proceso) {
        case 'recepcion':
          recepcionGuardada.value = false
          break
        case 'impresion':
          impresionGuardada.value = false
          break
        case 'suaje':
          suajeGuardada.value = false
          break
        case 'pegado':
          pegadoGuardada.value = false
          break
        case 'armado':
          armadoGuardada.value = false
          break
        case 'almacen':
          almacenGuardada.value = false
          break
        case 'calidad':
          calidadGuardada.value = false
          break
        case 'envio':
          envioGuardada.value = false
          break
      }

      console.log(`✅ ${proceso}Guardada actualizado a: false`)
    }
  })

  console.log('✅ Verificación de integridad completada')
}
// 🔄 FUNCIÓN PARA MIGRAR DATOS ANTIGUOS A NUEVO FORMATO
const migrarDatosAntiguos = () => {
  console.log('🔄 MIGRANDO DATOS ANTIGUOS A NUEVO FORMATO...')

  const procesos = [
    'recepcion',
    'impresion',
    'suaje',
    'pegado',
    'armado',
    'almacen',
    'calidad',
    'envio',
  ]

  procesos.forEach((proceso) => {
    const claveStorage = STORAGE_KEYS[proceso.toUpperCase()]

    // Cargar datos actuales
    const datosActuales = cargarDeLocalStorage(claveStorage, null)

    // Si los datos son solo "true" (formato antiguo), migrarlos
    if (datosActuales === true || datosActuales === false) {
      console.log(`🔄 Migrando ${proceso} de formato antiguo...`)

      const nuevosDatos = {
        datosFormularios: obtenerDatosFormulariosCompletos(),
        autorizaciones: { ...autorizaciones.value },
        estadoProceso: datosActuales, // Mantener el estado original
        timestamp: new Date().getTime(),
        datosBD: null, // No tenemos los datos BD históricos
        pedidoId: pedidoId.value,
        no_orden: no_orden.value,
      }

      // Guardar en nuevo formato
      guardarEnLocalStorage(claveStorage, nuevosDatos)
      console.log(`✅ ${proceso} migrado a nuevo formato`)
    }
  })
}

// 🔄 ESTADO INICIAL MEJORADO
const estadoInicial = {
  recepcionGuardada: cargarDeLocalStorage(STORAGE_KEYS.RECEPCION, false),
  impresionGuardada: cargarDeLocalStorage(STORAGE_KEYS.IMPRESION, false),
  suajeGuardada: cargarDeLocalStorage(STORAGE_KEYS.SUAJE, false),
  pegadoGuardada: cargarDeLocalStorage(STORAGE_KEYS.PEGADO, false),
  armadoGuardada: cargarDeLocalStorage(STORAGE_KEYS.ARMADO, false),
  almacenGuardada: cargarDeLocalStorage(STORAGE_KEYS.ALMACEN, false),
  calidadGuardada: cargarDeLocalStorage(STORAGE_KEYS.CALIDAD, false),
  envioGuardada: cargarDeLocalStorage(STORAGE_KEYS.ENVIO, false),
  autorizaciones: cargarDeLocalStorage(STORAGE_KEYS.AUTORIZACIONES, {
    recepcion: {
      rc: { autorizado: false, usuario: null },
      planeacion: { autorizado: false, usuario: null },
      visible: true,
    },
    impresion: {
      ci: { autorizado: false, usuario: null },
      operador: { autorizado: false, usuario: null },
      visible: false,
    },
    suaje: {
      ci: { autorizado: false, usuario: null },
      operador: { autorizado: false, usuario: null },
      visible: false,
    },
    pegado: {
      pc: { autorizado: false, usuario: null },
      operador: { autorizado: false, usuario: null },
      visible: false,
    },
    armado: {
      ac: { autorizado: false, usuario: null },
      operador: { autorizado: false, usuario: null },
      visible: false,
    },
    almacen: {
      operador: { autorizado: false, usuario: null },
      visible: false,
    },
    calidad: {
      ec: { autorizado: false, usuario: null },
      ea: { autorizado: false, usuario: null },
      visible: false,
    },
    envio: {
      operador: { autorizado: false, usuario: null },
      supervisor: { autorizado: false, usuario: null },
      visible: false,
    },
  }),
  datosFormularios: cargarDeLocalStorage(STORAGE_KEYS.DATOS_FORMULARIOS, {
    produccionRecepcionInput: 0,
    cantidadRecepcion: 0,
    cantidadImpresion: 0,
    entregadoImpresion: 0,
    cantidadSuaje: 0,
    entregadoSuaje: 0,
    valorBaseArmado: 0,
    cantidadPegado: 0,
    entregadoPegado: 0,
    tipoPegamento: '',
    cuadre2: '',
    desgarre: '',
    marcas2: '',
    cantidadarmado: 0,
    entregadoArmado: 0,
    cantidadAlmacen: 0,
    empaquetadoSeleccionado: '',
    certificado: '',
    etiquetas: '',
    revision: '',
    entregadoEnvio: 0,
    datosRecepcion: {
      medidaCarton: null,
      resistencia: null,
      certificadoCalidad: null,
    },
    datosImpresion: {
      tono: null,
      medidas: null,
    },
    datosSuaje: {
      medidasInternas: {
        ancho: '',
        largo: '',
        alto: '',
        profundidad: '',
      },
      suaje: '',
      medidaCarton: null,
      cuadre: null,
      marcas: null,
    },
    datosEnvio: {
      vehiculo: '',
      operadorId: '',
      operadorPersonalizado: '',
      observaciones: '',
    },
  }),
}

// 🔄 ESTADOS CON PERSISTENCIA
const recepcionGuardada = ref(estadoInicial.recepcionGuardada)
const impresionGuardada = ref(estadoInicial.impresionGuardada)
const suajeGuardada = ref(estadoInicial.suajeGuardada)
const pegadoGuardada = ref(estadoInicial.pegadoGuardada)
const armadoGuardada = ref(estadoInicial.armadoGuardada)
const almacenGuardada = ref(estadoInicial.almacenGuardada)
const calidadGuardada = ref(estadoInicial.calidadGuardada)
const envioGuardada = ref(estadoInicial.envioGuardada)
const valorBaseArmado = ref(estadoInicial.datosFormularios.valorBaseArmado)

// Variables para controlar la verificación de modales
const verificarModalRecepcion = ref(false)
const verificarModalImpresion = ref(false)
const verificarModalSuaje = ref(false)
const verificarModalPegado = ref(false)
const verificarModalArmado = ref(false)
const verificarModalAlmacen = ref(false)
const verificarModalCalidad = ref(false)
const verificarModalEnvio = ref(false)

// Variables para los campos con persistencia
const produccionRecepcionInput = ref(estadoInicial.datosFormularios.produccionRecepcionInput)
const cantidadRecepcion = ref(estadoInicial.datosFormularios.cantidadRecepcion)
const cantidadImpresion = ref(estadoInicial.datosFormularios.cantidadImpresion)
const entregadoImpresion = ref(estadoInicial.datosFormularios.entregadoImpresion)
const cantidadSuaje = ref(estadoInicial.datosFormularios.cantidadSuaje)
const entregadoSuaje = ref(estadoInicial.datosFormularios.entregadoSuaje)
const entregadoEnvio = ref(estadoInicial.datosFormularios.entregadoEnvio)

// VARIABLES PARA ENVÍO - CORREGIDAS (SIN DUPLICADOS)
const datosEnvio = reactive({ ...estadoInicial.datosFormularios.datosEnvio })
const guardandoEnvioState = ref(false) // Cambiado el nombre para evitar duplicado
const mostrarModalConfirmacionEnvioState = ref(false) // Cambiado el nombre para evitar duplicado
let debounceTimerEnvio = null

// VARIABLES PARA PEGADO CON PERSISTENCIA
const cantidadPegado = ref(estadoInicial.datosFormularios.cantidadPegado)
const entregadoPegado = ref(estadoInicial.datosFormularios.entregadoPegado)
const tipoPegamento = ref(estadoInicial.datosFormularios.tipoPegamento)
const cuadre2 = ref(estadoInicial.datosFormularios.cuadre2)
const desgarre = ref(estadoInicial.datosFormularios.desgarre)
const marcas2 = ref(estadoInicial.datosFormularios.marcas2)

// VARIABLES PARA ARMADO CON PERSISTENCIA
const cantidadarmado = ref(estadoInicial.datosFormularios.cantidadarmado)
const entregadoArmado = ref(estadoInicial.datosFormularios.entregadoArmado)

// VARIABLES PARA ALMACÉN CON PERSISTENCIA Y CÁLCULO DE TARIMAS
const cantidadAlmacen = ref(estadoInicial.datosFormularios.cantidadAlmacen)
const empaquetadoSeleccionado = ref(estadoInicial.datosFormularios.empaquetadoSeleccionado)
const unidadesPorTarima = ref(500)
const tarimasCalculadas = ref([])
const totalCalculado = ref(0)

// VARIABLES PARA CALIDAD CON PERSISTENCIA
const certificado = ref(estadoInicial.datosFormularios.certificado)
const etiquetas = ref(estadoInicial.datosFormularios.etiquetas)
const revision = ref(estadoInicial.datosFormularios.revision)

// ✅ CORREGIDO: SOLO UNA DECLARACIÓN DE autorizaciones
const autorizaciones = ref(estadoInicial.autorizaciones)

// Datos de formularios con persistencia
const datosRecepcion = reactive({ ...estadoInicial.datosFormularios.datosRecepcion })
const datosImpresion = reactive({ ...estadoInicial.datosFormularios.datosImpresion })
const datosSuaje = reactive({ ...estadoInicial.datosFormularios.datosSuaje })

// Timers para debounce
let debounceTimerRecepcion = null
let debounceTimerImpresion = null
let debounceTimerSuaje = null
let debounceTimerPegado = null
let debounceTimerArmado = null
let debounceTimerAlmacen = null
let debounceTimerCalidad = null

// Modal de autorización
const modalAbierto = ref(false)
const numEmpleado = ref('')
const password = ref('')
const autorizacionActual = ref({ proceso: '', tipo: '' })

// Modales de confirmación
const mostrarModalConfirmacion = ref(false)
const mostrarModalConfirmacionImpresion = ref(false)
const mostrarModalConfirmacionSuaje = ref(false)
const mostrarModalConfirmacionPegado = ref(false)
const mostrarModalConfirmacionArmado = ref(false)
const mostrarModalConfirmacionAlmacen = ref(false)
const mostrarModalConfirmacionCalidad = ref(false)
// const mostrarModalConfirmacionEnvio ya está declarado arriba como mostrarModalConfirmacionEnvioState

// Estados de guardando
const guardandoRecepcion = ref(false)
const guardandoImpresion = ref(false)
const guardandoSuaje = ref(false)
const guardandoPegado = ref(false)
const guardandoArmado = ref(false)
const guardandoAlmacen = ref(false)
const guardandoCalidad = ref(false)
// const guardandoEnvio ya está declarado arriba como guardandoEnvioState

// 🔥 FUNCIONES PARA IMÁGENES
const cargarImagenes = async () => {
  try {
    const noOrden = pedidoId.value
    if (!noOrden) {
      console.error('No hay número de orden disponible para cargar imágenes')
      return
    }

    console.log('🖼️ Cargando imágenes unificadas para orden:', noOrden)
    imagenes.value = {
      imagen_final: null,
      imagen: null,
      imagen_suaje: null,
    }

    const response = await fetch(`http://localhost:3000/api/imagenes-orden/${noOrden}`)
    console.log('📡 Respuesta del endpoint unificado:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      contentType: response.headers.get('content-type'),
    })

    if (!response.ok) {
      if (response.status === 404) {
        console.log('⚠️ No hay imágenes disponibles para esta orden (404)')
        return
      }
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('📦 Datos recibidos del endpoint unificado:', data)

    if (data.imagen_final) {
      imagenes.value.imagen_final = `data:image/jpeg;base64,${data.imagen_final}`
      console.log('✅ Imagen final asignada')
    }
    if (data.imagen) {
      imagenes.value.imagen = `data:image/jpeg;base64,${data.imagen}`
      console.log('✅ Imagen normal asignada')
    }
    if (data.imagen_suaje) {
      imagenes.value.imagen_suaje = `data:image/jpeg;base64,${data.imagen_suaje}`
      console.log('✅ Imagen suaje asignada')
    }

    prepararLightboxImages()
    console.log('✅ Estado final de imágenes:', imagenes.value)
  } catch (error) {
    console.error('❌ Error cargando imágenes unificadas:', error)
    mostrarAlerta('warning', 'No se pudieron cargar las imágenes del producto')
  }
}

const prepararLightboxImages = () => {
  lightboxImages.value = []
  const configuraciones = [
    { tipo: 'imagen_final', titulo: 'Imagen Final' },
    { tipo: 'imagen', titulo: 'Imagen' },
    { tipo: 'imagen_suaje', titulo: 'Imagen Suaje' },
  ]

  configuraciones.forEach((config) => {
    if (imagenes.value[config.tipo]) {
      lightboxImages.value.push({
        src: imagenes.value[config.tipo],
        title: config.titulo,
      })
    }
  })
  console.log('🖼️ Imágenes para lightbox:', lightboxImages.value.length)
}

const abrirLightbox = (index) => {
  if (lightboxImages.value.length === 0) {
    console.warn('No hay imágenes disponibles para el lightbox')
    mostrarAlerta('warning', 'No hay imágenes disponibles para visualizar')
    return
  }
  const adjustedIndex = Math.min(index, lightboxImages.value.length - 1)
  lightboxIndex.value = adjustedIndex
  lightboxVisible.value = true
}

const handleImageError = (event, tipoImagen) => {
  console.error(`❌ Error cargando imagen ${tipoImagen} en el DOM:`, event)
  event.target.style.display = 'none'
}

// 🔄 FUNCIÓN PARA CARGAR CHOFERES DESDE LA API
const cargarChoferes = async () => {
  try {
    loadingChoferes.value = true
    console.log('🚗 Cargando lista de choferes...')

    const response = await fetch('http://localhost:3000/api/usuarios/rol/Chofer')

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const result = await response.json()

    if (result.success) {
      choferes.value = result.data
      console.log(`✅ ${choferes.value.length} choferes cargados:`, choferes.value)
    } else {
      console.error('❌ Error al cargar choferes:', result.message)
      mostrarAlerta('warning', 'No se pudieron cargar los choferes disponibles')
    }
  } catch (error) {
    console.error('❌ Error al cargar choferes:', error)
    mostrarAlerta('warning', 'Error al cargar la lista de choferes')
  } finally {
    loadingChoferes.value = false
  }
}

// 🔄 FUNCIÓN PARA MANEJAR CAMBIOS EN OPERADOR
const onOperadorChange = () => {
  console.log('🔄 Cambio de operador:', datosEnvio.operadorId)

  if (datosEnvio.operadorId !== 'custom') {
    // Limpiar el nombre personalizado cuando se selecciona un chofer de la lista
    datosEnvio.operadorPersonalizado = ''
    console.log('✅ Operador seleccionado de la lista')
  } else {
    console.log('📝 Modo operador personalizado activado')
  }

  // Activar verificación automática para envío
  if (!envioGuardada.value) {
    activarVerificacionModalEnvio()
  }
}

// 🔄 FUNCIÓN PARA GUARDAR OPERADOR PERSONALIZADO
const guardarOperadorPersonalizado = () => {
  if (datosEnvio.operadorPersonalizado?.trim()) {
    console.log('💾 Operador personalizado guardado:', datosEnvio.operadorPersonalizado)
    // Activar verificación automática
    if (!envioGuardada.value) {
      activarVerificacionModalEnvio()
    }
  }
}

// 🔄 COMPUTED PROPERTIES
const recepcionCompleta = computed(
  () =>
    autorizaciones.value.recepcion.rc.autorizado &&
    autorizaciones.value.recepcion.planeacion.autorizado,
)

const impresionCompleta = computed(
  () =>
    autorizaciones.value.impresion.ci.autorizado &&
    autorizaciones.value.impresion.operador.autorizado,
)

const suajeCompleta = computed(
  () => autorizaciones.value.suaje.ci.autorizado && autorizaciones.value.suaje.operador.autorizado,
)

const pegadoCompleto = computed(
  () =>
    autorizaciones.value.pegado.pc.autorizado && autorizaciones.value.pegado.operador.autorizado,
)

const armadoCompleto = computed(
  () =>
    autorizaciones.value.armado.ac.autorizado && autorizaciones.value.armado.operador.autorizado,
)

const calidadCompleta = computed(
  () => autorizaciones.value.calidad.ec.autorizado && autorizaciones.value.calidad.ea.autorizado,
)

const almacenCompleto = computed(() => autorizaciones.value.almacen.operador.autorizado)

// const envioCompleto = computed(
//   () => autorizaciones.value.envio.operador.autorizado && autorizaciones.value.envio.supervisor.autorizado,
// )

const puedeGuardarRecepcion = computed(() => {
  const producto = productos.value[0] // Asumiendo que solo hay un producto
  return (
    producto?.cantidad > 0 && // ← Cambio aquí
    cantidadRecepcion.value > 0 &&
    datosRecepcion.medidaCarton &&
    datosRecepcion.resistencia &&
    datosRecepcion.certificadoCalidad &&
    autorizaciones.value.recepcion.rc.autorizado &&
    autorizaciones.value.recepcion.planeacion.autorizado
  )
})
const puedeGuardarImpresion = computed(() => {
  return (
    cantidadImpresion.value > 0 &&
    entregadoImpresion.value > 0 &&
    datosImpresion.tono &&
    datosImpresion.medidas &&
    autorizaciones.value.impresion.ci.autorizado &&
    autorizaciones.value.impresion.operador.autorizado
  )
})

const puedeGuardarSuaje = computed(() => {
  return (
    cantidadSuaje.value > 0 &&
    entregadoSuaje.value > 0 &&
    datosSuaje.medidaCarton &&
    datosSuaje.cuadre &&
    datosSuaje.marcas &&
    autorizaciones.value.suaje.ci.autorizado &&
    autorizaciones.value.suaje.operador.autorizado
  )
})

const puedeGuardarPegado = computed(() => {
  return (
    cantidadPegado.value > 0 &&
    entregadoPegado.value > 0 &&
    tipoPegamento.value &&
    cuadre2.value &&
    desgarre.value &&
    marcas2.value &&
    autorizaciones.value.pegado.pc.autorizado &&
    autorizaciones.value.pegado.operador.autorizado
  )
})

const puedeGuardarArmado = computed(() => {
  return (
    cantidadarmado.value > 0 &&
    entregadoArmado.value > 0 &&
    autorizaciones.value.armado.ac.autorizado &&
    autorizaciones.value.armado.operador.autorizado
  )
})

const puedeGuardarAlmacen = computed(() => {
  return (
    cantidadAlmacen.value > 0 &&
    tarimasCalculadas.value.length > 0 &&
    empaquetadoSeleccionado.value &&
    autorizaciones.value.almacen.operador.autorizado
  )
})

const puedeGuardarCalidad = computed(() => {
  return (
    certificado.value &&
    etiquetas.value &&
    revision.value &&
    autorizaciones.value.calidad.ec.autorizado &&
    autorizaciones.value.calidad.ea.autorizado
  )
})

const puedeGuardarEnvio = computed(() => {
  const puede =
    datosEnvio.vehiculo &&
    datosEnvio.operadorId &&
    entregadoEnvio.value > 0 &&
    autorizaciones.value.envio.operador.autorizado &&
    autorizaciones.value.envio.supervisor.autorizado

  console.log('🔍 Puede guardar envío:', {
    vehiculo: datosEnvio.vehiculo,
    operadorId: datosEnvio.operadorId,
    entregado: entregadoEnvio.value,
    autorizacionOperador: autorizaciones.value.envio.operador.autorizado,
    autorizacionSupervisor: autorizaciones.value.envio.supervisor.autorizado,
    puede: puede,
  })

  return puede
})
// Campos faltantes
const camposFaltantesRecepcion = computed(() => {
  const faltantes = []
  if (produccionRecepcionInput.value <= 0) faltantes.push('Producción')
  if (cantidadRecepcion.value <= 0) faltantes.push('Recibidas')
  if (!datosRecepcion.medidaCarton) faltantes.push('Medida cartón')
  if (!datosRecepcion.resistencia) faltantes.push('Resistencia')
  if (!datosRecepcion.certificadoCalidad) faltantes.push('Certificado calidad')
  if (!autorizaciones.value.recepcion.rc.autorizado) faltantes.push('Autorización RC')
  if (!autorizaciones.value.recepcion.planeacion.autorizado)
    faltantes.push('Autorización Planeación')
  return faltantes.join(', ')
})

const camposFaltantesImpresion = computed(() => {
  const faltantes = []
  if (cantidadImpresion.value <= 0) faltantes.push('Cantidad')
  if (entregadoImpresion.value <= 0) faltantes.push('Entregado')
  if (!datosImpresion.tono) faltantes.push('Tono')
  if (!datosImpresion.medidas) faltantes.push('Medidas')
  if (!autorizaciones.value.impresion.ci.autorizado) faltantes.push('Autorización C.I')
  if (!autorizaciones.value.impresion.operador.autorizado) faltantes.push('Autorización Operador')
  return faltantes.join(', ')
})

const camposFaltantesSuaje = computed(() => {
  const faltantes = []
  if (cantidadSuaje.value <= 0) faltantes.push('Cantidad')
  if (entregadoSuaje.value <= 0) faltantes.push('Entregado')
  if (!datosSuaje.medidaCarton) faltantes.push('Medidas cartón')
  if (!datosSuaje.cuadre) faltantes.push('Cuadre')
  if (!datosSuaje.marcas) faltantes.push('Marcas')
  if (!autorizaciones.value.suaje.ci.autorizado) faltantes.push('Autorización C.I')
  if (!autorizaciones.value.suaje.operador.autorizado) faltantes.push('Autorización Operador')
  return faltantes.join(', ')
})

const camposFaltantesPegado = computed(() => {
  const faltantes = []
  if (cantidadPegado.value <= 0) faltantes.push('Cantidad')
  if (entregadoPegado.value <= 0) faltantes.push('Entregado')
  if (!tipoPegamento.value) faltantes.push('Tipo pegado')
  if (!cuadre2.value) faltantes.push('Cuadre')
  if (!desgarre.value) faltantes.push('Desgarre')
  if (!marcas2.value) faltantes.push('Marcas')
  if (!autorizaciones.value.pegado.pc.autorizado) faltantes.push('Autorización P.C')
  if (!autorizaciones.value.pegado.operador.autorizado) faltantes.push('Autorización Operador')
  return faltantes.join(', ')
})

const camposFaltantesArmado = computed(() => {
  const faltantes = []
  if (cantidadarmado.value <= 0) faltantes.push('Cantidad armado')
  if (entregadoArmado.value <= 0) faltantes.push('Entregado')
  if (!autorizaciones.value.armado.ac.autorizado) faltantes.push('Autorización A.C')
  if (!autorizaciones.value.armado.operador.autorizado) faltantes.push('Autorización Operador')
  return faltantes.join(', ')
})

const camposFaltantesAlmacen = computed(() => {
  const faltantes = []
  if (cantidadAlmacen.value <= 0) faltantes.push('Cantidad entregada')
  if (tarimasCalculadas.value.length === 0) faltantes.push('Tarimas calculadas')
  if (!empaquetadoSeleccionado.value) faltantes.push('Tipo de empaquetado')
  if (!autorizaciones.value.almacen.operador.autorizado) faltantes.push('Autorización Operador')
  return faltantes.length > 0 ? faltantes.join(', ') : 'Todos los campos están completos'
})

const camposFaltantesCalidad = computed(() => {
  const faltantes = []
  if (!certificado.value) faltantes.push('Certificado')
  if (!etiquetas.value) faltantes.push('Etiquetas')
  if (!revision.value) faltantes.push('Revisión')
  if (!autorizaciones.value.calidad.ec.autorizado) faltantes.push('Autorización E.C')
  if (!autorizaciones.value.calidad.ea.autorizado) faltantes.push('Autorización E.A')
  return faltantes.length > 0 ? faltantes.join(', ') : 'Todos los campos están completos'
})

const camposFaltantesEnvio = computed(() => {
  const faltantes = []
  if (!datosEnvio.vehiculo) faltantes.push('Vehículo')
  if (!datosEnvio.operadorId) faltantes.push('Operador')
  if (entregadoEnvio.value <= 0) faltantes.push('Entregado')
  if (!autorizaciones.value.envio.operador.autorizado) faltantes.push('Autorización Operador')
  if (!autorizaciones.value.envio.supervisor.autorizado) faltantes.push('Autorización Supervisor')

  return faltantes.length > 0 ? faltantes.join(', ') : 'Todos los campos están completos'
})

// 🔄 MÉTODOS AUXILIARES PARA ENVÍO - ACTUALIZADA
const obtenerNombreOperador = (id) => {
  if (id === 'custom') {
    return datosEnvio.operadorPersonalizado || 'Operador personalizado'
  }

  const chofer = choferes.value.find((c) => c.id == id)
  return chofer ? `${chofer.nombre} ${chofer.apellido}` : 'Operador no encontrado'
}

// 🔄 MÉTODOS PARA CÁLCULOS
const calcularTarimas = () => {
  if (!cantidadAlmacen.value || !productos.value.length) {
    tarimasCalculadas.value = []
    totalCalculado.value = 0
    return
  }

  const cantidad = cantidadAlmacen.value
  const porTarima = productos.value[0]?.cantidad_tarima || 500
  const tarimasCompletas = Math.floor(cantidad / porTarima)
  const resto = cantidad % porTarima

  tarimasCalculadas.value = []
  for (let i = 0; i < tarimasCompletas; i++) {
    tarimasCalculadas.value.push(porTarima)
  }
  if (resto > 0) {
    tarimasCalculadas.value.push(resto)
  }

  totalCalculado.value = tarimasCalculadas.value.reduce((sum, tarima) => sum + tarima, 0)
}

const obtenerTextoEmpaquetado = (valor) => {
  const opciones = {
    paq1: 'Paq',
    tar: 'Tar',
    paq2: 'Bul',
    paq3: 'Ata',
  }
  return opciones[valor] || 'No seleccionado'
}

const merma = (entregado, cantidad) => {
  const ent = Number(entregado) || 0
  const cant = Number(cantidad) || 1
  const mermaCalculada = (Math.max(0, cant - ent) * 100) / cant
  return Math.round(mermaCalculada * 100) / 100
}

const cantidadRestante = (entregado, cantidad) =>
  Math.max(0, (Number(cantidad) || 0) - (Number(entregado) || 0))

// 🔄 FUNCIONES PARA AUTORIZACIONES CON BASE DE DATOS
function abrirAutorizacion(proceso, tipo) {
  console.log('🔧 abrirAutorizacion:', proceso, tipo)
  autorizacionActual.value = { proceso, tipo }
  modalAbierto.value = true
  numEmpleado.value = ''
  password.value = ''
}

function validarRolAutorizacion(rolUsuario, proceso, tipo) {
  const permisos = {
    recepcion: {
      rc: ['recepcion'],
      planeacion: ['planeacion'],
    },
    impresion: {
      ci: ['calidad'],
      operador: ['operador'],
    },
    suaje: {
      ci: ['calidad'],
      operador: ['operador'],
    },
    pegado: {
      pc: ['calidad'],
      operador: ['operador'],
    },
    armado: {
      ac: ['calidad'],
      operador: ['operador'],
    },
    almacen: {
      operador: ['operador'],
    },
    calidad: {
      ec: ['calidad'],
      ea: ['administracion', 'directivo'],
    },
    envio: {
      operador: ['operador'],
      supervisor: ['supervisor', 'administracion'],
    },
  }

  const rolesPermitidos = permisos[proceso]?.[tipo]

  if (!rolesPermitidos) {
    console.error(`No se definieron permisos para ${proceso} - ${tipo}`)
    return false
  }

  const tienePermiso = rolesPermitidos.includes(rolUsuario)

  console.log(`🔐 Verificación de rol: ${rolUsuario} para ${proceso}-${tipo}`, {
    rolesPermitidos,
    tienePermiso,
  })

  return tienePermiso
}

async function validarUsuario(numEmpleado, password) {
  try {
    console.log('🔐 Verificando credenciales para autorización:', numEmpleado)

    const response = await axios.post('http://localhost:3000/api/auth/validar-usuario', {
      numeroEmpleado: parseInt(numEmpleado),
      contrasenia: password,
    })

    if (response.data.valido) {
      return {
        numEmpleado: response.data.usuario.numeroempleado,
        nombre: `${response.data.usuario.nombre} ${response.data.usuario.apellido}`,
        rol: response.data.usuario.rol,
      }
    }
    return null
  } catch (error) {
    console.error('❌ Error verificando credenciales:', error)

    // Mostrar mensajes específicos según el error
    if (error.response?.status === 404) {
      mostrarAlerta('danger', 'Número de empleado no encontrado')
    } else if (error.response?.status === 401) {
      mostrarAlerta('danger', 'Contraseña incorrecta')
    } else if (error.response?.status === 400) {
      mostrarAlerta('warning', 'Ingresa número de empleado y contraseña')
    } else {
      mostrarAlerta('danger', 'Error al verificar credenciales')
    }

    return null
  }
}

async function confirmarRegistro() {
  if (!numEmpleado.value || !password.value) {
    mostrarAlerta('warning', 'Por favor ingresa número de empleado y contraseña')
    return
  }

  // 1. Verificar que las credenciales sean correctas
  const usuarioValido = await validarUsuario(numEmpleado.value, password.value)

  if (!usuarioValido) {
    // El mensaje de error ya se muestra en validarUsuario
    return
  }

  // 2. Verificar que el usuario tenga el rol correcto para esta autorización
  const { proceso, tipo } = autorizacionActual.value
  const rolValido = validarRolAutorizacion(usuarioValido.rol, proceso, tipo)

  if (!rolValido) {
    mostrarAlerta(
      'warning',
      `${usuarioValido.nombre} no puede autorizar ${proceso.toUpperCase()} - ${tipo.toUpperCase()}\n` +
        `Se requiere: ${obtenerRolesRequeridos(proceso, tipo).join(' o ')}\n` +
        `Tu rol: ${usuarioValido.rol}`,
    )
    return
  }

  // 3. Si todo está bien, registrar la autorización
  autorizaciones.value[proceso][tipo] = {
    autorizado: true,
    usuario: usuarioValido.nombre,
    rol: usuarioValido.rol,
    numeroEmpleado: usuarioValido.numEmpleado,
    timestamp: new Date(),
  }

  cerrarModal()
  mostrarAlerta(
    'success',
    `✅ ${proceso.toUpperCase()} - ${tipo.toUpperCase()} autorizado por ${usuarioValido.nombre}`,
  )

  // Activar verificación del modal correspondiente
  activarVerificacionProceso(proceso)
}

// Función auxiliar para mostrar roles requeridos
function obtenerRolesRequeridos(proceso, tipo) {
  const permisos = {
    recepcion: { rc: ['recepcion'], planeacion: ['planeacion'] },
    impresion: { ci: ['calidad'], operador: ['operador'] },
    suaje: { ci: ['calidad'], operador: ['operador'] },
    pegado: { pc: ['calidad'], operador: ['operador'] },
    armado: { ac: ['calidad'], operador: ['operador'] },
    almacen: { operador: ['operador'] },
    calidad: { ec: ['calidad'], ea: ['administracion', 'directivo'] },
    envio: { operador: ['operador'], supervisor: ['supervisor', 'administracion'] },
  }
  return permisos[proceso]?.[tipo] || []
}

// Función para activar la verificación del proceso
function activarVerificacionProceso(proceso) {
  setTimeout(() => {
    switch (proceso) {
      case 'recepcion':
        verificarYMostrarModalRecepcion()
        break
      case 'impresion':
        verificarYMostrarModalImpresion()
        break
      case 'suaje':
        verificarYMostrarModalSuaje()
        break
      case 'pegado':
        verificarYMostrarModalPegado()
        break
      case 'armado':
        verificarYMostrarModalArmado()
        break
      case 'almacen':
        verificarYMostrarModalAlmacen()
        break
      case 'calidad':
        verificarYMostrarModalCalidad()
        break
      case 'envio':
        verificarYMostrarModalEnvio()
        break
    }
  }, 100)
}

function verificarProgreso(procesoActual) {
  switch (procesoActual) {
    case 'recepcion':
      if (recepcionCompleta.value) autorizaciones.value.impresion.visible = true
      break
    case 'impresion':
      if (impresionCompleta.value) autorizaciones.value.suaje.visible = true
      break
    case 'suaje':
      if (suajeCompleta.value) autorizaciones.value.pegado.visible = true
      break
    case 'pegado':
      if (pegadoCompleto.value) autorizaciones.value.armado.visible = true
      break
    case 'armado':
      if (armadoCompleto.value) autorizaciones.value.almacen.visible = true
      break
    case 'almacen':
      if (almacenCompleto.value) autorizaciones.value.calidad.visible = true
      break
    case 'calidad':
      if (calidadCompleta.value) autorizaciones.value.envio.visible = true
      break
    case 'envio':
      console.log('✅ Proceso de envío completado - Orden finalizada')
      mostrarAlerta('success', '¡Orden completada! Todos los procesos han sido finalizados.')
      break
  }
}

function cerrarModal() {
  modalAbierto.value = false
  numEmpleado.value = ''
  password.value = ''
  autorizacionActual.value = { proceso: '', tipo: '' }
}

// 🔄 FUNCIONES PARA MODALES DE CONFIRMACIÓN
const verificarYMostrarModalRecepcion = () => {
  if (verificarModalRecepcion.value && puedeGuardarRecepcion.value && !recepcionGuardada.value) {
    mostrarModalConfirmacion.value = true
    verificarModalRecepcion.value = false
  }
}
const activarVerificacionModal = () => {
  if (!recepcionGuardada.value && !mostrarModalConfirmacion.value) {
    clearTimeout(debounceTimerRecepcion)
    debounceTimerRecepcion = setTimeout(() => {
      verificarModalRecepcion.value = true
      verificarYMostrarModalRecepcion()
    }, 3000)
  }
}

const verificarYMostrarModalImpresion = () => {
  if (verificarModalImpresion.value && puedeGuardarImpresion.value && !impresionGuardada.value) {
    mostrarModalConfirmacionImpresion.value = true
    verificarModalImpresion.value = false
  }
}

const activarVerificacionModalImpresion = () => {
  if (!impresionGuardada.value && !mostrarModalConfirmacionImpresion.value) {
    clearTimeout(debounceTimerImpresion)
    debounceTimerImpresion = setTimeout(() => {
      verificarModalImpresion.value = true
      verificarYMostrarModalImpresion()
    }, 3000)
  }
}

const verificarYMostrarModalSuaje = () => {
  if (verificarModalSuaje.value && puedeGuardarSuaje.value && !suajeGuardada.value) {
    mostrarModalConfirmacionSuaje.value = true
    verificarModalSuaje.value = false
  }
}

const activarVerificacionModalSuaje = () => {
  if (!suajeGuardada.value && !mostrarModalConfirmacionSuaje.value) {
    clearTimeout(debounceTimerSuaje)
    debounceTimerSuaje = setTimeout(() => {
      verificarModalSuaje.value = true
      verificarYMostrarModalSuaje()
    }, 3000)
  }
}

const verificarYMostrarModalPegado = () => {
  if (verificarModalPegado.value && puedeGuardarPegado.value && !pegadoGuardada.value) {
    mostrarModalConfirmacionPegado.value = true
    verificarModalPegado.value = false
  }
}

const activarVerificacionModalPegado = () => {
  if (!pegadoGuardada.value && !mostrarModalConfirmacionPegado.value) {
    clearTimeout(debounceTimerPegado)
    debounceTimerPegado = setTimeout(() => {
      verificarModalPegado.value = true
      verificarYMostrarModalPegado()
    }, 3000)
  }
}

const verificarYMostrarModalArmado = () => {
  if (verificarModalArmado.value && puedeGuardarArmado.value && !armadoGuardada.value) {
    mostrarModalConfirmacionArmado.value = true
    verificarModalArmado.value = false
  }
}

const activarVerificacionModalArmado = () => {
  if (!armadoGuardada.value && !mostrarModalConfirmacionArmado.value) {
    clearTimeout(debounceTimerArmado)
    debounceTimerArmado = setTimeout(() => {
      verificarModalArmado.value = true
      verificarYMostrarModalArmado()
    }, 3000)
  }
}

const verificarYMostrarModalAlmacen = () => {
  if (verificarModalAlmacen.value && puedeGuardarAlmacen.value && !almacenGuardada.value) {
    mostrarModalConfirmacionAlmacen.value = true
    verificarModalAlmacen.value = false
  }
}

const activarVerificacionModalAlmacen = () => {
  if (!almacenGuardada.value && !mostrarModalConfirmacionAlmacen.value) {
    clearTimeout(debounceTimerAlmacen)
    debounceTimerAlmacen = setTimeout(() => {
      verificarModalAlmacen.value = true
      verificarYMostrarModalAlmacen()
    }, 3000)
  }
}

const verificarYMostrarModalCalidad = () => {
  if (verificarModalCalidad.value && puedeGuardarCalidad.value && !calidadGuardada.value) {
    mostrarModalConfirmacionCalidad.value = true
    verificarModalCalidad.value = false
  }
}

const activarVerificacionModalCalidad = () => {
  if (!calidadGuardada.value && !mostrarModalConfirmacionCalidad.value) {
    clearTimeout(debounceTimerCalidad)
    debounceTimerCalidad = setTimeout(() => {
      verificarModalCalidad.value = true
      verificarYMostrarModalCalidad()
    }, 3000)
  }
}

const verificarYMostrarModalEnvio = () => {
  if (verificarModalEnvio.value && puedeGuardarEnvio.value && !envioGuardada.value) {
    mostrarModalConfirmacionEnvioState.value = true
    verificarModalEnvio.value = false
  }
}

const activarVerificacionModalEnvio = () => {
  if (!envioGuardada.value && !mostrarModalConfirmacionEnvioState.value) {
    clearTimeout(debounceTimerEnvio)
    debounceTimerEnvio = setTimeout(() => {
      verificarModalEnvio.value = true
      verificarYMostrarModalEnvio()
    }, 3000)
  }
}

// Cerrar modales
const cerrarModalConfirmacion = () => {
  mostrarModalConfirmacion.value = false
  verificarModalRecepcion.value = false
}

const cerrarModalConfirmacionImpresion = () => {
  mostrarModalConfirmacionImpresion.value = false
  verificarModalImpresion.value = false
}

const cerrarModalConfirmacionSuaje = () => {
  mostrarModalConfirmacionSuaje.value = false
  verificarModalSuaje.value = false
}

const cerrarModalConfirmacionPegado = () => {
  mostrarModalConfirmacionPegado.value = false
  verificarModalPegado.value = false
}

const cerrarModalConfirmacionArmado = () => {
  mostrarModalConfirmacionArmado.value = false
  verificarModalArmado.value = false
}

const cerrarModalConfirmacionAlmacen = () => {
  mostrarModalConfirmacionAlmacen.value = false
  verificarModalAlmacen.value = false
}

const cerrarModalConfirmacionCalidad = () => {
  mostrarModalConfirmacionCalidad.value = false
  verificarModalCalidad.value = false
}

const cerrarModalConfirmacionEnvio = () => {
  mostrarModalConfirmacionEnvioState.value = false
  verificarModalEnvio.value = false
}

// 🔄 FUNCIONES PARA GUARDAR DATOS - MODIFICADAS CON NUEVO SISTEMA
const guardarRecepcion = async () => {
  guardandoRecepcion.value = true
  try {
    // VERIFICACIÓN EXTRA ANTES DE GUARDAR
    console.log('🔍 Verificando datos de recepción antes de guardar:')
    console.log('- produccionRecepcionInput:', produccionRecepcionInput.value)
    console.log('- cantidadRecepcion:', cantidadRecepcion.value)
    console.log('- datosRecepcion:', datosRecepcion)
    console.log('- puedeGuardarRecepcion:', puedeGuardarRecepcion.value)

    if (!puedeGuardarRecepcion.value) {
      throw new Error(
        'No se puede guardar recepción: Campos incompletos o autorizaciones pendientes',
      )
    }

    const datosBD = {
      produccion: produccionRecepcionInput.value,
      cantidadRecibida: cantidadRecepcion.value,
      calidadMedidaCarton: datosRecepcion.medidaCarton,
      calidadrecistencia: datosRecepcion.resistencia,
      certificadoCalidad: datosRecepcion.certificadoCalidad,
      autorizacionRecepcion: autorizaciones.value.recepcion.rc.autorizado ? 'si' : 'no',
      autorizacionPlaneacion: autorizaciones.value.recepcion.planeacion.autorizado ? 'si' : 'no',
      estado: 'completado',
      no_orden: pedidoId.value,
      id_producto: productos.value[0]?.id || productos.value[0]?.identificador,
    }

    // 🔄 USAR LA NUEVA ESTRATEGIA DE GUARDADO
    const respuesta = await guardarProcesoCompleto('recepcion', datosBD, STORAGE_KEYS.RECEPCION)

    verificarModalRecepcion.value = false
    clearTimeout(debounceTimerRecepcion)

    mostrarAlerta(
      'success',
      `Recepción #${respuesta.data.id_proceso_recepcion} guardada exitosamente`,
    )
    cerrarModalConfirmacion()
    verificarProgreso('recepcion')
    await obtenerEstadoOrden()
    await marcarOrdenComoCompletada()
  } catch (error) {
    console.error('❌ Error al guardar recepción:', error)
    mostrarAlerta('danger', 'Error al guardar la recepción: ' + error.message)
  } finally {
    guardandoRecepcion.value = false
  }
}

const guardarImpresion = async () => {
  guardandoImpresion.value = true
  try {
    const cantidad = Number(cantidadImpresion.value) || 0
    const entregado = Number(entregadoImpresion.value) || 0
    const mermaCalculada = merma(entregado, cantidad)

    const datosBD = {
      cantidadImpresion: cantidad,
      calidadTono: datosImpresion.tono,
      calidadMedidas: datosImpresion.medidas,
      autorizacionImpresion: autorizaciones.value.impresion.ci.autorizado ? 'si' : 'no',
      merma: mermaCalculada,
      totalEntregadas: entregado,
      firmaOperador: autorizaciones.value.impresion.operador.autorizado ? 'si' : 'no',
      estado: 'completado',
      no_orden: pedidoId.value,
      id_producto: productos.value[0]?.id || productos.value[0]?.identificador,
    }

    // 🔄 USAR LA NUEVA ESTRATEGIA
    const respuesta = await guardarProcesoCompleto('impresion', datosBD, STORAGE_KEYS.IMPRESION)

    verificarModalImpresion.value = false
    clearTimeout(debounceTimerImpresion)

    mostrarAlerta(
      'success',
      `Impresión #${respuesta.data.id_proceso_impresion} guardada exitosamente`,
    )
    cerrarModalConfirmacionImpresion()
    verificarProgreso('impresion')
    await obtenerEstadoOrden()
    await marcarOrdenComoCompletada()
  } catch (error) {
    console.error('❌ Error al guardar impresión:', error)
    mostrarAlerta('danger', 'Error al guardar la impresión: ' + error.message)
  } finally {
    guardandoImpresion.value = false
  }
}

const guardarSuaje = async () => {
  guardandoSuaje.value = true
  try {
    const cantidad = Number(cantidadSuaje.value) || 0
    const entregado = Number(entregadoSuaje.value) || 0
    const mermaCalculada = merma(entregado, cantidad)

    const datosBD = {
      calidadMedidas: datosSuaje.medidaCarton,
      calidadCuadre: datosSuaje.cuadre,
      suaje: datosSuaje.suaje,
      calidadMarca: datosSuaje.marcas,
      autorizacionSuaje: autorizaciones.value.suaje.ci.autorizado ? 'si' : 'no',
      merma: mermaCalculada,
      totalEntregadas: entregado,
      firmaOperador: autorizaciones.value.suaje.operador.autorizado ? 'si' : 'no',
      estado: 'completado',
      no_orden: pedidoId.value,
      id_producto: productos.value[0]?.id || productos.value[0]?.identificador,
      cantidadsuaje: cantidad,
    }

    // 🔄 USAR LA NUEVA ESTRATEGIA
    const respuesta = await guardarProcesoCompleto('suaje', datosBD, STORAGE_KEYS.SUAJE)

    verificarModalSuaje.value = false
    clearTimeout(debounceTimerSuaje)

    mostrarAlerta('success', `Suaje #${respuesta.data.id_proceso_suaje} guardado exitosamente`)
    cerrarModalConfirmacionSuaje()
    verificarProgreso('suaje')
    await obtenerEstadoOrden()
    await marcarOrdenComoCompletada()
  } catch (error) {
    console.error('❌ Error al guardar suaje:', error)
    mostrarAlerta('danger', 'Error al guardar el suaje: ' + error.message)
  } finally {
    guardandoSuaje.value = false
  }
}

const guardarPegado = async () => {
  guardandoPegado.value = true
  try {
    const cantidad = Number(cantidadPegado.value) || 0
    const entregado = Number(entregadoPegado.value) || 0
    const mermaCalculada = merma(entregado, cantidad)

    const datosBD = {
      cantidadPegado: cantidad,
      tipoPegado: tipoPegamento.value,
      calidadCuadre: cuadre2.value,
      calidadDesgarre: desgarre.value,
      calidadMarcas: marcas2.value,
      autorizacionPegado: autorizaciones.value.pegado.pc.autorizado ? 'si' : 'no',
      firmaOperador: autorizaciones.value.pegado.operador.autorizado ? 'si' : 'no',
      merma: mermaCalculada,
      totalEntregadas: entregado,
      estado: 'completado',
      no_orden: pedidoId.value,
      id_producto: productos.value[0]?.id || productos.value[0]?.identificador,
    }

    // 🔄 USAR LA NUEVA ESTRATEGIA
    const respuesta = await guardarProcesoCompleto('pegado', datosBD, STORAGE_KEYS.PEGADO)

    verificarModalPegado.value = false
    clearTimeout(debounceTimerPegado)

    mostrarAlerta('success', `Pegado #${respuesta.data[0].id_proceso_pegado} guardado exitosamente`)
    cerrarModalConfirmacionPegado()
    verificarProgreso('pegado')
    await obtenerEstadoOrden()
    await marcarOrdenComoCompletada()
  } catch (error) {
    console.error('❌ Error al guardar pegado:', error)
    mostrarAlerta('danger', 'Error al guardar el pegado: ' + error.message)
  } finally {
    guardandoPegado.value = false
  }
}

const guardarArmado = async () => {
  guardandoArmado.value = true
  try {
    const cantidad = Number(cantidadarmado.value) || 0
    const entregado = Number(entregadoArmado.value) || 0
    const mermaCalculada = merma(entregado, cantidad)

    const datosBD = {
      cantidad_armado: cantidad,
      cantidad_entregado: entregado,
      autorizacion_ac: autorizaciones.value.armado.ac.autorizado ? 'si' : 'no',
      firma_operador: autorizaciones.value.armado.operador.autorizado ? 'si' : 'no',
      merma: mermaCalculada,
      total_entregadas: entregado,
      estado: 'completado',
      no_orden: pedidoId.value,
      id_producto: productos.value[0]?.id || productos.value[0]?.identificador,
    }

    // 🔄 USAR LA NUEVA ESTRATEGIA
    const respuesta = await guardarProcesoCompleto('armado', datosBD, STORAGE_KEYS.ARMADO)

    verificarModalArmado.value = false
    clearTimeout(debounceTimerArmado)

    mostrarAlerta('success', `Armado #${respuesta.data.id_proceso_armado} guardado exitosamente`)
    cerrarModalConfirmacionArmado()
    verificarProgreso('armado')
    await obtenerEstadoOrden()
    await marcarOrdenComoCompletada()
  } catch (error) {
    console.error('❌ Error al guardar armado:', error)
    mostrarAlerta('danger', 'Error al guardar el armado: ' + error.message)
  } finally {
    guardandoArmado.value = false
  }
}

const guardarAlmacen = async () => {
  guardandoAlmacen.value = true
  try {
    // Preparar datos de tarimas en el formato que espera el backend
    const tarimasData = tarimasCalculadas.value.map((cantidad) => ({
      cantidad: cantidad,
    }))

    const datosBD = {
      no_orden: pedidoId.value,
      id_producto: productos.value[0]?.id || productos.value[0]?.identificador,
      cantidad: cantidadAlmacen.value,
      tarimas: tarimasData,
      tipo_armado: empaquetadoSeleccionado.value,
      autorizacion_almacen: autorizaciones.value.almacen.operador.autorizado ? 'si' : 'no',
      estado: 'completado',
    }

    // 🔄 USAR LA NUEVA ESTRATEGIA
    const respuesta = await guardarProcesoCompleto('almacen', datosBD, STORAGE_KEYS.ALMACEN)

    verificarModalAlmacen.value = false
    clearTimeout(debounceTimerAlmacen)

    mostrarAlerta('success', `Almacén #${respuesta.data.id_proceso_almacen} guardado exitosamente`)
    cerrarModalConfirmacionAlmacen()
    verificarProgreso('almacen')
    await obtenerEstadoOrden()
    await marcarOrdenComoCompletada()
  } catch (error) {
    console.error('❌ Error al guardar almacén:', error)
    mostrarAlerta('danger', 'Error al guardar el almacén: ' + error.message)
  } finally {
    guardandoAlmacen.value = false
  }
}

const guardarCalidad = async () => {
  guardandoCalidad.value = true
  try {
    const datosBD = {
      no_orden: pedidoId.value,
      id_producto: productos.value[0]?.id || productos.value[0]?.identificador,
      certificado: certificado.value,
      etiquetas: etiquetas.value,
      revision: revision.value,
      autorizacionCalidad: autorizaciones.value.calidad.ec.autorizado ? 'si' : 'no',
      autorizacionAdministracion: autorizaciones.value.calidad.ea.autorizado ? 'si' : 'no',
      estado: 'completado',
    }

    // 🔄 USAR LA NUEVA ESTRATEGIA
    const respuesta = await guardarProcesoCompleto('calidad', datosBD, STORAGE_KEYS.CALIDAD)

    verificarModalCalidad.value = false
    clearTimeout(debounceTimerCalidad)

    mostrarAlerta('success', `Calidad #${respuesta.data.id_proceso_calidad} guardada exitosamente`)
    cerrarModalConfirmacionCalidad()
    verificarProgreso('calidad')
    await obtenerEstadoOrden()
    await marcarOrdenComoCompletada()
  } catch (error) {
    console.error('❌ Error al guardar calidad:', error)
    mostrarAlerta('danger', 'Error al guardar la calidad: ' + error.message)
  } finally {
    guardandoCalidad.value = false
  }
}

const guardarEnvio = async () => {
  guardandoEnvioState.value = true
  try {
    const totalEnvio = entregadoEnvio.value
    const mermaCalculada = merma(entregadoEnvio.value, cantidadRecepcion.value)

    // Determinar el nombre del operador
    let nombreOperador = ''
    if (datosEnvio.operadorId === 'custom') {
      nombreOperador = datosEnvio.operadorPersonalizado || 'Operador personalizado'
    } else {
      nombreOperador = obtenerNombreOperador(datosEnvio.operadorId)
    }

    const datosBD = {
      operador: nombreOperador,
      operador_id: datosEnvio.operadorId === 'custom' ? null : datosEnvio.operadorId,
      operador_personalizado:
        datosEnvio.operadorId === 'custom' ? datosEnvio.operadorPersonalizado : null,
      observaciones: datosEnvio.observaciones,
      totalEnvio: totalEnvio,
      vehiculo: datosEnvio.vehiculo,
      estado: 'completado',
      merma: mermaCalculada,
      no_orden: pedidoId.value,
      id_producto: productos.value[0]?.id || productos.value[0]?.identificador,
    }

    // 🔄 USAR LA NUEVA ESTRATEGIA
    const respuesta = await guardarProcesoCompleto('envio', datosBD, STORAGE_KEYS.ENVIO)

    mostrarModalConfirmacionEnvioState.value = false

    mostrarAlerta('success', `Envío #${respuesta.data.id_proceso_envio} guardado exitosamente`)

    verificarProgreso('envio')
    await obtenerEstadoOrden()

    // 🔥 NUEVO: Verificar si la orden debe marcarse como completada
    await marcarOrdenComoCompletada()
  } catch (error) {
    console.error('❌ Error al guardar envío:', error)
    mostrarAlerta('danger', 'Error al guardar el envío: ' + error.message)
  } finally {
    guardandoEnvioState.value = false
  }
}

// 🔄 FUNCIONES PARA PDF Y ETIQUETAS
const generarPDF = async () => {
  try {
    // Obtener datos de la orden desde el API
    const datos = await obtenerDatosOrdenPDF(pedidoId.value)

    if (!datos) {
      mostrarAlerta('danger', 'No se pudieron obtener los datos de la orden para el PDF')
      return
    }

    // Obtener el número total de tarimas
    const totalTarimas = tarimasCalculadas.value.length

    if (totalTarimas === 0) {
      mostrarAlerta('warning', 'No hay tarimas calculadas para generar etiquetas')
      return
    }

    console.log(`🖨️ Generando ${totalTarimas} etiquetas en un solo PDF...`)

    // Crear un solo PDF
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'letter',
    })

    const fechaHoy = new Date().toLocaleDateString('es-MX')

    // Cargar logo una sola vez y reutilizarlo
    const logoBase64 = await cargarImagenBase64ParaPDF('/imagen/logo.jpg')

    // Generar una página por cada tarima
    for (let tarimaActual = 1; tarimaActual <= totalTarimas; tarimaActual++) {
      // Si no es la primera página, agregar una nueva
      if (tarimaActual > 1) {
        doc.addPage()
      }

      // Agregar logo si está disponible
      if (logoBase64) {
        try {
          doc.addImage(logoBase64, 'PNG', 240, 40, 120, 60)
        } catch (err) {
          console.warn('addImage falló:', err)
        }
      } else {
        console.log('Logo no disponible, generando PDF sin logo.')
      }

      // Fuente y tamaños
      doc.setFont('helvetica', 'normal')
      const left = 60
      const wide = 500

      // CLIENTE
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.rect(left, 130, wide, 35)
      doc.text('CLIENTE', left + 15, 152)
      doc.setFont('helvetica', 'normal')
      doc.text(datos.razon_social || 'N/A', left + 90, 152)

      // ORDEN
      doc.setFont('helvetica', 'bold')
      doc.rect(left, 170, 250, 30)
      doc.text('ORDEN', left + 15, 190)
      doc.setFont('helvetica', 'normal')
      doc.text(datos.no_orden || 'N/A', left + 90, 190)

      // PEDIDO
      doc.setFont('helvetica', 'bold')
      doc.rect(left + 250, 170, 250, 30)
      doc.text('PEDIDO', left + 265, 190)
      doc.setFont('helvetica', 'normal')
      doc.text(datos.no_pedido_id || 'N/A', left + 400, 190)

      // PRODUCTO (cabecera)
      doc.setFont('helvetica', 'bold')
      doc.rect(left, 230, wide, 30)
      doc.text('PRODUCTO', left + wide / 2, 250, { align: 'center' })

      // PRODUCTO (valor)
      doc.setFontSize(16)
      doc.setFont('helvetica', 'normal')
      doc.rect(left, 260, wide, 45)
      const productoTexto = datos.producto || 'N/A'
      const productoLines = doc.splitTextToSize(productoTexto, wide - 40)

      // Calcular la posición Y para centrar verticalmente (opcional)
      const rectHeight = 45
      const textHeight = productoLines.length * (doc.getFontSize() * 0.3528) // altura aproximada en mm
      const startY = 260 + (rectHeight - textHeight) / 2 + doc.getFontSize() * 0.3528

      // Centrar horizontalmente
      doc.text(productoLines, left + wide / 2, startY, { align: 'center' })
      // CODIGO
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.rect(left, 330, wide, 30)
      doc.text('CODIGO', left + wide / 2, 350, { align: 'center' })

      doc.setFontSize(24)
      doc.setFont('helvetica', 'normal')
      doc.rect(left, 360, wide, 45)
      doc.text(datos.productos_identificador || 'N/A', left + wide / 2, 390, { align: 'center' })
      // CANTIDAD
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.rect(left, 430, wide, 30)
      doc.text('CANTIDAD', left + wide / 2, 450, { align: 'center' })

      // Obtener la cantidad real de esta tarima específica
      const cantidadEnTarima = tarimasCalculadas.value[tarimaActual - 1]

      // Gran número cantidad (cantidad específica de esta tarima)
      doc.setFontSize(70)
      doc.setFont('helvetica', 'bold')
      doc.rect(left, 460, wide, 120)
      doc.text(cantidadEnTarima.toString(), left + wide / 2, 540, { align: 'center' })

      // TARIMA - CUADRO PEQUEÑO MODIFICADO (1/10, 2/10, etc.)
      doc.setFontSize(18)
      const tarimaX = left + wide + 0
      const tarimaY = 460
      doc.rect(tarimaX, tarimaY, 45, 40)
      doc.setFont('helvetica', 'bold')
      doc.text(`${tarimaActual}/${totalTarimas}`, tarimaX + 22.5, tarimaY + 27, { align: 'center' })

      // Información adicional de la tarima actual
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.text(`Tarima ${tarimaActual}: ${cantidadEnTarima} pzas`, left + 20, 600)

      // FECHA Y LOTE
      doc.setFontSize(12)
      doc.rect(400, 610, 200, 45)
      doc.text(`Fecha :  ${fechaHoy}`, 410, 630)
      doc.text(`Lote   : ${datos.no_orden || ''}`, 410, 650)

      console.log(`✅ Página ${tarimaActual}/${totalTarimas} agregada al PDF`)
    }

    // Guardar el PDF único con todas las páginas
    const filename = `etiquetas_tarimas_${datos.no_orden}_${totalTarimas}_hojas.pdf`
    doc.save(filename)

    console.log(`🎉 PDF único con ${totalTarimas} etiquetas generado correctamente`)
    mostrarAlerta('success', `Se generó un PDF con ${totalTarimas} etiquetas de tarimas`)
  } catch (error) {
    console.error('Error generando PDF:', error)
    mostrarAlerta(
      'danger',
      'Ocurrió un error al generar el PDF. Mira la consola para más detalles.',
    )
  }
}

const obtenerDatosOrdenPDF = async (no_orden) => {
  try {
    console.log('Solicitando datos para PDF de orden:', no_orden)
    const response = await fetch(`http://localhost:3000/api/produccion/info-pdf/${no_orden}`)

    // Verificar si la respuesta es HTML en lugar de JSON
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('text/html')) {
      console.error('❌ El endpoint no está configurado en el servidor')
      throw new Error('Endpoint no configurado en el servidor')
    }

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('Datos recibidos para PDF:', data)
    return data
  } catch (error) {
    console.error('Error obteniendo datos de la orden para PDF:', error)

    // Fallback usando datos reales que ya tienes cargados
    console.log('🔄 Usando datos reales de productos cargados como fallback')

    if (productos.value && productos.value.length > 0) {
      const producto = productos.value[0]
      const datosReales = {
        no_orden: pedidoId.value,
        no_pedido_id: ordenProduccion.value?.no_pedido_id || 'N/A',
        productos_identificador: producto.id || producto.identificador,
        producto: producto.nombre || producto.producto,
        cantidad_tarima: producto.cantidad_tarima || 100,
        razon_social: ordenProduccion.value?.razon_social || '-',
      }
      console.log('📦 Usando datos reales de productos:', datosReales)
      return datosReales
    } else {
      // Fallback con datos de prueba si no hay productos cargados
      const datosPrueba = {
        no_orden: no_orden,
        no_pedido_id: 'PED-' + no_orden,
        productos_identificador: 'PROD-' + no_orden,
        producto: 'Producto de prueba',
        cantidad_tarima: 100,
        razon_social: 'Cliente de prueba',
      }
      console.log('⚠️ Usando datos de prueba:', datosPrueba)
      return datosPrueba
    }
  }
}

const cargarImagenBase64ParaPDF = (url, timeoutMs = 3000) => {
  return new Promise((resolve) => {
    try {
      const img = new Image()
      img.src = url

      let terminado = false
      const onDone = (value) => {
        if (terminado) return
        terminado = true
        clearTimeout(timer)
        resolve(value)
      }

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0)
          const dataUrl = canvas.toDataURL('image/png')
          onDone(dataUrl)
        } catch (err) {
          console.warn('Error al convertir imagen a base64:', err)
          onDone(null)
        }
      }

      img.onerror = (err) => {
        console.warn('No se pudo cargar la imagen:', url, err)
        onDone(null)
      }

      const timer = setTimeout(() => {
        console.warn('Timeout cargando imagen:', url)
        onDone(null)
      }, timeoutMs)
    } catch (err) {
      console.warn('Error inesperado en cargarImagenBase64ParaPDF:', err)
      resolve(null)
    }
  })
}

// Función para obtener el folio consecutivo desde la API
const obtenerFolioConsecutivoCalidad = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/folios/calidad')
    if (!response.ok) {
      throw new Error('Error al obtener el folio')
    }
    const data = await response.json()
    return data.folio
  } catch (error) {
    console.error('Error obteniendo folio:', error)
    // Retornar un folio por defecto en caso de error
    return 'CEC-001'
  }
}

const obtenerDatosCompletosCertificado = async (no_orden) => {
  try {
    console.log('📋 Obteniendo datos completos para certificado:', no_orden)

    // Obtener datos del cliente
    const responseCliente = await fetch(`http://localhost:3000/api/ordenes-cliente/${no_orden}`)
    if (!responseCliente.ok) {
      throw new Error('Error al obtener datos del cliente')
    }
    const datosCliente = await responseCliente.json()

    // Obtener datos del producto y especificaciones
    const responseProducto = await fetch(
      `http://localhost:3000/api/produccion/certificado/${no_orden}`,
    )
    if (!responseProducto.ok) {
      throw new Error('Error al obtener datos del producto')
    }
    const datosProducto = await responseProducto.json()
    const producto = datosProducto[0] // Tomar el primer producto

    // 🔥 MODIFICACIÓN SOLO EN LA SECCIÓN DE PRUEBAS - Manteniendo la misma estructura
    const pruebas = [
      {
        nombre: 'Prueba de Resistencia',
        resultado: producto?.calidad_resistencia === 'si' ? 'Aprobada' : 'Pendiente',
      },
      {
        nombre: 'Prueba de Medidas',
        resultado: producto?.calidad_medida_carton === 'si' ? 'Aprobada' : 'Pendiente',
      },
      {
        nombre: 'Pruebas de Color',
        resultado: producto?.calidad_tono === 'si' ? 'Aprobada' : 'Pendiente',
      },
      {
        nombre: 'Prueba de empaque',
        resultado: producto?.autorizacion_almacen === 'si' ? 'Aprobada' : 'Pendiente',
      },
      {
        nombre: 'Fumigación de Partida',
        resultado: 'Realizada',
      },
      {
        nombre: 'Calidad',
        resultado: 'Certificado',
      },
    ]

    // Combinar todos los datos
    return {
      cliente: datosCliente,
      producto: {
        nombre: producto?.producto || 'Producto no especificado',
        codigo: producto?.clave || producto?.identificador || 'N/A',
        cantidadSolicitada: producto?.cantidad || 0,
        cantidadEnviada: producto?.cantidad_almacen || entregadoEnvio.value || 0,
        ordenProduccion: no_orden,
        especificaciones: {
          cartonTipo: producto?.material || 'No especificado',
          flauta: producto?.flauta || 'No especificado',
          resistencia: producto?.resistencia || producto?.calidad_resistencia || 'No especificado',
          impresionColor:
            producto?.tintas?.join(', ') || producto?.calidad_tono || 'No especificado',
        },
        tarimas: producto?.tarimas || 0,
        tipoArmado: producto?.tipo_armado || 'No especificado',
      },
      pruebas: pruebas, // Usamos el nuevo array de pruebas
    }
  } catch (error) {
    console.error('❌ Error obteniendo datos completos del certificado:', error)

    // Fallback a datos locales si la API falla
    return obtenerDatosCertificadoFallback(no_orden)
  }
}

const obtenerDatosCertificadoFallback = (no_orden) => {
  const producto = productos.value[0]
  const orden = ordenProduccion.value

  return {
    cliente: {
      razon_social: orden?.razon_social || '-',
      calle: orden?.calle || '-',
      colonia: orden?.colonia || '-',
      estado: orden?.estado || '-',
      cp: orden?.cp || '-',
      telefono: orden?.telefono || '-',
    },
    producto: {
      nombre: producto?.nombre || producto?.producto || 'Caja Ranurada',
      codigo: producto?.id || producto?.identificador || '21007852',
      cantidadSolicitada: producto?.cantidad || 3000,
      cantidadEnviada: entregadoEnvio.value || 2740,
      ordenProduccion: no_orden || '02158',
      especificaciones: {
        cartonTipo: producto?.material || 'Corrugado Kraft',
        flauta: producto?.flauta || 'C',
        resistencia: producto?.resistencia || '32',
        impresionColor: producto?.tintas?.join(', ') || 'GCMI 32',
      },
    },
    pruebas: [
      { nombre: 'Prueba de Resistencia', resultado: 'Aprobada' },
      { nombre: 'Prueba de Medidas', resultado: 'Aprobada' },
      { nombre: 'Pruebas de Color', resultado: 'Aprobada' },
      { nombre: 'Prueba de empaque', resultado: 'Aprobada' },
      { nombre: 'Fumigación de Partida', resultado: 'Realizada' },
      { nombre: 'Calidad', resultado: 'Certificado' },
    ],
  }
}

const generarPdfCertificado = async () => {
  try {
    console.log('🔄 Iniciando generación de certificado para orden:', pedidoId.value)

    // Obtener datos dinámicos para el certificado
    const datosCertificado = await obtenerDatosCompletosCertificado(pedidoId.value)

    if (!datosCertificado) {
      mostrarAlerta('warning', 'No hay datos disponibles para generar el certificado')
      return
    }

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'letter',
    })

    let yPosition = 40

    const img = new Image()
    img.src = '/imagen/logo.jpg'

    img.onload = function () {
      continuarGeneracionCertificado(doc, yPosition, img, datosCertificado)
    }

    img.onerror = function () {
      console.warn('No se pudo cargar el logo, continuando sin imagen...')
      continuarGeneracionCertificado(doc, yPosition, null, datosCertificado)
    }
  } catch (error) {
    console.error('Error al generar Certificado de Calidad PDF:', error)
    mostrarAlerta('danger', 'Error al generar el Certificado: ' + error.message)
  }
}

// 🔄 FUNCIÓN MEJORADA PARA CONTINUAR LA GENERACIÓN
const continuarGeneracionCertificado = async (doc, yPosition, img, datosCertificado) => {
  try {
    const folio = await obtenerFolioConsecutivoCalidad()

    // --- LOGO CENTRADO EN LA PARTE SUPERIOR ---
    if (img) {
      const pageWidth = doc.internal.pageSize.getWidth()
      const imgWidth = 40
      const imgX = (pageWidth - imgWidth) / 2
      doc.addImage(img, 'JPEG', imgX, 15, imgWidth, 25)
    }

    // --- FOLIO Y FECHA EN LA ESQUINA SUPERIOR DERECHA ---
    const fechaHoy = new Date().toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.text(`FOLIO: ${folio}`, 195, 20, { align: 'right' })
    doc.setFontSize(9)
    doc.text(fechaHoy, 195, 25, { align: 'right' })

    // --- CERTIFICADO DE CALIDAD CENTRADO ---
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text('CERTIFICADO DE CALIDAD', 105, 50, { align: 'center' })

    yPosition = 60

    // --- ENCABEZADOS SIN LÍNEAS ---
    const tableX = 25
    const tableWidth = 160

    // Encabezados sin bordes
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('Información Proveedor', tableX + tableWidth / 4, yPosition, { align: 'center' })
    doc.text('Información Cliente', tableX + (3 * tableWidth) / 4, yPosition, { align: 'center' })

    yPosition += 5

    // --- TABLA DE INFORMACIÓN PROVEEDOR/CLIENTE CON BORDES ---
    doc.setLineWidth(0.3)
    doc.setDrawColor(0, 0, 0)

    const contentHeight = 22

    // Rectángulo con línea divisoria vertical
    doc.rect(tableX, yPosition, tableWidth, contentHeight)
    doc.line(tableX + tableWidth / 2, yPosition, tableX + tableWidth / 2, yPosition + contentHeight)

    yPosition += 4

    // Contenido Proveedor (Izquierda)
    const proveedorLines = [
      'Grupeb S.A. de C.V.',
      'Rogelio Ledesma #102',
      'Col. Cruz Vieja',
      'Tlajomulco de Zuñiga, Jalisco cp. 45644',
      '(33) 931259595',
    ]

    // Contenido Cliente (Derecha) - DATOS REALES DE LA BD
    const clienteLines = [
      datosCertificado.cliente.razon_social || '-',
      datosCertificado.cliente.calle || '-',
      datosCertificado.cliente.colonia ? `Col. ${datosCertificado.cliente.colonia}` : '-',
      datosCertificado.cliente.estado
        ? `Estado ${datosCertificado.cliente.estado} cp. ${datosCertificado.cliente.cp || ''}`
        : '-',
      datosCertificado.cliente.telefono ? `(${datosCertificado.cliente.telefono})` : '-',
    ]

    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')

    // Mostrar información en paralelo
    for (let i = 0; i < proveedorLines.length; i++) {
      // Proveedor (izquierda)
      doc.text(proveedorLines[i], tableX + 3, yPosition + i * 3.5, { align: 'left' })

      // Cliente (derecha)
      doc.text(clienteLines[i], tableX + tableWidth / 2 + 3, yPosition + i * 3.5, { align: 'left' })
    }

    yPosition += contentHeight

    // --- CELDA INDEPENDIENTE PARA "INFORMACIÓN DEL PRODUCTO" ---
    const headerCellX = tableX
    const headerCellY = yPosition
    const headerCellWidth = tableWidth
    const headerCellHeight = 8

    // Dibujar la celda del encabezado
    doc.setLineWidth(0.3)
    doc.rect(headerCellX, headerCellY, headerCellWidth, headerCellHeight)

    // Texto centrado dentro de la celda
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.text('Información del Producto', headerCellX + headerCellWidth / 2, headerCellY + 6, {
      align: 'center',
    })

    yPosition += headerCellHeight + 4

    // --- TABLA GRANDE QUE CONTIENE TODO ---
    const bigTableY = yPosition
    const bigTableHeight = 103

    doc.rect(tableX, bigTableY, tableWidth, bigTableHeight)

    yPosition += 5

    // Contenido del producto (centrado) - DATOS REALES DE LA BD
    // 🔄 CONTENIDO DEL PRODUCTO (centrado) - DATOS REALES DE LA BD
    const productInfo = [
      ['Producto:', datosCertificado.producto.nombre], // = "producto": "caja"
      ['Código:', datosCertificado.producto.codigo], // = "clave": "11111"
      ['Cantidad Solicitada:', datosCertificado.producto.cantidadSolicitada.toLocaleString()], // = "cantidad": 1500
      ['Cantidad Enviada:', datosCertificado.producto.cantidadEnviada.toLocaleString()], // = "cantidad_almacen": "1180"
      ['Orden de Producción:', datosCertificado.producto.ordenProduccion], // = "no_orden": "OP-012"
    ]

    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')

    productInfo.forEach((item, index) => {
      doc.text(item[0], 105, yPosition + index * 4, { align: 'right' })
      doc.text(item[1], 107, yPosition + index * 4)
    })

    yPosition += productInfo.length * 4 + 2

    // --- LÍNEA SEPARADORA (DOBLE) DENTRO DE LA TABLA ---
    doc.setLineWidth(0.3)
    const lineMargin = 5
    doc.line(tableX + lineMargin, yPosition, tableX + tableWidth - lineMargin, yPosition)
    doc.line(
      tableX + lineMargin,
      yPosition + 1.0,
      tableX + tableWidth - lineMargin,
      yPosition + 1.0,
    )

    yPosition += 5

    // Especificaciones técnicas - DATOS REALES DE LA BD
    const specsInfo = [
      ['Cartón Tipo:', datosCertificado.producto.especificaciones.cartonTipo],
      ['Flauta:', datosCertificado.producto.especificaciones.flauta],
      ['Resistencia:', datosCertificado.producto.especificaciones.resistencia],
      ['Impresión Color:', datosCertificado.producto.especificaciones.impresionColor],
    ]

    doc.setFontSize(8)

    specsInfo.forEach((item, index) => {
      doc.text(item[0], 70, yPosition + index * 4, { align: 'right' })
      doc.text(item[1], 80, yPosition + index * 4)
    })

    yPosition += specsInfo.length * 4 + 3

    // --- PRUEBAS (DOS COLUMNAS ALINEADAS) - DATOS REALES ---
    const pruebas = datosCertificado.pruebas

    doc.setFontSize(8)
    const pruebaCol1X = 70
    const pruebaCol2X = 120

    doc.setFont('helvetica', 'bold')

    pruebas.forEach((prueba, index) => {
      doc.text(prueba.nombre, pruebaCol1X, yPosition + index * 4, { align: 'left' })

      // Color según el resultado
      if (
        prueba.resultado === 'Aprobada' ||
        prueba.resultado === 'Realizada' ||
        prueba.resultado === 'Certificado'
      ) {
        doc.setTextColor(0, 128, 0) // Verde
      } else if (prueba.resultado === 'Pendiente') {
        doc.setTextColor(255, 165, 0) // Naranja
      } else {
        doc.setTextColor(255, 0, 0) // Rojo
      }

      doc.text(prueba.resultado, pruebaCol2X, yPosition + index * 4, { align: 'left' })
      doc.setTextColor(0, 0, 0) // Resetear color
    })

    yPosition = bigTableY + bigTableHeight + 20

    // --- FIRMAS ---
    const firmaY = yPosition

    // Certifica (Izquierda)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(12)
    doc.text('Certifica', 60, firmaY, { align: 'center' })

    // Línea para firma calidad
    doc.setLineWidth(0.3)
    doc.line(35, firmaY + 8, 85, firmaY + 8)
    doc.setFontSize(11)
    doc.text('Nombre del de Calidad', 60, firmaY + 12, { align: 'center' })

    // Valida (Derecha)
    doc.setFontSize(12)
    doc.text('Valida', 150, firmaY, { align: 'center' })

    // Línea para firma validador
    doc.line(125, firmaY + 8, 175, firmaY + 8)
    doc.setFontSize(11)
    doc.text('Nombre del Validador', 150, firmaY + 12, { align: 'center' })

    yPosition = firmaY + 20

    // --- OBSERVACIONES Y REVISIÓN EN LA MISMA LÍNEA ---
    const pageHeight = doc.internal.pageSize.getHeight()
    const bottomY = pageHeight - 15

    // Observaciones a la izquierda
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    const observaciones =
      'Observaciones: El Color es una Variable del papel que no afecta las características funcionales del cartón, ya que existen diferentes tonos de color apegados al estándar que en este caso es el kraft.'

    // Texto de observaciones con ancho máximo
    const splitObs = doc.splitTextToSize(observaciones, 140)
    doc.text(splitObs, 20, bottomY)

    // Revisión a la derecha en la misma línea
    doc.text('RC-CA-001', 195, bottomY, { align: 'right' })
    doc.setFont('helvetica', 'bold')
    doc.setFillColor(173, 216, 230) // Azul claro
    doc.rect(165, bottomY + 2, 30, 5, 'F')
    doc.setFont('helvetica', 'normal')
    doc.text('Rev. 12-11/25', 195, bottomY + 5, { align: 'right' })

    // Guardar el PDF
    const nombreArchivo = `certificado-calidad-${folio}.pdf`
    doc.save(nombreArchivo)

    console.log('✅ Certificado generado exitosamente:', nombreArchivo)
    mostrarAlerta('success', 'Certificado de Calidad generado correctamente')
  } catch (error) {
    console.error('Error en la generación del Certificado:', error)
    mostrarAlerta('danger', 'Error al generar el Certificado: ' + error.message)
  }
}
// 🔄 FUNCIONES PRINCIPALES
const obtenerProductoProduccion = async (no_orden) => {
  try {
    loading.value = true
    const response = await axios.get(`http://localhost:3000/api/produccion/detalle/${no_orden}`)
    productos.value = response.data.map((item) => ({
      id: item.id_producto,
      nombre: item.producto,
      cantidad: item.cantidad,
      ancho_carton: item.ancho_carton,
      largo_carton: item.largo_carton,
      ancho_int: item.ancho_int,
      largo_int: item.largo_int,
      alto_int: item.alto_int,
      cantidad_tarima: item.cantidad_tarima,
      empaque: item.empaque,
      paquete: item.paquete,
      ceja: item.ceja,
      guia: item.guia,
      tipo: item.tipo,
      grabado: item.grabado,
      piezas: item.piezas,
      marcas: item.marcas,
      material: item.material,
      flauta: item.flauta,
      resistencia: item.resistencia,
      unidades_por_tarima: item.unidades_por_tarima || 500,
      tintas: item.tintas || [],
    }))

    // 🔥 SOLUCIÓN: Inicializar produccionRecepcionInput con el valor de cantidad
    if (productos.value.length > 0) {
      produccionRecepcionInput.value = productos.value[0].cantidad
    }

    if (productos.value.length > 0 && productos.value[0].unidades_por_tarima) {
      unidadesPorTarima.value = productos.value[0].unidades_por_tarima
    }

    console.log('📦 Productos cargados con tintas:', productos.value)
  } catch (err) {
    console.error('Error al obtener producto en producción:', err)
    error.value = 'No se pudo cargar el producto'
  } finally {
    loading.value = false
  }
}

const ordenProduccion = ref({})
const obtenerEstadoOrden = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/ordenproduccion/${pedidoId.value}`)
    ordenProduccion.value = response.data
    console.log('📊 Estado actual de la orden:', ordenProduccion.value)
  } catch (error) {
    console.error('Error al obtener estado de la orden:', error)
  }
}

// 🔄 WATCHERS MEJORADOS CON CONTROL DE SINCRONIZACIÓN
watch(recepcionGuardada, (nuevoValor) => {
  if (!modoSincronizacion) {
    guardarEnLocalStorage(STORAGE_KEYS.RECEPCION, nuevoValor)
    hacerBackupCompleto()
  }
})

watch(impresionGuardada, (nuevoValor) => {
  if (!modoSincronizacion) {
    guardarEnLocalStorage(STORAGE_KEYS.IMPRESION, nuevoValor)
    hacerBackupCompleto()
  }
})

watch(suajeGuardada, (nuevoValor) => {
  if (!modoSincronizacion) {
    guardarEnLocalStorage(STORAGE_KEYS.SUAJE, nuevoValor)
    hacerBackupCompleto()
  }
})

watch(pegadoGuardada, (nuevoValor) => {
  if (!modoSincronizacion) {
    guardarEnLocalStorage(STORAGE_KEYS.PEGADO, nuevoValor)
    hacerBackupCompleto()
  }
})

watch(armadoGuardada, (nuevoValor) => {
  if (!modoSincronizacion) {
    guardarEnLocalStorage(STORAGE_KEYS.ARMADO, nuevoValor)
    hacerBackupCompleto()
  }
})

watch(almacenGuardada, (nuevoValor) => {
  if (!modoSincronizacion) {
    guardarEnLocalStorage(STORAGE_KEYS.ALMACEN, nuevoValor)
    hacerBackupCompleto()
  }
})

watch(calidadGuardada, (nuevoValor) => {
  if (!modoSincronizacion) {
    guardarEnLocalStorage(STORAGE_KEYS.CALIDAD, nuevoValor)
    hacerBackupCompleto()
  }
})

watch(envioGuardada, (nuevoValor) => {
  if (!modoSincronizacion) {
    guardarEnLocalStorage(STORAGE_KEYS.ENVIO, nuevoValor)
    hacerBackupCompleto()
  }
})

watch(
  autorizaciones,
  (nuevoValor) => {
    if (!modoSincronizacion) {
      guardarEnLocalStorage(STORAGE_KEYS.AUTORIZACIONES, nuevoValor)
      hacerBackupCompleto()
    }
  },
  { deep: true },
)

// 🔄 WATCHER PARA VERIFICAR COMPLETITUD AUTOMÁTICAMENTE
watch(
  [
    recepcionGuardada,
    impresionGuardada,
    suajeGuardada,
    pegadoGuardada,
    armadoGuardada,
    almacenGuardada,
    calidadGuardada,
    envioGuardada,
  ],
  () => {
    // Esperar un poco para que se actualicen todos los estados
    setTimeout(() => {
      marcarOrdenComoCompletada()
    }, 500)
  },
  { deep: true },
)

// 🔄 WATCHERS PARA DATOS DE FORMULARIOS CON SINCRONIZACIÓN
watch(
  [
    produccionRecepcionInput,
    cantidadRecepcion,
    cantidadImpresion,
    entregadoImpresion,
    cantidadSuaje,
    entregadoSuaje,
    cantidadPegado,
    entregadoPegado,
    tipoPegamento,
    cuadre2,
    desgarre,
    marcas2,
    cantidadarmado,
    entregadoArmado,
    cantidadAlmacen,
    empaquetadoSeleccionado,
    certificado,
    etiquetas,
    revision,
    entregadoEnvio,
  ],
  () => {
    if (!modoSincronizacion) {
      const datosFormularios = {
        produccionRecepcionInput: produccionRecepcionInput.value,
        cantidadRecepcion: cantidadRecepcion.value,
        cantidadImpresion: cantidadImpresion.value,
        entregadoImpresion: entregadoImpresion.value,
        cantidadSuaje: cantidadSuaje.value,
        entregadoSuaje: entregadoSuaje.value,
        valorBaseArmado: valorBaseArmado.value,
        cantidadPegado: cantidadPegado.value,
        entregadoPegado: entregadoPegado.value,
        tipoPegamento: tipoPegamento.value,
        cuadre2: cuadre2.value,
        desgarre: desgarre.value,
        marcas2: marcas2.value,
        cantidadarmado: cantidadarmado.value,
        entregadoArmado: entregadoArmado.value,
        cantidadAlmacen: cantidadAlmacen.value,
        empaquetadoSeleccionado: empaquetadoSeleccionado.value,
        certificado: certificado.value,
        etiquetas: etiquetas.value,
        revision: revision.value,
        entregadoEnvio: entregadoEnvio.value,
        datosRecepcion: { ...datosRecepcion },
        datosImpresion: { ...datosImpresion },
        datosSuaje: { ...datosSuaje },
        datosEnvio: { ...datosEnvio },
      }
      guardarEnLocalStorage(STORAGE_KEYS.DATOS_FORMULARIOS, datosFormularios)
      hacerBackupCompleto()
    }
  },
  { deep: true },
)

// Watcher para datos de envío específicos
watch(
  [
    () => datosEnvio.vehiculo,
    () => datosEnvio.operadorId,
    () => datosEnvio.operadorPersonalizado,
    () => datosEnvio.observaciones,
    entregadoEnvio,
  ],
  () => {
    if (!modoSincronizacion) {
      const datosFormulariosActualizados = {
        ...estadoInicial.datosFormularios,
        entregadoEnvio: entregadoEnvio.value,
        datosEnvio: { ...datosEnvio },
      }
      guardarEnLocalStorage(STORAGE_KEYS.DATOS_FORMULARIOS, datosFormulariosActualizados)
      hacerBackupCompleto()
    }

    // Activar verificación automática
    if (!envioGuardada.value) {
      activarVerificacionModalEnvio()
    }
  },
  { deep: true },
)

// Watchers para autorizaciones de envío
watch(
  () => autorizaciones.value.envio.operador.autorizado,
  (nuevoValor) => {
    if (nuevoValor && !envioGuardada.value) {
      activarVerificacionModalEnvio()
    }
  },
)

watch(
  () => autorizaciones.value.envio.supervisor.autorizado,
  (nuevoValor) => {
    if (nuevoValor && !envioGuardada.value) {
      activarVerificacionModalEnvio()
    }
  },
)

// Watcher para cálculo automático de tarimas
watch(cantidadAlmacen, () => {
  calcularTarimas()
})

// 🔄 WATCHERS PARA SINCRONIZACIÓN AUTOMÁTICA ENTRE PROCESOS
watch(cantidadRecepcion, (newValue) => {
  if (!impresionGuardada.value) {
    cantidadImpresion.value = newValue
  }
})

watch(entregadoImpresion, (newValue) => {
  if (!suajeGuardada.value) {
    cantidadSuaje.value = newValue
  }
})

watch(entregadoSuaje, (newValue) => {
  if (!pegadoGuardada.value) {
    cantidadPegado.value = newValue
  }
})

// 1. Pegado → Armado (ya lo tienes)
watch(entregadoPegado, (newValue) => {
  if (!armadoGuardada.value) {
    cantidadarmado.value = newValue
    console.log('🔄 Pegado → Armado:', newValue)
  }
})

// 2. Pegado → Almacén (AGREGA ESTE)
watch(entregadoPegado, (newValue) => {
  if (!almacenGuardada.value) {
    cantidadAlmacen.value = newValue
    console.log('🔄 Pegado → Almacén:', newValue)
  }
})

// 3. Armado → Solo valor base (ya lo tienes corregido)
watch(entregadoArmado, (newValue) => {
  if (!almacenGuardada.value && newValue > 0) {
    if (valorBaseArmado.value === 0) {
      valorBaseArmado.value = newValue
      console.log('📌 Valor base establecido desde entregadoArmado:', newValue)
    }
  }
})

// 🔄 WATCHER PARA VERIFICAR CUANDO SE CARGAN LOS PRODUCTOS
watch(
  productos,
  (nuevosProductos) => {
    console.log('🔄 Productos cargados:', nuevosProductos)
    if (nuevosProductos.length > 0) {
      console.log('📦 Primer producto:', nuevosProductos[0])
      console.log('🔢 Cantidad del producto:', nuevosProductos[0].cantidad)

      // Solo actualizar si no hay un valor ya establecido
      if (!produccionRecepcionInput.value || produccionRecepcionInput.value === 0) {
        produccionRecepcionInput.value = nuevosProductos[0].cantidad
        console.log('✅ produccionRecepcionInput actualizado:', produccionRecepcionInput.value)
      } else {
        console.log('ℹ️ produccionRecepcionInput ya tiene valor:', produccionRecepcionInput.value)
      }
    }
  },
  { immediate: true, deep: true },
)

// 🔄 FUNCIONES DE VALIDACIÓN Y UTILIDAD
const debugValidacion = () => {
  const valorBaseReal =
    entregadoArmado.value > 0
      ? entregadoArmado.value
      : valorBaseArmado.value > 0
        ? valorBaseArmado.value
        : 0

  console.log('🐛 DEBUG Validación Almacén:', {
    valorBaseArmado: valorBaseArmado.value,
    entregadoArmado: entregadoArmado.value,
    valorBaseReal,
    cantidadAlmacen: cantidadAlmacen.value,
    almacenGuardada: almacenGuardada.value,
    maxPermitido: valorBaseReal + 50,
    minPermitido: Math.max(0, valorBaseReal - 50),
  })
}

// Computed property para manejar filas adicionales de tarimas
const filasAdicionales = computed(() => {
  if (tarimasCalculadas.value.length <= 20) return []

  const filas = []
  const totalFilas = Math.ceil((tarimasCalculadas.value.length - 20) / 10)

  for (let i = 0; i < totalFilas; i++) {
    const inicio = 20 + i * 10
    const fin = inicio + 10
    filas.push(tarimasCalculadas.value.slice(inicio, fin))
  }

  return filas
})

// 🔥 MOVER LAS ASIGNACIONES GLOBALES AL FINAL - DESPUÉS DE DECLARAR TODAS LAS FUNCIONES
// Alertas personalizadas
const mostrarAlertaPersonalizada = ref(false)
const mensajeAlerta = ref('')
const tipoAlerta = ref('danger')

// Timer para validación de almacén
let debounceTimerAlmacenValidacion = null

// 🔄 FUNCIÓN PARA MOSTRAR ALERTA PERSONALIZADA
const mostrarAlerta = (tipo, mensaje) => {
  tipoAlerta.value = tipo
  mensajeAlerta.value = mensaje
  mostrarAlertaPersonalizada.value = true

  // Cerrar automáticamente después de 3 segundos
  setTimeout(() => {
    mostrarAlertaPersonalizada.value = false
  }, 3000)
}

// 🔄 FUNCIÓN CORREGIDA PARA VALIDACIÓN DE CANTIDAD ALMACÉN

const validarCantidadAlmacen = (event) => {
  if (almacenGuardada.value) return

  const newValue = parseInt(event.target.value) || 0

  // Limpiar timer anterior si existe
  if (debounceTimerAlmacenValidacion) {
    clearTimeout(debounceTimerAlmacenValidacion)
  }

  // Aplicar el valor inmediatamente para que el usuario vea el cambio
  cantidadAlmacen.value = newValue
  calcularTarimas()

  // Establecer nuevo timer para validar después de 3 segundos
  debounceTimerAlmacenValidacion = setTimeout(() => {
    // Obtener el valor base REAL (entregadoArmado)
    const valorBaseReal =
      entregadoArmado.value > 0
        ? entregadoArmado.value
        : valorBaseArmado.value > 0
          ? valorBaseArmado.value
          : 0

    console.log('🔍 Validando cantidadAlmacen después de 3 segundos:', {
      nuevoValor: newValue,
      valorBaseReal,
      entregadoArmado: entregadoArmado.value,
      valorBaseArmado: valorBaseArmado.value,
    })

    // Si no hay valor base establecido, no validar
    if (valorBaseReal === 0) {
      return
    }

    const maxPermitido = valorBaseReal + 50
    const minPermitido = Math.max(0, valorBaseReal - 50)

    // REVERTIR AL VALOR BASE SI SE EXCEDEN LOS LÍMITES
    if (newValue > maxPermitido) {
      // Revertir al valor base original
      cantidadAlmacen.value = valorBaseReal
      calcularTarimas()

      // Mostrar alerta personalizada CORTA
      mostrarAlerta('danger', `Límite excedido. Máximo permitido: ${maxPermitido}`)
    } else if (newValue < minPermitido) {
      // Revertir al valor base original
      cantidadAlmacen.value = valorBaseReal
      calcularTarimas()

      // Mostrar alerta personalizada CORTA
      mostrarAlerta('danger', `Límite inferior. Mínimo permitido: ${minPermitido}`)
    }
  }, 3000) // 3000 milisegundos = 3 segundos
}

// 5. Armado (Entregado) → Almacén (Cantidad) - SOLO ESTABLECER VALOR BASE UNA VEZ
watch(entregadoArmado, (newValue) => {
  if (!almacenGuardada.value && newValue > 0) {
    // SOLO establecer valor base si no existe uno - NUNCA sincronizar automáticamente
    if (valorBaseArmado.value === 0) {
      valorBaseArmado.value = newValue
      console.log('📌 Valor base establecido desde entregadoArmado:', newValue)
    }
    // NO establecer cantidadAlmacen.value automáticamente - DEJAR QUE EL USUARIO LO ESCRIBA
  }
})

// 🔄 FUNCIÓN PARA MARCAR ORDEN COMO COMPLETADA CON FECHA
const marcarOrdenComoCompletada = async () => {
  try {
    console.log('✅ Verificando si la orden debe marcarse como completada...')

    // Verificar si todos los 8 procesos están completos
    const procesosCompletos =
      recepcionGuardada.value &&
      impresionGuardada.value &&
      suajeGuardada.value &&
      pegadoGuardada.value &&
      armadoGuardada.value &&
      almacenGuardada.value &&
      calidadGuardada.value &&
      envioGuardada.value

    console.log('📊 Estado de procesos:', {
      recepcion: recepcionGuardada.value,
      impresion: impresionGuardada.value,
      suaje: suajeGuardada.value,
      pegado: pegadoGuardada.value,
      armado: armadoGuardada.value,
      almacen: almacenGuardada.value,
      calidad: calidadGuardada.value,
      envio: envioGuardada.value,
      todosCompletos: procesosCompletos,
    })

    if (procesosCompletos) {
      console.log('🎯 Todos los procesos están completos, marcando orden como completada...')

      const response = await axios.put(
        `http://localhost:3000/api/ordenproduccion/${pedidoId.value}/completar`,
      )

      if (response.data.success) {
        console.log(
          '✅ Orden marcada como completada con fecha:',
          response.data.orden.fecha_completada,
        )
        mostrarAlerta('success', '¡Orden completada! Se ha registrado la fecha de finalización.')
      } else {
        console.error('❌ Error al marcar orden como completada:', response.data.message)
      }
    } else {
      console.log('⏳ Aún faltan procesos por completar')
    }
  } catch (error) {
    console.error('❌ Error al marcar orden como completada:', error)
  }
}

onMounted(async () => {
  const no_orden_param = route.params.id
  pedidoId.value = no_orden_param
  no_orden.value = no_orden_param

  console.log('🚀 Iniciando aplicación con sistema mejorado...')

  // 1. CARGAR DATOS PERSISTIDOS PRIMERO (MEJORADO)
  cargarDatosPersistidos()

  // 1.5 VERIFICAR Y SINCRONIZAR DATOS
  verificarYSincronizarDatos()

  // 1.6 MIGRAR DATOS ANTIGUOS
  migrarDatosAntiguos()

  // 1.7 REPARAR DATOS EXISTENTES (NUEVO PASO)
  repararDatosExistentes()

  // 2. LUEGO CARGAR DESDE API
  await obtenerProductoProduccion(no_orden_param)
  await obtenerEstadoOrden()
  await cargarChoferes()
  await cargarImagenes()
  calcularTarimas()

  // 3. VERIFICAR INTEGRIDAD DESPUÉS DE CARGA COMPLETA (VERSIÓN MEJORADA)
  setTimeout(() => {
    verificarIntegridadDatos() // ← Esta es la versión mejorada
  }, 1000)

  // 4. CONFIGURAR SINCRONIZACIÓN
  configurarSincronizacionEntrePestanas()

  // 5. Hacer backup inicial
  setTimeout(() => {
    hacerBackupCompleto()
  }, 2000)

  console.log('✅ Aplicación iniciada correctamente con sistema mejorado')
})

// 🔄 FUNCIÓN PARA DEBUG DETALLADO
const debugEstadoCompleto = () => {
  console.log('🐛 DEBUG COMPLETO DEL ESTADO:')

  const procesos = [
    'recepcion',
    'impresion',
    'suaje',
    'pegado',
    'armado',
    'almacen',
    'calidad',
    'envio',
  ]

  procesos.forEach((proceso) => {
    const claveStorage = STORAGE_KEYS[proceso.toUpperCase()]
    const datosRaw = localStorage.getItem(claveStorage)
    const datosParsed = datosRaw ? JSON.parse(datosRaw) : null

    console.log(`--- ${proceso.toUpperCase()} ---`)
    console.log('Datos en localStorage:', datosParsed)
    console.log('Tiene datosFormularios:', datosParsed?.datosFormularios ? '✅' : '❌')
    console.log('Estado guardado:', datosParsed?.estadoProceso)
    console.log('---')
  })
}

// Exponer para debugging
window.debugEstadoCompleto = debugEstadoCompleto

// 🔄 HERRAMIENTAS DE DEBUG MEJORADAS
const debugAlmacenamiento = () => {
  console.log('🐛 DEBUG Completo del Almacenamiento:')

  Object.values(STORAGE_KEYS).forEach((clave) => {
    const datosLocal = localStorage.getItem(clave)
    const datosSession = sessionStorage.getItem(clave)

    console.log(`📦 ${clave}:`, {
      localStorage: datosLocal ? '✅' : '❌',
      sessionStorage: datosSession ? '✅' : '❌',
      datos: datosLocal ? JSON.parse(datosLocal) : null,
    })
  })
}

const forzarRecargaDatos = () => {
  if (confirm('¿Estás seguro de que quieres forzar la recarga de todos los datos?')) {
    restaurarBackup()
  }
}

// Asegurar que la estructura de autorizaciones sea correcta
if (!autorizaciones.value.almacen.operador) {
  autorizaciones.value.almacen.operador = { autorizado: false, usuario: null }
}

// 🔄 FUNCIONES DE DEBUGGING (mantener compatibilidad)
const probarModalArmado = () => {
  console.log('🔧 Probando modal armado manualmente')
  console.log('puedeGuardarArmado:', puedeGuardarArmado.value)
  console.log('autorizaciones.armado.ac.autorizado:', autorizaciones.value.armado.ac.autorizado)
  console.log(
    'autorizaciones.armado.operador.autorizado:',
    autorizaciones.value.armado.operador.autorizado,
  )
  console.log('cantidadarmado:', cantidadarmado.value)
  console.log('entregadoArmado:', entregadoArmado.value)
  console.log('verificarModalArmado:', verificarModalArmado.value)
  console.log('armadoGuardada:', armadoGuardada.value)

  // Forzar mostrar el modal
  mostrarModalConfirmacionArmado.value = true
  console.log('✅ Modal forzado a true')
}

const limpiarDatosLocalStorage = () => {
  if (confirm('¿Estás seguro de que quieres limpiar todos los datos guardados?')) {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key)
      sessionStorage.removeItem(key)
    })
    localStorage.removeItem(`backup_${pedidoId.value}`)
    sessionStorage.removeItem(`backup_${pedidoId.value}`)
    location.reload()
  }
}

// En el mounted o donde configuras los watchers, agrega:
watch(
  [
    cantidadAlmacen,
    empaquetadoSeleccionado,
    () => autorizaciones.value.almacen.operador.autorizado,
  ],
  () => {
    if (!almacenGuardada.value) {
      activarVerificacionModalAlmacen()
    }
  },
)

// O directamente en los métodos del formulario de almacén, llama a la verificación:

const onAlmacenChange = (event) => {
  // Calcular tarimas automáticamente
  calcularTarimas()

  // Si hay un evento (input del usuario), validar la cantidad
  if (event && event.target) {
    validarCantidadAlmacen(event)
  }

  // Activar verificación del modal si no está guardado
  if (!almacenGuardada.value) {
    activarVerificacionModalAlmacen()
  }
}

// En la sección de watchers, agrega:
watch(
  () => autorizaciones.value.almacen.operador.autorizado,
  (nuevoValor) => {
    if (nuevoValor && !almacenGuardada.value) {
      activarVerificacionModalAlmacen()
    }
  },
)

// 🔄 FUNCIÓN PARA DEBUGGING DE OPERADORES
const debugOperadores = () => {
  console.log('🚗 DEBUG Operadores:', {
    choferes: choferes.value,
    operadorId: datosEnvio.operadorId,
    operadorPersonalizado: datosEnvio.operadorPersonalizado,
    nombreCalculado: obtenerNombreOperador(datosEnvio.operadorId),
  })
}

// 🔥 MOVER LAS ASIGNACIONES GLOBALES AL FINAL - DESPUÉS DE DECLARAR TODAS LAS FUNCIONES
// Exponer funciones globalmente para debugging
window.debugAlmacenamiento = debugAlmacenamiento
window.forzarRecargaDatos = forzarRecargaDatos
window.hacerBackupCompleto = hacerBackupCompleto
window.restaurarBackup = restaurarBackup
window.probarModalArmado = probarModalArmado
window.limpiarDatos = limpiarDatosLocalStorage
window.debugValidacion = debugValidacion
window.debugOperadores = debugOperadores
</script>
<!-- ======================================================================================================================================== -->

<style scoped>
@media (max-width: 768px) {
  input,
  select,
  textarea,
  button {
    font-size: 16px;
    min-height: 44px;
  }

  button {
    padding: 12px 16px;
  }

  .grid grid-cols-2 gap-2 input {
    min-height: 44px;
  }

  /* Mejorar espaciado en móvil */
  .space-y-3 > * {
    margin-bottom: 12px;
  }

  /* Campos de entrada más grandes en móvil */
  input[type='text'],
  input[type='number'],
  select,
  textarea {
    padding: 12px 8px;
  }
}

/* Estilos base */
fieldset {
  border: 2px solid #ccc;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

legend {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  margin-bottom: 0.5rem;
}

/* Mejora visual para radios en mobile */
@media (max-width: 768px) {
  input[type='radio'] {
    width: 20px;
    height: 20px;
  }

  /* Mejorar contraste en móvil */
  .bg-gray-50 {
    background-color: #f9fafb;
  }

  /* Sombras suaves para cards en móvil */
  .rounded.border {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
}

/* Transiciones suaves */
button {
  transition: background-color 0.2s ease;
}

input,
select,
textarea {
  transition: border-color 0.2s ease;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Estilos para las alertas personalizadas */
.alert {
  position: relative;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.375rem;
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.alert-success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.alert-warning {
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeaa7;
}

.alert-primary {
  color: #004085;
  background-color: #cce5ff;
  border-color: #b8daff;
}

.alert-dismissible {
  padding-right: 3rem;
}

.btn-close {
  box-sizing: content-box;
  width: 1em;
  height: 1em;
  padding: 0.25em 0.25em;
  color: #000;
  background: transparent
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e")
    center/1em auto no-repeat;
  border: 0;
  border-radius: 0.375rem;
  opacity: 0.5;
}

.btn-close:hover {
  opacity: 0.75;
}

.fade {
  transition: opacity 0.15s linear;
}

.fade:not(.show) {
  opacity: 0;
}

.show {
  opacity: 1;
}

.d-flex {
  display: flex !important;
}

.align-items-center {
  align-items: center !important;
}

.flex-shrink-0 {
  flex-shrink: 0 !important;
}

.me-2 {
  margin-right: 0.5rem !important;
}

.flex-grow-1 {
  flex-grow: 1 !important;
}

.ms-2 {
  margin-left: 0.5rem !important;
}

.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}
</style>
