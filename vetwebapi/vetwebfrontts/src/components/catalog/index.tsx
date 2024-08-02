import { Row } from "react-bootstrap";

import { CreateItem } from "../createItem";
import { PageWrapper } from "../PageWrapper";
import NoData from "../NoData";

interface CatalogProps {
  title: string;
  createForm?: React.ReactElement;
  children: React.ReactElement | React.ReactNode;
  btnTitle?: string;
  cardsInRow: number;
  dataLength: number;
}

export function Catalog({
  title,
  createForm,
  children,
  btnTitle,
  cardsInRow,
  dataLength,
}: CatalogProps) {
  return (
    <PageWrapper>
      <h1 className="text-center text-3xl font-bold underline mb-5 ">
        {title}
      </h1>
      {createForm && <CreateItem btnTitle={btnTitle}>{createForm}</CreateItem>}
      {dataLength > 0 ? (
        <Row xs={1} md={cardsInRow} lg={cardsInRow}>
          {children}
        </Row>
      ) : (
        <NoData title={title} />
      )}
    </PageWrapper>
  );
}
