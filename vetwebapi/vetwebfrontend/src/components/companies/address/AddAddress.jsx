import AddAddressForm from "./AddAddressForm";
import Modal from "../../modal/Modal";
import { useState } from "react";

export default function AddAddress({companyId}) {

    const [modalActive, setModalActive] = useState(false)
    return (
        <li>
            <a href="#" onClick={() => setModalActive(true)}>
                Добавить адрес <i className="icon-check" />{" "}
            </a>
            <Modal active={modalActive} setActive={setModalActive}>
                <AddAddressForm companyId={companyId}/>
            </Modal>     
        </li>     
    )
}