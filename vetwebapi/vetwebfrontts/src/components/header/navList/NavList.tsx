import { HomeLink } from "../navLink/HomeLink";
import { CompaniesLink } from "../navLink/CompaniesLink";
import { DrugsLink } from "../navLink/DrugsLink";
import { VetWorkLink } from "../navLink/VetWorkLink";
import { AdminLink } from "../navLink/AdminLink";
import styles from "./NavList.module.css"



export function NavList() {

    return (
        <>
                <nav className={styles.nav}>
                    <ul className={styles.navList}> 
                        <HomeLink />
                        <CompaniesLink />
                        <DrugsLink />  
                        <VetWorkLink />
                        <AdminLink/>
                    </ul>
                </nav> 
         
        </>

    )
}