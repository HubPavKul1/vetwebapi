import { Container, Row } from "react-bootstrap";
import { IWrapperProps } from "shared/model/WrapperProps";


export function CatalogCardBody({ ...props }: IWrapperProps) {
  return (
    <Container className="h-24 mb-2">
      <Row>{props.children}</Row>
    </Container>
  );
}
