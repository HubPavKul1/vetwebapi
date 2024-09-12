import { FormInputProps } from "shared/model/FormInterface";
import { ErrorMessage } from "@hookform/error-message";
import { Container } from "react-bootstrap";

export function CustomInput({
  fieldName,
  rules,
  register,
  errors,
  onChange,
  ...props
}: FormInputProps<TFormValues>) {
  return (
    <Container className="p-0 mx-0 mb-2 w-auto">
      <input {...props} {...(register && register(fieldName, rules))} />
      <ErrorMessage
        errors={errors}
        name={fieldName as any}
        render={({ message }) => <p className="error-message">{message}</p>}
      />
    </Container>
  );
}
