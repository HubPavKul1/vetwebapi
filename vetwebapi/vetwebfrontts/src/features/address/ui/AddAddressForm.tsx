import {
  useForm,
  FormProvider,
  SubmitHandler,
  RegisterOptions,
} from "react-hook-form";
import { RegionsSelect } from "./selects/RegionsSelect";

import { FormInputProps } from "shared/model/FormInterface";

import { useParams } from "react-router-dom";
import { useCreateItem } from "shared/hooks/useCreateItem";
import { addressUrl } from "shared/urls/companyUrls";
import {
  ButtonSubmit,
  CustomInput,
  fieldRequiredMessage,
  maxLenErrorMessage,
  minLenErrorMessage,
} from "shared/index";
import { IAddressIn } from "entities/address/model/addressInterfaces";

export function AddAddressForm() {
  const { id } = useParams();

  const rulesOptions: RegisterOptions = {
    required: { value: true, message: fieldRequiredMessage },
    maxLength: { value: 20, message: maxLenErrorMessage + " 20 символов!" },
    minLength: { value: 1, message: minLenErrorMessage + " 1 символ!" },
  };

  const inputItems: FormInputProps<IAddressIn>[] = [
    {
      fieldName: "house_number",
      placeholder: "Введите номер дома *",
      type: "text",
      rules: rulesOptions,
    },
    {
      fieldName: "phone_number1",
      placeholder: "Введите номер телефона1 *",
      type: "tel",
      rules: rulesOptions,
    },
    {
      fieldName: "phone_number2",
      placeholder: "Введите номер телефона2",
      type: "tel",
      rules: { required: false },
    },
  ];

  const methods = useForm<IAddressIn>({ mode: "onChange" });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { mutate } = useCreateItem(
    "create address",
    addressUrl(id),
    "company",
    "Адрес успешно добавлен!",
    reset,
    id
  );

  const createAddress: SubmitHandler<IAddressIn> = (data) => {
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(createAddress)}>
        <div className="form-group">
          <label>Выберите регион *</label>
          <RegionsSelect />
        </div>
        {inputItems.map((item) => (
          <CustomInput
            key={item.fieldName}
            className="form-control"
            placeholder={item.placeholder}
            register={register}
            fieldName={item.fieldName}
            type={item.type}
            errors={errors}
            rules={item.rules}
          />
        ))}

        <div className="form-group">
          <ButtonSubmit title="Зарегистрировать" />
        </div>
      </form>
    </FormProvider>
  );
}
