import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import { Input } from "../../Input";
import { FormInputProps } from "../../../interfaces/FormInterface";
import { fieldRequiredMessage } from "../../ErrorMessages";
import { CustomButton } from "../../CustomButton";
import { IDrugMovementCreate } from "../../../interfaces/DrugInterfaces";
import { AppService } from "../../../app.service";

export function CreateDrugReceiptForm() {
  const url = "/api/drugs/receipts";

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

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    ["createReceipt"],
    (data: IDrugMovementCreate) => AppService.createItem(url, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["drugReceipts"]);
        alert("Поступление успешно добавлено!");
        reset();
      },
    }
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
          className="form-control"
          style={{ textAlign: "center" }}
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
