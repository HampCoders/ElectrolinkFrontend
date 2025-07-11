<script>
import { RequestService } from '../services/request.service.js'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
export default {
  name: 'analytics-management',
  data() {
    return {
      technicianId: localStorage.getItem('technicianId') === 'null' ? null : localStorage.getItem('technicianId'),
      requests: [],
      dashboard: {
        total: 0,
        statusCount: {},
        avgEnergyConsumed: 0,
        avgAmountPaid: 0
      },
      priceChart: null,
      dateChart: null
    }
  },
  methods: {
    async fetchRequestsByTechnician() {
      try {
        const requestService = new RequestService()
        const requests = await requestService.getByTechnicianId(this.technicianId)
        this.requests = requests
        // Analíticas
        this.dashboard.total = requests.length
        this.dashboard.statusCount = requests.reduce((acc, r) => {
          acc[r.status] = (acc[r.status] || 0) + 1
          return acc
        }, {})
        const energyArr = requests.map(r => r.bill?.energyConsumed || 0)
        const amountArr = requests.map(r => r.bill?.amountPaid || 0)
        this.dashboard.avgEnergyConsumed = energyArr.length ? (energyArr.reduce((a, b) => a + b, 0) / energyArr.length).toFixed(2) : 0
        this.dashboard.avgAmountPaid = amountArr.length ? (amountArr.reduce((a, b) => a + b, 0) / amountArr.length).toFixed(2) : 0
        this.renderCharts()
      } catch (error) {
        console.error('Error getting requests by technician ID', error)
        if (this.$toast) {
          this.$toast.add({ severity: 'error', summary: 'Requests no encontradas', life: 3000 })
        }
      }
    },
    renderCharts() {
      // Precios
      const priceCtx = document.getElementById('priceChart')?.getContext('2d')
      if (priceCtx) {
        if (this.priceChart) this.priceChart.destroy()
        this.priceChart = new Chart(priceCtx, {
          type: 'bar',
          data: {
            labels: this.requests.map(r => r.scheduledDate),
            datasets: [{
              label: 'Monto Pagado',
              data: this.requests.map(r => r.bill?.amountPaid || 0),
              backgroundColor: '#2196f3'
            }]
          },
          options: {
            responsive: true,
            plugins: { legend: { display: false } }
          }
        })
      }
      // Fechas programadas
      const dateCtx = document.getElementById('dateChart')?.getContext('2d')
      if (dateCtx) {
        if (this.dateChart) this.dateChart.destroy()
        this.dateChart = new Chart(dateCtx, {
          type: 'line',
          data: {
            labels: this.requests.map(r => r.scheduledDate),
            datasets: [{
              label: 'Requests por Fecha',
              data: this.requests.map(() => 1),
              backgroundColor: '#ff9800',
              borderColor: '#ff9800',
              fill: false
            }]
          },
          options: {
            responsive: true,
            plugins: { legend: { display: false } }
          }
        })
      }
    }
  },
  mounted() {
    this.fetchRequestsByTechnician()
  },
  updated() {
    this.renderCharts()
  }
}
</script>
<template>
  <div>
    <h2>Dashboard de Requests del Técnico</h2>
    <button @click="fetchRequestsByTechnician">Actualizar</button>
    <div v-if="requests.length">
      <p><strong>Total de requests:</strong> {{ dashboard.total }}</p>
      <p><strong>Promedio de energía consumida:</strong> {{ dashboard.avgEnergyConsumed }}</p>
      <p><strong>Promedio de monto pagado:</strong> ${{ dashboard.avgAmountPaid }}</p>
      <div>
        <strong>Cantidad por estado:</strong>
        <ul>
          <li v-for="(count, status) in dashboard.statusCount" :key="status">
            {{ status }}: {{ count }}
          </li>
        </ul>
      </div>
      <h3>Gráficos de Estadísticas</h3>
      <div style="display:flex;gap:40px;flex-wrap:wrap;">
        <div>
          <canvas id="priceChart" width="400" height="250"></canvas>
          <p style="text-align:center;">Montos pagados por fecha programada</p>
        </div>
        <div>
          <canvas id="dateChart" width="400" height="250"></canvas>
          <p style="text-align:center;">Cantidad de requests por fecha programada</p>
        </div>
      </div>
      <h3>Repositorio de Requests</h3>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="background:#eee;">
            <th style="border:1px solid #ccc;padding:8px;">Fecha Programada</th>
            <th style="border:1px solid #ccc;padding:8px;">Estado</th>
            <th style="border:1px solid #ccc;padding:8px;">Periodo Facturación</th>
            <th style="border:1px solid #ccc;padding:8px;">Energía Consumida</th>
            <th style="border:1px solid #ccc;padding:8px;">Monto Pagado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in requests" :key="request.requestId">
            <td style="border:1px solid #ccc;padding:8px;">{{ request.scheduledDate }}</td>
            <td style="border:1px solid #ccc;padding:8px;">{{ request.status }}</td>
            <td style="border:1px solid #ccc;padding:8px;">{{ request.bill?.billingPeriod }}</td>
            <td style="border:1px solid #ccc;padding:8px;">{{ request.bill?.energyConsumed }}</td>
            <td style="border:1px solid #ccc;padding:8px;">${{ request.bill?.amountPaid }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No se encontraron requests para el técnico actual.</p>
    </div>
  </div>
</template>
<style scoped>
div {
  margin: 20px;
}
button {
  margin-bottom: 20px;
}
</style>
