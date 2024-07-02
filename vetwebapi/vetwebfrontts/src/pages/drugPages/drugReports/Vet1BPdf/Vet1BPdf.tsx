import { PDF } from "../../../../components/PDF";
import { IDrugReport } from "../../../../interfaces/DrugInterfaces";



interface Vet1BReportPDFProps {
  setPdf: CallableFunction;
  data: IDrugReport[];
  dateStart: string;
  dateEnd: string;
}

export function VetB1ReportPDF({ setPdf, data, dateEnd, dateStart }: Vet1BReportPDFProps) {
  return (
    <PDF setPdf={setPdf} filename="vet1BReport.pdf" orientation="l">

        
    </PDF>
  );
}
