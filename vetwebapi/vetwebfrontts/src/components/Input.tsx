import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "./ErrorMessage";


interface InputProps {
    id?: string;
    className: string;
    type: string;
    fieldName: string;
    style?: React.CSSProperties;
    placeHolder?: string;
    errors: FieldErrors;
    register: UseFormRegister<any>;
    isRequired: boolean;
    maximLength: number;
    minimLength: number;
}

export function Input({id, type, fieldName, style, placeHolder, errors, register, isRequired, maximLength, minimLength} : InputProps) {
    return (
        <div className="form-group">
            <input 
                className="form-control" 
                type={type}
                style={style}
                id={id}
                placeholder={placeHolder}
                {...register(fieldName, 
                    {required: {
                        value: isRequired,
                        message: `Поле ${fieldName} должно быть заполнено!`
                    },
                    maxLength: {
                        value: maximLength,
                        message: `Максимальная длина ${maximLength} символов`
                        }, 
                    minLength: {
                        value: minimLength,
                        message: `Минимальная длина ${minimLength} символов`
                        },
                    })}      
            />
            {errors[fieldName]?.message && <ErrorMessage error={errors[fieldName]?.message?.toString()}/>}
        </div>
    )
}