import { CreateItem } from "../../../CreateItem";
import { DrugReportForm } from "../DrugReportForm";

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
      <DrugReportForm
        setDrugReportData={setDrugReportData}
        setDateRange={setDateRange}
        setReportActive={setReportActive}
      />
    </CreateItem>
  );
}
