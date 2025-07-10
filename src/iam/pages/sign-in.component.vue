<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthenticationStore } from "../services/authentication.store.js";

import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";

const router = useRouter();
const authenticationStore = useAuthenticationStore();

const username = ref("");
const password = ref("");

const onSignIn = async () => {
  const request = {
    username: username.value,
    password: password.value,
  };

  const isSuccessful = await authenticationStore.signIn(request, router);

  if (isSuccessful) {
    await authenticationStore.restoreSession(); // 🔄 asegura que esté sincronizado
    router.replace("/homeContracting");         // ✅ ahora redirige solo cuando ya todo está cargado
  }
};
</script>

<template>
  <div class="signin-page">
    <div class="signin-card">
      <h2>Sign In</h2>
      <p class="description">Please enter your credentials to sign in.</p>

      <form @submit.prevent="onSignIn" class="p-fluid">
        <div class="field">
          <label for="username">Username</label>
          <InputText id="username" v-model="username" class="w-full" required />
        </div>

        <div class="field">
          <label for="password">Password</label>
          <Password id="password" v-model="password" toggleMask class="w-full" required />
        </div>

        <Button type="submit" label="Sign In" class="signin-button mt-3 w-full" />
      </form>
    </div>
  </div>
</template>

<style scoped>
.signin-page {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #121212;
}

.signin-card {
  background: #ffffff;
  padding: 2rem 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
}

.signin-card h2 {
  color: #1d4ed8;
  margin-bottom: 0.5rem;
}

.description {
  color: #4b5563;
  margin-bottom: 1.5rem;
}

.field label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 500;
  color: #111827;
}

.signin-button {
  background-color: #34d399 !important;
  border: none;
}
</style>
