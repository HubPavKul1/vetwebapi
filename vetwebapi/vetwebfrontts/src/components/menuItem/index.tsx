import { Modal } from "../modal";
import { useState } from "react";

import { FaCheck } from "react-icons/fa";

import styles from "./MenuItem.module.scss";
import { Container } from "react-bootstrap";

interface MenuItemProps {
  title: string;
  children?: React.ReactElement | React.ReactNode;
}

export function MenuItem({ title, children }: MenuItemProps) {
  const [modalActive, setModalActive] = useState(false);
  return (
    <li className={styles.menuItem}>
      <a className="flex " href="#" onClick={() => setModalActive(true)}>
        <i className="icon-check">
          <FaCheck />
        </i>
        {title}
      </a>
      <Modal active={modalActive} setActive={setModalActive}>
        {children}
      </Modal>
    </li>
  );
}
