import { CreateCompanyForm } from "./create-company-form/CreateCompanyForm";
import { Modal } from "../modal/Modal"
import { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";

export function CreateCompany() {

    const [modalActive, setModalActive] = useState(false)
    return (
        <Row>
            <Col md={4} />
            <Col className="m-5" md={4}>
                <h2 className="section-title">Предприятия</h2>
                    <Button className="create-company-button btn-reset" onClick={() => setModalActive(true)}>
                        Добавить предприятие
                    </Button>
                
                    <Modal active={modalActive} setActive={setModalActive}>
                        <CreateCompanyForm />
                    </Modal>           

            </Col>
                
        </Row>
    )
}

