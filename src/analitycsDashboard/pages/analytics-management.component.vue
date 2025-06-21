<script>
import { ref } from 'vue'
import { TechnicianService } from '../services/technician.service.js'

export default {
  name: 'analytics-management',
  data() {
    return {
      technicianId: '',
      technician: null,
      works: []
    }
  },
  methods: {
    async fetchTechnicianData() {
      if (!this.technicianId) return
      const technicianService = new TechnicianService()
      const [techRes, worksRes] = await Promise.all([
        technicianService.getById(this.technicianId),
        technicianService.getWorksByTechnicianId(this.technicianId)
      ])
      this.technician = techRes.data
      this.works = worksRes.data
    }
  }
}
</script>
<template>
  <div>
    <input v-model="technicianId" type="number" placeholder="ID del técnico" />
    <button @click="fetchTechnicianData">Buscar</button>
    <div class="parent">
      <div class="div1">
        <template v-if="technician">
          <h2>{{ technician.name }}</h2>
          <p>{{ technician.email }}</p>
        </template>
      </div>
      <div class="div2">
        <template v-if="works.length">
          <div v-for="work in works" :key="work.id" class="work-item">
            <h3>{{ work.title }}</h3>
            <p>{{ work.description }}</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.parent {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  margin-top: 20px;
}
.div1 {
  background: #2196f3;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  min-height: 120px;
}
.div2 {
  background: #ffeb3b;
  color: #333;
  padding: 20px;
  border-radius: 8px;
  min-height: 120px;
}
.work-item {
  margin-bottom: 16px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 8px;
}
</style>