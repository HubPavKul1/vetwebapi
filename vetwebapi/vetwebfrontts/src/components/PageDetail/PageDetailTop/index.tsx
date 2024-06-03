import { Col, Container, Row } from "react-bootstrap";

import styles from "./PageDetailTop.module.scss"

interface PageDetailTopProps {
    imgSrc: string;
    alt: string;
    menu: React.ReactElement;
}


export function PageDetailTop({imgSrc, alt, menu}: PageDetailTopProps) {
  return (
    <Container>
        <Row className={styles.rowTop}>
            <Col sm={8} className={styles.colImg}>
                <img src={imgSrc} alt={alt} />
            </Col>
            <Col>{menu}</Col>
        </Row>
    </Container>
  )
}
