<template>
  <header
    class="my-5 mx-auto max-w-7xl w-full rounded-lg bg-white/50 backdrop-blur-lg border border-white/20 shadow-lg"
  >
    <!-- Desktop Navigation -->
    <nav class="hidden md:relative md:flex md:items-center md:justify-center md:px-8 md:py-4">
      <!-- Enlaces izquierdos -->
      <div class="absolute left-8 flex items-center space-x-6">
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

      <!-- Logo centrado -->
      <div class="flex-shrink-0">
        <img :src="logo" alt="Logo de SAMENUFIT" class="h-8 w-auto" />
      </div>

      <!-- Enlaces derechos -->
      <div class="absolute right-8 flex items-center space-x-6">
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

    <!-- Mobile Navigation -->
    <nav class="flex md:hidden items-center justify-between px-6 py-4">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <img :src="logo" alt="Logo de SAMENUFIT" class="h-8 w-auto" />
      </div>

      <!-- Hamburger Button -->
      <button
        @click="toggleMobileMenu"
        class="flex flex-col items-center justify-center w-8 h-8 gap-1 transition-all duration-200"
        :class="{ transform: isMobileMenuOpen }"
        aria-label="Toggle mobile menu"
      >
        <span
          class="block w-6 h-0.5 transition-all duration-300 origin-center hamburger-line"
          :class="isMobileMenuOpen ? 'transform translate-y-1.5 rotate-45' : ''"
        ></span>
        <span
          class="block w-6 h-0.5 transition-all duration-300 hamburger-line"
          :class="isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''"
        ></span>
        <span
          class="block w-6 h-0.5 transition-all duration-300 origin-center hamburger-line"
          :class="isMobileMenuOpen ? 'transform -translate-y-1.5 -rotate-45' : ''"
        ></span>
      </button>
    </nav>

    <!-- Mobile Menu Dropdown -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4 max-h-0"
      enter-to-class="opacity-100 translate-y-0 max-h-96"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0 max-h-96"
      leave-to-class="opacity-0 -translate-y-2 max-h-0"
    >
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden bg-white/50 backdrop-blur-lg border-t border-white/20 shadow-sm overflow-hidden"
      >
        <nav class="flex flex-col p-6 space-y-4">
          <router-link
            v-for="link in allLinks"
            :key="link.to"
            :to="link.to"
            class="block p-3 mona-sans-custom text-main font-bold text-md uppercase rounded-lg transition-all duration-200 ease-in-out hover:text-accent relative mobile-nav-link"
            @click="closeMobileMenu"
          >
            {{ link.text }}
          </router-link>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import logo from '@/assets/logo.svg';

const isMobileMenuOpen = ref(false);

// Definimos los links como datos para no repetir código (Principio DRY)
const leftLinks = [
  { to: '/weekly-plan', text: 'Plan Semanal' },
  { to: '/shopping-list', text: 'Lista Compra' },
];

const rightLinks = [
  { to: '/recipe-book', text: 'Libro Recetas' },
  { to: '/conversion-tab', text: 'Chuleta Cantidades' },
];

// Combinamos todos los links para el menu mobile
const allLinks = computed(() => [...leftLinks, ...rightLinks]);

// Centralizamos las clases de los links en una sola constante
const baseLinkClasses =
  'mona-sans-custom text-main font-bold text-md uppercase relative transition-colors duration-200 ease-in-out hover:text-accent nav-link';

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<style scoped>
/* Estilos personalizados fuera de Tailwind*/
.hamburger-line {
  background-color: var(--main-color);
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

.nav-link.router-link-active::after {
  width: 100%;
}

.mobile-nav-link::after {
  content: '';
  position: absolute;
  bottom: 8px;
  left: 12px;
  width: 0;
  height: 2px;

  background-color: var(--accent-color);
  transition: width 0.2s ease-in-out;
}

.mobile-nav-link:hover::after,
.mobile-nav-link.router-link-active::after {
  width: calc(100% - 24px);
}

.mobile-nav-link.router-link-active {
  color: var(--main-color);
}
</style>
