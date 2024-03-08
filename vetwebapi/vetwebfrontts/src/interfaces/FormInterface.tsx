import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";


export interface IOption {
    label: string;
    value: number;
}

export interface IInput <T extends FieldValues> {
    id?: string;
    fieldName: string;
    type?: string;
    placeHolder?: string;
    maximLength: number;
    minimLength: number;
    register: UseFormRegister<T>;
    className: string;
    style?: React.CSSProperties;
    errors: FieldErrors;
    isRequired: boolean;
}

