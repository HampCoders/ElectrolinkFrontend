import { defineStore } from 'pinia';
import { ref } from 'vue';
import { technicianInventoryService } from '../service/technicianInventory.service.js';

export const useTechnicianInventoryStore = defineStore('inventory', () => {
    // --- STATE ---
    const inventory = ref(null); // Contendrá el objeto TechnicianInventory
    const isLoading = ref(false);
    const error = ref(null);

    // --- ACTIONS ---
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
            // Tras añadir, recargamos el inventario para ver el cambio.
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
            // El servicio devuelve el inventario actualizado, así que lo asignamos directamente.
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
            // Tras eliminar, recargamos para ver los cambios.
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