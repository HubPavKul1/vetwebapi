
import { HomeLink } from "./HomeLink";
import { CompaniesLink } from "./CompaniesLink";
import { DrugsLink } from "./DrugsLink";
import { Container, Navbar, Nav, Button, ButtonGroup, Row, Col } from "react-bootstrap";
import { LogoLink } from "./LogoLink";

import styled from "styled-components";


const Styles = styled.div `
a {
    text-decoration: none
} 

a, .navbar-nav, .nav-link {
    color: #4d5d96;
    font-size: 1em;
    font-weight: bold;
    margin-right: 2em;
}

a:hover {
    color: #7b93e8;
}
`

export function Header() {

    return (
        <>
        <Styles>
            <Navbar collapseOnSelect expand="md" bg="light" variant="light" fixed="top">
                <Container>
                   
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav>
                                <LogoLink/>
                                <HomeLink />
                                <CompaniesLink />
                                <DrugsLink />  
                                <ButtonGroup>
                                    <Button variant="primary">Войти</Button>
                                    <Button variant="primary">Регистрация</Button>   
                                </ButtonGroup>
                            </Nav>
                        </Navbar.Collapse>
                            
                </Container>
            </Navbar>

        </Styles>
         
        </>

    )
}