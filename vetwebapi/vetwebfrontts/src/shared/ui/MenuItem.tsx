import { Modal } from "shared/ui/Modal";
import { useState } from "react";

interface MenuItemProps {
  title: string;
  icon?: React.ReactElement;
  children?: React.ReactElement | React.ReactNode;
}

export function MenuItem({ title, children, icon }: MenuItemProps) {
  const [modalActive, setModalActive] = useState(false);
  return (
    <li className="w-full list-none m-0 mb-4 px-10 py-2 rounded-lg shadow-md bg-slate-300 text-lg uppercase font-bold text-indigo-900 hover:bg-slate-400 transition-colors duration-300 ease-in-out">
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
