import { CreateItem } from "../../../components/CreateItem";
import { ReportForm } from "../../../components/ReportForm";
import { ReportBetweenDateRangeProps } from "../../../interfaces/ReportInterfaces";
import { diagnosticsUrl } from "../../../urls/vetWorkUrls";

export function DiagnosticBetweenDateRange({
  setReportData,
  setDateRange,
  setReportActive,
}: ReportBetweenDateRangeProps) {
  return (
    <CreateItem btnTitle="Отчет по диагностическим исследованиям за период времени">
      <ReportForm
        setReportData={setReportData}
        setDateRange={setDateRange}
        setReportActive={setReportActive}
        url={diagnosticsUrl}
      />
    </CreateItem>
  );
}
