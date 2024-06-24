import { useState } from "react";
import { Catalog } from "../../../../components/Catalog";
import DrugMovementBetweenDateRange from "../../../../components/drugs/drugReports/reportMenuItems/DrugMovementBetweenDateRange";
import { IDrugReport } from "../../../../interfaces/DrugInterfaces";
import { IDateRange } from "../../../../interfaces/BaseInterface";
import { DrugReport } from "../DrugReport";

export default function DrugReportMainPage() {
  const [drugReportData, setDrugReportData] = useState<IDrugReport[]>([]);
  const [dateRange, setDateRange] = useState<IDateRange>();
  const [reportActive, setReportActive] = useState(false)

  return (
    <>
      {!reportActive ? (
        <Catalog title="Отчеты по биопрепаратам" cardsInRow={3}>
          <DrugMovementBetweenDateRange
            setDrugReportData={setDrugReportData}
            setDateRange={setDateRange}
            setReportActive={setReportActive}
          />
        </Catalog>
      ) : (
        dateRange &&
        drugReportData && (
          <DrugReport
            data={drugReportData}
            dateStart={dateRange?.date_start}
            dateEnd={dateRange?.date_end}
            setReportActive={setReportActive}
          />
        )
      )}
    </>
  );
}
