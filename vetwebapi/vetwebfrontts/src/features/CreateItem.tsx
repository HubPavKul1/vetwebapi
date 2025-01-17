import { Modal } from "shared/ui/Modal";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { ButtonCreate, CustomButton } from "shared/index";

interface ICreateItemProps {
  btnTitle?: string;
  children: React.ReactElement | React.ReactNode;
}

export function CreateItem({ btnTitle, children }: ICreateItemProps) {
  const [modalActive, setModalActive] = useState(false);
  return (
    <Container>
      <Container className="w-auto">
        <ButtonCreate title={btnTitle} onClick={() => setModalActive(true)} />
      </Container>

      <Modal active={modalActive} setActive={setModalActive}>
        {children}
      </Modal>
    </Container>
  );
}
