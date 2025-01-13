import { Modal } from "shared/ui/Modal";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { CustomButton } from "shared/index";

interface ICreateItemProps {
  btnTitle?: string;
  children: React.ReactElement | React.ReactNode;
}

export function CreateItem({ btnTitle, children }: ICreateItemProps) {
  const [modalActive, setModalActive] = useState(false);
  return (
    <Container>
      <Container className="w-auto">
        <CustomButton
          className="btn-filter"
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
