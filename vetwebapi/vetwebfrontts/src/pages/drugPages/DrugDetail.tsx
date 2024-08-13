import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import { IDrugDetail } from "../../interfaces/DrugInterfaces";
import { useGetDataById } from "../../hooks/useGetDataById";
import { ErrorLoadDataMessage } from "../../components/ErrorLoadDataMessage";
import { Loader } from "../../components/Loader";
import { drugDetailUrl, drugImageUrl, drugInstructionUrl } from "../../Urls";

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

  return (
    <>
      <Container>
        <Row className="p-3 font-bold text-center items-center">
          <Col sm={3} className="">
            <img src={drugImageUrl(drugId)} alt={data.name} />
          </Col>

          <Col>
            <h5 className="text-3xl underline mb-5">{data.name}</h5>
            <p className="text-2xl">Производитель: {data.drug_manufacturer}</p>
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
