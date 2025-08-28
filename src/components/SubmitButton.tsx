import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn"
      disabled={pending}
      aria-busy={pending}
    >
      {pending ? "Submitting..." : "Create Account"}
    </button>
  );
}
