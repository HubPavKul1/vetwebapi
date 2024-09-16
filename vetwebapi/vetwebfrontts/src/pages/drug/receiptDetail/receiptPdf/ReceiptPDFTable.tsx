import { Container } from "react-bootstrap";

import { ReceiptDrug } from "components/drugs/drugMovements/ReceiptDrug";
import { IDrugMovementDetail } from "entities/drugMovements/model/drugMovementInterfaces";
import { PageTable } from "shared/index";
import { drugReceiptHeaders } from "shared/model/tableHeaders";

interface ReceiptPDFTableProps {
  data: IDrugMovementDetail;
}

export function ReceiptPDFTable({ data }: ReceiptPDFTableProps) {
  if (!data.drugs) return;
  return (
    <Container>
      <PageTable
        tableHeaders={drugReceiptHeaders}
        tableItems={
          data.drugs?.length &&
          data.drugs.map((drug) => <ReceiptDrug key={drug.id} drug={drug} />)
        }
        isDrugReport
      />
    </Container>
  );
}
