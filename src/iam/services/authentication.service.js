import httpInstance from "../../shared/services/http.instance.js";

/**
 * Service class to call authentication APIs
 */
export class AuthenticationService {
  /**
   * Sign in an existing user
   * @param {SignInRequest} signInRequest
   * @returns {Promise<SignInResponse>}
   */
  signIn(signInRequest) {
    return httpInstance.post("/authentication/sign-in", signInRequest);
  }

  /**
   * Sign up a new user
   * @param {SignUpRequest} signUpRequest
   * @returns {Promise<SignUpResponse>}
   */
  signUp(signUpRequest) {
    return httpInstance.post("/authentication/sign-up", signUpRequest);
  }
}

export const useAuthenticationService = () => new AuthenticationService();
