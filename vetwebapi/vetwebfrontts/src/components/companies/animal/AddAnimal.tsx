import { Modal } from "../../modal/Modal";
import { useState } from "react";
import { AddAnimalForm } from "./AddAnimalForm";
import { UploadAnimalForm } from "./UploadAnimalForm";
import { CompanyPageProps } from "../company-detail/CompanyPageMenu";


export function AddAnimal({compId}: CompanyPageProps) {

    const [modalActive, setModalActive] = useState(false)
    return (
        <li>
            <a href="#" onClick={() => setModalActive(true)}>
                Добавить животное <i className="icon-check" />{" "}
            </a>
            <Modal active={modalActive} setActive={setModalActive}>
                <AddAnimalForm compId={compId}/>
                <UploadAnimalForm />
            </Modal>
        </li>
    )
}