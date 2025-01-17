import { Col, Row } from "react-bootstrap";

interface CardBodyPhonesProps {
  phone?: string;
  phone2?: string;
}

export function CardBodyPhones({ phone, phone2 }: CardBodyPhonesProps) {
  return (
    <>
      <Row className="text-sm text-left">
        <Col>
          <span>тел.: {phone}</span>
        </Col>
        {phone2 && (
          <Col>
            <span>тел2.: {phone2}</span>
          </Col>
        )}
      </Row>
    </>
  );
}
