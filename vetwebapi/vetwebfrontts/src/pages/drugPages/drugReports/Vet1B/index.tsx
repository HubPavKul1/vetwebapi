import { AppService } from "../../../../app.service";

import { useState } from "react";

import { IDrugReport } from "../../../../interfaces/DrugInterfaces";
import { DrugInReport } from "../../../../components/drugs/drugReports/DrugInReport";
import { DrugReportMenu } from "../../../../components/menu/DrugReportMenu";
import { drugReportHeaders } from "../../../../Constants";
import { VetB1PDF } from "../Vet1BPdf/Vet1BPdf";
import { ReportPageMain } from "../../../../components/ReportPage/ReportPageMain.tsx";

interface Vet1BProps {
  data: IDrugReport[];
  dateStart: string;
  dateEnd: string;
  setReportActive: CallableFunction;
}


export function Vet1B({
  data,
  dateStart,
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
        <VetB1PDF
          setPdf={setPdf}
          data={data}
          dateStart={dateStart}
          dateEnd={dateEnd}
        />
      )}
    </>
  );
}
