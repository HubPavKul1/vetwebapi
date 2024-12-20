import { drugReportsUrl } from "shared/urls/drugUrls";

import { ReportForm } from "features/ReportForm";
import { CreateItem } from "features/CreateItem";

export function DrugMovementBetweenDateRange() {
  return (
    <CreateItem btnTitle="Движение биопрепаратов за период времени">
      <ReportForm url={drugReportsUrl} />
    </CreateItem>
  );
}
