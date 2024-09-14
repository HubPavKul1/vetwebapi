import { Container, Row } from "react-bootstrap";
import { ICardProps } from "shared/model/CardProps";

export function CatalogCardTop({ ...props }: ICardProps) {
  return (
    <Container className="h-24 mb-2">
      <Row>{props.children}</Row>
    </Container>
  );
}
