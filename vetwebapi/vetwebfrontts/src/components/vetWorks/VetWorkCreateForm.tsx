import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import { FormInputProps } from "shared/model/FormInterface";
import { fieldRequiredMessage } from "components/ErrorMessages";

import { IVetworkCreate } from "entities/vetWork/model/vetWorkInterfaces";
import { ClinicSelect } from "./selectData/ClinicSelect";
import { DiseaseSelect } from "components/drugs/drug/selectData/DiseaseSelect";
import { DoctorSelect } from "./selectData/DoctorsSelect";
import { LabsSelect } from "./selectData/LabsSelect";
import { BiomaterialsSelect } from "./selectData/BiomaterialsSelect";
import { BiomaterialFixationsSelect } from "./selectData/BiomaterialFixationSelect";
import { BiomaterialPackagesSelect } from "./selectData/BiomaterialPackagesSelect";
import { DiagnosticMethodsSelect } from "./selectData/DiagnosticMethodsSelect";
import { useCreateItem } from "shared/hooks/useCreateItem";
import { ICreateItemFormInterface } from "shared/model/BaseInterface";
import { CustomButton, CustomInput } from "shared/index";

export function VetWorkCreateForm({ url, queryKey }: ICreateItemFormInterface) {
  const inputItems: FormInputProps<IVetworkCreate>[] = [
    { fieldName: "vetwork_date", id: "vetwork_date", type: "date" },
  ];
  const urlArrey = url.split("/");
  const vetWorkType = urlArrey[urlArrey.length - 1];

  const methods = useForm<IVetworkCreate>({
    mode: "onChange",
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const { mutate } = useCreateItem(
    "create vetWork",
    url,
    queryKey,
    "Мероприятие успешно добавлено!",
    reset
  );

  const createVetWork: SubmitHandler<IVetworkCreate> = (data) => {
    mutate(data);
  };

  const diseases = watch("diseases");
  const diseaseId = diseases && diseases[0];

  return (
    <>
      <FormProvider {...methods}>
        <form className="form-title" onSubmit={handleSubmit(createVetWork)}>
          <div className="flex w-full">
            <label className="w-auto mr-3">Введите дату *</label>
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
          </div>
          <div className="flex justify-between mb-0">
            <div className="">
              <label htmlFor="is_state_assignment">
                Госзадание *
                <CustomInput
                  register={register}
                  errors={errors}
                  fieldName="is_state_assignment"
                  type="checkbox"
                  id="is_state_assignment"
                />
              </label>
            </div>
            <div className="">
              <label htmlFor="is_primary">
                Первичное *
                <CustomInput
                  register={register}
                  errors={errors}
                  fieldName="is_primary"
                  type="checkbox"
                  id="is_primary"
                />
              </label>
            </div>
          </div>

          <div className="">
            <ClinicSelect />
          </div>
          <div className="">
            <DiseaseSelect isMulti={true} />
          </div>
          <div className="">
            <DoctorSelect />
          </div>
          {vetWorkType === "diagnostics" && diseaseId !== 74 && (
            <>
              <div className="">
                <LabsSelect />
              </div>
              <div className="">
                <BiomaterialsSelect />
              </div>
              <div className="">
                <BiomaterialFixationsSelect />
              </div>
              <div className="">
                <BiomaterialPackagesSelect />
              </div>
              <div className="">
                <DiagnosticMethodsSelect />
              </div>
            </>
          )}

          {vetWorkType === "diagnostics" && diseaseId === 74 && (
            <>
              <div className="">
                <DiagnosticMethodsSelect />
              </div>
            </>
          )}

          <div className="">
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
