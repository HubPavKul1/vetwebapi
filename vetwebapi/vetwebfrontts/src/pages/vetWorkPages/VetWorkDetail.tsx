import { Container } from "react-bootstrap";

import { IVetWorkSchema } from "entities/vetWork/model/vetWorkInterfaces";

import { VetWorkCompany } from "entities/vetWork/ui/VetWorkCompany";

import { PageTable } from "shared/index";
import { drugReceiptHeaders } from "shared/model/tableHeaders";
import { PageDetail } from "widgets/PageDetail";
import { ReceiptDrug } from "entities/drugMovements/ui/ReceiptDrug";
import { VetWorkPageMenu } from "widgets/vetWork";

interface VetWorkDetailProps {
  pageTitle: string;
  imgSrc: string;
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
  const {
    pageTitle,
    imgSrc,
    data,
    setAnimals,
    showAct,
    showReferral,
    showAnimalsList,
    showAccountingAct,
    setCompanyId,
    showReferralAnimalList,
    showVetWorkFile,
  } = props;
  const disease = data.diseases[0].toLowerCase();
  let dosages = 0;
  const animalsDoses =
    data.animals &&
    data.animals.map((animal) =>
      animal.dosage ? (dosages += animal.dosage) : (dosages += 0)
    );
  return (
    <>
      <PageDetail
        imgSrc={imgSrc}
        alt={pageTitle}
        menu={
          <VetWorkPageMenu
            showAct={showAct}
            showAnimalsList={showAnimalsList}
            showReferral={showReferral}
            showAccountingAct={showAccountingAct}
            workType={data.work_type}
            disease={disease}
            showReferralAnimalList={showReferralAnimalList}
            showVetWorkFile={showVetWorkFile}
            fileId={data.file_id}
          />
        }
        title={pageTitle}
      >
        <>
          <Container className="text-center">
            <div className="flex text-left text-lg text-indigo-700 font-bold ">
              <span className="mr-5">Всего голов: {data?.animals?.length}</span>
              <span>Израсходовано препарата: {dosages.toFixed(3)} доз</span>
            </div>

            <h5 className="page-detail-title">Предприятия </h5>
            {data.companies?.length &&
              data.companies.map((company) => (
                <VetWorkCompany
                  key={company.id}
                  company={company}
                  setAnimals={setAnimals}
                  setCompanyId={setCompanyId}
                  animals={data.animals}
                  workType={data.work_type.toLowerCase()}
                  disease={disease}
                />
              ))}
          </Container>

          <Container className="text-center">
            <h5 className="page-detail-title">Биопрепарат </h5>

            <PageTable
              tableHeaders={drugReceiptHeaders}
              tableItems={data.drug && <ReceiptDrug drug={data.drug} />}
            />
          </Container>
        </>
      </PageDetail>
    </>
  );
}
