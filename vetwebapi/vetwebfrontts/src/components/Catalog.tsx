import { Row, Col } from "react-bootstrap";

import { CreateItem } from "components/CreateItem";
import { PageWrapper } from "components/PageWrapper";
import NoData from "components/NoData";
import { CustomPagination } from "./CustomPagination";

interface CatalogProps {
  title: string;
  createForm?: React.ReactElement;
  children: React.ReactElement | React.ReactNode;
  btnTitle?: string;
  cardsInRow: number;
  dataTotal: number;
  dataPerPage: number;
  setPageNum: CallableFunction;
  pageNum: number;
}

export function Catalog({
  title,
  createForm,
  children,
  btnTitle,
  cardsInRow,
  dataTotal,
  dataPerPage,
  setPageNum,
  pageNum,
}: CatalogProps) {
  return (
    <PageWrapper>
      <h1 className="page-title">{title}</h1>
      {createForm && <CreateItem btnTitle={btnTitle}>{createForm}</CreateItem>}
      {dataTotal > 0 ? (
        <>
          <Row xs={1} md={cardsInRow} lg={cardsInRow}>
            {children}
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <CustomPagination
                setPageNum={setPageNum}
                dataTotal={dataTotal}
                dataPerPage={dataPerPage}
                pageNum={pageNum}
              />
            </Col>
            <Col></Col>
          </Row>
        </>
      ) : (
        <NoData title={title} />
      )}
    </PageWrapper>
  );
}
