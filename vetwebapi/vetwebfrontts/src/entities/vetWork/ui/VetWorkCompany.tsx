import { Col, Container, Row } from "react-bootstrap";

import { Link, useParams } from "react-router-dom";
import { CustomButton } from "shared/index";
import { IAnimalInVetwork } from "entities/vetWork/model/vetWorkInterfaces";
import { companyLink } from "shared/urls/companyUrls";
import { DeleteItem } from "shared/ui/DeleteItem";
import { vetWorkCompanyDetailUrl } from "shared/urls/vetWorkUrls";
import { ICompanyCard } from "entities/company/model/companyInterfaces";
import { CompanyAddress } from "entities/address/ui/CompanyAddress";
import { AnimalsInVetWork } from "./AnimalsInVetWork";
import useVetWorkAnimalsStore from "features/vetWork/stores/useVetWorkAnimalsStore";
import useVetWorkCompanyStore from "features/vetWork/stores/useVetWorkCompanyStore";

interface VetWorkCompanyProps {
  company: ICompanyCard;
  animals?: IAnimalInVetwork[];
  workType: string;
  disease: string;
}

export function VetWorkCompany({
  company,
  animals,
  workType,
  disease,
}: VetWorkCompanyProps) {
  const { id } = useParams();
  const vetWorkId = Number(id);
  const setAnimals = useVetWorkAnimalsStore((state) => state.setAnimals);
  const setCompanyId = useVetWorkCompanyStore((state) => state.setCompanyId);
  const addAnimals = (company_id: string) => {
    setAnimals();
    setCompanyId(company_id);
  };

  return (
    <Container key={company.id} className="mb-8 border-b-2 border-b-black ">
      <div>
        <Row className="title-base underline text-lg">
          <Col sm={8}>
            <h5>
              <Link to={companyLink(company.id)}>{company.full_name}</Link>
            </h5>
          </Col>
          <Col>
            <CustomButton
              className="btn-nav text-sm"
              title="Добавить животных"
              onClick={() => addAnimals(company.id.toString())}
            />
          </Col>
          <Col className=" flex items-center">
            <DeleteItem
              queryKeyId={id}
              url={vetWorkCompanyDetailUrl(vetWorkId, company.id)}
              queryKey="vetwork"
              alertMessage={`${company.short_name} успешно удалено!`}
              size={30}
            />
          </Col>
        </Row>

        {company.address && <CompanyAddress address={company.address} />}
      </div>

      <Container className="text-center">
        <h5 className="text-lg underline font-bold">Животные </h5>
        <p className="text-indigo-700 text-left">
          Всего голов хозяйства :{" "}
          {animals?.filter((animal) => animal.company_id === company.id).length}
        </p>
        <AnimalsInVetWork
          workType={workType}
          disease={disease}
          animals={animals}
          companyId={company.id}
        />
      </Container>
    </Container>
  );
}
