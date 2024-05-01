import { Container } from "react-bootstrap";
import { usePDF } from "react-to-pdf";

import styles from "./PDF.module.scss";
import { CustomButton } from "../button/CustomButton";



interface PDFProps {
    setPdf: CallableFunction;
    children?: React.ReactElement | React.ReactNode;
    filename: string;
  }


export function PDF({setPdf, filename, children}: PDFProps) {
   
    const { toPDF, targetRef } = usePDF({filename: `${filename}`});

    const onClick = () => {
        setPdf(false);
    }

    return (
        <Container>
            <div className={styles.btnWrap}>
                <CustomButton className="btn-upload" title="Загрузить PDF" onClick={() => toPDF()} />
                <CustomButton className="btn-upload" title= "Назад" onClick={onClick} />
            </div>
           
            <div className={styles.pdfWrap} ref={targetRef}>
                {children}
            </div>
        </Container>
    )
}