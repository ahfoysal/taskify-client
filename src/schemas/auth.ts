import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).max(32).required("Password is required"),
});
export const SignUpSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  name: yup.string().required("Name is required"),
  password: yup.string().min(6).max(32).required("Password is required"),
});
