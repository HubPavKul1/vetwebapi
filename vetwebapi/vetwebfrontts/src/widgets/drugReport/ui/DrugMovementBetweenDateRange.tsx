import { ReportBetweenDateRangeProps } from "entities/vetWorkReport/model/reportInterfaces";
import { drugReportsUrl } from "shared/urls/drugUrls";

import { ReportForm } from "features/ReportForm";
import { CreateItem } from "features/CreateItem";

export function DrugMovementBetweenDateRange() {
  // const { setReportData, setDateRange, setReportActive } = props;
  return (
    <CreateItem btnTitle="Движение биопрепаратов за период времени">
      <ReportForm
        // setReportData={setReportData}
        // setDateRange={setDateRange}
        // setReportActive={setReportActive}
        url={drugReportsUrl}
      />
    </CreateItem>
  );
}
