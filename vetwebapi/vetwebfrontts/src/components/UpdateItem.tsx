import { useState } from "react";
import { Modal } from "components/Modal";
import { BsPencilSquare } from "react-icons/bs";

interface UpdateItemProps {
  children: React.ReactElement | React.ReactNode;
}

export function UpdateItem({ children }: UpdateItemProps) {
  const [modalActive, setModalActive] = useState(false);

  return (
    <div>
      <BsPencilSquare
        className="edit-icon"
        onClick={() => setModalActive(true)}
      />
      <Modal active={modalActive} setActive={setModalActive}>
        {children}
      </Modal>
    </div>
  );
}
