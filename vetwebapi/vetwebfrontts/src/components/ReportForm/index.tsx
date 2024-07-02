import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import { Input } from "../Input";
import { fieldRequiredMessage } from "../ErrorMessages";
import { CustomButton } from "../CustomButton";

import { AppService } from "../../app.service";
import { IDateRange } from "../../interfaces/BaseInterface";


interface ReportFormProps {
  setDrugReportData: CallableFunction;
  setDateRange: CallableFunction;
  setReportActive: CallableFunction;
  url: string
}

export function ReportForm({
  setDrugReportData,
  setDateRange,
  setReportActive,
  url
}: ReportFormProps) {
  // const url = "/api/drugs/reports/drugs_movement";

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IDateRange>({
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    ["createReport"],
    (dateRange: IDateRange) => AppService.createReport(url, dateRange),
    {
      onSuccess: (data, dateRange) => {
        // console.log("REPORT ", data?.drugs_report)
        alert("Отчет успешно выполнен!");
        reset();
        setDrugReportData(data);
        setDateRange(dateRange);
        setReportActive(true)
      },
    }
  );

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
        <Input
          className="form-control"
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
        <Input
          className="form-control"
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
