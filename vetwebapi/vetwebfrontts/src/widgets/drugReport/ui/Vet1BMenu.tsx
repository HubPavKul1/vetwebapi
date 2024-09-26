import { ReportBetweenDateRangeProps } from "entities/vetWorkReport/model/reportInterfaces";
import { Vet1BReportUrl } from "shared/urls/drugUrls";

import { ReportForm } from "features/ReportForm";
import { CreateItem } from "features/CreateItem";

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
