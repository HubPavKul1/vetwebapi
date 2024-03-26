import vetLogo from "/vetLogo.png";
import { Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"

import styles from "./Logo.module.css"


export function LogoLink() {
    return (
    <div className={styles.wrap}>
        <Navbar.Brand >
            <Link to="/" className={styles.logo}>
                <img src={vetLogo}
                    height="50"
                    width="70"
                    className={styles.logo}
                    alt="Logo"                          
                />
            </Link>
        </Navbar.Brand>
    </div>
        
        
    )
}