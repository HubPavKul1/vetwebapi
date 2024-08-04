import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { IAnimal, IAnimalCreate, IAnimalUpdate } from "../../../interfaces/AnimalInterfaces";
import { CustomButton } from "../../CustomButton";
import { Input } from "../../Input";
import { FormInputProps } from "../../../interfaces/FormInterface";
import {
  fieldRequiredMessage,
  maxLenErrorMessage,
  minLenErrorMessage,
} from "../../ErrorMessages";
import { useParams } from "react-router-dom";
import { useUpdateItem } from "../../../hooks/useUpdateItem";


interface UpdateAnimalFormProps {
  animal: IAnimal;
}

export function UpdateAnimalForm({animal}: UpdateAnimalFormProps) {
  const { id } = useParams();
  const url = `/api/companies/${id}/animals/${animal.id}`;

  const inputItems: FormInputProps<IAnimalUpdate>[] = [
    { fieldName: "date_of_birth", id: "date_of_birth", type: "date", value: animal.date_of_birth},
    {
      fieldName: "nickname",
      placeholder: "Введите кличку животного *",
      type: "text",
      value: animal.nickname,
      
    },
    {
      fieldName: "identification",
      placeholder: "Введите номер микрочипа *",
      type: "text",
      value: animal.identification
    },
  ];

  const methods = useForm<IAnimalUpdate>({
    mode: "onChange",
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;
  
  const { mutate } = useUpdateItem("update animal", url, "company", "Данные успешно обновлены!", reset, id)


  const updateAnimal: SubmitHandler<IAnimalUpdate> = (data) => {
    console.log("UPDATE DATA>>>", data)
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(updateAnimal)}>
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
            value={item.value}

          />
        ))}

        <div className="form-group">
          <CustomButton
            className="btn-submit"
            disabled={false}
            title="Отправить"
          />
        </div>
      </form>
    </FormProvider>
  );
}
