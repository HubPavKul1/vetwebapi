import { Container } from "react-bootstrap"
import { NavList } from "../header/navList/NavList";

import styles from "./Footer.module.scss"



export function Footer() {
    
    return (
        <footer className="mt-auto">
            <Container className={styles.footerWrap}>
                <Container className={styles.footerContainer}>
                    <NavList/>
                </Container>
             </Container>

        </footer>
       
    )
}