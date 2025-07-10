import { useAuthenticationStore } from "./authentication.store.js";

/**
 * Interceptor to add authentication token to requests
 */
export const authenticationInterceptor = (config) => {
  const authenticationStore = useAuthenticationStore();
  const isSignedIn = authenticationStore.isSignedIn;
  if (isSignedIn) {
    config.headers.Authorization = `Bearer ${authenticationStore.currentToken}`;
  }
  return config;
};
