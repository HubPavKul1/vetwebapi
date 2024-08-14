import { ReportBetweenDateRangeProps } from "../../../../interfaces/ReportInterfaces";
import { drugReportsUrl } from "../../../../urls/drugUrls";
import { CreateItem } from "../../../CreateItem";
import { ReportForm } from "../../../ReportForm";

export function DrugMovementBetweenDateRange({
  setReportData,
  setDateRange,
  setReportActive,
}: ReportBetweenDateRangeProps) {
  return (
    <CreateItem btnTitle="Движение биопрепаратов за период времени">
      <ReportForm
        setReportData={setReportData}
        setDateRange={setDateRange}
        setReportActive={setReportActive}
        url={drugReportsUrl}
      />
    </CreateItem>
  );
}
