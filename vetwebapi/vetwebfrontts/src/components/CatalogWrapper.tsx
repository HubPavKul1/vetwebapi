import { Row, Col } from "react-bootstrap";

import { PageWrapper } from "components/PageWrapper";
import NoData from "components/NoData";
import { CustomPagination } from "./CustomPagination";
import React, { useState } from "react";
import { useGetPageData } from "hooks/useGetPageData";
import { ErrorLoadDataMessage } from "./ErrorLoadDataMessage";
import { Loader } from "./Loader";
import CatalogItems from "./CatalogItems";
import { CreateItem } from "./CreateItem";

interface CatalogWrapperProps {
  title: string;
  createForm?: React.ReactElement;
  children?: React.ReactElement | React.ReactNode;
  btnTitle?: string;
  cardsInRow: number;
  queryKey?: string;
  url?: string;
  imgSrc?: string;
}

export function CatalogWrapper({
  title,
  children,
  cardsInRow,
  queryKey,
  url,
  imgSrc,
  btnTitle,
  createForm,
}: CatalogWrapperProps) {
  const [pageNum, setPageNum] = useState(1);
  if (!url || !queryKey)
    return (
      <PageWrapper>
        <h1 className="page-title">{title}</h1>
        <Row xs={1} md={cardsInRow} lg={cardsInRow} className="mb-10">
          {children}
        </Row>
      </PageWrapper>
    );
  const pageQueryKey = `${queryKey}${pageNum}`;

  const { data, isLoading, isError, error } = useGetPageData(
    pageQueryKey,
    url,
    pageNum
  );

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;

  return (
    <PageWrapper>
      <h1 className="page-title">{title}</h1>
      {!data.total_count && createForm && (
        <CreateItem btnTitle={btnTitle}>{createForm}</CreateItem>
      )}
      {data.total_count > 0 ? (
        <>
          <Row xs={1} md={cardsInRow} lg={cardsInRow} className="mb-10">
            <CatalogItems
              data={data}
              queryKey={pageQueryKey}
              imgSrc={imgSrc}
              url={url}
              btnTitle={btnTitle}
            />
          </Row>
          {pageNum && data.per_page && (
            <Row className="flex justify-center">
              <Col>
                <CustomPagination
                  setPageNum={setPageNum}
                  pageNum={pageNum}
                  dataTotal={data.total_count}
                  dataPerPage={data.per_page}
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
