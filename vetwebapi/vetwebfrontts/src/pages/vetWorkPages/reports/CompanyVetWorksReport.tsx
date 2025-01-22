import { companyVetWorksReportHeaders } from "shared/model/tableHeaders.ts";
import { ReportPage } from "widgets/ReportPage.tsx";

import useCompanyVetWorksDataStore from "features/vetWork/stores/useCompanyVetWorksDataStore.ts";
import { CompanyVetWorkReportItem } from "entities/vetWorkReport/ui/CompanyVetWorkReportItem.tsx";
import { CompanyVetWorksMenu } from "widgets/CompanyVetWorksMenu";
import { CompanyVetWorksPDF } from "./CompanyVetWorksPDF";

export function CompanyVetWorksReport() {
  const isReportPDf = useCompanyVetWorksDataStore((state) => state.isReportPDF);
  const vetWorksData = useCompanyVetWorksDataStore(
    (state) => state.vetWorksData
  );

  if (!vetWorksData) return;

  const company = vetWorksData[0].company;

  return (
    <>
      {!isReportPDf ? (
        <ReportPage
          reportTitle={`Журнал ПЭМ для ${company}`}
          imgSrc="/vaccination.png"
          menu={<CompanyVetWorksMenu />}
          tableHeaders={companyVetWorksReportHeaders}
          tableItems={vetWorksData.map((item, index) => (
            <CompanyVetWorkReportItem
              key={index}
              data={item}
              rowNum={index + 1}
            />
          ))}
        />
      ) : (
        <CompanyVetWorksPDF
          data={vetWorksData}
          fileName={`report_ pem_${company}`}
        />
      )}
    </>
  );
}
