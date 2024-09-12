import { Controller, useFormContext } from "react-hook-form";
import { ICompanyCreate } from "interfaces/CompanyInterfaces";
import { Input } from "shared/ui/CustomInput";
import { FormInputProps } from "shared/model/FormInterface";
import {
  fieldRequiredMessage,
  maxLenErrorMessage,
  minLenErrorMessage,
} from "components/ErrorMessages";

export function CompanyInputs() {
  const inputItems: FormInputProps<ICompanyCreate>[] = [
    { fieldName: "full_name", placeholder: "Введите полное наименование *" },
    { fieldName: "short_name", placeholder: "Введите краткое наименование *" },
  ];

  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return inputItems.map((item, index) => (
    <Controller
      control={control}
      key={index}
      name={item.fieldName ? item.fieldName : ""}
      render={({ field: { onChange, value } }) => (
        <Input
          value={value}
          onChange={onChange}
          placeholder={item.placeholder}
          className="text-input"
          fieldName={item.fieldName}
          register={register}
          type="text"
          errors={errors}
          rules={{
            required: fieldRequiredMessage,
            maxLength: {
              value: 200,
              message: maxLenErrorMessage + "200 символов!",
            },
            minLength: {
              value: 3,
              message: minLenErrorMessage + "3 символа!",
            },
          }}
        />
      )}
    />
  ));
}
