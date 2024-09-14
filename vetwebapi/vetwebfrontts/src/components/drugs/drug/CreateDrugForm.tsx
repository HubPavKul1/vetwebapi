import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import { FormInputProps } from "shared/model/FormInterface";

import { DiseaseSelect } from "./selectData/DiseaseSelect";
import { BudgetSelect } from "./selectData/BudgetSelect";
import { DrugManufacturerSelect } from "./selectData/DrugManufacturerSelect";
import { AccountingUnitSelect } from "./selectData/AccountingUnitSelect";
import { DisposalMethodSelect } from "./selectData/DisposalMethodSelect";
import { DosageSelect } from "./selectData/DosageSelect";

import { useCreateItem } from "shared/hooks/useCreateItem";
import { ICreateItemFormInterface } from "shared/model/BaseInterface";
import { CustomButton, CustomInput, fieldRequiredMessage } from "shared/index";
import { IDrugCreate } from "entities/drug/model/drugInterfaces";

export function CreateDrugForm({ url, queryKey }: ICreateItemFormInterface) {
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

  const { mutate } = useCreateItem(
    "create drug",
    url,
    queryKey,
    "Препарат успешно добавлен!",
    reset
  );

  const createDrug: SubmitHandler<IDrugCreate> = (data) => {
    mutate(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form className="form-title" onSubmit={handleSubmit(createDrug)}>
          <div className="">
            <DiseaseSelect isMulti={true} />
          </div>
          <div className="">
            <BudgetSelect />
          </div>
          <div className="">
            <DrugManufacturerSelect />
          </div>
          <div className="">
            <AccountingUnitSelect />
          </div>
          <div className="">
            <DisposalMethodSelect />
          </div>
          <div className="">
            <DosageSelect />
          </div>
          {inputItems.map((item) => (
            <CustomInput
              key={item.fieldName}
              className="text-input"
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

          <div className="">
            <CustomButton
              className="btn-submit "
              disabled={false}
              title="Добавить"
            />
          </div>
        </form>
      </FormProvider>
    </>
  );
}
