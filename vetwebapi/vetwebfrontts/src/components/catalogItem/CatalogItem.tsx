import { ICardProps } from "../../interfaces/CardProps";
import { Link } from "react-router-dom";

import styles from "./CatalogItem.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import { BsFillTrash3Fill } from "react-icons/bs";
import { CatalogCardImage } from "./CatalogCardImage";
import { CatalogCardTitle } from "./CatalogCardTitle";
import { useMutation, useQueryClient } from "react-query";
import { AppService } from "../../app.service";


export function CatalogItem({ ...props }) {

  const queryClient = useQueryClient()
    // const url = `/api/companies/${company.id}`


    const { mutate } = useMutation(["delete item"], {
        mutationFn: () => AppService.deleteItem(url),
        onSuccess: () => {
            alert(`${props.cardTitle} успешно удалено!`)
            queryClient.invalidateQueries([`${props.queryKey}`])
        }
    },
    )

    const deleteCompany = () => {
        mutate()
    }

  let url = "";
  props.url ? (url = props.url) : (url = "/");
  return (
    <Col>
      <Container className={styles.catalogItem}>
        <Col sm={3}>
          <CatalogCardImage
            url={url}
            imgSrc={props.imgSrc}
            cardTitle={props.cardTitle}
            fileUploadUrl={props.fileUploadUrl}
          />
        </Col>
        <Col sm={9}>
          <Row>
           <CatalogCardTitle url={props.url} cardTitle={props.cardTitle} />
          </Row>
          <Row>
            
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
