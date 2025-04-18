import { useState } from "react";
import { Modal } from "shared/ui/Modal";
import { BsPencilSquare } from "react-icons/bs";

interface UpdateItemProps {
  children: React.ReactElement | React.ReactNode;
}

export function UpdateItem({ children }: UpdateItemProps) {
  const [modalActive, setModalActive] = useState(false);

  return (
    <div>
      <div className="flex justify-center">
        <BsPencilSquare
          className="edit-icon"
          onClick={() => setModalActive(true)}
        />
        <Modal active={modalActive} setActive={setModalActive}>
          {children}
        </Modal>
      </div>
    </div>
  );
}
