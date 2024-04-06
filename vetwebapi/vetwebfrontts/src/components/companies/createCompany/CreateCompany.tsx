import { CreateCompanyForm } from "../create-company-form/CreateCompanyForm";
import { Modal } from "../../modal/Modal"
import { useState } from "react";
import { Container } from "react-bootstrap";

import styles from "./CreateCompany.module.scss";
import { CustomButton } from "../../button/CustomButton";

export function CreateCompany() {

    const [modalActive, setModalActive] = useState(false)
    return (
        <Container className={styles.createCompanyWrap}>
                <CustomButton 
                    className="btn-large"
                    title="Добавить предприятие" 
                    onClick={() => setModalActive(true)}/>

                <Modal active={modalActive} setActive={setModalActive}>
                    <CreateCompanyForm />
                </Modal>         
        </Container>
                  
    )
}

