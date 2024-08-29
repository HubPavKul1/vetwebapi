import { Row, Col } from "react-bootstrap";

import { CreateItem } from "components/CreateItem";
import { PageWrapper } from "components/PageWrapper";
import NoData from "components/NoData";
import { CustomPagination } from "./CustomPagination";

interface CatalogProps {
  title: string;
  createForm?: React.ReactElement;
  children?: React.ReactElement | React.ReactNode;
  btnTitle?: string;
  cardsInRow: number;
  setPageNum?: CallableFunction;
  pageNum?: number;
  dataTotal: number;
  dataPerPage?: number;
}

export function Catalog({
  title,
  createForm,
  children,
  btnTitle,
  cardsInRow,
  setPageNum,
  pageNum,
  dataTotal,
  dataPerPage,
}: CatalogProps) {
  return (
    <PageWrapper>
      <h1 className="page-title">{title}</h1>
      {createForm && <CreateItem btnTitle={btnTitle}>{createForm}</CreateItem>}
      {dataTotal > 0 ? (
        <>
          <Row xs={1} md={cardsInRow} lg={cardsInRow} className="mb-10">
            {children}
          </Row>
          {setPageNum && pageNum && dataPerPage && (
            <Row className="flex justify-center">
              <Col>
                <CustomPagination
                  setPageNum={setPageNum}
                  pageNum={pageNum}
                  dataTotal={dataTotal}
                  dataPerPage={dataPerPage}
                />
              </Col>
            </Row>
          )}
        </>
      ) : (
        <NoData title={title} />
      )}
    </PageWrapper>
  );
}
