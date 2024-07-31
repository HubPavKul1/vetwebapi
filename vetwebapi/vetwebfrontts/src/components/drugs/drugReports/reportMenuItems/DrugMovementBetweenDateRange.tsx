import { ReportBetweenDateRangeProps } from "../../../../interfaces/ReportInterfaces";
import { CreateItem } from "../../../createItem";
import { ReportForm } from "../../../ReportForm";



export function DrugMovementBetweenDateRange({
  setReportData,
  setDateRange,
  setReportActive
}: ReportBetweenDateRangeProps) {
  return (
    <CreateItem btnTitle="Движение биопрепаратов за период времени">
      <ReportForm
        setReportData={setReportData}
        setDateRange={setDateRange}
        setReportActive={setReportActive}
        url="/api/drugs/reports/drugs_movement"
      />
    </CreateItem>
  );
}
