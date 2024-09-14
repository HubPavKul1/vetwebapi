import { Col, Container } from "react-bootstrap";
import { ICardProps } from "shared/model/CardProps";

export function CatalogCardWrapper({ ...props }: ICardProps) {
  return (
    <Col>
      <Container className="catalog-card relative">{props.children}</Container>
    </Col>
  );
}
