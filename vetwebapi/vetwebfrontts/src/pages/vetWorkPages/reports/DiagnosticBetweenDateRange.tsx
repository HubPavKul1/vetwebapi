import { CreateItem } from "components/CreateItem";
import { ReportForm } from "components/ReportForm";
import { ReportBetweenDateRangeProps } from "interfaces/ReportInterfaces";
import { diagnosticsReportUrl } from "urls/vetWorkUrls";

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
        url={diagnosticsReportUrl}
      />
    </CreateItem>
  );
}
