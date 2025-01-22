import { ReportForm } from "features/ReportForm";
import { CreateItem } from "features/CreateItem";
import { diagnosticsReportUrl } from "shared/urls/vetWorkUrls";

export function DiagnosticBetweenDateRange() {
  return (
    <CreateItem btnTitle="Отчет по диагностическим исследованиям за период времени">
      <ReportForm url={diagnosticsReportUrl} />
    </CreateItem>
  );
}
