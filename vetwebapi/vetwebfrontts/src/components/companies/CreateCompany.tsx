import CreateCompanyForm from "./create-company-form/CreateCompanyForm";
import Modal from "../modal/Modal"
import { useState } from "react";

export default function CreateCompany() {

    const [modalActive, setModalActive] = useState(false)
    return (
        <div className="col-md-6 col-md-offset-3 text-center colorlib-heading">
            <h2>Предприятия</h2>
                <p>
                    <button className="btn-primary btn-lg" onClick={() => setModalActive(true)}>
                        Добавить предприятие
                    </button>
                </p>
                    <Modal active={modalActive} setActive={setModalActive}>
                        <CreateCompanyForm />
                    </Modal>           
        </div>
    )
}

