import { ICardProps } from "../../interfaces/CardProps";
import { Link } from "react-router-dom";

import styles from "./CatalogItem.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import { BsFillTrash3Fill } from "react-icons/bs";
import { CatalogCardImage } from "./CatalogCardImage";
import { CatalogCardTitle } from "./CatalogCardTitle";
import { useMutation, useQueryClient } from "react-query";
import { AppService } from "../../app.service";
import { FileUpload } from "../FileUpload";

export function CatalogItem({ ...props }: ICardProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(["delete item"], {
    mutationFn: () => AppService.deleteItem(props.delUrl),
    onSuccess: () => {
      alert(`${props.cardTitle} успешно удалено!`);
      queryClient.invalidateQueries([`${props.invQueryName}`]);
    },
  });

  const deleteItem = () => {
    mutate();
  };

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
        <Container className={styles.cardBody}>
          <Row>{props.children}</Row>
        </Container>
        <Container className={styles.services}>
          <Row>
            <Col sm={7}></Col>
            <Col className={styles.fileUpload}>
              <Container>
                {props.hasFileUploader && (
                  <FileUpload
                    uploadUrl={props.fileUploadUrl}
                    accept={props.accept}
                    mutationName={props.mutationName}
                    invQueryName={props.invQueryName}
                    iconSrc={props.iconSrc}
                  />
                )}
              </Container>
            </Col>
            <Col>
              <BsFillTrash3Fill className="delete-icon" onClick={deleteItem} />
            </Col>
          </Row>
        </Container>
      </Container>
    </Col>
  );
}
