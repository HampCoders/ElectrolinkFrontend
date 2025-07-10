<script setup>
import { ref, computed } from "vue";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";

// CORRECTO: defineProps asignado a variable
const props = defineProps({
  onSubmit: {
    type: Function,
    required: true
  }
});

const username = ref("");
const password = ref("");

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const street = ref("");
const number = ref("");
const city = ref("");
const postalCode = ref("");
const country = ref("");

const role = ref("HomeOwner");
const dni = ref("");
const preferredContactTime = ref("");

const licenseNumber = ref("");
const specialization = ref("");

const isTechnician = computed(() => role.value === "Technician");
const isHomeOwner = computed(() => role.value === "HomeOwner");

const submitForm = () => {
  const request = {
    username: username.value,
    password: password.value,
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    street: street.value,
    number: number.value,
    city: city.value,
    postalCode: postalCode.value,
    country: country.value,
    role: role.value,
    dni: isHomeOwner.value ? dni.value : null,
    preferredContactTime: isHomeOwner.value ? preferredContactTime.value : null,
    licenseNumber: isTechnician.value ? licenseNumber.value : null,
    specialization: isTechnician.value ? specialization.value : null,
  };

  // ✅ CORRECTO uso de props.onSubmit
  if (typeof props.onSubmit === "function") {
    props.onSubmit(request);
  }
};
</script>

<template>
  <div class="card w-full md:w-6 mx-auto p-4">
    <h2>Sign Up</h2>
    <p class="mb-4">Please enter your details to create an account.</p>

    <!-- Credenciales -->
    <div class="field">
      <label for="username">Username</label>
      <InputText id="username" v-model="username" class="w-full" />
    </div>

    <div class="field">
      <label for="password">Password</label>
      <Password id="password" v-model="password" toggleMask class="w-full" />
    </div>

    <!-- Datos personales -->
    <div class="field">
      <label for="firstName">First Name</label>
      <InputText id="firstName" v-model="firstName" class="w-full" />
    </div>

    <div class="field">
      <label for="lastName">Last Name</label>
      <InputText id="lastName" v-model="lastName" class="w-full" />
    </div>

    <div class="field">
      <label for="email">Email</label>
      <InputText id="email" v-model="email" class="w-full" />
    </div>

    <div class="field">
      <label for="street">Street</label>
      <InputText id="street" v-model="street" class="w-full" />
    </div>

    <div class="field">
      <label for="number">Number</label>
      <InputText id="number" v-model="number" class="w-full" />
    </div>

    <div class="field">
      <label for="city">City</label>
      <InputText id="city" v-model="city" class="w-full" />
    </div>

    <div class="field">
      <label for="postalCode">Postal Code</label>
      <InputText id="postalCode" v-model="postalCode" class="w-full" />
    </div>

    <div class="field">
      <label for="country">Country</label>
      <InputText id="country" v-model="country" class="w-full" />
    </div>

    <!-- Rol -->
    <div class="field">
      <label for="role">Role</label>
      <Dropdown id="role" v-model="role" :options="['HomeOwner', 'Technician']" class="w-full" />
    </div>

    <!-- Campos específicos por rol -->
    <div v-if="isHomeOwner">
      <div class="field">
        <label for="dni">DNI</label>
        <InputText id="dni" v-model="dni" class="w-full" />
      </div>

      <div class="field">
        <label for="preferredContactTime">Preferred Contact Time</label>
        <InputText id="preferredContactTime" v-model="preferredContactTime" class="w-full" />
      </div>
    </div>

    <div v-if="isTechnician">
      <div class="field">
        <label for="licenseNumber">License Number</label>
        <InputText id="licenseNumber" v-model="licenseNumber" class="w-full" />
      </div>

      <div class="field">
        <label for="specialization">Specialization</label>
        <InputText id="specialization" v-model="specialization" class="w-full" />
      </div>
    </div>

    <!-- Submit -->
    <Button label="Sign Up" class="mt-4" @click="submitForm" />
  </div>
</template>

<style scoped>
label {
  font-weight: 500;
  color: #ddd;
  display: block;
  margin-bottom: 0.3rem;
}
.field {
  margin-bottom: 1.2rem;
}
</style>
