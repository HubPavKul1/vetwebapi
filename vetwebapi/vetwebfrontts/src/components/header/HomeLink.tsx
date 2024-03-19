import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"


export function HomeLink() {
    

    return (

        <Nav.Link className="header-list-item" as={Link} id="RouterNavLink" to="/">Главная</Nav.Link>
  
           
    )
}


