import { AppService } from "services/app.service.ts";

import { useState } from "react";

import { IDrugReport } from "interfaces/DrugInterfaces.tsx";
import { DrugInReport } from "components/drugs/drugReports/DrugInReport.tsx";
import { ReportMenu } from "components/menu/ReportMenu.tsx";

import { ReportPage } from "components/ReportPage.tsx";
import { Vet1BPDF } from "./Vet1BPdf/index.tsx";
import { drugReportHeaders } from "data/TableHeaders.ts";

interface Vet1BProps {
  data: IDrugReport[];
  dateEnd: string;
  setReportActive: CallableFunction;
}

export function Vet1B({ data, dateEnd, setReportActive }: Vet1BProps) {
  const [pdf, setPdf] = useState(false);

  const reportDate = AppService.convertDateString(dateEnd);

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
