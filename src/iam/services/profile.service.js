import httpInstance from "../../shared/services/http.instance.js";

/**
 * Service class to handle Profile creation
 */
export class ProfileService {
  /**
   * Create profile based on role
   * @param {CreateProfileRequest} profileData
   * @returns {Promise<number>} - The created profile ID
   */
  async createProfile(profileData) {
    try {
      console.log("Sending profile data:", profileData); // 👈 logea lo enviado
      const response = await httpInstance.post("/profiles", profileData);
      console.log("Profile created:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating profile:", error.response?.data || error.message);
      throw error;
    }
  }

  async getProfileById(profileId) {
    const response = await httpInstance.get(`/profiles/${profileId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,  // Usa el token guardado
      }
    });
    return response.data;
  }
}

export const useProfileService = () => new ProfileService();
