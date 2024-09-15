import { Container, Row } from "react-bootstrap";
import { IWrapperProps } from "shared/model/WrapperProps";

export function CatalogCardFooter({...props}: IWrapperProps) {
  return (
    <Container>
      <Row>{props.children}</Row>
    </Container>
  );
}
