import { FieldErrors, UseFormRegister } from "react-hook-form";


interface InputProps {
    className: string;
    type: string;
    name: string;
    style: React.CSSProperties;
    placeholder: string;
    errors: FieldErrors;
    register: UseFormRegister<any>;
}

export function Input({type, name, style, placeholder, errors, register} : InputProps) {
    console.log(errors.name)
    return (
        <div className="form-group">
            <label htmlFor={name} className="sr-only">Полное наименование</label>
            <input 
                className="form-control" 
                type={type}
                style={style}
                id="full_name" 
                placeholder={placeholder}
                {...register(name, {required: `Field ${name} is required!`})}

                    
            />
            {/* {errors?.name?.message && <p style={{ color: "red" }}>"Поле должно быть заполнено!"</p>} */}
            {errors ? <p style={{ color: "red" }}>"Поле должно быть заполнено!"</p> : <></>}
        </div>
    )
}