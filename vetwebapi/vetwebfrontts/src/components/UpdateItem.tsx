import { useState } from "react";
import { Modal } from "components/Modal";
import { BsPencilSquare } from "react-icons/bs";
import clsx from "clsx";

interface UpdateItemProps {
  children: React.ReactElement | React.ReactNode;
}

export function UpdateItem({ children }: UpdateItemProps) {
  const [modalActive, setModalActive] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex justify-center">
        <BsPencilSquare
          className="edit-icon"
          onClick={() => setModalActive(true)}
        />
        <Modal active={modalActive} setActive={setModalActive}>
          {children}
        </Modal>
      </div>
      <div
        className={clsx(
          "absolute top-6 z-10 right-1 p-3 w-auto border rounded-md bg-white shadow-md text-center",
          !open && "hidden"
        )} 
      >
        Редактировать!
      </div>
    </div>
  );
}
