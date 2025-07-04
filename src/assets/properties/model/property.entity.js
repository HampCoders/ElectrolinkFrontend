import { Address } from './address.entity.js';
import { District } from './district.entity.js';
import { Region } from './region.entity.s';

export class Property {
    /**
     * @param {object} flatData - El objeto JSON plano recibido de la API.
     * @param {string} flatData.id
     * @param {string} flatData.status
     * @param {string|null} flatData.photoUrl
     * @param {string} flatData.street
     * @param {string} flatData.number
     * @param {string} flatData.city
     * @param {string} flatData.postalCode
     * @param {string} flatData.country
     * @param {number} flatData.latitude
     * @param {number} flatData.longitude
     * @param {string} flatData.regionName
     * @param {string} flatData.regionCode
     * @param {string} flatData.districtName
     * @param {string} flatData.districtUbigeo
     */
    constructor(flatData) {
        // Asignamos las propiedades de primer nivel directamente
        this.id = flatData.id;
        this.status = flatData.status;
        this.photoUrl = flatData.photoUrl;

        // Creamos las instancias de nuestros modelos anidados
        // a partir de los datos planos.
        // ¡Esta es la corrección clave!
        this.address = new Address({
            street: flatData.street,
            number: flatData.number,
            city: flatData.city,
            postalCode: flatData.postalCode,
            country: flatData.country,
            latitude: flatData.latitude,
            longitude: flatData.longitude,
        });

        this.region = new Region({
            name: flatData.regionName,
            code: flatData.regionCode,
        });

        this.district = new District({
            name: flatData.districtName,
            ubigeo: flatData.districtUbigeo,
        });
    }

    // El getter sigue funcionando perfectamente porque se basa
    // en la estructura anidada que acabamos de construir.
    get fullAddress() {
        if (!this.address.street) return 'Dirección no disponible';
        return `${this.address.street} ${this.address.number || ''}, ${this.address.city}, ${this.address.country}`;
    }
}