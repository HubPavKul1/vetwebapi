import { PDF } from "../../../../components/PDF";
import { IDrugReport } from "../../../../interfaces/DrugInterfaces";
import { DrugReportPDFBody } from "./DrugReportPDFBody";
import { DrugReportPDFFooter } from "./DrugReportPDFFooter";
import { DrugReportPDFHeader } from "./drugReportPDFHeader";


interface DrugReportPDFProps {
  setPdf: CallableFunction;
  data: IDrugReport[];
  dateStart: string;
  dateEnd: string;
}

export function DrugReportPDF({ setPdf, data, dateEnd, dateStart }: DrugReportPDFProps) {
  return (
    <PDF setPdf={setPdf} filename="drugReport.pdf" orientation="l">
        <DrugReportPDFHeader dateStart={dateStart} dateEnd={dateEnd}/>
        <DrugReportPDFBody data={data}/>
        <DrugReportPDFFooter />
    </PDF>
  );
}
