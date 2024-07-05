import { AppService } from "../../../../app.service";

import { useState } from "react";

import { IDrugReport } from "../../../../interfaces/DrugInterfaces";
import { DrugInReport } from "../../../../components/drugs/drugReports/DrugInReport";
import { DrugReportMenu } from "../../../../components/menu/DrugReportMenu";
import { drugReportHeaders } from "../../../../Constants";
import { ReportPageMain } from "../../../../components/ReportPage/ReportPageMain.tsx";
import { Vet1BPDF } from "../Vet1BPdf/index.tsx";

interface Vet1BProps {
  data: IDrugReport[];
  dateEnd: string;
  setReportActive: CallableFunction;
}


export function Vet1B({
  data,
  dateEnd,
  setReportActive,
}: Vet1BProps) {
  const [pdf, setPdf] = useState(false);

  const reportDate = AppService.convertDateString(dateEnd);
  

  return (
    <>
      {!pdf ? (
        <ReportPageMain 
        reportTitle={`Отчет 1-вет В за ${reportDate.quarter} квартал ${reportDate.year} г.`}
        imgSrc="/drugsBg.jpg"
        menu={
          <DrugReportMenu setPdf={setPdf} setReportActive={setReportActive} />
        }
        reportHeaders={drugReportHeaders}
        reportItems={
          data.map((drug) => <DrugInReport key={drug.id} drug={drug} />)
        }

        />

      ) : (
        <Vet1BPDF
          setPdf={setPdf}
          data={data}
          dateEnd={dateEnd}
        />
      )}
    </>
  );
}
