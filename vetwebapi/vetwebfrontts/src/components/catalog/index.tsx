import { Container, Row } from "react-bootstrap";

import styles from "./Catalog.module.scss";
import { CreateItem } from "../CreateItem";
import { CatalogItem } from "../catalogItem/CatalogItem";

interface CatalogProps {
  title: string;
  createForm: React.ReactElement;
  children: React.ReactElement | React.ReactNode;
  btnTitle: string;
  cardsInRow: number;
}

export function Catalog({
  title,
  createForm,
  children,
  btnTitle,
  cardsInRow,
}: CatalogProps) {
  return (
    <Container className={styles.catalogWrap}>
      <h1>{title}</h1>
      <CreateItem btnTitle={btnTitle}>{createForm}</CreateItem>
      <Row xs={1} md={cardsInRow} lg={cardsInRow}>
        {children}
      </Row>
    </Container>
  );
}
