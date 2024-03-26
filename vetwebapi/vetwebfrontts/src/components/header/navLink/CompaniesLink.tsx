import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import styles from "./NavLink.module.css"


export function CompaniesLink() {
    return (
       
            <Nav.Link className={styles.navLink} as={Link} id="RouterNavLink" to="/companies/">Предприятия</Nav.Link>
    )
}