import { useState } from "react";
import { DrugMovementBetweenDateRange } from "components/drugs/drugReports/reportMenuItems/DrugMovementBetweenDateRange";
import { DrugReport } from "./DrugReport";
import { Vet1BMenu } from "components/drugs/drugReports/reportMenuItems/Vet1BMenu";
import { Vet1B } from "./Vet1B";
import { CatalogWrapper } from "components/CatalogWrapper";
import { IDateRange } from "shared/index";

export function DrugReportMainPage() {
  const [drugReportData, setDrugReportData] = useState<object>({});
  const [dateRange, setDateRange] = useState<IDateRange>();
  const [reportActive, setReportActive] = useState(false);

  return (
    <>
      {!reportActive ? (
        <CatalogWrapper title="Отчеты по биопрепаратам" cardsInRow={3}>
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
        </CatalogWrapper>
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
