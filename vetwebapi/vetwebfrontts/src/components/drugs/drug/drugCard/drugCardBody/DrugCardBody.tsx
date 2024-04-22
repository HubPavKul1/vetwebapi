import { Container } from "react-bootstrap";


import styles from "./DrugCardBody.module.scss"
import { FileUpload } from "../../../../fileUpload/FileUpload";


interface DrugCardBodyProps{
    drugManufacturer: string;
    fileUploadUrl: string;
    drugInstr?: string;
    
}

export function DrugCardBody({drugManufacturer, fileUploadUrl, drugInstr}: DrugCardBodyProps) {
    return (
        <>
            <Container className={styles.drugManufacturer}>
                <h6>{drugManufacturer}</h6>
            </Container>
            {!drugInstr && 
                   
                <Container className={styles.fileUploadWrap}>
                    <FileUpload
                        uploadUrl={fileUploadUrl}
                        accept=".pdf"
                        mutationName="drugInstr upload"
                        invQueryName="drugs"
                        imgSrc="/pdf.jpg"
                    />
                </Container>

            }
            
            
        </>
        
    )
}