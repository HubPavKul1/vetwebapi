import { Col, Container } from "react-bootstrap";
import { IWrapperProps } from "shared/model/WrapperProps";


export function CatalogCardWrapper({ ...props }: IWrapperProps) {
  return (
    <Col>
      <Container className="catalog-card relative">{props.children}</Container>
    </Col>
  );
}
