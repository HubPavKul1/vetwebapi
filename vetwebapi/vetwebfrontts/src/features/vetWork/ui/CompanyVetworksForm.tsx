import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import {
  AppService,
  ButtonSubmit,
  companyVetWorksUrl,
  CustomInput,
  fieldRequiredMessage,
} from "shared/index";

import { ICompanyVetWorksIn } from "../models/interfaces";
import { CompanySelect } from "./selectData/CompanySelect";
import useCompanyVetWorksDataStore from "../stores/useCompanyVetWorksDataStore";
import { useMutation } from "@tanstack/react-query";

export function CompanyVetWorksForm() {
  const methods = useForm<ICompanyVetWorksIn>({
    mode: "onChange",
  });

  const companyVetWorks = useCompanyVetWorksDataStore(
    (state) => state.vetWorksData
  );
  const setCompanyVetWorks = useCompanyVetWorksDataStore(
    (state) => state.setVetWorksData
  );
  const setReportActive = useCompanyVetWorksDataStore(
    (state) => state.setReportActive
  );

  const { mutate } = useMutation({
    mutationKey: ["companyVetWorks"],
    mutationFn: (data: ICompanyVetWorksIn) =>
      AppService.createCompanyVetWorksReport(
        companyVetWorksUrl,
        data.company_id,
        new Date(data.date_start),
        new Date(data.date_end)
      ),
    onSuccess: (data) => {
      alert("Отчет успешно выполнен!");
      console.log("DATA>>>", data.data.vetworks);
      reset();
      setCompanyVetWorks(data.data.vetworks);
      setReportActive();
      console.log("DATA2>>>", companyVetWorks);
    },
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const createVetWork: SubmitHandler<ICompanyVetWorksIn> = (data) => {
    mutate(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form className="form-title" onSubmit={handleSubmit(createVetWork)}>
          <div className="form-group">
            <CompanySelect />
          </div>
          <div className="form-group">
            <label htmlFor="date_start">Введите начальную дату отчета*</label>
            <CustomInput
              className="text-input"
              register={register}
              errors={errors}
              fieldName="date_start"
              type="date"
              id="date_start"
              rules={{
                required: fieldRequiredMessage,
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date_end">Введите конечную дату отчета*</label>
            <CustomInput
              className="text-input"
              register={register}
              errors={errors}
              fieldName="date_end"
              type="date"
              id="date_end"
              rules={{
                required: fieldRequiredMessage,
              }}
            />
          </div>
          <div>
            <ButtonSubmit title="Добавить" />
          </div>
        </form>
      </FormProvider>
    </>
  );
}
