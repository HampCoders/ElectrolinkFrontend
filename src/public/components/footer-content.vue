<script>
export default {
  name: "footer-content"
}
</script>

<template>
  <div class="grid bg-footer-azul mt-4 p-2 align-content-start">
    <div class="col-12 ml-3 align-items-center justify-content-center">
      <p>Copyright © 2025. ELECTROLINK Studios</p>
    </div>
    <div class="col-12 ml-3 mt-1 align-items-center justify-content-center">
      <p>
        {{ $t('authoring-phrase.intro') }} <i class="pi pi-heart"/>
        {{ $t('authoring-phrase.use') }} <a href="https://primevue.org/" target="_blank">PrimeVue</a>
        {{ $t('authoring-phrase.author', {brand: 'ACME'}) }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.bg-footer-azul {
  background-color: #1976d2 !important;
  color: #111 !important;
  text-align: center;
  font-weight: bold;
}
.bg-footer-azul a {
  color: #fff !important;
}
</style>