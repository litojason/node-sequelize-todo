import * as yup from "yup";

import { validateRequest } from "../middlewares/validator";

export type LoginFormData = {
  email: string;
  password: string;
};
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email.")
    .required("Email is required.")
    .label("Email"),
  password: yup.string().required("Password is required.").label("Password"),
});
export const validateLogin = validateRequest(loginSchema);

export type EditProfileFormData = {
  name: string;
};
const editProfileSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be minimum 2 characters long.")
    .required("Name is required.")
    .label("Name"),
});
export const validateEditProfile = validateRequest(editProfileSchema);

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const registerSchema = editProfileSchema.shape({
  email: yup
    .string()
    .email("Invalid email.")
    .required("Email is required.")
    .label("Email"),
  password: yup
    .string()
    .min(6, "Password must be minimum 6 characters long.")
    .required("Password is required.")
    .label("Password"),
  // confirmPassword: yup
  //   .string()
  //   .required("Please confirm your password.")
  //   .oneOf([yup.ref("password")], "Password must match."),
});
export const validateRegister = validateRequest(registerSchema);

export type ChangePasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Current password is required.")
    .label("Current password"),
  newPassword: yup
    .string()
    .min(6, "Password must be minimum 6 characters long.")
    .required("New password is required.")
    .label("New password"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password.")
    .oneOf([yup.ref("newPassword")], "Password must match."),
});
export const validateChangePassword = validateRequest(changePasswordSchema);
