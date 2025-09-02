<template>
  <div class="container mx-auto flex flex-col justify-center items-center">
    <h1 class="text-4xl mona-sans-custom ml-7 uppercase font-bold mb-[-0.5rem]">EQUIVALENCIAS A</h1>
    <h2
      class="gochi-hand-regular text-5xl mona-sans-custom text-[var(--accent-color)] ml-60 font-bold mb-7 rotate-[-8deg]"
    >
      200g de Pollo!
    </h2>

    <!-- Equivalencies Table -->
    <div class="bg-[#fff3e3] rounded-lg shadow-sm p-7 w-full max-w-3xl">
      <table class="w-full text-main]">
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
// Simple equivalencies table - no conversion logic needed
</script>
