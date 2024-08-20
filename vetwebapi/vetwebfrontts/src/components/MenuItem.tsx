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
    <li className="page-menu-item">
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
