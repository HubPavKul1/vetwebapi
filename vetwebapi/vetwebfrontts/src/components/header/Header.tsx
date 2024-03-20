
import { HomeLink } from "./HomeLink";
import { CompaniesLink } from "./CompaniesLink";
import { DrugsLink } from "./DrugsLink";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { LogoLink } from "./LogoLink";

import { VetWorkLink } from "./VetWorkLink";
import { AdminLink } from "./AdminLink";



export function Header() {

    return (
        <>
            {/* <Navbar collapseOnSelect bg="light" variant="light" fixed="top"> */}
                <Container className="flex header-container">
                        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav"/> */}
                        {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
                            <LogoLink/>
                        <nav className="header-nav">
                            <ul className="header-list list-reset flex"> 
                                <HomeLink />
                                <CompaniesLink />
                                <DrugsLink />  
                                <VetWorkLink />
                                <AdminLink/>
                            </ul>
                        </nav>
                            
                            <Button className="header-button btn-reset">Войти</Button>
                        {/* </Navbar.Collapse>       */}
                </Container>
            {/* </Navbar> */}
        </>

    )
}