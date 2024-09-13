import { Container } from "react-bootstrap";
import { IDrugMovementDetail } from "interfaces/DrugInterfaces";

import { PageTable } from "widgets/PageTable";
import { drugReceiptHeaders } from "data/TableHeaders";
import { ReceiptDrug } from "components/drugs/drugMovements/ReceiptDrug";

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
