import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import { CustomButton } from "../../CustomButton";
import { Input } from "../../Input";
import { fieldRequiredMessage } from "../../ErrorMessages";
import { IDrugInMovementIn } from "../../../interfaces/DrugInterfaces";

import { CatalogDrugSelect } from "./CatalogDrugSelect";
import { useParams } from "react-router-dom";
import { useCreateItem } from "../../../hooks/useCreateItem";

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

  const { mutate } = useCreateItem("addDrugToDrugMovement", url, queryKey, "Препарат успешно добавлен!", reset, id);
  

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
