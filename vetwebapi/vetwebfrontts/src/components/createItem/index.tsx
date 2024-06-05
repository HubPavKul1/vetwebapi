import { Modal } from "../Modal";
import { useState } from "react";
import { Container } from "react-bootstrap";

import { CustomButton } from "../CustomButton";

import styles from "./CreateItem.module.scss";

interface ICreateItemProps {
  btnTitle?: string;
  children: React.ReactElement | React.ReactNode;
}

export function CreateItem({ btnTitle, children }: ICreateItemProps) {
  const [modalActive, setModalActive] = useState(false);
  return (
    <Container className="flex justify-center mb-6">
      <CustomButton
        className="px-3 py-2 bg-violet-300  rounded text-violet-500 text-2xl uppercase"
        title={btnTitle}
        onClick={() => setModalActive(true)}
      />

      <Modal active={modalActive} setActive={setModalActive}>
        {children}
      </Modal>
    </Container>
  );
}
