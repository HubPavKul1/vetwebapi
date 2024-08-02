import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import { CustomButton } from "../../CustomButton";
import { Input } from "../../Input";
import { FormInputProps } from "../../../interfaces/FormInterface";
import { fieldRequiredMessage } from "../../ErrorMessages";
import { IDrugCreate } from "../../../interfaces/DrugInterfaces";

import { DiseaseSelect } from "./DiseaseSelect";
import { BudgetSelect } from "./BudgetSelect";
import { DrugManufacturerSelect } from "./DrugManufacturerSelect";
import { AccountingUnitSelect } from "./AccountingUnitSelect";
import { DisposalMethodSelect } from "./DisposalMethodSelect";
import { DosageSelect } from "./DosageSelect";
import { PlaceOfAdministrationSelect } from "./PlaceOfAdministrationSelect";
import { AdministrationMethodSelect } from "./AdministrationMethodSelect";
import { useCreateItem } from "../../../hooks/useCreateItem";

export function CreateDrugForm() {
  const inputItems: FormInputProps<IDrugCreate>[] = [
    {
      fieldName: "name",
      placeholder: "Введите наименование препарата *",
      type: "text",
    },
    {
      fieldName: "packing",
      placeholder: "Введите количество доз во флаконе *",
      type: "number",
    },
  ];

  const methods = useForm<IDrugCreate>({
    mode: "onChange",
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const url = "/api/drugs";
  
  const { mutate } = useCreateItem("create drug", url, "drugs", "Препарат успешно добавлен!", reset);
   
  const createDrug: SubmitHandler<IDrugCreate> = (data) => {
    mutate(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(createDrug)}>
          <div className="form-group">
            <DiseaseSelect isMulti={false} />
          </div>
          <div className="form-group">
            <BudgetSelect />
          </div>
          <div className="form-group">
            <DrugManufacturerSelect />
          </div>
          <div className="form-group">
            <AccountingUnitSelect />
          </div>
          <div className="form-group">
            <DisposalMethodSelect />
          </div>
          <div className="form-group">
            <DosageSelect />
          </div>
          <div className="form-group">
            <PlaceOfAdministrationSelect />
          </div>
          <div className="form-group">
            <AdministrationMethodSelect />
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
