import { Container, Row } from "react-bootstrap";
import { IWrapperProps } from "shared/model/WrapperProps";

export function CatalogCardTop({ ...props }: IWrapperProps) {
  return (
    <Container className="h-24 mb-1">
      <Row>{props.children}</Row>
    </Container>
  );
}
