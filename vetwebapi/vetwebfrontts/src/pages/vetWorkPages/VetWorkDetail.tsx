import { Container } from "react-bootstrap";

import { IVetWorkSchema } from "interfaces/VetWorkInterfaces";

import { ReceiptDrug } from "components/drugs/drugMovements/ReceiptDrug";

import { PageDetail } from "components/PageDetail";
import { VetWorkCompany } from "components/vetWorks/VetWorkCompany";
import { PageTable } from "components/PageTable";
import { drugReceiptHeaders } from "data/TableHeaders";

import { VetWorkPageMenu } from "components/menu/VetWorkPageMenu";

interface VetWorkDetailProps {
  pageTitle: string;
  imgSrc: string;
  alt?: string;
  data: IVetWorkSchema;
  setAnimals: CallableFunction;
  showAct: CallableFunction;
  showReferral: CallableFunction;
  showAnimalsList: CallableFunction;
  showAccountingAct: CallableFunction;
  setCompanyId: CallableFunction;
  showReferralAnimalList: CallableFunction;
  showVetWorkFile: CallableFunction;
}

export function VetWorkDetail({ ...props }: VetWorkDetailProps) {
  const disease = props.data.diseases[0].toLowerCase();
  let dosages = 0;
  const animalsDoses =
    props.data.animals &&
    props.data.animals.map((animal) =>
      animal.dosage ? (dosages += animal.dosage) : (dosages += 0)
    );
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
            showAccountingAct={props.showAccountingAct}
            workType={props.data.work_type}
            disease={disease}
            showReferralAnimalList={props.showReferralAnimalList}
            showVetWorkFile={props.showVetWorkFile}
          />
        }
        title={props.pageTitle}
      >
        <>
          <Container className="text-center">
            <div className="flex text-left text-lg text-indigo-700 font-bold ">
              <span className="mr-5">
                Всего голов: {props.data?.animals?.length}
              </span>
              <span>Израсходовано препарата: {dosages.toFixed(3)} доз</span>
            </div>

            <h5 className="page-detail-title">Предприятия </h5>
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
            <h5 className="page-detail-title">Биопрепарат </h5>

            <PageTable
              tableHeaders={drugReceiptHeaders}
              tableItems={
                props.data.drug && <ReceiptDrug drug={props.data.drug} />
              }
            />
          </Container>
        </>
      </PageDetail>
    </>
  );
}
