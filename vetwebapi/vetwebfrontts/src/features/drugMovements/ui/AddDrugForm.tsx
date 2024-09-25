import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import { CatalogDrugSelect } from "./CatalogDrugSelect";
import { useParams } from "react-router-dom";
import { useCreateItem } from "shared/hooks/useCreateItem";
import { CustomButton, CustomInput, fieldRequiredMessage } from "shared/index";
import { IDrugInMovementIn } from "entities/drugMovements/model/drugMovementInterfaces";
import { PlaceOfAdministrationSelect } from "features/drug/ui/selectData/PlaceOfAdministrationSelect";
import { AdministrationMethodSelect } from "features/drug/ui/selectData/AdministrationMethodSelect";

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

  const { mutate } = useCreateItem(
    "addDrugToDrugMovement",
    url,
    queryKey,
    "Препарат успешно добавлен!",
    reset,
    id
  );

  const addDrugToDrugMovement: SubmitHandler<IDrugInMovementIn> = (data) => {
    !data.place_of_administration && (data.place_of_administration = "");
    !data.administration_method && (data.administration_method = "");

    console.log("DATA>>>", data);
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
            <CustomInput
              className="text-input"
              register={register}
              step="any"
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
            <CustomInput
              className="text-input"
              register={register}
              errors={errors}
              fieldName="units_amount"
              type="number"
              step="any"
              id="units_amount"
              rules={{
                required: fieldRequiredMessage,
              }}
            />
          </div>
          {queryKey === "vetwork" && (
            <>
              <div className="form-group">
                <label>Выберите место введения препарата</label>
                <PlaceOfAdministrationSelect />
              </div>

              <div className="form-group">
                <label>Выберите способ применения препарата</label>
                <AdministrationMethodSelect />
              </div>
            </>
          )}

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
