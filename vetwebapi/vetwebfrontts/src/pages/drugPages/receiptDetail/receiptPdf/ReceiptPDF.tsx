import { IDrugMovementDetail } from "../../../../interfaces/DrugInterfaces";
import { ReceiptPDFHeader } from "./ReceiptPDFHeader";
import { ReceiptPDFBody } from "./ReceiptPDFBody";
import { ReceiptPDFTable } from "./ReceiptPDFTable";
import { ReceiptPDFFooter } from "./ReceiptPDFFooter";
import { PDF } from "../../../../components/pdf/PDF";


interface ReceiptPDFProps {
    setPdf: CallableFunction;
    data: IDrugMovementDetail;
  }


export function ReceiptPDF({setPdf, data}: ReceiptPDFProps) {
   
    return (

        <PDF setPdf={setPdf} filename="receipt.pdf">
            <ReceiptPDFHeader operationDate={data.operation_date}/>
            <ReceiptPDFBody data={data} />
            <ReceiptPDFTable data={data}/>
            <ReceiptPDFFooter/> 
        </PDF>
    )
}