import { CreateCompanyForm } from "./create-company-form/CreateCompanyForm";
import { Modal } from "../modal/Modal"
import { useState } from "react";
import { Button, Container } from "react-bootstrap";

export function CreateCompany() {

    const [modalActive, setModalActive] = useState(false)
    return (
        <Container className="col-md-6 col-md-offset-3 text-center colorlib-heading">
            <h2>Предприятия</h2>
                <p>
                    <Button className="btn-primary btn-lg" onClick={() => setModalActive(true)}>
                        Добавить предприятие
                    </Button>
                </p>
                    <Modal active={modalActive} setActive={setModalActive}>
                        <CreateCompanyForm />
                    </Modal>           
        </Container>
    )
}

