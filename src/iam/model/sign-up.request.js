/**
 * Sign Up Request
 * @summary Represents a sign-up request. Used to register a user and create their profile.
 */
export class SignUpRequest {
  constructor(
    username,
    password,
    role,
    firstName,
    lastName,
    email,
    street,
    number,
    city,
    postalCode,
    country,
    dni = null,
    preferredContactTime = null,
    licenseNumber = null,
    specialization = null
  ) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.street = street;
    this.number = number;
    this.city = city;
    this.postalCode = postalCode;
    this.country = country;
    this.dni = dni;
    this.preferredContactTime = preferredContactTime;
    this.licenseNumber = licenseNumber;
    this.specialization = specialization;
  }
}
