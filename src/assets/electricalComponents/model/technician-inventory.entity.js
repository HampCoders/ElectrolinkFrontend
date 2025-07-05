import { ComponentStock } from './electricalComponentStock.entity.js';

export class TechnicianInventory {
    /**
     * @param {object} data - Datos JSON de la API.
     * @param {string} data.id
     * @param {string} data.technicianId
     * @param {Array<object>} data.stockItems
     */
    constructor({ id, technicianId, stockItems = [] }) {
        this.id = id;
        this.technicianId = technicianId;
        this.stockItems = stockItems.map(item => new ComponentStock(item));
    }

    get totalItemsCount() {
        return this.stockItems.reduce((total, item) => total + item.quantityAvailable, 0);
    }

    get lowStockItems() {
        return this.stockItems.filter(item => item.isLowOnStock);
    }
}