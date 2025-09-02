<template>
  <div class="container mx-auto flex flex-col justify-center items-center">
    <h1 class="text-4xl mona-sans-custom ml-7 uppercase font-bold mb-7">CONVERSIÓN & EQUIVALENCIAS</h1>

    <!-- Unit Converter -->
    <div class="grid md:grid-cols-2 gap-6 w-full max-w-4xl mb-8">
      <!-- Weight Converter -->
      <div class="bg-white/30 backdrop-blur-sm rounded-lg p-6">
        <h2 class="text-xl font-bold mb-4 uppercase mona-sans-custom">Convertir Peso</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Cantidad:</label>
            <input
              v-model.number="converterState.weightValue"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-sm font-medium mb-1">De:</label>
              <select
                v-model="converterState.weightFromUnit"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option v-for="unit in weightUnits" :key="unit" :value="unit">
                  {{ getUnitLabel(unit) }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">A:</label>
              <select
                v-model="converterState.weightToUnit"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option v-for="unit in weightUnits" :key="unit" :value="unit">
                  {{ getUnitLabel(unit) }}
                </option>
              </select>
            </div>
          </div>
          <div class="bg-blue-50 p-3 rounded-lg">
            <span class="font-bold text-blue-800">
              {{ convertedWeight }} {{ getUnitLabel(converterState.weightToUnit) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Volume Converter -->
      <div class="bg-white/30 backdrop-blur-sm rounded-lg p-6">
        <h2 class="text-xl font-bold mb-4 uppercase mona-sans-custom">Convertir Volumen</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Cantidad:</label>
            <input
              v-model.number="converterState.volumeValue"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-sm font-medium mb-1">De:</label>
              <select
                v-model="converterState.volumeFromUnit"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option v-for="unit in volumeUnits" :key="unit" :value="unit">
                  {{ getUnitLabel(unit) }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">A:</label>
              <select
                v-model="converterState.volumeToUnit"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option v-for="unit in volumeUnits" :key="unit" :value="unit">
                  {{ getUnitLabel(unit) }}
                </option>
              </select>
            </div>
          </div>
          <div class="bg-blue-50 p-3 rounded-lg">
            <span class="font-bold text-blue-800">
              {{ convertedVolume }} {{ getUnitLabel(converterState.volumeToUnit) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Equivalencies Table -->
    <div class="bg-[#fff3e3] rounded-lg shadow-sm p-7 w-full max-w-3xl">
      <table class="w-full text-[#44200e]">
        <thead>
          <tr>
            <th class="mona-sans-custom font-bold pb-3 text-left text-lg uppercase">
              ALTERNATIVA EQUIVALENTE
            </th>
            <th class="mona-sans-custom font-bold pb-3 text-left text-lg uppercase">
              CONSIDERACIONES
            </th>
          </tr>
        </thead>
        <tbody class="align-top">
          <tr>
            <td class="py-1">Carne picada → 200g</td>
            <td class="py-1">Tiene que ser de carnicería baja en grasa</td>
          </tr>
          <tr>
            <td class="py-1">Pechuga de Pavo → 200g</td>
            <td class="py-1">Opción más magra. Bajan las calorías.</td>
          </tr>
          <tr>
            <td class="py-1">Gambas → 200g</td>
            <td class="py-1">Opción muy baja en grasa.</td>
          </tr>
          <tr>
            <td class="py-1">Langostinos → 200g</td>
            <td class="py-1">Opción muy baja en grasa.</td>
          </tr>
          <tr>
            <td class="py-1">Pescado blanco → 220g</td>
            <td class="py-1">Muy magro y saciante. Necesitas más peso.</td>
          </tr>
          <tr>
            <td class="py-1">Salmon → 210g</td>
            <td class="py-1">Más grasas saludables (Omega-3). Suben las calorías.</td>
          </tr>
          <tr>
            <td class="py-1">Lomo Cerdo (magro) → 200g</td>
            <td class="py-1">Un poco más de grasa que el pollo. Buena variedad.</td>
          </tr>
          <tr>
            <td class="py-1">Huevos → 400g (~12-13 claras)</td>
            <td class="py-1">Extremadamente magro. Ideal para tortillas.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUnitConversions } from '@/nutrition/conversions';

const {
  converterState,
  convertedWeight,
  convertedVolume,
  weightUnits,
  volumeUnits,
  getUnitLabel,
} = useUnitConversions();
</script>