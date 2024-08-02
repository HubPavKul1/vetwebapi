import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import { CustomButton } from "../../CustomButton";
import { Input } from "../../Input";
import { FormInputProps } from "../../../interfaces/FormInterface";
import { fieldRequiredMessage } from "../../ErrorMessages";
import { IDrugCatalogCreate } from "../../../interfaces/DrugInterfaces";

import { DrugSelect } from "./DrugSelect";
import { useCreateItem } from "../../../hooks/useCreateItem";

export function CreateCatalogDrugForm() {
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
  ];

  const methods = useForm<IDrugCatalogCreate>({
    mode: "onChange",
  });

  const url = "/api/drugs/catalog";

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;
  
  const { mutate } = useCreateItem("create catalogDrug", url, "drugCatalog", "Препарат успешно добавлен!", reset);
  //   mutationFn: (data: IDrugCatalogCreate) => AppService.createItem(url, data),
  //   onSuccess: () => {
  //     alert("Препарат успешно добавлен!");
  //     queryClient.invalidateQueries(["drugCatalog"]);
  //     reset();
  //   },
  // });

  const createCatalogDrug: SubmitHandler<IDrugCatalogCreate> = (data) => {
    mutate(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(createCatalogDrug)}>
          <div className="form-group">
            <label>Выберите препарат *</label>
            <DrugSelect />
          </div>

          {inputItems.map((item) => (
            <Input
              key={item.fieldName}
              className="form-control"
              placeholder={item.placeholder}
              register={register}
              fieldName={item.fieldName}
              type={item.type}
              errors={errors}
              rules={{
                required: fieldRequiredMessage,
              }}
            />
          ))}

          <div className="form-group">
            <label htmlFor="production_date">Введите дату изготовления *</label>
            <Input
              className="form-control"
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

          <div className="form-group">
            <label htmlFor="expiration_date">Годен до *</label>
            <Input
              className="form-control"
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
