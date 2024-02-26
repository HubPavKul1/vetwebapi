import { Modal } from "../../modal/Modal";
import { useState } from "react";
import { AddEmployeeForm } from "./AddEmployeeForm";


export function AddEmployee() {

    const [modalActive, setModalActive] = useState(false)
    return (
        <li>
            <a href="#" onClick={() => setModalActive(true)}>
                Добавить работника <i className="icon-check" />{" "}
            </a>
            <Modal active={modalActive} setActive={setModalActive}>
                <AddEmployeeForm />
            </Modal>
        </li>
    )
}