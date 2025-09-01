<template>
  <header
    class="my-5 mx-auto max-w-7xl w-full rounded-lg bg-white/50 backdrop-blur-lg border border-white/20 shadow-lg"
  >
    <nav class="flex items-center justify-between px-8 py-4">
      <div class="flex items-center space-x-6">
        <router-link
          v-for="link in leftLinks"
          :key="link.to"
          :to="link.to"
          :class="baseLinkClasses"
          class="nav-link"
        >
          {{ link.text }}
        </router-link>
      </div>

      <div class="flex-shrink-0">
        <img :src="logo" alt="Logo de SAMENUFIT" class="h-8 w-auto" />
      </div>

      <div class="flex items-center space-x-6">
        <router-link
          v-for="link in rightLinks"
          :key="link.to"
          :to="link.to"
          :class="baseLinkClasses"
          class="nav-link"
        >
          {{ link.text }}
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.svg';

// 3. Definimos los links como datos para no repetir código (Principio DRY)
const leftLinks = [
  { to: '/weekly-plan', text: 'Plan Semanal' },
  { to: '/shopping-list', text: 'Lista Compra' },
];

const rightLinks = [
  { to: '/recipe-book', text: 'Libro Recetas' },
  { to: '/conversion-tab', text: 'Chuleta Cantidades' },
];

// 4. Centralizamos las clases de los links en una sola constante
const baseLinkClasses =
  'mona-sans-custom text-main font-bold text-md uppercase relative transition-colors duration-200 ease-in-out hover:text-accent';
</script>

<style scoped>
.nav-link {
  position: relative;
  display: inline-block;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 3px;
  background-color: var(--accent-color);
  transition: width 0.2s ease-in-out;
}

.nav-link:hover::after {
  width: 100%;
}

/* Estilo para el link activo */
.nav-link.router-link-active::after {
  width: 100%;
}
</style>
