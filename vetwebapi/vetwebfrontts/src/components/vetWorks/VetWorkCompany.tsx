import { Col, Container, Row } from "react-bootstrap";
import { ICompanyCard } from "../../interfaces/CompanyInterfaces";

import { Link } from "react-router-dom";
import { CustomButton } from "../CustomButton";
import { CompanyAddress } from "../companies/address/CompanyAddress";
import { IAnimalInVetwork } from "../../interfaces/VetWorkInterfaces";
import { companyLink } from "../../urls/companyUrls";
import AnimalsInVetWork from "./AnimalsInVetWork";

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
