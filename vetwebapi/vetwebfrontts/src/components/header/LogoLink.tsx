import vetLogo from "/vetLogo.png";
import { Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"


export function LogoLink() {
    return (
        <Navbar.Brand >
            <Link to="/">
                <img src={vetLogo}
                    height="50"
                    width="70"
                    className="d-inline-block align-top"
                    alt="Logo"                           
                />
            </Link>
        </Navbar.Brand>
        
    )
}