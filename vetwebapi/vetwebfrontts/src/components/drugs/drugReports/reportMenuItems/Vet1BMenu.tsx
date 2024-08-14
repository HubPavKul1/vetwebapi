import { ReportBetweenDateRangeProps } from "../../../../interfaces/ReportInterfaces";
import { Vet1BReportUrl } from "../../../../urls/drugUrls";
import { CreateItem } from "../../../CreateItem";
import { ReportForm } from "../../../ReportForm";

export function Vet1BMenu({
  setReportData,
  setDateRange,
  setReportActive,
}: ReportBetweenDateRangeProps) {
  return (
    <CreateItem btnTitle="Отчет 1-вет В">
      <ReportForm
        setReportData={setReportData}
        setDateRange={setDateRange}
        setReportActive={setReportActive}
        url={Vet1BReportUrl}
      />
    </CreateItem>
  );
}
