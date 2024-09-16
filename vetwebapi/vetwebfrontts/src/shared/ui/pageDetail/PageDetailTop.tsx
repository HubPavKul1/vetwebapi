import { Col, Container, Row } from "react-bootstrap";

interface PageDetailTopProps {
  imgSrc: string;
  alt: string;
  menu: React.ReactElement;
}

export function PageDetailTop({ imgSrc, alt, menu }: PageDetailTopProps) {
  return (
    <Container>
      <Row className="mb-8">
        <Col sm={8} className="flex justify-center">
          <img src={imgSrc} alt={alt} className="w-auto" />
        </Col>
        <Col>{menu}</Col>
      </Row>
    </Container>
  );
}
