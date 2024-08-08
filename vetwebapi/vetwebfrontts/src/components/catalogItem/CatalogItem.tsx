import { ICardProps } from "../../interfaces/CardProps";

import styles from "./CatalogItem.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import { CatalogCardImage } from "./CatalogCardImage";
import { CatalogCardTitle } from "./CatalogCardTitle";
import { CatalogCardFooter } from "./CatalogCardFooter";

export function CatalogItem({ ...props }: ICardProps) {
  return (
    <Col>
      <Container className={styles.catalogItem}>
        <Container className={styles.cardTitle}>
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
          <Container className={styles.cardBody}>
            <Row>{props.children}</Row>
          </Container>
        )}
        <CatalogCardFooter
          hasFileUploader={props.hasFileUploader}
          fileUploadUrl={props.fileUploadUrl}
          accept={props.accept}
          mutationName={props.mutationName}
          invQueryName={props.invQueryName}
          iconSrc={props.iconSrc}
          delUrl={props.delUrl}
          cardTitle={props.cardTitle}
        />
      </Container>
    </Col>
  );
}
