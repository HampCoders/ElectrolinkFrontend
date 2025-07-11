<!-- src/components/PropertyCreateDialog.vue -->
<template>
  <Dialog header="Agregar Nueva Propiedad" :visible="visible" modal :style="{ width: '600px' }" @update:visible="$emit('close')">
    <div class="form-container p-fluid">
      <div class="field">
        <label for="street">Dirección</label>
        <AutoComplete v-model="form.addressObj" :suggestions="searchResults" @complete="searchAddress" placeholder="Ej: Av. Arequipa 123, Miraflores" @item-select="selectAddress" optionLabel="display_name"  class="w-full">
          <template #item="slotProps">
            <div class="flex align-items-center">
              <i class="pi pi-map-marker mr-2"></i>
              <div>{{ slotProps.item.display_name }}</div>
            </div>
          </template>
        </AutoComplete>
      </div>

      <div class="map-wrapper">
        <PropertyMap :properties="mapProperty" :key="mapRerenderKey" />
      </div>

      <div class="grid formgrid">
        <div class="field col-6">
          <label for="lat">Latitud</label>
          <InputText id="lat" v-model.number="form.latitude" readonly />
        </div>
        <div class="field col-6">
          <label for="lon">Longitud</label>
          <InputText id="lon" v-model.number="form.longitude" readonly />
        </div>
        <div class="field col-12 md:col-6">
          <label for="district">Distrito</label>
          <InputText id="district" v-model="form.district" />
        </div>
        <div class="field col-12 md:col-6">
          <label for="region">Región/Provincia</label>
          <InputText id="region" v-model="form.region" />
        </div>
      </div>
    </div>

    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="$emit('close')" />
      <Button label="Guardar Propiedad" icon="pi pi-check" @click="onSubmit" :loading="isLoading" />
    </template>
  </Dialog>
</template>

<script>
import { usePropertyStore } from '../../store/property.store.js';
import { geocodingService } from '../../service/geocoding.service.js';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import AutoComplete from 'primevue/autocomplete';
import PropertyMap from './property-map.component.vue';

export default {
  name: 'property-create-dialog',
  components: { Dialog, Button, InputText, AutoComplete, PropertyMap },
  props: ['visible'],
  emits: ['close'],
  data() {
    return {
      store: usePropertyStore(),
      form: {
        addressObj   : null,
        street: '',
        district: '',
        region: '',
        latitude: null,
        longitude: null,
      },
      searchResults: [],
      mapProperty: null,
      mapRerenderKey: 0, // Para forzar la actualización del mapa
      searchTimeout: null
    };
  },
  computed: {
    isLoading() {
      return this.store.isLoading;
    }
  },
  methods: {
    searchAddress(event) {
      // Debounce manual para no hacer peticiones en cada tecla
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(async () => {
        this.searchResults = await geocodingService.search(event.query);
      }, 500);
    },
    selectAddress(event) {
      const result = event.value;
      const address = result.address;

      this.form.street = result.display_name.split(',').slice(0, 3).join(',');
      this.form.district = address.city || address.suburb || address.county || '';
      this.form.region = address.state || '';
      this.form.latitude = parseFloat(result.lat);
      this.form.longitude = parseFloat(result.lon);

      // Actualiza el pin en el mapa del diálogo
      this.mapProperty = [{
        id: 'temp-id',
        address: { latitude: this.form.latitude, longitude: this.form.longitude }
      }];
      this.mapRerenderKey++; // Fuerza la actualización del componente de mapa
    },
    async onSubmit() {
      if (!this.form.latitude || !this.form.longitude) {
        console.error("Formulario inválido");
        return;
      }

      const dto = {
        address: {
          street: this.form.street.split(',')[0],
          number: 'N/A',
          city: this.form.district,
          postalCode: 'N/A',
          country: 'Perú',
          latitude: this.form.latitude,
          longitude: this.form.longitude,
        },
        regionName: this.form.region,
        districtName: this.form.district
      };

      try {
        console.log("DTO final:", dto);
        await this.store.createProperty(dto);
        this.$emit('close');
        this.resetForm();
      } catch (error) {
        console.error("Error al guardar la propiedad:", error);
      }
    },
    resetForm() {
      this.form = { street: '', district: '', region: '', latitude: null, longitude: null };
      this.mapProperty = null;
    }
  }
};
</script>

<style scoped>
.map-wrapper {
  height: 250px;
  width: 100%;
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;
}
</style>
