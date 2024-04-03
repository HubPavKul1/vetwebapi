import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import styles from "./NavLink.module.scss"


export function AdminLink() {
    

    return (
  
        <Nav.Link className={styles.navLink} as={Link} to="/">Админка</Nav.Link>
        
    )
}
