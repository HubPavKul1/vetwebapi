import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import styles from "./NavLink.module.scss"


export function VetsLink() {
    return (
       
            <Nav.Link className={styles.navLink} as={Link} id="RouterNavLink" to="/companies/vets">Ветклиники</Nav.Link>
    )
}