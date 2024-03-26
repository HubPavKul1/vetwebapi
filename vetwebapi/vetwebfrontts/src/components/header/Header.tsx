
import { HomeLink } from "./navLink/HomeLink";
import { CompaniesLink } from "./navLink/CompaniesLink";
import { DrugsLink } from "./navLink/DrugsLink";
import { Container, Navbar, Button } from "react-bootstrap";
import { LogoLink } from "./logo/Logo";

import { VetWorkLink } from "./navLink/VetWorkLink";
import { AdminLink } from "./navLink/AdminLink";
import styles from "./Header.module.css"
import { NavList } from "./navList/NavList";



export function Header() {

    return (
        <>
            <header className={styles.header}>
                <Container className={styles.wrap}>
                
                <LogoLink/>
                <NavList />
                
                <Button className="btn header-button btn-reset">Войти</Button>     
                </Container>

            </header>
                
         
        </>

    )
}