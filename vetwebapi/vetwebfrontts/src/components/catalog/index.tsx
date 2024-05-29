import { Container, Row } from "react-bootstrap";

import styles from "./Catalog.module.scss";
import { CreateItem } from "../createItem/CreateItem";
import { CatalogItem } from "../catalogItem/CatalogItem";
import { ICardProps } from "../../interfaces/CardProps";

interface CatalogProps {
  title: string;
  children: React.ReactElement | React.ReactNode;
  items?: object[];
  btnTitle: string;
  cardsInRow: number;
  imgSrc?: string;
  invQueryName: string;
}

export function Catalog({
  title,
  children,
  items,
  btnTitle,
  cardsInRow,
  imgSrc,
  invQueryName,
}: CatalogProps) {
  return (
    <Container className={styles.catalogWrap}>
      <h1>{title}</h1>
      <CreateItem btnTitle={btnTitle}>{children}</CreateItem>
      <Row xs={1} md={cardsInRow} lg={cardsInRow}>
        {items ? (
          items.map((item) => <CatalogItem key={item.id} imgSrc={imgSrc} invQueryName={invQueryName}/>)
        ) : (
          <h5>{title} отсутствуют</h5>
        )}
      </Row>
    </Container>
  );
}
