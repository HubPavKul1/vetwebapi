import { Link } from "react-router-dom";
import { DropdownWrapper } from "components/dropdown/Dropdown";

import { NavDropdown } from "react-bootstrap";
import styles from "./NavLink.module.scss";
import {
  drugCatalogLink,
  drugReceiptsLink,
  drugReportsLink,
  drugsLink,
} from "urls/drugUrls";

export function DrugsLink() {
  return (
    <>
      {" "}
      <li className={styles.navLink}>
        <DropdownWrapper title="Биопрепараты" id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} id="RouterNavLink" to={drugReceiptsLink}>
            Поступление
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} id="RouterNavLink" to={drugsLink}>
            Справочник препаратов
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} id="RouterNavLink" to={drugCatalogLink}>
            Каталог препаратов
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} id="RouterNavLink" to={drugReportsLink}>
            Отчеты
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </DropdownWrapper>
      </li>
    </>
  );
}
