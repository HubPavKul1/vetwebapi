import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import { FormInputProps } from "shared/model/FormInterface";

import { useCreateItem } from "shared/hooks/useCreateItem";

import { DrugSelect } from "./DrugSelect";
import {
  ButtonSubmit,
  CustomButton,
  CustomInput,
  fieldRequiredMessage,
  ICreateItemFormInterface,
} from "shared/index";
import { IDrugCatalogCreate } from "entities/catalogDrug/model/drugCatalogInterfaces";

export function CreateCatalogDrugForm({
  url,
  queryKey,
}: ICreateItemFormInterface) {
  const inputItems: FormInputProps<IDrugCatalogCreate>[] = [
    {
      fieldName: "batch",
      placeholder: "Введите серию препарата *",
      type: "text",
    },
    {
      fieldName: "control",
      placeholder: "Введите контроль препарата *",
      type: "text",
    },
    {
      fieldName: "packing",
      placeholder: "Количество ед. учета во флаконе *",
      type: "number",
      step: "any",
    },
  ];

  const methods = useForm<IDrugCatalogCreate>({
    mode: "onChange",
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { mutate } = useCreateItem(
    "create catalogDrug",
    url,
    queryKey,
    "Препарат успешно добавлен!",
    reset
  );

  const createCatalogDrug: SubmitHandler<IDrugCatalogCreate> = (data) => {
    mutate(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(createCatalogDrug)} className="form-title">
          <div className="">
            <label>Выберите препарат *</label>
            <DrugSelect />
          </div>

          {inputItems.map((item) => (
            <CustomInput
              key={item.fieldName}
              className="form-control form-title"
              placeholder={item.placeholder}
              register={register}
              fieldName={item.fieldName}
              type={item.type}
              step={item.step}
              errors={errors}
              rules={{
                required: fieldRequiredMessage,
              }}
            />
          ))}

          <div className="">
            <label htmlFor="production_date">Введите дату изготовления *</label>
            <CustomInput
              className="form-control form-title"
              register={register}
              errors={errors}
              fieldName="production_date"
              type="date"
              id="production_date"
              rules={{
                required: fieldRequiredMessage,
              }}
            />
          </div>

          <div className="">
            <label htmlFor="expiration_date">Годен до *</label>
            <CustomInput
              className="form-control form-title"
              register={register}
              errors={errors}
              fieldName="expiration_date"
              type="date"
              id="expiration_date"
              rules={{
                required: fieldRequiredMessage,
              }}
            />
          </div>

          <div className="">
            <ButtonSubmit title="Добавить" />
          </div>
        </form>
      </FormProvider>
    </>
  );
}
