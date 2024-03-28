import { CreateCompanyForm } from "../create-company-form/CreateCompanyForm";
import { Modal } from "../../modal/Modal"
import { useState } from "react";
import { Button, Container } from "react-bootstrap";

import styles from "./CreateCompany.module.css"
import { AddObjectBtn } from "../../addObjectBtn/AddObjectBtn";

export function CreateCompany() {

    const [modalActive, setModalActive] = useState(false)
    return (
        <Container className={styles.createCompanyWrap}>
            <h2 className="section-title">Предприятия</h2>
                <AddObjectBtn title="Добавить предприятие" onClick={() => setModalActive(true)}/>

          

                {/* <Button className="btn create-company-button btn-reset" onClick={() => setModalActive(true)}>
                    Добавить предприятие
                </Button> */}
                
                <Modal active={modalActive} setActive={setModalActive}>
                    <CreateCompanyForm />
                </Modal>         
        </Container>
                  
    )
}

