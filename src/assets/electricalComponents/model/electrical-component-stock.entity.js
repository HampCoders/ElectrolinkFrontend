import { Component } from './electricalComponent.entity.js';

export class ComponentStock {
    /**
     * @param {object} data - Datos JSON recibidos de la API.
     * @param {string} data.id
     * @param {string} data.technicianInventoryId
     * @param {string} data.componentId
     * @param {string} [data.componentName] - El nombre del componente, enriquecido por la API.
     * @param {number} data.quantityAvailable
     * @param {number} data.alertThreshold
     * @param {string} data.lastUpdated
     * @param {object} [data.component] - Opcional: El objeto Component completo.
     */
    constructor({ id, technicianInventoryId, componentId, componentName, quantityAvailable, alertThreshold, lastUpdated, component }) {
        this.id = id;
        this.technicianInventoryId = technicianInventoryId;
        this.componentId = componentId;
        this.componentName = componentName || 'Cargando...'; // Nombre por defecto
        this.quantityAvailable = quantityAvailable;
        this.alertThreshold = alertThreshold;
        this.lastUpdated = new Date(lastUpdated);

        if (component) {
            this.component = new Component(component);
            this.componentName = component.name; // Priorizar el nombre del objeto completo
        }
    }

    get isLowOnStock() {
        return this.quantityAvailable <= this.alertThreshold;
    }

    get formattedLastUpdated() {
        return this.lastUpdated.toLocaleString();
    }
}