export type FieldErrorKeys = "username" | "password" | "confirm" | "submit";
export type FormErrors = Partial<Record<FieldErrorKeys, string>>;

export interface FormValues {
  username: string;
  password: string;
  confirm: string;
}

export interface FormState {
  errors: FormErrors;
  values?: FormValues;
}

export interface SignupResponse {
  ok: boolean;
  username: string;
}
