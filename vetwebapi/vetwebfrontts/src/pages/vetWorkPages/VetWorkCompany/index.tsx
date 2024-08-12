import { Col, Container, Row } from "react-bootstrap";
import { ICompanyCard } from "../../../interfaces/CompanyInterfaces";

import styles from "./VetWorkCompany.module.scss";
import { Link } from "react-router-dom";
import { CustomButton } from "../../../components/CustomButton";
import { CompanyAddress } from "../../../components/companies/address/CompanyAddress";
import { IAnimalInVetwork } from "../../../interfaces/VetWorkInterfaces";
import { AnimalInVetwork } from "../../../components/vetWorks/AnimalInVetwork";
import { PageTable } from "../../../components/PageTable";
import { animalInVetWorkHeaders } from "../../../TableHeaders";
import { companyLink } from "../../../Urls";

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
  const addAnimals = (company_id: string) => {
    setAnimals(true);
    setCompanyId(company_id);
  };

  return (
    <Container key={company.id} className="mb-8 border-b-2 border-b-black ">
      <div>
        <Row className="text-center text-lg font-bold underline">
          <Col sm={6}>
            <h5>
              <Link to={companyLink(company.id)}>{company.full_name}</Link>
            </h5>
          </Col>
          <Col>
            <CustomButton
              className="btn-nav"
              title="Добавить животных"
              onClick={() => addAnimals(company.id.toString())}
            />
          </Col>
          <Col></Col>
        </Row>

        {company.address && <CompanyAddress address={company.address} />}
      </div>

      <Container className="text-center">
        <h5 className="text-lg underline font-bold">Животные </h5>
        <p className="text-indigo-700 text-left">
          Всего голов хозяйства :{" "}
          {animals?.filter((animal) => animal.company_id === company.id).length}
        </p>
        <PageTable
          reportHeaders={animalInVetWorkHeaders(workType, disease)}
          reportItems={
            animals?.length &&
            animals
              .filter((animal) => animal.company_id === company.id)
              .map((animal) => (
                <AnimalInVetwork
                  key={animal.animal_id}
                  animal={animal}
                  workType={workType}
                  disease={disease}
                />
              ))
          }
        />
      </Container>
    </Container>
  );
}
