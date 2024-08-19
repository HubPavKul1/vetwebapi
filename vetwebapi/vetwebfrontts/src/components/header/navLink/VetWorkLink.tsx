import { Link } from "react-router-dom";
import { DropdownWrapper } from "components/dropdown/Dropdown";

import { NavDropdown } from "react-bootstrap";
import styles from "./NavLink.module.scss";
import {
  diagnosticsLink,
  vaccinationsLink,
  vetWorkReportsLink,
} from "urls/vetWorkUrls";

export function VetWorkLink() {
  return (
    <li className={styles.navLink}>
      <DropdownWrapper title="Работа" id="basic-nav-dropdown">
        <NavDropdown.Item as={Link} to={vaccinationsLink}>
          Вакцинация
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to={diagnosticsLink}>
          Диагностика
        </NavDropdown.Item>
        <NavDropdown.Item>Обработка</NavDropdown.Item>
        <NavDropdown.Item as={Link} to={vetWorkReportsLink}>
          Отчеты
        </NavDropdown.Item>
      </DropdownWrapper>
    </li>
  );
}
