import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import { CustomButton } from "../CustomButton";
import { Input } from "../Input";
import { FormInputProps } from "../../interfaces/FormInterface";
import { fieldRequiredMessage } from "../ErrorMessages";

import { IVetworkCreate } from "../../interfaces/VetWorkInterfaces";
import { ClinicSelect } from "./ClinicSelect";
import { DiseaseSelect } from "../drugs/drug/DiseaseSelect";
import { DoctorSelect } from "./DoctorsSelect";
import { LabsSelect } from "./LabsSelect";
import { BiomaterialsSelect } from "./BiomaterialsSelect";
import { BiomaterialFixationsSelect } from "./BiomaterialFixationSelect";
import { BiomaterialPackagesSelect } from "./BiomaterialPackagesSelect";
import { DiagnosticMethodsSelect } from "./DiagnosticMethodsSelect";
import { useCreateItem } from "../../hooks/useCreateItem";

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

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(createVetWork)}>
          <div className="form-group">
            <label>Введите дату *</label>
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
          </div>
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
            <ClinicSelect />
          </div>
          <div className="form-group">
            <DiseaseSelect isMulti={true} />
          </div>
          <div className="form-group">
            <DoctorSelect />
          </div>
          {queryKey === "diagnostics" && (
            <>
              <div className="form-group">
                <LabsSelect />
              </div>
              <div className="form-group">
                <BiomaterialsSelect />
              </div>
              <div className="form-group">
                <BiomaterialFixationsSelect />
              </div>
              <div className="form-group">
                <BiomaterialPackagesSelect />
              </div>
              <div className="form-group">
                <DiagnosticMethodsSelect />
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
