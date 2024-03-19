import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"


export function AdminLink() {
    

    return (
  
        <Nav.Link className="header-list-item" as={Link} to="/">Админка</Nav.Link>
        
    )
}
