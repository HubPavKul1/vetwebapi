import { NavLink } from "react-bootstrap"
import { Link } from "react-router-dom"


export function CompaniesLink() {
    return (
        <NavLink>
            <Link to="/companies/">Предприятия</Link>
        </NavLink>
    )
}