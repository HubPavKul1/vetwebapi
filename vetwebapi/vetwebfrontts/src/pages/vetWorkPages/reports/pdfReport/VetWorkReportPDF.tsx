import { PDF } from "../../../../components/PDF";
import { IVetWorkReport } from "../../../../interfaces/VetWorkInterfaces";
import { VetWorkReportPDFHeader } from "./VetWorkReportPDFHeader";




interface VetWorkReportPDFProps {
  setPdf: CallableFunction;
  data: IVetWorkReport[];
  dateEnd: string;
  isDiagnostic: boolean;
  fileName: string
}

export function VetWorkReportPDF({ setPdf, data, dateEnd, isDiagnostic, fileName }: VetWorkReportPDFProps) {

  return (
    <PDF setPdf={setPdf} filename={`${fileName}.pdf`}>
        <VetWorkReportPDFHeader isDiagnostic={isDiagnostic} dateEnd={dateEnd} data={data}/>

    </PDF>
  );
}
