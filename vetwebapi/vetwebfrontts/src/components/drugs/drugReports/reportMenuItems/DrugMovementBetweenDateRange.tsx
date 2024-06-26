import { CreateItem } from "../../../CreateItem";
import { ReportForm } from "../../../ReportForm";

interface DrugMovementBetweenDateRangeProps {
  setDrugReportData: CallableFunction;
  setDateRange: CallableFunction;
  setReportActive: CallableFunction;
}

export default function DrugMovementBetweenDateRange({
  setDrugReportData,
  setDateRange,
  setReportActive
}: DrugMovementBetweenDateRangeProps) {
  return (
    <CreateItem btnTitle="Движение биопрепаратов за период времени">
      <ReportForm
        setDrugReportData={setDrugReportData}
        setDateRange={setDateRange}
        setReportActive={setReportActive}
        url="/api/drugs/reports/drugs_movement"
      />
    </CreateItem>
  );
}
