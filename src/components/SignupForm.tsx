import { useActionState } from "react";
import { FormState, FormValues, SignupResponse } from "../types/form";
import SubmitButton from "./SubmitButton";
import { validateForm } from "./validations";

function mockSignupRequest({
  username,
}: {
  username: string;
}): Promise<SignupResponse> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ok: true, username }), 800);
  });
}

function getFormValues(formData: FormData): FormValues {
  return {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    confirm: formData.get("confirm") as string,
  };
}

async function submitAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const values = getFormValues(formData);
  const errors = validateForm(values);

  if (Object.keys(errors).length > 0) {
    return { errors, values };
  }

  try {
    await mockSignupRequest({ username: values.username });
    alert(`Request submitted. Username: ${values.username}`);
    return { errors: {} };
  } catch {
    return {
      errors: { submit: "An unexpected error occurred." },
      values,
    };
  }
}

const initialState: FormState = { errors: {} };

export default function SignupForm() {
  const [state, formAction] = useActionState(submitAction, initialState);

  return (
    <form
      key={state.values ? "with-values" : "clean"}
      action={formAction}
      noValidate
    >
      {state.errors.submit && (
        <div className="error" role="alert" aria-live="assertive">
          {state.errors.submit}
        </div>
      )}

      <div className="field">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="e.g: brian.montero"
          autoComplete="username"
          required
          defaultValue={state.values?.username ?? ""}
          aria-required="true"
          aria-invalid={Boolean(state.errors.username)}
          aria-describedby={state.errors.username && "username-error"}
        />
        {state.errors.username && (
          <p className="error" id="username-error">
            {state.errors.username}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          required
          minLength={8}
          defaultValue={state.values?.password ?? ""}
          aria-required="true"
          aria-invalid={Boolean(state.errors.password)}
          aria-describedby={state.errors.password && "password-error"}
        />
        {state.errors.password && (
          <p className="error" id="password-error">
            {state.errors.password}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="confirm">Confirm Password</label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          required
          defaultValue={state.values?.confirm ?? ""}
          aria-required="true"
          aria-invalid={Boolean(state.errors.confirm)}
          aria-describedby={state.errors.confirm && "confirm-error"}
        />
        {state.errors.confirm && (
          <p className="error" id="confirm-error">
            {state.errors.confirm}
          </p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}
