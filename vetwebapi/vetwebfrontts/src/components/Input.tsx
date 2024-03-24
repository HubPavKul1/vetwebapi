import { FormInputProps } from "../interfaces/FormInterface";
import { ErrorMessage } from "@hookform/error-message";
import { Container } from "react-bootstrap";



export function Input({fieldName, rules, register, errors, ...props} : FormInputProps<TFormValues>) {
    return (
        <Container className="input-wrap">
            <input
                {...props}
                {...(register && register(fieldName, rules))}
            />
            <ErrorMessage
                errors={errors}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                name={fieldName as any}
                render={({ message }) => (
                <p className="error-message" >{message}</p>
                )}
            />
        </Container>
    )
}