import { AppService } from "../../../app.service";
import { IDrugReport } from "../../../interfaces/DrugInterfaces";
import { Col, Row } from "react-bootstrap";

interface ReceiptDrugProps {
  drug: IDrugReport;
}

export function DrugInReport({ drug }: ReceiptDrugProps) {
  const expirationDate = AppService.convertDateString(
    drug.expiration_date
  ).shortDate;

  return (
    <Row key={drug.id} className="border-bottom border-black">
      <Col xs={2}>{drug.drug_name}</Col>
      <Col>{drug.batch}</Col>
      <Col>{expirationDate}</Col>
      <Col>{drug.packs_start}</Col>
      <Col>{drug.units_start}</Col>
      <Col>{drug.packs_received}</Col>
      <Col>{drug.units_received}</Col>
      <Col>{drug.packs_spent}</Col>
      <Col>{drug.units_spent}</Col>
      <Col>{drug.disposed_units}</Col>
      <Col>{drug.packs_rest}</Col>
      <Col>{drug.units_rest}</Col>
    </Row>
  );
}
