<script setup>
/* ────────────── Imports ────────────── */
import { computed, onMounted, ref } from 'vue';
import LanguageSwitcher from './public/components/language-switcher.vue';
import FooterContent    from './public/components/footer-content.vue';
import { useAuthenticationStore } from './iam/services/authentication.store.js';
import { Button as PvButton } from 'primevue';
import Drawer from 'primevue/sidebar';
import router from '@/router/index.js';

/* ────────────── Estado global ────────────── */
const auth = useAuthenticationStore();

/* ────────────── Estado local ────────────── */
const sessionRestored   = ref(false);
const mobileMenuVisible = ref(false);            /* 👈 sidebar */

/* ────────────── Derivados ────────────── */
const isSignedIn      = computed(() => auth.isSignedIn);
const isTechnician    = computed(() => !!auth.technicianId);
const isHomeOwner     = computed(() => !!auth.homeOwnerId);
const hasValidProfile = computed(() => isTechnician.value !== isHomeOwner.value);

/* Menús */
const itemsContracting = computed(() => [
  { label: 'Inicio',       to: '/homeContracting',                 icon: 'pi pi-home' },
  { label: 'Peticiones',   to: `/requests/${auth.homeOwnerId}`, icon: 'pi pi-info-circle' },
  { label: 'Propiedades',  to: `/property/${auth.homeOwnerId}`,      icon: 'pi pi-map' },
  { label: 'Servicios',    to: `/services/${auth.homeOwnerId}`,                          icon: 'pi pi-cog' }
]);

const itemsTechnician = computed(() => [
  { label: 'Inicio',       to: '/homeTechnician',                     icon: 'pi pi-home' },
  { label: 'Inventario',   to: `/technician-inventory/${auth.technicianId}`, icon: 'pi pi-info-circle' },
  { label: 'Dashboard',    to: '/analytics',                          icon: 'pi pi-chart-bar' },
  { label: 'Componentes',  to: `/electrical-components/${auth.technicianId}`,  icon: 'pi pi-box' },
  { label: 'Horarios',     to: `/schedules/${auth.technicianId}`,                          icon: 'pi pi-calendar' },
  { label: 'Servicios',    to: `/services/${auth.technicianId}`, icon: 'pi pi-cog' }
]);

const activeItems = computed(() =>
    !hasValidProfile.value ? [] :
        isHomeOwner.value      ? itemsContracting.value
            : itemsTechnician.value
);

const cambiarMenuLabel = computed(() =>
    isTechnician.value && isHomeOwner.value
        ? (isHomeOwner.value ? 'Cambiar a Técnico' : 'Cambiar a Contratista')
        : ''
);

/* ────────────── Ciclo de vida ────────────── */
onMounted(async () => {
  await auth.initializeAuth();
  sessionRestored.value = true;
});

/* ────────────── Métodos ────────────── */
function cambiarMenu() {
  if (!isTechnician.value || !isHomeOwner.value) return;
  router.push(isHomeOwner.value ? '/homeTechnician' : '/homeContracting');
}

function logout() {
  auth.signOut(router);
}

function openMobileMenu()  { mobileMenuVisible.value = true; }
function closeMobileMenu() { mobileMenuVisible.value = false; }
</script>

<template>
  <pv-toast />
  <pv-confirm-dialog />

  <template v-if="sessionRestored">
    <!-- NAVBAR -->
    <header>
      <pv-toolbar class="pv-toolbar-azul">
        <template #start>
          <!-- Burger solo en móviles -->
          <pv-button
              icon="pi pi-bars"
              class="burger d-desktop-none mr-2"
              v-if="isSignedIn && hasValidProfile"
              @click="openMobileMenu"
          />
          <h1 class="ml-2 titulo-electrolink">ElectroLink</h1>
        </template>

        <template #end >
          <template v-if="isSignedIn">
            <pv-button
                v-if="cambiarMenuLabel"
                :label="cambiarMenuLabel"
                @click="cambiarMenu"
                class="boton-cambiar-menu d-mobile-none"
            />
            <pv-button
                label="Cerrar sesión"
                @click="logout"
                class="boton-cambiar-menu ml-2 d-mobile-none"
                style="margin: 0 1.5rem"
            />
            <language-switcher class="language-switcher d-mobile-none" />
          </template>

          <template v-else>
            <router-link :to="{ name: 'sign-in' }" class="ml-2">
              <pv-button label="Sign In" class="boton-cambiar-menu" />
            </router-link>
            <router-link :to="{ name: 'sign-up' }" class="ml-2">
              <pv-button label="Sign Up" class="boton-cambiar-menu" />
            </router-link>
          </template>
        </template>
      </pv-toolbar>
    </header>

    <!-- MENÚ DESKTOP -->
    <div v-if="isSignedIn && hasValidProfile" class="botones-centro">
      <router-link
          v-for="item in activeItems"
          :key="item.label"
          :to="item.to"
          class="no-underline"
      >
        <pv-button
            :icon="item.icon"
            :label="item.label"
            class="boton-personalizado "
        />
      </router-link>
    </div>

    <!-- MENÚ MÓVIL – Sidebar -->
    <Drawer
        v-model:visible="mobileMenuVisible"
        position="left"
        class="pv-sidebar-menu"
        @hide="closeMobileMenu"
    >
      <h3 class="mb-3">Menú</h3>
      <ul class="sidebar-list">
        <li v-for="item in activeItems" :key="item.label">
          <router-link :to="item.to" @click="closeMobileMenu">
            <i :class="item.icon" class="mr-2" />
            {{ item.label }}
          </router-link>
        </li>
        <language-switcher class="language-switcher d-desktop-none" />
      </ul>
      <hr />
      <pv-button
          label="Cerrar sesión"
          class="p-button-text p-button-danger w-full mt-3"
          @click="logout"
      />
    </Drawer>
    <main>
      <div class="bg-lavander p-4 min-h-screen">
        <router-view />
      </div>
    </main>

    <!-- FOOTER -->
    <footer><footer-content /></footer>
  </template>

  <template v-else>
    <div class="text-white text-center p-6">Cargando sesión...</div>
  </template>
</template>

<style scoped>
/* Breakpoint helpers */
.d-mobile-none { display: none; } /* Hidden on mobile */
.d-desktop-none { display: block; } /* Shown on mobile */

/* Default state for desktop menu (hidden on mobile) */
.botones-centro {
  display: none; /* Hidden by default (mobile) */
}

@media (min-width: 768px) {
  .d-mobile-none   { display: block; } /* Shown on desktop */
  .d-desktop-none  { display: none; } /* Hidden on desktop */

  /* Desktop menu specific styles (shown on desktop) */
  .botones-centro {
    display: flex; /* Shown as flex container on desktop */
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    background-color: #ffe082;
    padding: 1rem 0;
    margin: 0 auto;
    width: 100%;
  }
}

/* Other existing styles */
.boton-personalizado {
  background-color: #fff;
  color: #1976d2;
  border: 1px solid #1976d2;
}

.boton-cambiar-menu {
  background-color: #ffe082;
  color: #1976d2;
  border: 1px solid #1976d2;
}

.burger {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
}

.sidebar-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-list li {
  margin-bottom: 1rem;
}

.sidebar-list a {
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
}
</style>
