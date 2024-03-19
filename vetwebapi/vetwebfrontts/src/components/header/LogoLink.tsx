import vetLogo from "/vetLogo.png";
import { Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"


export function LogoLink() {
    return (
        <Navbar.Brand >
            <Link to="/" className="header-logo">
                <img src={vetLogo}
                    height="50"
                    width="70"
                    // className="d-inline-block align-top"
                    className="header-logo"
                    alt="Logo"                          
                />
            </Link>
        </Navbar.Brand>
        
    )
}