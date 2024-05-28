import { ICardProps } from "../../interfaces/CardProps";
import { Link } from "react-router-dom";

import styles from "./CatalogItem.module.scss";
import { Col, Container } from "react-bootstrap";
import { BsFillTrash3Fill } from "react-icons/bs";
import { CatalogItemHeader } from "./CatalogCardHeader";

export function CatalogItem({ ...props }: ICardProps) {
  let url = "";
  props.url ? (url = props.url) : (url = "/");
  return (
    <Col>
      <Container className={styles.catalogItem}>
        <CatalogItemHeader
          url={url}
          imgSrc={props.imgSrc}
          cardTitle={props.cardTitle}
          fileUploadUrl={props.fileUploadUrl}
        />

        <div className={styles.card}>
          <Link to={url}>
            <h5 className={styles.cardTitle}>{props.cardTitle}</h5>
          </Link>
          {props.children}
        </div>

        <div className={styles.services}>
          <BsFillTrash3Fill className="delete-icon" onClick={props.onClick} />
        </div>
      </Container>
    </Col>
  );
}
