import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { IAnimal, IAnimalUpdate } from "interfaces/AnimalInterfaces";
import { CustomButton } from "components/CustomButton";
import { Input } from "components/Input";
import { FormInputProps } from "interfaces/FormInterface";

import { useParams } from "react-router-dom";
import { useUpdateItemPartial } from "hooks/useUpdateItemPartial";
import { companyAnimalUrl } from "urls/companyUrls";

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
          <Input
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
