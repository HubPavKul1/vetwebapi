import { Modal } from "components/Modal";
import { useState } from "react";

interface MenuItemProps {
  title: string;
  icon?: React.ReactElement;
  children?: React.ReactElement | React.ReactNode;
}

export function MenuItem({ title, children, icon }: MenuItemProps) {
  const [modalActive, setModalActive] = useState(false);
  return (
    <li className="list-none m-0 mb-4 border-b border-b-black text-2xl hover:text-violet-600 transition-colors">
      <a className="flex" href="#" onClick={() => setModalActive(true)}>
        <div className="mr-3">{icon}</div>
        {title}
      </a>
      <Modal active={modalActive} setActive={setModalActive}>
        {children}
      </Modal>
    </li>
  );
}
