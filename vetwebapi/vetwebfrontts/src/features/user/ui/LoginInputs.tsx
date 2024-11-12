import { Controller, useFormContext } from "react-hook-form";

import { FormInputProps } from "shared/model/FormInterface";

import {
  CustomInput,
  fieldRequiredMessage,
  IUserLogin,
  maxLenErrorMessage,
  minLenErrorMessage,
} from "shared/index";

export function LoginInputs() {
  const inputItems: FormInputProps<IUserLogin>[] = [
    { fieldName: "username", placeholder: "Введите e-mail *", type: "email" },
    {
      fieldName: "password",
      placeholder: "Введите пароль *",
      type: "password",
    },
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
          type={item.type}
          errors={errors}
          rules={{
            required: fieldRequiredMessage,
            // maxLength: {
            //   value: 200,
            //   message: maxLenErrorMessage + "200 символов!",
            // },
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
