import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./NavLink.module.scss";
import { companiesLink } from "urls/companyUrls";

export function CompaniesLink() {
  return (
    <Nav.Link
      className={styles.navLink}
      as={Link}
      id="RouterNavLink"
      to={companiesLink}
    >
      Предприятия
    </Nav.Link>
  );
}
