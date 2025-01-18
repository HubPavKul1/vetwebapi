import { DrugReport } from "./DrugReport";
import { Vet1BMenu } from "widgets/drugReport/ui/Vet1BMenu";
import { Vet1B } from "./Vet1B";
import { HomeContentWrapper } from "entities/home";
import { DrugMovementBetweenDateRange } from "widgets/drugReport";
import useReportStore from "features/vetWork/stores/useReportStore";
import { Container } from "react-bootstrap";

export function DrugReportMainPage() {
  const dateRange = useReportStore((state) => state.dateRange);
  const reportData = useReportStore((state) => state.reportData);
  const isReportActive = useReportStore((state) => state.isReportActive);

  return (
    <>
      {!isReportActive ? (
        <HomeContentWrapper title="Отчеты по биопрепаратам">
          <Container className="w-auto">
            <DrugMovementBetweenDateRange />
            <Vet1BMenu />
          </Container>
        </HomeContentWrapper>
      ) : dateRange && reportData.drugs_report ? (
        <DrugReport />
      ) : (
        dateRange && reportData.vet1B_report && <Vet1B />
      )}
    </>
  );
}
