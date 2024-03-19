
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
        <Container>
            <Navbar collapseOnSelect bg="light" variant="light" fixed="top">
                <Container>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <LogoLink/>
                            <Nav className="header-list"> 
                                <HomeLink />
                                <CompaniesLink />
                                <DrugsLink />  
                                <VetWorkLink />
                                <AdminLink/>
                            </Nav>
                            <Button className="header-button">Войти</Button>
                        </Navbar.Collapse>      
                </Container>
            </Navbar>
        </Container>
            

        </>

    )
}