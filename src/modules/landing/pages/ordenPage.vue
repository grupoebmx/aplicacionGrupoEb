<template>
  <form>
    <div class="min-h-screen w-full p-4 bg-gray-100 flex justify-center items-start">
      <div class="w-full max-w-[1700px] bg-gray p-6 rounded shadow mt-8">
        <h2 class="font-bold mb-4 text-center text-lg">Orden de producción</h2>

        <fieldset class="border border-gray-300 rounded p-2 mb-4">
          <legend class="text-xs font-semibold px-2">Detalles</legend>

          <div class="table w-full border-separate border-spacing-2 table-fixed">
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

              <!-- Dimensiones Cartón -->
              <div class="table-cell p-1 border w-[240px] border-gray-300 rounded">
                <div class="text-center text-xs font-semibold mb-1">Dimensiones Cartón</div>
                <div class="flex justify-between gap-2">
                  <input
                    type="number"
                    placeholder="Ancho"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 leading-tight"
                  />
                  <input
                    type="number"
                    placeholder="Largo"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 leading-tight"
                  />
                  <input
                    type="number"
                    placeholder="Alto"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 leading-tight"
                  />
                  <input
                    type="number"
                    placeholder="Ceja"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 leading-tight"
                  />
                </div>
              </div>

              <!-- Guía -->
              <div class="table-cell p-1 border w-[120px] border-gray-300 rounded">
                <div class="text-center text-xs font-semibold mb-1">Guía</div>
                <input
                  type="text"
                  readonly
                  :value="item.guia"
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
                  readonly
                  :value="item.tipo"
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                />
              </div>

              <!-- Dimensiones Cartón -->
              <div class="table-cell p-1 border w-[240px] border-gray-300 rounded">
                <div class="text-center text-xs font-semibold mb-1">Dimensiones Cartón</div>
                <div class="flex justify-between gap-2">
                  <input
                    type="number"
                    placeholder="Ancho"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs flex-1 leading-tight"
                  />
                  <input
                    type="number"
                    placeholder="Largo"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs flex-1 leading-tight"
                  />
                </div>
              </div>

              <!-- Material, flauta 1 -->
              <div class="table-cell p-1 border w-[240px] border-gray-300 rounded">
                <div class="text-center text-xs font-semibold mb-1">Material, flauta</div>
                <div class="flex justify-between gap-2">
                  <input
                    type="text"
                    placeholder="Ancho"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs flex-1 leading-tight"
                  />
                  <input
                    type="text"
                    placeholder="Largo"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs flex-1 leading-tight"
                  />
                </div>
              </div>

              <!-- Material, flauta 2 -->
              <div class="table-cell p-1 border w-[240px] border-gray-300 rounded">
                <div class="text-center text-xs font-semibold mb-1">Material, flauta</div>
                <div class="flex justify-between gap-2">
                  <input
                    type="text"
                    placeholder="Ancho"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs flex-1 leading-tight"
                  />
                  <input
                    type="text"
                    placeholder="Largo"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs flex-1 leading-tight"
                  />
                </div>
              </div>
            </div>
          </div>
        </fieldset>

        <!-- Línea divisoria completa -->
        <!-- SEGUNDO FIELDSET: Cantidad, Material, Recibidas, Medida del cartón -->
        <fieldset class="border border-gray-300 rounded p-2 mb-4">
          <legend class="text-xs font-semibold px-2">Recepción</legend>

          <div class="table w-full border-separate border-spacing-2 table-fixed">
            <div class="table-row">
              <div class="table-cell p-1 w-[96px] h-20 border-gray-300 rounded align-middle"></div>

              <!-- Cantidad -->
              <div
                class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
              >
                <div class="text-center text-xs font-semibold mb-1">Cantidad</div>
                <input
                  type="text"
                  placeholder=""
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                />
              </div>

              <div
                class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
              >
                <div class="text-center text-xs font-semibold mb-1">Producción</div>
                <input
                  type="text"
                  placeholder=""
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                />
              </div>

              <!-- Recibidas -->
              <div
                class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
              >
                <div class="text-center text-xs font-semibold mb-1">Recibidas</div>
                <input
                  type="text"
                  readonly
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                />
              </div>

              <!-- Medida del cartón -->
              <div
                class="table-cell p-1 border w-[100px] h-20 border-gray-300 rounded align-middle"
              >
                <div class="text-center text-xs font-semibold mb-1">Medida del cartón</div>
                <fieldset class="flex flex-1/2 items-center h-1 gap-1">
                  <div class="flex gap-2">
                    <input id="si" type="radio" name="medida" value="si" class="peer/si" />
                    <label for="si" class="peer-checked/si:text-green-600 text-sm">Sí</label>

                    <input id="no" type="radio" name="medida" value="no" class="peer/no" />
                    <label for="no" class="peer-checked/no:text-red-600 text-sm">No</label>
                  </div>
                </fieldset>
              </div>

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
                    />
                    <label for="resistencia-si" class="peer-checked/si:text-green-600 text-sm"
                      >Sí</label
                    >

                    <input
                      id="resistencia-no"
                      type="radio"
                      name="resistencia"
                      value="no"
                      class="peer/no"
                    />
                    <label for="resistencia-no" class="peer-checked/no:text-red-600 text-sm"
                      >No</label
                    >
                  </div>
                </fieldset>
              </div>

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
                    />
                    <label for="certificado-si" class="peer-checked/si:text-green-600 text-sm"
                      >Sí</label
                    >

                    <input
                      id="certificado-no"
                      type="radio"
                      name="certificado"
                      value="no"
                      class="peer/no"
                    />
                    <label for="certificado-no" class="peer-checked/no:text-red-600 text-sm"
                      >No</label
                    >
                  </div>
                </fieldset>
              </div>

              <!-- Autorización R.C -->
              <div
                class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle text-center"
              >
                <div class="text-xs font-semibold mb-1">Autorización R.C</div>
                <button
                  type="button"
                  @click="modalAbierto = true"
                  class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm mt-1"
                >
                  Autorizar
                </button>
              </div>

              <!-- Autorización planeación -->
              <div
                class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle text-center"
              >
                <div class="text-xs font-semibold mb-1">Autorización planeación</div>
                <button
                  type="button"
                  @click="modalAbierto = true"
                  class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm mt-1"
                >
                  Autorizar
                </button>
              </div>

              <div class="table-cell p-1 w-[96px] h-20 border-gray-300 rounded align-middle"></div>
            </div>
          </div>
        </fieldset>

        <!-- Tercer Fieldset: Impresión -->
        <fieldset class="border border-gray-300 rounded p-2 mb-4">
          <legend class="text-xs font-semibold px-2">Impresión</legend>

          <div class="table w-full border-separate border-spacing-2 table-fixed">
            <div class="table-row">
              <!-- Cantidad -->
              <div
                class="table-cell p-1 border w-[100px] h-20 border-gray-300 rounded align-middle"
              >
                <div class="text-center text-xs font-semibold mb-1">Cantidad</div>
                <input
                  type="number"
                  v-model.number="cantidadImpresion"
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
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
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                />
              </div>

              <!-- Tintas -->
              <div class="table-cell p-1 border w-[240px] border-gray-300 rounded">
                <div class="text-center text-xs font-semibold mb-1">Tintas</div>
                <div class="flex justify-between gap-2">
                  <input
                    type="text"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 leading-tight"
                  />
                  <input
                    type="text"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 leading-tight"
                  />
                  <input
                    type="text"
                    readonly
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 leading-tight"
                  />
                  <input
                    type="text"
                    readonly
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
                      v-model="tono"
                      class="peer/si"
                    />
                    <label for="si-tono" class="peer-checked/si:text-green-600 text-sm">Sí</label>

                    <input
                      id="no-tono"
                      type="radio"
                      name="tono"
                      value="no"
                      v-model="tono"
                      class="peer/no"
                    />
                    <label for="no-tono" class="peer-checked/no:text-red-600 text-sm">No</label>
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
                      v-model="medidas"
                      class="peer/si"
                    />
                    <label for="si-medidas" class="peer-checked/si:text-green-600 text-sm"
                      >Sí</label
                    >

                    <input
                      id="no-medidas"
                      type="radio"
                      name="medidas"
                      value="no"
                      v-model="medidas"
                      class="peer/no"
                    />
                    <label for="no-medidas" class="peer-checked/no:text-red-600 text-sm">No</label>
                  </div>
                </fieldset>
              </div>

              <!-- Autorización C.I -->
              <div
                class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle text-center"
              >
                <div class="text-xs font-semibold mb-1">Autorización C.I</div>
                <button
                  type="button"
                  @click="modalAbierto = true"
                  class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm mt-1"
                >
                  Autorizar
                </button>
              </div>

              <!-- Entregado -->
              <div
                class="table-cell p-1 border w-[100px] h-20 border-gray-300 rounded align-middle"
              >
                <div class="text-center text-xs font-semibold mb-1">Entregado</div>
                <input
                  type="number"
                  v-model.number="entregadoImpresion"
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
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
                class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle text-center"
              >
                <div class="text-xs font-semibold mb-1">Autorización operador</div>
                <button
                  type="button"
                  @click="modalAbierto = true"
                  class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm mt-1"
                >
                  Autorizar
                </button>
              </div>
            </div>
          </div>
        </fieldset>

        <!-- Cuarto Fieldset: Slotter o suaje -->
        <!-- Cuarto Fieldset: Slotter o suaje -->
        <fieldset class="border border-gray-300 rounded p-2 mb-4">
          <legend class="text-xs font-semibold px-2">Slotter o suaje</legend>

          <div class="table w-full border-separate border-spacing-2 table-fixed">
            <div class="table-row">
              <!-- Cantidad -->
              <div
                class="table-cell p-1 border w-[100px] h-20 border-gray-300 rounded align-middle"
              >
                <div class="text-center text-xs font-semibold mb-1">Cantidad</div>
                <input
                  type="number"
                  v-model.number="cantidadSuaje"
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                />
              </div>

              <!-- Medidas internas -->
              <div class="table-cell p-1 border w-[240px] border-gray-300 rounded">
                <div class="text-center text-xs font-semibold mb-1">Medidas internas (mm)</div>
                <div class="flex justify-between gap-2">
                  <input
                    type="text"
                    v-model="medidasInternas.ancho"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 leading-tight"
                  />
                  <input
                    type="text"
                    v-model="medidasInternas.largo"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 leading-tight"
                  />
                  <input
                    type="text"
                    v-model="medidasInternas.alto"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 leading-tight"
                  />
                  <input
                    type="text"
                    v-model="medidasInternas.profundidad"
                    class="border border-gray-300 rounded-md px-2 py-1 h-8 text-xs w-1/4 leading-tight"
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
                  v-model="suaje"
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight"
                />
              </div>

              <!-- Marcas -->
              <div
                class="table-cell p-1 border w-[100px] h-20 border-gray-300 rounded align-middle"
              >
                <div class="text-center text-xs font-semibold mb-1">Marcas</div>
                <input
                  type="text"
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight"
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
                      v-model="medidaCarton"
                      class="peer/si"
                    />
                    <label for="si-med-carton" class="peer-checked/si:text-green-600 text-sm"
                      >Sí</label
                    >

                    <input
                      id="no-med-carton"
                      type="radio"
                      value="no"
                      v-model="medidaCarton"
                      class="peer/no"
                    />
                    <label for="no-med-carton" class="peer-checked/no:text-red-600 text-sm"
                      >No</label
                    >
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
                      v-model="cuadre"
                      class="peer/si"
                    />
                    <label for="si-cuadre" class="peer-checked/si:text-green-600 text-sm">Sí</label>

                    <input
                      id="no-cuadre"
                      type="radio"
                      value="no"
                      v-model="cuadre"
                      class="peer/no"
                    />
                    <label for="no-cuadre" class="peer-checked/no:text-red-600 text-sm">No</label>
                  </div>
                </fieldset>
              </div>

              <!-- Marcas 2 -->
              <div
                class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
              >
                <div class="text-center text-xs font-semibold mb-1">Marcas</div>
                <fieldset class="flex flex-1/2 items-center h-1 gap-1">
                  <div class="flex gap-2">
                    <input
                      id="si-marcas"
                      type="radio"
                      value="si"
                      v-model="marcas"
                      class="peer/si"
                    />
                    <label for="si-marcas" class="peer-checked/si:text-green-600 text-sm">Sí</label>

                    <input
                      id="no-marcas"
                      type="radio"
                      value="no"
                      v-model="marcas"
                      class="peer/no"
                    />
                    <label for="no-marcas" class="peer-checked/no:text-red-600 text-sm">No</label>
                  </div>
                </fieldset>
              </div>

              <!-- Autorización C.I -->
              <div
                class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle text-center"
              >
                <div class="text-xs font-semibold mb-1">Autorización C.I</div>
                <button
                  type="button"
                  @click="modalAbierto = true"
                  class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm mt-1"
                >
                  Autorizar
                </button>
              </div>

              <!-- Entregado -->
              <div class="table-cell p-1 border w-[90px] h-20 border-gray-300 rounded align-middle">
                <div class="text-center text-xs font-semibold mb-1">Entregado</div>
                <input
                  type="number"
                  v-model.number="entregadoSuaje"
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
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
                class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle text-center"
              >
                <div class="text-xs font-semibold mb-1">Autorización operador</div>
                <button
                  type="button"
                  @click="modalAbierto = true"
                  class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm mt-1"
                >
                  Autorizar
                </button>
              </div>
            </div>
          </div>
        </fieldset>
        <!-- ================================================================================================================================================================================ -->
        <!-- Quinto Fieldset: Pegado -->
        <fieldset class="border border-gray-300 rounded p-2 mb-4">
          <legend class="text-xs font-semibold px-2">Pegado</legend>

          <div class="table w-full border-separate border-spacing-2 table-fixed">
            <div class="table-row">
              <div class="table-cell p-1 w-[96px] h-20 border-gray-300 rounded align-middle"></div>
              <div class="table-cell p-1 w-[96px] h-20 border-gray-300 rounded align-middle"></div>
              <!-- Cantidad -->

              <div
                class="table-cell p-1 border w-[100px] h-20 border-gray-300 rounded align-middle"
              >
                <div class="text-center text-xs font-semibold mb-1">Cantidad</div>
                <input
                  type="number"
                  v-model.number="cantidadPegado"
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                />
              </div>

              <!-- Tipo de pegamento -->
              <div
                class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
              >
                <div class="text-center text-xs font-semibold mb-1">Tipo de pegado</div>
                <input
                  type="text"
                  v-model="tipoPegamento"
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight"
                />
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
                      name="cuadre"
                      value="si"
                      v-model="cuadre2"
                      class="peer/si"
                    />
                    <label for="si-cuadre" class="peer-checked/si:text-green-600 text-sm">Sí</label>

                    <input
                      id="no-cuadre"
                      type="radio"
                      name="cuadre"
                      value="no"
                      v-model="cuadre2"
                      class="peer/no"
                    />
                    <label for="no-cuadre" class="peer-checked/no:text-red-600 text-sm">No</label>
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
                      id="si-desgarre"
                      type="radio"
                      name="desgarre"
                      value="si"
                      v-model="desgarre"
                      class="peer/si"
                    />
                    <label for="si-desgarre" class="peer-checked/si:text-green-600 text-sm"
                      >Sí</label
                    >

                    <input
                      id="no-desgarre"
                      type="radio"
                      name="desgarre"
                      value="no"
                      v-model="desgarre"
                      class="peer/no"
                    />
                    <label for="no-desgarre" class="peer-checked/no:text-red-600 text-sm">No</label>
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
                      id="si-marcas"
                      type="radio"
                      name="marcas"
                      value="si"
                      v-model="marcas2"
                      class="peer/si"
                    />
                    <label for="si-marcas" class="peer-checked/si:text-green-600 text-sm">Sí</label>

                    <input
                      id="no-marcas"
                      type="radio"
                      name="marcas"
                      value="no"
                      v-model="marcas2"
                      class="peer/no"
                    />
                    <label for="no-marcas" class="peer-checked/no:text-red-600 text-sm">No</label>
                  </div>
                </fieldset>
              </div>

              <!-- Autorización P.C -->
              <div
                class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle text-center"
              >
                <div class="text-xs font-semibold mb-1">Autorización P.C</div>
                <button
                  type="button"
                  @click="modalAbierto = true"
                  class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm mt-1"
                >
                  Autorizar
                </button>
              </div>
              <div class="table-cell p-1 w-[96px] h-20 border-gray-300 rounded align-middle"></div>
              <div class="table-cell p-1 w-[96px] h-20 border-gray-300 rounded align-middle"></div>
            </div>
          </div>
        </fieldset>
        <!-- =============================================================================================================================================== -->
        <!-- Sexto Fieldset: Calidad -->
        <fieldset class="border border-gray-300 rounded p-2 mb-4">
          <legend class="text-xs font-semibold px-2">Calidad</legend>

          <div class="table w-full border-separate border-spacing-2 table-fixed">
            <div class="table-row">
              <div class="table-cell p-1 w-[96px] h-20 border-gray-300 rounded align-middle"></div>
              <div class="table-cell p-1 w-[96px] h-20 border-gray-300 rounded align-middle"></div>
              <!-- Certificado -->
              <div
                class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle"
              >
                <div class="text-center text-xs font-semibold mb-1">Certificado</div>
                <fieldset class="flex flex-1/2 items-center h-1 gap-1">
                  <div class="flex gap-2">
                    <input
                      id="si-certificado"
                      type="radio"
                      name="certificado"
                      value="si"
                      v-model="certificado"
                      class="peer/si"
                    />
                    <label for="si-certificado" class="peer-checked/si:text-green-600 text-sm"
                      >Sí</label
                    >

                    <input
                      id="no-certificado"
                      type="radio"
                      name="certificado"
                      value="no"
                      v-model="certificado"
                      class="peer/no"
                    />
                    <label for="no-certificado" class="peer-checked/no:text-red-600 text-sm"
                      >No</label
                    >
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
                      id="si-etiquetas"
                      type="radio"
                      name="etiquetas"
                      value="si"
                      v-model="etiquetas"
                      class="peer/si"
                    />
                    <label for="si-etiquetas" class="peer-checked/si:text-green-600 text-sm"
                      >Sí</label
                    >

                    <input
                      id="no-etiquetas"
                      type="radio"
                      name="etiquetas"
                      value="no"
                      v-model="etiquetas"
                      class="peer/no"
                    />
                    <label for="no-etiquetas" class="peer-checked/no:text-red-600 text-sm"
                      >No</label
                    >
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
                      id="si-revision"
                      type="radio"
                      name="revision"
                      value="si"
                      v-model="revision"
                      class="peer/si"
                    />
                    <label for="si-revision" class="peer-checked/si:text-green-600 text-sm"
                      >Sí</label
                    >

                    <input
                      id="no-revision"
                      type="radio"
                      name="revision"
                      value="no"
                      v-model="revision"
                      class="peer/no"
                    />
                    <label for="no-revision" class="peer-checked/no:text-red-600 text-sm">No</label>
                  </div>
                </fieldset>
              </div>

              <!-- Autorización E.C -->
              <div
                class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle text-center"
              >
                <div class="text-xs font-semibold mb-1">Autorización E.C</div>
                <button
                  type="button"
                  @click="modalAbierto = true"
                  class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm mt-1"
                >
                  Autorizar
                </button>
              </div>

              <!-- Autorización E.A -->
              <div
                class="table-cell p-1 border w-[120px] h-20 border-gray-300 rounded align-middle text-center"
              >
                <div class="text-xs font-semibold mb-1">Autorización E.A</div>
                <button
                  type="button"
                  @click="modalAbierto = true"
                  class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm mt-1"
                >
                  Autorizar
                </button>
              </div>
              <div class="table-cell p-1 w-[96px] h-20 border-gray-300 rounded align-middle"></div>
              <div class="table-cell p-1 w-[96px] h-20 border-gray-300 rounded align-middle"></div>
            </div>
          </div>
        </fieldset>
        <!-- ==================================================================================================================== -->
        <fieldset class="border border-gray-300 rounded p-2 mb-4">
          <legend class="text-xs font-semibold px-2">Envío</legend>

          <div class="table w-full border-separate border-spacing-1">
            <div class="table-row">
              <div class="table-cell p-1 border w-[90px] h-20 border-gray-300 rounded align-middle">
                <div class="text-center text-xs font-semibold mb-1">Vehículo</div>
                <select
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full bg-white leading-tight"
                >
                  <option value="">Vehículo</option>
                  <option value="opcion1">Toyota ABC-1234</option>
                  <option value="opcion2">Ford XYZ-5678</option>
                  <option value="opcion3">Honda LMN-9012</option>
                </select>
              </div>

              <div class="table-cell p-1 border w-[90px] h-20 border-gray-300 rounded align-middle">
                <div class="text-center text-xs font-semibold mb-1">Operadores</div>
                <select
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full bg-white leading-tight"
                >
                  <option value="">Operadores</option>
                  <option value="opcion1">Francisco</option>
                  <option value="opcion2">Rogelio</option>
                  <option value="opcion3">Alberto</option>
                </select>
              </div>

              <div class="table-cell p-1 border w-[90px] h-20 border-gray-300 rounded align-middle">
                <div class="text-center text-xs font-semibold mb-1">Entregado</div>
                <input
                  type="number"
                  class="border border-gray-300 rounded-md px-2 py-1 h-8 text-sm w-full leading-tight bg-gray-50"
                />
              </div>
            </div>
          </div>
          <div class="mt-4">
            <!-- Margen superior para separar del campo de selectores -->
            <label class="text-xs font-semibold mb-1 block">Observaciones</label>
            <textarea
              class="border border-gray-300 rounded-md px-2 py-1 h-24 text-sm w-full bg-white leading-tight"
              placeholder="Escribe tus observaciones aquí..."
            ></textarea>
          </div>
        </fieldset>
      </div>
    </div>
  </form>
  <!-- Modal sencillo -->
  <div v-if="modalAbierto" class="fixed inset-0 flex justify-center items-center">
    <div class="bg-white p-4 rounded-lg shadow-lg w-80 border">
      <h2 class="text-center font-semibold mb-3">Validar empleado</h2>

      <input
        v-model="numEmpleado"
        type="text"
        placeholder="Número de empleado"
        class="w-full border px-2 py-1 mb-2 rounded text-sm"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Contraseña"
        class="w-full border px-2 py-1 mb-4 rounded text-sm"
      />

      <div class="flex justify-end gap-2">
        <button @click="cerrarModal" class="px-3 py-1 bg-gray-300 rounded text-sm">Cancelar</button>
        <button @click="confirmarRegistro" class="px-3 py-1 bg-blue-500 text-white rounded text-sm">
          Aceptar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const productos = ref([])

onMounted(async () => {
  const res = await fetch('http://localhost:3000/api/productos')
  productos.value = await res.json()
})

const modalAbierto = ref(false)

const medidasInternas = ref({
  ancho: '',
  largo: '',
  alto: '',
  profundidad: '',
})

// Impresión
const cantidadImpresion = ref(0)
const entregadoImpresion = ref(0)
const tono = ref('')
const medidas = ref('')

// Slotter / Suaje
const cantidadSuaje = ref(0)
const entregadoSuaje = ref(0)
const medidaCarton = ref('')
const cuadre = ref('')
const marcas = ref('')

// Funciones
function cerrarModal() {
  modalAbierto.value = false
}

const cantidadRestante = (entregado, cantidad) => {
  if (!cantidad || !entregado) return cantidad || 0
  return cantidad - entregado
}

const merma = (entregado, cantidad) => {
  if (!cantidad || !entregado) return 0
  const diferencia = cantidad - entregado
  return ((diferencia * 100) / cantidad).toFixed(2)
}
</script>

<style scoped>
/* Estilo para el fieldset */
fieldset {
  border: 2px solid #ccc;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

/* Estilo para el legend */
legend {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

/* Estilo para los inputs */
input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  margin-bottom: 0.5rem;
}
</style>

