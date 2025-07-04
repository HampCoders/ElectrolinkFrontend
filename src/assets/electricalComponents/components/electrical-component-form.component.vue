<script setup>
import { ref, onMounted } from 'vue';

// --- TIENDAS PINIA ---
// Asumo que tienes una tienda para manejar los componentes.
// Si no la tienes, aquí te dejo un ejemplo de cómo podría ser.
// **Debes crear este archivo: /store/componentStore.js**
/*
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useComponentStore = defineStore('component', () => {
  const isLoading = ref(false);
  const error = ref(null);

  // Simulación de una llamada a la API para crear un componente
  async function createComponent(componentData) {
    isLoading.value = true;
    error.value = null;
    console.log("Enviando a la API:", componentData);

    try {
      // Aquí iría tu llamada real a la API, por ejemplo con fetch o axios
      // const response = await fetch('/api/components', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(componentData),
      // });

      // if (!response.ok) {
      //   throw new Error('No se pudo crear el componente.');
      // }

      // const result = await response.json();

      // Simulación de éxito
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula espera de red
      alert(`Componente "${componentData.name}" creado con éxito.`);

      return true; // Indicar éxito

    } catch (e) {
      console.error(e);
      error.value = e.message;
      alert(`Error: ${e.message}`);
      return false; // Indicar fallo
    } finally {
      isLoading.value = false;
    }
  }

  return { isLoading, error, createComponent };
});
*/

// Importa tus tiendas reales
import { useComponentStore } from '../store/componentStore.js'; // Ajusta la ruta a tu tienda de componentes
import { useComponentTypeStore } from '../store/componentTypeStore.js'; // Ajusta la ruta a tu tienda de tipos

// Inicializa las tiendas
const componentStore = useComponentStore();
const typeStore = useComponentTypeStore();

// --- ESTADO DEL FORMULARIO ---
// Define el estado reactivo para los campos del formulario.
// Se enlazarán con los inputs usando v-model.
const newComponent = ref({
  name: '',
  description: '',
  isActive: true, // Por defecto, el nuevo componente estará activo
  componentTypeId: null, // El ID del tipo de componente seleccionado
});

// --- LÓGICA DEL COMPONENTE ---

// Cuando el componente se monta, busca todos los tipos de componentes disponibles.
onMounted(() => {
  typeStore.fetchAllTypes();
});

// Maneja el envío del formulario
async function handleCreateComponent() {
  // Validación básica
  if (!newComponent.value.name || !newComponent.value.componentTypeId) {
    alert('Por favor, completa el nombre y selecciona un tipo.');
    return;
  }

  // Llama a la acción de la tienda para crear el componente
  const success = await componentStore.createComponent(newComponent.value);

  // Si la creación fue exitosa, limpia el formulario
  if (success) {
    newComponent.value = {
      name: '',
      description: '',
      isActive: true,
      componentTypeId: null,
    };
  }
}
</script>

<template>
  <div class="component-form-container">
    <h2>Crear Nuevo Componente Eléctrico</h2>
    <p>Completa los datos para registrar un nuevo componente en el sistema.</p>

    <!-- Usamos .prevent para evitar que la página se recargue al enviar -->
    <form @submit.prevent="handleCreateComponent" class="form-layout">
      <!-- Campo Nombre -->
      <div class="form-group">
        <label for="component-name">Nombre del Componente</label>
        <input
            id="component-name"
            v-model="newComponent.name"
            type="text"
            placeholder="Ej: Resistencia 10k Ohm"
            required
        />
      </div>

      <!-- Campo Descripción -->
      <div class="form-group">
        <label for="component-description">Descripción</label>
        <textarea
            id="component-description"
            v-model="newComponent.description"
            rows="3"
            placeholder="Ej: Resistencia de carbón, 1/4W, 5% tolerancia"
        ></textarea>
      </div>

      <!-- Campo Tipo de Componente -->
      <div class="form-group">
        <label for="component-type">Tipo de Componente</label>
        <select
            id="component-type"
            v-model="newComponent.componentTypeId"
            required
        >
          <option :value="null" disabled>-- Selecciona un tipo --</option>
          <!-- Se muestra un mensaje mientras se cargan los tipos -->
          <option v-if="typeStore.isLoading" disabled>Cargando tipos...</option>
          <!-- Itera sobre los tipos obtenidos de la tienda -->
          <option v-for="type in typeStore.types" :key="type.id" :value="type.id">
            {{ type.name }}
          </option>
        </select>
        <div v-if="typeStore.error" class="error-text">
          No se pudieron cargar los tipos.
        </div>
      </div>

      <!-- Campo Estado (Activo/Inactivo) -->
      <div class="form-group form-group-checkbox">
        <input
            id="component-active"
            v-model="newComponent.isActive"
            type="checkbox"
        />
        <label for="component-active">Componente Activo</label>
      </div>

      <!-- Botón de Envío y Estado de Carga -->
      <div class="form-actions">
        <button type="submit" :disabled="componentStore.isLoading">
          {{ componentStore.isLoading ? 'Creando...' : 'Crear Componente' }}
        </button>
      </div>
      <div v-if="componentStore.error" class="error-text">
        <strong>Error al crear:</strong> {{ componentStore.error }}
      </div>
    </form>
  </div>
</template>

<style scoped>
.component-form-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: sans-serif;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 0.5rem;
}

p {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.form-layout {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #444;
}

.form-group input[type="text"],
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.form-group input[type="text"]:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #007bff;
}

.form-group-checkbox {
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
}

.form-group-checkbox input[type="checkbox"] {
  width: 1.2em;
  height: 1.2em;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

button:disabled {
  background-color: #a0c3e6;
  cursor: not-allowed;
}

.error-text {
  color: #d9534f;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}
</style>
