

import { HomeLink } from "./HomeLink";
import { CompaniesLink } from "./CompaniesLink";
import { DrugsLink } from "./DrugsLink";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { LogoLink } from "./LogoLink";

import styled from "styled-components";


const Styles = styled.div `
a {
    text-decoration: none
} 

a, .navbar-nav, .nav-link {
    color: blue;
    font-size: 20px;
}
`



export function Header() {

    return (
        <>
        <Styles>
            <Navbar collapseOnSelect expand="md" bg="light" variant="light" fixed="top">
                <Container>
                    <LogoLink/>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <HomeLink />
                            <CompaniesLink />
                            <DrugsLink />  
                        </Nav>
                        <Nav className="justify-content-center">  
                            <Button variant="secondary">Войти</Button>
                            <Button variant="primary">Регистрация</Button>    
                        </Nav>
                    </Navbar.Collapse>
                            
                </Container>
            </Navbar>

        </Styles>
         
        </>
           


    )
}