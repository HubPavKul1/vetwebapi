import { ReportForm } from "components/ReportForm";
import { ReportBetweenDateRangeProps } from "entities/vetWorkReport/model/reportInterfaces";
import { CreateItem } from "features/CreateItem";
import { diagnosticsReportUrl } from "shared/urls/vetWorkUrls";

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
