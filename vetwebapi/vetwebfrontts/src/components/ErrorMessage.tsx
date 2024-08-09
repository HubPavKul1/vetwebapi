interface ErrorMessageProps {
  error?: string;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return <p style={{ color: "red" }}>{error}</p>;
}
