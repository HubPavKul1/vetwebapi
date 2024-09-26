import { useState } from "react";

import { DrugInReport } from "widgets/drugReport/ui/DrugInReport";
import { ReportMenu } from "widgets/ReportMenu";

import { IDrugReport } from "entities/drugReport/model/drugReportInterfaces.ts";
import { convertDateString } from "shared/helpers.ts";
import { drugReportHeaders } from "shared/model/tableHeaders.ts";
import { Vet1BPDF } from "./Vet1BPDF";
import { ReportPage } from "widgets/ReportPage";

interface Vet1BProps {
  data: IDrugReport[];
  dateEnd: string;
  setReportActive: CallableFunction;
}

export function Vet1B({ data, dateEnd, setReportActive }: Vet1BProps) {
  const [pdf, setPdf] = useState(false);

  const reportDate = convertDateString(dateEnd);

  return (
    <>
      {!pdf ? (
        <ReportPage
          reportTitle={`Отчет 1-вет В за ${reportDate.quarter} квартал ${reportDate.year} г.`}
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
        <Vet1BPDF setPdf={setPdf} data={data} dateEnd={dateEnd} />
      )}
    </>
  );
}
