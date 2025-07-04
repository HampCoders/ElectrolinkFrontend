
/**
 * Representa la dirección de una propiedad.
 */
class Address {
    constructor({ street, number, city, postalCode, country, latitude, longitude }) {
        this.street = street;
        this.number = number;
        this.city = city;
        this.postalCode = postalCode;
        this.country = country;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

/**
 * Representa una propiedad.
 */
export class Property {
    constructor({ id, ownerId, address, region, district }) {
        this.id = id;
        // Simplificamos ownerId a un string, que es más común.
        this.ownerId = ownerId.ownerId || ownerId;
        this.address = new Address(address || {});
        // Region y District se tratan como objetos simples.
        this.region = region || { name: '' };
        this.district = district || { name: '' };
    }
}