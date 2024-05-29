import { ICardProps } from "../../interfaces/CardProps";
import { Link } from "react-router-dom";

import styles from "./CatalogItem.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import { BsFillTrash3Fill } from "react-icons/bs";
import { CatalogCardImage } from "./CatalogCardImage";
import { CatalogCardTitle } from "./CatalogCardTitle";
import { useMutation, useQueryClient } from "react-query";
import { AppService } from "../../app.service";
import { CatalogCardBody } from "./CatalogICardBody";

export function CatalogItem({ ...props }: ICardProps) {
  const queryClient = useQueryClient();
  // const url = `/api/companies/${company.id}`

  const { mutate } = useMutation(["delete item"], {
    mutationFn: () => AppService.deleteItem(props.url),
    onSuccess: () => {
      alert(`${props.cardTitle} успешно удалено!`);
      queryClient.invalidateQueries([`${props.invQueryName}`]);
    },
  });

  const deleteCompany = () => {
    mutate();
  };

  return (
    <Col>
      <Container className={styles.catalogItem}>
        <Col sm={3}>
          <CatalogCardImage
            url={props.url}
            imgSrc={props.imgSrc}
            cardTitle={props.cardTitle}
            fileUploadUrl={props.fileUploadUrl}
          />
        </Col>
        <Col sm={9} className={styles.cardContent}>
          <Row>
            <CatalogCardTitle url={props.url} cardTitle={props.cardTitle} />
          </Row>
          <Row>
            {props.hasContacts && (
              <CatalogCardBody
                address={props.address}
                employee={props.employee}
                phone={props.phone}
                phone2={props.phone2}
              />
            )}
          </Row>
        </Col>
      </Container>

      {/* <Container className={styles.catalogItem}>
        <CatalogCardImage
          url={url}
          imgSrc={props.imgSrc}
          cardTitle={props.cardTitle}
          fileUploadUrl={props.fileUploadUrl}
        />

        <div className={styles.card}>
          
          {props.children}
        </div>

        <div className={styles.services}>
          <BsFillTrash3Fill className="delete-icon" onClick={props.onClick} />
        </div>
      </Container> */}
    </Col>
  );
}
