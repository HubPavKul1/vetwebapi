import { Container, Row } from "react-bootstrap";
import { IWrapperProps } from "shared/model/WrapperProps";

export function CatalogCardBody({ ...props }: IWrapperProps) {
  return (
    <Container className="h-28 mb-1">
      <Row>{props.children}</Row>
    </Container>
  );
}
