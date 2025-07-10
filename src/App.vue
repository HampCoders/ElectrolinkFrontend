<script>
import LanguageSwitcher from "./public/components/language-switcher.vue";
import FooterContent from "./public/components/footer-content.vue";
import { useAuthenticationStore } from "../src/iam/services/authentication.store.js";

export default {
  name: "App",
  components: {
    LanguageSwitcher,
    FooterContent,
  },
  data() {
    return {
      drawer: false,
      isBuyer: false,
      sessionRestored: false,
    };
  },
  computed: {
    authenticationStore() {
      return useAuthenticationStore();
    },
    isSignedIn() {
      return this.authenticationStore.isSignedIn;
    },
    activeItems() {
      return this.isBuyer ? this.items_Contracting : this.items_Technician;
    },
    cambiarMenuLabel() {
      return this.isBuyer ? "Cambiar a Técnico" : "Cambiar a Contratista";
    },
    items_Contracting() {
      return [
        { label: "Inicio", to: "/homeContracting", icon: "pi pi-home" },
        { label: "Peticiones", to: "/about", icon: "pi pi-info-circle" },
        { label: "Propiedades", to: "/property", icon: "pi pi-map" },
        { label: "Servicios", to: "/services", icon: "pi pi-cog" }
      ];
    },
    items_Technician() {
      return [
        { label: "Inicio", to: "/homeTechnician", icon: "pi pi-home" },
        {
          label: "Inventario",
          to: "/technician-inventory/0a8237b1-fad7-400a-ad8d-22a2e64a9408",
          icon: "pi pi-info-circle",
        },
        { label: "Dashboard", to: "/analytics", icon: "pi pi-chart-bar" },
        {
          label: "Componentes",
          to: "/electrical-component-registration",
          icon: "pi pi-box",
        },
        { label: "Horarios", to: "/schedules", icon: "pi pi-calendar" },
        { label: "Servicios", to: "/services", icon: "pi pi-cog" }
      ];
    },
  },
  async mounted() {
    await this.authenticationStore.restoreSession();
    this.isBuyer = localStorage.getItem("isBuyer") === "true";
    this.sessionRestored = true;
  },
  watch: {
    "authenticationStore.isSignedIn"(newVal) {
      if (newVal) {
        this.isBuyer = localStorage.getItem("isBuyer") === "true";
      }
    },
  },
  methods: {
    cambiarMenu() {
      this.isBuyer = !this.isBuyer;
      localStorage.setItem("isBuyer", this.isBuyer);
      this.$router.push(this.isBuyer ? "/homeContracting" : "/homeTechnician");
    },
    logout() {
      this.authenticationStore.signOut(this.$router);
      localStorage.removeItem("isBuyer");
    },
  },
};
</script>

<template>
  <pv-toast />
  <pv-confirm-dialog />

  <!-- Espera a que se restaure la sesión para mostrar layout -->
  <template v-if="sessionRestored">
    <!-- NAVBAR -->
    <header>
      <pv-toolbar class="pv-toolbar-azul">
        <template #start>
          <h1 class="ml-2 titulo-electrolink">ElectroLink</h1>
        </template>

        <template #end>
          <template v-if="isSignedIn">
            <pv-button :label="cambiarMenuLabel" @click="cambiarMenu" class="boton-cambiar-menu" />
            <pv-button label="Cerrar sesión" @click="logout" class="boton-cambiar-menu ml-2" />
            <language-switcher class="language-switcher" />
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

    <!-- MENÚ SOLO SI YA ESTÁ AUTENTICADO -->
    <div v-if="isSignedIn" class="botones-centro">
      <pv-button
          v-for="item in activeItems"
          :key="item.label"
          class="boton-personalizado"
          as-child
          v-slot="slotProps"
      >
        <router-link :to="item.to" :class="slotProps['class']">
          {{ item.label }}
        </router-link>
      </pv-button>
    </div>

    <!-- CONTENIDO -->
    <main>
      <div class="bg-lavander p-4 min-h-screen">
        <router-view />
      </div>
    </main>

    <!-- FOOTER -->
    <footer>
      <footer-content />
    </footer>
  </template>

  <!-- LOADER si no está restaurado -->
  <template v-else>
    <div class="text-white text-center p-6">Cargando sesión...</div>
  </template>
</template>

<style scoped>
.ml-2 {
  margin-left: 0.5rem;
}

.titulo-electrolink {
  font-size: 2.2rem;
  font-weight: bold;
  letter-spacing: 1px;
  line-height: 1.1;
}

header {
  background-color: #0d47a1 !important;
}

.botones-centro {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: #ffe082 !important;
  border-radius: 0;
  padding: 1rem 0;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.pv-toolbar-azul {
  background-color: #1976d2 !important;
}

.boton-personalizado {
  background-color: #fff !important;
  color: #1976d2 !important;
  border: 1px solid #1976d2 !important;
}

.boton-cambiar-menu {
  background-color: #ffe082 !important;
  color: #1976d2 !important;
  border: 1px solid #1976d2 !important;
}

.language-switcher {
  margin-left: 0.5rem;
}
</style>
