import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { TypesOfFeedingSelect } from "./TypeOfFeedingSelect";
import { IAnimal, IAnimalCreate } from "../../../interfaces/AnimalInterfaces";
import { UsageTypesSelect } from "./UsageTypesSelect";
import { CustomButton } from "../../CustomButton";
import { Input } from "../../Input";
import { FormInputProps } from "../../../interfaces/FormInterface";
import {
  fieldRequiredMessage,
  maxLenErrorMessage,
  minLenErrorMessage,
} from "../../ErrorMessages";
import { useParams } from "react-router-dom";
import { useCreateItem } from "../../../hooks/useCreateItem";

export function UpdateAnimalForm(animal: IAnimal) {
  const { id } = useParams();
  const url = `/api/companies/${id}/animals/${animal.id}`;

  const inputItems: FormInputProps<IAnimalCreate>[] = [
    { fieldName: "date_of_birth", id: "date_of_birth", type: "date", value: animal.date_of_birth},
    {
      fieldName: "nickname",
      placeholder: "Введите кличку животного *",
      type: "text",
      value: animal.nickname
    },
    {
      fieldName: "identification",
      placeholder: "Введите номер микрочипа *",
      type: "text",
      value: animal.identification
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
  
  const { mutate } = useCreateItem("create animal", url, "company", "Животное успешно добавлено!", reset)


  const createAnimal: SubmitHandler<IAnimalCreate> = (data) => {
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(createAnimal)}>
        <div className="form-group">
          <label>Выберите Тип Кормления *</label>
          <TypesOfFeedingSelect />
        </div>
        <div className="form-group">
          <label>Выберите Тип Использования *</label>
          <UsageTypesSelect />
        </div>

        <label htmlFor="date_of_birth" className="form-group">
          Дата рождения *
        </label>
        {inputItems.map((item) => (
          <Input
            key={item.fieldName}
            className="form-control"
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

        <div className="form-group">
          <CustomButton
            className="btn-submit"
            disabled={false}
            title="Обновить"
          />
        </div>
      </form>
    </FormProvider>
  );
}
