<template>
  <Card>
    <template #title>Stock Actual</template>

    <template #content>
      <div v-if="isLoading" class="text-center p-4">
        <ProgressSpinner />
      </div>

      <DataTable v-else :value="inventoryItems" responsiveLayout="scroll">
        <!-- Nombre + ID -->
        <Column field="componentName" header="Componente">
          <template #body="slotProps">
            <div>{{ slotProps.data.componentName }}</div>
            <small class="text-color-secondary">{{ slotProps.data.componentId }}</small>
          </template>
        </Column>

        <!-- Cantidad y umbral -->
        <Column field="quantityAvailable" header="Cantidad" />
        <Column field="alertThreshold"   header="Umbral Alerta" />

        <!-- Última actualización -->
        <Column header="Última Actualización">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.lastUpdated) }}
          </template>
        </Column>

        <!-- Acciones -->
        <Column header="Acciones">
          <template #body="slotProps">
            <!-- ✏️ EDITAR -->
            <Button icon="pi pi-pencil"
                    class="p-button-rounded p-button-text p-button-warning"
                    @click="openEditDialog(slotProps.data)" />

            <!-- 🗑️ ELIMINAR -->
            <Button icon="pi pi-trash"
                    class="p-button-rounded p-button-text p-button-danger"
                    @click="confirmRemove(slotProps.data)" />
          </template>
        </Column>

        <template #empty>
          <div class="text-center p-4">
            No se encontró inventario para este técnico o está vacío.
          </div>
        </template>
      </DataTable>
    </template>
  </Card>

  <!-- diálogo de edición -->
  <Dialog v-model:visible="editVisible" header="Editar componente" modal :style="{ width: '450px' }">
    <div class="p-fluid">
      <div class="field">
        <label>Cantidad disponible</label>
        <InputNumber v-model="editItem.quantityAvailable" :min="0" class="w-full" />
      </div>

      <div class="field">
        <label>Umbral de alerta</label>
        <InputNumber v-model="editItem.alertThreshold" :min="0" class="w-full" />
      </div>
    </div>

    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" class="p-button-text"
              @click="editVisible = false" />
      <Button label="Guardar"  icon="pi pi-check" class="p-button-primary"
              @click="saveEdit" />
    </template>
  </Dialog>

  <!-- cuadro de confirmación -->
  <ConfirmDialog />
</template>

<script>
import Card            from 'primevue/card';
import DataTable       from 'primevue/datatable';
import Column          from 'primevue/column';
import Button          from 'primevue/button';
import Dialog          from 'primevue/dialog';
import ConfirmDialog   from 'primevue/confirmdialog';
import InputNumber     from 'primevue/inputnumber';
import ProgressSpinner from 'primevue/progressspinner';
import { useConfirm }  from 'primevue/useconfirm';
import dayjs           from 'dayjs';

export default {
  name: 'inventory-list',
  components: {
    Card,
    DataTable,
    Column,
    Button,
    Dialog,
    ConfirmDialog,
    InputNumber,
    ProgressSpinner
  },
  props: {
    inventoryItems: { type: Array,   default: () => [] },
    isLoading:      { type: Boolean, default: false }
  },
  emits: ['update-quantity', 'update-item', 'remove-item'],

  setup() {
    const confirm = useConfirm();
    return { confirm };
  },

  data() {
    return {
      editVisible: false,
      editItem: {}
    };
  },

  methods: {
    /* incrementa / decrementa uno */
    onUpdateQuantity(item, newQuantity) {
      if (newQuantity < 0) return;
      this.$emit('update-quantity', {
        componentId: item.componentId,
        newQuantity
      });
    },

    /* abre el modal ✏️ */
    openEditDialog(item) {
      this.editItem    = { ...item };   // copia reactiva
      this.editVisible = true;
    },

    /* guarda cambios del modal */
    saveEdit() {
      const { componentId, quantityAvailable, alertThreshold } = this.editItem;
      this.$emit('update-item', { componentId, quantityAvailable, alertThreshold });
      this.editVisible = false;
    },

    /* confirma borrado */
    confirmRemove(item) {
      this.confirm.require({
        message: `¿Eliminar ${item.componentName}?`,
        header:  'Confirmación',
        icon:    'pi pi-exclamation-triangle',
        accept:  () => this.$emit('remove-item', item.componentId)
      });
    },

    /* formatea fecha */
    formatDate(value) {
      if (!value) return '—';
      if (!isNaN(value) && Number(value) < 5e10)
        return dayjs.unix(Number(value)).format('DD/MM/YYYY HH:mm');
      const d = dayjs(value);
      return d.isValid() ? d.format('DD/MM/YYYY HH:mm') : '—';
    }
  }
};
</script>
