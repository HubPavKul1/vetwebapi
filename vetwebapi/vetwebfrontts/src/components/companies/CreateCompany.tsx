import { CreateCompanyForm } from "./create-company-form/CreateCompanyForm";
import { Modal } from "../modal/Modal"
import { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";

export function CreateCompany() {

    const [modalActive, setModalActive] = useState(false)
    return (
        <Row fluid>
            <Col md={4} />
            <Col className="m-5" md={4}>
                <h2 className="text-center m-5">Предприятия</h2>
                <p className="text-center">
                    <Button className="btn-primary btn-lg" onClick={() => setModalActive(true)}>
                        Добавить предприятие
                    </Button>
                </p>
                    <Modal active={modalActive} setActive={setModalActive}>
                        <CreateCompanyForm />
                    </Modal>           

            </Col>
                
        </Row>
    )
}

