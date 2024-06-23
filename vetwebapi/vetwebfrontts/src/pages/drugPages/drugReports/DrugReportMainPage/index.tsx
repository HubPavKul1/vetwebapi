import { Catalog } from "../../../../components/Catalog";
import DrugMovementBetweenDateRange from "../../../../components/drugs/drugReports/reportMenuItems/DrugMovementBetweenDateRange";

export default function DrugReportMainPage() {
  return (
    <Catalog title="Отчеты по биопрепаратам" cardsInRow={3}>
      <DrugMovementBetweenDateRange />
    </Catalog>
  );
}
