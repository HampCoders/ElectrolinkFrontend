import { defineStore } from 'pinia';
import { ref } from 'vue';
import { technicianInventoryService } from '../service/technician-inventory.service.js';

export const useTechnicianInventoryStore = defineStore('inventory', () => {
    const inventory = ref(null); // Contendrá el objeto TechnicianInventory
    const isLoading = ref(false);
    const error = ref(null);

    async function fetchInventory(technicianId) {
        if (!technicianId) return;
        isLoading.value = true;
        error.value = null;
        try {
            inventory.value = await technicianInventoryService.getInventory(technicianId);
        } catch (e) {
            inventory.value = null; // Limpiar en caso de error
            error.value = `No se pudo cargar el inventario para el técnico ${technicianId}.`;
            console.error(e);
        } finally {
            isLoading.value = false;
        }
    }

    async function addStockToInventory(technicianId, stockData) {
        isLoading.value = true;
        error.value = null;
        try {
            await technicianInventoryService.addStockItem(technicianId, stockData);
            await fetchInventory(technicianId);
        } catch(e) {
            error.value = "Error al añadir el componente al stock.";
            throw e;
        } finally {
            isLoading.value = false;
        }
    }

    async function updateStock(technicianId, componentId, updateData) {
        isLoading.value = true;
        error.value = null;
        try {
            inventory.value = await technicianInventoryService.updateStockItem(technicianId, componentId, updateData);
        } catch (e) {
            error.value = "Error al actualizar el stock.";
            throw e;
        } finally {
            isLoading.value = false;
        }
    }

    async function removeStock(technicianId, componentId) {
        isLoading.value = true;
        error.value = null;
        try {
            await technicianInventoryService.removeStockItem(technicianId, componentId);
            await fetchInventory(technicianId);
        } catch(e) {
            error.value = "Error al eliminar el componente del stock.";
            throw e;
        } finally {
            isLoading.value = false;
        }
    }

    return { inventory, isLoading, error, fetchInventory, addStockToInventory, updateStock, removeStock };
});