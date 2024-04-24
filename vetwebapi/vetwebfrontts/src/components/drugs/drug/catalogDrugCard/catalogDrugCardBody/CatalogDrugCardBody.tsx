import { Container } from "react-bootstrap";


import styles from "./CatalogDrugCardBody.module.scss"


interface CatalogDrugCardBodyProps{
    batch: string;
    control: string;
    production_date: string;
    expiration_date: string;
    
}

export function CatalogDrugCardBody({batch, control, production_date, expiration_date}: CatalogDrugCardBodyProps) {
    return (
        <>
            <Container className={styles.batch}>
                <span>Серия: {batch}</span>
                <span>Контроль: {control}</span>
            </Container>
            
            <Container >
                  <span>Изготовлен: {production_date}</span> 
                  <p>Годен до: {expiration_date}</p> 
            </Container>

            
            
        </>
        
    )
}