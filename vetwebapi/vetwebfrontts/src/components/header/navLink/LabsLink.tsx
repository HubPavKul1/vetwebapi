import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import styles from "./NavLink.module.scss"


export function LabsLink() {
    return (
       
            <Nav.Link className={styles.navLink} as={Link} id="RouterNavLink" to="/companies/labs">Лаборатории</Nav.Link>
    )
}