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
    // 1. Create user credentials
    const response = await authService.signUp({
      username: request.username,
      password: request.password,
    });

    const userId = response.data.id;

    // 2. ✅ Build a base profile with common fields
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
    };

    // 3. ✅ Dynamically add role-specific fields
    if (request.role === "HomeOwner") {
      profile.dni = request.dni;
      profile.preferredContactTime = request.preferredContactTime;
    } else if (request.role === "Technician") {
      profile.licenseNumber = request.licenseNumber;
      profile.specialization = request.specialization;
    }

    // 4. Send the correctly shaped profile object
    await profileService.createProfile(profile);

    alert("¡Cuenta creada exitosamente!");
    router.push({ name: "sign-in" });
  } catch (error) {
    // 💡 Pro-Tip: Log the response data from the error to see the exact validation message from the backend.
    console.error("Error during registration:", error);
    if (error.response) {
      console.error("Backend validation error:", error.response.data);
    }
    alert("Error during registration. Please check the console for details.");
  }
};
</script>

<template>
  <SignUpForm :onSubmit="handleSubmit" />
</template>