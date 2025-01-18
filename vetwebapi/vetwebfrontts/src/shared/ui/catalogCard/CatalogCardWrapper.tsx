import { Col, Container } from "react-bootstrap";
import { IWrapperProps } from "shared/model/WrapperProps";

export function CatalogCardWrapper({ ...props }: IWrapperProps) {
  return (
    <Col>
      <Container className="p-3 mb-5 bg-slate-200 border rounded-md shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out relative">
        {props.children}
      </Container>
    </Col>
  );
}
