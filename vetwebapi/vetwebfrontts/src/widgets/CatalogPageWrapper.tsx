import { Col, Row } from "react-bootstrap";
import {
  CustomPagination,
  NoData,
  PageWrapper,
  SectionWrapper,
} from "shared/index";
import { CreateItem } from "features/CreateItem";
import { ICompanies } from "entities/company";
import { IDrugs } from "entities/drug";
import { ICatalogDrugs } from "entities/catalogDrug";
import { IDrugMovements } from "entities/drugMovements";
import { IVetworks } from "entities/vetWork";

interface CatalogPageWrapperProps {
  title: string;
  btnTitle: string;
  data: ICompanies | IDrugs | ICatalogDrugs | IDrugMovements | IVetworks;
  createForm: React.ReactNode | React.ReactElement;
  cardsInRow: number;
  children: React.ReactNode | React.ReactElement;
  pageNum: number;
  setPageNum: CallableFunction;
  filterButtons?: React.ReactNode | React.ReactElement;
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
    filterButtons,
  } = props;

  return (
    <SectionWrapper>
      <h1 className="page-title">{title}</h1>
      <Row className="mb-2">
        <Col md={8}>{filterButtons}</Col>
        <Col>
          <CreateItem btnTitle={btnTitle}>{createForm}</CreateItem>
        </Col>
      </Row>

      {data.total_count > 0 ? (
        <>
          <Row xs={1} sm={2} md={2} lg={2} xl={cardsInRow} className="mb-10">
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
    </SectionWrapper>
  );
}
