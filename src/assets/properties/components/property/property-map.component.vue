<template>
  <div class="map-container" ref="mapElement"></div>
</template>

<script>
import L from 'leaflet';

// Configuración del ícono por defecto para Leaflet
const iconDefault = L.icon({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

export default {
  name: 'property-map',
  props: {
    properties: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      map: null,
      markersLayer: null
    };
  },
  watch: {
    // Observa cambios en las propiedades para actualizar los marcadores
    properties() {
      this.updateMarkers();
    }
  },
  mounted() {
    this.initMap();
  },
  beforeUnmount() {
    // Limpia el mapa para evitar fugas de memoria
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  },
  methods: {
    initMap() {
      if (this.map || !this.$refs.mapElement) return;

      this.map = L.map(this.$refs.mapElement, {
        center: [-12.046374, -77.042793], // Centro en Lima, Perú
        zoom: 12
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap'
      }).addTo(this.map);

      this.markersLayer = L.featureGroup().addTo(this.map);
      this.updateMarkers();
    },
    updateMarkers() {
      if (!this.map || !this.markersLayer) return;
      this.markersLayer.clearLayers();

      const validProperties = (this.properties || []).filter(
          p => p.address?.latitude != null && p.address?.longitude != null
      );

      if (validProperties.length === 0) return;

      validProperties.forEach(prop => {
        const marker = L.marker([prop.address.latitude, prop.address.longitude]);
        marker.bindPopup(`<b>${prop.address.street || 'Propiedad'}</b>`);
        marker.on('click', () => {
          this.$emit('property-selected', prop.id);
          this.map.flyTo([prop.address.latitude, prop.address.longitude], 15);
        });
        this.markersLayer.addLayer(marker);
      });

      // Ajusta el zoom para que todos los marcadores sean visibles
      const bounds = this.markersLayer.getBounds();
      if (bounds.isValid()) {
        this.map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }
};
</script>
<style scoped>
.map-container {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  background-color: #f0f0f0; /* Color de fondo mientras carga */
}
</style>