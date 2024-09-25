import { useState } from "react";
import { DiagnosticBetweenDateRange } from "./DiagnosticBetweenDateRange";
import { DiagnosticReport } from "./DiagnosticReport";
import { VaccinationReport } from "./VaccinationReport";
import { VaccinationBetweenDateRange } from "./VaccinationBetweenDateRange";
import { CatalogWrapper } from "components/CatalogWrapper";
import { IDateRange } from "shared/index";

export function VetWorkReportMainPage() {
  const [vetWorkReportData, setVetWorkReportData] = useState<object>({});
  const [dateRange, setDateRange] = useState<IDateRange>();
  const [reportActive, setReportActive] = useState(false);

  return (
    <>
      {!reportActive ? (
        <CatalogWrapper
          title="Отчеты по противоэпизоотической работе"
          cardsInRow={3}
        >
          <DiagnosticBetweenDateRange
            setReportData={setVetWorkReportData}
            setDateRange={setDateRange}
            setReportActive={setReportActive}
          />

          <VaccinationBetweenDateRange
            setReportData={setVetWorkReportData}
            setDateRange={setDateRange}
            setReportActive={setReportActive}
          />
        </CatalogWrapper>
      ) : dateRange && vetWorkReportData.diagnostics ? (
        <DiagnosticReport
          data={vetWorkReportData.diagnostics}
          dateStart={dateRange?.date_start}
          dateEnd={dateRange?.date_end}
          setReportActive={setReportActive}
        />
      ) : (
        dateRange &&
        vetWorkReportData.vaccinations && (
          <VaccinationReport
            data={vetWorkReportData.vaccinations}
            dateStart={dateRange?.date_start}
            dateEnd={dateRange?.date_end}
            setReportActive={setReportActive}
          />
        )
      )}
    </>
  );
}
