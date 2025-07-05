import axios from 'axios';
import { ComponentType } from '../model/componentType.entity.js';

// Instancia de Axios configurada para apuntar al controlador de ComponentTypes.
const apiClient = axios.create({
    baseURL: 'http://localhost:5055/api/v1/componenttypes', // <-- URL base actualizada
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Servicio para gestionar las operaciones CRUD de los Tipos de Componente.
 */
export const componentTypeService = {
    /**
     * Obtiene todos los tipos de componentes.
     * Llama a: GET /api/v1/componenttypes
     * @returns {Promise<ComponentType[]>} Un array de instancias de ComponentType.
     */
    async getAll() {
        const response = await apiClient.get('/');
        return response.data.map(typeData => new ComponentType(typeData));
    },

    /**
     * Obtiene un tipo de componente por su ID.
     * Llama a: GET /api/v1/componenttypes/{typeId}
     * @param {number} typeId - El ID del tipo de componente.
     * @returns {Promise<ComponentType>} Una instancia de ComponentType.
     */
    async getById(typeId) {
        const response = await apiClient.get(`/${typeId}`);
        return new ComponentType(response.data);
    },

    /**
     * Crea un nuevo tipo de componente.
     * Llama a: POST /api/v1/componenttypes
     * @param {{ name: string, description: string }} typeData - Datos para el nuevo tipo.
     * @returns {Promise<ComponentType>} La instancia del ComponentType creado.
     */
    async create(typeData) {
        const response = await apiClient.post('/', typeData);
        return new ComponentType(response.data);
    },

    /**
     * Actualiza un tipo de componente existente.
     * Llama a: PUT /api/v1/componenttypes/{typeId}
     * @param {number} typeId - El ID del tipo a actualizar.
     * @param {{ name: string, description: string }} typeData - Los nuevos datos.
     * @returns {Promise<ComponentType>} La instancia del ComponentType actualizado.
     */
    async update(typeId, typeData) {
        const response = await apiClient.put(`/${typeId}`, typeData);
        return new ComponentType(response.data);
    },

    /**
     * Elimina un tipo de componente.
     * Llama a: DELETE /api/v1/componenttypes/{typeId}
     * @param {number} typeId - El ID del tipo a eliminar.
     * @returns {Promise<void>}
     */
    async delete(typeId) {
        await apiClient.delete(`/${typeId}`);
    }
};
