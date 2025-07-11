import { defineStore } from "pinia";
import { useAuthenticationService } from "./authentication.service.js"; // Asegúrate que la ruta sea correcta
import httpInstance from "../../shared/services/http.instance.js"; // Asegúrate que la ruta sea correcta
import {jwtDecode} from 'jwt-decode';
import { ProfileService} from "@/iam/services/profile.service.js";

export const useAuthenticationStore = defineStore("authentication", {
  state: () => ({
    token: localStorage.getItem("authToken") || null,
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
    profileId: null,
    technicianId: null,
    homeOwnerId: null
  }),

  getters: {
    isSignedIn(state) {
      return !!state.token;
    },
    userId(state) {
      return state.currentUser?.id || null;
    },
    techId       : (s) => s.technicianId,
    ownerId      : (s) => s.homeOwnerId
  },

  actions: {
    async signIn(signInRequest) {
      try {
        const authService = useAuthenticationService();
        const response = await authService.signIn(signInRequest);

        if (response && response.data && response.data.token) {
          const userData = response.data;

          this.token = userData.token;

          localStorage.setItem("authToken", this.token);
          const decodedToken = jwtDecode(this.token);
          this.profileId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"];
          console.log("profileId extraído:", this.profileId);

          // Llamada al ProfileService para obtener el perfil usando el profileId
          const profileService = new ProfileService();
          const profileData = await profileService.getProfileById(this.profileId);  // Llama al endpoint con profileId
          this.technicianId = profileData.technicianId;
          this.homeOwnerId  = profileData.homeOwnerId;
          console.log("Perfil recuperado:", profileData);

          httpInstance.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;

          return true; // Éxito
        } else {
          console.error("Respuesta de inicio de sesión inválida:", response);
          this.signOut(); // Limpiamos cualquier estado
          alert("El servidor devolvió una respuesta inesperada.");
          return false; // Fracaso
        }
      } catch (error) {
        // Este bloque ahora solo captura errores de red o respuestas de error del servidor (ej. 401, 500).
        console.error("Error durante el inicio de sesión:", error);
        this.signOut(); // Limpia cualquier estado parcial si falla el login
        alert("Usuario o contraseña inválidos.");
        return false; // Fracaso
      }
    },

    /**
     * Configura el header de autorización si existe un token en el estado.
     * Debe ser llamada al iniciar la aplicación (en main.js).
     */
    initializeAuth() {
      if (this.token) {
        httpInstance.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
      }
    },

    /**
     * Cierra la sesión del usuario, limpiando el estado y localStorage.
     * @param {import('vue-router').Router} [router] - La instancia del router de Vue para redirigir (opcional).
     */
    signOut(router) {
      this.currentUser = null;
      this.token = null;

      localStorage.removeItem("authToken");

      delete httpInstance.defaults.headers.common["Authorization"];

      if (router) {
        router.push({ name: "sign-in" });
      }
    }
  }
});