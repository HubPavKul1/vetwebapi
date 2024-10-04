import { SubmitHandler, useForm } from "react-hook-form";

import { FormInputProps } from "shared/model/FormInterface";


import { useCreateItem } from "shared/hooks/useCreateItem";
import { CustomButton, CustomInput, fieldRequiredMessage, ICreateItemFormInterface } from "shared/index";
import { IDrugMovementCreate } from "entities/drugMovements/model/drugMovementInterfaces";

export function CreateDrugReceiptForm({
  url,
  queryKey,
}: ICreateItemFormInterface) {
  const inputItems: FormInputProps<IDrugMovementCreate>[] = [
    { fieldName: "operation_date", id: "operation_date", type: "date" },
  ];

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IDrugMovementCreate>({
    mode: "onChange",
  });

  const { mutate } = useCreateItem(
    "createReceipt",
    url,
    queryKey,
    "Поступление успешно добавлено!",
    reset
  );

  const createReceipt: SubmitHandler<IDrugMovementCreate> = (data) => {
    mutate(data);
  };

  return (
    <form
      className="create-company-form"
      onSubmit={handleSubmit(createReceipt)}
    >
      <label htmlFor="operation_date" className="form-group">
        Дата поступления *
      </label>

      {inputItems.map((item) => (
        <CustomInput
          key={item.fieldName}
          className="text-input text-center"
          register={register}
          fieldName={item.fieldName}
          type={item.type}
          errors={errors}
          rules={{
            required: fieldRequiredMessage,
          }}
        />
      ))}

      <CustomButton
        className="btn-submit"
        disabled={false}
        title="Зарегистрировать"
      />
    </form>
  );
}
