import { ICardProps } from "../../shared/model/CardProps";

import { Col, Container, Row } from "react-bootstrap";
import { CatalogCardImage } from "./CatalogCardImage";
import { CatalogCardTitle } from "../../shared/ui/CatalogCardTitle";
import { CatalogCardFooter } from "./CatalogCardFooter";

export function CatalogItem({ ...props }: ICardProps) {
  return (
    <Col>
      <Container className="catalog-card relative">
        <Container className="h-24 mb-2">
          <Row>
            <Col sm={3}>
              <CatalogCardImage
                url={props.url}
                imgSrc={props.imgSrc}
                cardTitle={props.cardTitle}
                fileUploadUrl={props.fileUploadUrl}
                invQueryName={props.invQueryName ? props.invQueryName : ""}
              />
            </Col>
            <Col>
              <CatalogCardTitle url={props.url} cardTitle={props.cardTitle} />
            </Col>
          </Row>
        </Container>
        {props.children && (
          <Container className="h-24 mb-2">
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
