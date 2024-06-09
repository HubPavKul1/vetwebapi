import { Container, Row } from "react-bootstrap";

import { CreateItem } from "../CreateItem";
import { PageWrapper } from "../PageWrapper";

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
    <PageWrapper>
      <h1 className="text-center text-3xl mb-5">{title}</h1>
      {createForm && <CreateItem btnTitle={btnTitle}>{createForm}</CreateItem>}
      
      <Row xs={1} md={cardsInRow} lg={cardsInRow}>
        {children}
      </Row>
    </PageWrapper>
  );
}
