import { Container, Row, Col } from "react-bootstrap";

import { AppService } from "services/app.service";

interface Vet1BPDFHeaderProps {
  dateEnd: string;
}

export function Vet1BPDFHeader({ dateEnd }: Vet1BPDFHeaderProps) {
  const endDate = AppService.convertDateString(dateEnd);

  return (
    <Container className="report-title">
      <Row>
        <h5>
          Информация о расходовании продукции на противоэпизоотические
          мероприятия, оплачиваемые за счет федерального бюджета по г. Иваново
        </h5>
      </Row>
      <Row>
        <Col sm={5}></Col>
        <Col sm={2}>
          за {endDate.quarter} квартал {endDate.year} г.
        </Col>
        <Col sm={5}></Col>
      </Row>
    </Container>
  );
}
