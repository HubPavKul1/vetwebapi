import { Container, Row, Col } from "react-bootstrap";

import { AppService } from "services/app.service";

interface DrugReportPDFHeaderProps {
  dateEnd: string;
}

export function DrugReportPDFHeader({ dateEnd }: DrugReportPDFHeaderProps) {
  const endDate = AppService.convertDateString(dateEnd);

  return (
    <Container className="report-title">
      <Row className="mb-8">
        <Col sm={7}></Col>
        <Col>
          <p>
            {" "}
            Приложение № 2 к Порядку учета, хранения, использования и списания
            лекарственных средств и препаратов для ветеринарного применения,
            поступающих за счет средств федерального и областного бюджетов,
            бюджетными государственными учреждениями ветеринарии Ивановской
            области
          </p>
        </Col>
      </Row>
      <Container className="report-title italic">
        <Row>
          <Col sm={4}></Col>
          <Col>
            <h5>СВЕДЕНИЯ</h5>
          </Col>
          <Col sm={4}></Col>
        </Row>
        <Row>
          <Col sm={2}></Col>
          <Col>
            о движении ветеринарных препаратов, полученных за счет федерального
            бюджета
          </Col>
          <Col sm={2}></Col>
        </Row>
        <Row>
          <Col sm={2}></Col>
          <Col>
            по БГУ Ивановской области "Ивгор СББЖ" за {endDate.month}{" "}
            {endDate.year}
          </Col>
          <Col sm={2}></Col>
        </Row>
      </Container>
    </Container>
  );
}
