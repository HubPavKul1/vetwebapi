import { Container, Row } from "react-bootstrap";
import { IWrapperProps } from "shared/model/WrapperProps";

export function CatalogCardBodySmall({ ...props }: IWrapperProps) {
  return (
    <Container className="h-14 mb-1">
      <Row>{props.children}</Row>
    </Container>
  );
}
