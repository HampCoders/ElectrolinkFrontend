import { defineStore } from "pinia";
import { SignInResponse } from "../model/sign-in.response.js";
import { useAuthenticationService } from "./authentication.service.js";
import httpInstance from "../../shared/services/http.instance.js";

export const useAuthenticationStore = defineStore("authentication", {
  state: () => ({
    currentUser: null,
    token: null,
  }),

  getters: {
    isSignedIn(state) {
      return !!state.token;
    },
    currentUsername(state) {
      return state.currentUser?.username || "";
    }
  },

  actions: {
    async signIn(signInRequest, router) {
      try {
        const authService = useAuthenticationService();
        const data = await authService.signIn(signInRequest);

        this.currentUser = new SignInResponse(data.id, data.username, data.token);
        this.token = data.token;

        localStorage.setItem("authToken", data.token);
        localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
        localStorage.setItem("isBuyer", "true");

        httpInstance.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;

        return true; // <- solo indica que fue exitoso
      } catch (error) {
        console.error("Error during sign in:", error);
        alert("Invalid username or password");
        return false;
      }
    },



    async restoreSession() {
      const token = localStorage.getItem("authToken");
      const userJson = localStorage.getItem("currentUser");

      if (token && userJson) {
        this.token = token;
        this.token = token;
        this.currentUser = JSON.parse(userJson);
        httpInstance.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
      }

      return Promise.resolve(); // 🔑 hace que "await" funcione correctamente
    },


    signOut(router) {
      this.currentUser = null;
      this.token = null;

      // Limpiar localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser");

      delete httpInstance.defaults.headers.common["Authorization"];
      router.push({ name: "sign-in" }); // ✅ Esta sí existe
    }
  }
});
