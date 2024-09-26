import { ReportForm } from "features/ReportForm";
import { ReportBetweenDateRangeProps } from "entities/vetWorkReport/model/reportInterfaces";
import { CreateItem } from "features/CreateItem";
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
