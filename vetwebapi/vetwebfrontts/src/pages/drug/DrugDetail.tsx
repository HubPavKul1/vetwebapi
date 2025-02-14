import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import { useGetDataById } from "shared/hooks/useGetDataById";

import { Loader } from "shared/ui/Loader";
import {
  drugDetailUrl,
  drugImageUrl,
  drugInstructionUrl,
} from "shared/urls/drugUrls";
import { ErrorLoadDataMessage, SectionWrapper } from "shared/index";
import { IDrugDetail } from "entities/drug/model/drugInterfaces";
import { diseasesString } from "shared/helpers";

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

  const diseases = data && data.diseases && diseasesString(data.diseases);

  return (
    <SectionWrapper>
      <Row className="p-3 font-bold text-left text-indigo-900">
        <Col sm={3} className="">
          <a href={data.image ? drugImageUrl(drugId) : "#"}>
            <img
              className="hover:scale-110 transition-transform duration-500 ease-in-out"
              src={data.image ? drugImageUrl(drugId) : "/vaccinesBg.png"}
              alt={data.name}
            />
          </a>
        </Col>

        <Col>
          <h5 className="text-3xl mb-5 uppercase">{data.name}</h5>
          <p className="text-2xl">Производитель: {data.drug_manufacturer}</p>
          <p className="text-2xl">Заболевания: {diseases}</p>
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
    </SectionWrapper>
  );
}
