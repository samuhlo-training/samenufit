import { computed } from 'vue';
import type { Recipe, IngredientCategory } from '@/shared/types';

export interface ShoppingListItem {
  id: string;
  name: string;
  totalQuantity: number;
  unit: 'g' | 'ml' | 'unidad(es)';
  category: IngredientCategory;
  recipes: string[]; // Recipe names that use this ingredient
  estimatedPrice?: number;
}

export const useShoppingList = () => {
  
  // Generate shopping list from planned recipes
  const generateShoppingList = (recipes: Recipe[]): ShoppingListItem[] => {
    const ingredientMap = new Map<string, ShoppingListItem>();
    
    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        const key = `${ingredient.name}-${ingredient.unit}`;
        
        if (ingredientMap.has(key)) {
          const existingItem = ingredientMap.get(key)!;
          existingItem.totalQuantity += ingredient.quantity;
          if (!existingItem.recipes.includes(recipe.name)) {
            existingItem.recipes.push(recipe.name);
          }
        } else {
          ingredientMap.set(key, {
            id: ingredient.id,
            name: ingredient.name,
            totalQuantity: ingredient.quantity,
            unit: ingredient.unit,
            category: ingredient.category,
            recipes: [recipe.name],
            estimatedPrice: ingredient.pricePerUnit ? 
              ingredient.pricePerUnit * ingredient.quantity : undefined,
          });
        }
      });
    });
    
    return Array.from(ingredientMap.values());
  };

  // Group shopping list by category
  const groupByCategory = (shoppingList: ShoppingListItem[]) => {
    return computed(() => {
      const grouped: Record<IngredientCategory, ShoppingListItem[]> = {
        'Proteína': [],
        'Carbohidrato': [],
        'Verdura': [],
        'Grasa': [],
        'Lacteos': [],
        'Otro': [],
      };

      shoppingList.forEach(item => {
        grouped[item.category].push(item);
      });

      // Filter out empty categories
      return Object.entries(grouped)
        .filter(([, items]) => items.length > 0)
        .reduce((acc, [category, items]) => {
          acc[category as IngredientCategory] = items;
          return acc;
        }, {} as Record<IngredientCategory, ShoppingListItem[]>);
    });
  };

  // Calculate total estimated cost
  const calculateTotalCost = (shoppingList: ShoppingListItem[]) => {
    return computed(() => {
      return shoppingList.reduce((total, item) => {
        return total + (item.estimatedPrice || 0);
      }, 0);
    });
  };

  // Format shopping list for export
  const formatForExport = (shoppingList: ShoppingListItem[], format: 'text' | 'markdown' = 'text') => {
    const grouped = groupByCategory(shoppingList).value;
    
    if (format === 'markdown') {
      let output = '# Lista de la Compra\n\n';
      
      Object.entries(grouped).forEach(([category, items]) => {
        output += `## ${category}\n\n`;
        items.forEach(item => {
          output += `- [ ] ${item.name}: ${item.totalQuantity} ${item.unit}`;
          if (item.recipes.length > 0) {
            output += ` _(para: ${item.recipes.join(', ')})_`;
          }
          output += '\n';
        });
        output += '\n';
      });
      
      return output;
    } else {
      let output = 'LISTA DE LA COMPRA\n\n';
      
      Object.entries(grouped).forEach(([category, items]) => {
        output += `${category.toUpperCase()}:\n`;
        items.forEach(item => {
          output += `- ${item.name}: ${item.totalQuantity} ${item.unit}`;
          if (item.recipes.length > 0) {
            output += ` (para: ${item.recipes.join(', ')})`;
          }
          output += '\n';
        });
        output += '\n';
      });
      
      return output;
    }
  };

  // Check off item from shopping list (for interactive usage)
  const toggleItemChecked = (shoppingList: ShoppingListItem[], itemId: string) => {
    // This would typically be managed by a store/state management
    // For now, we'll return a utility to help with this
    return shoppingList.map(item => 
      item.id === itemId 
        ? { ...item, checked: !('checked' in item ? item.checked : false) } 
        : item
    );
  };

  // Filter items by search query
  const filterItems = (shoppingList: ShoppingListItem[], searchQuery: string) => {
    return computed(() => {
      if (!searchQuery.trim()) return shoppingList;
      
      const query = searchQuery.toLowerCase();
      return shoppingList.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.recipes.some(recipe => recipe.toLowerCase().includes(query))
      );
    });
  };

  return {
    generateShoppingList,
    groupByCategory,
    calculateTotalCost,
    formatForExport,
    toggleItemChecked,
    filterItems,
  };
};