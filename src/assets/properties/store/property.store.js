// src/store/property.store.js
import { defineStore } from 'pinia'
import { propertyService } from '../service/property.service.js'

/** ID “mock” del propietario actual (cámbialo cuando tengas auth real) */
const CURRENT_OWNER_ID = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

/* --------------------------------------------------------------------------
 *  Utils: normalización del DTO
 * -------------------------------------------------------------------------- */
function normalizeProperty (raw) {
    const adr = raw.address ?? {}

    // Soporta GeoJSON coordinates: [lon, lat]
    const [lonArr, latArr] = Array.isArray(adr.coordinates) ? adr.coordinates : []

    const latitude  = adr.latitude  ?? adr.lat  ?? latArr ?? raw.latitude
    const longitude = adr.longitude ?? adr.lng  ?? adr.long ?? lonArr ?? raw.longitude

    return {
        ...raw,

        /* Dirección legible */
        fullAddress:
            raw.fullAddress
            ?? [adr.street, adr.number, raw.districtName ?? raw.district, raw.regionName ?? raw.region]
                .filter(Boolean)
                .join(', '),

        /* Alias unificados */
        district : raw.districtName ?? raw.district ?? '',
        region   : raw.regionName   ?? raw.region   ?? '',

        /* Address con lat/lon garantizados */
        address: {
            ...adr,
            latitude,
            longitude
        }
    }
}

/* --------------------------------------------------------------------------
 *  Store Pinia
 * -------------------------------------------------------------------------- */
export const usePropertyStore = defineStore('properties', {
    /* ---------- state ---------- */
    state: () => ({
        properties        : [],
        selectedPropertyId: null,
        isLoading         : false,
        error             : null
    }),

    /* ---------- getters ---------- */
    getters: {
        /** Propiedad actualmente seleccionada (o null) */
        selectedProperty (state) {
            if (!state.selectedPropertyId) return null
            return state.properties.find(p => p.id === state.selectedPropertyId) || null
        },
        /** Exponemos el owner id por conveniencia */
        currentOwnerId () {
            return CURRENT_OWNER_ID
        }
    },

    /* ---------- actions ---------- */
    actions: {
        /** Carga todas las propiedades y las normaliza */
        async fetchAllProperties () {
            this.isLoading = true
            this.error = null
            try {
                const raw = await propertyService.getAll(CURRENT_OWNER_ID) // ← obtenemos la lista
                this.properties = raw.map(normalizeProperty)               // ← normalizamos
            } catch (err) {
                this.error = 'No se pudieron cargar las propiedades.'
                console.error(err)
            } finally {
                this.isLoading = false
            }
        },

        /** Crea una nueva propiedad y refresca la lista */
        async createProperty (propertyData) {
            this.isLoading = true
            this.error = null
            try {
                await propertyService.create(CURRENT_OWNER_ID, propertyData)
                await this.fetchAllProperties() // la normalización ya se aplica aquí
            } catch (err) {
                this.error = 'Error al crear la propiedad.'
                console.error(err)
                throw err
            } finally {
                this.isLoading = false
            }
        },

        async updateProperty(propertyId, payload) {
            this.isLoading = true
            try {
                await propertyService.update(CURRENT_OWNER_ID, propertyId, payload)
                // … refrescar lista, etc.
            } catch (e) {
                // 🔴  Aquí capturamos el detalle exacto que viene en la respuesta
                console.group('%cBACKEND RESPONSE', 'color:#e91e63')
                console.log('status:', e.response?.status)   // debería ser 400
                console.log('data  :', e.response?.data)     // ← aquí vendrán los errores de validación
                console.groupEnd()

                this.error = 'Error al actualizar la propiedad'
                throw e
            } finally {
                this.isLoading = false
            }
        },

        /** Selecciona una propiedad por ID */
        selectPropertyById (propertyId) {
            this.selectedPropertyId = propertyId
        },

        /** Limpia la selección */
        clearSelection () {
            this.selectedPropertyId = null
        }
    }
})
