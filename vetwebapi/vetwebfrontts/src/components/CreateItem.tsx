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
    <Container className="flex justify-center mb-6">
      <Container className="flex justify-center max-w-xl">
        <CustomButton
          className="btn-nav text-xl w-full"
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
