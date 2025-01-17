import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { FormInputProps } from "shared/model/FormInterface";

import { useParams } from "react-router-dom";
import { useUpdateItemPartial } from "shared/hooks/useUpdateItemPartial";
import { companyAnimalUrl } from "shared/urls/companyUrls";
import { ButtonSubmit, CustomInput } from "shared/index";
import { IAnimal, IAnimalUpdate } from "entities/animal";

interface UpdateAnimalFormProps {
  animal: IAnimal;
  updateData: string | number;
  updateFieldName: "date_of_birth" | "nickname" | "identification";
  updateFieldType: "text" | "number" | "date";
}

export function UpdateAnimalForm({
  animal,
  updateData,
  updateFieldName,
  updateFieldType,
}: UpdateAnimalFormProps) {
  const { id } = useParams();
  const companyId = Number(id);

  const inputItems: FormInputProps<IAnimalUpdate>[] = [
    {
      fieldName: updateFieldName,
      id: updateFieldName,
      type: updateFieldType,
      defaultValue: updateData,
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

  const { mutate } = useUpdateItemPartial(
    "update animal",
    companyAnimalUrl(companyId, animal.id),
    "company",
    "Данные успешно обновлены!",
    reset,
    id
  );

  const updateAnimal: SubmitHandler<IAnimalUpdate> = (data) => {
    console.log("UPDATE DATA>>>", data);
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(updateAnimal)}>
        {inputItems.map((item) => (
          <CustomInput
            key={item.fieldName}
            className="form-control"
            id={item.id}
            register={register}
            fieldName={item.fieldName}
            type={item.type}
            errors={errors}
            defaultValue={item.defaultValue}
          />
        ))}

        <div className="form-group">
          <ButtonSubmit title="Отправить" />
        </div>
      </form>
    </FormProvider>
  );
}
