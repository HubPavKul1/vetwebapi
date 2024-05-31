import { Modal } from "../Modal";
import { useState } from "react";
import { Container } from "react-bootstrap";

import { CustomButton } from "../CustomButton";

import styles from "./CreateItem.module.scss";

interface ICreateItemProps {
  btnTitle: string;
  children: React.ReactElement | React.ReactNode;
}

export function CreateItem({ btnTitle, children }: ICreateItemProps) {
  const [modalActive, setModalActive] = useState(false);
  return (
    <Container className={styles.createItemWrap}>
      <CustomButton
        className="btn-large"
        title={btnTitle}
        onClick={() => setModalActive(true)}
      />

      <Modal active={modalActive} setActive={setModalActive}>
        {children}
      </Modal>
    </Container>
  );
}
