import { Vet1BReportUrl } from "shared/urls/drugUrls";

import { ReportForm } from "features/ReportForm";
import { CreateItem } from "features/CreateItem";

export function Vet1BMenu() {
  return (
    <CreateItem btnTitle="Отчет 1-вет В">
      <ReportForm url={Vet1BReportUrl} />
    </CreateItem>
  );
}
