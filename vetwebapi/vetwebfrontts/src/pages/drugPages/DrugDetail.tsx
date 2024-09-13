import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import { IDrugDetail } from "interfaces/DrugInterfaces";
import { useGetDataById } from "hooks/useGetDataById";
import { ErrorLoadDataMessage } from "components/ErrorLoadDataMessage";
import { Loader } from "shared/ui/Loader";
import {
  drugDetailUrl,
  drugImageUrl,
  drugInstructionUrl,
} from "shared/urls/drugUrls";
import { AppService } from "services/app.service";

interface DrugData {
  data?: IDrugDetail;
  isLoading: boolean;
}

export function DrugDetail() {
  const { id } = useParams();
  const drugId = Number(id);

  const { isLoading, data, isError, error }: DrugData = useGetDataById(
    "drug",
    drugDetailUrl(drugId),
    id
  );

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;

  const diseases =
    data && data.diseases && AppService.diseasesString(data.diseases);

  return (
    <>
      <Container>
        <Row className="p-3 font-bold text-center">
          <Col sm={3} className="">
            <a href={drugImageUrl(drugId)}>
              <img
                className="hover:scale-110 transition-transform duration-500 ease-in-out"
                src={data.image ? drugImageUrl(drugId) : "/drugsCard.jpg"}
                alt={data.name}
              />
            </a>
          </Col>

          <Col>
            <h5 className="text-3xl underline mb-5">{data.name}</h5>
            <p className="text-2xl text-left">
              Производитель: {data.drug_manufacturer}
            </p>
            <p className="text-2xl text-left">Заболевания: {diseases}</p>
          </Col>
        </Row>

        <Row className="min-h-screen">
          {data.instruction && (
            <object
              type="application/pdf"
              data={drugInstructionUrl(drugId)}
              width="100%"
            ></object>
          )}
        </Row>
      </Container>
    </>
  );
}
