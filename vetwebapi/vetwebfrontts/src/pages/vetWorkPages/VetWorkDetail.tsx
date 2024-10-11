import { Container } from "react-bootstrap";

import { VetWorkCompany } from "entities/vetWork/ui/VetWorkCompany";

import { PageTable } from "shared/index";
import { drugReceiptHeaders } from "shared/model/tableHeaders";
import { PageDetail } from "widgets/PageDetail";
import { ReceiptDrug } from "entities/drugMovements/ui/ReceiptDrug";
import { VetWorkPageMenu } from "widgets/vetWork";
import { useContext } from "react";
import { VetWorkPageContext } from "features/vetWork";
import { IVetWorkPageContext } from "features/vetWork/models/interfaces";

export function VetWorkDetail() {
  const context: IVetWorkPageContext = useContext(VetWorkPageContext);
  if (!context.data) return;
  const data = context.data;

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
        imgSrc={context.imgSrc ? context.imgSrc: ""}
        alt={context.pageTitle ? context.pageTitle: ""}
        menu={
          <VetWorkPageMenu/>
        }
        title={context.pageTitle ? context.pageTitle: ""}
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
                  setAnimals={context.setAnimals}
                  setCompanyId={context.setCompanyId}
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
