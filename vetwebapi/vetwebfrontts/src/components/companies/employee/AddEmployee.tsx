import { Modal } from "../../modal/Modal";
import { useState } from "react";
import { AddEmployeeForm } from "./AddEmployeeForm";
import { CompanyPageProps } from "../company-detail/CompanyPageMenu";
import { FaCheck } from "react-icons/fa";


export function AddEmployee({compId}: CompanyPageProps) {

    const [modalActive, setModalActive] = useState(false)
    return (
        <li className="company-page-menu-item">
            <a href="#" onClick={() => setModalActive(true)}>
            <i className="icon-check"><FaCheck /></i> Добавить работника 
            </a>
            <Modal active={modalActive} setActive={setModalActive}>
                <AddEmployeeForm compId={compId}/>
            </Modal>
        </li>
    )
}