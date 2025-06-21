export class Address {
    /**
     * @param {object} data
     * @param {string} data.street
     * @param {string} data.number
     * @param {string} data.city
     * @param {string} data.postalCode
     * @param {string} data.country
     * @param {number} data.latitude
     * @param {number} data.longitude
     */
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