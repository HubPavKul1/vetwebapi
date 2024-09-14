import { Controller, useFormContext } from "react-hook-form";

import { FormInputProps } from "shared/model/FormInterface";

import {
  CustomInput,
  fieldRequiredMessage,
  maxLenErrorMessage,
  minLenErrorMessage,
} from "shared/index";
import { ICompanyCreate } from "entities/company/model/companyInterfaces";

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
        <CustomInput
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
