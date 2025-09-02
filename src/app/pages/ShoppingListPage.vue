<template>
  <div class="container mx-auto flex flex-col justify-center items-center">
    <!-- Header with action buttons -->
    <div class="flex flex-col gap-2 items-center justify-center w-full max-w-4xl mb-7">
      <h1 class="text-4xl mona-sans-custom uppercase font-bold text-[#44200E]">
        Lista de la Compra
      </h1>
      <div v-if="shoppingList.length > 0" class="flex gap-2">
        <button
          @click="exportList"
          class="bg-[var(--primary-color)] text-text-main-color font-bold text-sm uppercase py-3 px-6 items-center rounded-full cursor-pointer hover:scale-105 duration-300"
        >
          Exportar
        </button>
        <button
          @click="copyToClipboard"
          class="border border-[var(--text-main-color)] text-text-main-color font-bold text-sm uppercase py-3 px-6 items-center rounded-full cursor-pointer hover:scale-105 duration-300"
        >
          Copiar
        </button>
      </div>

      <!-- Mensaje de confirmación de copiado -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 transform -translate-y-2"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform -translate-y-2"
      >
        <div
          v-if="showCopiedMessage"
          class="bg-[var(--secondary-color)] text-[var(--text-main-color)] px-4 py-2 rounded-full text-sm font-semibold shadow-lg mt-2"
        >
          ✓ Lista copiada al portapapeles
        </div>
      </Transition>
    </div>

    <!-- Empty state -->
    <div v-if="shoppingList.length === 0" class="text-center py-12">
      <p class="text-[#44200E] text-lg mb-4">No hay elementos en la lista de compra.</p>
      <p class="text-[#44200E]/70">
        Añade recetas a tu plan semanal y la lista se generará automáticamente.
      </p>
    </div>

    <!-- Shopping List Cards -->
    <div v-else class="w-full max-w-6xl">
      <!-- Grid of category cards -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ShoppingCategorySection
          v-for="[category, items] in availableCategories"
          :key="category"
          :category-name="category"
          :items="items"
        />
      </div>

      <!-- Total Section -->
      <div class="bg-[#fff3e3] rounded-xl shadow-md border border-[#44200E]/10 p-6">
        <div class="flex justify-between items-center">
          <span class="text-3xl mona-sans-custom font-bold text-[#44200E] uppercase"
            >Total Aprox:</span
          >
          <div class="text-right">
            <div class="text-4xl font-bold text-[#C5DF67]">{{ formatTotal(totalCost) }}€</div>
            <div class="w-20 h-2 bg-[#C5DF67] ml-auto mt-2 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useShoppingList } from '@/meal-planning/shopping-lists';
import { useWeeklyPlan } from '@/meal-planning/weekly-plans';
import ShoppingCategorySection from '@/meal-planning/shopping-lists/components/ShoppingCategorySection.vue';

const { generateShoppingList, groupByCategory, formatForExport } = useShoppingList();
const { getAllPlannedMeals, init } = useWeeklyPlan();

// Estado para el mensaje de copiado
const showCopiedMessage = ref(false);

// Initialize weekly plan on mount
onMounted(() => {
  init();
});

// Auto-generate shopping list whenever planned meals change
const shoppingList = computed(() => {
  const plannedMeals = getAllPlannedMeals.value;
  const recipes = plannedMeals.map((meal) => meal.recipe);
  return generateShoppingList(recipes);
});

// Group items by category
const groupedList = computed(() => {
  return groupByCategory(shoppingList.value).value;
});

// Filter out categories that have no items
const availableCategories = computed(() => {
  const entries = Object.entries(groupedList.value);
  return entries.filter(([, items]) => items.length > 0);
});

// Calculate total by summing individual category totals
const totalCost = computed(() => {
  return availableCategories.value.reduce((total, [, items]) => {
    return total + calculateCategoryTotal(items);
  }, 0);
});

// Calculate category total (same logic as in component)
const calculateCategoryTotal = (items: { name: string; totalQuantity: number; unit: string }[]) => {
  const basePrices: Record<string, number> = {
    // Proteínas
    Pollo: 6.5,
    Ternera: 12,
    Cerdo: 8,
    Pavo: 7,
    Salmón: 15,
    Atún: 4,
    Huevos: 0.25,
    Tofu: 3,
    Garbanzos: 1.2,

    // Lácteos
    Leche: 1,
    Yogur: 0.8,
    Queso: 8,
    Mantequilla: 4,

    // Verduras y frutas
    Tomate: 2.5,
    Cebolla: 1.5,
    Ajo: 4,
    Pimiento: 3,
    Espinacas: 2,
    Brócoli: 2.5,
    Zanahoria: 1.2,
    Apio: 2,
    Limón: 2.5,
    Perejil: 1.5,

    // Carbohidratos
    Arroz: 1.5,
    Pasta: 1.2,
    Pan: 2,
    Patata: 1,
    Quinoa: 4,
    Avena: 2.5,

    // Grasas
    'Aceite de oliva': 4,
    Aguacate: 1.5,
    Almendras: 8,
    Nueces: 10,

    // Otros
    Sal: 0.5,
    Pimienta: 8,
    Comino: 6,
    Pimentón: 4,
    Azúcar: 1,
    Miel: 5,
  };

  const total = items.reduce((sum, item) => {
    const basePrice = basePrices[item.name] || 2;
    const quantity = item.totalQuantity;

    let unitMultiplier = 1;
    if (item.unit === 'g') unitMultiplier = 0.001;
    else if (item.unit === 'ml') unitMultiplier = 0.001;
    else if (item.unit === 'u') unitMultiplier = 1;

    return sum + basePrice * quantity * unitMultiplier;
  }, 0);

  return Math.round(total * 100) / 100;
};

// Format total cost
const formatTotal = (cost: number) => {
  return Math.round(cost * 100) / 100;
};

// Export shopping list
const exportList = () => {
  const formatted = formatForExport(shoppingList.value, 'text');

  // Create and download file
  const blob = new Blob([formatted], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'lista-compra.txt';
  link.click();
  URL.revokeObjectURL(url);
};

// Copy shopping list to clipboard
const copyToClipboard = async () => {
  try {
    const formatted = formatForExport(shoppingList.value, 'text');
    await navigator.clipboard.writeText(formatted);

    // Mostrar mensaje de confirmación
    showCopiedMessage.value = true;

    // Ocultar mensaje después de 2 segundos
    setTimeout(() => {
      showCopiedMessage.value = false;
    }, 2000);
  } catch (error) {
    console.error('Error al copiar al portapapeles:', error);
    // Fallback para navegadores que no soportan clipboard API
    fallbackCopyToClipboard(formatForExport(shoppingList.value, 'text'));
  }
};

// Fallback method for older browsers
const fallbackCopyToClipboard = (text: string) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    showCopiedMessage.value = true;
    setTimeout(() => {
      showCopiedMessage.value = false;
    }, 2000);
  } catch (error) {
    console.error('Error en el método fallback de copia:', error);
  }

  document.body.removeChild(textArea);
};
</script>
