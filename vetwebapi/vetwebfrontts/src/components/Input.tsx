import { FormInputProps } from "../interfaces/FormInterface";
import { ErrorMessage } from "@hookform/error-message";



export function Input({fieldName, rules, register, errors, ...props} : FormInputProps<TFormValues>) {
    return (
        <div className="form-group">
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
        </div>
    )
}