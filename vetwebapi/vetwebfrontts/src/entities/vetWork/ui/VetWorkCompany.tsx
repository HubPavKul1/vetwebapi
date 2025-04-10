import { Col, Row } from "react-bootstrap";

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
import { AnimalGroups } from "shared/constants/companyConst";

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
  const companyAnimals = animals?.filter(
    (animal) => animal.company_id === company.id
  );
  const totalCompanyAnimals = companyAnimals?.length;

  const dogsCount = companyAnimals?.filter(
    (animal) => animal.animal_group === AnimalGroups.dogs
  ).length;

  const catsCount = companyAnimals?.filter(
    (animal) => animal.animal_group === AnimalGroups.cats
  ).length;

  return (
    <div key={company.id} className="mb-8 border-b-2 border-slate-400">
      <Row className="p-0">
        <Col sm={9}>
          <h5 className=" text-indigo-900 uppercase underline text-lg font-bold hover:text-indigo-700 ">
            <Link to={companyLink(company.id)}>{company.full_name}</Link>
          </h5>
        </Col>
        <Col sm={2} className="flex justify-end">
          <ButtonCreate
            title="Добавить животных"
            onClick={() => addAnimals(company.id.toString())}
          />
        </Col>
        <Col className="flex items-center justify-end">
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
          Всего голов хозяйства : {totalCompanyAnimals}{" "}
          {dogsCount != undefined &&
            dogsCount > 0 &&
            ` из них собак: ${dogsCount}`}{" "}
          {catsCount != undefined && catsCount > 0 && `; кошек: ${catsCount}`}{" "}
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
