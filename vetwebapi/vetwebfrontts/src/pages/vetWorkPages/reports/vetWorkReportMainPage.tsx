import { DiagnosticBetweenDateRange } from "./DiagnosticBetweenDateRange";
import { DiagnosticReport } from "./DiagnosticReport";
import { VaccinationReport } from "./VaccinationReport";
import { VaccinationBetweenDateRange } from "./VaccinationBetweenDateRange";

import { HomeContentWrapper } from "entities/home";
import useReportStore from "features/vetWork/stores/useReportStore";
import { Container } from "react-bootstrap";

export function VetWorkReportMainPage() {
  const dateRange = useReportStore((state) => state.dateRange);
  const isReportActive = useReportStore((state) => state.isReportActive);
  const reportData = useReportStore((state) => state.reportData);

  return (
    <>
      {!isReportActive ? (
        <HomeContentWrapper title="Отчеты по противоэпизоотической работе">
          <Container className="w-auto">
            <DiagnosticBetweenDateRange />
            <VaccinationBetweenDateRange />
          </Container>
        </HomeContentWrapper>
      ) : dateRange && reportData.diagnostics ? (
        <DiagnosticReport />
      ) : (
        dateRange && reportData.vaccinations && <VaccinationReport />
      )}
    </>
  );
}
