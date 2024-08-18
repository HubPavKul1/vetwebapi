import { Container, Row, Col } from "react-bootstrap";

import { AppService } from "services/app.service";
import { IVetWorkSchema } from "interfaces/VetWorkInterfaces";
import NoData from "components/NoData";

interface ReferralAnimalListPDFHeaderProps {
  data: IVetWorkSchema;
}

export function ReferralAnimalListPDFHeader({
  data,
}: ReferralAnimalListPDFHeaderProps) {

  if (!data.companies) return <NoData title="Данные о предприятиях" />;
  if (!data.animals) return <NoData title="Данные о животных" />;
  
  const date = AppService.convertDateString(data.vetwork_date).fullDate;

  return (
    <Container>
      <Row>
        <Col md={4} className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col md={6}>Опись* проб к сопроводительному документу-заявке:</Col>
      </Row>
      <Row className="text-center text-sm mb-4">
        <Col md={4}>(регистрационный номер заявки)</Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col md={4} className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col></Col>
        <Col className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col className="pdf-report-underlined"></Col>
      </Row>
      <Row className="text-center text-sm mb-4">
        <Col md={4}>(дата поступления)</Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row className="text-center text-sm mb-4">
        <Col md={4} className="pdf-report-underlined"></Col>
      </Row>
    </Container>
  );
}
