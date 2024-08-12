import { Container } from "react-bootstrap";

import { IVetWorkSchema } from "../../interfaces/VetWorkInterfaces";

import { ReceiptDrug } from "../../components/drugs/drugMovements/ReceiptDrug";

import { PageDetail } from "../../components/PageDetail";
import { VetWorkCompany } from "./VetWorkCompany";
import { PageTable } from "../../components/PageTable";
import { drugReceiptHeaders } from "../../TableHeaders";

import { VetWorkPageMenu } from "../../components/menu/VetWorkPageMenu";

interface VetWorkDetailProps {
  pageTitle: string;
  imgSrc: string;
  alt?: string;
  data: IVetWorkSchema;
  setAnimals: CallableFunction;
  showAct: CallableFunction;
  showReferral: CallableFunction;
  showAnimalsList: CallableFunction;
  setCompanyId: CallableFunction;
  showReferralAnimalList: CallableFunction;
}

export function VetWorkDetail({ ...props }: VetWorkDetailProps) {
  const disease = props.data.diseases[0].toLowerCase();
  return (
    <>
      <PageDetail
        imgSrc={props.imgSrc}
        alt={props.pageTitle}
        menu={
          <VetWorkPageMenu
            showAct={props.showAct}
            showAnimalsList={props.showAnimalsList}
            showReferral={props.showReferral}
            workType={props.data.work_type}
            disease={disease}
            showReferralAnimalList={props.showReferralAnimalList}
          />
        }
        title={props.pageTitle}
      >
        <>
          <Container className="text-center">
            <p className="text-left text-lg text-indigo-700 font-bold ">Всего голов: {props.data?.animals?.length}</p>
            <h5 className="text-lg underline font-bold mb-3">Предприятия </h5>
            {props.data.companies?.length &&
              props.data.companies.map((company) => (
                <VetWorkCompany
                  key={company.id}
                  company={company}
                  setAnimals={props.setAnimals}
                  setCompanyId={props.setCompanyId}
                  animals={props.data.animals}
                  workType={props.data.work_type.toLowerCase()}
                  disease={disease}
                />
              ))}
          </Container>

          <Container className="text-center">
            <h5 className="text-lg underline font-bold">Биопрепарат </h5>

            <PageTable
              reportHeaders={drugReceiptHeaders}
              reportItems={
                props.data.drug && <ReceiptDrug drug={props.data.drug} />
              }
            />
          </Container>
        </>
      </PageDetail>
    </>
  );
}
