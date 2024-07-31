import { CreateItem } from "../../../components/createItem";
import { ReportForm } from "../../../components/ReportForm";
import { ReportBetweenDateRangeProps } from "../../../interfaces/ReportInterfaces";


export function DiagnosticBetweenDateRange({
  setReportData,
  setDateRange,
  setReportActive
}: ReportBetweenDateRangeProps) {
  return (
    <CreateItem btnTitle="Отчет по диагностическим исследованиям за период времени">
      <ReportForm
        setReportData={setReportData}
        setDateRange={setDateRange}
        setReportActive={setReportActive}
        url="/api/vetwork/reports/diagnostics"
      />
    </CreateItem>
  );
}
