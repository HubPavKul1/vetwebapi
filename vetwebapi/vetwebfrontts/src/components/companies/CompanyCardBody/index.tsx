import { Col, Container, Row } from "react-bootstrap";


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
                <Row>
                    <Col><span>тел.: {phone}</span></Col>
                    {phone2 && <Col><span>тел2.: {phone2}</span></Col>}
                </Row>
            </Container>
        </>
        
    )
}