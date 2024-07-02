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
      <Container className="flex justify-center max-w-3xl">
        <CustomButton
          className="btn-color text-2xl btn-transform w-full"
          title={btnTitle}
          onClick={() => setModalActive(true)}
        />
      </Container>

      <Modal active={modalActive} setActive={setModalActive}>
        {children}
      </Modal>
    </Container>
  );
}
