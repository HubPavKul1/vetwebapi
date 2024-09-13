import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";



import { AppService } from "services/app.service";
import { IDateRange } from "shared/model/BaseInterface";
import { CustomButton, CustomInput, fieldRequiredMessage } from "shared/index";

interface ReportFormProps {
  setReportData: CallableFunction;
  setDateRange: CallableFunction;
  setReportActive: CallableFunction;
  url: string;
}

export function ReportForm({
  setReportData,
  setDateRange,
  setReportActive,
  url,
}: ReportFormProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IDateRange>({
    mode: "onChange",
  });

  const { mutate } = useMutation({
    mutationKey: ["createReport"],
    mutationFn: (dateRange: IDateRange) =>
      AppService.createReport(
        url,
        new Date(dateRange.date_start),
        new Date(dateRange.date_end)
      ),
    onSuccess: (data, dateRange) => {
      alert("Отчет успешно выполнен!");
      console.log("DATA", data);
      reset();
      setReportData(data.data);
      setDateRange(dateRange);
      setReportActive(true);
    },
  });

  const createDrugReport: SubmitHandler<IDateRange> = (dateRange) => {
    mutate(dateRange);
  };

  return (
    <form
      className="create-company-form"
      onSubmit={handleSubmit(createDrugReport)}
    >
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
      <CustomButton className="btn-submit" disabled={false} title="Выполнить" />
    </form>
  );
}
