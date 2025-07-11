<script>
export default {
  name: "homeContracting",
  title: "Home Contracting",
}
</script>

<template>
  <div class="inicio-contracting">
    <div class="logo-container">
      <img src="https://cdn-icons-png.flaticon.com/512/1042/1042330.png" alt="Logo ElectroLink" class="logo-electrolink" />
      <h1 class="titulo">{{ $t('homeContracting.welcome') }}</h1>
      <p class="subtitulo">{{ $t('homeContracting.subtitle') }}</p>
    </div>
    <div class="features">
      <div class="feature-card">
        <i class="pi pi-user-plus icono-feature"></i>
        <h2>{{ $t('homeContracting.features.createRequests.title') }}</h2>
        <p>{{ $t('homeContracting.features.createRequests.desc') }}</p>
      </div>
      <div class="feature-card">
        <i class="pi pi-home icono-feature"></i>
        <h2>{{ $t('homeContracting.features.registerProperties.title') }}</h2>
        <p>{{ $t('homeContracting.features.registerProperties.desc') }}</p>
      </div>
      <div class="feature-card">
        <i class="pi pi-cog icono-feature"></i>
        <h2>{{ $t('homeContracting.features.maintainResources.title') }}</h2>
        <p>{{ $t('homeContracting.features.maintainResources.desc') }}</p>
      </div>
    </div>
    <div class="cta">
      <p>
        {{ $t('homeContracting.cta.ready') }}
        <router-link to="/about" class="cta-link">{{ $t('homeContracting.cta.firstRequest') }}</router-link>
        {{ $t('homeContracting.cta.registerProperty') }}
        <router-link to="/properties" class="cta-link">{{ $t('homeContracting.cta.registerProperty') }}</router-link>.
      </p>
    </div>
  </div>
</template>

<style scoped>
.inicio-contracting {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  text-align: center;
}
.logo-container {
  margin-bottom: 2rem;
}
.logo-electrolink {
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
  color: #e0e0e0;
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
  background: #1e1e1e;
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