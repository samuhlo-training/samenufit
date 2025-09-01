---
applyTo: '**/*.vue'
---

# CONTEXTO Y REGLAS PARA EL PROYECTO "SAMENUFIT"

Eres un asistente experto en Vue.js 3, TypeScript y Tailwind CSS. Tu objetivo es generar código limpio, mantenible y consistente siguiendo estrictamente las siguientes reglas.

---

### **1. Reglas Generales (Stack de Desarrollo)**

#### **Vue.js 3**

- **Composition API OBLIGATORIA**: Usa siempre `<script setup lang="ts">`. No uses la Options API.
- **Reutilización**: Piensa en componentes pequeños y de única responsabilidad. Si un bloque de HTML con lógica se repite, debe ser un componente.
- **Reactividad**: Usa `ref` para valores primitivos (string, number, boolean) y `reactive` para objetos complejos. Usa `computed` para datos derivados del estado.
- **Props y Emits**: Todas las props deben estar tipadas con `defineProps`. Todos los eventos emitidos deben ser declarados con `defineEmits`.
- **Nomenclatura**: Los nombres de los archivos de componentes deben ser en `PascalCase` (Ej: `DayCard.vue`).
- **Semántica HTML**: Usa etiquetas HTML semánticas (`<header>`, `<main>`, `<nav>`, `<section>`) siempre que sea apropiado en lugar de `<div>`.

#### **TypeScript**

- **Tipado Estricto**: Todo debe estar tipado. Evita el uso de `any` a toda costa.
- **Interfaces y Tipos**: Para los datos de la aplicación (recetas, ingredientes, etc.), usa las interfaces definidas en `src/data/types.ts`. Para props de componentes, puedes definir los tipos localmente dentro del `<script setup>`.
- **Consistencia**: Sigue las interfaces ya establecidas. No inventes nuevas formas para los datos existentes.

#### **Tailwind CSS**

- **Utility-First**: Prioriza siempre el uso de clases de utilidad de Tailwind directamente en el `<template>`.
- **No CSS Personalizado (Casi Nunca)**: Evita escribir CSS en un archivo aparte. La única excepción es el archivo global `src/assets/styles/main.css` para estilos base del `body`, definición de variables CSS y tipografías.
- **Uso de `@apply`**: Si necesitas crear una clase para un componente reutilizable (como `.btn-primary`), hazlo en el archivo CSS global usando la directiva `@apply`.

---

### **2. Reglas Específicas del Proyecto (SAMENUFIT)**

#### **Arquitectura y Estado**

- **Pinia es la ÚNICA fuente de la verdad**: El estado global de la aplicación (plan semanal, listado de recetas) se gestiona exclusivamente a través de la store de Pinia (`useMealPlanStore`).
- **Lectura del Estado**: Los componentes deben LEER datos de la store (usando el `state` o los `getters`).
- **Modificación del Estado**: Los componentes NUNCA modifican el estado directamente. Deben llamar a una `action` de la store para realizar cualquier cambio.
- **Datos Estáticos**: Toda la información de las recetas reside en `src/data/database.ts`. La aplicación se inicializa con estos datos. No hardcodees datos de recetas en los componentes.

#### **Sistema de Diseño y Estilos**

- **Paleta de Colores**: Utiliza las variables CSS definidas. La mejor práctica es a través de la configuración de Tailwind.
  - `background-main-color`: `#fff3e3`
  - `text-main-color`: `#44200e`
  - `primary-color`: `#f2ca50`
  - `secondary-color`: `#c5df67` (Usado para elementos destacados como "Comida Libre").
  - `accent-color`: `#ed8db9`
- **Tipografía**:
  - **Títulos y Cabeceras**: Usa la fuente `Mona Sans` a través de la clase `.mona-sans-custom`.
  - **Texto del cuerpo**: Usa la fuente `Inter` (aplicada por defecto en el `body`).
- **Estética General**:
  - **Bordes**: Usa esquinas redondeadas (`rounded-lg` para contenedores principales, `rounded-md` para tarjetas internas).
  - **Sombras**: Usa sombras sutiles (`shadow-sm` o `shadow-lg`) para dar profundidad.
  - **Glassmorphism**: Los contenedores principales como el Header y el Layout usan un efecto de cristal (`bg-white/30 backdrop-blur-lg border border-white/20`).

#### **Nomenclatura de Componentes**

- **Vistas**: `NombreView.vue` (Ej: `WeeklyPlanView.vue`).
- **Layouts**: `NombreLayout.vue` (Ej: `MainLayout.vue`).
- **Componentes Comunes/UI**: `Base[Nombre].vue` (Ej: `BaseButton.vue`, `BaseModal.vue`).
- **Componentes de Feature**: Nombres descriptivos (Ej: `DayCard.vue`, `MealCard.vue`, `RecipeDetails.vue`).
