import { CreateCompanyForm } from "./CreateCompanyForm";
import { Modal } from "../../modal/Modal"
import { useState } from "react";
import { Container } from "react-bootstrap";

import { CustomButton } from "../../button/CustomButton";

export function CreateCompany() {

    const [modalActive, setModalActive] = useState(false)
    return (
        <Container className="create-item-wrap">
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

