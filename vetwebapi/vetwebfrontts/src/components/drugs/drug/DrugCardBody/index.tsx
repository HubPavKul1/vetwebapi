import { Container } from "react-bootstrap";


import styles from "./DrugCardBody.module.scss"

interface DrugCardBodyProps{
    drugManufacturer: string;
    
}

export function DrugCardBody({drugManufacturer}: DrugCardBodyProps) {
    return (
        <>
            <Container className={styles.drugManufacturer}>
                <h6>{drugManufacturer}</h6>
            </Container>
            
        </>
        
    )
}