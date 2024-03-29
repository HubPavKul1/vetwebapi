import { CreateCompanyForm } from "../create-company-form/CreateCompanyForm";
import { Modal } from "../../modal/Modal"
import { useState } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";

import styles from "./CreateCompany.module.css"

export function CreateCompany() {

    const [modalActive, setModalActive] = useState(false)
    return (
        <Container className={styles.createCompanyWrap}>
            <h2 className="section-title">Предприятия</h2>
                <Button className="btn create-company-button btn-reset" onClick={() => setModalActive(true)}>
                    Добавить предприятие
                </Button>
                
                <Modal active={modalActive} setActive={setModalActive}>
                    <CreateCompanyForm />
                </Modal>         
        </Container>
                  
    )
}

