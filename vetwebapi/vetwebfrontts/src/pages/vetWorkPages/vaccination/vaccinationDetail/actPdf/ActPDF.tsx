import { PDF } from "../../../../../components/pdf/PDF";
import { IVaccinationDetail } from "../../../../../interfaces/VetWorkInterfaces";
import { ActPDFHeader } from "./ActPDFHeader";


interface ActPDFProps {
    setPdf: CallableFunction;
    data: IVaccinationDetail;
  }


export function ActPDF({setPdf, data}: ActPDFProps) {
   
    return (

        <PDF setPdf={setPdf} filename="act.pdf">
            <ActPDFHeader data={data}/>
        </PDF>
    )
}