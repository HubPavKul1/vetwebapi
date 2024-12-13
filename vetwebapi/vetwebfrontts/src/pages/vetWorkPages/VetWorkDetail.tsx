import { Container } from "react-bootstrap";

import { VetWorkCompany } from "entities/vetWork/ui/VetWorkCompany";

import { convertDateString, diseasesString, PageTable } from "shared/index";
import { drugReceiptHeaders } from "shared/model/tableHeaders";
import { PageDetail } from "widgets/PageDetail";
import { ReceiptDrug } from "entities/drugMovements/ui/ReceiptDrug";
import { VetWorkPageMenu } from "widgets/vetWork";
import { IAnimalInVetwork } from "entities/vetWork";
import { ICompanyCard } from "entities/company";
import { useGetVetWorkData } from "features/vetWork";
import { WORKTYPES } from "shared/constants/vetworkConst";

export function VetWorkDetail() {
  const data = useGetVetWorkData();
  if (!data) return;

  const date = convertDateString(data.vetwork_date);
  const diseases = [...diseasesString(data.diseases)];
  const disease = data.diseases[0].toLowerCase();

  const pageTitle =
    data.work_type === WORKTYPES.vaccination
      ? `Вакцинация: ${data.diseases}`
      : data.work_type === WORKTYPES.treatment
      ? `Обработка против: ${data.diseases}`
      : `Диагностические исследования на: ${diseases}`;
  const fullPageTitle = `${pageTitle} от ${date.shortDate} г. `;

  const imgSrc =
    data.work_type === WORKTYPES.vaccination
      ? "/vetworkBg.jpg"
      : data.work_type === WORKTYPES.treatment
      ? "/treatment.jpg"
      : "/diagnostic.jpg";

  let dosages = 0;
  const animalsDoses =
    data.animals &&
    data.animals.map((animal: IAnimalInVetwork) =>
      animal.dosage ? (dosages += animal.dosage) : (dosages += 0)
    );
  return (
    <>
      <PageDetail
        imgSrc={imgSrc ? imgSrc : ""}
        alt={fullPageTitle ? fullPageTitle : ""}
        menu={<VetWorkPageMenu />}
        title={fullPageTitle ? fullPageTitle : ""}
      >
        <>
          <Container className="text-center">
            <div className="flex text-left text-lg text-indigo-700 font-bold ">
              <span className="mr-5">Всего голов: {data?.animals?.length}</span>
              <span>
                Израсходовано препарата: {dosages.toFixed(3)}{" "}
                {data?.drug?.accounting_unit}
              </span>
            </div>

            <h5 className="page-detail-title">Предприятия </h5>
            {data.companies?.length &&
              data.companies.map((company: ICompanyCard) => (
                <VetWorkCompany
                  key={company.id}
                  company={company}
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
