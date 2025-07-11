<template>
  <div v-if="property">
    <Card>
      <template #title>   {{ fullAddress || 'Dirección no disponible' }}   </template>
      <template #subtitle>{{ district || '—' }}, {{ region || '—' }}       </template>

      <template #content>
        <p><strong>Propietario ID:</strong> {{ property.ownerId ?? '—' }}</p>

        <p class="mb-1"><strong>Coordenadas:</strong></p>
        <ul class="list-none p-0 m-0">
          <li>Latitud : {{ lat ?? '—' }}</li>
          <li>Longitud: {{ lon ?? '—' }}</li>
        </ul>
      </template>

      <template #footer>
        <Button icon="pi pi-pencil" label="Editar" class="p-button-text"
                @click="$emit('edit', property)" />
        <Button icon="pi pi-trash"  label="Eliminar" class="p-button-text p-button-danger" />
      </template>
    </Card>
  </div>

  <div v-else class="flex flex-column align-items-center justify-content-center h-full text-center p-4">
    <i class="pi pi-info-circle text-4xl text-color-secondary mb-3"></i>
    <p class="text-color-secondary">Selecciona una propiedad para ver sus detalles.</p>
  </div>
</template>

<script>
import Card   from 'primevue/card'
import Button from 'primevue/button'

export default {
  name: 'property-detail',
  components: { Card, Button },
  props: { property: Object },

  computed: {
    // Dirección legible
    fullAddress () {
      const p = this.property
      if (!p) return null
      if (p.fullAddress) return p.fullAddress            // si la API ya lo trae

      const adr = p.address ?? {}
      return [adr.street, adr.number, p.districtName ?? p.district, p.regionName ?? p.region]
          .filter(Boolean)
          .join(', ')
    },
    district () { return this.property?.districtName ?? this.property?.district },
    region   () { return this.property?.regionName   ?? this.property?.region   },
    lat () { return this.property.address.latitude  },
    lon () { return this.property.address.longitude }
  }
}
</script>