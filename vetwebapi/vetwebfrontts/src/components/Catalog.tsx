import { Row, Col } from "react-bootstrap";

import { CreateItem } from "components/CreateItem";
import { PageWrapper } from "components/PageWrapper";
import NoData from "components/NoData";
import { CustomPagination } from "./CustomPagination";
import { useState } from "react";
import { useGetPageData } from "hooks/useGetPageData";
import { ErrorLoadDataMessage } from "./ErrorLoadDataMessage";
import { Loader } from "./Loader";

interface CatalogProps {
  title: string;
  createForm?: React.ReactElement;
  children?: React.ReactElement | React.ReactNode;
  btnTitle?: string;
  cardsInRow: number;
  dataLength: number
  // url?: string;
  // queryKey?: string;
}

export function Catalog({
  title,
  createForm,
  children,
  btnTitle,
  cardsInRow,
  dataLength
  // url,
  // queryKey,
}: CatalogProps) {
  // const [pageNumber, setPageNumber] = useState(1);

  // if (!queryKey || !url)
  //   return (
  //     <PageWrapper>
  //       <h1 className="page-title">{title}</h1>
  //       <>
  //         <Row xs={1} md={cardsInRow} lg={cardsInRow} className="mb-10">
  //           {children}
  //         </Row>
  //       </>
  //     </PageWrapper>
  //   );
  

  // const { data, isLoading, isError, error } = useGetPageData(
  //   queryKey,
  //   url,
  //   pageNumber
  // );

  // if (isError) return <ErrorLoadDataMessage error={error} />;
  // if (isLoading) return <Loader />;
  // if (!data) return <Loader />;

  return (
    <PageWrapper>
      <h1 className="page-title">{title}</h1>
      {createForm && <CreateItem btnTitle={btnTitle}>{createForm}</CreateItem>}
      {dataLength > 0 ? (
        <>
          <Row xs={1} md={cardsInRow} lg={cardsInRow} className="mb-10">
            {children}
          </Row>
          <Row className="flex justify-center">
            <Col>
              {/* <CustomPagination
                setPageNumber={setPageNumber}
                dataTotal={data.total_count}
                dataPerPage={data.per_page}
              /> */}
            </Col>
          </Row>
        </>
      ) : (
        <NoData title={title} />
      )}
    </PageWrapper>
  );
}
