// iam/services/authentication.store.js
import { defineStore } from "pinia";
import { useAuthenticationService } from "./authentication.service.js";
import httpInstance from "../../shared/services/http.instance.js";
import { jwtDecode } from 'jwt-decode';
import { ProfileService } from "@/iam/services/profile.service.js"; // Make sure this path is correct

export const useAuthenticationStore = defineStore("authentication", {
  state: () => ({
    token: localStorage.getItem("authToken") || null,
    // It's better to store and restore profileId, technicianId, homeOwnerId directly
    // as they are crucial for your app's state and derived getters.
    profileId: localStorage.getItem("profileId") || null,
    technicianId: localStorage.getItem("technicianId") === 'null' ? null : localStorage.getItem("technicianId"), // Handle 'null' string
    homeOwnerId: localStorage.getItem("homeOwnerId") === 'null' ? null : localStorage.getItem("homeOwnerId"),   // Handle 'null' string
    // currentUser might be redundant if profileId, technicianId, homeOwnerId are sufficient
    // If currentUser holds more detailed user info, it should also be persisted.
    // For now, focusing on the IDs needed for menu visibility.
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  }),

  getters: {
    isSignedIn(state) {
      return !!state.token;
    },
    userId(state) {
      // If currentUser is not always populated, you might want to use profileId directly
      return state.currentUser?.id || state.profileId || null;
    },
    techId: (s) => s.technicianId,
    ownerId: (s) => s.homeOwnerId
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
          localStorage.setItem("profileId", this.profileId); // Save profileId
          console.log("profileId extraído:", this.profileId);

          // Llamada al ProfileService para obtener el perfil usando el profileId
          const profileService = new ProfileService();
          const profileData = await profileService.getProfileById(this.profileId);

          this.technicianId = profileData.technicianId || null;
          this.homeOwnerId = profileData.homeOwnerId || null;

          // Save technicianId and homeOwnerId to localStorage for persistence
          localStorage.setItem("technicianId", this.technicianId);
          localStorage.setItem("homeOwnerId", this.homeOwnerId);

          // If currentUser needs to be persisted, do it here
          // this.currentUser = profileData; // Or whatever structure currentUser needs
          // localStorage.setItem("currentUser", JSON.stringify(this.currentUser));

          console.log("Perfil recuperado:", profileData);

          // Set authorization header for current session
          httpInstance.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;

          return true; // Éxito
        } else {
          console.error("Respuesta de inicio de sesión inválida:", response);
          this.signOut(); // Limpiamos cualquier estado
          // Replaced alert with console.error as alerts are not allowed in Canvas
          console.error("El servidor devolvió una respuesta inesperada.");
          return false; // Fracaso
        }
      } catch (error) {
        console.error("Error durante el inicio de sesión:", error);
        this.signOut(); // Limpia cualquier estado parcial si falla el login
        // Replaced alert with console.error as alerts are not allowed in Canvas
        console.error("Usuario o contraseña inválidos.");
        return false; // Fracaso
      }
    },

    /**
     * Inicializa el estado de autenticación al cargar la aplicación.
     * Intenta restaurar la sesión desde el almacenamiento local y re-fetch profile data.
     */
    async initializeAuth() {
      console.log('Attempting to initialize authentication...');
      // Load token from state, which is initialized from localStorage
      if (this.token) {
        httpInstance.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;

        // If profileId is not in state (e.g., first load after clearing cache, or old localStorage)
        // or if technicianId/homeOwnerId were not directly saved, we need to re-fetch.
        // It's safer to re-fetch profile data if the token is present but IDs are missing.
        if (!this.profileId) {
          try {
            const decodedToken = jwtDecode(this.token);
            this.profileId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"];
            localStorage.setItem("profileId", this.profileId);
            console.log("profileId re-extracted on initializeAuth:", this.profileId);
          } catch (error) {
            console.error("Error decoding token on initializeAuth:", error);
            this.signOut(); // Token might be invalid, sign out
            return;
          }
        }

        // Now that profileId is ensured, fetch profile data
        if (this.profileId) {
          try {
            const profileService = new ProfileService();
            const profileData = await profileService.getProfileById(this.profileId);
            this.technicianId = profileData.technicianId || null;
            this.homeOwnerId = profileData.homeOwnerId || null;
            // Update localStorage with potentially new/confirmed IDs
            localStorage.setItem("technicianId", this.technicianId);
            localStorage.setItem("homeOwnerId", this.homeOwnerId);
            console.log("Profile data re-fetched on initializeAuth:", profileData);

            // If currentUser needs to be populated, do it here
            // this.currentUser = profileData;
            // localStorage.setItem("currentUser", JSON.stringify(this.currentUser));

          } catch (error) {
            console.error("Error fetching profile on initializeAuth:", error);
            this.signOut(); // If profile fetch fails, consider it a failed session
          }
        }
      } else {
        // If no token, ensure all related state is clear
        this.signOut(); // This will clear localStorage items too
      }
    },

    /**
     * Cierra la sesión del usuario, limpiando el estado y localStorage.
     * @param {import('vue-router').Router} [router] - La instancia del router de Vue para redirigir (opcional).
     */
    signOut(router) {
      this.token = null;
      this.currentUser = null; // Clear currentUser if it's being used
      this.profileId = null;
      this.technicianId = null;
      this.homeOwnerId = null;

      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser"); // Clear currentUser if it was saved
      localStorage.removeItem("profileId");
      localStorage.removeItem("technicianId");
      localStorage.removeItem("homeOwnerId");

      delete httpInstance.defaults.headers.common["Authorization"];

      console.log('User signed out and all relevant data cleared from localStorage.');

      if (router) {
        router.push({ name: "sign-in" });
      }
    }
  }
});
