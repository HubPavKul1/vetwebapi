import { Container } from "react-bootstrap";


import styles from "./CompanyCardBody.module.scss"


interface CompanyCardBodyProps{
    address?: string;
    phone?: string;
    phone2?: string;
    employee?: string;

}

export function CompanyCardBody({address, phone, phone2, employee}: CompanyCardBodyProps) {
    return (
        <>
            <Container className={styles.cardAddress}>
                <h6>{address}</h6>
            </Container>
            <Container className={styles.cardEmployee}>
                <h6>{employee}</h6>
            </Container>
            <Container className={styles.cardPhone}>
                <span>тел.:{phone}</span>
                <span>тел2.:{phone2}</span>
            </Container>
        </>
        
    )
}