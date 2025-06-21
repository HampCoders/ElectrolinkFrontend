<script setup>
import { onMounted, ref } from 'vue';
import { useComponentTypeStore } from '../store/componentTypeStore.js';

const typeStore = useComponentTypeStore();
const newTypeName = ref('');
const newTypeDesc = ref('');

// Cuando el componente se monta, busca los tipos existentes
onMounted(() => {
  typeStore.fetchAllTypes();
});

async function handleAddType() {
  if (!newTypeName.value.trim()) {
    alert('El nombre del tipo no puede estar vacío.');
    return;
  }

  // Llama a la acción para crear el tipo
  await typeStore.createType({
    name: newTypeName.value,
    description: newTypeDesc.value
  });

  // Limpia el formulario
  newTypeName.value = '';
  newTypeDesc.value = '';

  // Opcional: Recargar la lista de tipos después de crear uno nuevo
  // await typeStore.fetchAllTypes();
}
</script>

<template>
  <div class="type-form-container">
    <form @submit.prevent="handleAddType" class="form-layout">
      <div class="form-group">
        <label for="type-name">Nombre del Tipo</label>
        <input
            id="type-name"
            v-model="newTypeName"
            placeholder="Ej: Resistencias"
            required
        >
      </div>
      <div class="form-group">
        <label for="type-desc">Descripción</label>
        <input
            id="type-desc"
            v-model="newTypeDesc"
            placeholder="Componentes pasivos de dos terminales"
        >
      </div>
      <div class="form-actions">
        <button type="submit" :disabled="typeStore.isLoading">
          {{ typeStore.isLoading ? 'Agregando...' : 'Agregar Tipo' }}
        </button>
      </div>
    </form>

    <hr class="list-divider">

    <h3>Tipos Existentes</h3>
    <div v-if="typeStore.isLoading && !typeStore.types.length">Cargando tipos...</div>
    <ul v-else-if="typeStore.types.length > 0" class="type-list">
      <li v-for="type in typeStore.types" :key="type.id">
        <strong>{{ type.name }}</strong>
        <p v-if="type.description">{{ type.description }}</p>
      </li>
    </ul>
    <div v-else class="no-items-message-small">
      <p>Aún no hay tipos creados.</p>
    </div>
  </div>
</template>

<style scoped>
.type-form-container {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  border: 1px solid #e0e0e0;
}

.form-layout {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #444;
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

button {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #218838;
}

button:disabled {
  background-color: #94d3a2;
  cursor: not-allowed;
}

.list-divider {
  margin: 2rem 0;
  border: 0;
  border-top: 1px solid #eee;
}

h3 {
  margin-bottom: 1rem;
  color: #333;
}

.type-list {
  list-style: none;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
}

.type-list li {
  background-color: #f9f9f9;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  border-left: 3px solid #007bff;
}

.type-list p {
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
  color: #666;
}

.no-items-message-small {
  font-size: 0.9rem;
  color: #666;
  padding: 1rem;
  text-align: center;
  background-color: #f0f0f0;
  border-radius: 4px;
}
</style>
