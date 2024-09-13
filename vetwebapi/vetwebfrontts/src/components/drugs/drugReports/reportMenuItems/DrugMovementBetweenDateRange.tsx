import { ReportBetweenDateRangeProps } from "interfaces/ReportInterfaces";
import { drugReportsUrl } from "shared/urls/drugUrls";
import { CreateItem } from "components/CreateItem";
import { ReportForm } from "components/ReportForm";

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
