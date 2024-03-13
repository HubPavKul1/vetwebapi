

import { HomeLink } from "./HomeLink";
import { CompaniesLink } from "./CompaniesLink";
import { DrugsLink } from "./DrugsLink";
import { Container, Navbar, Nav } from "react-bootstrap";
import { LogoLink } from "./LogoLink";


export function Header() {

    return (
            <Navbar collapseOnSelect expand="md" bg="light" variant="light" fixed="top">
                <Container>
                    <LogoLink/>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <HomeLink />
                            <CompaniesLink />
                        </Nav>
                    </Navbar.Collapse>
                       
                        
                        {/* <DrugsLink />   */}
                </Container>
            </Navbar>


    )
}