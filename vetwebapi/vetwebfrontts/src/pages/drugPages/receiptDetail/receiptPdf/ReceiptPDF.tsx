import { Col, Container, Row } from "react-bootstrap";
import { IDrugMovementDetail } from "../../../../interfaces/DrugInterfaces";
import { usePDF } from "react-to-pdf";

import styles from "./ReceiptPDF.module.scss";
import { CustomButton } from "../../../../components/button/CustomButton";
import { ReceiptPDFHeader } from "./ReceiptPDFHeader";
import { ReceiptPDFBody } from "./ReceiptPDFBody";
import { ReceiptPDFTable } from "./ReceiptPDFTable";
import { ReceiptPDFFooter } from "./ReceiptPDFFooter";


interface ReceiptPDFProps {
    setPdf: CallableFunction;
    data: IDrugMovementDetail;
  }


export function ReceiptPDF({setPdf, data}: ReceiptPDFProps) {
   
    const { toPDF, targetRef } = usePDF({filename: "receipt.pdf"});

    return (
        <Container>
            <div className={styles.btnWrap}>
                <CustomButton className="btn-upload" title="Загрузить PDF" onClick={() => toPDF()} />
                <CustomButton className="btn-upload" title= "Назад" onClick={() => setPdf(false)} />
            </div>
           
            <div className={styles.pdfWrap} ref={targetRef}>
                <ReceiptPDFHeader operationDate={data.operation_date}/>
                <ReceiptPDFBody data={data} />
                <ReceiptPDFTable data={data}/>
                <ReceiptPDFFooter/> 
            </div>
        </Container>
    )
}