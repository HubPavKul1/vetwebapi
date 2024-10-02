import { IDrugCatalogCard } from "entities/catalogDrug";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  catalogDrugDetailUrl,
  Loader,
  PageDetailBody,
  PageDetailTitle,
  PageWrapper,
  useGetDataById,
} from "shared/index";
import { CatalogDrugReceipts, CatalogDrugSpent } from "widgets/catalogDrug";

interface DrugCatalogData {
  data: IDrugCatalogCard;
}

export function DrugCatalogDetail() {
  const { id } = useParams();
  const catalogDrugId = Number(id);
  const { data, isLoading }: DrugCatalogData = useGetDataById(
    "catalogDrug",
    catalogDrugDetailUrl(catalogDrugId),
    id
  );
  if (isLoading || !data) return <Loader />;
  return (
    <PageWrapper>
      <PageDetailTitle title={`${data.name} (серия ${data.batch})`} />
      <PageDetailBody>
        <Row s={1} md={2}>
          <Col>
            <CatalogDrugReceipts />
          </Col>
          <Col>
            <CatalogDrugSpent />
          </Col>
        </Row>
      </PageDetailBody>
    </PageWrapper>
  );
}
