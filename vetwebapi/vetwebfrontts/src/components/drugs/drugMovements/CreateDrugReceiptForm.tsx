import { SubmitHandler, useForm } from "react-hook-form";

import { Input } from "components/Input";
import { FormInputProps } from "interfaces/FormInterface";
import { fieldRequiredMessage } from "components/ErrorMessages";
import { CustomButton } from "components/CustomButton";
import { IDrugMovementCreate } from "interfaces/DrugInterfaces";

import { useCreateItem } from "hooks/useCreateItem";
import { drugReceiptsUrl } from "urls/drugUrls";

export function CreateDrugReceiptForm() {
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
    drugReceiptsUrl,
    "drugReceipts",
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
        <Input
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
