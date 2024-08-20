import { ICardProps } from "../../interfaces/CardProps";

import { Col, Container, Row } from "react-bootstrap";
import { CatalogCardImage } from "./CatalogCardImage";
import { CatalogCardTitle } from "./CatalogCardTitle";
import { CatalogCardFooter } from "./CatalogCardFooter";

export function CatalogItem({ ...props }: ICardProps) {
  return (
    <Col>
      <Container className="catalog-card">
        <Container className="h-24 mb-2">
          <Row>
            <Col sm={3}>
              <CatalogCardImage
                url={props.url}
                imgSrc={props.imgSrc}
                cardTitle={props.cardTitle}
                fileUploadUrl={props.fileUploadUrl}
              />
            </Col>
            <Col>
              <CatalogCardTitle url={props.url} cardTitle={props.cardTitle} />
            </Col>
          </Row>
        </Container>
        {props.children && (
          <Container className="h-24">
            <Row>{props.children}</Row>
          </Container>
        )}
        <CatalogCardFooter
          hasFileUploader={props.hasFileUploader}
          fileUploadUrl={props.fileUploadUrl}
          accept={props.accept}
          mutationName={props.mutationName}
          invQueryName={props.invQueryName ? props.invQueryName : ""}
          iconSrc={props.iconSrc}
          delUrl={props.delUrl ? props.delUrl : ""}
          cardTitle={props.cardTitle}
        />
      </Container>
    </Col>
  );
}
