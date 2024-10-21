import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

import { FormInputProps } from "shared/model/FormInterface";

import { useParams } from "react-router-dom";

import { IAnimalInVetWorkUpdate } from "entities/vetWork/model/vetWorkInterfaces";

import { vetWorkAnimalDetailUrl } from "shared/urls/vetWorkUrls";
import { useUpdateItemPartial } from "shared/hooks/useUpdateItemPartial";
import { CustomButton, CustomInput } from "shared/index";
import { IAnimal } from "entities/animal/model/animalInterfaces";

interface UpdateAnimalFormProps {
  animal: IAnimal;
  updateData?: string | number | string[];
  updateFieldName: "dosage" | "is_positive";
  updateFieldType: "number" | "checkbox";
  className?: string;
}

export function UpdateAnimalInVetWorkForm({
  animal,
  updateData,
  updateFieldName,
  updateFieldType,
  className,
}: UpdateAnimalFormProps) {
  const { id } = useParams();
  const vetWorkId = Number(id);

  const inputItems: FormInputProps<IAnimalInVetWorkUpdate>[] = [
    {
      fieldName: updateFieldName,
      id: updateFieldName,
      type: updateFieldType,
      defaultValue: updateData,
    },
  ];

  const methods = useForm<IAnimalInVetWorkUpdate>({
    mode: "onChange",
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { mutate } = useUpdateItemPartial(
    "update animalInVetWork",
    vetWorkAnimalDetailUrl(vetWorkId, animal.animal_id),
    "vetwork",
    "Данные успешно обновлены!",
    reset,
    id
  );

  const updateAnimal: SubmitHandler<IAnimalInVetWorkUpdate> = (data) => {
    console.log("UPDATE DATA>>>", data);
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(updateAnimal)}>
        {inputItems.map((item) => (
          <CustomInput
            key={item.fieldName}
            className={className}
            id={item.id}
            register={register}
            fieldName={item.fieldName}
            type={item.type}
            errors={errors}
            defaultValue={item.defaultValue}
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