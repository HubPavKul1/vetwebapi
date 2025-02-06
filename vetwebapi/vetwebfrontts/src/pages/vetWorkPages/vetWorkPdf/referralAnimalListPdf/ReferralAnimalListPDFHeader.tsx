import { Container, Row, Col } from "react-bootstrap";

import { IVetWorkSchema } from "entities/vetWork/model/vetWorkInterfaces";
import { NoData } from "shared/index";

interface ReferralAnimalListPDFHeaderProps {
  data: IVetWorkSchema;
}

export function ReferralAnimalListPDFHeader({
  data,
}: ReferralAnimalListPDFHeaderProps) {
  if (!data.companies) return <NoData title="Данные о предприятиях" />;
  if (!data.animals) return <NoData title="Данные о животных" />;
  const formNumber =
    data.biomaterial === "сыворотка крови" ||
    data.biomaterial === "цельная кровь"
      ? 1
      : 0;

  return (
    <Container>
      <Row>
        <Col className="flex justify-end">Ф - 2{formNumber}</Col>
      </Row>
      <Row>
        <Col md={4} className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col md={6} className="flex justify-end">
          Опись* проб к сопроводительному документу-заявке:
        </Col>
      </Row>
      <Row className="text-center text-sm mb-3">
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
      <Row className="text-center text-sm mb-3">
        <Col md={4}>(дата поступления)</Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row className="text-center text-sm mb-3">
        <Col md={4} className="pdf-report-underlined"></Col>
      </Row>
    </Container>
  );
}
