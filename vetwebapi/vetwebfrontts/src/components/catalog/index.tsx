import { Container, Row } from "react-bootstrap";

import { CreateItem } from "../CreateItem";

interface CatalogProps {
  title: string;
  createForm?: React.ReactElement;
  children: React.ReactElement | React.ReactNode;
  btnTitle?: string;
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
    <Container className="p-8 mb-8">
      <h1 className="text-center text-3xl mb-5">{title}</h1>
      {createForm && <CreateItem btnTitle={btnTitle}>{createForm}</CreateItem>}
      
      <Row xs={1} md={cardsInRow} lg={cardsInRow}>
        {children}
      </Row>
    </Container>
  );
}
