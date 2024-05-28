import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import { CustomButton } from "../../CustomButton";
import { Input } from "../../Input";
import { fieldRequiredMessage } from "../../ErrorMessages";
import { IDrugInMovementIn } from "../../../interfaces/DrugInterfaces";

import { AppService } from "../../../app.service";
import { CatalogDrugSelect } from "./CatalogDrugSelect";
import { useParams } from "react-router-dom";

interface AddDrugFormProps {
  url: string;
  queryKey: string;
}

export function AddDrugForm({ url, queryKey }: AddDrugFormProps) {
  const { id } = useParams();

  const methods = useForm<IDrugInMovementIn>({
    mode: "onChange",
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;
  const queryClient = useQueryClient();

  const { mutate } = useMutation(["addDrugToDrugMovement"], {
    mutationFn: (data: IDrugInMovementIn) => AppService.createItem(url, data),
    onSuccess: () => {
      alert("Препарат успешно добавлен!");
      queryClient.invalidateQueries([{ queryKey }, id]);
      reset();
    },
  });

  const addDrugToDrugMovement: SubmitHandler<IDrugInMovementIn> = (data) => {
    mutate(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(addDrugToDrugMovement)}>
          <div className="form-group">
            <label>Выберите препарат *</label>
            <CatalogDrugSelect />
          </div>

          <div className="form-group">
            <label htmlFor="packs_amount">Введите количество упаковок *</label>
            <Input
              className="form-control"
              register={register}
              errors={errors}
              fieldName="packs_amount"
              type="number"
              id="packs_amount"
              rules={{
                required: fieldRequiredMessage,
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="units_amount">
              Введите количество единиц учета *
            </label>
            <Input
              className="form-control"
              register={register}
              errors={errors}
              fieldName="units_amount"
              type="number"
              id="units_amount"
              rules={{
                required: fieldRequiredMessage,
              }}
            />
          </div>

          <div className="form-group">
            <CustomButton
              className="btn-submit"
              disabled={false}
              title="Добавить"
            />
          </div>
        </form>
      </FormProvider>
    </>
  );
}
