
import { Container } from "react-bootstrap";
import { LogoLink } from "./logo/Logo";

import styles from "./Header.module.scss";

import { NavList } from "./navList/NavList";
import { ButtonNav } from "../button/ButtonNav";



export function Header() {

    return (
        <>
            <header className={styles.header}>
                <Container className={styles.wrap}>
                
                <LogoLink/>
                <NavList />
                
                <ButtonNav title="Войти" />     
                </Container>

            </header>
                
         
        </>

    )
}