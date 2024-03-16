import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"


export function AdminLink() {
    

    return (
  
        <Nav.Link as={Link} to="/">Админка</Nav.Link>
        
    )
}
