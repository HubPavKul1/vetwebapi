import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"


export function CompaniesLink() {
    return (
       
            // <NavLink.Link to="/companies/">Предприятия</NavLink.Link>
            <Nav.Link className="header-list-item" as={Link} id="RouterNavLink" to="/companies/">Предприятия</Nav.Link>
    )
}