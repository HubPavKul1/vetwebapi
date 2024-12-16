import { Container, Row } from "react-bootstrap";
import { IWrapperProps } from "shared/model/WrapperProps";

export function CatalogCardTopSmall({ ...props }: IWrapperProps) {
  return (
    <Container className="h-12 mb-1">
      <Row>{props.children}</Row>
    </Container>
  );
}
