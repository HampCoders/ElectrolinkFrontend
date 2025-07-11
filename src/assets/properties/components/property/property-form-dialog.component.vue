<!-- src/components/property/property-dialog.vue -->
<template>
  <Dialog :visible="visible"
          :header="mode === 'edit' ? 'Editar Propiedad' : 'Agregar Nueva Propiedad'"
          modal :style="{ width: '600px' }"
          @update:visible="$emit('close')">

    <!-- ───── formulario ───── -->
    <div class="form-container p-fluid">
      <!-- Dirección / autocompletado -->
      <div class="field">
        <label>Dirección</label>
        <AutoComplete
            v-model="form.addressObj"
            :suggestions="searchResults"
            optionLabel="display_name"
            placeholder="Ej: Av. Arequipa 123, Miraflores"
            @complete="searchAddress"
            @item-select="selectAddress"
            class="w-full">
          <template #item="{ item }">
            <i class="pi pi-map-marker mr-2" /> {{ item.display_name }}
          </template>
        </AutoComplete>
      </div>

      <!-- Mapa con pin -->
      <div class="map-wrapper">
        <PropertyMap :properties="mapProperty" :key="mapRerenderKey" />
      </div>

      <!-- Lat/Lon + distrito + región -->
      <div class="grid formgrid">
        <div class="field col-6">
          <label>Latitud</label>
          <InputText v-model.number="form.latitude" readonly />
        </div>
        <div class="field col-6">
          <label>Longitud</label>
          <InputText v-model.number="form.longitude" readonly />
        </div>
        <div class="field col-12 md:col-6">
          <label>Distrito</label>
          <InputText v-model="form.district" />
        </div>
        <div class="field col-12 md:col-6">
          <label>Región/Provincia</label>
          <InputText v-model="form.region" />
        </div>
      </div>
    </div>

    <!-- ───── footer ───── -->
    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" class="p-button-text"
              @click="$emit('close')" />
      <Button :label="mode === 'edit' ? 'Guardar cambios' : 'Guardar Propiedad'"
              icon="pi pi-check" :loading="isLoading"
              @click="onSubmit" />
    </template>
  </Dialog>
</template>

<script setup>
import { reactive, watch, computed, ref } from 'vue'
import Dialog                    from 'primevue/dialog'
import Button                    from 'primevue/button'
import InputText                 from 'primevue/inputtext'
import AutoComplete              from 'primevue/autocomplete'
import PropertyMap               from './property-map.component.vue'
import { geocodingService }      from '../../service/geocoding.service.js'
import { usePropertyStore }      from '../../store/property.store.js'

/* --------------- props / emits --------------- */
const props = defineProps({
  visible : Boolean,
  mode    : { type: String, default: 'create' }, // 'create' | 'edit'
  initial : { type: Object, default: null }      // propiedad al editar
})
const emit = defineEmits(['close'])

/* --------------- store & loading --------------- */
const store = usePropertyStore()
const isLoading = computed(() => store.isLoading)

/* --------------- formulario reactivo --------------- */
const form = reactive({
  addressObj: null,
  street    : '', district: '', region: '',
  latitude  : null, longitude: null
})

const mapProperty    = ref(null)
const mapRerenderKey = ref(0)        // fuerza redibujo del mapa
const searchResults  = ref([])
let   searchTimeout  = null

/* --------------- precarga al editar --------------- */
watch(() => props.initial, (val) => {
  if (!val) { resetForm(); return }

  form.street    = val.address?.street ?? ''
  form.district  = val.district
  form.region    = val.region
  form.latitude  = val.address?.latitude
  form.longitude = val.address?.longitude

  mapProperty.value = [val]
  mapRerenderKey.value++
}, { immediate: true })

/* --------------- autocomplete Nominatim --------------- */
function searchAddress (event) {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(async () => {
    searchResults.value = await geocodingService.search(event.query)
  }, 500)
}

function selectAddress ({ value: r }) {
  const adr = r.address
  form.street    = r.display_name.split(',').slice(0, 3).join(',')
  form.district  = adr.city || adr.suburb || adr.county || ''
  form.region    = adr.state || ''
  form.latitude  = +r.lat
  form.longitude = +r.lon

  mapProperty.value = [{
    id: 'temp', address: { latitude: form.latitude, longitude: form.longitude }
  }]
  mapRerenderKey.value++
}

/* --------------- submit --------------- */
async function onSubmit () {
  if (!form.latitude || !form.longitude) return console.error('Formulario inválido')

  const dto = {
    ownerId: store.currentOwnerId,   // obligatorio
    address: {
      street    : form.street.split(',')[0],
      number    : 'N/A',
      city      : form.district,
      postalCode: 'N/A',
      country   : 'Peru',
      latitude  : form.latitude,
      longitude : form.longitude
    },
    regionName      : form.region,      // alias legible
    regionCode      : '15',             // ⚠️ el código numérico/alfanumérico real
    districtName    : form.district,
    districtUbigeo  : '150101'          // ⚠️ código UBIGEO real del distrito
  }

  if (props.mode === 'edit') {
    await store.updateProperty(props.initial.id, dto)
  } else {
    await store.createProperty(dto)
  }
  emit('close')
  resetForm()
}

/* --------------- utils --------------- */
function resetForm () {
  Object.assign(form, { addressObj:null, street:'', district:'', region:'', latitude:null, longitude:null })
  mapProperty.value = null
}
</script>

<style scoped>
.map-wrapper{height:250px;width:100%;margin:1rem 0;border-radius:8px;overflow:hidden}
</style>
