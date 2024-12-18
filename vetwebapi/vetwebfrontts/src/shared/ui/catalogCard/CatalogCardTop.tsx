import { Container, Row } from "react-bootstrap";
import { IWrapperProps } from "shared/model/WrapperProps";

export function CatalogCardTop({ ...props }: IWrapperProps) {
  return (
    <Container className={props.className}>
      <Row>{props.children}</Row>
    </Container>
  );
}
