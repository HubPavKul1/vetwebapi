import { useState } from "react";
import { DrugReport } from "./DrugReport";
import { Vet1BMenu } from "widgets/drugReport/ui/Vet1BMenu";
import { Vet1B } from "./Vet1B";
import { IDateRange } from "shared/index";
import { HomeContentWrapper } from "entities/home";
import { DrugMovementBetweenDateRange } from "widgets/drugReport";

export function DrugReportMainPage() {
  const [drugReportData, setDrugReportData] = useState<object>({});
  const [dateRange, setDateRange] = useState<IDateRange>();
  const [reportActive, setReportActive] = useState(false);

  return (
    <>
      {!reportActive ? (
        <HomeContentWrapper title="Отчеты по биопрепаратам">
          <DrugMovementBetweenDateRange
            setReportData={setDrugReportData}
            setDateRange={setDateRange}
            setReportActive={setReportActive}
            dateRange={dateRange}
          />
          <Vet1BMenu
            setReportData={setDrugReportData}
            setDateRange={setDateRange}
            setReportActive={setReportActive}
          />
        </HomeContentWrapper>
      ) : dateRange && drugReportData.drugs_report ? (
        <DrugReport
          data={drugReportData.drugs_report}
          dateStart={dateRange?.date_start}
          dateEnd={dateRange?.date_end}
          setReportActive={setReportActive}
        />
      ) : (
        dateRange &&
        drugReportData.vet1B_report && (
          <Vet1B
            data={drugReportData.vet1B_report}
            dateEnd={dateRange?.date_end}
            setReportActive={setReportActive}
          />
        )
      )}
    </>
  );
}
