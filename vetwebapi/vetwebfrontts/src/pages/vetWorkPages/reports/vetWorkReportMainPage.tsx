import { DiagnosticReport } from "./DiagnosticReport";
import { VaccinationReport } from "./VaccinationReport";

import { HomeContentWrapper } from "entities/home";
import useCompanyVetWorksDataStore from "features/vetWork/stores/useCompanyVetWorksDataStore";
import useReportStore from "features/vetWork/stores/useReportStore";
import { Container } from "react-bootstrap";
import {
  CompanyVetWorksBetweenDateRange,
  DiagnosticBetweenDateRange,
  VaccinationBetweenDateRange,
} from "widgets/vetWorkReport";
import { CompanyVetWorksReport } from "./CompanyVetWorksReport";

export function VetWorkReportMainPage() {
  const dateRange = useReportStore((state) => state.dateRange);
  const isReportActive = useReportStore((state) => state.isReportActive);
  const isCompanyVetWorksReportActive = useCompanyVetWorksDataStore(
    (state) => state.isReportActive
  );
  const reportData = useReportStore((state) => state.reportData);
  const companyVetWorks = useCompanyVetWorksDataStore(
    (state) => state.vetWorksData
  );

  console.log(companyVetWorks);

  return (
    <>
      {!isReportActive && !isCompanyVetWorksReportActive ? (
        <HomeContentWrapper title="Отчеты по противоэпизоотической работе">
          <Container className="w-auto">
            <DiagnosticBetweenDateRange />
            <VaccinationBetweenDateRange />
            <CompanyVetWorksBetweenDateRange />
          </Container>
        </HomeContentWrapper>
      ) : !isCompanyVetWorksReportActive &&
        dateRange &&
        reportData.diagnostics ? (
        <DiagnosticReport />
      ) : !isCompanyVetWorksReportActive &&
        dateRange &&
        reportData.vaccinations ? (
        <VaccinationReport />
      ) : (
        isCompanyVetWorksReportActive &&
        companyVetWorks && <CompanyVetWorksReport />
      )}
    </>
  );
}
