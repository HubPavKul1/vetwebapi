import { AddAddressForm } from "./AddAddressForm";
import { Modal } from "../../modal/Modal";
import { useState } from "react";
import { CompanyPageProps } from "../company-detail/CompanyPageMenu";
import { FaCheck } from "react-icons/fa";



export function AddAddress({compId}: CompanyPageProps) {
  
    const [modalActive, setModalActive] = useState(false)
    return (
        <li className="company-page-menu-item">
            <a href="#" onClick={() => setModalActive(true)}>
            <i className="icon-check"><FaCheck /></i> Добавить адрес
            </a>
            <Modal active={modalActive} setActive={setModalActive}>
                <AddAddressForm compId={compId}/>
            </Modal>     
        </li>     
    )
}