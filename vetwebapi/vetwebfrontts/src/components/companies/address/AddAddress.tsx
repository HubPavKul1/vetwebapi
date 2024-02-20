import AddAddressForm from "./AddAddressForm";
import Modal from "../../modal/Modal";
import { useState } from "react";
import { useParams } from "react-router-dom";


export default function AddAddress() {
    // const {id} = useParams()
    // if (!id) return;

    const [modalActive, setModalActive] = useState(false)
    return (
        <li>
            <a href="#" onClick={() => setModalActive(true)}>
                Добавить адрес <i className="icon-check" />{" "}
            </a>
            <Modal active={modalActive} setActive={setModalActive}>
                <AddAddressForm/>
            </Modal>     
        </li>     
    )
}