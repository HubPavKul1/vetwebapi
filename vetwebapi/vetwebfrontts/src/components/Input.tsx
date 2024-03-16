import { FormInputProps } from "../interfaces/FormInterface";
import { ErrorMessage } from "@hookform/error-message";
import { Container } from "react-bootstrap";



export function Input({fieldName, rules, register, errors, ...props} : FormInputProps<TFormValues>) {
    return (
        <Container className="mb-3">
            <input
                {...props}
                {...(register && register(fieldName, rules))}
            />
            <ErrorMessage
                errors={errors}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                name={fieldName as any}
                render={({ message }) => (
                <p style={{ color: "red" }}>{message}</p>
                )}
            />
        </Container>
    )
}