export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&.^_-]).{8,}$/;
  return regex.test(password);
}

export function isValidPhone(phone) {
  return /^\+?[0-9]{10,15}$/.test(phone);
}

export function validateRegisterForm(form) {
  const errors = {};

  if (!form.firstName?.trim()) errors.firstName = "First name is required";
  if (!form.lastName?.trim()) errors.lastName = "Last name is required";

  if (!form.email?.trim()) errors.email = "Email is required";
  else if (!isValidEmail(form.email)) errors.email = "Enter a valid email";

  if (!form.phoneNumber?.trim()) errors.phoneNumber = "Phone number is required";
  else if (!isValidPhone(form.phoneNumber))
    errors.phoneNumber = "Enter a valid phone number (e.g. +8801xxxxxxxxx)";

  if (!form.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
  if (!form.nationality?.trim()) errors.nationality = "Nationality is required";

  if (!form.password) errors.password = "Password is required";
  else if (!isValidPassword(form.password))
    errors.password =
      "Password must have at least 8 characters, including uppercase, lowercase, a number and a special character";

  if (form.confirmPassword !== form.password)
    errors.confirmPassword = "Passwords do not match";

  return errors;
}

export function validateLoginForm(form) {
  const errors = {};
  if (!form.email?.trim()) errors.email = "Email is required";
  else if (!isValidEmail(form.email)) errors.email = "Enter a valid email";
  if (!form.password) errors.password = "Password is required";
  return errors;
}