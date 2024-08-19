import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./NavLink.module.scss";

export function HomeLink() {
  return (
    <Nav.Link className={styles.navLink} as={Link} id="RouterNavLink" to="/">
      Главная
    </Nav.Link>
  );
}
