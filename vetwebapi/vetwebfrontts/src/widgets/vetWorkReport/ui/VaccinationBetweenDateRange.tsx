import { ReportForm } from "features/ReportForm";
import { CreateItem } from "features/CreateItem";
import { vaccinationsReportUrl } from "shared/urls/vetWorkUrls";

export function VaccinationBetweenDateRange() {
  return (
    <CreateItem btnTitle="Отчет по лечебно-профилактическим обработкам за период времени">
      <ReportForm url={vaccinationsReportUrl} />
    </CreateItem>
  );
}
