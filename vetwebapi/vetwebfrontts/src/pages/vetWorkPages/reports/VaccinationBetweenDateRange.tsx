import { CreateItem } from "components/CreateItem";
import { ReportForm } from "components/ReportForm";
import { ReportBetweenDateRangeProps } from "entities/vetWorkReport/model/reportInterfaces";
import { vaccinationsReportUrl } from "shared/urls/vetWorkUrls";

export function VaccinationBetweenDateRange({
  setReportData,
  setDateRange,
  setReportActive,
}: ReportBetweenDateRangeProps) {
  return (
    <CreateItem btnTitle="Отчет по лечебно-профилактическим обработкам за период времени">
      <ReportForm
        setReportData={setReportData}
        setDateRange={setDateRange}
        setReportActive={setReportActive}
        url={vaccinationsReportUrl}
      />
    </CreateItem>
  );
}
