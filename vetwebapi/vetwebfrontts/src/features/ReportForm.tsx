import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { AppService } from "shared/services/app.service";
import {
  CustomButton,
  CustomInput,
  fieldRequiredMessage,
  IDateRange,
} from "shared/index";
import useReportStore from "./vetWork/stores/useReportStore";

interface ReportFormProps {
  url: string;
}

export function ReportForm({ url }: ReportFormProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IDateRange>({
    mode: "onChange",
  });

  const setDateRange = useReportStore((state) => state.setDateRange);
  const setReportActive = useReportStore((state) => state.setReportActive);
  const setReportData = useReportStore((state) => state.setReportData);

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
      console.log("DateRange>>>", dateRange.date_start, dateRange.date_end);
      reset();
      setReportData(data.data);
      setDateRange(dateRange);
      setReportActive();
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
