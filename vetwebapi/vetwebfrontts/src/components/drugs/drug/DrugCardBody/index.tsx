import { Container } from "react-bootstrap";


import styles from "./DrugCardBody.module.scss"

interface DrugCardBodyProps{
    drugManufacturer: string;
    drugInstr?: string;
    
}

export function DrugCardBody({drugManufacturer, drugInstr}: DrugCardBodyProps) {
    return (
        <>
            <Container className={styles.drugManufacturer}>
                <h6>{drugManufacturer}</h6>
            </Container>
            
        </>
        
    )
}