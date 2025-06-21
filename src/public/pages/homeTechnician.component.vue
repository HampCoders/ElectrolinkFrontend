<script>
export default {
  name: "homeTechnician",
  title: "Home Technician",
}
</script>

<template>
  <div class="inicio-technician">
    <div class="logo-container">
      <img src="https://cdn-icons-png.flaticon.com/512/1042/1042341.png" alt="Logo Técnico" class="logo-technician" />
      <h1 class="titulo">Bienvenido Técnico a ElectroLink</h1>
      <p class="subtitulo">Administra tu inventario, ofrece servicios eléctricos y revisa tu historial de trabajos realizados.</p>
    </div>
    <div class="features">
      <div class="feature-card">
        <i class="pi pi-box icono-feature"></i>
        <h2>Inventario de Componentes</h2>
        <p>Guarda y gestiona tus componentes eléctricos para estar siempre preparado ante cualquier servicio.</p>
      </div>
      <div class="feature-card">
        <i class="pi pi-bolt icono-feature"></i>
        <h2>Servicios Eléctricos</h2>
        <p>Ofrece tus servicios a clientes que necesitan soluciones rápidas y profesionales.</p>
      </div>
      <div class="feature-card">
        <i class="pi pi-chart-bar icono-feature"></i>
        <h2>Dashboard de Trabajos</h2>
        <p>Consulta y analiza todos los trabajos realizados, con acceso a estadísticas y reportes.</p>
      </div>
    </div>
    <div class="cta">
      <p>¿Listo para trabajar? <router-link to="/dashboard" class="cta-link">Ir al Dashboard</router-link> o <router-link to="/inventory" class="cta-link">gestionar inventario</router-link>.</p>
    </div>
  </div>
</template>

<style scoped>
.inicio-technician {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  text-align: center;
}
.logo-container {
  margin-bottom: 2rem;
}
.logo-technician {
  width: 80px;
  margin-bottom: 1rem;
}
.titulo {
  font-size: 2.2rem;
  font-weight: bold;
  color: #1976d2;
}
.subtitulo {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1.5rem;
}
.features {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 2rem;
}
.feature-card {
  background: #fff;
  border: 1px solid #1976d2;
  border-radius: 12px;
  padding: 1.5rem 1rem;
  width: 260px;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
  text-align: center;
}
.icono-feature {
  font-size: 2.5rem;
  color: #1976d2;
  margin-bottom: 0.5rem;
}
.cta {
  margin-top: 2rem;
  font-size: 1.1rem;
}
.cta-link {
  color: #1976d2;
  font-weight: bold;
  text-decoration: underline;
  margin: 0 0.3rem;
}
.cta-link:hover {
  color: #0d47a1;
}
</style>