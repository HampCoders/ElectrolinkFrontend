<template>
  <div class="property-list">
    <div v-if="!properties || properties.length === 0" class="p-3 text-center text-color-secondary">
      No hay propiedades para mostrar.
    </div>
    <div v-else v-for="property in properties" :key="property.id"
         class="list-item p-3 border-bottom-1 surface-border cursor-pointer"
         :class="{ 'selected-item': property.id === selectedPropertyId }"
         @click="$emit('property-selected', property.id)">
      <div class="flex align-items-center">
        <i class="pi pi-home mr-2 text-primary"></i>
        <div class="flex-1">
          <div class="font-bold"><span>{{ property?.fullAddress || 'Dirección no disponible'}}</span></div>
          <div class="text-sm text-color-secondary">
            {{ property.district }}, {{ property.region }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'property-list',
  props: ['properties', 'selectedPropertyId']
};
</script>
<style scoped>
.property-list {
  flex-grow: 1;
  overflow-y: auto;
}
.list-item:hover {
  background: var(--p-surface-600);          /* antes --surface-c */
}

.selected-item {
  background: var(--p-primary-color);  /* antes --primary-color-reverse */
  color:      var(--p-primary-color);     /* antes --primary-color-text */
  border-left:4px solid var(--p-primary-color);/* antes --primary-color    */
}
</style>