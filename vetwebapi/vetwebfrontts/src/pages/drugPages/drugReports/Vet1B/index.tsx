import { Container, Table } from "react-bootstrap";

import { AppService } from "../../../../app.service";

import { useState } from "react";

import { PageDetail } from "../../../../components/PageDetail";
import { IDrugReport } from "../../../../interfaces/DrugInterfaces";
import { DrugInReport } from "../../../../components/drugs/drugReports/DrugInReport";
import { DrugReportMenu } from "../../../../components/menu/DrugReportMenu";
import { drugReportHeaders } from "../../../../Constants";
import { VetB1PDF } from "../Vet1BPdf/Vet1BPdf";

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
  const reportHeaders = drugReportHeaders;
  
  

  return (
    <>
      {!pdf ? (
        <PageDetail
          title={`Отчет 1-вет В за ${reportDate.quarter} квартал ${reportDate.year} г.`}
          imgSrc="/drugsBg.jpg"
          alt="Отчет 1-вет В"
          menu={
            <DrugReportMenu setPdf={setPdf} setReportActive={setReportActive} />
          }
        >
          <Container>
            <Container>
              <Table className="text-sm text-center">
                <thead>
                  <tr className="border-bottom border-top border-black">
                    {reportHeaders.map(item => <th key={item.id}>{item.title}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {data.length &&
                  data.map((drug) => <DrugInReport key={drug.id} drug={drug} />)}
                </tbody>
              </Table>
            </Container>
          </Container>
        </PageDetail>
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
