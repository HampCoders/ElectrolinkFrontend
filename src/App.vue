<script>
import LanguageSwitcher from "./public/components/language-switcher.vue";
import FooterContent from "./public/components/footer-content.vue";

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
      items_Contracting: [
        { label: "Inicio", to: "/homeContracting", icon: "pi pi-home" },
        { label: "Peticiones", to: "/about", icon: "pi pi-info-circle" },
        { label: "Propiedades", to: "/properties", icon: "pi pi-map" },
      ],
      items_Technician: [
        { label: "Inicio", to: "/homeTechnician", icon: "pi pi-home" },
        { label: "Inventario", to: "/inventory-component", icon: "pi pi-info-circle" },
        { label: "DashBoard", to: "/analytics", icon: "pi pi-star" },
      ],
    };
  },
  computed: {
    activeItems() {
      return this.isBuyer ? this.items_Contracting : this.items_Technician;
    },
    cambiarMenuLabel() {
      return this.isBuyer ? 'Cambiar a Técnico' : 'Cambiar a Contratista';
    }
  },
  methods: {
    cambiarMenu() {
      this.isBuyer = !this.isBuyer;
      if (this.isBuyer) {
        this.$router.push('/homeContracting');
      } else {
        this.$router.push('/homeTechnician');
      }
    }
  }
};


</script>

<template>
  <pv-toast />
  <pv-confirm-dialog />

  <header>
    <pv-toolbar class="pv-toolbar-azul">
      <template #start>
        <h1 class="ml-2 titulo-electrolink">ElectroLink</h1>
      </template>
      <template #end>
        <pv-button :label="cambiarMenuLabel" @click="cambiarMenu" class="boton-cambiar-menu" />
        <pv-button icon="pi pi-heart" class="ml-2 boton-icono boton-cambiar-menu" />
        <pv-button icon="pi pi-share-alt" class="ml-2 boton-icono boton-cambiar-menu" />
        <language-switcher class="language-switcher" />
      </template>
    </pv-toolbar>
  </header>

  <div class="botones-centro">
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

  <main>
    <div class="bg-lavander p-4 min-h-screen">
      <router-view />
    </div>
  </main>

  <footer>
    <footer-content />
  </footer>
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
  background-color: #ffe082 !important; /* Amarillo igual que los botones */
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
  background-color: #ffe082 !important; /* Amarillo claro */
  color: #1976d2 !important;            /* Azul medio */
  border: 1px solid #1976d2 !important;
}

.language-switcher {
  margin-left: 0.5rem;
}

</style>
