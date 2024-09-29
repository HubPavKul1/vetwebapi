import { useState } from "react";
import { ReportMenu } from "widgets/ReportMenu.tsx";
import { DrugReportPDF } from "./DrugReportPDF.tsx";
import { convertDateString } from "shared/helpers.ts";
import { ReportPage } from "widgets/ReportPage.tsx";
import { DrugInReport } from "widgets/drugReport/index.ts";
import { drugReportHeaders } from "shared/model/tableHeaders.ts";
import { IDrugReport } from "entities/drugReport/index.ts";

interface DrugReportProps {
  data: IDrugReport[];
  dateEnd: string;
  dateStart: string;
  setReportActive: CallableFunction;
}

export function DrugReport({
  data,
  dateEnd,
  dateStart,
  setReportActive,
}: DrugReportProps) {
  const [pdf, setPdf] = useState(false);

  const date1 = convertDateString(dateStart);
  const date2 = convertDateString(dateEnd);

  return (
    <>
      {!pdf ? (
        <ReportPage
          reportTitle={`Движение биопрепаратов за период с ${date1.shortDate} по ${date2.shortDate}`}
          imgSrc="/drugsBg.jpg"
          menu={
            <ReportMenu setPdf={setPdf} setReportActive={setReportActive} />
          }
          tableHeaders={drugReportHeaders}
          tableItems={data.map((drug) => (
            <DrugInReport key={drug.id} drug={drug} />
          ))}
        />
      ) : (
        <DrugReportPDF setPdf={setPdf} data={data} dateEnd={dateEnd} />
      )}
    </>
  );
}
