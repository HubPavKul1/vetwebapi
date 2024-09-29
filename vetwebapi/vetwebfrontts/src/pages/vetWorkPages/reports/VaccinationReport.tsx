import { useState } from "react";
import { VetWorkReportProps } from "entities/vetWorkReport/model/reportInterfaces.ts";
import { VetWorkReportPDF } from "./VetWorkReportPDF.tsx";
import { convertDateString } from "shared/helpers.ts";
import { vaccinationHeaders } from "shared/model/tableHeaders.ts";
import { ReportPage } from "widgets/ReportPage.tsx";
import { ReportMenu } from "widgets/ReportMenu.tsx";
import { VetWorkReportItem } from "entities/vetWorkReport/index.ts";

export function VaccinationReport({
  data,
  dateEnd,
  setReportActive,
}: VetWorkReportProps) {
  const [pdf, setPdf] = useState(false);

  const date2 = convertDateString(dateEnd);

  return (
    <>
      {!pdf ? (
        <ReportPage
          reportTitle={`Отчет по ветеринарно-профилактическим обработкам за ${date2.month} ${date2.year}`}
          imgSrc="/vetworkBg.jpg"
          menu={
            <ReportMenu setPdf={setPdf} setReportActive={setReportActive} />
          }
          tableHeaders={vaccinationHeaders}
          tableItems={data.map((item, index) => (
            <VetWorkReportItem
              key={index}
              data={item}
              isDiagnostic={false}
              rowNum={index + 1}
            />
          ))}
        />
      ) : (
        <VetWorkReportPDF
          setPdf={setPdf}
          data={data}
          isDiagnostic={false}
          dateEnd={dateEnd}
          fileName="vaccination"
        />
      )}
    </>
  );
}
