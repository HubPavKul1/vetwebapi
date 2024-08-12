import {
  DeepMap,
  FieldError,
  Path,
  RegisterOptions,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

export interface IOption {
  label: string;
  value: number;
}

export interface IOptions {
  options: IOption[];
}

export interface InputProps {
  id?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  defaultValue?: string | number | readonly string[];
  step?: any;
}

export interface FormInputProps<TFormValues extends FieldValues>
  extends InputProps {
  fieldName: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
}
