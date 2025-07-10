import { useAuthenticationStore } from "./authentication.store.js";

/**
 * Guard to check if user is authenticated
 */
export const authenticationGuard = (to, from, next) => {
  const authenticationStore = useAuthenticationStore();
  const isAnonymous = !authenticationStore.isSignedIn;
  const publicRoutes = ["/sign-in", "/sign-up", "/about", "/page-not-found"];
  const routeRequiresToBeAuthenticated = !publicRoutes.includes(to.path);

  if (isAnonymous && routeRequiresToBeAuthenticated)
    return next({ name: "sign-in" });
  else next();
};
