/**
 * Sign In Response
 * @summary
 * Represents a sign-in response. Contains authentication result.
 */
export class SignInResponse {
  constructor(id, username, token) {
    this.id = id;
    this.username = username;
    this.token = token;
  }
}
