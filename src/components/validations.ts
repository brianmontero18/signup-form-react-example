import { FormValues } from "../types/form";

export const validationMessages: Record<
  keyof FormValues,
  Record<string, string>
> = {
  username: {
    required: "Username is required.",
  },
  password: {
    required: "Password is required.",
    minLength: "Password must be at least 8 characters.",
  },
  confirm: {
    required: "Password confirmation is required.",
    match: "Passwords do not match.",
  },
};

export function validateForm(values: FormValues): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!values.username?.trim()) {
    errors.username = validationMessages.username.required;
  }

  if (!values.password) {
    errors.password = validationMessages.password.required;
  } else if (values.password.length < 8) {
    errors.password = validationMessages.password.minLength;
  }

  if (!values.confirm) {
    errors.confirm = validationMessages.confirm.required;
  } else if (values.password && values.confirm !== values.password) {
    errors.confirm = validationMessages.confirm.match;
  }

  return errors;
}
