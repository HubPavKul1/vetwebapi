import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { TypesOfFeedingSelect } from "./TypeOfFeedingSelect";
import { IAnimalCreate } from "interfaces/AnimalInterfaces";
import { UsageTypesSelect } from "./UsageTypesSelect";

import { FormInputProps } from "shared/model/FormInterface";
import {
  fieldRequiredMessage,
  maxLenErrorMessage,
  minLenErrorMessage,
} from "components/ErrorMessages";
import { useParams } from "react-router-dom";
import { useCreateItem } from "hooks/useCreateItem";
import { companyAnimalsUrl } from "urls/companyUrls";
import { CustomButton, CustomInput } from "shared/index";

export function AddAnimalForm() {
  const { id } = useParams();
  const companyId = Number(id);

  const inputItems: FormInputProps<IAnimalCreate>[] = [
    { fieldName: "date_of_birth", id: "date_of_birth", type: "date" },
    {
      fieldName: "nickname",
      placeholder: "Введите кличку животного *",
      type: "text",
    },
    {
      fieldName: "identification",
      placeholder: "Введите номер микрочипа *",
      type: "text",
    },
  ];

  const methods = useForm<IAnimalCreate>({
    mode: "onChange",
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { mutate } = useCreateItem(
    "create animal",
    companyAnimalsUrl(companyId),
    "company",
    "Животное успешно добавлено!",
    reset
  );

  const createAnimal: SubmitHandler<IAnimalCreate> = (data) => {
    console.log("AnimalToCreate...", data);
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(createAnimal)} className="form-title">
        <div className="">
          <label>Выберите Тип Кормления *</label>
          <TypesOfFeedingSelect />
        </div>
        <div className="">
          <label>Выберите Тип Использования *</label>
          <UsageTypesSelect />
        </div>

        <label htmlFor="date_of_birth" className="">
          Дата рождения *
        </label>
        {inputItems.map((item) => (
          <CustomInput
            key={item.fieldName}
            className="form-control form-title"
            id={item.id}
            register={register}
            rules={{
              required: fieldRequiredMessage,
              maxLength: {
                value: 50,
                message: maxLenErrorMessage + " 50 символов!",
              },
              minLength: {
                value: 3,
                message: minLenErrorMessage + " 3 символа!",
              },
            }}
            fieldName={item.fieldName}
            type={item.type}
            errors={errors}
            placeholder={item.placeholder}
          />
        ))}

        <div className="">
          <CustomButton
            className="btn-submit"
            disabled={false}
            title="Зарегистрировать"
          />
        </div>
      </form>
    </FormProvider>
  );
}
