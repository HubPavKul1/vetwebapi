import { Col, Container, Row } from "react-bootstrap";
import { ICompanyCard } from "interfaces/CompanyInterfaces";

import { Link, useParams } from "react-router-dom";
import { CustomButton } from "shared/index";
import { CompanyAddress } from "components/companies/address/CompanyAddress";
import { IAnimalInVetwork } from "entities/vetWork/model/vetWorkInterfaces";
import { companyLink } from "shared/urls/companyUrls";
import AnimalsInVetWork from "./AnimalsInVetWork";
import { DeleteItem } from "shared/ui/DeleteItem";
import { vetWorkCompanyDetailUrl } from "shared/urls/vetWorkUrls";

interface VetWorkCompanyProps {
  company: ICompanyCard;
  setAnimals: CallableFunction;
  setCompanyId: CallableFunction;
  animals?: IAnimalInVetwork[];
  workType: string;
  disease: string;
}

export function VetWorkCompany({
  company,
  setAnimals,
  setCompanyId,
  animals,
  workType,
  disease,
}: VetWorkCompanyProps) {
  const { id } = useParams();
  const vetWorkId = Number(id);
  const addAnimals = (company_id: string) => {
    setAnimals(true);
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
              mutationKey="deleteVetworkCompany"
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
