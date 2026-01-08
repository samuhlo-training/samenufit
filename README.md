<div align="center">
  <br />
  <br />
  
  # <code>SAMENUFIT</code>
  
  **MEAL PLANNING & NUTRITION ASSISTANT**
  
  <br />

  <img src="https://img.shields.io/badge/VUE_3-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D" alt="Vue" />
  <img src="https://img.shields.io/badge/TYPESCRIPT-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PINIA-FFD859?style=for-the-badge&logo=vue.js&logoColor=black" alt="Pinia" />
  <img src="https://img.shields.io/badge/TAILWIND-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  

  <br />
  <br />
</div>

---

### 00 __ PREVIEW

![Hero Preview](portada-readme.webp)

> **ABSTRACT:** Aplicación web para gestión de menú diario, planificación semanal y listas de compra automáticas. Implementa arquitectura DDD con bounded contexts para recetas, planes semanales y shopping lists. Almacenamiento local con LocalStorage adapter.
>
> <br />
>
> **ORIGIN:** Proyecto personal para implementar recetas de [Doctor Mike Diamonds](https://www.youtube.com/@DoctorMikeDiamonds).
> *Práctica de Vue 3 Composition API con arquitectura escalable.*
>
> <br />
>
> **DEMO:** [samenufit.vercel.app](https://samenufit.vercel.app/)

---

### 01 __ ARCHITECTURE & DECISIONS

| COMPONENT | TECH | NOTE |
| :--- | :--- | :--- |
| **Core** | `Vue 3 (Composition API)` | Script Setup syntax. Screaming Architecture + DDD. |
| **State** | `Pinia` | Stores por bounded context (recipes, weekly-plans). |
| **Router** | `Vue Router 4` | SPA routing con lazy loading. |
| **Styles** | `Tailwind CSS v4` | Utility-first con configuración custom. |
| **Build** | `Vite` | Development server + HMR. |
| **Runtime** | `Bun` | Package manager y task runner. |
| **Storage** | `LocalStorage Adapter` | Persistencia de datos cliente. |

**Bounded Contexts:**
```
meal-planning/
  ├── recipes/           → Gestión de recetas con macros
  ├── weekly-plans/      → Planificación semanal + generación aleatoria
  └── shopping-lists/    → Consolidación de ingredientes
```

<br>

### 02 __ INSTALLATION

*Run local environment:*

```bash
# 1. Clone
git clone https://github.com/samuhlo-training/samenufit.git
cd samenufit

# 2. Install dependencies (Bun enforced)
bun install

# 3. Ignite
bun dev
```

### 03 __ KEY FEATURES / SNIPPETS

#### A. WEEKLY PLAN COMPOSABLE
Gestión reactiva del plan semanal con persistencia automática.

```typescript
// useWeeklyPlan.ts - Estado compartido entre componentes
import { useWeeklyPlanStore } from '../stores/weekly-plan-store'

export const useWeeklyPlan = () => {
  const store = useWeeklyPlanStore()
  
  const assignRecipe = (dayId: string, mealType: string, recipe: Recipe) => {
    store.assignRecipe(dayId, mealType, recipe)
  }
  
  return {
    weeklyPlan: computed(() => store.weeklyPlan),
    assignRecipe,
    generateRandomPlan: () => store.generateRandomPlan(),
  }
}
```

#### B. SHOPPING LIST CONSOLIDATION
Algoritmo de consolidación de ingredientes desde plan semanal.

```typescript
// useShoppingList.ts - Extracción y agrupación
const generateFromWeeklyPlan = () => {
  const plan = weeklyPlanStore.weeklyPlan
  const ingredientMap = new Map<string, { amount: number; unit: string }>()
  
  plan.days.forEach(day => {
    Object.values(day.meals).forEach(meal => {
      if (meal.recipe) {
        meal.recipe.ingredients.forEach(ing => {
          // Consolidate same ingredients
          const existing = ingredientMap.get(ing.name)
          if (existing && existing.unit === ing.unit) {
            existing.amount += ing.amount
          } else {
            ingredientMap.set(ing.name, { ...ing })
          }
        })
      }
    })
  })
  
  return Array.from(ingredientMap.entries())
}
```

<div align="center">

<br />

<code>DESIGNED & CODED BY <a href='https://github.com/samuhlo'>samuhlo</a></code>

<br />

<small>Lugo, Galicia</small>

</div>
