import { IInput } from "../interfaces/FormInterface";
import { ErrorMessage } from "./ErrorMessage";



interface InputProps extends IInput<T> {

}

export function Input({id, type, fieldName, className, style, placeHolder, errors, register, isRequired, maximLength, minimLength} : InputProps) {
    return (
        <div className="form-group">
            <input 
                className={className}
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