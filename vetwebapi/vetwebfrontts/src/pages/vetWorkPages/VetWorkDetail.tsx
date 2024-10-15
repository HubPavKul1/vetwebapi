import { Container } from "react-bootstrap";

import { VetWorkCompany } from "entities/vetWork/ui/VetWorkCompany";

import { convertDateString, diseasesString, PageTable } from "shared/index";
import { drugReceiptHeaders } from "shared/model/tableHeaders";
import { PageDetail } from "widgets/PageDetail";
import { ReceiptDrug } from "entities/drugMovements/ui/ReceiptDrug";
import { VetWorkPageMenu } from "widgets/vetWork";
import { useVetWorkPageContext } from "features/vetWork/useVetWorkPageContext";
import { IAnimalInVetwork, IVetWorkSchema } from "entities/vetWork";
import { ICompany, ICompanyInVetWorkIn } from "entities/company";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { useAppSelector } from "app/hooks/redux";

export function VetWorkDetail() {
  const data = useAppSelector((state) => state.vetWork.vetWork);
  console.log("VETWORK>>>>>", data);
  if (!data) return;

  const date = convertDateString(data.vetwork_date);
  const diseases = [...diseasesString(data.diseases)];
  const disease = data.diseases[0].toLowerCase();

  const pageTitle =
    data.work_type === "вакцинация"
      ? `Вакцинация: ${data.diseases}`
      : `Диагностические исследования на: ${diseases}`;
  const fullPageTitle = `${pageTitle} от ${date.shortDate} г. `;

  const imgSrc =
    data.work_type === "вакцинация" ? "/vetworkBg.jpg" : "/diagnostic.jpg";

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
        menu={<VetWorkPageMenu data />}
        title={fullPageTitle ? fullPageTitle : ""}
      >
        <>
          <Container className="text-center">
            <div className="flex text-left text-lg text-indigo-700 font-bold ">
              <span className="mr-5">Всего голов: {data?.animals?.length}</span>
              <span>Израсходовано препарата: {dosages.toFixed(3)} доз</span>
            </div>

            <h5 className="page-detail-title">Предприятия </h5>
            {data.companies?.length &&
              data.companies.map((company: ICompany) => (
                <VetWorkCompany
                  key={company.id}
                  company={company}
                  // setAnimals={setAnimals}
                  // setCompanyId={setCompanyId}
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
