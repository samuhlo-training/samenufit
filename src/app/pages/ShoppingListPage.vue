<template>
  <div class="container mx-auto flex flex-col justify-center items-center">
    <!-- Header with action buttons -->
    <div class="flex flex-col gap-2 items-center justify-center w-full max-w-4xl mb-7">
      <h1 class="text-4xl mona-sans-custom uppercase font-bold text-main">Lista de la Compra</h1>
      <ActionButtons
        v-if="shoppingList.length > 0"
        :buttons="actionButtons"
        container-class="relative"
        :show-confirmation-message="true"
        :confirmation-visible="showCopiedMessage"
        confirmation-message="✓ ¡Copiada!"
        @button-click="handleButtonClick"
      />
    </div>

    <!-- Empty state -->
    <div v-if="shoppingList.length === 0" class="text-center py-12">
      <p class="text-main text-lg mb-4">No hay elementos en la lista de compra.</p>
      <p class="text-main opacity-70">
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
      <div class="p-6">
        <div class="flex justify-end gap-8 items-center">
          <span class="text-3xl mona-sans-custom font-bold text-main uppercase">Total Aprox:</span>
          <div class="text-right">
            <div
              class="gochi-hand-regular text-6xl underline decoration-wavy underline-offset-4 font-bold text-secondary"
            >
              {{ formatTotal(totalCost) }}€
            </div>
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
import ActionButtons, { type ActionButton } from '@/shared/components/ActionButtons.vue';

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

// Calculate category total using actual item prices
const calculateCategoryTotal = (items: { estimatedPrice?: number }[]) => {
  const total = items.reduce((sum, item) => {
    // Use the estimated price from the item (calculated from pricePerUnit * quantity)
    if (item.estimatedPrice) {
      return sum + item.estimatedPrice;
    }
    return sum; // Skip items without price data
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

// Configuration for action buttons
const actionButtons: ActionButton[] = [
  {
    id: 'export',
    label: 'Exportar',
    variant: 'primary',
  },
  {
    id: 'copy',
    label: 'Copiar',
    variant: 'secondary',
  },
];

// Handle button clicks
const handleButtonClick = (buttonId: string) => {
  switch (buttonId) {
    case 'export':
      exportList();
      break;
    case 'copy':
      copyToClipboard();
      break;
  }
};
</script>
