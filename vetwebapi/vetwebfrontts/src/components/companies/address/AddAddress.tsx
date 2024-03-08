import { AddAddressForm } from "./AddAddressForm";
import { Modal } from "../../modal/Modal";
import { useState } from "react";
import { CompanyPageProps } from "../company-detail/CompanyPageMenu";



export function AddAddress({compId}: CompanyPageProps) {
  
    const [modalActive, setModalActive] = useState(false)
    return (
        <li>
            <a href="#" onClick={() => setModalActive(true)}>
                Добавить адрес <i className="icon-check" />{" "}
            </a>
            <Modal active={modalActive} setActive={setModalActive}>
                <AddAddressForm compId={compId}/>
            </Modal>     
        </li>     
    )
}