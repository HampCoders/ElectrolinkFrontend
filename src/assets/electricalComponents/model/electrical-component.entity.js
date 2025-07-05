export class Component {
    /**
     * @param {object} data - Datos JSON recibidos de la API.
     * @param {string} data.id - El ID del componente (ej: "some-guid").
     * @param {string} data.name
     * @param {string} data.description
     * @param {boolean} data.isActive
     * @param {number} data.componentTypeId - Asumimos que el backend serializa ComponentTypeId a su valor primitivo.
     */
    constructor({ id, name, description, isActive, componentTypeId }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.isActive = isActive;
        this.typeId = componentTypeId;
    }
}