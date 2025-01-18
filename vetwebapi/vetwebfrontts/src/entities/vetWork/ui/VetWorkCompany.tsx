import { Col, Container, Row } from "react-bootstrap";

import { Link, useParams } from "react-router-dom";
import { ButtonCreate, PageDetailContentWrapper } from "shared/index";
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
    <div key={company.id} className="mb-8 border-b-2 border-slate-400">
      <Row className="p-0 title-base underline text-lg">
        <Col sm={8} className="p-0">
          <h5>
            <Link to={companyLink(company.id)}>{company.full_name}</Link>
          </h5>
        </Col>
        <Col>
          <ButtonCreate
            title="Добавить животных"
            onClick={() => addAnimals(company.id.toString())}
          />
        </Col>
        <Col className="flex items-center">
          <DeleteItem
            queryKeyId={id}
            url={vetWorkCompanyDetailUrl(vetWorkId, company.id)}
            queryKey="vetwork"
            alertMessage={`${company.short_name} успешно удалено!`}
            size={25}
          />
        </Col>
      </Row>

      {company.address && <CompanyAddress address={company.address} />}

      <PageDetailContentWrapper title="Животные">
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
      </PageDetailContentWrapper>
    </div>
  );
}
