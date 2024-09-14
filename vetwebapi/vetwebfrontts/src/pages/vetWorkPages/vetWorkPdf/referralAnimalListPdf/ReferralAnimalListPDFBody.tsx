import { Container, Row, Col } from "react-bootstrap";

import { IVetWorkSchema } from "entities/vetWork/model/vetWorkInterfaces";

import { PageTable } from "widgets/PageTable";
import { referralAnimalsHeaders } from "data/TableHeaders";
import { ReferralAnimalItem } from "./ReferralAnimalItem";
import { NoData } from "shared/index";

interface ReferralAnimalListPDFBodyProps {
  data: IVetWorkSchema;
}

export function ReferralAnimalListPDFBody({
  data,
}: ReferralAnimalListPDFBodyProps) {
  if (!data.companies) return <NoData title="Данные о предприятиях" />;
  if (!data.animals) return <NoData title="Данные о животных" />;

  return (
    <Container>
      <PageTable
        tableHeaders={referralAnimalsHeaders}
        tableItems={data.animals.map((animal, index) => (
          <ReferralAnimalItem animal={animal} index={index} />
        ))}
      />
      <Row>
        <Col md={3}></Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col>стр.</Col>
        <Col className="pdf-report-underlined"></Col>
        <Col>из</Col>
        <Col className="pdf-report-underlined"></Col>
        <Col>стр.</Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
