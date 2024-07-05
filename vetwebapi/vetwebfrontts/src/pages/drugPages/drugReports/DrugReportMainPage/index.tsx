import { useState } from "react";
import { Catalog } from "../../../../components/Catalog";
import DrugMovementBetweenDateRange from "../../../../components/drugs/drugReports/reportMenuItems/DrugMovementBetweenDateRange";
import { IDateRange } from "../../../../interfaces/BaseInterface";
import { DrugReport } from "../DrugReport";
import Vet1BMenu from "../../../../components/drugs/drugReports/reportMenuItems/Vet1BMenu";
import { Vet1B } from "../Vet1B";

export default function DrugReportMainPage() {
  const [drugReportData, setDrugReportData] = useState<object>({});
  const [dateRange, setDateRange] = useState<IDateRange>();
  const [reportActive, setReportActive] = useState(false);

  return (
    <>
      {!reportActive ? (
        <Catalog title="Отчеты по биопрепаратам" cardsInRow={3}>
          <DrugMovementBetweenDateRange
            setDrugReportData={setDrugReportData}
            setDateRange={setDateRange}
            setReportActive={setReportActive}
          />
          <Vet1BMenu
            setDrugReportData={setDrugReportData}
            setDateRange={setDateRange}
            setReportActive={setReportActive}
          />
        </Catalog>
      ) : (
        dateRange &&
        drugReportData.drugs_report ? (
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
      ))}
    </>
  );
}
