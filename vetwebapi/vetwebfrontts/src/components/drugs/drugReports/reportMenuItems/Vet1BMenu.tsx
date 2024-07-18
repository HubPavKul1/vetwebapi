import { CreateItem } from "../../../CreateItem";
import { ReportForm } from "../../../ReportForm";

interface Vet1BMenuProps {
  setDrugReportData: CallableFunction;
  setDateRange: CallableFunction;
  setReportActive: CallableFunction;
}

export function Vet1BMenu({
  setDrugReportData,
  setDateRange,
  setReportActive
}: Vet1BMenuProps) {
  return (
    <CreateItem btnTitle="Отчет 1-вет В">
      <ReportForm
        setReportData={setDrugReportData}
        setDateRange={setDateRange}
        setReportActive={setReportActive}
        url="/api/drugs/reports/1vet_B"
      />
    </CreateItem>
  );
}
