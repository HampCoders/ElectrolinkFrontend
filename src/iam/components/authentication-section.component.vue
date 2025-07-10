<script setup>
import { useRouter } from "vue-router";
import { useAuthenticationStore } from "../services/authentication.store.js";

const router = useRouter();
const authenticationStore = useAuthenticationStore();

const isSignedIn = computed(() => authenticationStore.isSignedIn);
const currentUsername = computed(() => authenticationStore.currentUsername);

const onSignIn = () => router.push({ name: "sign-in" });
const onSignUp = () => router.push({ name: "sign-up" });
const onSignOut = () => authenticationStore.signOut(router);
</script>

<template>
  <div class="flex items-center gap-3">
    <template v-if="isSignedIn">
      <span class="text-white">Welcome, {{ currentUsername }}</span>
      <Button text label="Sign Out" class="p-button-sm" @click="onSignOut" />
    </template>
    <template v-else>
      <Button text label="Sign In" class="p-button-sm" @click="onSignIn" />
      <Button text label="Sign Up" class="p-button-sm" @click="onSignUp" />
    </template>
  </div>
</template>
