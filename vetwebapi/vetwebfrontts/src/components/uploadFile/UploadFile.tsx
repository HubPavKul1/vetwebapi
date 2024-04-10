import { Modal } from "../modal/Modal";
import { useState } from "react";
import { Container } from "react-bootstrap";

import styles from "./UploadFile.module.scss";


interface IUploadFileProps {
    imgSrc?: string;
    children: React.ReactElement | React.ReactNode;
}

export function UploadFile({imgSrc, children}: IUploadFileProps) {

    const [modalActive, setModalActive] = useState(false)



    return (
        <>
            <Container>
                <img className={styles.uploadImage}
                    src={imgSrc}
                    onClick={() => setModalActive(true)}/>
            
            <Modal active={modalActive} setActive={setModalActive}>
               {children}
            </Modal> 
            </Container>
        </>
        
                  
    )
}