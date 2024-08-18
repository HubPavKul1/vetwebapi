import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import { CustomButton } from "components/CustomButton";
import { Input } from "components/Input";
import { FormInputProps } from "interfaces/FormInterface";
import { fieldRequiredMessage } from "components/ErrorMessages";

import { IVetworkCreate } from "interfaces/VetWorkInterfaces";
import { ClinicSelect } from "./ClinicSelect";
import { DiseaseSelect } from "components/drugs/drug/DiseaseSelect";
import { DoctorSelect } from "./DoctorsSelect";
import { LabsSelect } from "./LabsSelect";
import { BiomaterialsSelect } from "./BiomaterialsSelect";
import { BiomaterialFixationsSelect } from "./BiomaterialFixationSelect";
import { BiomaterialPackagesSelect } from "./BiomaterialPackagesSelect";
import { DiagnosticMethodsSelect } from "./DiagnosticMethodsSelect";
import { useCreateItem } from "hooks/useCreateItem";


interface VetWorkCreateFormProps {
  url: string;
  queryKey: string;
}

export function VetWorkCreateForm({ url, queryKey }: VetWorkCreateFormProps) {
  const inputItems: FormInputProps<IVetworkCreate>[] = [
    { fieldName: "vetwork_date", id: "vetwork_date", type: "date" },
  ];

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
              <Input
                key={item.fieldName}
                className="form-control w-auto"
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
                <Input
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
                <Input
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
          {queryKey === "diagnostics" && diseaseId !== 74 && (
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

          {queryKey === "diagnostics" && diseaseId === 74 && (
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
