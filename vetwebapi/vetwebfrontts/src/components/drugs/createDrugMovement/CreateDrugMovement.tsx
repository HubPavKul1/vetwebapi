import { CreateDrugReceiptForm } from "./CreateDrugReceiptForm";
import { Modal } from "../../modal/Modal"
import { useState } from "react";
import { Container } from "react-bootstrap";

import { CustomButton } from "../../button/CustomButton";

export function CreateDrugMovement() {

    const [modalActive, setModalActive] = useState(false)
    return (
        <Container className="create-item-wrap">
                <CustomButton 
                    className="btn-large"
                    title="Добавить поступление препарата" 
                    onClick={() => setModalActive(true)}/>

                <Modal active={modalActive} setActive={setModalActive}>
                    <CreateDrugReceiptForm />
                </Modal>         
        </Container>
                  
    )
}

