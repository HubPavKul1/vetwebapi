import { CreateItem } from "../../../components/CreateItem";
import { ReportForm } from "../../../components/ReportForm";


interface DiagnosticBetweenDateRangeProps {
  setDiagnosticData: CallableFunction;
  setDateRange: CallableFunction;
  setReportActive: CallableFunction;
}

export function DiagnosticBetweenDateRange({
  setDiagnosticData,
  setDateRange,
  setReportActive
}: DiagnosticBetweenDateRangeProps) {
  return (
    <CreateItem btnTitle="Отчет по диагностическим исследованиям за период времени">
      <ReportForm
        setReportData={setDiagnosticData}
        setDateRange={setDateRange}
        setReportActive={setReportActive}
        url="/api/vetwork/reports/diagnostics"
      />
    </CreateItem>
  );
}
