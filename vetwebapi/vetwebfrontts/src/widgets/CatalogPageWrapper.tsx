import { CreateItem } from "components/CreateItem";
import { ICompanies } from "entities/company/model/companyInterfaces";
import { IDrugs } from "entities/drug/model/drugInterfaces";
import { ICatalogDrugs } from "entities/drugCatalog/model/drugCatalogInterfaces";
import { IDrugMovements } from "entities/drugMovements/model/drugMovementInterfaces";
import { IVetworks } from "entities/vetWork/model/vetWorkInterfaces";
import { Col, Row } from "react-bootstrap";
import { CustomPagination, NoData, PageWrapper } from "shared/index";

interface CatalogPageWrapperProps {
  title: string;
  btnTitle: string;
  data: ICompanies | IDrugs | ICatalogDrugs | IDrugMovements | IVetworks;
  createForm: React.ReactNode | React.ReactElement;
  cardsInRow: number;
  children: React.ReactNode | React.ReactElement;
  pageNum: number;
  setPageNum: CallableFunction;
}

export function CatalogPageWrapper({ ...props }: CatalogPageWrapperProps) {
  const {
    title,
    btnTitle,
    data,
    createForm,
    cardsInRow,
    children,
    pageNum,
    setPageNum,
  } = props;
  return (
    <PageWrapper>
      <h1 className="page-title">{title}</h1>

      <CreateItem btnTitle={btnTitle}>{createForm}</CreateItem>

      {data.total_count > 0 ? (
        <>
          <Row xs={1} md={cardsInRow} lg={cardsInRow} className="mb-10">
            {children}
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