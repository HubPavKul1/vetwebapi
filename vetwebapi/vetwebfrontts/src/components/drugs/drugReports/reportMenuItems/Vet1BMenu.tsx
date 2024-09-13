import { ReportBetweenDateRangeProps } from "interfaces/ReportInterfaces";
import { Vet1BReportUrl } from "shared/urls/drugUrls";
import { CreateItem } from "components/CreateItem";
import { ReportForm } from "components/ReportForm";

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
