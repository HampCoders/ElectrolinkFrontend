<script setup>
import { useRouter } from "vue-router";
import { useAuthenticationService } from "../services/authentication.service.js";
import { useProfileService } from "../services/profile.service.js";
import SignUpForm from "../../iam/components/SignUpForm.component.vue";

const router = useRouter();
const authService = useAuthenticationService();
const profileService = useProfileService();

const handleSubmit = async (request) => {
  try {
    const user = await authService.signUp({
      username: request.username,
      password: request.password
    });

    const userId = user.id;

    const profile = {
      userId,
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      street: request.street,
      number: request.number,
      city: request.city,
      postalCode: request.postalCode,
      country: request.country,
      role: request.role,
      dni: request.dni,
      preferredContactTime: request.preferredContactTime,
      licenseNumber: request.licenseNumber,
      specialization: request.specialization
    };

    await profileService.createProfile(profile);

    alert("Account created successfully!");
    router.push({ name: "sign-in" });
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Error during registration. Please try again.");
  }
};
</script>

<template>
  <!-- Asegúrate que el componente acepte esta prop correctamente -->
  <SignUpForm :onSubmit="handleSubmit" />
</template>
